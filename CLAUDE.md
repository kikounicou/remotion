# Remotion Learning Project

## IMPORTANT - Sécurité Repo Public

**Ce projet est sur un repo GitHub public : https://github.com/kikounicou/remotion**

### Règles de sécurité (OBLIGATOIRE)
- **JAMAIS** de secrets, API keys, tokens, mots de passe dans le code
- **JAMAIS** de fichiers .env committés (déjà dans .gitignore)
- **JAMAIS** de credentials ou fichiers sensibles
- Vérifier chaque commit avant push
- Les fichiers `.claude/settings.local.json` sont exclus (préférences locales)

### Assets autorisés
- Musique/images libres de droits uniquement (Pixabay, Unsplash, etc.)
- Toujours vérifier la licence avant d'ajouter un asset

---

## Vue d'ensemble

Ce projet est un espace d'apprentissage et d'expérimentation pour **Remotion**, un framework React pour créer des vidéos programmatiquement.

### Qu'est-ce que Remotion ?

Remotion permet de créer des vidéos en utilisant du code React/TypeScript au lieu d'outils d'édition traditionnels. Chaque frame de la vidéo est rendue comme un composant React.

**Avantages clés :**
- Vidéos générées par code (reproductibles, versionnable)
- Utilisation des compétences React existantes
- Animations précises au frame près
- Rendu côté serveur possible (AWS Lambda)

---

## Architecture du Projet

```
remotion/
├── remotion-app/
│   ├── src/
│   │   ├── index.ts              # Point d'entrée - registerRoot()
│   │   ├── Root.tsx              # Compositions définies ici
│   │   ├── HelloWorld.tsx        # Exercice 1.1 modifié
│   │   ├── HelloWorld/           # Composants du template
│   │   │   ├── Badge.tsx         # [NEW] Badge animé
│   │   │   ├── Logo.tsx
│   │   │   ├── Title.tsx
│   │   │   ├── Subtitle.tsx
│   │   │   └── constants.ts
│   │   └── exercises/            # Exercices organisés par niveau
│   │       ├── ex1-basics/       # Niveau 1 - Bases
│   │       │   ├── Counter.tsx
│   │       │   └── CounterComparison.tsx
│   │       └── ex2-sequencing/   # Niveau 2 - Séquencement
│   ├── public/                   # Assets statiques
│   │   └── music.mp3             # Musique libre de droits
│   └── package.json
└── CLAUDE.md
```

---

## Concepts Fondamentaux

### 1. Composition

Une composition est une "vidéo" avec ses propriétés :

```tsx
<Composition
  id="MonVideo"
  component={MonComposant}
  durationInFrames={150}  // 5 secondes à 30fps
  width={1920}
  height={1080}
  fps={30}
  defaultProps={{ titre: "Hello" }}
/>
```

### 2. Hooks Essentiels

| Hook | Description |
|------|-------------|
| `useCurrentFrame()` | Retourne le numéro de frame actuel (commence à 0) |
| `useVideoConfig()` | Retourne `{ fps, durationInFrames, width, height }` |

### 3. Animation avec `interpolate()`

```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateRight: 'clamp',
});
```

**Paramètres :**
- `frame` : valeur d'entrée (généralement le frame actuel)
- `[0, 30]` : plage d'entrée (frames)
- `[0, 1]` : plage de sortie (valeurs)
- Options : `extrapolateLeft`, `extrapolateRight` ('clamp', 'extend', 'identity')

### 4. Animation avec `spring()`

```tsx
const scale = spring({
  frame,
  fps: videoConfig.fps,
  config: {
    damping: 200,  // Défaut: 200
  },
});
```

---

## Composants Clés

### Mise en page

| Composant | Usage |
|-----------|-------|
| `<AbsoluteFill>` | Conteneur plein écran pour superposer des éléments |
| `<Sequence from={30}>` | Affiche le contenu à partir du frame 30 |
| `<Series>` | Enchaîne des séquences automatiquement |

### Média

| Composant | Package | Usage |
|-----------|---------|-------|
| `<Video>` | `remotion` | Lecture vidéo |
| `<Audio>` | `remotion` | Lecture audio |
| `<Img>` | `remotion` | Images statiques |
| `<Gif>` | `@remotion/gif` | GIFs animés synchronisés |

### Propriétés média

