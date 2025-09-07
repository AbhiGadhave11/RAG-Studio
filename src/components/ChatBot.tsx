"use client";

import { useState, useRef, useEffect } from "react";
import { AnswerCard } from "@/components/AnswerCard";

export const REACHED_LIMIT_STATUS = 429;

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatBot({ setTheGlobalError }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setIsAnswering(true);

    const answer = await makeApiCall(input);
    setMessages([...newMessages, { role: "bot", content: answer }]);
    
    setIsAnswering(false);
  };

  async function makeApiCall(question: string): Promise<string> {
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: question })
      });

      if (res.status === REACHED_LIMIT_STATUS) {
        const data = await res.json();
        setTheGlobalError(data.error);
        return data.error;
      }

      const data = await res.json();
      return data.answer;
    } catch (err) {
      console.error("Error:", err);
      return "Something went wrong"
    }
  }

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnswering]);

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto border rounded-xl shadow-md">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-3xl mx-auto w-full">
        {messages.map((msg, idx) =>
          msg.role === "user" ? (
            <div
              key={idx}
              className="p-3 rounded-xl bg-blue-500 text-white max-w-[75%] ml-auto shadow-md"
            >
              {msg.content}
            </div>
          ) : (
            <AnswerCard
              key={idx}
              answer={msg.content}
              isAnswering={false}
              copyAnswer={() => navigator.clipboard.writeText(msg.content)}
              regenerate={() => handleSend()}
            />
          )
        )}

        {isAnswering && (
          <AnswerCard
            answer=""
            isAnswering={true}
            copyAnswer={() => {}}
            regenerate={() => {}}
          />
        )}

        {/* Ref for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex gap-2 bg-white dark:bg-slate-900">
        <input
          type="text"
          placeholder="Ask me anything about uploaded pdf or doc context..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2 outline-none dark:bg-slate-800 dark:border-slate-700"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
