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

  // Map scroll progress to 3D properties
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [-500, 500]);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      
      {/* Scroll container that controls the animation timing */}
      <div ref={containerRef} className="h-[400vh] relative">
        
        {/* Sticky section that holds the camera/perspective */}
        <div 
            className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ perspective: 1200 }}
        >
          <div className="absolute top-10 w-full text-center text-gray-500 text-sm tracking-widest font-bold z-50">
             ↓ SCROLL DOWN ↓
          </div>
          
          {/* Animated 3D element */}
          <motion.div 
            style={{ 
              rotateX, 
              scale, 
              opacity,
              z
            }}
            className="flex flex-col items-center justify-center transform-gpu"
          >
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-300 to-orange-600 text-center leading-tight mb-8">
              Tanvir Kabir
            </h1>
            
            {/* Mock 3D Card */}
            <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(249,115,22,0.15)] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm p-8 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-50"></div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 relative z-10">Data-Driven</h3>
                <p className="text-orange-400 font-bold tracking-widest uppercase text-sm relative z-10">Ads Master</p>
                
                <div className="mt-8 w-24 h-24 rounded-full border-2 border-dashed border-orange-500/50 animate-[spin_4s_linear_infinite] relative z-10"></div>
            </div>
            
          </motion.div>

        </div>
      </div>

      {/* Normal scrolling section after the 3D effect finishes */}
      <div className="min-h-screen bg-[#F9F9F6] text-black flex flex-col items-center justify-center p-8 relative z-20">
        <h2 className="text-3xl md:text-5xl font-black mb-6 text-center">Animation Complete!</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl text-center leading-relaxed">
            এই ধরনের ইফেক্ট আপনার ওয়েবসাইটের হোমপেজে দেওয়া সম্ভব। একে বলা হয় <strong>Scroll-Linked 3D Animation</strong>। 
            ইউজার যখন প্রথমবার ওয়েবসাইটে ঢুকবে, তখন মাউস স্ক্রল করলে পেজ নিচে না গিয়ে এই ধরনের থ্রিডি ইফেক্ট বা জুম-ইন ইফেক্ট হবে। ইফেক্ট শেষ হলে তারপর পেজ স্বাভাবিকভাবে নিচে স্ক্রল হবে।
        </p>
        <div className="flex gap-4">
            <Link href="/" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg">
                Go Back to Main Site
            </Link>
        </div>
      </div>
    </div>
  );
}
