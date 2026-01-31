import { client } from "./sanity";
import ClientPage from "./ClientPage";

export const revalidate = 5;

export default async function Home() {
  const logos = await client.fetch(`*[_type == "clientLogo"]{logo}`);
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
  const testimonials = await client.fetch(`*[_type == "testimonial"]{name, designation, feedback, photo}`);
  const certificates = await client.fetch(`*[_type == "certificate"]{title, image}`);
  
  // Logo anar query
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{logo}`);

  return (
    <ClientPage 
      logos={logos} 
      projects={projects} 
      testimonials={testimonials}
      certificates={certificates}
      siteConfig={siteConfig} // Logo pathano holo
    />
  );
}