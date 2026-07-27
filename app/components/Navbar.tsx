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

  const liquidGlassClass = "bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-full";

  return (
    <nav className="fixed top-4 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-4">
      <div className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 h-12 md:h-14 ${liquidGlassClass} transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-full max-w-4xl md:w-auto`}>
        
        {/* লোগো */}
        <Link href="/" className="flex items-center">
          {config?.logo?.asset ? (
            <img src={urlFor(config.logo).url()} alt="Logo" className="h-6 md:h-8 w-auto object-contain hover:scale-105 transition-transform" />
          ) : (
            <div className="text-lg md:text-xl font-black text-black hover:text-orange-500 transition-colors tracking-tight">TK.</div>
          )}
        </Link>

        {/* ৬ পেজের মেনু */}
        <div className="hidden md:flex items-center gap-6 font-bold text-gray-600 text-xs tracking-wider uppercase">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-orange-500 hover:-translate-y-0.5 transition-all">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Hire Me বাটন */}
        <div className="flex items-center gap-3">
          <Link href="/about" className="hidden md:inline-flex items-center justify-center px-4 py-1.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-orange-500 transition-colors duration-300">
            Hire Me
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black p-1.5 text-xl">
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