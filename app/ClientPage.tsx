"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, motion, useSpring, useMotionValue } from "framer-motion";
import { urlFor } from "./sanity";
import Portfolio from "./Portfolio";
import Services from "./components/Services"; // সার্ভিস ইমপোর্ট করা হলো
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
      <div className="text-5xl md:text-6xl font-black text-black flex justify-center items-center"><span ref={nodeRef}>0</span><span className="text-orange-500 ml-1">+</span></div>
      <p className="text-sm md:text-base font-bold text-gray-500 mt-2 uppercase tracking-widest">{text}</p>
    </div>
  );
}

const ptComponents = {
  block: {
    normal: ({children}: any) => <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium">{children}</p>,
    h1: ({children}: any) => <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black mb-6 leading-tight">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{children}</h2>,
  },
  marks: {
    link: ({children, value}: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-black underline decoration-orange-500/40 hover:decoration-orange-500 hover:text-orange-600 transition-all cursor-pointer">{children}</a>,
    strong: ({children}: any) => <strong className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">{children}</strong>
  },
};

export default function ClientPage({ logos, projects, services, testimonials, homeData, siteConfig }: any) {
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
      <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full border-4 border-orange-500 z-[9999] pointer-events-none hidden md:block" style={{ x: springX, y: springY }} />
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-300/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 pt-40">
        
        <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center space-y-6 pb-20">
            {homeData?.heroHeading ? <PortableText value={homeData.heroHeading} components={ptComponents} /> : <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-black">Scaling Brands with <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Data-Driven Ads</span></h1>}
            {homeData?.heroSubheading ? <PortableText value={homeData.heroSubheading} components={ptComponents} /> : <p className="text-xl md:text-2xl font-bold text-gray-600">Expert Digital Marketing strategies to grow your business.</p>}
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-10">
            <div className="relative bg-white rounded-3xl p-8 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl border-4 border-white overflow-hidden shadow-2xl shadow-orange-500/20 bg-gray-50">
                          {homeData?.profileImage && <Image src={urlFor(homeData.profileImage).url()} alt="Profile" fill className="object-cover" />}
                        </div>
                    </div>
                    <div className="lg:col-span-8 text-center lg:text-left space-y-8">
                        <div><h2 className="text-4xl md:text-6xl font-black text-black mb-2">{homeData?.profileName || "Tanvir Kabir"}</h2><p className="text-xl font-black text-orange-500 uppercase tracking-widest">{homeData?.profileTitle || "Digital Marketer"}</p></div>
                        <div className="max-w-2xl">{homeData?.profileBio ? <PortableText value={homeData.profileBio} components={ptComponents} /> : <p className="text-gray-700 text-lg font-medium">I specialize in Meta Ads, Server-Side Tracking, and building sales funnels.</p>}</div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-10 md:gap-20 pt-10 border-t border-gray-100">
                          <AnimatedCounter to={homeData?.clientsCount || 231} text="Clients" />
                          <AnimatedCounter to={homeData?.reviewsCount || 206} text="Good Reviews" />
                          <AnimatedCounter to={homeData?.yearsExp || 2} text="Years Exp." />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>

        <section className="mb-10 pt-4" id="logos">
          <p className="text-center text-gray-500 uppercase tracking-widest text-sm font-black mb-8">Trusted By Great Clients</p>
          <Swiper spaceBetween={50} slidesPerView="auto" loop={true} speed={3000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full mask-linear-fade">
            {[...(logos || []), ...(logos || []), ...(logos || [])].map((logo: any, idx: number) => (
              logo?.logo && (<SwiperSlide key={idx} style={{ width: 'auto' }}><div className="relative w-32 h-16 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 mx-8"><Image src={urlFor(logo.logo).url()} alt="Client" fill className="object-contain" /></div></SwiperSlide>)
            ))}
          </Swiper>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="mb-32">
            <Portfolio projects={projects} openProject={openProject} setOpenProject={setOpenProject} isHomePage={true} />
        </section>

        {/* Services Section (New!) */}
        <section id="service" className="mb-20">
            <Services services={services} isHomePage={true} />
        </section>

        {/* Reviews Section */}
        <section className="py-20" id="reviews">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-black">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Feedback</span></h2>
          <Swiper spaceBetween={30} slidesPerView="auto" centeredSlides={true} loop={true} speed={4000} freeMode={true} autoplay={{ delay: 1, disableOnInteraction: false }} modules={[Autoplay, FreeMode]} className="w-full">
             {[...(testimonials || []), ...(testimonials || []), ...(testimonials || []), ...(testimonials || [])].map((review: any, idx: number) => (
               <SwiperSlide key={idx} style={{ width: 'auto' }}>
                 <div className="w-[350px] md:w-[450px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-10 rounded-3xl relative hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(249,115,22,0.1)] transition-all duration-300 cursor-grab">
                    <div className="text-7xl text-orange-200 absolute top-4 right-6 font-serif leading-none">❝</div>
                    <p className="text-gray-700 mb-10 text-lg leading-relaxed relative z-10 font-medium italic">{review.feedback}</p>
                    <div className="flex items-center gap-5 mt-auto">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-50 border-2 border-orange-500">{review?.photo && <Image src={urlFor(review.photo).url()} alt={review.name} fill className="object-cover" />}</div>
                        <div><h4 className="font-black text-black text-lg">{review.name}</h4><p className="text-sm font-bold text-orange-500">{review.designation}</p></div>
                    </div>
                </div>
               </SwiperSlide>
             ))}
          </Swiper>
        </section>
      </div>

      <footer id="contact" className="relative z-20 bg-black pt-20 pb-10 border-t border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 bg-gradient-to-r from-gray-900 to-black p-10 rounded-3xl border border-gray-800 shadow-2xl">
                <div className="text-center md:text-left"><h2 className="text-3xl md:text-5xl font-black mb-2 text-white">Ready to Scale?</h2><p className="text-gray-400 text-lg font-medium">Let's build your growth strategy today.</p></div>
                <a href={siteConfig?.ctaLink || "https://wa.me/8801400905891"} target="_blank" rel="noopener noreferrer" className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg rounded-full overflow-hidden shadow-[0_15px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all">
                    <span className="relative z-10 flex items-center gap-3"><span className="relative w-6 h-6 block"><Image src="/wa.png" alt="WA" fill className="object-contain" /></span>{siteConfig?.ctaText || "Chat on WhatsApp"}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-800 text-sm font-medium text-gray-500">
                <p>© {new Date().getFullYear()} Tanvir Kabir | All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-4 mt-6 md:mt-0">
                    {siteConfig?.socialIcons?.map((social: any, idx: number) => (
                        <a key={idx} href={social.url || "#"} target="_blank" rel="noopener noreferrer" className="relative w-12 h-12 flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] group">
                            {social.icon && <Image src={urlFor(social.icon).url()} alt={social.platform || "social"} width={20} height={20} className="object-contain group-hover:brightness-0 transition-all duration-300" />}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}