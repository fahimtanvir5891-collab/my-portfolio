"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Demo3D() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- 1. BACKGROUND GLOW ANIMATIONS ---
  const glowX1 = useTransform(scrollYProgress, [0, 1], ["-20%", "50%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"]);
  const glowX2 = useTransform(scrollYProgress, [0, 1], ["100%", "20%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  // --- 2. CENTER PHOTO ANIMATION (Starts huge, moves to corner) ---
  const photoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const photoX = useTransform(scrollYProgress, [0, 0.3], ["0%", "35vw"]);
  const photoY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-35vh"]);
  const photoRotate = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  // --- 3. TITLE ANIMATIONS (Splits apart horizontally) ---
  const titleLeftX = useTransform(scrollYProgress, [0, 0.3], ["0%", "-100vw"]);
  const titleRightX = useTransform(scrollYProgress, [0, 0.3], ["0%", "100vw"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.5]);

  // --- 4. LEFT SIDEBAR ELEMENTS (Flying badges & text) ---
  const leftTextY = useTransform(scrollYProgress, [0, 0.4], ["0%", "100vh"]);
  const leftTextRotate = useTransform(scrollYProgress, [0, 0.4], [-90, -180]);
  
  const badge1X = useTransform(scrollYProgress, [0.05, 0.35], ["-200%", "20%"]);
  const badge1Rotate = useTransform(scrollYProgress, [0.05, 0.35], [-180, -10]);
  const badge1Scale = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  // --- 5. RIGHT SIDEBAR ELEMENTS ---
  const rightShapeRotate = useTransform(scrollYProgress, [0, 0.5], [0, 360]);
  const rightShapeY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100vh"]);
  const rightShapeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const badge2X = useTransform(scrollYProgress, [0.05, 0.35], ["200%", "-20%"]);
  const badge2Rotate = useTransform(scrollYProgress, [0.05, 0.35], [180, 10]);
  const badge2Scale = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  // --- 6. THE 3D CARDS ARRAY (Rising from bottom, unfolding like a fan) ---
  const cardsGroupY = useTransform(scrollYProgress, [0.2, 0.6], ["150%", "0%"]);
  const cardsGroupRotateX = useTransform(scrollYProgress, [0.2, 0.6], [75, 0]);
  const cardsGroupScale = useTransform(scrollYProgress, [0.2, 0.6, 0.9, 1], [0.6, 1, 1.2, 1.8]);

  const leftCardX = useTransform(scrollYProgress, [0.4, 0.7], ["0%", "-110%"]);
  const leftCardRotateZ = useTransform(scrollYProgress, [0.4, 0.7], [0, -15]);

  const rightCardX = useTransform(scrollYProgress, [0.4, 0.7], ["0%", "110%"]);
  const rightCardRotateZ = useTransform(scrollYProgress, [0.4, 0.7], [0, 15]);

  const centerCardZ = useTransform(scrollYProgress, [0.4, 0.7], [0, 150]);

  // --- 7. MASTER FADE OUT AT END ---
  const everythingOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

  return (
    <div className="bg-[#F9F9F6] text-black min-h-screen overflow-x-hidden font-sans">
      
      {/* 500vh gives us plenty of scroll room for complex sequences */}
      <div ref={containerRef} className="h-[500vh] relative">
        <div 
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ perspective: 1500 }}
        >
          {/* BACKGROUND EFFECTS */}
          <motion.div 
            style={{ x: glowX1, y: glowY1 }} 
            className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div 
            style={{ x: glowX2, y: glowY2 }} 
            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none"
          />

          <motion.div style={{ opacity: everythingOpacity }} className="w-full h-full absolute inset-0 flex items-center justify-center transform-gpu">
             
              {/* --- LEFT SIDE: Floating background text --- */}
              <motion.div 
                style={{ y: leftTextY, rotate: leftTextRotate }}
                className="absolute left-4 md:left-10 text-[8vw] md:text-[6vw] font-black text-black/5 whitespace-nowrap origin-center"
              >
                  DATA DRIVEN ADS
              </motion.div>

              {/* --- LEFT SIDE: Animated Badge --- */}
              <motion.div
                style={{ x: badge1X, rotate: badge1Rotate, scale: badge1Scale }}
                className="absolute left-[5%] md:left-[10%] top-[20%] md:top-[30%] bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-orange-100 z-30"
              >
                  <div className="text-3xl md:text-5xl font-black text-orange-500">102+</div>
                  <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Happy Clients</div>
              </motion.div>

              {/* --- RIGHT SIDE: Geometric Floating Shape --- */}
              <motion.div
                style={{ y: rightShapeY, rotate: rightShapeRotate, scale: rightShapeScale }}
                className="absolute right-10 md:right-32 top-1/4 w-24 h-24 md:w-32 md:h-32 border-[8px] md:border-[12px] border-orange-500/10 rounded-2xl md:rounded-3xl"
              />

              {/* --- RIGHT SIDE: Animated Badge --- */}
              <motion.div
                style={{ x: badge2X, rotate: badge2Rotate, scale: badge2Scale }}
                className="absolute right-[5%] md:right-[10%] bottom-[20%] md:bottom-[30%] bg-gradient-to-tr from-orange-500 to-yellow-500 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(249,115,22,0.3)] text-white z-30"
              >
                  <div className="text-3xl md:text-5xl font-black">4 YRS</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Experience</div>
              </motion.div>

              {/* --- CENTER HERO PHOTO --- */}
              <motion.div 
                style={{ scale: photoScale, x: photoX, y: photoY, rotate: photoRotate }}
                className="absolute z-40 w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-4 border-white"
              >
                  <div className="absolute inset-0 bg-orange-600/10 z-10"></div>
                  {/* Using a placeholder portrait. When moved to the real site, we will use your real photo. */}
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                  <div className="absolute bottom-6 left-0 w-full text-center z-20 flex justify-center">
                     <span className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold border border-white/20">
                         (Here will be your actual photo)
                     </span>
                  </div>
              </motion.div>

              {/* --- SPLITTING TITLE --- */}
              <div className="absolute z-50 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center items-center pointer-events-none mix-blend-difference md:mix-blend-normal">
                  <motion.h1 
                    style={{ x: titleLeftX, opacity: titleOpacity, scale: titleScale }}
                    className="text-[clamp(4rem,12vw,9rem)] font-black text-black leading-none drop-shadow-2xl md:drop-shadow-none"
                  >
                     Tanvir
                  </motion.h1>
                  <motion.h1 
                    style={{ x: titleRightX, opacity: titleOpacity, scale: titleScale }}
                    className="text-[clamp(4rem,12vw,9rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 leading-none drop-shadow-2xl md:drop-shadow-none"
                  >
                     Kabir
                  </motion.h1>
              </div>

              {/* --- 3D CARDS FAN REVEAL --- */}
              <motion.div
                style={{ y: cardsGroupY, rotateX: cardsGroupRotateX, scale: cardsGroupScale, transformStyle: "preserve-3d" }}
                className="absolute z-20 flex items-center justify-center w-full mt-[20vh] md:mt-0"
              >
                 {/* Left Sub-Card */}
                 <motion.div 
                   style={{ x: leftCardX, rotateZ: leftCardRotateZ }}
                   className="absolute w-[260px] h-[360px] md:w-[300px] md:h-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col justify-end overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover opacity-80"></div>
                    <h3 className="relative z-20 text-2xl font-black text-white">Performance</h3>
                    <p className="relative z-20 text-orange-400 font-bold tracking-widest uppercase text-xs mt-1">Marketing</p>
                 </motion.div>

                 {/* Right Sub-Card */}
                 <motion.div 
                   style={{ x: rightCardX, rotateZ: rightCardRotateZ }}
                   className="absolute w-[260px] h-[360px] md:w-[300px] md:h-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col justify-end overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')] bg-cover opacity-80"></div>
                    <h3 className="relative z-20 text-2xl font-black text-white">Data Analytics</h3>
                    <p className="relative z-20 text-orange-400 font-bold tracking-widest uppercase text-xs mt-1">Strategy</p>
                 </motion.div>

                 {/* Center Main Card */}
                 <motion.div 
                   style={{ translateZ: centerCardZ }}
                   className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-gray-700 p-8 flex flex-col items-center justify-center text-center z-10"
                 >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">Unlocking <br/><span className="text-orange-500">Growth</span></h2>
                    <p className="text-gray-400 font-medium text-sm md:text-base relative z-10">Keep scrolling to enter the main website</p>
                    <div className="mt-8 w-12 h-12 md:w-16 md:h-16 rounded-full border-t-2 border-r-2 border-orange-500 animate-spin relative z-10"></div>
                 </motion.div>
              </motion.div>

          </motion.div>
        </div>
      </div>

      <div className="min-h-screen bg-white relative z-30 pt-24 border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">Welcome to the Website</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                এই ডিজাইনে আপনার ছবি, নাম এবং <strong>একসাথে প্রায় ৮-১০ টি আলাদা অ্যানিমেশন</strong> যুক্ত করা হয়েছে! 
                ডান ও বাম পাশের ফাঁকা জায়গাগুলো উড়ন্ত ব্যাজ, টেক্সট এবং ইফেক্ট দিয়ে ভরিয়ে দেওয়া হয়েছে। 
            </p>
            <Link href="/" className="inline-flex px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-full shadow-lg hover:-translate-y-1 transition-all">
                Back to Main Site
            </Link>
         </div>
      </div>
    </div>
  );
}
