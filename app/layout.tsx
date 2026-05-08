import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; 
import { Analytics } from "@vercel/analytics/next"; 
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop"; 
import { client } from "./sanity"; 
import React from "react";
import parse from "html-react-parser"; // ম্যাজিক প্যাকেজ ইমপোর্ট করা হলো
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tanvir Kabir | Digital Marketer",
  description: "Portfolio of Tanvir Kabir",
};

async function getScripts() {
  const query = `*[_type == "scripts" && isActive == true]`;
  const scripts = await client.fetch(query, {}, { cache: 'no-store' });
  return scripts;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customScripts = await getScripts();

  return (
    <html lang="en">
      <head>
        {/* Sanity থেকে আসা যেকোনো Raw HTML বা Script হুবহু পার্স করে বসানোর ম্যাজিক */}
        {customScripts?.map((script: any) => (
          <React.Fragment key={script._id}>
            {parse(script.headerCode || "")}
          </React.Fragment>
        ))}
      </head>
      <body className={`${inter.className} ${poppins.variable}`} suppressHydrationWarning={true}>
        {children}
        <Analytics /> 
        <Chatbot />
        <ScrollToTop />
      </body>
    </html>
  );
}