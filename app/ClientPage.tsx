"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
// Ensure sanity.js or sanity.ts is correctly imported
import { urlFor } from "./sanity";
// Ensure Portfolio component exists in the same directory
import Portfolio from "./Portfolio";

// --- Swiper Modules ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// --- অ্যানিমেটেড কাউন্টার ---
function AnimatedCounter({ to, text }: { to: number; text: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    const controls = animate(0, to, {
      duration: 2,
      onUpdate(value) {
        if (node) node.textContent = value.toFixed(0);
      },
    });
    return () => controls.stop();
  }, [to, isInView]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center">
        <span ref={nodeRef}>0</span><span>+</span>
      </div>
      <p className="text-sm md:text-base text-gray-300">{text}</p>
    </div>
  );
}

// --- কাস্টম ইমেজ বাটন (আপনার আপলোড করা আইকন দেখাবে) ---
function CustomSocialButton({ href, imgName }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="relative w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden block"
    >
      <Image 
        src={`/${imgName}`} 
        alt="social icon" 
        fill 
        className="object-cover"
      />
    </a>
  );
}

// --- ফুটার আইকন (ছোট সাইজ) ---
function FooterSocialIcon({ href, imgName }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="relative w-8 h-8 hover:scale-110 transition-transform duration-300 block"
    >
      <Image 
        src={`/${imgName}`} 
        alt="social icon" 
        fill 
        className="object-contain"
      />
    </a>
  );
}

// --- ফ্লোটিং মেনু (লোগো ফিক্স করা হয়েছে) ---
function FloatingNavbar({ hide, logo }: { hide: boolean, logo: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: hide ? -150 : 0, opacity: hide ? 0 : 1 }} transition={{ duration: 0.8 }} className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 md:px-8 md:py-4 flex items-center justify-between w-full max-w-5xl shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto relative z-50">
        
        {/* LOGO SECTION - NO SHAPE, NO CROP */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
           {logo?.logo ? (
             // এখানে গোল শেপ বাদ দেওয়া হয়েছে এবং অরিজিনাল সাইজ রাখা হয়েছে
             <div className="relative h-10 w-auto flex items-center">
               <img 
                 src={urlFor(logo.logo).url()} 
                 alt="Logo" 
                 className="h-10 w-auto object-contain" // লোগোর হাইট ফিক্সড, উইডথ অটোমেটিক অ্যাডজাস্ট হবে
               />
             </div>
           ) : (
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">TK</div>
           )}
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#process" className="hover:text-white transition">Certificate</a>
          <a href="#work" className="hover:text-white transition">Work</a>
          <a href="#reviews" className="hover:text-white transition">Reviews</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        
        <div className="flex items-center gap-4">
            <a href="https://wa.me/8801400905891" target="_blank" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs md:text-sm font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-full transition shadow-lg flex items-center gap-2">
                {/* WhatsApp Icon from public folder */}
                <span className="relative w-5 h-5 block">
                  <Image src="/wa.png" alt="WA" fill className="object-contain" />
                </span>
                Chat on WhatsApp
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition">
                {isOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute top-full mt-2 w-[90%] max-w-sm bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-2 pointer-events-auto md:hidden">
                <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition text-center font-medium">About</a>
                <a href="#process" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition text-center font-medium">Certificate</a>
                <a href="#work" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition text-center font-medium">Work</a>
                <a href="#reviews" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition text-center font-medium">Reviews</a>
                <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition text-center font-medium">Contact</a>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- ম্যাজিক কার্সার ---
function CursorFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-pink-500 z-[9999] pointer-events-none hidden md:block mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
}

// --- স্ক্রল বাটন ---
function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.1) setVisible(true);
      else setVisible(false);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      onClick={scrollToTop}
    >
      <svg width="60" height="60" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle cx="50" cy="50" r="40" stroke="#333" strokeWidth="4" fill="black" />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="#ec4899"
          strokeWidth="4"
          fill="transparent"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
        ↑
      </div>
    </motion.div>
  );
}

