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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F9F6]/90 backdrop-blur-md border-b border-gray-200 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center">
          {config?.logo?.asset ? (
            <img src={urlFor(config.logo).url()} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <div className="text-3xl font-black text-orange-500">TK.</div>
          )}
        </Link>

        {/* ৬ পেজের মেনু */}
        <div className="hidden md:flex items-center gap-8 font-bold text-gray-800">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-orange-500 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Hire Me বাটন */}
        <div className="flex items-center gap-4">
          <Link href="/about" className="hidden md:inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-black tracking-wide rounded-full hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all duration-300">
            Hire Me
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black p-2 text-2xl">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* মোবাইল মেনু */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#F9F9F6] border-b border-gray-200 flex flex-col p-4 shadow-2xl">
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="py-4 text-gray-900 font-bold border-b border-gray-200 last:border-0 hover:text-orange-500 text-center">
              {link.name}
            </Link>
          ))}
          <Link href="/about" onClick={() => setIsOpen(false)} className="mt-6 text-center py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-xl shadow-lg">
            Hire Me
          </Link>
        </div>
      )}
    </nav>
  );
}