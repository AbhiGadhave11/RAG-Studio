// "use client";

// import { motion } from "framer-motion";
// import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { Sparkles, Upload, MessageCircle } from "lucide-react";
// import { useEffect } from "react";

// export default function LandingPage() {
//   const router = useRouter();

//   return (
//     <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 text-white">
//       {/* Glow background shapes */}
//       <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />

//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="relative z-10 max-w-3xl text-center space-y-8 px-6"
//       >
//         <motion.h1
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-6xl font-extrabold leading-tight drop-shadow-lg"
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-300">
//             RAG Studio
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="text-lg text-gray-200"
//         >
//           Upload documents. Ask questions. Get instant, context-aware answers.  
//           Your personal <span className="font-semibold text-yellow-300">AI-powered knowledge engine</span>.
//         </motion.p>

//         {/* Features */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
//         >
//           <FeatureCard icon={<Upload className="h-6 w-6" />} title="Upload Files" desc="PDFs, text, CSV — all supported." />
//           <FeatureCard icon={<MessageCircle className="h-6 w-6" />} title="Ask Anything" desc="Query your docs with natural language." />
//           <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Get Insights" desc="Accurate, AI-powered answers instantly." />
//         </motion.div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//         >
//           <SignedOut>
//             <SignInButton mode="modal" forceRedirectUrl="/dashboard">
//               <button className="px-8 py-4 mt-8 rounded-2xl bg-yellow-400 text-black font-semibold text-lg shadow-lg hover:scale-105 transition transform">
//                 Get Started →
//               </button>
//             </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             {
//               (() => {
//                 useEffect(() => {
//                   router.push('/dashboard');
//                 }, []);
//                 return null;
//               })()
//             }
//             {/* {router.push("/dashboard")} */}
//           </SignedIn>
//         </motion.div>
//       </motion.div>

//       {/* Footer */}
//       <footer className="absolute bottom-4 text-sm text-gray-300">
//         © {new Date().getFullYear()} RAG Studio • Powered by Next.js, Clerk, and OpenAI
//       </footer>
//     </main>
//   );
// }

// function FeatureCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
//   return (
//     <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md hover:scale-105 transition">
//       <div className="flex justify-center mb-3 text-yellow-300">{icon}</div>
//       <h3 className="font-semibold text-lg">{title}</h3>
//       <p className="text-sm text-gray-200 mt-1">{desc}</p>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { SignInButton, SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Sparkles, Upload, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Redirect if user is signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 text-white">
      {/* Glow background shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl text-center space-y-8 px-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-300">
            RAG Studio
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-200"
        >
          Upload documents. Ask questions. Get instant, context-aware answers.
          Your personal{" "}
          <span className="font-semibold text-yellow-300">
            AI-powered knowledge engine
          </span>
          .
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
        >
          <FeatureCard
            icon={<Upload className="h-6 w-6" />}
            title="Upload Files"
            desc="PDFs, text, CSV — all supported."
          />
          <FeatureCard
            icon={<MessageCircle className="h-6 w-6" />}
            title="Ask Anything"
            desc="Query your docs with natural language."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Get Insights"
            desc="Accurate, AI-powered answers instantly."
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button className="px-8 py-4 mt-8 rounded-2xl bg-yellow-400 text-black font-semibold text-lg shadow-lg hover:scale-105 transition transform">
                Get Started →
              </button>
            </SignInButton>
          </SignedOut>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-300">
        © {new Date().getFullYear()} RAG Studio • Powered by Next, Clerk, and OpenAI
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md hover:scale-105 transition">
      <div className="flex justify-center mb-3 text-yellow-300">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-200 mt-1">{desc}</p>
    </div>
  );
}
