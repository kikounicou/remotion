# 🎬 Remotion + Claude Code

> Créer des vidéos programmatiques avec React, propulsé par l'IA.

[![Remotion](https://img.shields.io/badge/Remotion-5.0-blue)](https://www.remotion.dev/)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-AI%20Powered-purple)](https://claude.ai/claude-code)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🚀 Ce projet démontre

Comment **Claude Code** avec le skill [Remotion Best Practices](https://skills.sh/remotion-dev/skills/remotion-best-practices) peut générer des vidéos professionnelles en quelques minutes :

- ✅ **Animations fluides** - Spring physics, easing, interpolation
- ✅ **Séquencement** - Transitions, timelines, compositions
- ✅ **Texte dynamique** - Word-by-word, citations animées
- ✅ **Sound design** - Musique, impacts, whooshes
- ✅ **Templates réutilisables** - Branding, infographies

---

## 🎥 Démos

### Animation de base
https://github.com/kikounicou/remotion/raw/main/demos/ex1-helloworld.mp4

### Citation animée (LinkedIn style)
https://github.com/kikounicou/remotion/raw/main/demos/ex4-animated-quote.mp4

### Vidéo complète avec sound design
https://github.com/kikounicou/remotion/raw/main/demos/uvcw-ultimate-sound.mp4

---

## 📚 Qu'est-ce que Remotion ?

[Remotion](https://www.remotion.dev/) transforme du code React en vidéos. Chaque frame = un composant React.

```tsx
const MyVideo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return <h1 style={{ opacity }}>Hello World</h1>;
};
```

**Avantages :**
- 🔧 Code versionnable (Git)
- 🎯 Animations précises au frame près
- 🤖 Automatisation possible (API, CLI)
- ☁️ Rendu cloud via AWS Lambda

---

## 🤖 Claude Code + Remotion Skill

Ce projet a été créé avec [Claude Code](https://claude.ai/claude-code) utilisant le skill **Remotion Best Practices** disponible sur [skills.sh](https://skills.sh/remotion-dev/skills/remotion-best-practices).

### Comment ça marche ?

1. **Installez Claude Code** dans votre terminal
2. **Activez le skill Remotion** : `/skill remotion`
3. **Décrivez ce que vous voulez** : "Crée une vidéo avec un texte qui apparaît mot par mot"
4. **Claude génère le code** Remotion correspondant

### Exemple de prompts

```
"Crée une animation de compteur qui va de 0 à 100 avec un effet spring"

"Fais une vidéo LinkedIn avec une citation animée ligne par ligne"

"Génère un template vidéo avec intro, contenu et outro"
```

---

## 🏗️ Structure du projet

```
remotion/
├── remotion-app/
│   ├── src/
│   │   ├── exercises/        # 📖 Tutoriels progressifs
│   │   │   ├── ex1-basics/   # Animations de base
│   │   │   ├── ex2-sequencing/   # Séquences & transitions
│   │   │   ├── ex3-media/    # Images, Ken Burns
│   │   │   ├── ex4-text/     # Texte dynamique
│   │   │   ├── ex5-branding/ # Identité visuelle
│   │   │   └── ex6-infographics/ # Data viz
│   │   ├── shared/           # 🔊 Bibliothèques partagées
│   │   │   └── sounds/       # Sound design
│   │   └── uvcw/             # 🏢 Exemple professionnel
│   └── public/
│       └── sounds/           # Fichiers audio (Pixabay)
├── demos/                    # 🎬 Vidéos de démonstration
├── SOUNDS-SETUP.md           # Guide téléchargement sons
└── README.md
```

---

## 🎓 Parcours d'apprentissage

### Niveau 1 - Les Bases
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex1-1-HelloWorld` | Badge animé avec musique | `useCurrentFrame()`, `interpolate()`, `spring()` |
| `Ex1-2-CounterComparison` | 4 compteurs avec easings | `Easing.in()`, `Easing.out()` |

### Niveau 2 - Séquencement
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex2-1-Slideshow` | 3 slides avec transitions | `<TransitionSeries>`, `fade()` |
| `Ex2-2-VideoTemplate` | Intro/Contenu/Outro | Composants réutilisables |

### Niveau 3 - Média
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex3-1-ImageShowcase` | Ken Burns sur images | Zoom, pan animés |

### Niveau 4 - Texte
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex4-1-WordByWord` | Texte mot par mot (TikTok) | Animation séquentielle |
| `Ex4-2-AnimatedQuote` | Citation (LinkedIn) | Typography, timing |

### Niveau 5 - Branding
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex5-1-BrandKit` | Palette, fonts, logo | Config centralisée |
| `Ex5-2-LowerThirds` | Bandeaux animés | Composants pro |

### Niveau 6 - Infographies
| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Ex6-1-AnimatedStats` | Compteurs, graphiques | Data visualization |
| `Ex6-2-ArticleToVideo` | Article → Vidéo | Layout automatique |

---

## 🚀 Démarrage rapide

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

### 3. Rendre une vidéo

```bash
npx remotion render Ex1-1-HelloWorld output.mp4
```

### 4. (Optionnel) Ajouter les sons

Voir [SOUNDS-SETUP.md](SOUNDS-SETUP.md) pour télécharger les sons gratuits depuis Pixabay.

---

## 🔊 Sound Design

Ce projet inclut une bibliothèque de sons avec 6 presets prêts à l'emploi :

| Preset | Style | Usage |
|--------|-------|-------|
| `cinematic` | Bande-annonce | Contenu impactant |
| `corporate` | Institutionnel | Présentations |
| `social` | Dynamique | Réseaux sociaux |
| `minimal` | Subtil | Tutoriels |
| `sfxOnly` | SFX uniquement | Voix off externe |
| `silent` | Muet | Tests |

```tsx
import { SOUND_PRESETS } from "./shared/sounds";

// Dans votre composition
soundPreset: SOUND_PRESETS.cinematic
```

> ⚠️ Les fichiers audio ne sont pas inclus (licence). Voir [SOUNDS-SETUP.md](SOUNDS-SETUP.md).

---

## 📖 Ressources

- [Documentation Remotion](https://www.remotion.dev/docs)
- [Remotion Skill sur skills.sh](https://skills.sh/remotion-dev/skills/remotion-best-practices)
- [Claude Code](https://claude.ai/claude-code)
- [Pixabay - Sons gratuits](https://pixabay.com/sound-effects/)

---

## 🙏 Crédits

- **Remotion** - Framework vidéo React
- **Claude Code** - Assistant IA pour le développement
- **Pixabay** - Sons libres de droits
- **Unsplash** - Images libres de droits

---

## 📄 Licence

MIT - Libre d'utilisation, modification et distribution.

---

*Créé avec ❤️ et [Claude Code](https://claude.ai/claude-code)*
