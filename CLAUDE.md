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

**Trois parties principales :**
1. **Tutoriels** (`exercises/`) - Exercices d'apprentissage, publics
2. **UVCW** (`uvcw/`) - Module professionnel → voir [UVCW.md](remotion-app/src/uvcw/UVCW.md)
3. **Shared** (`shared/`) - Bibliothèques partagées (sons, etc.) → voir [SOUNDS.md](remotion-app/src/shared/sounds/SOUNDS.md)

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
│   │   ├── shared/                     # BIBLIOTHÈQUES PARTAGÉES
│   │   │   └── sounds/                 # → voir SOUNDS.md
│   │   └── uvcw/                       # MODULE PRO → voir UVCW.md
│   ├── public/
│   │   ├── sounds/                     # Bibliothèque sons partagée (27 fichiers)
│   │   ├── (assets exercices)
│   │   └── uvcw/                       # Assets UVCW
│   └── package.json
├── CLAUDE.md                           # Ce fichier (tutoriels)
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

## Notes de Session

### 27/01/2026 (soir)
- **Bibliothèque de sons partagée** créée (`src/shared/sounds/`)
  - 27 fichiers audio (42MB) - Envato Elements
  - Déplacée de `public/uvcw/sounds/` vers `public/sounds/`
  - 7 presets : cinematic, corporate, social, minimal, sfxOnly, educational, silent
  - Documentation : `src/shared/sounds/SOUNDS.md`
- Module UVCW avec sound design complet
- Documentation UVCW.md mise à jour

### 24/01/2026
- Exercices 1.1 à 6.2 complétés
- 12 compositions fonctionnelles
- Ken Burns, WordByWord, LowerThirds, AnimatedStats implémentés
- Bug corrigé : `<Folder>` causait des écrans noirs → liste plate
- Bug corrigé : IDs avec points (`1.1-`) → préfixe `Ex` (`Ex1-1-`)
