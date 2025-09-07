import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-slate-200/50 dark:border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        
        {/* Left side (logo + title) */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow ring-1 ring-black/5" />
          <div className="leading-tight">
            <div className="font-semibold text-lg">RAG Studio</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Upload & Ask on the same page • Results on the right
            </div>
          </div>
        </div>

        {/* Right side (auth buttons) */}
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-lg bg-indigo-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-indigo-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
