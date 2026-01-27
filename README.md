# Remotion + Claude Code

> Creer des videos programmatiques avec React, propulse par l'IA.

[![Remotion](https://img.shields.io/badge/Remotion-5.0-blue)](https://www.remotion.dev/)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-AI%20Powered-purple)](https://claude.ai/claude-code)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Ce projet demontre

Comment **Claude Code** avec le skill [Remotion Best Practices](https://skills.sh/remotion-dev/skills/remotion-best-practices) peut generer des videos professionnelles en quelques minutes :

- **Animations fluides** - Spring physics, easing, interpolation
- **Sequencement** - Transitions, timelines, compositions
- **Texte dynamique** - Word-by-word, citations animees
- **Sound design** - Musique, impacts, whooshes
- **Templates reutilisables** - Branding, infographies

---

## Structure du projet

```
remotion/
├── remotion-app/
│   ├── src/
│   │   ├── exercises/           # Tutoriels (6 niveaux)
│   │   │   ├── ex1-basics/      # Animations de base
│   │   │   ├── ex2-sequencing/  # Sequences & transitions
│   │   │   ├── ex3-media/       # Images, Ken Burns
│   │   │   ├── ex4-text/        # Texte dynamique
│   │   │   ├── ex5-branding/    # Identite visuelle
│   │   │   └── ex6-infographics/# Data visualization
│   │   │
│   │   ├── uvcw/                # Module UVCW (articles → videos)
│   │   │   ├── components/      # 15 composants reutilisables
│   │   │   ├── config/          # Brand, matieres, sons
│   │   │   ├── templates/       # 4 templates video
│   │   │   └── UVCW.md          # Documentation complete
│   │   │
│   │   ├── infographies/        # Infographies animees
│   │   │   ├── eval-workflow/   # Workflow multi-etapes
│   │   │   └── eval-workflow-flow/ # Flow diagram anime
│   │   │
│   │   ├── tutorial/            # Tutoriels video avec avatar IA
│   │   │   ├── components/      # AvatarPanel, InfoPanel
│   │   │   ├── config/          # Theme, layout split-screen
│   │   │   └── TUTORIAL.md      # Documentation
│   │   │
│   │   ├── shared/              # Bibliotheques partagees
│   │   │   └── sounds/          # Sound design (6 presets)
│   │   │
│   │   ├── HelloWorld/          # Composants de base
│   │   └── Root.tsx             # Point d'entree compositions
│   │
│   └── public/
│       ├── sounds/              # Audio (impacts, whooshes, musique)
│       └── uvcw/                # Assets UVCW (logos, fonts, images)
│
├── .claude/skills/              # Skills Claude Code
│   ├── remotion/                # Best practices Remotion
│   ├── elevenlabs/              # Generation voiceover IA
│   └── heygen/                  # Avatars video IA
│
├── demos/                       # Videos de demonstration
├── _references/                 # Fichiers sources (non commites)
├── CLAUDE.md                    # Instructions projet
├── SOUNDS-SETUP.md              # Guide audio
└── README.md                    # Ce fichier
```

---

## Parcours d'apprentissage

### Niveau 1 - Les Bases
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex1-1-HelloWorld` | Badge anime avec musique | `useCurrentFrame()`, `interpolate()`, `spring()` |
| `Ex1-2-CounterComparison` | 4 compteurs avec easings | `Easing.in()`, `Easing.out()` |

### Niveau 2 - Sequencement
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex2-1-Slideshow` | 3 slides avec transitions | `<TransitionSeries>`, `fade()` |
| `Ex2-2-VideoTemplate` | Intro/Contenu/Outro | Composants reutilisables |

### Niveau 3 - Media
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex3-1-ImageShowcase` | Ken Burns sur images | Zoom, pan animes |

### Niveau 4 - Texte
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex4-1-WordByWord` | Texte mot par mot (TikTok) | Animation sequentielle |
| `Ex4-2-AnimatedQuote` | Citation (LinkedIn) | Typography, timing |

### Niveau 5 - Branding
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex5-1-BrandKit` | Palette, fonts, logo | Config centralisee |
| `Ex5-2-LowerThirds` | Bandeaux animes | Composants pro |

### Niveau 6 - Infographies
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex6-1-AnimatedStats` | Compteurs, graphiques | Data visualization |
| `Ex6-2-ArticleToVideo` | Article → Video | Layout automatique |

---

## Modules professionnels

### UVCW - Videos d'articles
> Transforme des articles de l'Union des Villes et Communes de Wallonie en videos sociales.

**Templates disponibles :**
- `ArticlePost` - Post statique avec photo
- `ArticleVideo` - Video avec intro/outro
- `ArticleVideoWithHook` - Ajoute un chiffre choc
- `ArticleVideoUltimate` - Version complete avec Ken Burns, mot-a-mot, barre de progression

**Fonctionnalites :**
- 46 matieres avec couleurs et pictos
- 6 presets sonores (cinematic, corporate, social...)
- Generation depuis JSON

Documentation : [`remotion-app/src/uvcw/UVCW.md`](remotion-app/src/uvcw/UVCW.md)

### Infographies animees
> Visualisations de workflows et diagrammes animes.

| Composition | Description | Format |
|-------------|-------------|--------|
| `Infographie-EvalWorkflow` | Workflow multi-etapes detaille | 1920x1080 |
| `Infographie-EvalFlow` | Diagramme de flux simplifie | 1080x1080 |
| `Infographie-EvalFlowV2` | Version dark theme avec animations | 1080x1080 |

---

## Demarrage rapide

### 1. Cloner et installer
```bash
git clone https://github.com/kikounicou/remotion.git
cd remotion/remotion-app
npm install
```

### 2. Lancer le studio
```bash
npm run dev
```
Ouvrez **http://localhost:3000**

### 3. Rendre une video
```bash
# Exercice simple
npx remotion render Ex1-1-HelloWorld output.mp4

# Video UVCW
npx remotion render UVCW-ArticleVideo-Ultimate-PanLeft output.mp4

# Infographie
npx remotion render Infographie-EvalFlowV2 output.mp4
```

### 4. (Optionnel) Ajouter les sons
Voir [SOUNDS-SETUP.md](SOUNDS-SETUP.md) pour telecharger les sons gratuits depuis Pixabay.

### 5. (Optionnel) Configurer les APIs pour le module Tutorial

Le module Tutorial utilise des APIs externes pour generer des voix et avatars IA.

```bash
# Copier le fichier d'exemple
cd remotion-app
cp .env.example .env.local

# Editer .env.local avec vos cles API
```

| API | Inscription | Free tier |
|-----|-------------|-----------|
| [ElevenLabs](https://elevenlabs.io/) | Profile > API Keys | 10,000 caracteres/mois |
| [HeyGen](https://www.heygen.com/) | Settings > API | 1 credit (~1 min video) |

Le fichier `.env.local` n'est **jamais committe** (protege par .gitignore).

---

## Sound Design

6 presets audio prets a l'emploi :

| Preset | Style | Usage |
|--------|-------|-------|
| `cinematic` | Bande-annonce | Contenu impactant |
| `corporate` | Institutionnel | Presentations |
| `social` | Dynamique | Reseaux sociaux |
| `minimal` | Subtil | Tutoriels |
| `sfxOnly` | SFX uniquement | Voix off externe |
| `silent` | Muet | Tests |

```tsx
import { SOUND_PRESETS } from "./shared/sounds";
soundPreset: SOUND_PRESETS.cinematic;
```

---

## Skills Claude Code

Ce projet inclut des skills pour Claude Code :

| Skill | Description |
|-------|-------------|
| `remotion` | Best practices Remotion (animations, audio, composants) |
| `elevenlabs` | Generation de voiceovers IA avec ElevenLabs |
| `heygen` | Creation de videos avec avatars IA HeyGen |

---

## Ressources

- [Documentation Remotion](https://www.remotion.dev/docs)
- [Remotion Skill sur skills.sh](https://skills.sh/remotion-dev/skills/remotion-best-practices)
- [Claude Code](https://claude.ai/claude-code)
- [Pixabay - Sons gratuits](https://pixabay.com/sound-effects/)

---

## Credits

- **Remotion** - Framework video React
- **Claude Code** - Assistant IA pour le developpement
- **Pixabay** - Sons libres de droits
- **Unsplash** - Images libres de droits

---

## Licence

MIT - Libre d'utilisation, modification et distribution.

---

_Cree avec Claude Code_
