import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"; // এই লাইনটি নতুন
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanvir Kabir | Digital Marketer",
  description: "Portfolio of Tanvir Kabir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <Analytics /> {/* এই লাইনটি অ্যানালিটিক্স চালু করবে */}
      </body>
    </html>
  );
}