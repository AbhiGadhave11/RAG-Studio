export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600 dark:text-slate-400">
        
        {/* Left Side */}
        <p className="mb-4 sm:mb-0">
          ⚡ Built with <span className="font-semibold text-slate-800 dark:text-slate-200">Next</span> & RAG  
        </p>

        {/* Center */}
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <a
            href="https://github.com/AbhiGadhave11"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition"
          >
            GitHub
          </a>
          <a
            href="https://abhigadhave97.hashnode.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition"
          >
            Blog
          </a>
          <a
            href="mailto:abhigadhave97@gmail.com"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition"
          >
            Contact
          </a>
        </div>

        {/* Right Side */}
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">Abhijit Gadhave</span>
        </p>
      </div>
    </footer>
  );
}
