// Updated Portfolio.tsx – full file with redesigned Projects section
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { urlFor } from "./sanity";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";

/* --------------------------- Liquid‑glass helper --------------------------- */
const liquidGlassClass =
  "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-[1.5rem]";

/* --------------------------- Image zoom component -------------------------- */
function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [position, setPosition] = useState("50% 50%");
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition(`${x}% ${y}%`);
  };

  return (
    <div className={`w-full flex justify-center items-center ${liquidGlassClass}`}>
      <div
        className="relative overflow-hidden cursor-crosshair rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.08)] w-[90%] h-[35vh] md:h-[45vh] flex justify-center bg-white/50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain transition-transform duration-200 ease-out"
          style={{ transformOrigin: position, transform: hovered ? "scale(2.5)" : "scale(1)" }}
        />
      </div>
    </div>
  );
}

/* --------------------------- PortableText components ----------------------- */
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-6 md:my-10 w-full flex flex-col items-center">
          <ZoomImage src={urlFor(value).url()} alt={value.alt || "Project image"} />
          <p className="text-center text-[10px] md:text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">
            Hover to zoom
          </p>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 font-medium">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-xl md:text-3xl font-black text-gray-900 mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg md:text-2xl font-black text-gray-800 mb-3 mt-5">{children}</h2>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold underline hover:text-orange-600 transition-colors">
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
  },
};

export default function Portfolio({
  projects,
  openProject,
  setOpenProject,
  isHomePage = true,
}: any) {
  const displayProjects = isHomePage ? projects.slice(0, 6) : projects;

  return (
    <div className="w-full relative">
      <div className="flex flex-col items-center text-center mb-10 md:mb-14 relative z-10">
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-orange-600 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1 rounded-full mb-3">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
            Projects
          </span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid auto-rows-fr gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10">
        {displayProjects.map((proj: any, idx: number) => {
          const numStr = (idx + 1).toString().padStart(2, '0');
          return (
            <motion.div
              key={proj._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-black/10 shadow-[0_10px_25px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all duration-500"
              onClick={() => setOpenProject(proj)}
            >
              {proj.image && (
                <Image
                  src={urlFor(proj.image).url()}
                  alt={proj.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-xs font-bold text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {numStr}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {proj.tags?.slice(0, 3).map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="text-[10px] md:text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                        {tag}
                      </span>
                    )) || (
                      <span className="text-[10px] md:text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                        Case Study
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-end gap-4 w-full">
                  <div className="flex flex-col max-w-[80%]">
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                      {proj.summary || 'Click to view full project breakdown and client results.'}
                    </p>
                  </div>
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500 group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isHomePage && projects.length > 6 && (
        <div className="flex justify-center mt-12 relative z-10">
          <Link href="/project" className="px-7 py-3.5 bg-black text-white text-xs md:text-sm font-black uppercase tracking-widest rounded-full shadow-lg transition-all duration-300 hover:bg-orange-500 hover:-translate-y-1">
            See More Projects ↗
          </Link>
        </div>
      )}

      <AnimatePresence>
        {openProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-2xl overflow-y-auto p-3 md:p-8 flex flex-col"
          >
            <button onClick={() => setOpenProject(null)} className="fixed top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-bold text-lg hover:bg-orange-500 transition-colors z-[70] shadow-xl flex items-center justify-center">
              ✕
            </button>
            <div className="max-w-4xl mx-auto w-full pt-16 md:pt-20 pb-16 relative">
              <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-orange-400/20 blur-[90px] rounded-full pointer-events-none" />
              <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 text-center px-4 relative z-10 drop-shadow-lg">
                {openProject.title}
              </h2>
              {openProject.image && (
                <div className="mb-6 md:mb-8 relative z-10">
                  <ZoomImage src={urlFor(openProject.image).url()} alt={openProject.title} />
                  <p className="text-center text-[10px] md:text-xs text-gray-300 mt-2 uppercase tracking-widest font-bold">
                    Hover to zoom
                  </p>
                </div>
              )}
              <div className={`p-6 md:p-10 rounded-2xl md:rounded-[2rem] relative z-10 ${liquidGlassClass} !bg-white/80`}>
                {openProject.description ? (
                  <PortableText value={openProject.description} components={ptComponents} />
                ) : (
                  <p className="text-gray-600 text-center italic text-sm font-medium">No description available for this project.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
