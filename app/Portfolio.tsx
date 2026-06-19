"use client";

import Link from "next/link";
import { useState } from "react";
import { urlFor } from "./sanity";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from '@portabletext/react';

// ফন্ট সাইজ স্ট্যান্ডার্ড করা হয়েছে এবং ইমেজের লজিক অ্যাড করা হয়েছে
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 w-full flex justify-center">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "Project content image"}
            className="rounded-2xl shadow-lg w-full max-h-[60vh] object-contain bg-gray-50 border border-gray-100 p-2"
            loading="lazy"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({children}: any) => <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5 font-medium">{children}</p>,
    h1: ({children}: any) => <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 mt-10">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-5 mt-8">{children}</h2>,
  },
  marks: {
    link: ({children, value}: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold underline hover:text-orange-600 transition-colors">{children}</a>,
    strong: ({children}: any) => <strong className="font-bold text-black">{children}</strong>
  },
};

// ইমেজের হাইট 75vh থেকে কমিয়ে 55vh করা হয়েছে যাতে উইন্ডোতে অতিরিক্ত বড় না লাগে
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
       <div className="w-full flex justify-center items-center bg-gray-50 rounded-2xl shadow-inner border border-gray-100 py-6 md:py-8">
          <div 
            className="relative overflow-hidden cursor-crosshair rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
             <img 
                src={src} 
                alt={alt} 
                className="block w-auto h-auto max-w-full max-h-[55vh] transition-transform duration-200 ease-out" 
                style={{ transformOrigin: position, transform: isHovered ? "scale(2.5)" : "scale(1)" }} 
             />
          </div>
       </div>
    );
}

export default function Portfolio({ projects, openProject, setOpenProject, isHomePage = true }: any) {
    const displayProjects = isHomePage ? projects.slice(0, 6) : projects;

    return (
        <div className="w-full">
           {/* টাইটেলের সাইজ কমানো হয়েছে */}
           <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-black">Projects</h2>

           {/* max-w-5xl দিয়ে কার্ডগুলোর সাইজ একটু ছোট ও স্মার্ট করা হয়েছে */}
           <div className="max-w-5xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
               {displayProjects.map((proj: any) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={proj._id} 
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.04)] bg-white border border-gray-100" 
                    onClick={() => setOpenProject(proj)}
                  >
                     {proj.image && (
                         <img 
                           src={urlFor(proj.image).url()} 
                           alt={proj.title} 
                           className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                         />
                     )}
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h3 className="text-white text-xl font-bold tracking-wide leading-snug">{proj.title}</h3>
                        <p className="text-orange-400 font-bold mt-1 flex items-center gap-2 text-sm">View Project <span className="text-lg">↗</span></p>
                     </div>
                  </motion.div>
               ))}
           </div>

           {isHomePage && projects.length > 6 && (
             <div className="flex justify-center mt-12">
                <Link href="/project" className="px-8 py-3 bg-black text-white text-base font-bold rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-1">
                    See more interesting
                </Link>
             </div>
           )}

           <AnimatePresence>
           {openProject && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#F9F9F6]/95 backdrop-blur-xl overflow-y-auto p-4 md:p-8 flex flex-col">
                 <button onClick={() => setOpenProject(null)} className="fixed top-24 right-4 md:top-24 md:right-8 w-10 h-10 bg-black text-white rounded-full font-bold text-lg hover:bg-orange-500 transition-colors z-[110] shadow-xl flex items-center justify-center">✕</button>
                 
                 <div className="max-w-4xl mx-auto w-full pt-24 pb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-8 text-center px-8">{openProject.title}</h2>
                    
                    {openProject.image && (
                        <div className="mb-10">
                            <DarazZoomImage src={urlFor(openProject.image).url()} alt={openProject.title} />
                            <p className="text-center text-xs text-gray-400 mt-3 uppercase tracking-widest font-bold">Hover to zoom</p>
                        </div>
                    )}

                    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-lg border border-gray-100">
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