import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { client } from '../../sanity'; // আপনার Sanity ক্লায়েন্ট

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // ডিটেকটিভ ১: API Key পাচ্ছে কিনা চেক
    if (!apiKey) {
      return NextResponse.json({ reply: "⚠️ Error: API Key পাওয়া যাচ্ছে না! আপনার .env.local ফাইলে GEMINI_API_KEY ঠিকমতো দেওয়া আছে কিনা চেক করুন।" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const body = await req.json();
    const { message } = body;

    let systemPrompt = "You are a helpful assistant.";
    
    // ডিটেকটিভ ২: Sanity থেকে ডেটা আনার চেষ্টা
    try {
      const query = `*[_type == "chatbotSettings"][0]`;
      const settings = await client.fetch(query, {}, { cache: 'no-store' });
      if (settings?.systemPrompt) {
        systemPrompt = settings.systemPrompt;
      }
    } catch (sanityError: any) {
      return NextResponse.json({ reply: `⚠️ Sanity Error: Sanity-র সাথে কানেক্ট হতে পারছে না। বিস্তারিত: ${sanityError.message}` });
    }

    // ডিটেকটিভ ৩: Gemini-কে কল করা
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });

  } catch (error: any) {
    // ডিটেকটিভ ৪: জেমিনির অন্য কোনো এরর
    console.error("Chatbot Error:", error);
    return NextResponse.json({ reply: `⚠️ Gemini Error: ${error.message}` });
  }
}