import { AnimatePresence, motion } from "framer-motion";
import { FileText, Loader2, Paperclip, Trash2, Upload, Wand2 } from "lucide-react";
import { useCallback, useState } from "react";

export const BAD_STATUS = 400;

export function UploadCard({ prettySize }: any) {

    const [files, setFiles] = useState<any[]>([]); // [{name, size, type, id}]
    const [isEmbedding, setIsEmbedding] = useState(false);
    const [embedProgress, setEmbedProgress] = useState(0);

    const addFiles = async (list: File[]) => {
        if (!list?.length) return;
        const mapped = list.map((f) => ({
          id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
          name: f.name,
          size: f.size,
          type: f.type || "application/octet-stream",
          raw: f,
        }));
        setFiles((prev) => [...mapped, ...prev].slice(0, 8)); // cap to 8
    };
    
    const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));
    const clearFiles = () => setFiles([]);
    
    // --------- Fake embedding progress (UI demo) ---------
    const startEmbedding = async () => {
        if (!files.length) return alert("Please select a file");
      try {
        setIsEmbedding(true);
        setEmbedProgress(0);

        // simulate progress while uploading
        const simulateProgress = async () => {
          for (let i = 1; i <= 90; i++) {
            await new Promise((r) => setTimeout(r, 20)); // fake delay
            setEmbedProgress(i);
          }
        };

        simulateProgress(); // runs in background

        // prepare FormData
        const formData = new FormData();
        files.forEach((file: any) => {
          formData.append("files", file.raw);
        });
        // real API call
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((currRes) => {
          if(currRes.status === BAD_STATUS) {
            alert(`Failed upload`)
          }
        }).catch((err) => {
          alert(`Failed upload: ${err}`)
        }).finally(() => {
          // after upload success, complete progress
          setEmbedProgress(100);
        });
        
      } catch (err) {
        console.error(err);
      } finally {
        setIsEmbedding(false);
      }
    };

    const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const dropped = Array.from(e.dataTransfer.files || []);
        await addFiles(dropped);
    }, []);
    
    const onPick = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = Array.from(e.target.files || []);
      await addFiles(picked);
      if( e.currentTarget) {
          e.currentTarget.value = ""; // reset input
      }
    }, []);

  return (
    <motion.div layout className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-sm">
      <div className="p-5 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold"><Upload className="h-5 w-5"/> Upload documents</div>
        {files.length > 0 && (
          <button
            onClick={clearFiles}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Clear all
          </button>
        )}
      </div>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="m-5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 text-center bg-gradient-to-br from-slate-50/50 to-white/40 dark:from-slate-900/30 dark:to-slate-900/10"
        aria-label="Drag and drop files here"
      >
        <input id="filepick" type="file" multiple accept=".pdf,.txt,.md,.csv,.json" onChange={onPick} hidden />
        <label htmlFor="filepick" className="cursor-pointer inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:opacity-80">
          <Paperclip className="h-5 w-5"/>
          <span className="font-medium">Drag & drop</span> or <span className="underline">browse files</span>
        </label>
        <div className="mt-2 text-xs text-slate-500">PDF, TXT, MD, CSV, JSON (max 8 files)</div>
      </div>

      <AnimatePresence initial={false}>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5 space-y-2"
          >
            {files.map((f: any) => (
              <li key={f.id} className="flex items-center justify-between rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 px-3 py-2">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 shrink-0 text-slate-500" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{f.name}</div>
                    <div className="text-xs text-slate-500">{prettySize(f.size)} • {f.type?.split("/")[1]?.toUpperCase?.() || "FILE"}</div>
                  </div>
                </div>
                <button onClick={() => removeFile(f.id)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`Remove ${f.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="p-5 pt-0">
        <button
          onClick={startEmbedding}
          disabled={!files.length || isEmbedding}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-2.5 font-medium disabled:opacity-50"
        >
          {isEmbedding ? (<Loader2 className="h-4 w-4 animate-spin"/>) : (<Wand2 className="h-4 w-4"/>)}
          {isEmbedding ? "Embedding…" : "Generate embeddings"}
        </button>
        {isEmbedding && (
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={embedProgress}>
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600" style={{ width: `${embedProgress}%` }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}