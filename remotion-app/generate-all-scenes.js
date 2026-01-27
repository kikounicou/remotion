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

// Configuration
const AVATAR_ID = "cc634ee067dc49af87879824d1b7a927";
const VOICE_ID = "1793597be96946fabf72a90adc112fc6"; // Nicolas (French)

const scenes = [
  {
    id: "scene1",
    text: "Saviez-vous que depuis 2021, tout bâtiment neuf en Wallonie doit être quasi zéro énergie ?"
  },
  {
    id: "scene2",
    text: "La PEB, Performance Énergétique des Bâtiments, encadre la construction et la rénovation depuis 2008."
  },
  {
    id: "scene3",
    text: "L'objectif ? Réduire les émissions de CO2 et maîtriser vos factures d'énergie."
  },
  {
    id: "scene4",
    text: "Isolation thermique K35, ventilation contrôlée, étude de faisabilité, et bientôt : bornes de recharge obligatoires."
  },
  {
    id: "scene5",
    text: "Retrouvez le guide complet sur uvcw.be"
  }
];

async function generateScene(scene) {
  return new Promise((resolve, reject) => {
    const config = {
      test: true,
      title: `PEB Tutorial - ${scene.id}`,
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: AVATAR_ID,
            avatar_style: "normal"
          },
          voice: {
            type: "text",
            voice_id: VOICE_ID,
            input_text: scene.text,
            speed: 1.0
          },
          background: {
            type: "color",
            value: "#00FF00" // Green screen
          }
        }
      ],
      dimension: {
        width: 1280,
        height: 720
      }
    };

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
          reject(new Error(json.error.message || json.error));
        } else {
          resolve({ sceneId: scene.id, videoId: json.data.video_id });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🎬 Generation des 5 scenes PEB Tutorial');
  console.log('   Avatar:', AVATAR_ID);
  console.log('   Voix: Nicolas (French)');
  console.log('   Mode: TEST (watermark, 0 credit)');
  console.log('');

  const results = [];

  for (const scene of scenes) {
    console.log(`⏳ Generation ${scene.id}...`);
    try {
      const result = await generateScene(scene);
      console.log(`   ✅ Video ID: ${result.videoId}`);
      results.push(result);
      // Wait 2 seconds between requests to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
    }
  }

  console.log('');
  console.log('📋 Recapitulatif:');
  console.log('');
  results.forEach(r => {
    console.log(`   ${r.sceneId}: ${r.videoId}`);
  });

  // Save results
  const outputPath = path.join(__dirname, 'public/tutorial/avatars/pending-scenes.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    avatar_id: AVATAR_ID,
    voice_id: VOICE_ID,
    created: new Date().toISOString(),
    scenes: results
  }, null, 2));

  console.log('');
  console.log('💾 IDs sauvegardes dans public/tutorial/avatars/pending-scenes.json');
  console.log('');
  console.log('⏳ Generation en cours (5-15 min par video).');
  console.log('   Utilise: node check-all-scenes.js');
}

main();
