"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadCard } from "@/components/UploadCard";
import { AskCard } from "@/components/AskCard";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Page() {
  return <RAGSingleRoute />;
}

function RAGSingleRoute() {
  const { isSignedIn, isLoaded } = useUser();
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/"); // redirect to landing page
    }
  }, [isLoaded, isSignedIn, router]);

  // Loading state (avoid flicker)
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-600 dark:text-slate-300">
        Loading...
      </div>
    );
  }

  // If signed in → show dashboard
  if (isSignedIn) {
    const prettySize = (n?: number) => {
      if (n == null) return "";
      const kb = n / 1024;
      if (kb < 1024) return `${kb.toFixed(1)} KB`;
      return `${(kb / 1024).toFixed(2)} MB`;
    };

    const setTheGlobalError = (error: any) => {
        setError(error);
    }

    return (
      <div className="min-h-[100dvh] w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-900 dark:text-slate-100">
        <Header />
        {error && (
            <div className="mt-6 flex justify-center">
                <div className="mt-4 p-4 rounded-xl bg-red-500/20 border flex flex-col items-center border-red-500 text-red-300 text-sm font-medium animate-pulse">
                ⚠️ {error}
                </div>
            </div>
        )};
        {/* Main grid */}
        <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Upload + Ask */}
          <section className="space-y-6">
            <UploadCard prettySize={prettySize} />
            <AskCard />
          </section>

          {/* RIGHT: Chatbot */}
          <section className="space-y-6">
            <ChatBot setTheGlobalError={setTheGlobalError} />
          </section>
        </main>

        {/* <Footer /> */}

        <footer className="absolute bottom-4 text-sm text-gray-300 relative min-h-18 flex flex-col items-center justify-center">
        © {new Date().getFullYear()} RAG Studio • Powered by Next, Clerk, and OpenAI
      </footer>
      </div>
    );
  }

  return null; // fallback
}
