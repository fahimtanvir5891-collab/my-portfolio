"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "./sanity";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // মোডাল ওপেন হলে স্লাইড রিসেট হবে
  useEffect(() => {
    if (selectedProject) setCurrentSlide(0);
  }, [selectedProject]);

  // পরের স্লাইডে যাওয়ার ফাংশন
  const nextSlide = (e: any) => {
    e.stopPropagation();
    if (!selectedProject?.gallery) return;
    setCurrentSlide((prev) => 
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    );
  };

  // আগের স্লাইডে যাওয়ার ফাংশন
  const prevSlide = (e: any) => {
    e.stopPropagation();
    if (!selectedProject?.gallery) return;
    setCurrentSlide((prev) => 
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  };

  return (
    <section id="work" className="py-20 px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
        Selected <span className="text-blue-500">Case Studies</span>
      </h2>

      {/* গ্রিড গ্যালারি */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project._id}`}
            key={project._id}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
          >
            <div className="relative h-60 w-full overflow-hidden">
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
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
              <button className="mt-4 text-blue-400 text-sm font-semibold group-hover:underline">
                View Results →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* পপ-আপ মোডাল (স্লাইডার সহ) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              layoutId={`card-${selectedProject._id}`}
              className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* স্লাইডার এরিয়া */}
              <div className="relative h-64 md:h-[500px] w-full bg-black">
                {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                  // যদি গ্যালারি ছবি থাকে তবে স্লাইডার দেখাও
                  <>
                    <Image
                      key={currentSlide}
                      src={urlFor(selectedProject.gallery[currentSlide]).url()}
                      alt="Gallery Image"
                      fill
                      className="object-contain" // পুরো ছবি দেখাবে, কাটবে না
                    />
                    
                    {/* স্লাইডার বাটন (যদি ১টার বেশি ছবি থাকে) */}
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition"
                        >
                          →
                        </button>
                        {/* পেজিনেশন ডট (নিচে ছোট গোল গোল) */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.gallery.map((_: any, idx: number) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                idx === currentSlide ? "bg-white" : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  // গ্যালারি না থাকলে মেইন ছবি দেখাও
                  selectedProject.image && (
                    <Image
                      src={urlFor(selectedProject.image).url()}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  )
                )}

                {/* ক্লোজ বাটন */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md transition z-20"
                >
                  ✕
                </button>
              </div>

              {/* কন্টেন্ট এরিয়া */}
              <div className="p-8 overflow-y-auto bg-[#111]">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition"
                  >
                    See Live Project 🔗
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}