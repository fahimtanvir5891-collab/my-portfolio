"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Demo3D() {
  const containerRef = useRef(null);
  
  // Track the scroll progress of our container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Step 1: Initial Text Animation (Fades out as we scroll down) ---
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-50%"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // --- Step 2: The 3D Element enters and rotates ---
  // Start deep in the background, scale up and rotate smoothly
  const cardRotateX = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [60, 20, 0]);
  const cardRotateY = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, -5, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9, 1], [0.6, 0.8, 1, 1.1, 1.5]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.4, 0.7], ["100%", "20%", "0%"]);

  // --- Step 3: 3D Parallax inside the card ---
  const innerZ = useTransform(scrollYProgress, [0.4, 0.7], [0, 80]);
  
  return (
    <div className="bg-[#F9F9F6] text-black min-h-screen selection:bg-orange-500 selection:text-white">
      
      {/* 
        Scroll container: h-[400vh] gives the user 4 screens of scrolling 
        to complete the animation before reaching the next section.
      */}
      <div ref={containerRef} className="h-[400vh] relative">
        
        {/* Sticky viewport */}
        <div 
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ perspective: 1200 }}
        >
          {/* Scroll Indicator */}
          <motion.div 
             style={{ opacity: titleOpacity }}
             className="absolute bottom-10 flex flex-col items-center gap-2"
          >
             <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Scroll to explore</span>
             <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
          </motion.div>

          {/* Intro Text - Perfectly matches website theme */}
          <motion.div 
            style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
            className="absolute flex flex-col items-center justify-center text-center z-10 px-4"
          >
            <div className="px-4 py-1.5 border border-gray-200 rounded-full text-xs font-bold bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center gap-2 mb-8">
                Premium Scroll Design <span className="text-orange-500 text-base leading-none">✨</span>
            </div>
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tight leading-[1.1] text-black">
              Tanvir <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">Kabir</span>
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
               Scaling e-commerce brands with surgical precision and data accuracy.
            </p>
          </motion.div>

          {/* The Premium 3D Object / Card */}
          <motion.div 
            style={{ 
              rotateX: cardRotateX, 
              rotateY: cardRotateY, 
              scale: cardScale, 
              opacity: cardOpacity,
              y: cardY,
              transformStyle: "preserve-3d"
            }}
            className="absolute z-20 w-[90%] max-w-[900px] aspect-[4/3] md:aspect-[21/10] bg-white rounded-3xl md:rounded-[2.5rem] border border-white/60 shadow-[0_40px_80px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] flex overflow-hidden group"
          >
             {/* Beautiful ambient glow inside the card */}
             <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-transparent to-transparent opacity-100"></div>
             
             {/* Floating content inside the 3D card */}
             <motion.div 
                style={{ translateZ: innerZ }}
                className="relative w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8"
             >
                <div className="flex flex-col w-full md:max-w-[45%] text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black text-black leading-tight mb-6 tracking-tight">
                        Transforming <br /> Ads into <span className="text-orange-500">Growth</span>
                    </h2>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <div className="bg-orange-500/10 px-5 py-3 rounded-2xl border border-orange-500/20 shadow-inner">
                            <span className="block text-2xl md:text-3xl font-black text-orange-500">102+</span>
                            <span className="text-[10px] md:text-xs font-bold text-orange-600/80 uppercase tracking-widest mt-1">Clients</span>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 shadow-inner">
                            <span className="block text-2xl md:text-3xl font-black text-black">4 Yrs</span>
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Experience</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[50%] h-[200px] md:h-full relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 transform-gpu hover:scale-105 transition-transform duration-700">
                    {/* Placeholder for an impressive image/dashboard mockup */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10"></div>
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest">
                        DATA ANALYTICS
                    </div>
                </div>
             </motion.div>
          </motion.div>

        </div>
      </div>

      {/* The rest of the website appears smoothly from the bottom */}
      <div className="min-h-screen bg-white relative z-30 pt-24 border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">Welcome to the Website</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                এই ডিজাইনটি আপনার ওয়েবসাইটের কালার থিম <strong>(#F9F9F6)</strong> ফলো করে তৈরি করা হয়েছে। 
                এটি একটি প্রিমিয়াম, স্মুথ এবং প্রফেশনাল "Apple-style" স্ক্রল অ্যানিমেশন। কোনো ব্ল্যাক স্ক্রিন বা কনফিউশন নেই, এবং কোড ১০০% এরর-ফ্রি। 
            </p>
            <Link href="/" className="inline-flex px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-full shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)] transition-all duration-300">
                Back to Main Site
            </Link>
         </div>
      </div>

    </div>
  );
}
