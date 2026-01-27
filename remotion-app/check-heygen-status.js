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

// Get video_id from argument or file
let videoId = process.argv[2];

if (!videoId) {
  // Try to read from pending file
  const pendingPath = path.join(__dirname, 'public/tutorial/avatars/pending-video.json');
  if (fs.existsSync(pendingPath)) {
    const pending = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'));
    videoId = pending.video_id;
    console.log('📂 Video ID lu depuis pending-video.json');
  } else {
    console.log('Usage: node check-heygen-status.js <video_id>');
    process.exit(1);
  }
}

console.log(`\n🔍 Verification statut video: ${videoId}\n`);

const options = {
  hostname: 'api.heygen.com',
  path: `/v1/video_status.get?video_id=${videoId}`,
  headers: { 'X-Api-Key': apiKey }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);

    if (json.error) {
      console.log('❌ Erreur:', json.error);
      return;
    }

    const status = json.data.status;
    console.log('   Statut:', status);

    if (status === 'completed') {
      console.log('');
      console.log('✅ VIDEO PRETE!');
      console.log('');
      console.log('   URL:', json.data.video_url);
      console.log('   Duree:', json.data.duration, 'secondes');

      // Save result
      fs.writeFileSync(
        path.join(__dirname, 'public/tutorial/avatars/completed-video.json'),
        JSON.stringify(json.data, null, 2)
      );
      console.log('');
      console.log('💾 Infos sauvegardees dans public/tutorial/avatars/completed-video.json');

    } else if (status === 'processing' || status === 'pending') {
      console.log('');
      console.log('⏳ Video en cours de traitement...');
      console.log('   Reessaie dans quelques minutes.');

    } else if (status === 'failed') {
      console.log('');
      console.log('❌ Generation echouee:', json.data.error);
    }
  });
});
