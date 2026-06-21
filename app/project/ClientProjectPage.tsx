"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Navbar from "../components/Navbar"; // ন্যাভবার components ফোল্ডারে আছে
import Portfolio from "../Portfolio"; // পোর্টফোলিও মেইন app ফোল্ডারে আছে

// ম্যাজিক লিংকের আসল লজিক এই কম্পোনেন্টের ভেতরে লেখা হয়েছে
function ProjectContent({ projects, siteConfig }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // URL থেকে প্রজেক্টের আইডি বের করে আনা হচ্ছে
  const projectIdFromUrl = searchParams.get("project");

  const [openProject, setOpenProject] = useState<any>(null);

  // কেউ যখন ম্যাজিক লিংক দিয়ে ওয়েবসাইটে ঢুকবে, তখন অটোমেটিক সেই প্রজেক্টটা পপ-আপ হবে
  useEffect(() => {
    if (projectIdFromUrl && projects) {
      const matchedProject = projects.find((p: any) => p._id === projectIdFromUrl);
      if (matchedProject) {
        setOpenProject(matchedProject);
      }
    } else {
      setOpenProject(null); // URL-এ কিছু না থাকলে পপ-আপ বন্ধ থাকবে
    }
  }, [projectIdFromUrl, projects]);

  // কেউ যখন ক্লিক করে প্রজেক্ট ওপেন বা ক্লোজ করবে, তখন পেজ রিলোড ছাড়াই URL আপডেট হবে
  const handleProjectChange = (project: any) => {
    setOpenProject(project);
    
    // বর্তমান URL-এর প্যারামিটারগুলো কপি করে নেওয়া হচ্ছে
    const params = new URLSearchParams(searchParams.toString());
    
    if (project && project._id) {
      params.set("project", project._id); // ক্লিক করলে URL-এ আইডি যুক্ত হবে
    } else {
      params.delete("project"); // পপ-আপ কেটে দিলে URL থেকে আইডি মুছে যাবে
    }
    
    // { scroll: false } দেওয়া হয়েছে যাতে URL চেঞ্জ হলেও পেজ লাফ দিয়ে উপরে চলে না যায়
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black">
      <Navbar config={siteConfig} />
      
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-40 pb-20">
        <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-6">All <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Projects</span></h1>
            <p className="text-xl font-medium text-gray-500">Explore my complete portfolio of data-driven success stories.</p>
        </div>

        {/* setOpenProject-এর জায়গায় আমাদের কাস্টম ফাংশনটি পাস করে দেওয়া হলো */}
        <Portfolio 
           projects={projects} 
           openProject={openProject} 
           setOpenProject={handleProjectChange} 
           isHomePage={false} 
        />
      </div>
    </main>
  );
}

export default function ClientProjectPage({ projects, siteConfig }: any) {
  return (
    // Next.js App Router-এ useSearchParams ব্যবহার করলে Suspense বাউন্ডারি দেওয়া বাধ্যতামূলক
    <Suspense fallback={<div className="min-h-screen bg-[#F9F9F6]"></div>}>
      <ProjectContent projects={projects} siteConfig={siteConfig} />
    </Suspense>
  );
}