import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Vercel-এ API Key ঠিকমতো পাচ্ছে কি না, সেটা চেক করার সেফটি লজিক
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY is missing!");
      return NextResponse.json({ reply: "System updating. Contact Tanvir directly." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // gemini-1.5 এর বদলে সবচেয়ে স্ট্যাবল gemini-pro ব্যবহার করা হলো (404 Error পারমানেন্টলি বন্ধ করার জন্য)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // সিস্টেম ইনস্ট্রাকশন এবং ইউজারের মেসেজ একসাথে মার্জ করে দেওয়া হলো (পুরনো বা নতুন সব প্যাকেজে ১০০% কাজ করবে)
    const finalPrompt = `
    System Instruction: You are the elite digital marketing assistant for Tanvir Kabir, a premium Data-Driven Ads Master. 
    Your goal is to represent Tanvir with absolute confidence, professionalism, and high-end marketing expertise.
    
    KNOWLEDGE BASE:
    - Tanvir has 4+ years of experience and 102+ successful clients.
    - Expertise: Meta Ads, TikTok Ads, Server-Side Tracking, GA4, Funnel Architecture, and Aggressive ROI Scaling.
    - Pricing: "Tanvir builds custom growth architectures. Pricing depends on your current setup. His focus is always on multiplying your ROAS."
    
    RULES:
    1. Never say you are an AI. You are Tanvir's official assistant.
    2. Keep answers concise, crisp, and professional.
    3. ALWAYS end by pushing the user to contact Tanvir directly.
    
    User's Message: ${message}
    
    Your Professional Reply:`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const responseText = response.text();

    return NextResponse.json({ reply: responseText }, { status: 200 });

  } catch (error: any) {
    console.error("Ultimate Gemini API Error:", error.message);
    return NextResponse.json({ reply: "I'm currently updating my systems. Please reach out to Tanvir via the contact form in the meantime!" }, { status: 500 });
  }
}