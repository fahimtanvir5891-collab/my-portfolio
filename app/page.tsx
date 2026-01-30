import { client } from "./sanity";
import ClientPage from "./ClientPage";

// ডাটা রিফ্রেশ টাইম (Cache)
export const revalidate = 5;

export default async function Home() {
  
  // ১. লোগো
  const logos = await client.fetch(`*[_type == "clientLogo"]{logo}`);
  
  // ২. প্রজেক্ট (সব ডাটা নিয়ে আসার জন্য নিরাপদ কুয়েরি)
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
  
  // ৩. রিভিউ
  const testimonials = await client.fetch(`*[_type == "testimonial"]{name, designation, feedback, photo}`);

  // ৪. সার্টিফিকেট
  const certificates = await client.fetch(`*[_type == "certificate"]{title, image}`);

  return (
    <ClientPage 
      logos={logos} 
      projects={projects} 
      testimonials={testimonials}
      certificates={certificates} 
    />
  );
}