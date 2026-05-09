import { client } from "./sanity";
import ClientPage from "./ClientPage";

export const revalidate = 5;

export default async function Home() {
  const logos = await client.fetch(`*[_type == "clientLogo"]{logo}`) || [];
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc) { _id, title, image, description }`) || [];
  
  // সার্ভিস ডেটা ফেচ করা হচ্ছে
  const services = await client.fetch(`*[_type == "service"] | order(_createdAt desc) { _id, title, images, description, orderLink }`) || [];
  
  const testimonials = await client.fetch(`*[_type == "testimonial"]{name, designation, feedback, photo}`) || [];
  const homeData = await client.fetch(`*[_type == "homeData"][0]`) || {};
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{ logo, menuLinks, ctaText, ctaLink, socialIcons }`) || {};

  return (
    <ClientPage 
      logos={logos} 
      projects={projects} 
      services={services} 
      testimonials={testimonials} 
      homeData={homeData} 
      siteConfig={siteConfig} 
    />
  );
}