// --- মেইন পেজ ---
export default function ClientPage({ logos, projects, testimonials, certificates, siteConfig }: any) {
  const [openProject, setOpenProject] = useState<any>(null);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      
      <CursorFollower />
      <ScrollToTop />

      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navbar with Dynamic Logo */}
      <FloatingNavbar hide={!!openProject} logo={siteConfig} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 pt-32">
        
        {/* Hero */}
        <section className="text-center space-y-6 pt-10 pb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">Scaling Brands with <br /><span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Data-Driven Ads</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Expert Digital Marketing strategies to grow your business.</p>
        </section>

        {/* About & Social Section */}
        <section id="about" className="py-10 scroll-mt-28">
            <div className="relative bg-gradient-to-r from-[#2a0845] to-[#6441A5] rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-white/20 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.5)]"><Image src="/profile.png" alt="Tanvir Kabir" fill className="object-cover" /></div>
                    </div>
                    <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                        <div><h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Tanvir Kabir</h2><p className="text-xl text-purple-200 font-medium">Digital Marketer & Founder of TanEvate</p></div>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">I specialize in Meta Ads, Server-Side Tracking, and building sales funnels.</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16 pt-4 border-t border-white/10 mt-6"><AnimatedCounter to={231} text="Clients" /><AnimatedCounter to={206} text="Good Reviews" /><AnimatedCounter to={2} text="Years Exp." /></div>
                    </div>
                    
                    {/* --- SOCIAL ICONS (From Public Folder) --- */}
                    <div className="lg:col-span-2 flex justify-center lg:justify-end">
                        <div className="grid grid-cols-3 gap-4">
                            <CustomSocialButton href="https://www.facebook.com/fahiminframe" imgName="fb.png" />
                            <CustomSocialButton href="https://www.instagram.com/fahim_inframe" imgName="insta.png" />
                            <CustomSocialButton href="https://www.linkedin.com/in/tanvir-kabir-fahim" imgName="li.png" />
                            <CustomSocialButton href="https://wa.me/8801400905891" imgName="wa.png" />
                            <CustomSocialButton href="https://www.upwork.com/freelancers/~01836058560f27a755" imgName="up.png" />
                            <CustomSocialButton href="#" imgName="fi.png" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Logo Slider */}
        <section className="mb-20 scroll-mt-28" id="logos">
          <p className="text-center text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Trusted By 230+ Clients</p>
          <Swiper spaceBetween={50} slidesPerView="auto" loop={true} speed={3000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full mask-linear-fade">
            {[...logos, ...logos, ...logos].map((logo: any, idx: number) => (
              logo.logo && (<SwiperSlide key={idx} style={{ width: 'auto' }}><div className="relative w-28 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-grab mx-8"><Image src={urlFor(logo.logo).url()} alt="Client" fill className="object-contain" /></div></SwiperSlide>)
            ))}
          </Swiper>
        </section>

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
        <section className="mb-20 scroll-mt-28" id="process">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">My <span className="text-pink-500">Certifications</span></h2>
            <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{ rotate: 0, stretch: 0, depth: 150, modifier: 1, slideShadows: false, scale: 0.85 }} autoplay={{ delay: 2500, disableOnInteraction: false }} loop={true} modules={[EffectCoverflow, Autoplay, Pagination]} className="w-full max-w-5xl py-10">
                {[...certificates, ...certificates, ...certificates].map((cert: any, idx: number) => (
                    <SwiperSlide key={idx} style={{ width: '320px', height: 'auto' }}>
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-[#111]">
                            {cert.image && <Image src={urlFor(cert.image).url()} alt={cert.title} fill className="object-cover" />}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10 text-center"><p className="text-sm md:text-base font-medium text-white tracking-wide">{cert.title}</p></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
        )}
        
        {/* Portfolio */}
        <section className="scroll-mt-28" id="work">
           <Portfolio projects={projects} openProject={openProject} setOpenProject={setOpenProject} />
        </section>

        {/* Reviews */}
        <section className="py-20 scroll-mt-28" id="reviews">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Client <span className="text-pink-500">Feedback</span></h2>
          <Swiper spaceBetween={30} slidesPerView="auto" centeredSlides={true} loop={true} speed={4000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full">
             {[...testimonials, ...testimonials].map((review: any, idx: number) => (
               <SwiperSlide key={idx} style={{ width: 'auto' }}>
                 <div className="w-[350px] md:w-[450px] bg-white/5 border border-white/10 p-8 rounded-2xl relative flex-shrink-0 hover:bg-white/10 transition cursor-grab">
                    <div className="text-4xl text-blue-500 mb-4">❝</div>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed select-none">{review.feedback}</p>
                    <div className="flex items-center gap-4 mt-auto">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700 border border-white/20">{review.photo && <Image src={urlFor(review.photo).url()} alt={review.name} fill className="object-cover" /> }</div>
                        <div><h4 className="font-bold text-white text-sm">{review.name}</h4><p className="text-xs text-gray-500">{review.designation}</p></div>
                    </div>
                </div>
               </SwiperSlide>
             ))}
          </Swiper>
        </section>

      </div>
      
      {/* Footer */}
      <footer id="contact" className="relative z-20 bg-black pt-20 pb-10 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-10 rounded-3xl border border-white/5">
                <div className="text-center md:text-left"><h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">Ready to Scale?</h2><p className="text-gray-400 text-lg">Let's build your growth strategy today.</p></div>
                <a href="https://wa.me/8801400905891" target="_blank" className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow duration-300">
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition duration-300">
                        {/* WA Icon */}
                        <span className="relative w-5 h-5 block">
                            <Image src="/wa.png" alt="WA" fill className="object-contain" />
                        </span>
                        Chat on WhatsApp
                    </span>
                    <div className="absolute inset-0 bg-[#25D366] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-white/5 text-xs text-gray-500">
                <p>© {new Date().getFullYear()} Tanvir Kabir | All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <FooterSocialIcon href="https://www.linkedin.com/in/tanvir-kabir-fahim" imgName="li.png" />
                    <FooterSocialIcon href="https://www.facebook.com/fahiminframe" imgName="fb.png" />
                    <FooterSocialIcon href="https://www.instagram.com/fahim_inframe" imgName="insta.png" />
                    <FooterSocialIcon href="https://wa.me/8801400905891" imgName="wa.png" />
                </div>
            </div>
        </div>
      </footer>

    </main>
  );
}