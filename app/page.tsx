import { client, urlFor } from "./sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // ডাটা সবসময় ফ্রেশ থাকবে

// ডাটা নিয়ে আসার ফাংশন
async function getProjects() {
  const query = `*[_type == "project"]{
    title,
    "slug": slug.current,
    image,
    description,
    link
  }`;
  const projects = await client.fetch(query);
  return projects;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      {/* ১. হিরো সেকশন (তোমার ক্লায়েন্টকে হুক করার জন্য) */}
      <section className="max-w-5xl mx-auto text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text mb-6">
          Scaling Brands with <br /> Data-Driven Ads.
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
          Hi, I'm Tanvir. I help businesses generate high-quality leads using
          Strategic Meta Ads & Server-Side Tracking.
        </p>
        <Link href="#work" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
          View My Work
        </Link>
      </section>

      {/* ২. পোর্টফোলিও গ্যালারি (ব্যাকএন্ড থেকে আসবে) */}
      <section id="work" className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-4">Selected Case Studies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div key={index} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition duration-300">
              {/* ছবি */}
              {project.image && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}
              
              {/* লেখা */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" className="text-blue-400 font-semibold hover:underline">
                    See Live Result →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}