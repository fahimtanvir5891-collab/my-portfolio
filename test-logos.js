const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'ahzpbjrb', dataset: 'npm', useCdn: false, apiVersion: '2024-01-01' });
client.fetch('*[_type == "clientLogo"]').then(res => res.forEach(l => console.log('Logo', l.title, l.logo?.asset ? 'has asset' : (l.logo ? 'MISSING ASSET' : 'no image'))));
