const axios = require('axios');

const [,, id, token] = process.argv;
if (!id) {
  console.error('Usage: node scripts/checkPublished.js <publishedId> [token]');
  process.exit(1);
}

const client = axios.create({ baseURL: 'http://localhost:5000/api', timeout: 5000 });

(async () => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await client.get(`/published/${id}`, { headers });
    console.log('Status:', res.status);
    console.log('Data:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('HTTP error:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  }
})();