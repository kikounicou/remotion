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
  path: '/v2/voices',
  headers: { 'X-Api-Key': apiKey }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const voices = json.data.voices;

    // Filter French voices
    const frenchVoices = voices.filter(v =>
      v.language && v.language.toLowerCase().includes('french')
    );

    console.log('VOIX FRANCAISES DISPONIBLES:\n');
    console.log('='.repeat(60));

    frenchVoices.slice(0, 15).forEach((v, i) => {
      console.log(`${i+1}. ${v.display_name || v.name}`);
      console.log(`   ID: ${v.voice_id}`);
      console.log(`   Genre: ${v.gender || 'unknown'}`);
      console.log(`   Langue: ${v.language}`);
      console.log('');
    });

    console.log(`\nTotal voix francaises: ${frenchVoices.length}`);
  });
});
