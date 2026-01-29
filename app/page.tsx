import { client } from "./sanity";
import ClientPage from "./ClientPage";

export const revalidate = 5;

export default async function Home() {
  const logos = await client.fetch(`*[_type == "clientLogo"]{logo}`);
  const projects = await client.fetch(`*[_type == "project"]{title, description, image, link}`);
  const testimonials = await client.fetch(`*[_type == "testimonial"]{name, designation, feedback, photo}`);
  // এই লাইনটি সার্টিফিকেটের জন্য জরুরি
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