```tsx
<Video
  src={staticFile("video.mp4")}
  volume={0.5}           // 0 à 1
  playbackRate={1.5}     // Vitesse
/>

<Audio
  src={staticFile("audio.mp3")}
  startFrom={30}         // Début à 30 frames
  endAt={120}            // Fin à 120 frames
/>
```

---

## Séquencement

### Sequence

```tsx
<Sequence from={0} durationInFrames={60}>
  <Scene1 />  {/* Frame 0-59 */}
</Sequence>
<Sequence from={60} durationInFrames={60}>
  <Scene2 />  {/* Frame 60-119 */}
</Sequence>
```

### Series (plus simple pour l'enchaînement)

```tsx
<Series>
  <Series.Sequence durationInFrames={60}>
    <Scene1 />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <Scene2 />
  </Series.Sequence>
</Series>
```

### TransitionSeries (avec transitions)

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <Scene1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 30 })}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <Scene2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

---

## Règles Importantes

### À FAIRE
- Utiliser `staticFile()` pour les assets du dossier `public/`
- Utiliser `random(seed)` pour la randomisation (déterministe)
- Toujours spécifier les unités de temps en frames

### À NE PAS FAIRE
- `Math.random()` - interdit (non déterministe)
- Effets de bord non contrôlés dans les composants

---

## Packages Utiles

| Package | Description |
|---------|-------------|
| `@remotion/transitions` | Transitions entre séquences |
| `@remotion/gif` | Support GIF synchronisé |
| `@remotion/three` | Intégration Three.js pour la 3D |
| `@remotion/lottie` | Animations Lottie |
| `@remotion/media-utils` | Utilitaires pour métadonnées média |
| `@remotion/tailwind` | Intégration TailwindCSS |
| `remotion-animated` | Animations déclaratives simplifiées |

---

## remotion-animated

Bibliothèque tierce pour simplifier les animations déclaratives :

```tsx
import { Animated, Move, Fade } from "remotion-animated";

<Animated animations={[
  Move({ y: [100, 0] }),
  Fade({ to: 1 }),
]}>
  <h1>Titre animé</h1>
</Animated>
```

---

## Commandes CLI

```bash
# Développement (Studio)
npm run dev

# Rendu vidéo
npx remotion render <composition-id> out.mp4

# Rendu image fixe
npx remotion still <composition-id> out.png

# Rendu Lambda (AWS)
npx remotion lambda render <site-url> <composition-id>
```

---

## Exercices - Progression

### Niveau 1 - Bases (`ex1-basics/`)
- [x] **1.1 - Hello World modifié** : Badge animé, timing ajusté, musique de fond
- [x] **1.2 - Compteur animé** : Comparaison des easings (linear, easeIn, easeOut, easeInOut)

### Niveau 2 - Séquencement (`ex2-sequencing/`)
- [ ] **2.1 - Slideshow** : 3 slides avec transitions fade
- [ ] **2.2 - Intro/Outro** : Template réutilisable

### Niveau 3 - Média
- [x] **3.2 - Audio** : Intégré dans 1.1 (fade in/out)
- [ ] **3.1 - Vidéo overlay** : Texte animé sur vidéo

### Niveau 4 - Texte & Captions
- [ ] **4.1 - Texte mot par mot** : Style TikTok
- [ ] **4.2 - Citation animée** : Format LinkedIn

### Niveau 5 - Données dynamiques
- [ ] **5.1 - Stats animées** : Graphiques qui se construisent
- [ ] **5.2 - Template paramétrable** : Rendu CLI avec props

### Projets Finaux
- [ ] **Projet A** : Résumé d'article (30-60s)
- [ ] **Projet B** : Post LinkedIn (1080x1080)
- [ ] **Projet C** : Pipeline IA automatisé

---

## Skills Claude Code installés

Le skill **remotion-best-practices** est installé dans `.claude/skills/remotion/`.

### Règles disponibles (28 fichiers)

| Catégorie | Règles |
|-----------|--------|
| **Animation** | `animations.md`, `timing.md`, `text-animations.md`, `transitions.md`, `trimming.md` |
| **Média** | `videos.md`, `audio.md`, `images.md`, `gifs.md`, `fonts.md`, `assets.md` |
| **Structure** | `compositions.md`, `sequencing.md`, `calculate-metadata.md` |
| **Captions** | `display-captions.md`, `import-srt-captions.md`, `transcribe-captions.md` |
| **Avancé** | `3d.md`, `charts.md`, `lottie.md`, `tailwind.md` |
| **Utilitaires** | `measuring-text.md`, `measuring-dom-nodes.md`, `can-decode.md` |
| **Mediabunny** | `get-video-duration.md`, `get-audio-duration.md`, `get-video-dimensions.md`, `extract-frames.md` |

