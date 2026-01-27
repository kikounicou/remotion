const fs = require('fs');
const https = require('https');
const path = require('path');

// Load env
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
let apiKey = '';
envContent.split('\n').forEach(line => {
  if (line.startsWith('HEYGEN_API_KEY=')) {
    apiKey = line.split('=')[1].trim();
  }
});

const options = {
  hostname: 'api.heygen.com',
  path: '/v2/avatars',
  headers: { 'X-Api-Key': apiKey }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const avatars = json.data.avatars.slice(0, 20);

    console.log('AVATARS DISPONIBLES:\n');
    console.log('=' .repeat(60));

    avatars.forEach((a, i) => {
      console.log(`${i+1}. ${a.avatar_name}`);
      console.log(`   ID: ${a.avatar_id}`);
      console.log(`   Genre: ${a.gender || 'unknown'}`);
      if (a.default_voice_id) {
        console.log(`   Voix par defaut: ${a.default_voice_id}`);
      }
      console.log('');
    });
  });
});
