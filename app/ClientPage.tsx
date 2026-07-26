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
    <div className="text-center bg-white/40 backdrop-blur-2xl border border-white/60 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
      <div className="text-4xl md:text-5xl font-black text-black flex justify-center items-center"><span ref={nodeRef}>0</span><span className="text-orange-500 ml-1">+</span></div>
      <p className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">{text}</p>
    </div>
  );
}

const liquidGlassClass = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-[2rem]";

function Hero3D({ homeData }: any) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const glowX1 = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"]);
  const glowX2 = useTransform(scrollYProgress, [0, 1], ["100%", "-20%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const glowX3 = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const glowY3 = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);

  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);
  
  const nameLeftX = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100vw"]);
  const nameRightX = useTransform(scrollYProgress, [0, 0.15], ["0%", "100vw"]);

  const journeyY = useTransform(scrollYProgress, [0.15, 0.25, 0.35], ["100vh", "0vh", "-100vh"]);
  const journeyOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const journeyScale = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0.8, 1, 1.2]);

  const trustY = useTransform(scrollYProgress, [0.35, 0.45, 0.55], ["100vh", "0vh", "-100vh"]);
  const trustOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const trustScale = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0.8, 1, 1.2]);

  const dataY = useTransform(scrollYProgress, [0.55, 0.65, 0.75], ["100vh", "0vh", "-100vh"]);
  const dataOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const dataScale = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0.8, 1, 1.2]);

  const cardsGroupY = useTransform(scrollYProgress, [0.75, 0.85], ["150%", "0%"]);
  const cardsGroupRotateX = useTransform(scrollYProgress, [0.75, 0.85], [75, 0]);
  const cardsGroupScale = useTransform(scrollYProgress, [0.75, 0.85, 1], [0.6, 1, 1.3]);
  const cardsOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0]);

  const leftCardX = useTransform(scrollYProgress, [0.8, 0.9], ["0%", "-110%"]);
  const leftCardRotateZ = useTransform(scrollYProgress, [0.8, 0.9], [0, -10]);

  const rightCardX = useTransform(scrollYProgress, [0.8, 0.9], ["0%", "110%"]);
  const rightCardRotateZ = useTransform(scrollYProgress, [0.8, 0.9], [0, 10]);
  
  const centerCardZ = useTransform(scrollYProgress, [0.8, 0.9], [0, 150]);

  const firstName = homeData?.profileName?.split(' ')[0] || "Tanvir";
  const lastName = homeData?.profileName?.split(' ').slice(1).join(' ') || "Kabir";
  const imageSrc = homeData?.profileImage ? urlFor(homeData.profileImage).url() : "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80";
  const bio = homeData?.profileBio?.[0]?.children?.[0]?.text || "Started with a passion for marketing. Evolved into a data-driven ads master. Generating massive ROAS for e-commerce brands globally.";
  
  return (
    <div ref={containerRef} className="h-[800vh] relative z-40 bg-[#F9F9F6]">
      <div 
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
          style={{ perspective: 1500 }}
      >
        <motion.div style={{ x: glowX1, y: glowY1 }} className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none" />
        <motion.div style={{ x: glowX2, y: glowY2 }} className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none" />
        <motion.div style={{ x: glowX3, y: glowY3 }} className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full h-full absolute inset-0 flex items-center justify-center transform-gpu">
           
            <motion.div 
              style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
              className="absolute z-40 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full px-4"
            >
                <motion.h1 style={{ x: nameLeftX }} className="text-[clamp(3.5rem,8vw,7rem)] font-black text-black leading-none drop-shadow-xl md:drop-shadow-none">
                   {firstName}
                </motion.h1>

                <div className={`relative w-[240px] h-[320px] md:w-[320px] md:h-[420px] flex items-center justify-center p-3 ${liquidGlassClass} shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-[2rem] pointer-events-none"></div>
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                       <Image src={imageSrc} alt="Profile" fill className="object-cover object-bottom" priority />
                    </div>
                </div>

                <motion.h1 style={{ x: nameRightX }} className="text-[clamp(3.5rem,8vw,7rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 leading-none drop-shadow-xl md:drop-shadow-none">
                   {lastName}
                </motion.h1>
            </motion.div>

            <motion.div 
              style={{ y: journeyY, opacity: journeyOpacity, scale: journeyScale }}
              className={`absolute z-30 flex flex-col items-center text-center p-10 md:p-16 max-w-2xl mx-4 ${liquidGlassClass}`}
            >
               <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg text-white font-black text-2xl">1</div>
               <h2 className="text-3xl md:text-5xl font-black text-black mb-4">The Journey Begins</h2>
               <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                 {bio}
               </p>
            </motion.div>

            <motion.div 
              style={{ y: trustY, opacity: trustOpacity, scale: trustScale }}
              className={`absolute z-30 flex flex-col items-center text-center p-10 md:p-16 max-w-2xl mx-4 ${liquidGlassClass}`}
            >
               <div className="w-16 h-16 bg-gradient-to-tr from-blue-400 to-teal-400 rounded-full flex items-center justify-center mb-6 shadow-lg text-white font-black text-2xl">2</div>
               <h2 className="text-3xl md:text-5xl font-black text-black mb-4">Building Trust</h2>
               <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8">
                 Trust isn't given, it's earned through consistent results. My track record speaks for itself.
               </p>
               <div className="flex gap-4 w-full justify-center">
                  <div className="bg-white/50 backdrop-blur-md px-6 py-4 rounded-xl border border-white/60">
                      <span className="block text-3xl font-black text-blue-600">{homeData?.clientsCount || 102}+</span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Brands Scaled</span>
                  </div>
                  <div className="bg-white/50 backdrop-blur-md px-6 py-4 rounded-xl border border-white/60">
                      <span className="block text-3xl font-black text-teal-600">{homeData?.retentionRate || 98}%</span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Retention Rate</span>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              style={{ y: dataY, opacity: dataOpacity, scale: dataScale }}
              className={`absolute z-30 flex flex-col items-center text-center p-10 md:p-16 max-w-2xl mx-4 ${liquidGlassClass}`}
            >
               <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg text-white font-black text-2xl">3</div>
               <h2 className="text-3xl md:text-5xl font-black text-black mb-4">Data-Driven Precision</h2>
               <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                 No guesswork. No emotion. Just pure analytics, aggressive testing, and strategic scaling to dominate your market.
               </p>
            </motion.div>

            <motion.div
              style={{ y: cardsGroupY, rotateX: cardsGroupRotateX, scale: cardsGroupScale, opacity: cardsOpacity, transformStyle: "preserve-3d" }}
              className="absolute z-20 flex items-center justify-center w-full mt-10 md:mt-0"
            >
               <motion.div 
                 style={{ x: leftCardX, rotateZ: leftCardRotateZ }}
                 className={`absolute w-[260px] h-[360px] md:w-[300px] md:h-[400px] p-6 flex flex-col justify-end overflow-hidden ${liquidGlassClass}`}
               >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
                  <h3 className="relative z-20 text-2xl font-black text-black">Performance</h3>
                  <p className="relative z-20 text-orange-600 font-bold tracking-widest uppercase text-xs mt-1">Marketing</p>
               </motion.div>

               <motion.div 
                 style={{ x: rightCardX, rotateZ: rightCardRotateZ }}
                 className={`absolute w-[260px] h-[360px] md:w-[300px] md:h-[400px] p-6 flex flex-col justify-end overflow-hidden ${liquidGlassClass}`}
               >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
                  <h3 className="relative z-20 text-2xl font-black text-black">Data Analytics</h3>
                  <p className="relative z-20 text-orange-600 font-bold tracking-widest uppercase text-xs mt-1">Strategy</p>
               </motion.div>

               <motion.div 
                 style={{ translateZ: centerCardZ }}
                 className={`relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] p-8 flex flex-col items-center justify-center text-center z-10 ${liquidGlassClass} !bg-white/60`}
               >
                  <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-yellow-400 rounded-full blur-xl absolute top-10 right-10 opacity-50"></div>
                  <h2 className="text-3xl md:text-4xl font-black text-black mb-4 relative z-10">Unlocking <br/><span className="text-orange-500">Growth</span></h2>
                  <p className="text-gray-600 font-medium text-sm md:text-base relative z-10">Keep scrolling to enter the main website</p>
                  <div className="mt-8 w-12 h-12 md:w-16 md:h-16 rounded-full border-t-4 border-r-4 border-orange-500 animate-spin relative z-10"></div>
               </motion.div>
            </motion.div>

        </div>
      </div>
    </div>
  );
}

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
      
      {/* 3D Liquid Glass Hero */}
      <Hero3D homeData={homeData} />

      {/* Main Website Content following the Hero */}
      <div className="relative z-30 bg-[#F9F9F6] border-t border-white shadow-[0_-20px_40px_rgba(0,0,0,0.05)] backdrop-blur-3xl pt-24 pb-16">
        
        {/* Glow behind main content for Liquid Glass Refraction */}
        <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] bg-orange-300/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/2 right-0 w-[400px] h-[400px] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 md:px-8">
            <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-8 md:py-12 mb-12">
                <div className="flex flex-wrap justify-center gap-8 md:gap-20">
                    <AnimatedCounter to={homeData?.clientsCount || 102} text="Clients" />
                    <AnimatedCounter to={homeData?.retentionRate || 98} text="Retention %" />
                    <AnimatedCounter to={homeData?.yearsExp || 4} text="Years Exp." />
                </div>
            </motion.section>

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