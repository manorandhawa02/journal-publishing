const axios = require('axios');

const [,, token] = process.argv;
const client = axios.create({ baseURL: 'http://localhost:5000/api', timeout: 5000 });

(async () => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await client.get('/paper', { headers });
    const papers = res.data;
    console.log(`Found ${papers.length} papers`);
    papers.forEach(p => {
      console.log(p._id, '-', p.title || '(no title)', '-', p.status || '');
    });
  } catch (err) {
    if (err.response) {
      console.error('HTTP error:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  }
})();