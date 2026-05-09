import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { client } from '../../sanity'; // <-- এখানে পাথ ঠিক করে দেওয়া হয়েছে (../../)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Sanity থেকে আপনার লেখা অটো-রিপ্লাই মেসেজটি আনছি
    const contactData = await client.fetch(`*[_type == "contactData"][0]`);
    const autoReplySubject = contactData?.autoReplySubject || "Thanks for reaching out!";
    const autoReplyMessage = contactData?.autoReplyMessage || "Hi, I have received your message and will get back to you soon.";

    // Nodemailer Setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ১. আপনার কাছে যে ইমেইলটি আসবে
    const mailToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Lead from: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h3 style="color: #f97316;">New Message from Website</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        </div>
      `,
    };

    // ২. ক্লায়েন্টের কাছে যে অটো-রিপ্লাই যাবে
    const mailToClient = {
      from: `"Tanvir Kabir" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: autoReplySubject,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #f97316;">Hello ${name},</h2>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${autoReplyMessage}</p>
            <br/>
            <p style="color: #666; font-size: 14px;">Best Regards,<br/><strong>Tanvir Kabir</strong><br/>Digital Marketer</p>
        </div>
      `,
    };

    // ইমেইলগুলো পাঠিয়ে দিচ্ছি
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToClient);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
  }
}