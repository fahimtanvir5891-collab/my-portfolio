"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { animate, useInView, motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { urlFor } from "./sanity";
import Portfolio from "./Portfolio";
import Services from "./components/Services"; 
import BlogList from "./components/BlogList"; 
import { PortableText } from '@portabletext/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';

function AnimatedCounter({ to, text, index }: { to: number; text: string; index: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    const controls = animate(0, to || 0, { duration: 2.5, ease: "easeOut", onUpdate(value) { if (node) node.textContent = value.toFixed(0); } });
    return () => controls.stop();
  }, [to, isInView]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col justify-center px-8 py-6 bg-white/40 backdrop-blur-2xl border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-[2rem] border-t-0 md:border-t ${index > 0 ? 'md:border-l' : ''} md:rounded-none ${index === 0 ? 'md:rounded-l-[2rem]' : ''} ${index === 2 ? 'md:rounded-r-[2rem]' : ''}`}
    >
      <div className="text-4xl md:text-6xl font-black text-black flex items-center mb-1"><span ref={nodeRef}>0</span><span className="text-orange-500 ml-1">+</span></div>
      <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest">{text}</p>
    </motion.div>
  );
}

const liquidGlassClass = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-[2rem]";

function HeroHeynesh({ homeData }: any) {
  const firstName = homeData?.profileName?.split(' ')[0] || "Tanvir";
  const lastName = homeData?.profileName?.split(' ').slice(1).join(' ') || "Kabir";
  const imageSrc = homeData?.profileImage ? urlFor(homeData.profileImage).url() : "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80";
  const bio = homeData?.profileBio?.[0]?.children?.[0]?.text || "Started with a passion for marketing. Evolved into a data-driven ads master. Generating massive ROAS for e-commerce brands globally.";

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col justify-center overflow-hidden pt-32 pb-16 px-4 md:px-8 bg-[#F9F9F6]">
       {/* Background Glows */}
       <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-400/20 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-400/20 blur-[120px] rounded-full pointer-events-none" />
       
       <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
           
           {/* Floating Image Component */}
           <motion.div 
              initial={{ y: 50, opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-[180px] h-[240px] md:w-[240px] md:h-[320px] flex items-center justify-center p-2 mb-8 md:mb-12 ${liquidGlassClass} shadow-[0_20px_50px_rgba(0,0,0,0.1)] group`}
           >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-[2rem] pointer-events-none"></div>
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                   <Image src={imageSrc} alt="Profile" fill className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105" priority />
                </div>
           </motion.div>

           {/* Typography */}
           <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center w-full">
               <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(4rem,10vw,9rem)] font-black text-black leading-none tracking-tighter"
               >
                 {firstName}
               </motion.h1>
               <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(4rem,10vw,9rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 leading-none tracking-tighter"
               >
                 {lastName}
               </motion.h1>
           </div>
           
           {/* Bio / Description */}
           <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-12 max-w-3xl text-center"
           >
               <p className="text-xl md:text-3xl text-gray-600 font-medium leading-relaxed tracking-tight">
                 {bio}
               </p>
           </motion.div>

           {/* Scroll Indicator */}
           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 md:mt-24 flex flex-col items-center gap-4"
           >
               <div className="w-8 h-12 rounded-full border-2 border-orange-500/30 flex justify-center p-1">
                   <motion.div 
                       animate={{ y: [0, 16, 0] }} 
                       transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
                       className="w-1.5 h-3 bg-orange-500 rounded-full"
                   />
               </div>
           </motion.div>
       </div>
    </section>
  );
}

