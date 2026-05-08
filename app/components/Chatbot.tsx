"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image"; // ছবি দেখানোর জন্য নেক্সট ইমেজ ইমপোর্ট
import { client, urlFor } from "../sanity"; // স্যানিটি ক্লায়েন্ট এবং urlFor ইমপোর্ট

interface FAQ {
  question: string;
  instruction: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [botName, setBotName] = useState("AI Assistant"); 
  const [botAvatarUrl, setBotAvatarUrl] = useState<string | null>(null); // লোগোর ইউআরএল সেভ করার স্টেট
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- অ্যানিমেশন লজিকের জন্য নতুন স্টেট ---
  const [showAttentionText, setShowAttentionText] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    const fetchChatbotSettings = async () => {
      try {
        const query = `*[_type == "chatbotSettings"][0]`;
        const settings = await client.fetch(query);
        
        if (settings?.botName) setBotName(settings.botName);
        
        // স্যানিটি থেকে লোগো নিয়ে এসে ইউআরএল কনভার্ট করা হচ্ছে
        if (settings?.botAvatar) {
          setBotAvatarUrl(urlFor(settings.botAvatar).url());
        }
        
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

  // --- তানভীর ভাইয়ের স্পেশাল 'Attention Grabber' অ্যানিমেশন লজিক ---
  useEffect(() => {
    // ওয়েবসাইট লোড হওয়ার পর থেকে এই লুপ চলবে
    // সাইকেল: ৩ সেকেন্ড অপেক্ষা (৩০০০ms) -> ২ সেকেন্ড অ্যাকশন (২০০০ms) = টোটাল ৫০০০ms
    const attentionInterval = setInterval(() => {
      // যদি চ্যাট উইন্ডো অলরেডি খোলা থাকে, তবে অ্যানিমেশন দেখানোর দরকার নেই
      if (isOpen) return;

      // ১. ২ সেকেন্ডের জন্য লেখা দেখাবো এবং নড়িয়ে দেবো
      setShouldShake(true);
      setShowAttentionText(true);

      // ২. ঠিক ২ সেকেন্ড পর সব বন্ধ করে দেবো
      setTimeout(() => {
        setShouldShake(false);
        setShowAttentionText(false);
      }, 2000);

    }, 5000); // প্রতি ৫ সেকেন্ড পর পর এই লুপ চলবে

    // ক্লিনআপ (যাতে মেমোরি লিক না হয়)
    return () => clearInterval(attentionInterval);
  }, [isOpen]);

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
    <>
      {/* --- শেক (Shake) অ্যানিমেশনের জন্য ইনলাইন CSS --- */}
      <style jsx global>{`
        @keyframes custom-shake {
          0%, 100% { transform: rotate(0deg) scale(1.1); }
          25% { transform: rotate(-8deg) scale(1.1); }
          75% { transform: rotate(8deg) scale(1.1); }
        }
        .animate-custom-shake {
          animation: custom-shake 0.4s ease-in-out;
          animation-iteration-count: 2; /* ২ সেকেন্ডের মধ্যে ২ বার নড়বে */
        }
      `}</style>

      <div className="fixed bottom-24 right-6 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[520px] transition-all duration-300 transform origin-bottom-right">
            
            {/* Futuristic Header */}
            <div className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-white/5 p-4 flex justify-between items-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="relative z-10 flex items-center gap-3">
                
                {/* ১. হেডারে লোগো: স্যানিটি থেকে আনা, না থাকলে ডিফল্ট ইমোজি */}
                {botAvatarUrl ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 shadow-lg shadow-blue-500/20">
                    <Image src={botAvatarUrl} alt={botName} width={40} height={40} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-500/30">🤖</div>
                )}

                <div>
                  <h3 className="font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{botName}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs text-green-400/80 font-medium tracking-wider">ONLINE</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="relative z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-transparent scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] p-3.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white self-end rounded-2xl rounded-br-sm shadow-lg shadow-blue-900/20' : 'bg-[#1a1a1a] border border-white/5 text-gray-200 self-start rounded-2xl rounded-bl-sm shadow-md'}`}>
                  {msg.text}
                </div>
              ))}

              {isLoading && (
                <div className="bg-[#1a1a1a] border border-white/5 text-gray-200 self-start rounded-2xl rounded-bl-sm p-4 max-w-[80%] text-sm flex gap-2 items-center shadow-md">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Stacked FAQ Buttons */}
            {messages.length === 1 && faqs.length > 0 && !isLoading && (
              <div className="px-5 pb-3 flex flex-col gap-2">
                {faqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(faq.question, faq.instruction)}
                    className="w-full text-xs font-medium bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/30 text-blue-300 px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-800 hover:text-white hover:border-transparent transition-all duration-300 text-left shadow-sm"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
              <form onSubmit={onSubmitForm} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message AI..."
                  className="flex-1 bg-[#1a1a1a] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 border border-white/5 placeholder-gray-500 transition-all"
                />
                <button type="submit" disabled={!input.trim() || isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 transition-all flex items-center justify-center w-12 h-12 group">
                  <svg className="w-5 h-5 ml-0.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- Ultra-Modern Glowing AI Orb Button with Dynamic Animation --- */}
        {!isOpen && (
          <div className="group relative flex items-center justify-center">
            
            {/* ১. ভাসমান টেক্সট বক্স (নজর কাড়ার জন্য) */}
            <div className={`absolute right-full mr-6 transition-all duration-500 z-0 ${showAttentionText ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 text-white text-sm font-medium px-4 py-2 rounded-2xl whitespace-nowrap shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center gap-2">
                Ask AI <span className="text-xl animate-pulse">✨</span>
              </div>
            </div>

            {/* ২. পেছনে হালকা আভা */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl animate-pulse transition-opacity duration-500 z-0 ${showAttentionText ? 'opacity-90' : 'opacity-40 group-hover:opacity-80'}`}></div>
            
            {/* ৩. মেইন গোল বাটন: লোগো + শেক অ্যানিমেশন */}
            <button
              onClick={() => setIsOpen(true)}
              className={`relative z-10 w-16 h-16 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 overflow-hidden ${shouldShake ? 'animate-custom-shake' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full z-0"></div>
              
              {/* ৪. লোগো শো করা: স্যানিটি থেকে আনা, না থাকলে ডিফল্ট ✨ */}
              {botAvatarUrl ? (
                <div className="relative z-10 w-full h-full p-1.5 flex items-center justify-center">
                  <Image src={botAvatarUrl} alt={botName} width={64} height={64} className="rounded-full object-cover shadow-inner border border-white/10" />
                </div>
              ) : (
                <span className="text-3xl text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] relative z-20 transition-transform duration-300 group-hover:rotate-12">✨</span>
              )}

            </button>
          </div>
        )}
      </div>
    </>
  );
}