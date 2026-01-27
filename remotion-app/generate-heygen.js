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

// Configuration - VRAIE VIDEO (pas de watermark, utilise 1 credit/mois)
const config = {
  test: false, // PRODUCTION MODE - pas de watermark
  title: "PEB Tutorial Complet - Nicolas Deswysen",
  video_inputs: [
    {
      character: {
        type: "avatar",
        avatar_id: "2fcb781a4a794cbc8de1e67328c0233c", // Nicolas Deswysen (ton avatar)
        avatar_style: "normal"
      },
      voice: {
        type: "text",
        voice_id: "98d5669b471248a88b10ce72601a78f7", // Nicolas Deswysen (ta voix clonée)
        input_text: `Saviez-vous que depuis 2021, tout bâtiment neuf en Wallonie doit être quasi zéro énergie ?

La PEB, Performance Énergétique des Bâtiments, encadre la construction et la rénovation depuis 2008.

L'objectif ? Réduire les émissions de CO2 et maîtriser vos factures d'énergie.

Isolation thermique K35, ventilation contrôlée, étude de faisabilité, et bientôt : bornes de recharge obligatoires.

Retrouvez le guide complet sur uvcw.be`,
        speed: 1.0
      },
      background: {
        type: "color",
        value: "#0a0a14" // Dark background matching Remotion design
      }
    }
  ],
  dimension: {
    width: 1280,
    height: 720
  }
};

console.log('🎬 Lancement generation HeyGen...');
console.log('   Mode: PRODUCTION (pas de watermark, 1 credit)');
console.log('   Avatar: Nicolas Deswysen (ton avatar perso)');
console.log('   Voix: Nicolas Deswysen (ta voix clonée)');
console.log('   Fond: #0a0a14 (sombre, assorti au design)');
console.log('');

const postData = JSON.stringify(config);

const options = {
  hostname: 'api.heygen.com',
  path: '/v2/video/generate',
  method: 'POST',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);

    if (json.error) {
      console.log('❌ Erreur:', json.error);
      return;
    }

    console.log('✅ Video en cours de generation!');
    console.log('');
    console.log('   Video ID:', json.data.video_id);
    console.log('');
    console.log('⏳ La generation prend 5-15 minutes.');
    console.log('   Utilise cette commande pour verifier le statut:');
    console.log('');
    console.log(`   node check-heygen-status.js ${json.data.video_id}`);

    // Save video_id to file
    fs.writeFileSync(
      path.join(__dirname, 'public/tutorial/avatars/pending-video.json'),
      JSON.stringify({ video_id: json.data.video_id, created: new Date().toISOString() }, null, 2)
    );
  });
});

req.on('error', (e) => {
  console.error('❌ Erreur requete:', e.message);
});

req.write(postData);
req.end();
