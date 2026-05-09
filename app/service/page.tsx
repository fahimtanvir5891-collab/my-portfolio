import { client } from "../sanity"; // পাথ ঠিক করে দেওয়া হলো (../)
import ClientServicePage from "./ClientServicePage";

export const revalidate = 5;

export default async function ServicePage() {
  const services = await client.fetch(`
    *[_type == "service"] | order(_createdAt desc) { 
      _id, title, images, description, orderLink 
    }
  `) || [];
  
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{
    logo, menuLinks, ctaText, ctaLink, socialIcons
  }`) || {};

  return <ClientServicePage services={services} siteConfig={siteConfig} />;
}