"use client";

import { useState } from "react";
import { urlFor } from "../sanity";
import Link from "next/link";

export default function Navbar({ config }: { config: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/project" },
    { name: "Service", href: "/service" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const liquidGlassClass = "bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-[2rem]";

  return (
    <nav className="fixed top-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
      <div className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-12 px-4 md:px-8 h-16 md:h-20 ${liquidGlassClass} transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.1)] w-[90%] md:w-auto`}>
        
        {/* লোগো */}
        <Link href="/" className="flex items-center">
          {config?.logo?.asset ? (
            <img src={urlFor(config.logo).url()} alt="Logo" className="h-8 md:h-10 w-auto object-contain hover:scale-105 transition-transform" />
          ) : (
            <div className="text-2xl md:text-3xl font-black text-black hover:text-orange-500 transition-colors">TK.</div>
          )}
        </Link>

        {/* ৬ পেজের মেনু */}
        <div className="hidden md:flex items-center gap-8 font-bold text-gray-600 text-sm tracking-wide uppercase">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-orange-500 hover:-translate-y-0.5 transition-all">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Hire Me বাটন */}
        <div className="flex items-center gap-4">
          <Link href="/about" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-orange-500 transition-colors duration-300">
            Hire Me
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black p-2 text-2xl drop-shadow-md">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* মোবাইল মেনু */}
      {isOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 top-24 bg-[#F9F9F6]/80 backdrop-blur-xl z-40 pointer-events-auto" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className={`pointer-events-auto md:hidden absolute top-28 left-4 right-4 flex flex-col p-6 z-50 ${liquidGlassClass} shadow-[0_30px_60px_rgba(0,0,0,0.15)]`}>
            {links.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="py-4 text-black font-black text-2xl border-b border-black/5 last:border-0 hover:text-orange-500 text-center transition-colors">
                {link.name}
              </Link>
            ))}
            <Link href="/about" onClick={() => setIsOpen(false)} className="mt-8 text-center py-4 bg-black text-white font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-orange-500 transition-colors">
              Hire Me
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}