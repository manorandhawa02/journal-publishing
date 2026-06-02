const axios = require('axios');

const BASE = 'http://localhost:5000/api';

const client = axios.create({ baseURL: BASE, timeout: 5000 });

(async () => {
  try {
    const password = 'Test1234!';
    const email = `temp_${Date.now()}@example.com`;
    const name = 'Temp User';
    const role = 'admin';

    console.log('BASE:', BASE);
    console.log('Attempting to register user:', email);

    try {
      const reg = await client.post('/auth/register', { name, email, password, role });
      console.log('Register response:', reg.data.message || reg.data);
    } catch (regErr) {
      console.log('Register failed (maybe exists):', regErr.response?.data || regErr.message);
    }

    console.log('Logging in...');
    const login = await client.post('/auth/login', { email, password });

    console.log('\n=== TOKEN ===');
    console.log(login.data.token);
    console.log('=== USER ===');
    console.log(login.data.user);
  } catch (err) {
    if (err.response) {
      console.error('HTTP error:', err.response.status, err.response.data);
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused. Is the server running on port 5000?');
    } else if (err.code === 'ECONNABORTED') {
      console.error('Request timed out.');
    } else {
      console.error('Error during register/login:', err.message);
    }
    process.exit(1);
  }
})();