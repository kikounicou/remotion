# Remotion Learning Project

## IMPORTANT - Sécurité Repo Public

**Ce projet est sur un repo GitHub public : https://github.com/kikounicou/remotion**

### Règles de sécurité (OBLIGATOIRE)
- **JAMAIS** de secrets, API keys, tokens, mots de passe dans le code
- **JAMAIS** de fichiers .env committés (déjà dans .gitignore)
- **JAMAIS** de credentials ou fichiers sensibles
- Vérifier chaque commit avant push
- Les fichiers `.claude/settings.local.json` sont exclus (préférences locales)
- **Git push** : Uniquement quand l'utilisateur le demande explicitement

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
│   │   ├── Root.tsx                    # Compositions (liste plate)
│   │   ├── HelloWorld.tsx              # Ex1-1-HelloWorld
│   │   ├── HelloWorld/                 # Composants réutilisables
│   │   │   ├── Badge.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Title.tsx
│   │   │   ├── Subtitle.tsx
│   │   │   └── constants.ts            # Couleurs, fonts (branding)
│   │   └── exercises/
│   │       ├── ex1-basics/             # Niveau 1 - Bases
│   │       │   ├── Counter.tsx
│   │       │   └── CounterComparison.tsx
│   │       ├── ex2-sequencing/         # Niveau 2 - Séquencement
│   │       │   ├── Slide.tsx
│   │       │   ├── Slideshow.tsx
│   │       │   ├── Intro.tsx
│   │       │   ├── Outro.tsx
│   │       │   └── VideoTemplate.tsx
│   │       ├── ex3-media/              # Niveau 3 - Média
│   │       │   ├── KenBurnsImage.tsx
│   │       │   └── ImageShowcase.tsx
│   │       ├── ex4-text/               # Niveau 4 - Texte (à venir)
│   │       └── ...
│   ├── public/                         # Assets libres de droits
│   │   ├── music.mp3                   # Pixabay
│   │   ├── nature1.jpg                 # Unsplash
│   │   ├── nature2.jpg                 # Unsplash
│   │   └── nature3.jpg                 # Unsplash
│   └── package.json
├── CLAUDE.md                           # Documentation technique
├── README.md                           # Guide de démarrage
└── planning_apprentissage.md           # Plan des exercices
```

### Compositions disponibles

Les compositions utilisent des IDs simples sans points (évite les bugs) :

| ID | Description | Durée |
|----|-------------|-------|
| `Ex1-1-HelloWorld` | Template avec badge animé et musique | 5s |
| `Ex1-2-CounterComparison` | 4 compteurs avec easings différents | 4s |
| `Ex2-1-Slideshow` | 3 slides avec transitions fade | 5s |
| `Ex2-2-VideoTemplate` | Template Intro/Contenu/Outro | 7s |
| `Ex3-1-ImageShowcase` | Ken Burns effect sur 3 images | 7.6s |
| `Dev-Logo` | Logo seul pour tests | 5s |

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

### 4. Animation avec `spring()`

```tsx
const scale = spring({
  frame,
  fps: videoConfig.fps,
  config: {
    damping: 200,
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

---

## Séquencement

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
- IDs de composition avec des points (ex: `1.1-HelloWorld`) - utiliser des tirets

---

## Commandes CLI

```bash
# Développement (Studio)
cd remotion-app && npm run dev

# Prévisualiser dans le navigateur
# Note: le port peut varier (3000, 3001, 3002...)
http://localhost:3000

# Rendu vidéo
npx remotion render Ex1-1-HelloWorld output.mp4

# Rendu image fixe
npx remotion still Ex1-1-HelloWorld output.png --frame=0
```

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

### Niveau 4 - Texte & Captions (`ex4-text/`)
- [ ] **Ex4-1-WordByWord** : Texte mot par mot style TikTok
- [ ] **Ex4-2-AnimatedQuote** : Citation animée format LinkedIn

### Niveau 5 - Branding (`ex5-branding/`)
- [ ] **Ex5-1-BrandKit** : Logo, couleurs, fonts centralisés
- [ ] **Ex5-2-LowerThirds** : Bandeaux animés (nom, titre)

### Niveau 6 - Infographies (`ex6-infographics/`)
- [ ] **Ex6-1-AnimatedStats** : Graphiques qui se construisent
- [ ] **Ex6-2-ArticleToVideo** : Bullet points → infographie animée

### Niveau 7 - Text-to-Speech (`ex7-tts/`)
- [ ] **Ex7-1-TTSBasic** : Intégration ElevenLabs/OpenAI TTS
- [ ] **Ex7-2-SyncedCaptions** : Sous-titres synchronisés mot par mot

### Niveau 8 - AWS Lambda (`ex8-lambda/`)
- [ ] **Ex8-1-LambdaSetup** : Config AWS, déploiement
- [ ] **Ex8-2-CloudRender** : Rendu vidéo via Lambda + S3
- [ ] **Ex8-3-VideoAPI** : API POST → vidéo générée

### Niveau 9 - Projets Finaux
- [ ] **Projet A** : Résumé d'article avec infographie
- [ ] **Projet B** : Post LinkedIn/TikTok avec branding
- [ ] **Projet C** : Tutoriel automatisé avec TTS

---

## Ressources

- [Documentation officielle](https://www.remotion.dev/docs)
- [GitHub Remotion](https://github.com/remotion-dev/remotion)
- [Exemples officiels](https://github.com/remotion-dev/remotion/tree/main/packages/example)

---

## Notes de Session

### Session du 24/01/2026
- Exercices 1.1 à 3.1 complétés
- Ken Burns effect implémenté avec 6 directions (zoomIn, zoomOut, panLeft, panRight, panUp, panDown)
- Images Unsplash téléchargées (nature1.jpg, nature2.jpg, nature3.jpg)
- Note : Les `<Folder>` de Remotion causent des écrans noirs - utiliser une liste plate de compositions
- Note : Éviter les points dans les IDs (ex: `1.1-HelloWorld` → `Ex1-1-HelloWorld`)
