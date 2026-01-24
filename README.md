# Remotion Learning Project

Un projet d'apprentissage progressif pour maîtriser **Remotion**, le framework React pour créer des vidéos programmatiques.

## Qu'est-ce que Remotion ?

[Remotion](https://www.remotion.dev/) permet de créer des vidéos en utilisant du code React/TypeScript. Chaque frame est un composant React, ce qui permet :

- Des vidéos générées par code (reproductibles, versionnables)
- Des animations précises au frame près
- L'automatisation de la production vidéo
- Le rendu dans le cloud via **AWS Lambda** (génération de centaines de vidéos en parallèle, idéal pour les vidéos personnalisées type "Spotify Wrapped")

## Structure du projet

```
remotion/
├── remotion-app/                 # Application Remotion
│   ├── src/
│   │   ├── Root.tsx              # Définition des compositions
│   │   ├── HelloWorld/           # Template de base modifié
│   │   └── exercises/            # Exercices progressifs
│   │       ├── ex1-basics/       # Niveau 1 - Fondamentaux
│   │       └── ex2-sequencing/   # Niveau 2 - Séquencement
│   └── public/                   # Assets (musique, images)
├── .claude/skills/remotion/      # Règles de best practices
├── CLAUDE.md                     # Documentation technique détaillée
└── planning_apprentissage.md     # Plan de progression
```

## Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
git clone https://github.com/kikounicou/remotion.git
cd remotion/remotion-app
npm install
```

### Lancer le studio

```bash
npm run dev
```

Ouvrez http://localhost:3000 pour accéder au studio Remotion.

### Rendre une vidéo

```bash
npx remotion render <composition-id> output.mp4
```

## Exercices disponibles

### Niveau 1 - Bases (`ex1-basics/`)

| Composition | Description | Concepts |
|-------------|-------------|----------|
| `HelloWorld` | Template modifié avec badge et musique | `useCurrentFrame()`, `interpolate()`, `spring()`, `<Audio>` |
| `CounterComparison` | 4 compteurs avec easings différents | `Easing.in()`, `Easing.out()`, `Easing.inOut()` |

### Niveau 2 - Séquencement (`ex2-sequencing/`)

| Composition | Description | Concepts |
|-------------|-------------|----------|
| `Slideshow` | 3 slides avec transitions fade | `<TransitionSeries>`, `fade()`, `linearTiming()` |

### Prochains exercices (à venir)

- **2.2** - Intro/Outro template réutilisable
- **3.1** - Vidéo avec overlay texte
- **4.1** - Texte mot par mot (style TikTok)
- **5.1** - Stats animées avec données dynamiques
- **6.1-6.3** - Déploiement AWS Lambda (rendu cloud, API de génération)

## Concepts clés

### Animation avec `interpolate()`

```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: "clamp",
});
```

### Animation avec `spring()`

```tsx
const scale = spring({
  frame,
  fps,
  config: { damping: 15, stiffness: 150 },
});
```

### Séquencement

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <Slide1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <Slide2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

## Best Practices incluses

Le dossier `.claude/skills/remotion/` contient 28 règles de best practices couvrant :

- Animations et timing
- Gestion des médias (audio, vidéo, images, GIFs)
- Captions et sous-titres
- Intégration 3D, Lottie, TailwindCSS
- Et plus...

## Ressources

- [Documentation Remotion](https://www.remotion.dev/docs)
- [GitHub Remotion](https://github.com/remotion-dev/remotion)
- [Exemples officiels](https://github.com/remotion-dev/remotion/tree/main/packages/example)

## Licence

Ce projet est à but éducatif. La musique utilisée provient de [Pixabay](https://pixabay.com/music/) (libre de droits).

---

*Projet créé avec l'aide de Claude Code*
