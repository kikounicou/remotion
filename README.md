# Remotion + Claude Code

> Apprendre a creer des videos programmatiques avec React, guide par l'IA.

[![Remotion](https://img.shields.io/badge/Remotion-5.0-blue)](https://www.remotion.dev/)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Opus%204.5-purple)](https://claude.ai/claude-code)
[![Skills.sh](https://img.shields.io/badge/Skills.sh-Remotion-orange)](https://skills.sh/remotion-dev/skills/remotion-best-practices)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Ce que j'ai construit en une journee avec Claude Code

Ce repo documente mon apprentissage de Remotion avec **Claude Code** + le skill [Remotion Best Practices](https://skills.sh/remotion-dev/skills/remotion-best-practices).

### Demos video

| Demo                   | Description                               | Lien                                                                |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| **LinkedIn Showcase**  | Montage complet de tout ce qui a ete cree | [Voir sur LinkedIn](https://www.linkedin.com/posts/nicolasdeswysen) |
| **UVCW Article Video** | Article transforme en video sociale       | [Demo YouTube](https://youtu.be/example)                            |
| **Tutorial PEB PRO**   | Avatar IA + infographies synchronisees    | [Demo YouTube](https://youtu.be/example)                            |

> _Note : Remplacez les liens par vos URLs reelles apres upload_

---

## Stack utilisee

| Outil           | Role                                        |
| --------------- | ------------------------------------------- |
| **Remotion**    | Framework React pour videos programmatiques |
| **Claude Code** | Assistant IA pour coder en conversationnel  |
| **Skills.sh**   | Best practices Remotion pour Claude         |
| **ElevenLabs**  | Generation de voix IA                       |
| **HeyGen**      | Avatars video IA                            |

---

## Ce que ce projet demontre

### Niveau 1-6 : Exercices d'apprentissage

12 compositions progressives pour maitriser Remotion :

- **Animations** : `interpolate()`, `spring()`, easings
- **Sequencement** : `<Sequence>`, `<TransitionSeries>`
- **Media** : Images (Ken Burns), videos, audio
- **Texte** : Word-by-word, citations animees
- **Branding** : Config centralisee, lower thirds
- **Infographies** : Compteurs, graphiques, data viz

### Module UVCW : JSON → Video

Transforme des articles en videos sociales automatiquement :

- 46 matieres avec couleurs/pictos
- 4 templates (Post, Video, Hook, Ultimate)
- Sound design avec 7 presets

### Module Tutorial : Avatar IA + Infographies

Combine HeyGen (avatar) + Whisper (transcription) + Remotion :

- Avatar flottant repositionnable
- Mots-cles synchronises a la voix
- Effets particules et transitions

### LinkedIn Showcase V2

Montage final presentant tout le travail :

- Audio ducking automatique
- Chapitres avec barre de progression
- Animation "chat" montrant l'echange avec Claude Code

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
│   │   │   └── templates/       # 4 templates video
│   │   │
│   │   ├── tutorial/            # Tutoriels video avec avatar IA
│   │   │   ├── components/      # AvatarPanel, InfoPanel
│   │   │   └── config/          # Theme, layout split-screen
│   │   │
│   │   ├── infographies/        # Infographies animees
│   │   │   ├── eval-workflow/   # Workflow multi-etapes
│   │   │   └── eval-workflow-flow/ # Flow diagram anime
│   │   │
│   │   ├── showcase/            # Montages finaux
│   │   │   ├── LinkedInShowcase.tsx
│   │   │   └── LinkedInShowcaseV2.tsx  # Version complete
│   │   │
│   │   ├── shared/              # Bibliotheques partagees
│   │   │   └── sounds/          # Sound design (7 presets)
│   │   │
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
├── CLAUDE.md                    # Instructions projet
└── README.md                    # Ce fichier
```

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

Ouvrez **http://localhost:3000** et explorez les compositions dans la sidebar.

### 3. Tester une composition

Dans le Studio Remotion, selectionnez une composition :

- `Ex1-1-HelloWorld` - Pour commencer
- `LinkedIn-Showcase-V2` - Pour voir le resultat final
- `UVCW-ArticleVideo-Ultimate-PanLeft` - Pour la demo JSON → Video

### 4. Rendre une video

```bash
# Exercice simple
npx remotion render Ex1-1-HelloWorld output.mp4

# LinkedIn Showcase (format carre)
npx remotion render LinkedIn-Showcase-V2 linkedin.mp4

# Video UVCW
npx remotion render UVCW-ArticleVideo-Ultimate-PanLeft uvcw.mp4
```

---

## Parcours d'apprentissage recommande

Suivez les exercices dans l'ordre pour apprendre progressivement :

### Niveau 1 - Les Bases

| Composition               | Concepts                                         |
| ------------------------- | ------------------------------------------------ |
| `Ex1-1-HelloWorld`        | `useCurrentFrame()`, `interpolate()`, `spring()` |
| `Ex1-2-CounterComparison` | `Easing.in()`, `Easing.out()`, `Easing.inOut()`  |

### Niveau 2 - Sequencement

| Composition           | Concepts                        |
| --------------------- | ------------------------------- |
| `Ex2-1-Slideshow`     | `<TransitionSeries>`, `fade()`  |
| `Ex2-2-VideoTemplate` | Composants reutilisables, props |

### Niveau 3 - Media

| Composition           | Concepts                      |
| --------------------- | ----------------------------- |
| `Ex3-1-ImageShowcase` | `<Img>`, Ken Burns (zoom/pan) |

### Niveau 4 - Texte

| Composition           | Concepts                       |
| --------------------- | ------------------------------ |
| `Ex4-1-WordByWord`    | Animation sequentielle de mots |
| `Ex4-2-AnimatedQuote` | Typography, timing par ligne   |

### Niveau 5 - Branding

| Composition         | Concepts                              |
| ------------------- | ------------------------------------- |
| `Ex5-1-BrandKit`    | Config centralisee (`brandConfig.ts`) |
| `Ex5-2-LowerThirds` | Composants pro, variantes             |

### Niveau 6 - Infographies

| Composition            | Concepts                        |
| ---------------------- | ------------------------------- |
| `Ex6-1-AnimatedStats`  | Compteurs, barres, donut charts |
| `Ex6-2-ArticleToVideo` | Structure Intro/Points/Outro    |

---

## Configuration optionnelle

### Sons (gratuit)

Les sons sont optionnels. Pour les ajouter :

1. Voir [SOUNDS-SETUP.md](SOUNDS-SETUP.md)
2. Telecharger depuis Pixabay (gratuit)

### APIs externes (pour le module Tutorial)

```bash
cd remotion-app
cp .env.example .env.local
# Editer .env.local avec vos cles
```

| API                                  | Free tier              |
| ------------------------------------ | ---------------------- |
| [ElevenLabs](https://elevenlabs.io/) | 10,000 caracteres/mois |
| [HeyGen](https://www.heygen.com/)    | 1 video gratuite       |

---

## Skills Claude Code

Ce projet inclut des skills pour Claude Code dans `.claude/skills/` :

| Skill        | Description                             |
| ------------ | --------------------------------------- |
| `remotion`   | Patterns d'animation, audio, composants |
| `elevenlabs` | Generation de voiceovers IA             |
| `heygen`     | Creation de videos avec avatars IA      |

Pour utiliser ces skills avec Claude Code, installez-les via [skills.sh](https://skills.sh).

---

## Ressources

- [Documentation Remotion](https://www.remotion.dev/docs)
- [Remotion Skill sur skills.sh](https://skills.sh/remotion-dev/skills/remotion-best-practices)
- [Claude Code](https://code.claude.com/docs)
- [Pixabay - Sons gratuits](https://pixabay.com/sound-effects/)

---

## FAQ

### Comment Claude Code m'a aide ?

J'ai utilise Claude Code en mode conversationnel pour :

- Generer le code des compositions
- Debugger les problemes (ecrans noirs, audio, etc.)
- Implementer des features complexes (audio ducking, Ken Burns)
- Documenter le projet

Le skill `remotion` lui donne les best practices specifiques a Remotion.

### Puis-je utiliser ce code ?

Oui, licence MIT. Les sons doivent etre telecharges separement (Pixabay, libre de droits).

### Comment contribuer ?

Issues et PRs bienvenus ! Voir les exercices `ex7-tts` et `ex8-lambda` encore a faire.

---

## Credits

- **Remotion** - Framework video React
- **Claude Code** - Assistant IA Anthropic
- **Skills.sh** - Marketplace de skills
- **Pixabay** - Sons libres de droits
- **Unsplash** - Images libres de droits

---

## Licence

MIT - Libre d'utilisation, modification et distribution.

---

_Cree en une journee avec Claude Code + Remotion_
