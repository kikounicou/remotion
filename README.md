# Remotion Learning Project

Un parcours d'apprentissage progressif pour maîtriser **Remotion**, le framework React pour créer des vidéos programmatiques.

## Pourquoi ce repo ?

Ce projet est conçu pour apprendre Remotion **étape par étape**, du plus simple au plus avancé. Chaque exercice introduit de nouveaux concepts et s'appuie sur les précédents.

**Idéal pour :**
- Développeurs React voulant créer des vidéos
- Créateurs de contenu cherchant à automatiser
- Marketeurs voulant des vidéos personnalisées à grande échelle

## Qu'est-ce que Remotion ?

[Remotion](https://www.remotion.dev/) transforme du code React en vidéos. Chaque frame = un composant React.

```tsx
// Une vidéo, c'est juste du React !
const MyVideo = () => {
  const frame = useCurrentFrame(); // Frame actuelle (0, 1, 2...)
  const opacity = interpolate(frame, [0, 30], [0, 1]); // Fade in
  return <h1 style={{ opacity }}>Hello World</h1>;
};
```

**Avantages :**
- Code versionnable (Git)
- Animations précises au frame près
- Automatisation possible (API, CLI)
- Rendu cloud via AWS Lambda (vidéos à grande échelle)

---

## Démarrage rapide

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

Ouvrez **http://localhost:3000** (le port peut varier : 3001, 3002...).

### 3. Explorer les exercices

Dans le studio, vous verrez les compositions numérotées :

| ID | Description |
|----|-------------|
| `Ex1-1-HelloWorld` | Template avec badge animé et musique |
| `Ex1-2-CounterComparison` | 4 compteurs avec easings différents |
| `Ex2-1-Slideshow` | 3 slides avec transitions fade |
| `Ex2-2-VideoTemplate` | Template Intro/Contenu/Outro |
| `Ex3-1-ImageShowcase` | Ken Burns effect sur images |
| `Dev-Logo` | Logo seul pour tests |

### 4. Rendre une vidéo

```bash
npx remotion render Ex1-1-HelloWorld output.mp4
```

---

## Parcours d'apprentissage

### Niveau 1 - Les Bases
*Comprendre le moteur d'animation*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex1-1-HelloWorld` | Template modifié avec badge et musique | `useCurrentFrame()`, `interpolate()`, `spring()` |
| `Ex1-2-CounterComparison` | 4 compteurs avec easings différents | `Easing.in()`, `Easing.out()`, `Easing.inOut()` |

### Niveau 2 - Séquencement
*Enchaîner des scènes avec transitions*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex2-1-Slideshow` | 3 slides avec transitions fade | `<TransitionSeries>`, `fade()` |
| `Ex2-2-VideoTemplate` | Template Intro/Contenu/Outro | Composants réutilisables, schema Zod |

### Niveau 3 - Média
*Images, vidéos, audio*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex3-1-ImageShowcase` | Ken Burns effect sur images | `<Img>`, zoom/pan animé |
| `Ex3-2-VideoOverlay` | Vidéo de fond + texte *(à venir)* | `<Video>`, superposition |

### Niveau 4 - Texte *(à venir)*
*Animations de texte avancées*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex4-1-WordByWord` | Texte mot par mot (TikTok) | Animation séquentielle |
| `Ex4-2-AnimatedQuote` | Citation animée (LinkedIn) | Typography, timing |

### Niveau 5 - Branding *(à venir)*
*Identité visuelle cohérente*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex5-1-BrandKit` | Couleurs, fonts, logo | Config centralisée |
| `Ex5-2-LowerThirds` | Bandeaux animés | Composants pro |

### Niveau 6 - Infographies *(à venir)*
*Data visualization*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex6-1-AnimatedStats` | Graphiques animés | Compteurs, barres |
| `Ex6-2-ArticleToVideo` | Article vers Vidéo | Layout automatique |

### Niveau 7 - Text-to-Speech *(à venir)*
*Voix off automatique*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex7-1-TTSBasic` | Intégration ElevenLabs/OpenAI | API TTS |
| `Ex7-2-SyncedCaptions` | Sous-titres synchronisés | Timestamps |

### Niveau 8 - AWS Lambda *(à venir)*
*Rendu cloud à grande échelle*

| ID | Exercice | Concepts |
|----|----------|----------|
| `Ex8-1-LambdaSetup` | Configuration AWS | `@remotion/lambda` |
| `Ex8-2-CloudRender` | Rendu via Lambda | S3, serverless |
| `Ex8-3-VideoAPI` | API de génération | POST vers MP4 |

---

## Concepts clés

### `useCurrentFrame()` - Le coeur de Remotion

```tsx
const frame = useCurrentFrame(); // 0, 1, 2, 3... à chaque frame
```

### `interpolate()` - Mapper des valeurs

```tsx
// Frame 0 à 30 : opacity 0 à 1
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: "clamp", // Ne pas dépasser 1
});
```

### `spring()` - Animation naturelle

```tsx
const scale = spring({
  frame,
  fps,
  config: { damping: 15, stiffness: 150 },
});
```

### `<Sequence>` - Positionner dans le temps

```tsx
<Sequence from={30} durationInFrames={60}>
  <MyComponent /> {/* Apparaît à la frame 30 */}
</Sequence>
```

---

## Structure du projet

```
remotion/
├── remotion-app/
│   ├── src/
│   │   ├── Root.tsx              # Compositions
│   │   ├── exercises/
│   │   │   ├── ex1-basics/       # Niveau 1
│   │   │   ├── ex2-sequencing/   # Niveau 2
│   │   │   ├── ex3-media/        # Niveau 3
│   │   │   └── ...
│   │   └── HelloWorld/           # Composants réutilisables
│   └── public/                   # Assets (musique, images)
├── CLAUDE.md                     # Documentation technique
└── README.md                     # Ce fichier
```

---

## Ressources

- [Documentation Remotion](https://www.remotion.dev/docs)
- [GitHub Remotion](https://github.com/remotion-dev/remotion)
- [Exemples officiels](https://github.com/remotion-dev/remotion/tree/main/packages/example)

## Assets

- Musique : [Pixabay](https://pixabay.com/music/) (libre de droits)
- Images : [Unsplash](https://unsplash.com/) (libre de droits)

---

*Projet créé avec l'aide de [Claude Code](https://claude.ai/claude-code)*
