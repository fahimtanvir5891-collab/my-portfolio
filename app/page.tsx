import { client } from "./sanity";
import ClientPage from "./ClientPage";

export const revalidate = 5;

export default async function Home() {
  const logos = await client.fetch(`*[_type == "clientLogo"]{logo}`) || [];
  const projects = await client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      image,
      link,
      caseStudyGroups[] {
        category,
        items[] {
          slideImage,
          caption
        }
      }
    }
  `) || [];
  const testimonials = await client.fetch(`*[_type == "testimonial"]{name, designation, feedback, photo}`) || [];
  const certificates = await client.fetch(`*[_type == "certificate"]{title, image}`) || [];
  
  // ডেটা না থাকলে যাতে ক্রাশ না করে সেজন্য ডিফল্ট ভ্যালু সেট করা হলো
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{
    logo, 
    menuLinks, 
    ctaText, 
    ctaLink
  }`) || {};

  return (
    <ClientPage 
      logos={logos} 
      projects={projects} 
      testimonials={testimonials}
      certificates={certificates}
      siteConfig={siteConfig} 
    />
  );
}