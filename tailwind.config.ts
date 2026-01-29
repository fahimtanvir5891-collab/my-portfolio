import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // এই যে আমাদের ট্রেনের ইঞ্জিন (Animation)
      animation: {
        scroll: "scroll 30s linear infinite", // লোগোর জন্য ফাস্ট স্পিড
        "scroll-slow": "scroll 50s linear infinite", // রিভিউয়ের জন্য স্লো স্পিড
      },
      // ট্রেনের চাকা (Keyframes)
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;