import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"; 
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop"; 
import Navbar from "./components/Navbar";
import { client } from "./sanity"; 
import React from "react";
import parse from "html-react-parser"; 
import "./globals.css";

export const metadata: Metadata = { 
  title: "Tanvir Kabir | Digital Marketer", 
  description: "Portfolio of Tanvir Kabir" 
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const customScripts = await client.fetch(`*[_type == "scripts" && isActive == true]`, {}, { cache: 'no-store' });
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]`, {}, { cache: 'no-store' });

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        {customScripts?.map((script: any) => (
          <React.Fragment key={script._id}>{parse(script.headerCode || "")}</React.Fragment>
        ))}
      </head>
      {/* 100% Off-White Background and Black Text setup */}
      <body className="bg-[#F9F9F6] text-black antialiased font-sans">
        <Navbar config={siteConfig} />
        
        {/* মোবাইলের জন্য ফুটারের নিচে এক্সট্রা প্যাডিং (pb-28) অ্যাড করা হলো, ডেস্কটপে নরমাল (md:pb-0) থাকবে */}
        <div className="pb-28 md:pb-0">
            {children}
        </div>
        
        <Analytics /> 
        <Chatbot />
        <ScrollToTop />
      </body>
    </html>
  );
}