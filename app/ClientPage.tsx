"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { animate, useInView, motion, useSpring, useMotionValue } from "framer-motion";
import { urlFor } from "./sanity";
import Portfolio from "./Portfolio";
import Services from "./components/Services"; 
import BlogList from "./components/BlogList"; 
import { PortableText } from '@portabletext/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';

function AnimatedCounter({ to, text }: { to: number; text: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    const controls = animate(0, to || 0, { duration: 2.5, ease: "easeOut", onUpdate(value) { if (node) node.textContent = value.toFixed(0); } });
    return () => controls.stop();
  }, [to, isInView]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-black text-black flex justify-center items-center"><span ref={nodeRef}>0</span><span className="text-orange-500 ml-1">+</span></div>
      <p className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">{text}</p>
    </div>
  );
}

const ptComponents = {
  block: {
    normal: ({children}: any) => <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">{children}</p>,
    h1: ({children}: any) => {
        return (
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black mb-0 leading-tight z-20 relative">
                {children}
            </h1>
        )
    },
  },
  marks: {
    strong: ({children}: any) => <span className="text-orange-500 font-black">{children}</span>
  },
};

function HomeContent({ logos, projects, services, blogs, testimonials, homeData, siteConfig }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const projectIdFromUrl = searchParams.get("project");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const [openProject, setOpenProject] = useState<any>(null);

  useEffect(() => {
    if (projectIdFromUrl && projects) {
      const matchedProject = projects.find((p: any) => p._id === projectIdFromUrl);
      if (matchedProject) {
        setOpenProject(matchedProject);
      }
    } else {
      setOpenProject(null);
    }
  }, [projectIdFromUrl, projects]);

  const handleProjectChange = (project: any) => {
    setOpenProject(project);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (project && project._id) {
      params.set("project", project._id);
    } else {
      params.delete("project");
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => { mouseX.set(e.clientX - 16); mouseY.set(e.clientY - 16); };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-orange-500 selection:text-white bg-[#F9F9F6]">
      
      <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      <Script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0" strategy="lazyOnload" crossOrigin="anonymous" />
      
      <div id="fb-root"></div>

      <motion.div className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-orange-500 z-[9999] pointer-events-none hidden md:block" style={{ x: springX, y: springY }} />
      
      <div className="fixed top-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-300/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-20 md:pt-24">
        
        <section className="relative flex flex-col items-center justify-center pt-2 pb-6 md:pb-8 overflow-visible">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative mb-3 md:mb-5">
                <div className="px-4 py-1 border border-gray-200 rounded-full text-sm font-bold bg-white shadow-sm flex items-center gap-1">
                   {homeData?.heroSubheading || "Hello!"}
                   <span className="text-orange-400 rotate-12 inline-block">✨</span>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-4xl mx-auto relative z-20">
                {homeData?.heroHeading ? (
                    <PortableText value={homeData.heroHeading} components={ptComponents} />
                ) : (
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-0 leading-tight">
                        I'm <span className="text-orange-500">Tanvir</span>, <br /> A Data-Driven Ads Master
                    </h1>
                )}
            </motion.div>

            <div className="relative w-full max-w-4xl h-auto flex justify-center items-end mt-4 md:mt-2 z-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-0 w-[280px] h-[140px] md:w-[480px] md:h-[240px] bg-orange-400 rounded-t-full blur-none" />
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative z-10 w-full h-[280px] md:h-[450px] flex justify-center items-end">
                    {homeData?.profileImage && (
                        <Image 
                            src={urlFor(homeData.profileImage).url()} 
                            alt={homeData?.profileName || "Tanvir Kabir"} 
                            fill
                            priority
                            className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)]"
                        />
                    )}
                </motion.div>
            </div>
        </section>

        <section id="work" className="mb-24"><Portfolio projects={projects} openProject={openProject} setOpenProject={handleProjectChange} isHomePage={true} /></section>
        <section id="service" className="mb-24"><Services services={services} isHomePage={true} /></section>
        <section id="blog" className="mb-24"><BlogList blogs={blogs} isHomePage={true} /></section>
      </div>

      <footer id="contact" className="relative z-20 bg-black pt-16 pb-8 border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
            
            {/* Standardized Badge Grid - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 justify-items-center">
                
                {/* 1. LinkedIn Badge */}
                <div className="flex flex-col items-center bg-[#1D2226] p-4 rounded-2xl border border-gray-800 w-full max-w-[300px] h-[300px] overflow-hidden justify-center shadow-lg">
                    <p className="text-white text-[10px] font-bold mb-3 uppercase tracking-widest">LinkedIn</p>
                    <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="tanvir-kabir-fahim" data-version="v1"></div>
                </div>

                {/* 2. FB Personal */}
                <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-gray-800 w-full max-w-[300px] h-[300px] overflow-hidden justify-center shadow-lg">
                    <p className="text-black text-[10px] font-bold mb-3 uppercase tracking-widest">Facebook</p>
                    <div className="fb-page" data-href="https://www.facebook.com/md.tanvir.kabir.fahim" data-width="300" data-height="250" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"></div>
                </div>

                {/* 3. Instagram */}
                <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-gray-800 w-full max-w-[300px] h-[300px] overflow-hidden justify-center shadow-lg group relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-[0.03]"></div>
                        <p className="text-black text-[10px] font-bold mb-3 uppercase tracking-widest relative z-10">Instagram</p>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px] mb-3">
                            <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-white">
                                {homeData?.profileImage && <Image src={urlFor(homeData.profileImage).url()} alt="IG" width={64} height={64} className="object-cover" />}
                            </div>
                        </div>
                        <h3 className="text-black font-bold text-lg relative z-10">@fahim_inframe</h3>
                        <a href="https://www.instagram.com/fahim_inframe/" target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-2 bg-black text-white text-xs font-bold rounded-full relative z-10 hover:bg-orange-500 transition-colors">View Profile</a>
                </div>
            </div>

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

export default function ClientPage(props: any) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F9F6]"></div>}>
      <HomeContent {...props} />
    </Suspense>
  );
}