import { client } from "../sanity"; 
import ClientContactPage from "./ClientContactPage";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const contactData = await client.fetch(`*[_type == "contactData"][0]`, {}, { cache: 'no-store' }) || {};
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{ logo, menuLinks, ctaText, ctaLink, socialIcons }`, {}, { cache: 'no-store' }) || {};

  return <ClientContactPage contactData={contactData} siteConfig={siteConfig} />;
}