"use client";

import Navbar from "../components/Navbar"; 
import Services from "../components/Services"; 

export default function ClientServicePage({ services, siteConfig }: any) {

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black">
      <Navbar config={siteConfig} />
      
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-40 pb-20">
        <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-6">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Services</span></h1>
            <p className="text-xl font-medium text-gray-500">Top-tier digital marketing gigs tailored for your brand's explosive growth.</p>
        </div>

        {/* isHomePage={false} দেওয়ায় "See more" বাটন থাকবে না */}
        <Services services={services} isHomePage={false} />
      </div>
    </main>
  );
}