"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
      {/* text-6xl থেকে কমিয়ে 5xl করা হয়েছে */}
      <div className="text-4xl md:text-5xl font-black text-black flex justify-center items-center"><span ref={nodeRef}>0</span><span className="text-orange-500 ml-1">+</span></div>
      <p className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">{text}</p>
    </div>
  );
}

const ptComponents = {
  block: {
    normal: ({children}: any) => <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">{children}</p>,
    h1: ({children}: any) => <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black mb-4 leading-tight">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">{children}</h2>,
  },
  marks: {
    link: ({children, value}: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold underline decoration-orange-500/40 hover:decoration-orange-500 hover:text-orange-600 transition-all cursor-pointer">{children}</a>,
    strong: ({children}: any) => <strong className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">{children}</strong>
  },
};

export default function ClientPage({ logos, projects, services, blogs, testimonials, homeData, siteConfig }: any) {
  const [openProject, setOpenProject] = useState<any>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => { mouseX.set(e.clientX - 16); mouseY.set(e.clientY - 16); };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-orange-500 selection:text-white bg-[#F9F9F6]">
      <motion.div className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-orange-500 z-[9999] pointer-events-none hidden md:block" style={{ x: springX, y: springY }} />
      <div className="fixed top-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-300/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* pt-40 থেকে কমিয়ে pt-32 করা হয়েছে */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-32">
        
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center space-y-4 pb-16">
            {/* text-8xl থেকে 6xl করা হয়েছে */}
            {homeData?.heroHeading ? <PortableText value={homeData.heroHeading} components={ptComponents} /> : <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 text-black">Scaling Brands with <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Data-Driven Ads</span></h1>}
            {homeData?.heroSubheading ? <PortableText value={homeData.heroSubheading} components={ptComponents} /> : <p className="text-lg md:text-xl font-medium text-gray-600">Expert Digital Marketing strategies to grow your business.</p>}
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-8">
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl border-4 border-white overflow-hidden shadow-xl shadow-orange-500/10 bg-gray-50">
                          {homeData?.profileImage && <Image src={urlFor(homeData.profileImage).url()} alt="Profile" fill className="object-cover" />}
                        </div>
                    </div>
                    <div className="lg:col-span-8 text-center lg:text-left space-y-6">
                        <div><h2 className="text-3xl md:text-5xl font-black text-black mb-2">{homeData?.profileName || "Tanvir Kabir"}</h2><p className="text-lg font-bold text-orange-500 uppercase tracking-widest">{homeData?.profileTitle || "Digital Marketer"}</p></div>
                        <div className="max-w-2xl">{homeData?.profileBio ? <PortableText value={homeData.profileBio} components={ptComponents} /> : <p className="text-gray-600 text-base md:text-lg font-medium">I specialize in Meta Ads, Server-Side Tracking, and building sales funnels.</p>}</div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16 pt-6 border-t border-gray-100">
                          <AnimatedCounter to={homeData?.clientsCount || 231} text="Clients" />
                          <AnimatedCounter to={homeData?.reviewsCount || 206} text="Good Reviews" />
                          <AnimatedCounter to={homeData?.yearsExp || 2} text="Years Exp." />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>

        <section className="mb-10 pt-4" id="logos">
          <p className="text-center text-gray-400 uppercase tracking-widest text-xs font-bold mb-6">Trusted By Great Clients</p>
          <Swiper spaceBetween={40} slidesPerView="auto" loop={true} speed={3000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full mask-linear-fade">
            {[...(logos || []), ...(logos || []), ...(logos || [])].map((logo: any, idx: number) => (
              logo?.logo && (<SwiperSlide key={idx} style={{ width: 'auto' }}><div className="relative w-28 h-12 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 mx-6"><Image src={urlFor(logo.logo).url()} alt="Client" fill className="object-contain" /></div></SwiperSlide>)
            ))}
          </Swiper>
        </section>

        <section id="work" className="mb-24"><Portfolio projects={projects} openProject={openProject} setOpenProject={setOpenProject} isHomePage={true} /></section>
        
        <section id="service" className="mb-24"><Services services={services} isHomePage={true} /></section>

        <section id="blog" className="mb-24"><BlogList blogs={blogs} isHomePage={true} /></section>

        <section className="py-16" id="reviews">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-black">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Feedback</span></h2>
          <Swiper spaceBetween={24} slidesPerView="auto" centeredSlides={true} loop={true} speed={4000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full">
             {[...(testimonials || []), ...(testimonials || []), ...(testimonials || []), ...(testimonials || [])].map((review: any, idx: number) => (
               <SwiperSlide key={idx} style={{ width: 'auto' }}>
                 <div className="w-[300px] md:w-[400px] bg-white border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] p-8 rounded-3xl relative hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] transition-all duration-300 cursor-grab">
                    <div className="text-6xl text-orange-100 absolute top-2 right-6 font-serif leading-none">❝</div>
                    {/* text-lg থেকে text-base করা হয়েছে */}
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

      <footer id="contact" className="relative z-20 bg-black pt-16 pb-8 border-t border-gray-800 mt-16">
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