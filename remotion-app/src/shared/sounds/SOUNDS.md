# Shared Sound Library

> Bibliothèque de sons réutilisables pour tous les projets Remotion.

---

## ⚠️ Important

**Les fichiers audio ne sont PAS inclus dans ce repo.**

Voir **[SOUNDS-SETUP.md](../../../SOUNDS-SETUP.md)** pour télécharger les sons gratuits depuis Pixabay.

---

## Licence recommandée

Tous les sons recommandés proviennent de [Pixabay](https://pixabay.com/sound-effects/) :
- ✅ **Gratuits** pour usage personnel et commercial
- ✅ **Sans attribution requise**
- ✅ **Redistribuables** dans vos projets

---

## Structure attendue

```
public/sounds/
├── music/
│   ├── epic/
│   │   └── cinematic_trailer.mp3
│   ├── corporate/
│   │   └── professional.mp3
│   └── upbeat/
│       └── energetic.mp3
└── sfx/
    ├── impacts/
    │   ├── impact_cinematic.mp3
    │   ├── impact_deep.mp3
    │   └── impact_hit.mp3
    ├── whooshes/
    │   ├── whoosh_fast.mp3
    │   └── whoosh_soft.mp3
    ├── ui/
    │   ├── pop_soft.mp3
    │   └── tick.mp3
    └── success/
        ├── success_chord.mp3
        └── chime_positive.mp3
```

**Total : 11 fichiers audio recommandés**

---

## Utilisation

### Import

```typescript
import {
  SFX,
  MUSIC,
  SOUND_PRESETS,
  getSoundPreset
} from "../shared/sounds";
```

### Accès direct aux sons

```typescript
// SFX
const impactSound = SFX.impacts.cinematic;
const whooshSound = SFX.whooshes.fast;
const popSound = SFX.ui.pop;

// Musique
const backgroundMusic = MUSIC.epic.trailer;
```

### Utilisation des presets

```typescript
// Dans un composant Remotion
import { staticFile } from "remotion";

const preset = SOUND_PRESETS.cinematic;

// Musique de fond
{preset.music && (
  <Audio src={staticFile(preset.music)} volume={preset.musicVolume} />
)}

// Impact sur le hook
{preset.hook && (
  <Sequence from={5}>
    <Audio src={staticFile(preset.hook)} volume={preset.hookVolume} />
  </Sequence>
)}
```

---

## Presets disponibles

| Preset | Style | Sons inclus |
|--------|-------|-------------|
| `cinematic` | Bande-annonce | Musique épique + tous SFX |
| `corporate` | Institutionnel | Musique corporate + SFX subtils |
| `social` | Réseaux sociaux | Musique upbeat + SFX dynamiques |
| `minimal` | Minimaliste | Musique douce + quelques SFX |
| `sfxOnly` | SFX uniquement | Pas de musique, SFX seulement |
| `silent` | Silencieux | Aucun son |

---

## Volumes recommandés

```typescript
const RECOMMENDED_VOLUMES = {
  music: 0.2,      // Musique de fond - discret
  hook: 0.8,       // Impact hook - fort (attire l'attention)
  transition: 0.5, // Whoosh - moyen
  bulletPop: 0.4,  // Pop texte - subtil
  outro: 0.7,      // Sting final - notable
};
```

---

## Comportement sans fichiers audio

Si les fichiers audio n'existent pas :
- Remotion affiche un warning dans la console
- La vidéo se génère quand même (sans son)
- Utilisez le preset `silent` pour supprimer les warnings

---

## Projets utilisant cette bibliothèque

- **UVCW** : Vidéos Union des Villes et Communes de Wallonie
- **Infographics** : Explications de concepts (à venir)
