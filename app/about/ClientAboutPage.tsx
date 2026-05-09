"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "../sanity";
import Navbar from "../components/Navbar";

export default function ClientAboutPage({ aboutData, siteConfig }: any) {
  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black selection:bg-orange-500 selection:text-white pb-20">
      <Navbar config={siteConfig} />

      {/* 1. The Bold Hook (Hero Section) */}
      <section className="relative pt-40 pb-20 px-4 md:px-8 max-w-6xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
                    {aboutData?.heroTitle || "I don't just run ads; I architect growth systems."}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8 border-l-4 border-orange-500 pl-6">
                    {aboutData?.heroBio || "Welcome to my digital workspace. I specialize in turning complex data into predictable revenue using advanced funnel strategies and precise tracking."}
                </p>
                <Link href="#contact" className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-orange-500 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-1">
                    Book a Strategy Call
                </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="order-1 lg:order-2 relative flex justify-center">
                <div className="relative w-full max-w-md h-[400px] md:h-[500px]">
                    <div className="absolute inset-0 bg-orange-400 rounded-[3rem] rotate-3 opacity-20"></div>
                    <div className="absolute inset-0 bg-orange-500 rounded-[3rem] -rotate-3 blur-2xl opacity-10"></div>
                    <div className="relative w-full h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                        {aboutData?.heroImage ? (
                            <Image src={urlFor(aboutData.heroImage).url()} alt="Profile" fill className="object-cover object-bottom" priority />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Add Photo in Sanity</div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 2. The Skill Matrix */}
      {aboutData?.skills && aboutData.skills.length > 0 && (
          <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
             <div className="text-center mb-16">
                 <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">Core Capabilities</span>
                 <h2 className="text-4xl md:text-5xl font-black text-black">The Skill Matrix</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                 {aboutData.skills.map((skill: any, idx: number) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] transition-all duration-300 group"
                     >
                         <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 group-hover:scale-110 transition-transform">0{idx + 1}</div>
                         <h3 className="text-2xl font-bold text-gray-900 mb-3">{skill.title}</h3>
                         <p className="text-gray-600 font-medium leading-relaxed">{skill.description}</p>
                     </motion.div>
                 ))}
             </div>
          </section>
      )}

      {/* 3. The 'How I Work' Process */}
      {aboutData?.process && aboutData.process.length > 0 && (
          <section className="py-24 px-4 md:px-8 bg-black text-white my-20">
             <div className="max-w-6xl mx-auto">
                 <div className="text-center mb-20">
                     <h2 className="text-4xl md:text-5xl font-black mb-4">How I Work</h2>
                     <p className="text-gray-400 text-lg">A systematic approach to scaling your brand.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                     {/* Connecting Line for Desktop */}
                     <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-800 z-0"></div>

                     {aboutData.process.map((proc: any, idx: number) => (
                         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} key={idx} className="relative z-10 flex flex-col items-center text-center">
                             <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-black text-2xl text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] mb-8 border-4 border-black">
                                 {idx + 1}
                             </div>
                             <h3 className="text-2xl font-bold mb-4">{proc.stepName}</h3>
                             <p className="text-gray-400 font-medium leading-relaxed">{proc.stepDescription}</p>
                         </motion.div>
                     ))}
                 </div>
             </div>
          </section>
      )}

      {/* 4. The Tech Stack */}
      {aboutData?.techStack && aboutData.techStack.length > 0 && (
          <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto text-center">
             <h2 className="text-3xl font-black text-gray-900 mb-12">Powered by Premium Tools</h2>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                 {aboutData.techStack.map((icon: any, idx: number) => (
                     <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} key={idx} className="relative w-16 h-16 md:w-20 md:h-20 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300">
                         <Image src={urlFor(icon).url()} alt="Tech Stack Icon" fill className="object-contain" />
                     </motion.div>
                 ))}
             </div>
          </section>
      )}

      {/* 5. Mission Statement */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto text-center">
          <div className="text-6xl text-orange-200 mb-6 font-serif">❝</div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              {aboutData?.missionStatement || "My mission is to help brands scale with surgical precision and predictable results."}
          </h2>
      </section>

      {/* Global Footer Include */}
      <footer id="contact" className="relative z-20 bg-black pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-gradient-to-r from-gray-900 to-black p-8 rounded-3xl border border-gray-800 shadow-2xl">
                <div className="text-center md:text-left"><h2 className="text-3xl md:text-4xl font-black mb-2 text-white">Ready to Scale?</h2><p className="text-gray-400 text-base font-medium">Let's build your growth strategy today.</p></div>
                <a href={siteConfig?.ctaLink || "https://wa.me/8801400905891"} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base rounded-full overflow-hidden shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all">
                    <span className="relative z-10 flex items-center gap-3"><span className="relative w-5 h-5 block"><Image src="/wa.png" alt="WA" fill className="object-contain" /></span>{siteConfig?.ctaText || "Chat on WhatsApp"}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-800 text-xs font-medium text-gray-500">
                <p>© {new Date().getFullYear()} Tanvir Kabir | All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
                    {siteConfig?.socialIcons?.map((social: any, idx: number) => (
                        <a key={idx} href={social.url || "#"} target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] group">
                            {social.icon && <Image src={urlFor(social.icon).url()} alt={social.platform || "social"} width={16} height={16} className="object-contain group-hover:brightness-0 transition-all duration-300" />}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}