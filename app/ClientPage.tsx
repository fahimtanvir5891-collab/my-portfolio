"use client";

import Image from "next/image";
import Link from "next/link";
import Portfolio from "./Portfolio";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, motion, useScroll } from "framer-motion";
import { urlFor } from "./sanity";

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

// --- সোশ্যাল বাটন ---
function SocialButton({ href, iconPath, color }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-white text-xl transition-transform hover:scale-110 shadow-lg ${color}`}
    >
      <svg fill="currentColor" viewBox="0 0 24 24" height="1em" width="1em">
        <path d={iconPath} />
      </svg>
    </a>
  );
}

// --- ফ্লোটিং মেনু (আপডেট করা হয়েছে) ---
function FloatingNavbar() {
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 md:px-8 md:py-4 flex items-center justify-between w-full max-w-5xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        
        {/* লোগো */}
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">TK</div>
           <span className="font-bold text-white tracking-wide hidden md:block">Tanvir Kabir</span>
        </div>

        {/* লিংক (Process বদলে Contact করা হয়েছে) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#work" className="hover:text-white transition">Work</a>
          <a href="#reviews" className="hover:text-white transition">Reviews</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* বাটন (রং পরিবর্তন করা হয়েছে) */}
        <a 
          href="https://wa.me/8801xxxxxxx" 
          target="_blank" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-sm font-bold px-6 py-2.5 rounded-full transition shadow-lg"
        >
          Book A Call
        </a>

      </div>
    </motion.div>
  );
}


export default function ClientPage({ logos, projects, testimonials }: any) {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      
      {/* ব্যাকগ্রাউন্ড ইফেক্ট */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* ভাসমান মেনু */}
      <FloatingNavbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 pt-32">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-10 pb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
            Scaling Brands with <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Data-Driven Ads
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             Expert Digital Marketing strategies to grow your business.
          </p>
        </section>

        {/* About Section */}
        <section id="about" className="py-10 scroll-mt-28">
            <div className="relative bg-gradient-to-r from-[#2a0845] to-[#6441A5] rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Photo */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-white/20 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.5)]">
                             <Image src="/profile.png" alt="Tanvir Kabir" fill className="object-cover" />
                        </div>
                    </div>
                    {/* Info */}
                    <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Tanvir Kabir</h2>
                            <p className="text-xl text-purple-200 font-medium">Digital Marketer & Founder of TanEvate</p>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                            I specialize in Meta Ads, Server-Side Tracking, and building sales funnels.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16 pt-4 border-t border-white/10 mt-6">
                            <AnimatedCounter to={231} text="Clients" />
                            <AnimatedCounter to={206} text="Good Reviews" />
                            <AnimatedCounter to={2} text="Years Exp." />
                        </div>
                    </div>
                    {/* Social Buttons */}
                    <div className="lg:col-span-1 flex flex-row lg:flex-col justify-center gap-4">
                        <SocialButton href="https://facebook.com" color="bg-[#1877F2]" iconPath="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.152-2.905-.152-2.81 0-4.63 1.713-4.63 4.747v2.764h-3.1v4h3.1v10.5h4.63V13.5Z" />
                        <SocialButton href="https://instagram.com" color="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" iconPath="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        <SocialButton href="https://linkedin.com" color="bg-[#0077b5]" iconPath="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        <SocialButton href="https://wa.me/8801XXXXXXX" color="bg-[#25D366]" iconPath="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </div>
                </div>
            </div>
        </section>

        {/* Logo Slider */}
        <section className="mb-20 scroll-mt-28" id="process">
          <p className="text-center text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Trusted By 230+ Clients</p>
          <div className="relative w-full overflow-hidden mask-linear-fade"> 
            <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                <div className="flex items-center gap-16 px-6">
                    {logos.map((logo: any, idx: number) => (
                    logo.logo && (
                        <div key={idx} className="relative w-28 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300">
                        <Image src={urlFor(logo.logo).url()} alt="Client" fill className="object-contain" />
                        </div>
                    )
                    ))}
                </div>
                <div className="flex items-center gap-16 px-6" aria-hidden="true">
                    {logos.map((logo: any, idx: number) => (
                    logo.logo && (
                        <div key={`d-${idx}`} className="relative w-28 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300">
                        <Image src={urlFor(logo.logo).url()} alt="Client" fill className="object-contain" />
                        </div>
                    )
                    ))}
                </div>
            </div>
          </div>
        </section>
        
        {/* Portfolio */}
        <section className="scroll-mt-28" id="work"> {/* আইডি যোগ করা হলো */}
           <Portfolio projects={projects} />
        </section>

        {/* Reviews */}
        <section className="py-20 scroll-mt-28" id="reviews">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Client <span className="text-pink-500">Feedback</span></h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-scroll-slow hover:[animation-play-state:paused]">
                <div className="flex gap-6 px-6">
                    {testimonials.map((review: any, idx: number) => (
                    <div key={idx} className="w-[350px] md:w-[450px] bg-white/5 border border-white/10 p-8 rounded-2xl relative flex-shrink-0 hover:bg-white/10 transition">
                        <div className="text-4xl text-blue-500 mb-4">❝</div>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">{review.feedback}</p>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700 border border-white/20">
                                {review.photo && <Image src={urlFor(review.photo).url()} alt={review.name} fill className="object-cover" /> }
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                <p className="text-xs text-gray-500">{review.designation}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="flex gap-6 px-6" aria-hidden="true">
                    {testimonials.map((review: any, idx: number) => (
                    <div key={`d-${idx}`} className="w-[350px] md:w-[450px] bg-white/5 border border-white/10 p-8 rounded-2xl relative flex-shrink-0 hover:bg-white/10 transition">
                        <div className="text-4xl text-blue-500 mb-4">❝</div>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">{review.feedback}</p>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700 border border-white/20">
                                {review.photo && <Image src={urlFor(review.photo).url()} alt={review.name} fill className="object-cover" /> }
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                <p className="text-xs text-gray-500">{review.designation}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* ---------------- FOOTER SECTION ---------------- */}
      <footer id="contact" className="relative z-20 bg-black pt-20 pb-10 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
            
            {/* CTA Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-10 rounded-3xl border border-white/5">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">Ready to Scale?</h2>
                    <p className="text-gray-400 text-lg">Let's build your growth strategy today.</p>
                </div>
                {/* Whatsapp Button */}
                <a href="https://wa.me/8801xxxxxxx" target="_blank" className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow duration-300">
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Chat on WhatsApp
                    </span>
                    <div className="absolute inset-0 bg-[#25D366] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                </a>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/10 mb-10"></div>

            {/* Main Footer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                
                {/* Brand Logo (TK) */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xl">TK</div>
                    <div>
                        <h3 className="text-2xl font-bold font-sans text-white tracking-wide">Tanvir Kabir</h3>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap gap-6 md:gap-10 text-sm text-gray-400 font-medium">
                    <Link href="#" className="hover:text-white transition">Terms & Conditions</Link>
                    <Link href="#" className="hover:text-white transition">Refund Policy</Link>
                    <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-white/5 text-xs text-gray-500">
                <p>© {new Date().getFullYear()} Tanvir Kabir | All rights reserved.</p>
                
                {/* Small Icons */}
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition"><svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="hover:text-white transition"><svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                    <a href="#" className="hover:text-white transition"><svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                </div>
            </div>

        </div>
      </footer>

    </main>
  );
}