import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanvir Kabir | Digital Marketer", // আপনার নাম এখানে
  description: "Portfolio of Tanvir Kabir - Digital Marketer & Founder of TanEvate", // ছোট বিবরণ
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}