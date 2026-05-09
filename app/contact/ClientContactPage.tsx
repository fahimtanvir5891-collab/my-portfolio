"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { urlFor } from "../sanity";

export default function ClientContactPage({ contactData, siteConfig }: any) {
  const words = contactData?.heroTitle?.length > 0 ? contactData.heroTitle : ["ROI", "Scaling", "Growth", "Data Accuracy"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [bdTime, setBdTime] = useState("");
  
  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Typing Animation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
  }, [wordIndex, words]);

  // Bangladesh Time Live Clock
  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" });
      setBdTime(timeString);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // API Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black selection:bg-orange-500 selection:text-white pb-20 relative overflow-hidden">
      <Navbar config={siteConfig} />

      {/* Background Animated Particles/Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-orange-400/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-300/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-40 pb-10">
        
        {/* Hero Section with Typing Animation */}
        <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-block shadow-sm border border-orange-200">
                Let's Connect
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
                Let's talk about your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 inline-block min-w-[200px]">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentWord}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                        >
                            {currentWord}
                        </motion.span>
                    </AnimatePresence>
                </span>
            </h1>
            <p className="text-lg text-gray-500 font-medium">Ready to scale? Drop a message and let's engineer your growth.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left: Floating Glassmorphic Info Cards */}
            <div className="lg:col-span-5 flex flex-col gap-5">
                
                {contactData?.email && (
                    <a href={`mailto:${contactData.email}`} className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all duration-300 flex items-center gap-6 overflow-hidden hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/5 group-hover:to-orange-500/10 transition-all duration-500"></div>
                        <div className="w-14 h-14 bg-gray-50 group-hover:bg-orange-500 rounded-2xl flex items-center justify-center transition-colors duration-300 z-10 shrink-0">
                            <svg className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="z-10">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Me</p>
                            <h4 className="text-lg font-bold text-gray-900">{contactData.email}</h4>
                        </div>
                    </a>
                )}

                {contactData?.whatsappLink && (
                    <a href={contactData.whatsappLink} target="_blank" rel="noopener noreferrer" className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.15)] transition-all duration-300 flex items-center gap-6 overflow-hidden hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gray-50 group-hover:bg-[#25D366] rounded-2xl flex items-center justify-center transition-colors duration-300 z-10 shrink-0">
                            <svg className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.115.549 4.148 1.593 5.952L.156 23.364l5.52-1.448c1.748.956 3.708 1.46 5.727 1.46h.005c6.645 0 12.03-5.385 12.03-12.03S18.676 0 12.031 0zM12.03 21.393h-.004c-1.788 0-3.54-.48-5.077-1.391l-.364-.216-3.771.99.998-3.676-.237-.377A10.157 10.157 0 011.874 12.03C1.874 6.43 6.43 1.875 12.03 1.875S22.186 6.43 22.186 12.03c0 5.6-4.555 10.155-10.156 10.155zM17.6 14.392c-.305-.153-1.805-.892-2.085-.994-.28-.102-.484-.153-.687.153-.204.306-.788.994-.966 1.198-.178.204-.356.23-.661.077-2.012-.998-3.23-2.072-4.143-3.626-.178-.306.177-.286.476-.883.076-.153.038-.286-.038-.439-.076-.153-.687-1.657-.941-2.268-.247-.594-.498-.514-.687-.524h-.585c-.204 0-.534.076-.814.382-.28.306-1.068 1.045-1.068 2.548s1.094 2.955 1.246 3.16c.153.204 2.152 3.284 5.212 4.604.727.313 1.294.5 1.738.64.729.231 1.393.198 1.916.12.585-.088 1.805-.738 2.06-1.45.254-.713.254-1.324.178-1.45-.076-.128-.28-.204-.585-.357z"/></svg>
                        </div>
                        <div className="z-10">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Direct Chat</p>
                            <h4 className="text-lg font-bold text-gray-900">WhatsApp</h4>
                        </div>
                    </a>
                )}

                {/* Local Time Zone Professional Touch */}
                <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-3xl mt-4 border border-gray-800 flex items-center justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 blur-xl rounded-full"></div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                           Local Time (Bangladesh)
                        </p>
                        <h4 className="text-2xl font-black">{bdTime || "Loading..."}</h4>
                    </div>
                </div>
            </div>

            {/* Right: Smart Neumorphic Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 relative">
                
                {status === "success" ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4">Message Sent!</h3>
                        <p className="text-gray-500 font-medium">Thank you for reaching out. An auto-reply has been sent to your email. I'll get back to you shortly.</p>
                        <button onClick={() => setStatus("idle")} className="mt-8 px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition-colors">Send Another</button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Your Name</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500/30 focus:bg-white focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" placeholder="John Doe" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Email Address</label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500/30 focus:bg-white focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" placeholder="john@example.com" />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">How can I help?</label>
                            <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500/30 focus:bg-white focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none" placeholder="Tell me about your project, goals, or timeline..."></textarea>
                        </div>

                        {status === "error" && <p className="text-red-500 font-bold text-sm text-center">Something went wrong. Please try again or email directly.</p>}

                        <button disabled={status === "loading"} type="submit" className="group relative w-full overflow-hidden rounded-2xl bg-black py-4 mt-2 transition-all hover:shadow-[0_15px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0">
                            <div className="absolute inset-0 w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out group-hover:w-full"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2 font-black text-white text-lg tracking-wide">
                                {status === "loading" ? "Sending..." : "Send Message"}
                                {status !== "loading" && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                            </span>
                        </button>
                    </form>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}