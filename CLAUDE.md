# Remotion Learning Project

## IMPORTANT - Sécurité Repo Public

**Ce projet est sur un repo GitHub public : https://github.com/kikounicou/remotion**

### Règles de sécurité (OBLIGATOIRE)
- **JAMAIS** de secrets, API keys, tokens, mots de passe dans le code
- **JAMAIS** de fichiers .env committés (déjà dans .gitignore)
- **JAMAIS** de credentials ou fichiers sensibles
- **Vérifier avant chaque push** : `grep -r "api_key\|secret\|password\|token\|sk-\|AKIA" src/`
- Les fichiers `.claude/settings.local.json` et `.claude/conversations/` sont exclus
- **Git push** : Uniquement quand l'utilisateur le demande explicitement

### Assets autorisés
- Musique/images libres de droits uniquement (Pixabay, Unsplash, etc.)
- Toujours vérifier la licence avant d'ajouter un asset
- **Sons Pixabay** : Libres de droits, redistribuables (voir SOUNDS-SETUP.md)

---

## Vue d'ensemble

Ce projet est un espace d'apprentissage pour **Remotion**, un framework React pour créer des vidéos programmatiquement.

**Six parties principales :**
1. **Tutoriels** (`exercises/`) - Exercices d'apprentissage progressifs
2. **Infographies** (`infographies/`) - Vidéos explicatives animées
3. **Tutorial PEB** (`tutorial/`) - Tutoriels avec avatar IA (HeyGen + Whisper)
4. **UVCW** (`uvcw/`) - Module professionnel → voir [UVCW.md](remotion-app/src/uvcw/UVCW.md)
5. **Showcase** (`showcase/`) - Montages finaux pour LinkedIn
6. **Shared** (`shared/`) - Bibliothèques partagées (sons, etc.)

---

## Architecture du Projet

```
remotion/
├── remotion-app/
│   ├── src/
│   │   ├── Root.tsx                    # Compositions (liste plate)
│   │   ├── HelloWorld.tsx              # Ex1-1-HelloWorld
│   │   ├── HelloWorld/                 # Composants réutilisables
│   │   ├── exercises/                  # TUTORIELS (publics)
│   │   │   ├── ex1-basics/
│   │   │   ├── ex2-sequencing/
│   │   │   ├── ex3-media/
│   │   │   ├── ex4-text/
│   │   │   ├── ex5-branding/
│   │   │   └── ex6-infographics/
│   │   ├── infographies/               # VIDÉOS EXPLICATIVES
│   │   │   ├── eval-workflow/          # Workflow évaluations (slides)
│   │   │   └── eval-workflow-flow/     # Workflow évaluations (flow animé)
│   │   ├── tutorial/                   # TUTORIELS AVATAR IA
│   │   │   ├── PebTutorial.tsx         # Version split-screen (August)
│   │   │   ├── PebTutorialNicolas.tsx  # Version avec avatar perso
│   │   │   └── PebTutorialPro.tsx      # Version cinématique complète
│   │   ├── showcase/                   # MONTAGES FINAUX
│   │   │   ├── LinkedInShowcase.tsx    # Version V1 (16:9)
│   │   │   └── LinkedInShowcaseV2.tsx  # Version V2 (carré)
│   │   ├── shared/                     # BIBLIOTHÈQUES PARTAGÉES
│   │   │   └── sounds/                 # Sound design
│   │   └── uvcw/                       # MODULE PRO → voir UVCW.md
│   ├── public/
│   │   ├── sounds/                     # Bibliothèque sons partagée
│   │   ├── (assets exercices)
│   │   └── uvcw/                       # Assets UVCW
│   └── package.json
├── .claude/
│   └── skills/                         # Skills Claude Code
│       ├── remotion/                   # Best practices Remotion
│       ├── elevenlabs/                 # Génération voix AI
│       └── heygen/                     # Avatars vidéo AI
├── CLAUDE.md                           # Ce fichier
├── README.md                           # Guide de démarrage
└── .gitignore
```

---

## Commandes CLI

```bash
# Développement (Studio)
cd remotion-app && npm run dev

# Prévisualiser (port peut varier)
http://localhost:3000

# Rendu vidéo
npx remotion render Ex1-1-HelloWorld output.mp4

# Rendu image fixe
npx remotion still Ex1-1-HelloWorld output.png --frame=0
```

---

# TUTORIELS - Exercices d'apprentissage

## Compositions disponibles

