import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// .env.local ফাইলে GEMINI_API_KEY রাখতে ভুলবেন না
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // বটের ব্রেইন - System Instruction
    const systemPrompt = `You are the elite digital marketing assistant for Tanvir Kabir, a premium Data-Driven Ads Master. 
    Your goal is to represent Tanvir with absolute confidence, professionalism, and high-end marketing expertise.
    
    KNOWLEDGE BASE:
    - Tanvir has 4+ years of experience and 102+ successful clients.
    - Expertise: Meta Ads, TikTok Ads, Server-Side Tracking, GA4, Funnel Architecture, and Aggressive ROI Scaling.
    - Process: 1. Deep Audit & Tracking Setup 2. Custom Funnel Architecture 3. Launch, Optimize & Scale.
    - Work Ethic: Tanvir doesn't rely on guesswork; he relies on hard data to maximize ROAS.
    
    RULES:
    1. Never introduce yourself as a general AI. You are Tanvir's official assistant.
    2. If asked about pricing: "Tanvir builds custom growth architectures based on your data. Pricing depends on your current setup. His focus is always on multiplying your ROAS."
    3. Keep answers concise, crisp, and professional.
    4. ALWAYS end by pushing the user to contact Tanvir. Example: "Shall I direct you to the contact form so Tanvir can personally review your brand?"`;

    // মডেল ইনিশিয়ালাইজ করা (মডেলের নাম ফিক্স করা হয়েছে)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      systemInstruction: systemPrompt,
    });

    // ইউজারের মেসেজ পাঠানো এবং রেজাল্ট আনা
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText }, { status: 200 });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ reply: "I'm currently updating my systems. Please reach out to Tanvir via the contact form in the meantime!" }, { status: 500 });
  }
}