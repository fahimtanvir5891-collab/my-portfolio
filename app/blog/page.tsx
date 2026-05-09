import { client } from "../sanity"; // পাথ ঠিক করে দেওয়া হলো (../)
import Navbar from "../components/Navbar"; 
import BlogList from "../components/BlogList"; 

export const revalidate = 5;

export default async function BlogPage() {
  const blogs = await client.fetch(`
    *[_type == "blog"] | order(_createdAt desc) { 
      _id, title, slug, coverImage, category, readTime, excerpt 
    }
  `) || [];
  
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{ logo, menuLinks, ctaText, ctaLink, socialIcons }`) || {};

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black">
      <Navbar config={siteConfig} />
      
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-40 pb-20">
        <div className="text-center mb-24">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-6">Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Blog</span></h1>
            <p className="text-xl font-medium text-gray-500">Strategies, case studies, and insights to scale your brand.</p>
        </div>

        {/* isHomePage={false} দেওয়ায় "View All" বাটন থাকবে না */}
        <BlogList blogs={blogs} isHomePage={false} />
      </div>
    </main>
  );
}