import { AnimatePresence, motion } from "framer-motion";
import { Search, Send, Settings2, Sparkles, X } from "lucide-react";
import { useRef, useState } from "react";

export function AskCard({}: any) {
  const [question, setQuestion] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const sendApiCall = async () => {
    if (!question.trim()) return;
    setIsAnswering(true);
    try {
      const res = await fetch("/api/textcontext", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: question })
      });
    } catch (err) {
      console.error("Error:", err);
      alert('Something went wrong')
    } finally {
      setIsAnswering(true);
    }
  };


  return (
    <motion.div layout className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-sm">
      <div className="p-5 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold"><Search className="h-5 w-5"/> Give a Prompt/Context</div>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Settings2 className="h-4 w-4"/>
          <span>topK</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) sendApiCall();
              }}
              rows={7}
              placeholder="Paste the document context… (⌘/Ctrl)"
              className="w-full resize-none rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label="Question input"
            />
          </div>
          <div className="col-span-4">
            <button
              onClick={sendApiCall}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 font-medium"
              aria-label={isAnswering ? "Stop generating" : "Ask"}
            >
              <><Send className="h-4 w-4"/> Submit</>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

