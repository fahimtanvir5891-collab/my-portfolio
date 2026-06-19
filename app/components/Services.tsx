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

// এখানে ইমেজ রেন্ডার করার কাস্টম রুলস (types: { image }) অ্যাড করা হয়েছে
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 w-full flex justify-center">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "Service content image"}
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

// সার্ভিসের গিগ ইমেজের সাইজ 60vh থেকে কমিয়ে 45vh করা হয়েছে
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
                className="block w-auto h-auto max-w-full max-h-[45vh] transition-transform duration-200 ease-out" 
                style={{ transformOrigin: position, transform: isHovered ? "scale(2.5)" : "scale(1)" }} 
             />
          </div>
       </div>
    );
}

export default function Services({ services, isHomePage = true }: any) {
    const [openService, setOpenService] = useState<any>(null);
    const displayServices = isHomePage ? services.slice(0, 6) : services;

    return (
        <div className="w-full">
           <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-black">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Services</span></h2>

           {/* max-w-5xl দিয়ে কার্ড সাইজ স্ট্যান্ডার্ড করা হয়েছে */}
           <div className="max-w-5xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
               {displayServices.map((srv: any) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={srv._id} 
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.04)] bg-white border border-gray-100" 
                    onClick={() => setOpenService(srv)}
                  >
                     {srv.images && srv.images.length > 0 && (
                         <img 
                           src={urlFor(srv.images[0]).url()} 
                           alt={srv.title} 
                           className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                         />
                     )}
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h3 className="text-white text-xl font-bold tracking-wide leading-snug">{srv.title}</h3>
                        <p className="text-orange-400 font-bold mt-1 flex items-center gap-2 text-sm">View Service <span className="text-lg">↗</span></p>
                     </div>
                  </motion.div>
               ))}
           </div>

           {isHomePage && services.length > 6 && (
             <div className="flex justify-center mt-12">
                <Link href="/service" className="px-8 py-3 bg-black text-white text-base font-bold rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-1">
                    See more services
                </Link>
             </div>
           )}

           <AnimatePresence>
           {openService && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#F9F9F6]/95 backdrop-blur-xl overflow-y-auto p-4 md:p-8 flex flex-col">
                 <button onClick={() => setOpenService(null)} className="fixed top-24 right-4 md:top-24 md:right-8 w-10 h-10 bg-black text-white rounded-full font-bold text-lg hover:bg-orange-500 transition-colors z-[110] shadow-xl flex items-center justify-center">✕</button>
                 
                 <div className="max-w-4xl mx-auto w-full pt-24 pb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-8 text-center px-8">{openService.title}</h2>
                    
                    {openService.images && openService.images.length > 0 && (
                        <div className="mb-10 relative">
                            <Swiper 
                                modules={[Pagination]} 
                                pagination={{ clickable: true, dynamicBullets: true }} 
                                spaceBetween={20}
                                slidesPerView={1}
                                className="w-full pb-10"
                                style={{
                                    "--swiper-pagination-color": "#f97316",
                                    "--swiper-pagination-bullet-inactive-color": "#999999",
                                } as any}
                            >
                                {openService.images.map((img: any, idx: number) => (
                                    <SwiperSlide key={idx}>
                                        <DarazZoomImage src={urlFor(img).url()} alt={`Slide ${idx}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <p className="text-center text-xs text-gray-400 mt-2 uppercase tracking-widest font-bold">Hover to zoom & Swipe for more</p>
                        </div>
                    )}

                    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-lg border border-gray-100 text-center md:text-left">
                        {openService.description ? (
                            <PortableText value={openService.description} components={ptComponents} />
                        ) : (
                            <p className="text-gray-500 italic">No description available for this service.</p>
                        )}
                        
                        {openService.orderLink && (
                            <div className="mt-10 flex justify-center md:justify-start">
                                <a href={openService.orderLink} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] transition-all duration-300">
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