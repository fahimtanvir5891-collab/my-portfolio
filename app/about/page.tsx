import { client } from "../sanity"; 
import ClientAboutPage from "./ClientAboutPage";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const aboutData = await client.fetch(`*[_type == "aboutData"][0]`, {}, { cache: 'no-store' }) || {};
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{ logo, menuLinks, ctaText, ctaLink, socialIcons }`, {}, { cache: 'no-store' }) || {};

  return <ClientAboutPage aboutData={aboutData} siteConfig={siteConfig} />;
}