import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; 
import { Analytics } from "@vercel/analytics/next"; 
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop"; 
import { client } from "./sanity"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Poppins ফন্ট কনফিগার করা হলো
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
        {customScripts?.map((script: any) => (
          <script
            key={script._id}
            dangerouslySetInnerHTML={{ __html: script.headerCode }}
          />
        ))}
      </head>
      <body className={`${inter.className} ${poppins.variable}`} suppressHydrationWarning={true}>
        {children}
        <Analytics /> 
        <Chatbot />
        <ScrollToTop /> {/* নতুন ডায়নামিক আইল্যান্ড বাটন */}
      </body>
    </html>
  );
}