| ID | Description | Durée | Format |
|----|-------------|-------|--------|
| `Ex1-1-HelloWorld` | Template avec badge animé et musique | 5s | 1920x1080 |
| `Ex1-2-CounterComparison` | 4 compteurs avec easings différents | 4s | 1920x1080 |
| `Ex2-1-Slideshow` | 3 slides avec transitions fade | 5s | 1920x1080 |
| `Ex2-2-VideoTemplate` | Template Intro/Contenu/Outro | 7s | 1920x1080 |
| `Ex3-1-ImageShowcase` | Ken Burns effect sur 3 images | 7.6s | 1920x1080 |
| `Ex4-1-WordByWord` | Texte mot par mot style TikTok | 5s | 1920x1080 |
| `Ex4-2-AnimatedQuote` | Citation animée style LinkedIn | 6s | 1080x1080 |
| `Ex5-1-BrandKit` | Palette couleurs, typos, logo | 6s | 1920x1080 |
| `Ex5-2-LowerThirds` | 3 variantes de bandeaux nom/titre | 10s | 1920x1080 |
| `Ex6-1-AnimatedStats` | Compteurs, barres, donut charts | 6s | 1920x1080 |
| `Ex6-2-ArticleToVideo` | Points clés d'article → vidéo | 9s | 1920x1080 |
| `Dev-Logo` | Logo seul pour tests | 5s | 1920x1080 |
| `Infographie-EvalWorkflow` | Workflow évaluations (slides) | 38s | 1920x1080 |
| `Infographie-EvalFlow` | Workflow évaluations V1 (flow) | 15s | 1080x1080 |
| `Infographie-EvalFlowV2` | Workflow évaluations V2 (animé) | 20s | 1080x1080 |
| `Tutorial-PEB-August` | Tutoriel PEB avec avatar August | 28s | 1920x1080 |
| `Tutorial-PEB-Nicolas` | Tutoriel PEB avec avatar perso | 33s | 1920x1080 |
| `Tutorial-PEB-PRO` | Tutoriel PEB version cinématique | 33s | 1920x1080 |
| `LinkedIn-Showcase` | Montage V1 (16:9) | ~2min | 1920x1080 |
| `LinkedIn-Showcase-V2` | Montage V2 complet (carré) | ~2min16s | 1080x1080 |

---

## Exercices - Progression

### Niveau 1 - Bases (`ex1-basics/`)
- [x] **Ex1-1-HelloWorld** : Badge animé, timing ajusté, musique de fond
- [x] **Ex1-2-CounterComparison** : Comparaison des easings

### Niveau 2 - Séquencement (`ex2-sequencing/`)
- [x] **Ex2-1-Slideshow** : 3 slides avec transitions fade
- [x] **Ex2-2-VideoTemplate** : Template Intro/Contenu/Outro réutilisable

### Niveau 3 - Média (`ex3-media/`)
- [x] **Ex3-1-ImageShowcase** : Ken Burns effect (zoomIn, zoomOut, panRight)
- [ ] **Ex3-2-VideoOverlay** : Vidéo de fond + texte animé

### Niveau 4 - Texte (`ex4-text/`)
- [x] **Ex4-1-WordByWord** : Texte mot par mot style TikTok
- [x] **Ex4-2-AnimatedQuote** : Citation animée format LinkedIn (1080x1080)

### Niveau 5 - Branding (`ex5-branding/`)
- [x] **Ex5-1-BrandKit** : Palette couleurs, typographies, logo
- [x] **Ex5-2-LowerThirds** : Bandeaux animés (3 variantes)
- **Fichier clé** : `brandConfig.ts` - Configuration centralisée réutilisable

### Niveau 6 - Infographies (`ex6-infographics/`)
- [x] **Ex6-1-AnimatedStats** : Compteurs, barres de progression, donut charts
- [x] **Ex6-2-ArticleToVideo** : Template article → vidéo infographique

### Niveau 7 - Text-to-Speech (`ex7-tts/`) - À venir
- [ ] **Ex7-1-TTSBasic** : Intégration ElevenLabs/OpenAI TTS
- [ ] **Ex7-2-SyncedCaptions** : Sous-titres synchronisés mot par mot

### Niveau 8 - AWS Lambda (`ex8-lambda/`) - À venir
- [ ] **Ex8-1-LambdaSetup** : Config AWS, déploiement
- [ ] **Ex8-2-CloudRender** : Rendu vidéo via Lambda + S3
- [ ] **Ex8-3-VideoAPI** : API POST → vidéo générée

---

## Concepts clés par exercice

