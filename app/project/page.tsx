import { client } from "../sanity"; // পাথ ঠিক করে দেওয়া হলো
import ClientProjectPage from "./ClientProjectPage";

export const revalidate = 5;

export default async function ProjectPage() {
  const projects = await client.fetch(`
    *[_type == "project"] | order(_createdAt desc) { 
      _id, title, image, description 
    }
  `) || [];
  
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{
    logo, menuLinks, ctaText, ctaLink, socialIcons
  }`) || {};

  return <ClientProjectPage projects={projects} siteConfig={siteConfig} />;
}