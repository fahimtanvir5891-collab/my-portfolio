import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { client } from '../../sanity'; 

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ reply: "⚠️ Error: API Key পাওয়া যাচ্ছে না!" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const body = await req.json();
    // এখানে ইউজারের মেসেজ এবং FAQ এর ইনস্ট্রাকশন রিসিভ করা হচ্ছে
    const { message, instruction } = body; 

    let systemPrompt = "You are a helpful assistant.";
    
    try {
      const query = `*[_type == "chatbotSettings"][0]`;
      const settings = await client.fetch(query, {}, { cache: 'no-store' });
      if (settings?.systemPrompt) {
        systemPrompt = settings.systemPrompt;
      }
    } catch (sanityError: any) {
      return NextResponse.json({ reply: `⚠️ Sanity Error: ${sanityError.message}` });
    }

    // যদি ইউজার FAQ বাটনে ক্লিক করে, তবে সেই স্পেশাল ইনস্ট্রাকশন মেইন প্রম্পটের সাথে জুড়ে দেওয়া হবে
    if (instruction) {
      systemPrompt = `${systemPrompt}\n\n[SPECIAL INSTRUCTION FOR CURRENT QUESTION: ${instruction}]`;
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });

  } catch (error: any) {
    console.error("Chatbot Error:", error);
    return NextResponse.json({ reply: `⚠️ Gemini Error: ${error.message}` });
  }
}