### Niveau 4 - Texte
- **WordByWord** : Calcul du mot actif basé sur `frame / framesPerWord`
- **AnimatedQuote** : Animation ligne par ligne avec délai progressif

### Niveau 5 - Branding
- **brandConfig.ts** : Couleurs, fonts, espacements, durées centralisés
- **LowerThirds** : Composant réutilisable avec prop `variant`

### Niveau 6 - Infographies
- **AnimatedCounter** : `interpolate()` avec `Easing.out(Easing.cubic)`
- **DonutChart** : SVG avec `strokeDasharray` et `strokeDashoffset` animés
- **ArticleToVideo** : Structure Intro → Points → Outro avec `<Sequence>`

---

## Règles Remotion

### À FAIRE
- `useCurrentFrame()` pour toutes les animations
- `staticFile()` pour les assets du dossier `public/`
- `random(seed)` pour la randomisation (déterministe)
- `layout="none"` sur `<Sequence>` si positionnement custom

### À NE PAS FAIRE
- `Math.random()` - interdit (non déterministe)
- CSS transitions/animations
- IDs de composition avec des points (utiliser tirets)

---

# INFOGRAPHIES - Visualisations animees

## Vue d'ensemble

Le module `infographies/` contient des visualisations de workflows techniques :

| Composition | Description | Format | Duree |
|-------------|-------------|--------|-------|
| `Infographie-EvalWorkflow` | Workflow complet avec sections | 1920x1080 | 38s |
| `Infographie-EvalFlow` | Diagramme de flux V1 | 1080x1080 | 15s |
| `Infographie-EvalFlowV2` | Diagramme de flux V2 (dark) | 1080x1080 | 20s |

## Workflow visualise

Le workflow d'evaluation de documents :

```
Scanner → N8N → S3 → Lambda → Analysis → Dashboard
```

**Services representes :**
- Scanner (violet) - Numerisation
- N8N (rose) - Automation
- S3 (vert) - Stockage AWS
- Lambda (orange) - Traitement
- Azure (bleu) - Analyse IA

Documentation : [`infographies/INFOGRAPHIES.md`](remotion-app/src/infographies/INFOGRAPHIES.md)

---

## Skills Claude Code

Les skills sont dans `.claude/skills/` :

| Skill | Description |
|-------|-------------|
| `remotion` | Best practices Remotion (animations, séquencement, audio, etc.) |
| `elevenlabs` | Génération de voix AI pour voiceovers |
| `heygen` | Création de vidéos avec avatars AI |

---

---

# TUTORIAL PEB - Avatar IA + Infographies

## Vue d'ensemble

Module combinant :
- **HeyGen** : Génération vidéo avatar (stock ou personnalisé, voix clonée)
- **OpenAI Whisper** : Transcription avec timestamps mot par mot
- **Remotion** : Composition finale avec infographies synchronisées

## Compositions disponibles

| ID | Description | Avatar | Durée |
|----|-------------|--------|-------|
| `Tutorial-PEB-August` | Split-screen classique | August (stock) | 28s |
| `Tutorial-PEB-Nicolas` | Fond sombre assorti | Nicolas (perso) | 33s |
| `Tutorial-PEB-PRO` | Version cinématique | Nicolas (perso) | 33s |

## Workflow de création

```bash
# 1. Générer la vidéo avatar (HeyGen)
node generate-heygen.js

# 2. Vérifier le statut
node check-heygen-status.js <video_id>

# 3. Transcrire avec Whisper (timestamps mot par mot)
node transcribe-video.js

# 4. Prévisualiser dans Remotion
npm run dev

# 5. Exporter
npx remotion render Tutorial-PEB-PRO out/tutorial-pro.mp4
```

## Configuration API

Copier `.env.example` vers `.env.local` et ajouter les clés :

| API | Variable | Free tier |
|-----|----------|-----------|
| HeyGen | `HEYGEN_API_KEY` | 3 vidéos/mois |
| OpenAI | `OPENAI_API_KEY` | Pay-per-use (~$0.006/min) |
| ElevenLabs | `ELEVENLABS_API_KEY` | 10,000 chars/mois |

## Fonctionnalités PRO

- **Avatar flottant** : Position différente par scène (coins, côtés)
- **Mots-clés animés** : Synchronisés avec la voix (timestamps Whisper)
- **Effets visuels** : Particules, grille animée, Ken Burns
- **Transitions** : Fade entre scènes, spring animations
- **Audio** : Musique corporate en fond (15% volume)
- **Branding** : Logo PEB, barre de progression, watermark

---