function HomeContent({ logos, projects, services, blogs, testimonials, homeData, siteConfig }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const projectIdFromUrl = searchParams.get("project");

  const firstName = homeData?.profileName?.split(' ')[0] || "Tanvir";
  const lastName = homeData?.profileName?.split(' ').slice(1).join(' ') || "Kabir";

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
      
      {/* Heynesh-style Hero */}
      <HeroHeynesh homeData={homeData} />

      {/* Main Website Content */}
      <div className="relative z-30 bg-[#F9F9F6] border-t-4 border-white/40 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] backdrop-blur-3xl pt-16 pb-16">
        
        {/* Glow behind main content for Liquid Glass Refraction */}
        <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] bg-orange-300/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/2 right-0 w-[400px] h-[400px] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 md:px-8">
            <section className="mb-16 md:mb-24 flex justify-center mt-[-3rem] md:mt-[-4rem] relative z-20">
                <div className="flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] md:rounded-full bg-white/30 backdrop-blur-3xl overflow-hidden p-2 gap-2 md:gap-0">
                    <AnimatedCounter to={homeData?.clientsCount || 102} text="Clients" index={0} />
                    <AnimatedCounter to={homeData?.retentionRate || 98} text="Retention %" index={1} />
                    <AnimatedCounter to={homeData?.yearsExp || 4} text="Years Exp." index={2} />
                </div>
            </section>

            <section className="mb-16 pt-2" id="logos">
              <p className="text-center text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-6">Trusted By Great Clients</p>
              <Swiper spaceBetween={40} slidesPerView="auto" loop={true} speed={3000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full mask-linear-fade">
                {[...(logos || []), ...(logos || []), ...(logos || [])].map((logo: any, idx: number) => (
                  logo?.logo && (<SwiperSlide key={idx} style={{ width: 'auto' }}><div className="relative w-24 h-10 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 mx-6"><Image src={urlFor(logo.logo).url()} alt="Client" fill className="object-contain" /></div></SwiperSlide>)
                ))}
              </Swiper>
            </section>

            <section id="work" className="mb-24">
                <Portfolio projects={projects} openProject={openProject} setOpenProject={handleProjectChange} isHomePage={true} />
            </section>
            
            <section id="service" className="mb-24">
                <Services services={services} isHomePage={true} />
            </section>
            
            <section id="blog" className="mb-24">
                <BlogList blogs={blogs} isHomePage={true} />
            </section>

            <section className="py-16" id="reviews">
              <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-black">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Feedback</span></h2>
              <Swiper spaceBetween={24} slidesPerView="auto" centeredSlides={true} loop={true} speed={4000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full">
                 {[...(testimonials || []), ...(testimonials || []), ...(testimonials || []), ...(testimonials || [])].map((review: any, idx: number) => (
                   <SwiperSlide key={idx} style={{ width: 'auto' }}>
                     <div className={`w-[300px] md:w-[400px] p-8 cursor-grab hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] transition-all duration-300 ${liquidGlassClass}`}>
                        <div className="text-6xl text-orange-200 absolute top-2 right-6 font-serif leading-none">❝</div>
                        <p className="text-gray-600 mb-8 text-base leading-relaxed relative z-10 font-medium italic">{review.feedback}</p>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-50 border-2 border-orange-500">{review?.photo && <Image src={urlFor(review.photo).url()} alt={review.name} fill className="object-cover" />}</div>
                            <div><h4 className="font-bold text-black text-base">{review.name}</h4><p className="text-xs font-bold text-orange-500">{review.designation}</p></div>
                        </div>
                    </div>
                   </SwiperSlide>
                 ))}
              </Swiper>
            </section>
        </div>

        <footer id="contact" className={`relative z-20 max-w-6xl mx-auto px-6 md:px-8 mt-16 ${liquidGlassClass} !p-12 md:!p-16`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/50 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/60 shadow-xl">
                <div className="text-center md:text-left"><h2 className="text-3xl md:text-4xl font-black mb-2 text-black">Ready to Scale?</h2><p className="text-gray-600 text-base font-medium">Let's build your growth strategy today.</p></div>
                <a href={siteConfig?.ctaLink || "https://wa.me/8801400905891"} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base rounded-full overflow-hidden shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all">
                    <span className="relative z-10 flex items-center gap-3"><span className="relative w-5 h-5 block"><Image src="/wa.png" alt="WA" fill className="object-contain" /></span>{siteConfig?.ctaText || "Chat on WhatsApp"}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-black/10 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <p>© {new Date().getFullYear()} {firstName} {lastName} | All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
                    {siteConfig?.socialIcons?.map((social: any, idx: number) => (
                        <a key={idx} href={social.url || "#"} target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-white border border-black/5 rounded-full hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] group">
                            {social.icon && <Image src={urlFor(social.icon).url()} alt={social.platform || "social"} width={16} height={16} className="object-contain transition-all duration-300" />}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
      </div>
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