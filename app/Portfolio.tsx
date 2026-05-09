"use client";

import Link from "next/link";
import { useState } from "react";
import { urlFor } from "./sanity";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from '@portabletext/react';

// --- স্যানিটির রিচ টেক্সট (ডেসক্রিপশন) ডিজাইন ---
const ptComponents = {
  block: {
    normal: ({children}: any) => <p className="text-gray-700 text-lg leading-relaxed mb-4">{children}</p>,
    h1: ({children}: any) => <h1 className="text-4xl font-black text-gray-900 mb-4 mt-8">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">{children}</h2>,
  },
  marks: {
    link: ({children, value}: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold underline hover:text-orange-600 transition-colors">
        {children}
      </a>
    ),
    strong: ({children}: any) => <strong className="font-black text-gray-900">{children}</strong>
  },
};

// --- দারাজের মতো ইমেজ জুম কম্পোনেন্ট (Ratio Fix করা হয়েছে) ---
function DarazZoomImage({ src, alt }: { src: string, alt: string }) {
    const [position, setPosition] = useState("50% 50%");
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
       const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
       const x = ((e.clientX - left) / width) * 100;
       const y = ((e.clientY - top) / height) * 100;
       setPosition(`${x}% ${y}%`);
    };
  
    return (
       <div className="w-full flex justify-center items-center bg-gray-50 rounded-3xl shadow-inner border border-gray-100 py-6 md:py-10">
          {/* এই ভেতরের div টা অরিজিনাল ইমেজের রেশিও অনুযায়ী নিজেকে ফিট করে নেবে, তাই জুম হবে পারফেক্ট */}
          <div 
            className="relative overflow-hidden cursor-crosshair rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
             <img 
                src={src} 
                alt={alt} 
                // max-h-[75vh] দেওয়ার ফলে ছবি স্ক্রিনের চেয়ে বড় হয়ে কেটে যাবে না, পুরোটা দেখা যাবে
                className="block w-auto h-auto max-w-full max-h-[75vh] transition-transform duration-200 ease-out" 
                style={{ 
                   transformOrigin: position, 
                   transform: isHovered ? "scale(2.5)" : "scale(1)" 
                }} 
             />
          </div>
       </div>
    );
}

export default function Portfolio({ projects, openProject, setOpenProject, isHomePage = true }: any) {
    // হোমপেজের জন্য মাত্র ৬টি প্রজেক্ট (ম্যাসনারি লেআউটের জন্য)
    const displayProjects = isHomePage ? projects.slice(0, 6) : projects;

    return (
        <div className="w-full">
           <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-black">Projects</h2>

           {/* --- Pinterest Style Masonry Layout --- */}
           <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
               {displayProjects.map((proj: any) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={proj._id} 
                    className="break-inside-avoid relative group rounded-3xl overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white border border-gray-100" 
                    onClick={() => setOpenProject(proj)}
                  >
                     {proj.image && (
                         <img 
                           src={urlFor(proj.image).url()} 
                           alt={proj.title} 
                           className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                         />
                     )}
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-white text-2xl font-black tracking-wide leading-tight">{proj.title}</h3>
                        <p className="text-orange-400 font-bold mt-2 flex items-center gap-2">View Project <span className="text-xl">↗</span></p>
                     </div>
                  </motion.div>
               ))}
           </div>

           {/* See more interesting বাটন (শুধুমাত্র হোমপেজে দেখাবে) */}
           {isHomePage && projects.length > 6 && (
             <div className="flex justify-center mt-16">
                <Link href="/project" className="px-10 py-4 bg-black text-white text-lg font-black rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] transition-all duration-300 hover:-translate-y-1">
                    See more interesting
                </Link>
             </div>
           )}

           {/* প্রজেক্টে ক্লিক করলে ওপেন হওয়ার ভাসমান উইন্ডো (Modal) */}
           <AnimatePresence>
           {openProject && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#F9F9F6]/95 backdrop-blur-xl overflow-y-auto p-4 md:p-10 flex flex-col">
                 
                 {/* (X) বাটনটি নিচে নামানো হয়েছে (top-28) যাতে ন্যাভবারের নিচে ঢাকা না পড়ে */}
                 <button 
                    onClick={() => setOpenProject(null)} 
                    className="fixed top-28 right-6 md:top-28 md:right-10 w-12 h-12 bg-black text-white rounded-full font-bold text-xl hover:bg-orange-500 transition-colors z-[110] shadow-2xl flex items-center justify-center"
                 >
                    ✕
                 </button>
                 
                 {/* উইন্ডোর ভেতরের কন্টেন্ট একটু নিচে নামানো হয়েছে (pt-28) */}
                 <div className="max-w-5xl mx-auto w-full pt-28 pb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-black mb-10 text-center px-12">{openProject.title}</h2>
                    
                    {/* দারাজ জুম ইমেজ */}
                    {openProject.image && (
                        <div className="mb-12">
                            <DarazZoomImage src={urlFor(openProject.image).url()} alt={openProject.title} />
                            <p className="text-center text-sm text-gray-400 mt-3 uppercase tracking-widest font-bold">Hover to zoom</p>
                        </div>
                    )}

                    {/* স্যানিটি থেকে আসা ডেসক্রিপশন */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                        {openProject.description ? (
                            <PortableText value={openProject.description} components={ptComponents} />
                        ) : (
                            <p className="text-gray-500 text-center italic">No description available for this project.</p>
                        )}
                    </div>
                 </div>
              </motion.div>
           )}
           </AnimatePresence>
        </div>
    );
}