# SHOWCASE - Montages finaux

## Vue d'ensemble

Le module `showcase/` contient les montages video finaux presentant le travail accompli.

## Compositions disponibles

| ID | Description | Format | Duree |
|----|-------------|--------|-------|
| `LinkedIn-Showcase` | Montage V1 (16:9) | 1920x1080 | ~2min |
| `LinkedIn-Showcase-V2` | Montage V2 (carre, complet) | 1080x1080 | ~2min16s |

## LinkedIn Showcase V2 - Features

La version V2 est le montage final complet avec :

### Audio ducking automatique
- Musique de fond a 25% par defaut
- Baisse a 10% quand une video a du son (avatar, SFX)
- Configuration via `AUDIO_DUCK_SEGMENTS`

### Chapitres avec barre de progression
- 8 chapitres : Intro, HelloWorld, Sequencing, UVCW, Tutorial, Infographies, ChatExchange, Outro
- Barre de progression multicolore en bas

### VideoFrame avec mode fullscreen
```tsx
<VideoFrame videoSrc="video.mp4" fullscreen={true} />
```
- `fullscreen={true}` : Video en plein ecran (objectFit: cover)
- `fullscreen={false}` : Letterbox avec fond mauve (objectFit: contain)

### ChatExchange - Animation conversation
Montre l'echange conversationnel avec Claude Code :
- Messages animes avec spring
- Indicateur de frappe "..."
- Style chat avec bulles

### Outils presentes
1. **Claude Code** - Assistant IA CLI
2. **Skills.sh** - Marketplace de skills
3. **Remotion** - Framework video React
4. **ElevenLabs** - Voix IA
5. **HeyGen** - Avatars IA

---

## Notes de Session

### 28/01/2026
- **LinkedIn Showcase V2** finalise
  - Format carre 1080x1080 pour LinkedIn
  - Audio ducking automatique (25% → 10%)
  - Fullscreen pour videos carrees, letterbox pour 16:9
  - ChatExchange anime montrant la conversation avec Claude
  - GitHub card avec lien repo
  - Duree totale : 4090 frames (~2min16s)
  - Export : 26.8 MB
- **Documentation GitHub** mise a jour
  - README.md avec demos, stack, parcours d'apprentissage
  - CLAUDE.md avec section Showcase complete
  - Verification securite OK (pas de cles API)

### 27/01/2026 (nuit)
- **Module Tutorial PEB** complet
  - Génération vidéo HeyGen avec avatar stock (August) et personnalisé (Nicolas)
  - Transcription OpenAI Whisper avec timestamps mot par mot
  - 3 compositions Remotion : split-screen, fond assorti, cinématique PRO
  - Version PRO : avatar flottant, particules, transitions, musique
  - Export final : `out/peb-tutorial-pro.mp4` (20 MB, 33s)
- **Scripts utilitaires** créés
  - `generate-heygen.js` : Génération vidéo avatar
  - `check-heygen-status.js` : Vérification statut
  - `transcribe-video.js` : Transcription Whisper
  - `list-avatars.js`, `list-voices.js` : Exploration API

### 27/01/2026 (soir)
- **Restructuration projet** pour GitHub
  - README.md complet avec structure, modules pro, demarrage rapide
  - INFOGRAPHIES.md cree pour documenter le module infographies
  - CLAUDE.md mis a jour avec section infographies
  - Nettoyage fichiers de test (test-*.png)
- **Test UVCW** : Article 9653 converti en video avec succes
  - Matiere "insertion" (E34F57) correctement mappee
  - Ken Burns, word-by-word, progress bar fonctionnels

### 27/01/2026
- **Module Infographies** cree (`src/infographies/`)
  - `Infographie-EvalWorkflow` : Version slides (1920x1080, 38s)
  - `Infographie-EvalFlowV2` : Version flow anime (1080x1080, 20s, fond sombre)
- **Skills consolides** dans `.claude/skills/` (remotion, elevenlabs, heygen)
- Nettoyage des dossiers dupliques (.agent, .agents, skills/)

### 27/01/2026 (matin)
- **Bibliotheque de sons partagee** creee (`src/shared/sounds/`)
  - 27 fichiers audio (42MB) - Envato Elements
  - 7 presets : cinematic, corporate, social, minimal, sfxOnly, educational, silent
- Module UVCW avec sound design complet

### 24/01/2026
- Exercices 1.1 a 6.2 completes
- 12 compositions fonctionnelles
- Ken Burns, WordByWord, LowerThirds, AnimatedStats implementes
