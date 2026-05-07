import { client, urlFor } from "../sanity"; 
import Image from "next/image";
import Link from "next/link";

export default async function CustomPage({ params }: any) {
  // CRASH FIX: Next.js এর নতুন নিয়মে params থেকে ডেটা বের করার আগে await করতে হয়
  const resolvedParams = await params;
  const currentSlug = resolvedParams?.slug;

  // ১. Sanity থেকে ওই নির্দিষ্ট পেজের ডেটা আনা হচ্ছে
  const query = `*[_type == "page" && slug.current == $slug][0]`;
  const pageData = await client.fetch(query, { slug: currentSlug }, { cache: 'no-store' });

  // ২. যদি কেউ ভুল লিংকে যায়, তবে 404 দেখাবে
  if (!pageData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-gray-500">404 - Page Not Found 🥲</h1>
      </div>
    );
  }

  // ৩. আসল পেজ রেন্ডার করা হচ্ছে
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20">
      
      {/* ম্যাজিক শুরু: Page Builder-এর ব্লকগুলো লুপ করা হচ্ছে */}
      {pageData.pageBuilder?.map((block: any, index: number) => {
        const key = block._key || index;

        // ------------------------------------
        // ব্লক ১: Hero Section
        // ------------------------------------
        if (block._type === 'hero') {
          return (
            <section key={key} className="py-24 px-6 text-center max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                {block.heading}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
                {block.subheading}
              </p>
              {block.buttonText && block.buttonLink && (
                <Link href={block.buttonLink} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                  {block.buttonText}
                </Link>
              )}
            </section>
          );
        }

        // ------------------------------------
        // ব্লক ২: Text with Image Section
        // ------------------------------------
        if (block._type === 'textWithImage') {
          return (
            <section key={key} className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className={`w-full md:w-1/2 ${block.imageOnRight ? 'order-1' : 'order-1 md:order-2'}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{block.heading}</h2>
                <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">{block.content}</p>
              </div>
              
              <div className={`w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${block.imageOnRight ? 'order-2' : 'order-2 md:order-1'}`}>
                {block.image ? (
                  <Image src={urlFor(block.image).url()} alt={block.heading || 'Section Image'} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image Selected</div>
                )}
              </div>
            </section>
          );
        }

        // ------------------------------------
        // ব্লক ৩: Services / Features Grid
        // ------------------------------------
        if (block._type === 'featuresGrid') {
          return (
            <section key={key} className="py-24 px-6 max-w-7xl mx-auto">
              {block.sectionTitle && (
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                  {block.sectionTitle}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {block.features?.map((feature: any, i: number) => (
                  <div key={i} className="bg-[#111] border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 group">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // ------------------------------------
        // ব্লক ৪: Call To Action (CTA)
        // ------------------------------------
        if (block._type === 'cta') {
          return (
            <section key={key} className="py-20 px-6 max-w-5xl mx-auto text-center">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-black border border-white/10 p-12 md:p-20 rounded-[3rem]">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{block.title}</h2>
                  <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">{block.subtitle}</p>
                  {block.btnText && block.btnLink && (
                    <Link href={block.btnLink} className="inline-block bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-full font-extrabold transition-all hover:scale-105">
                      {block.btnText}
                    </Link>
                  )}
                </div>
                {/* Background Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-[100px] -z-0 pointer-events-none"></div>
              </div>
            </section>
          );
        }

        return null; // যদি এমন কোনো ব্লক থাকে যেটা কোডে নেই, তাহলে ইগনোর করবে
      })}
    </main>
  );
}