import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; 
import { Analytics } from "@vercel/analytics/next"; 
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop"; 
import Navbar from "./components/Navbar";
import { client } from "./sanity"; 
import React from "react";
import parse from "html-react-parser"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], variable: "--font-poppins" });

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
        {customScripts?.map((script: any) => (
          <React.Fragment key={script._id}>{parse(script.headerCode || "")}</React.Fragment>
        ))}
      </head>
      {/* 100% Off-White Background and Black Text setup */}
      <body className={`${inter.className} ${poppins.variable} bg-[#F9F9F6] text-black antialiased`}>
        <Navbar config={siteConfig} />
        {children}
        <Analytics /> 
        <Chatbot />
        <ScrollToTop />
      </body>
    </html>
  );
}