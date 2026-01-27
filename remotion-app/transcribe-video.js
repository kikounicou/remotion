const fs = require('fs');
const path = require('path');
const https = require('https');

// Load env
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
let openaiKey = '';
envContent.split('\n').forEach(line => {
  if (line.startsWith('OPENAI_API_KEY=') || line.startsWith('OPEANAI_API_KEY=')) {
    openaiKey = line.split('=')[1].trim();
  }
});

if (!openaiKey) {
  console.log('❌ OPENAI_API_KEY non trouvée dans .env.local');
  process.exit(1);
}

const videoPath = path.join(__dirname, 'public/tutorial/avatars/nicolas-peb-complete.mp4');

console.log('🎤 Transcription avec OpenAI Whisper...');
console.log('   Fichier:', videoPath);
console.log('');

// Use fetch API (Node 18+) or fallback
async function transcribe() {
  const FormData = (await import('form-data')).default;
  const form = new FormData();

  form.append('file', fs.createReadStream(videoPath));
  form.append('model', 'whisper-1');
  form.append('language', 'fr');
  form.append('response_format', 'verbose_json');
  form.append('timestamp_granularities[]', 'word');

  const headers = {
    'Authorization': `Bearer ${openaiKey}`,
    ...form.getHeaders()
  };

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      path: '/v1/audio/transcriptions',
      method: 'POST',
      headers: headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.log('❌ Erreur API:', res.statusCode);
          console.log(data);
          reject(new Error(data));
          return;
        }
        resolve(JSON.parse(data));
      });
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

transcribe().then(result => {
  console.log('✅ Transcription terminée!');
  console.log('');
  console.log('📝 Texte complet:');
  console.log(result.text);
  console.log('');
  console.log('⏱️  Durée:', result.duration, 'secondes');
  console.log('');

  // Save full result
  const outputPath = path.join(__dirname, 'public/tutorial/avatars/nicolas-transcription.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log('💾 Résultat complet sauvegardé dans:', outputPath);

  // Show word timestamps if available
  if (result.words && result.words.length > 0) {
    console.log('');
    console.log('📊 Timestamps par mot (premiers 20):');
    result.words.slice(0, 20).forEach(w => {
      console.log(`   [${w.start.toFixed(2)}s - ${w.end.toFixed(2)}s] "${w.word}"`);
    });
    if (result.words.length > 20) {
      console.log(`   ... et ${result.words.length - 20} mots de plus`);
    }
  }

  // Show segments
  if (result.segments && result.segments.length > 0) {
    console.log('');
    console.log('📋 Segments (phrases):');
    result.segments.forEach((seg, i) => {
      console.log(`   ${i+1}. [${seg.start.toFixed(2)}s - ${seg.end.toFixed(2)}s]`);
      console.log(`      "${seg.text.trim()}"`);
    });
  }
}).catch(err => {
  console.error('❌ Erreur:', err.message);
});
