import { AnimatePresence, motion } from "framer-motion";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { TypingLine } from "@/components/TypingLine";

export function AnswerCard({ answer, isAnswering, copyAnswer, regenerate }: any) {
  return (
    <motion.div layout className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-5 w-5"/> Answer</div>
        <div className="flex items-center gap-2">
          <button onClick={copyAnswer} className="text-xs inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"><Copy className="h-3.5 w-3.5"/>Copy</button>
        </div>
      </div>

      <div className="p-6">
        {!answer && !isAnswering && (
          <div className="text-slate-500 text-sm">Ask a question on the left. The grounded answer will appear here with citations.</div>
        )}

        <AnimatePresence>
          {isAnswering && (
            <motion.div
              key="answering"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm leading-7"
            >
              <TypingLine />
              <div className="mt-3 animate-pulse h-24 rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
            </motion.div>
          )}
        </AnimatePresence>

        {!!answer && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-slate max-w-none dark:prose-invert">
            {answer?.split("\n").map((p: any, i: any) => (
              <p key={i} className="whitespace-pre-wrap">{p}</p>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}