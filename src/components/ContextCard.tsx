import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ContextCard({ isAnswering, snippets, topK, showContext, setShowContext }: any) {
  return (
    <motion.div layout className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-sm">
      <div className="p-5 flex items-center justify-between">
        <div className="text-sm font-semibold">Retrieved context</div>
        <button
          onClick={() => setShowContext((v: boolean) => !v)}
          className="text-xs inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {showContext ? <ChevronUp className="h-3.5 w-3.5"/> : <ChevronDown className="h-3.5 w-3.5"/>}
          {showContext ? "Hide context" : "Show context"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showContext && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-5 pb-5 space-y-3">
            {(isAnswering ? Array.from({ length: Math.max(2, topK) }) : snippets).map((s: any, i: number) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="truncate">{s?.docName || "Retrieving…"}</div>
                  <div>p. {s?.page || "—"}</div>
                </div>
                <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  {s?.text || <span className="inline-block w-5/6 h-5 bg-slate-200/80 dark:bg-slate-800/70 rounded"/>}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}