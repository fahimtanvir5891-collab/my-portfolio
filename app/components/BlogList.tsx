"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { motion } from "framer-motion";

const liquidGlassClass = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset]";

export default function BlogList({ blogs, isHomePage = true }: any) {
    const displayBlogs = isHomePage ? blogs.slice(0, 3) : blogs;

    return (
        <div className="w-full relative z-10">
           <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-black">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Insights</span>
           </h2>

           <div className="flex flex-col gap-6 max-w-4xl mx-auto">
               {displayBlogs.map((blog: any) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={blog._id} 
                    className={`rounded-2xl md:rounded-3xl hover:shadow-[0_15px_40px_rgba(249,115,22,0.15)] transition-all duration-300 group ${liquidGlassClass} overflow-hidden`}
                  >
                     <Link href={`/blog/${blog.slug?.current}`} className="flex flex-col md:flex-row w-full h-full">
                         <div className="w-full md:w-[280px] h-56 md:h-auto relative shrink-0 border-r border-white/40 bg-white/30 overflow-hidden">
                             {blog.coverImage && (
                                <Image 
                                  src={urlFor(blog.coverImage).url()} 
                                  alt={blog.title} 
                                  fill 
                                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                             )}
                         </div>

                         <div className="p-6 md:p-8 flex flex-col justify-center grow">
                             <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-orange-500/10 text-orange-600 font-bold text-[10px] uppercase tracking-widest rounded-full border border-orange-500/20">{blog.category || "Article"}</span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{blog.readTime || "5 min read"}</span>
                             </div>
                             
                             <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors">{blog.title}</h3>
                             <p className="text-gray-600 font-medium mb-6 line-clamp-2 text-sm">{blog.excerpt}</p>
                             
                             <div className="mt-auto">
                                 <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm group-hover:text-orange-600 transition-colors">
                                     Read Article 
                                     <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                 </span>
                             </div>
                         </div>
                     </Link>
                  </motion.div>
               ))}
           </div>

           {isHomePage && blogs.length > 3 && (
             <div className="flex justify-center mt-12 relative z-10">
                <Link href="/blog" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm md:text-base font-black rounded-full hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] transition-all duration-300 hover:-translate-y-1">
                    View All Articles
                </Link>
             </div>
           )}
        </div>
    );
}