### Points clés des règles

**INTERDIT :**
- CSS transitions/animations
- Classes Tailwind pour animations
- `Math.random()` (non déterministe)

**OBLIGATOIRE :**
- Utiliser `useCurrentFrame()` pour toutes les animations
- Utiliser `random(seed)` pour la randomisation
- Multiplier par `fps` pour convertir secondes → frames

---

## Ressources

- [Documentation officielle](https://www.remotion.dev/docs)
- [GitHub Remotion](https://github.com/remotion-dev/remotion)
- [remotion-animated](https://github.com/stefanwittwer/remotion-animated)
- [Exemples officiels](https://github.com/remotion-dev/remotion/tree/main/packages/example)

---

## Structure du Projet Template

```
remotion-app/
├── src/
│   ├── index.ts              # registerRoot() - point d'entrée
│   ├── Root.tsx              # Définit les <Composition>
│   ├── HelloWorld.tsx        # Composition principale
│   └── HelloWorld/
│       ├── Logo.tsx          # Animation logo avec arcs
│       ├── Arc.tsx           # Composant arc SVG
│       ├── Atom.tsx          # Centre du logo
│       ├── Title.tsx         # Texte animé mot par mot
│       ├── Subtitle.tsx      # Sous-titre
│       └── constants.ts      # Constantes (fonts, etc.)
├── public/                   # Assets statiques
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## Analyse du Template HelloWorld

### Fichier Root.tsx - Définition des compositions
Deux compositions définies :
1. **HelloWorld** - Composition complète avec logo, titre, sous-titre
2. **OnlyLogo** - Logo seul pour développement isolé

### Fichier HelloWorld.tsx - Composition principale
**Techniques utilisées :**
- `useCurrentFrame()` pour obtenir le frame actuel
- `spring()` avec décalage temporel (`frame - 25`)
- `interpolate()` pour mapper les valeurs
- `<Sequence from={X}>` pour positionner dans le temps
- `<AbsoluteFill>` pour la superposition

### Fichier Title.tsx - Animation de texte
**Technique :** Animation mot par mot avec délai progressif
```tsx
const words = titleText.split(" ");
words.map((t, i) => {
  const delay = i * 5;  // 5 frames entre chaque mot
  const scale = spring({ frame: frame - delay, ... });
  return <span style={{ transform: `scale(${scale})` }}>{t}</span>
});
```

### Fichier Logo.tsx - Animation complexe
**Techniques :**
- Rotation continue sur toute la durée
- Plusieurs animations spring indépendantes
- Composition de transformations CSS

---

## Notes de Session

### Session 1 - Initialisation (24/01/2026)
- Projet créé avec template "hello-world"
- Documentation consolidée depuis 4 sources
- Packages installés : remotion, @remotion/transitions, remotion-animated
- Structure analysée et documentée

### Session 2 - Exercices 1.1 & 1.2 (24/01/2026)
**Exercice 1.1 - Hello World modifié :**
- Nouvelles couleurs (violet #6C63FF, corail #FF6B6B, turquoise #4ECDC4)
- Badge animé avec spring() + rotation
- Timing ajusté (animations plus rapides)
- Musique de fond avec fade in/out (Pixabay, libre de droits)
- Concepts : `useCurrentFrame()`, `interpolate()`, `spring()`, `<Sequence>`, `<Audio>`

**Exercice 1.2 - Compteur animé :**
- Comparaison visuelle de 4 easings côte à côte
- Composant Counter réutilisable avec props
- Concepts : `Easing.in()`, `Easing.out()`, `Easing.inOut()`, `Easing.bounce`

**Prochaine étape :** Exercice 2.1 - Slideshow avec transitions

### Compositions disponibles
| ID | Description | Durée |
|----|-------------|-------|
| `HelloWorld` | Template modifié avec musique | 5s (150 frames) |
| `CounterComparison` | 4 compteurs avec easings | 4s (120 frames) |
| `OnlyLogo` | Logo seul | 5s (150 frames) |

### Commandes utiles
```bash
# Lancer le studio de développement
cd remotion-app && npm run dev

# Prévisualiser dans le navigateur
http://localhost:3001

# Rendre une vidéo
npx remotion render <composition-id> output.mp4

# Rendre une image fixe (frame 0)
npx remotion still <composition-id> output.png --frame=0
```
