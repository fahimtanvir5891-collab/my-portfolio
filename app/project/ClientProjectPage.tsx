"use client";

import { useState } from "react";
import Navbar from "../components/Navbar"; // ন্যাভবার components ফোল্ডারে আছে
import Portfolio from "../Portfolio"; // পোর্টফোলিও মেইন app ফোল্ডারে আছে

export default function ClientProjectPage({ projects, siteConfig }: any) {
  const [openProject, setOpenProject] = useState<any>(null);

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black">
      <Navbar config={siteConfig} />
      
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-40 pb-20">
        <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-6">All <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Projects</span></h1>
            <p className="text-xl font-medium text-gray-500">Explore my complete portfolio of data-driven success stories.</p>
        </div>

        {/* isHomePage={false} দেওয়ায় এখানে সব প্রজেক্ট ম্যাসনারি লেআউটে দেখাবে এবং "See more" বাটন থাকবে না */}
        <Portfolio 
           projects={projects} 
           openProject={openProject} 
           setOpenProject={setOpenProject} 
           isHomePage={false} 
        />
      </div>
    </main>
  );
}