import { motion } from "framer-motion";

export function TipsCard() {
  return (
    <motion.div layout className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-sm">
      <div className="p-5">
        <div className="text-sm font-semibold mb-2">Hook this UI to your single route</div>
        <ol className="text-sm list-decimal ml-5 space-y-1 text-slate-600 dark:text-slate-300">
          <li>Create <code>app/api/query/route.ts</code> for RAG (optional). UI stays on <code>app/page.tsx</code>.</li>
          <li>Send <code>{`{ question, topK, temperature }`}</code> to the API; return <code>{`{ answer, snippets }`}</code>.</li>
          <li>For streaming answers, use Server‑Sent Events and append tokens to <code>answer</code>.</li>
          <li>For uploads, either: a) client → API (formData) then embed server‑side, or b) client‑only preview + server embed later.</li>
        </ol>
      </div>
    </motion.div>
  );
}