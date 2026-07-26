const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'ahzpbjrb',
  dataset: 'npm',
  useCdn: false,
  apiVersion: '2024-01-01'
});
async function check() {
  const data = await client.fetch('{ "homeData": *[_type == "homeData"][0], "projects": *[_type == "project"], "services": *[_type == "service"], "blogs": *[_type == "blog"], "logos": *[_type == "clientLogo"] }');
  
  console.log('HomeData image:', data.homeData?.profileImage?.asset ? 'has asset' : (data.homeData?.profileImage ? 'MISSING ASSET' : 'no image'));
  data.projects.forEach(p => console.log('Project', p.title, p.image?.asset ? 'has asset' : (p.image ? 'MISSING ASSET' : 'no image')));
  data.services.forEach(s => console.log('Service', s.title, s.images?.[0]?.asset ? 'has asset' : (s.images?.[0] ? 'MISSING ASSET' : 'no image')));
  data.blogs.forEach(b => console.log('Blog', b.title, b.coverImage?.asset ? 'has asset' : (b.coverImage ? 'MISSING ASSET' : 'no image')));
}
check();
