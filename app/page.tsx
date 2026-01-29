import { client } from "./sanity";
import ClientPage from "./ClientPage";

// সার্ভার সাইড থেকে ডেটা ফেচিং (CORS সমস্যা হবে না)
export const revalidate = 0;

async function getLogos() {
  return await client.fetch(`*[_type == "clientLogo"]{title, logo}`);
}

async function getProjects() {
  return await client.fetch(`*[_type == "project"]{
    _id,
    title,
    image,
    gallery,
    description,
    link
  }`);
}

async function getTestimonials() {
  return await client.fetch(`*[_type == "testimonial"]{
    name,
    designation,
    photo,
    feedback
  }`);
}

export default async function Home() {
  // সব ডেটা একসাথে লোড করা হচ্ছে
  const logos = await getLogos();
  const projects = await getProjects();
  const testimonials = await getTestimonials();

  // ডেটাগুলো আমরা ClientPage-এ পাঠিয়ে দিচ্ছি
  return (
    <ClientPage 
      logos={logos} 
      projects={projects} 
      testimonials={testimonials} 
    />
  );
}