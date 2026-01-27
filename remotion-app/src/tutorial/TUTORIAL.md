# Module Tutorial

Generateur de videos tutoriels avec avatar IA et infographies animees.

## Concept

```
┌─────────────────────────────────────────────────────────┐
│                    VIDEO 1920x1080                       │
│                                                          │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │                 │    │                             │ │
│  │     AVATAR      │    │       INFOGRAPHIES          │ │
│  │    (HeyGen)     │    │        (Remotion)           │ │
│  │                 │    │                             │ │
│  │   Personne qui  │    │   - Texte anime             │ │
│  │   parle face    │    │   - Graphiques              │ │
│  │   camera        │    │   - Points cles             │ │
│  │                 │    │   - Illustrations           │ │
│  │                 │    │                             │ │
│  └─────────────────┘    └─────────────────────────────┘ │
│        ~40%                       ~60%                   │
│                                                          │
│  ───────────────────────────────────────────────────── │
│                    MUSIQUE DE FOND                      │
└─────────────────────────────────────────────────────────┘
```

## Workflow de production

### 1. Preparation du contenu
```
Article/Texte source
       ↓
Decoupage en scenes (intro, points cles, conclusion)
       ↓
Script pour chaque scene
```

### 2. Generation audio (ElevenLabs)
```
Script texte → ElevenLabs API → Fichiers MP3
                                 ↓
                    public/tutorial/voiceovers/
```

### 3. Generation avatar (HeyGen)
```
Audio MP3 → HeyGen API → Videos avatar MP4
                          ↓
             public/tutorial/avatars/
```

### 4. Composition finale (Remotion)
```
Avatar MP4 + Infographies + Musique
                 ↓
         Video tutoriel finale
```

## Structure des fichiers

```
tutorial/
├── components/
│   ├── AvatarPanel.tsx      # Zone avatar (gauche)
│   ├── InfoPanel.tsx        # Zone infographies (droite)
│   ├── TextOverlay.tsx      # Texte anime
│   ├── BulletPoints.tsx     # Liste de points
│   └── ProgressBar.tsx      # Barre de progression
│
├── config/
│   ├── theme.ts             # Couleurs, fonts
│   └── layout.ts            # Dimensions, proportions
│
├── templates/
│   └── TutorialVideo.tsx    # Template principal
│
├── index.ts                 # Exports
└── TUTORIAL.md              # Cette doc
```

## APIs requises

### ElevenLabs (Text-to-Speech)
- **Site** : https://elevenlabs.io/
- **Free tier** : 10,000 caracteres/mois
- **Variable** : `ELEVENLABS_API_KEY`

### HeyGen (Avatar Video)
- **Site** : https://www.heygen.com/
- **Free tier** : 1 credit (1 video ~1 min)
- **Variable** : `HEYGEN_API_KEY`

## Configuration

1. Copier le fichier d'exemple :
   ```bash
   cp .env.example .env.local
   ```

2. Remplir les cles API dans `.env.local`

3. Verifier que ca fonctionne :
   ```bash
   node .claude/skills/elevenlabs/generate.js --list-voices
   ```

## Layout

| Zone | Largeur | Contenu |
|------|---------|---------|
| Avatar (gauche) | 40% (768px) | Video HeyGen |
| Infographies (droite) | 60% (1152px) | Animations Remotion |

## Prochaines etapes

- [ ] Configurer les cles API
- [ ] Tester ElevenLabs (generation voix)
- [ ] Tester HeyGen (generation avatar)
- [ ] Creer le template TutorialVideo
- [ ] Premiere video de test
