"use client";

import Link from "next/link";
import { useState } from "react";
import { urlFor } from "../sanity"; 
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from '@portabletext/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const liquidGlassClass = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset]";

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
       <div className={`w-full flex justify-center items-center rounded-xl md:rounded-3xl py-4 md:py-8 ${liquidGlassClass}`}>
          <div 
            className="relative overflow-hidden cursor-crosshair rounded-lg md:rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] w-[90%] flex justify-center bg-white/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
             <img 
                src={src} 
                alt={alt} 
                className="block w-auto h-auto max-w-full max-h-[40vh] md:max-h-[45vh] transition-transform duration-200 ease-out" 
                style={{ transformOrigin: position, transform: isHovered ? "scale(2.5)" : "scale(1)" }} 
             />
          </div>
       </div>
    );
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-6 md:my-10 w-full flex flex-col items-center">
          <DarazZoomImage 
            src={urlFor(value).url()} 
            alt={value.alt || "Service content image"} 
          />
          <p className="text-center text-[10px] md:text-xs text-gray-500 mt-2 md:mt-3 uppercase tracking-widest font-bold">Hover to zoom</p>
        </div>
      );
    },
  },
  block: {
    normal: ({children}: any) => <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-4 md:mb-5 font-medium">{children}</p>,
    h1: ({children}: any) => <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 md:mb-6 mt-8 md:mt-10">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-xl md:text-3xl font-black text-gray-800 mb-3 md:mb-5 mt-6 md:mt-8">{children}</h2>,
  },
  marks: {
    link: ({children, value}: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold underline hover:text-orange-600 transition-colors">{children}</a>,
    strong: ({children}: any) => <strong className="font-bold text-black">{children}</strong>
  },
};

export default function Services({ services, isHomePage = true }: any) {
    const [openService, setOpenService] = useState<any>(null);
    const displayServices = isHomePage ? services.slice(0, 6) : services;

    return (
        <div className="w-full relative">
           <h2 className="text-3xl md:text-5xl font-black text-center mb-8 md:mb-12 text-black relative z-10">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Services</span></h2>

           <div className="max-w-5xl mx-auto columns-2 md:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6 relative z-10">
               {displayServices.map((srv: any) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={srv._id} 
                    className={`break-inside-avoid relative group rounded-xl md:rounded-3xl overflow-hidden cursor-pointer p-2 md:p-3 ${liquidGlassClass}`} 
                    onClick={() => setOpenService(srv)}
                  >
                     {srv.images && srv.images.length > 0 && (
                         <div className="relative w-full rounded-xl overflow-hidden bg-white/40">
                             <img 
                               src={urlFor(srv.images[0]).url()} 
                               alt={srv.title} 
                               className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white text-sm md:text-xl font-bold tracking-wide leading-snug line-clamp-2 md:line-clamp-none translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{srv.title}</h3>
                                <p className="text-orange-400 font-bold mt-2 flex items-center gap-1 md:gap-2 text-[10px] md:text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">View Service <span className="text-sm md:text-lg">↗</span></p>
                             </div>
                         </div>
                     )}
                  </motion.div>
               ))}
           </div>

           {isHomePage && services.length > 6 && (
             <div className="flex justify-center mt-12 relative z-10">
                <Link href="/service" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm md:text-base font-black rounded-full shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)]">
                    See More Services
                </Link>
             </div>
           )}

           <AnimatePresence>
           {openService && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-2xl overflow-y-auto p-3 md:p-8 flex flex-col">
                 
                 <button onClick={() => setOpenService(null)} className="fixed top-4 right-4 md:top-10 md:right-10 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-full font-bold text-xl hover:bg-orange-500 transition-colors z-[110] shadow-xl flex items-center justify-center">✕</button>
                 
                 <div className="max-w-4xl mx-auto w-full pt-16 md:pt-24 pb-16 relative">
                    <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-400/20 blur-[100px] rounded-full pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-10 text-center px-4 md:px-8 relative z-10 drop-shadow-lg">{openService.title}</h2>
                    
                    {openService.images && openService.images.length > 0 && (
                        <div className="mb-6 md:mb-10 relative z-10">
                            <Swiper 
                                modules={[Pagination]} 
                                pagination={{ clickable: true, dynamicBullets: true }} 
                                spaceBetween={20}
                                slidesPerView={1}
                                className="w-full pb-8 md:pb-10"
                                style={{
                                    "--swiper-pagination-color": "#f97316",
                                    "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.5)",
                                } as any}
                            >
                                {openService.images.map((img: any, idx: number) => (
                                    <SwiperSlide key={idx}>
                                        <DarazZoomImage src={urlFor(img).url()} alt={`Slide ${idx}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <p className="text-center text-[10px] md:text-xs text-gray-300 mt-2 md:mt-3 uppercase tracking-widest font-bold">Hover to zoom & Swipe for more</p>
                        </div>
                    )}

                    <div className={`p-6 md:p-12 rounded-2xl md:rounded-[3rem] text-center md:text-left relative z-10 ${liquidGlassClass} !bg-white/70`}>
                        {openService.description ? (
                            <PortableText value={openService.description} components={ptComponents} />
                        ) : (
                            <p className="text-gray-600 text-sm md:text-base italic font-medium">No description available for this service.</p>
                        )}
                        
                        {openService.orderLink && (
                            <div className="mt-8 md:mt-10 flex justify-center md:justify-start">
                                <a href={openService.orderLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm md:text-lg rounded-full shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] transition-all duration-300">
                                    Order Now
                                </a>
                            </div>
                        )}
                    </div>
                 </div>
              </motion.div>
           )}
           </AnimatePresence>
        </div>
    );
}