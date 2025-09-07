import { Loader2 } from "lucide-react";

export function TypingLine() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 px-3 py-1.5 text-xs text-slate-500">
      <Loader2 className="h-3.5 w-3.5 animate-spin"/> Generating grounded answer…
    </div>
  );
}
