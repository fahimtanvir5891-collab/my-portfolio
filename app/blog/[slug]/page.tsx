import { client, urlFor } from "../../sanity"; 
import Navbar from "../../components/Navbar"; 
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic'; 
export const revalidate = 0;

// ফন্ট সাইজগুলো স্ট্যান্ডার্ড করা হয়েছে
const ptComponents = {
  block: {
    normal: ({children}: any) => <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5 font-medium">{children}</p>,
    h1: ({children}: any) => <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 mt-10">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-5 mt-8">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">{children}</h3>,
  },
  marks: {
    link: ({children, value}: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold underline decoration-orange-500/40 hover:decoration-orange-500 hover:text-orange-600 transition-all cursor-pointer">{children}</a>,
    strong: ({children}: any) => <strong className="font-bold text-black">{children}</strong>
  },
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] border border-gray-100">
          <Image src={urlFor(value).url()} alt="Blog Content Image" fill className="object-cover" />
        </div>
      );
    }
  }
};

export default async function BlogPostPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const exactSlug = decodeURIComponent(resolvedParams.slug);
  
  const query = `*[_type == "blog" && slug.current == "${exactSlug}"][0]`;
  const blog = await client.fetch(query, {}, { cache: 'no-store' });
  const siteConfig = await client.fetch(`*[_type == "siteConfig"][0]{logo, menuLinks, ctaText, ctaLink, socialIcons}`, {}, { cache: 'no-store' });

  if (!blog) {
     return (
        <main className="min-h-screen bg-[#F9F9F6] text-black flex flex-col">
            <Navbar config={siteConfig} />
            <div className="flex-grow flex items-center justify-center flex-col pt-32">
                <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">Article Not Found!</h1>
                <p className="text-gray-500 mb-8">Please check if the slug exactly matches your Sanity studio.</p>
                <Link href="/blog" className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold">Go Back</Link>
            </div>
        </main>
     );
  }

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-black">
      <Navbar config={siteConfig} />

      <article className="max-w-3xl mx-auto px-4 md:px-8 pt-32 pb-24">
         <Link href="/blog" className="text-orange-500 font-bold mb-8 inline-block hover:-translate-x-2 transition-transform uppercase tracking-widest text-xs">
            ← Back to Articles
         </Link>

         <div className="mb-10 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-4 mb-5">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest rounded-full">{blog.category || "Marketing"}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{blog.readTime || "5 min read"}</span>
             </div>
             {/* টাইটেল text-7xl থেকে text-5xl করা হয়েছে */}
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{blog.title}</h1>
         </div>

         {blog.coverImage && (
             <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] mb-12 border border-gray-100 bg-white">
                <Image src={urlFor(blog.coverImage).url()} alt={blog.title} fill className="object-cover" />
             </div>
         )}

         {/* প্যাডিং কমানো হয়েছে */}
         <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-gray-100">
             {blog.content ? (
                 <PortableText value={blog.content} components={ptComponents} />
             ) : (
                 <p className="text-gray-500 text-base italic text-center">Content coming soon...</p>
             )}
         </div>
      </article>
    </main>
  );
}