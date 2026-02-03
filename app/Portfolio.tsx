"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "./sanity";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Portfolio({ projects, openProject, setOpenProject }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Desktop Zoom
  const [zoomStyle, setZoomStyle] = useState({ opacity: 0, x: 50, y: 50 });

  // --- SAFE DATA FLATTENING (যাতে ডাটা না থাকলেও ক্র্যাশ না করে) ---
  const allSlides = openProject?.caseStudyGroups?.flatMap((group: any) => 
    (group.items || []).map((item: any) => ({
      ...item,
      category: group.category 
    }))
  ) || [];

  // --- ফিল্টার লজিক ---
  const filteredSlides = activeCategory === "All" 
    ? allSlides 
    : allSlides.filter((slide: any) => slide.category === activeCategory);

  // মোডাল ওপেন হলে রিসেট
  useEffect(() => {
    if (openProject) {
      setCurrentSlide(0);
      setActiveCategory("All");
    }
  }, [openProject]);

  // ফিল্টার পাল্টালে স্লাইড ০ তে রিসেট
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  const nextSlide = () => {
    if (filteredSlides.length === 0) return; // সেফটি চেক
    setCurrentSlide((prev) => (prev === filteredSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (filteredSlides.length === 0) return; // সেফটি চেক
    setCurrentSlide((prev) => (prev === 0 ? filteredSlides.length - 1 : prev - 1));
  };

  // Zoom Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ opacity: 1, x, y });
  };
  const handleMouseLeave = () => setZoomStyle({ ...zoomStyle, opacity: 0 });

  return (
    <section id="work" className="py-20 px-4 md:px-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
        Selected <span className="text-blue-500">Case Studies</span>
      </h2>

      {/* --- মেইন গ্রিড --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects?.map((project: any) => (
          <motion.div
            layoutId={`card-${project._id}`}
            key={project._id} 
            onClick={() => setOpenProject(project)}
            className="group cursor-pointer bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {project.image && (
                <Image
                  src={urlFor(project.image).url()}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">{project.title}</h3>
              <p className="text-gray-400 text-xs">Click to view details</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- পপ-আপ মোডাল --- */}
      <AnimatePresence>
        {openProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              layoutId={`card-${openProject._id}`}
              className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* --- বাম পাশ: ইমেজ সেকশন --- */}
              <div className="w-full md:w-[60%] h-[50%] md:h-full bg-black relative flex flex-col border-b md:border-b-0 md:border-r border-white/10">
                
                {/* Close Button (Mobile Only) */}
                <button 
                  onClick={() => setOpenProject(null)} 
                  className="md:hidden absolute top-4 right-4 z-50 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                >
                  ✕
                </button>

                {/* Mobile Zoom Area */}
                <div className="md:hidden w-full h-full flex items-center justify-center pt-8 pb-2">
                   <TransformWrapper initialScale={1} minScale={1} maxScale={4}>
                     <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                        <div className="relative w-full h-full min-h-[250px]">
                            {/* CRASH FIX: এখানে চেক করা হচ্ছে ছবি আছে কিনা */}
                            {filteredSlides.length > 0 && filteredSlides[currentSlide] ? (
                               <Image
                                src={urlFor(filteredSlides[currentSlide].slideImage).url()}
                                alt="Slide"
                                fill
                                className="object-contain"
                               />
                            ) : (
                                <div className="text-white flex items-center justify-center h-full">Select a category</div>
                            )}
                        </div>
                     </TransformComponent>
                   </TransformWrapper>
                </div>

                {/* Desktop Zoom Area */}
                <div 
                    className="hidden md:flex relative w-full h-full items-center justify-center overflow-hidden cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative w-full h-full p-4">
                        {/* CRASH FIX: এখানেও সেফটি চেক লাগানো হয়েছে */}
                        {filteredSlides.length > 0 && filteredSlides[currentSlide] && (
                            <Image
                                src={urlFor(filteredSlides[currentSlide].slideImage).url()}
                                alt="Slide"
                                fill
                                className="object-contain transition-transform duration-100 ease-out"
                                style={{
                                    transformOrigin: `${zoomStyle.x}% ${zoomStyle.y}%`,
                                    transform: zoomStyle.opacity ? "scale(2.5)" : "scale(1)",
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* --- কন্ট্রোল বার --- */}
                {filteredSlides.length > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 bg-[#151515] border-t border-white/10 z-20">
                    <button 
                      onClick={prevSlide} 
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-bold transition"
                    >
                      ← Prev
                    </button>
                    
                    <div className="text-blue-400 text-xs font-mono font-bold bg-blue-500/10 px-3 py-1 rounded border border-blue-500/20">
                        {currentSlide + 1} / {filteredSlides.length}
                    </div>

                    <button 
                      onClick={nextSlide} 
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-bold transition"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              {/* --- ডান পাশ: ইনফরমেশন --- */}
              <div className="w-full md:w-[40%] h-[50%] md:h-full bg-[#111] flex flex-col relative">
                
                {/* Desktop Close Button */}
                <button onClick={() => setOpenProject(null)} className="hidden md:flex absolute top-4 right-4 bg-white/10 hover:bg-red-500 text-white w-8 h-8 items-center justify-center rounded-full transition z-20">✕</button>

                <div className="p-6 md:p-10 overflow-y-auto flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-2 md:mt-0">{openProject.title}</h2>
                    
                    {/* Category Buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button 
                             onClick={() => setActiveCategory("All")}
                             className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${activeCategory === "All" ? "bg-blue-600 text-white border-blue-600" : "bg-white/5 border-white/20 text-gray-400"}`}
                        >
                            All Works
                        </button>

                        {openProject.caseStudyGroups?.map((group:any, idx:number) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveCategory(group.category)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                                    activeCategory === group.category
                                    ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                    : "bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {group.category}
                            </button>
                        ))}
                    </div>

                    {/* Description - CRASH FIX: এখানেও সেফটি চেক */}
                    <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line mb-8 min-h-[100px]">
                        {filteredSlides.length > 0 && filteredSlides[currentSlide]
                            ? (filteredSlides[currentSlide].caption || "No description available.")
                            : "Select a category above to view slides."}
                    </div>

                    {openProject.link && (
                    <a
                        href={openProject.link}
                        target="_blank"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg w-full mb-8"
                    >
                        Visit Live Link 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}