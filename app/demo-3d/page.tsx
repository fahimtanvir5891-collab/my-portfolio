"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Demo3D() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- 1. BACKGROUND GLOW (Animated behind the glass) ---
  const glowX1 = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"]);
  const glowX2 = useTransform(scrollYProgress, [0, 1], ["100%", "-20%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const glowX3 = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const glowY3 = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);

  // --- 2. PHASE 1: INITIAL HERO (0 to 0.15) ---
  // The Photo shrinks and moves up
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);
  
  // "Tanvir" slides way left, "Kabir" slides way right
  const nameLeftX = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100vw"]);
  const nameRightX = useTransform(scrollYProgress, [0, 0.15], ["0%", "100vw"]);

  // --- 3. PHASE 2: THE JOURNEY (0.15 to 0.35) ---
  const journeyY = useTransform(scrollYProgress, [0.15, 0.25, 0.35], ["100vh", "0vh", "-100vh"]);
  const journeyOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const journeyScale = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0.8, 1, 1.2]);

  // --- 4. PHASE 3: BUILDING TRUST (0.35 to 0.55) ---
  const trustY = useTransform(scrollYProgress, [0.35, 0.45, 0.55], ["100vh", "0vh", "-100vh"]);
  const trustOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const trustScale = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0.8, 1, 1.2]);

  // --- 5. PHASE 4: DATA-DRIVEN PRECISION (0.55 to 0.75) ---
  const dataY = useTransform(scrollYProgress, [0.55, 0.65, 0.75], ["100vh", "0vh", "-100vh"]);
  const dataOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const dataScale = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0.8, 1, 1.2]);

  // --- 6. PHASE 5: THE 3D GLASS CARDS FINALE (0.75 to 0.95) ---
  const cardsGroupY = useTransform(scrollYProgress, [0.75, 0.85], ["150%", "0%"]);
  const cardsGroupRotateX = useTransform(scrollYProgress, [0.75, 0.85], [75, 0]);
  const cardsGroupScale = useTransform(scrollYProgress, [0.75, 0.85, 1], [0.6, 1, 1.3]);
  const cardsOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0]);

  const leftCardX = useTransform(scrollYProgress, [0.8, 0.9], ["0%", "-110%"]);
  const leftCardRotateZ = useTransform(scrollYProgress, [0.8, 0.9], [0, -10]);

  const rightCardX = useTransform(scrollYProgress, [0.8, 0.9], ["0%", "110%"]);
  const rightCardRotateZ = useTransform(scrollYProgress, [0.8, 0.9], [0, 10]);
  
  const centerCardZ = useTransform(scrollYProgress, [0.8, 0.9], [0, 150]);

  // Common Liquid Glass styling class
  const liquidGlassClass = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-[2rem]";

  return (
    <div className="bg-[#F9F9F6] text-black min-h-screen overflow-x-hidden font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 800vh allows a long, epic journey sequence */}
      <div ref={containerRef} className="h-[800vh] relative">
        <div 
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ perspective: 1500 }}
        >
          {/* --- BACKGROUND BLOBS FOR GLASS REFRACTION --- */}
          <motion.div style={{ x: glowX1, y: glowY1 }} className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none" />
          <motion.div style={{ x: glowX2, y: glowY2 }} className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none" />
          <motion.div style={{ x: glowX3, y: glowY3 }} className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-full h-full absolute inset-0 flex items-center justify-center transform-gpu">
             
              {/* --- PHASE 1: HERO (Tanvir [PHOTO] Kabir) --- */}
              <motion.div 
                style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
                className="absolute z-40 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full px-4"
              >
                  {/* Left Name */}
                  <motion.h1 style={{ x: nameLeftX }} className="text-[clamp(3.5rem,8vw,7rem)] font-black text-black leading-none drop-shadow-xl md:drop-shadow-none">
                     Tanvir
                  </motion.h1>

                  {/* Liquid Glass Photo Container */}
                  <div className={`relative w-[240px] h-[320px] md:w-[320px] md:h-[420px] flex items-center justify-center p-3 ${liquidGlassClass} shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}>
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-[2rem] pointer-events-none"></div>
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                         <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                      </div>
                      <div className="absolute -bottom-5 bg-black text-white px-5 py-2 rounded-full text-xs font-bold shadow-xl border border-white/20 whitespace-nowrap">
                         (Your Photo Here)
                      </div>
                  </div>

                  {/* Right Name */}
                  <motion.h1 style={{ x: nameRightX }} className="text-[clamp(3.5rem,8vw,7rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 leading-none drop-shadow-xl md:drop-shadow-none">
                     Kabir
                  </motion.h1>
              </motion.div>

              {/* --- PHASE 2: THE JOURNEY --- */}
              <motion.div 
                style={{ y: journeyY, opacity: journeyOpacity, scale: journeyScale }}
                className={`absolute z-30 flex flex-col items-center text-center p-10 md:p-16 max-w-2xl mx-4 ${liquidGlassClass}`}
              >
                 <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg text-white font-black text-2xl">1</div>
                 <h2 className="text-3xl md:text-5xl font-black text-black mb-4">The Journey Begins</h2>
                 <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                   Started with a passion for marketing. Evolved into a data-driven ads master. Generating over <span className="text-orange-600 font-bold">$10M+ in ROAS</span> for e-commerce brands globally.
                 </p>
              </motion.div>

              {/* --- PHASE 3: BUILDING TRUST --- */}
              <motion.div 
                style={{ y: trustY, opacity: trustOpacity, scale: trustScale }}
                className={`absolute z-30 flex flex-col items-center text-center p-10 md:p-16 max-w-2xl mx-4 ${liquidGlassClass}`}
              >
                 <div className="w-16 h-16 bg-gradient-to-tr from-blue-400 to-teal-400 rounded-full flex items-center justify-center mb-6 shadow-lg text-white font-black text-2xl">2</div>
                 <h2 className="text-3xl md:text-5xl font-black text-black mb-4">Building Trust</h2>
                 <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8">
                   Trust isn't given, it's earned through consistent results. My track record speaks for itself.
                 </p>
                 <div className="flex gap-4 w-full justify-center">
                    <div className="bg-white/50 backdrop-blur-md px-6 py-4 rounded-xl border border-white/60">
                        <span className="block text-3xl font-black text-blue-600">102+</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Brands Scaled</span>
                    </div>
                    <div className="bg-white/50 backdrop-blur-md px-6 py-4 rounded-xl border border-white/60">
                        <span className="block text-3xl font-black text-teal-600">98%</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Retention Rate</span>
                    </div>
                 </div>
              </motion.div>

              {/* --- PHASE 4: DATA-DRIVEN PRECISION --- */}
              <motion.div 
                style={{ y: dataY, opacity: dataOpacity, scale: dataScale }}
                className={`absolute z-30 flex flex-col items-center text-center p-10 md:p-16 max-w-2xl mx-4 ${liquidGlassClass}`}
              >
                 <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg text-white font-black text-2xl">3</div>
                 <h2 className="text-3xl md:text-5xl font-black text-black mb-4">Data-Driven Precision</h2>
                 <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                   No guesswork. No emotion. Just pure analytics, aggressive testing, and strategic scaling to dominate your market.
                 </p>
              </motion.div>

              {/* --- PHASE 5: 3D GLASS CARDS REVEAL --- */}
              <motion.div
                style={{ y: cardsGroupY, rotateX: cardsGroupRotateX, scale: cardsGroupScale, opacity: cardsOpacity, transformStyle: "preserve-3d" }}
                className="absolute z-20 flex items-center justify-center w-full mt-10 md:mt-0"
              >
                 {/* Left Glass Sub-Card */}
                 <motion.div 
                   style={{ x: leftCardX, rotateZ: leftCardRotateZ }}
                   className={`absolute w-[260px] h-[360px] md:w-[300px] md:h-[400px] p-6 flex flex-col justify-end overflow-hidden ${liquidGlassClass}`}
                 >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
                    <h3 className="relative z-20 text-2xl font-black text-black">Performance</h3>
                    <p className="relative z-20 text-orange-600 font-bold tracking-widest uppercase text-xs mt-1">Marketing</p>
                 </motion.div>

                 {/* Right Glass Sub-Card */}
                 <motion.div 
                   style={{ x: rightCardX, rotateZ: rightCardRotateZ }}
                   className={`absolute w-[260px] h-[360px] md:w-[300px] md:h-[400px] p-6 flex flex-col justify-end overflow-hidden ${liquidGlassClass}`}
                 >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
                    <h3 className="relative z-20 text-2xl font-black text-black">Data Analytics</h3>
                    <p className="relative z-20 text-orange-600 font-bold tracking-widest uppercase text-xs mt-1">Strategy</p>
                 </motion.div>

                 {/* Center Main Glass Card */}
                 <motion.div 
                   style={{ translateZ: centerCardZ }}
                   className={`relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] p-8 flex flex-col items-center justify-center text-center z-10 ${liquidGlassClass} !bg-white/60`}
                 >
                    <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-yellow-400 rounded-full blur-xl absolute top-10 right-10 opacity-50"></div>
                    <h2 className="text-3xl md:text-4xl font-black text-black mb-4 relative z-10">Unlocking <br/><span className="text-orange-500">Growth</span></h2>
                    <p className="text-gray-600 font-medium text-sm md:text-base relative z-10">Keep scrolling to enter the main website</p>
                    <div className="mt-8 w-12 h-12 md:w-16 md:h-16 rounded-full border-t-4 border-r-4 border-orange-500 animate-spin relative z-10"></div>
                 </motion.div>
              </motion.div>

          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#F9F9F6] relative z-30 pt-24 border-t border-white shadow-[0_-20px_40px_rgba(0,0,0,0.05)] backdrop-blur-3xl">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">Welcome to the Website</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                এই ডিজাইনে আপনার কথা অনুযায়ী <strong>Tanvir [ছবি] Kabir</strong> লেআউট রাখা হয়েছে। 
                আর পুরো অ্যানিমেশনটিতে <strong>Apple-এর "Liquid Glassmorphism"</strong> ইফেক্ট ব্যবহার করে একটি দীর্ঘ "জার্নি ও ট্রাস্ট" স্টোরি তৈরি করা হয়েছে। 
            </p>
            <Link href="/" className="inline-flex px-8 py-4 bg-black text-white font-black rounded-full shadow-lg hover:bg-orange-500 hover:scale-105 transition-all">
                Back to Main Site
            </Link>
         </div>
      </div>
    </div>
  );
}
