"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { motion } from "framer-motion";

export default function BlogList({ blogs, isHomePage = true }: any) {
    const displayBlogs = isHomePage ? blogs.slice(0, 3) : blogs;

    return (
        <div className="w-full">
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
                    className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.08)] transition-all duration-300 group"
                  >
                     <Link href={`/blog/${blog.slug?.current}`} className="flex flex-col md:flex-row w-full h-full">
                         <div className="w-full md:w-[280px] h-56 md:h-auto relative shrink-0 border-r border-gray-100 bg-gray-50 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                             {blog.coverImage && (
                                <Image 
                                  src={urlFor(blog.coverImage).url()} 
                                  alt={blog.title} 
                                  fill 
                                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                             )}
                         </div>

                         <div className="p-6 md:p-8 flex flex-col justify-center grow">
                             <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-orange-50 text-orange-600 font-bold text-[10px] uppercase tracking-widest rounded-full">{blog.category || "Article"}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{blog.readTime || "5 min read"}</span>
                             </div>
                             {/* টাইটেল সাইজ কমানো হয়েছে */}
                             <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-500 transition-colors">{blog.title}</h3>
                             <p className="text-gray-500 font-medium mb-6 line-clamp-2 text-sm">{blog.excerpt}</p>
                             
                             <div className="mt-auto">
                                 <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm group-hover:text-orange-600 transition-colors">
                                     Read Article 
                                     <span className="group-hover:translate-x-1 transition-transform">→</span>
                                 </span>
                             </div>
                         </div>
                     </Link>
                  </motion.div>
               ))}
           </div>

           {isHomePage && blogs.length > 3 && (
             <div className="flex justify-center mt-12">
                <Link href="/blog" className="px-8 py-3 bg-black text-white text-base font-bold rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-1">
                    View All Articles
                </Link>
             </div>
           )}
        </div>
    );
}