"use client";

import { useState, useRef, useEffect } from "react";
import { client } from "../sanity"; 

interface FAQ {
  question: string;
  instruction: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [botName, setBotName] = useState("AI Assistant"); 
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatbotSettings = async () => {
      try {
        const query = `*[_type == "chatbotSettings"][0]`;
        const settings = await client.fetch(query);
        
        if (settings?.botName) setBotName(settings.botName);
        
        if (settings?.greetingMessage) {
          setMessages([{ role: "bot", text: settings.greetingMessage }]);
        } else {
          setMessages([{ role: "bot", text: "Hello! How can I help you today?" }]);
        }

        if (settings?.faqs) {
          setFaqs(settings.faqs);
        }
      } catch (error) {
        console.log("Failed to fetch settings from Sanity:", error);
        setMessages([{ role: "bot", text: "Hello! How can I help you today?" }]);
      }
    };

    fetchChatbotSettings();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string, faqInstruction?: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, instruction: faqInstruction }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, network error!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] transition-all duration-300 transform origin-bottom-right">
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
              <h3 className="font-bold">{botName}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#0a0a0a]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white self-end rounded-br-none' : 'bg-gray-800 text-gray-200 self-start rounded-bl-none'}`}>
                {msg.text}
              </div>
            ))}

            {isLoading && (
              <div className="bg-gray-800 text-gray-200 self-start rounded-xl rounded-bl-none p-3 max-w-[80%] text-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* FAQ Section - Moved outside of message area, just above input form, with stacked buttons to match image_9.png */}
          {messages.length === 1 && faqs.length > 0 && !isLoading && (
            <div className="p-3 border-t border-white/10 bg-[#111] flex flex-col gap-2">
              {faqs.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(faq.question, faq.instruction)}
                  className="w-full text-xs bg-[#1a1a1a] border border-blue-500/30 text-blue-400 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-left shadow-sm"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-white/10 bg-[#111]">
            <form onSubmit={onSubmitForm} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-transparent"
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center w-10 h-10">
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
}