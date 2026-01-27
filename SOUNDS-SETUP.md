# Sound Setup Guide

> ✅ **Les fichiers audio sont maintenant inclus dans le repo !**
> Licence Pixabay : libre de droits, redistribuable.
>
> Ce guide reste utile si vous voulez ajouter ou remplacer des sons.

---

## Licence Pixabay

Tous les sons sur [Pixabay](https://pixabay.com/sound-effects/) sont :
- ✅ **Gratuits** pour usage personnel et commercial
- ✅ **Sans attribution requise** (mais appréciée)
- ✅ **Redistribuables** dans vos projets
- ❌ **Non revendables** en tant que fichiers audio seuls

---

## Structure requise

Créez cette structure dans `remotion-app/public/sounds/` :

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
    │   ├── impact_deep.mp3
    │   ├── impact_hit.mp3
    │   └── impact_cinematic.mp3
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

---

## Sons recommandés sur Pixabay

### 🎵 Musiques de fond

| Fichier | Recherche Pixabay | Durée recommandée |
|---------|-------------------|-------------------|
| `music/epic/cinematic_trailer.mp3` | [epic cinematic trailer](https://pixabay.com/music/search/epic%20cinematic%20trailer/) | 30s - 2min |
| `music/corporate/professional.mp3` | [corporate background](https://pixabay.com/music/search/corporate%20background/) | 30s - 2min |
| `music/upbeat/energetic.mp3` | [upbeat energetic](https://pixabay.com/music/search/upbeat%20energetic/) | 30s - 2min |

**Suggestions spécifiques :**
- [Epic Cinematic Trailer Music](https://pixabay.com/music/adventure-epic-cinematic-trailer-music-231087/) - 1:58
- [Corporate Background Music](https://pixabay.com/music/corporate-corporate-background-116693/) - 2:29
- [Upbeat Energetic Motivational](https://pixabay.com/music/upbeat-upbeat-energetic-motivational-289577/) - 2:14

---

### 💥 Impacts (pour Hook)

| Fichier | Recherche Pixabay |
|---------|-------------------|
| `sfx/impacts/impact_cinematic.mp3` | [cinematic impact](https://pixabay.com/sound-effects/search/cinematic%20impact/) |
| `sfx/impacts/impact_deep.mp3` | [impact deep](https://pixabay.com/sound-effects/search/impact%20deep/) |
| `sfx/impacts/impact_hit.mp3` | [cinematic hit](https://pixabay.com/sound-effects/search/cinematic%20hit/) |

**Suggestions spécifiques :**
- [Cinematic Massive Impact Hit Transition](https://pixabay.com/sound-effects/cinematic-massive-impact-hit-transition-241039/)
- [Cinematic Impact](https://pixabay.com/sound-effects/search/cinematic%20impact/) - Choisir un son court (~1s)

---

### 🌊 Whooshes (transitions)

| Fichier | Recherche Pixabay |
|---------|-------------------|
| `sfx/whooshes/whoosh_fast.mp3` | [whoosh fast](https://pixabay.com/sound-effects/search/whoosh%20fast/) |
| `sfx/whooshes/whoosh_soft.mp3` | [whoosh soft](https://pixabay.com/sound-effects/search/swoosh%20soft/) |

**Suggestions spécifiques :**
- [Whoosh](https://pixabay.com/sound-effects/search/whoosh/) - Choisir des sons de ~0.5s

---

### 🔔 UI (apparition texte)

| Fichier | Recherche Pixabay |
|---------|-------------------|
| `sfx/ui/pop_soft.mp3` | [pop ui](https://pixabay.com/sound-effects/search/pop%20ui/) |
| `sfx/ui/tick.mp3` | [tick](https://pixabay.com/sound-effects/search/tick%20click/) |

**Suggestions spécifiques :**
- [Minimal Pop Click UI](https://pixabay.com/sound-effects/minimal-pop-click-ui-1-198301/)
- [UI Pop](https://pixabay.com/sound-effects/search/ui%20pop/)

---

### ✅ Success (outro)

| Fichier | Recherche Pixabay |
|---------|-------------------|
| `sfx/success/success_chord.mp3` | [success](https://pixabay.com/sound-effects/search/success/) |
| `sfx/success/chime_positive.mp3` | [chime positive](https://pixabay.com/sound-effects/search/chime%20positive/) |

**Suggestions spécifiques :**
- [Success Fanfare Trumpets](https://pixabay.com/sound-effects/search/success%20fanfare/)
- [Notification Interface Success](https://pixabay.com/sound-effects/notification-interface-success-positive-corrects-132471/)

---

## Comment télécharger

1. Cliquez sur un lien ci-dessus
2. Sur Pixabay, cliquez sur **"Download"** (bouton vert)
3. Choisissez le format MP3
4. Renommez le fichier selon la structure ci-dessus
5. Placez-le dans le bon dossier

---

## Vérification

Une fois les sons téléchargés, lancez Remotion :

```bash
cd remotion-app
npm run dev
```

Ouvrez une composition avec son (ex: `UVCW-ArticleVideo-Ultimate-Sound`) et vérifiez que l'audio fonctionne.

---

## Alternative : Mode silencieux

Si vous ne voulez pas télécharger les sons, utilisez le preset `silent` :

```typescript
import { SOUND_PRESETS } from "./shared/sounds";

// Dans vos compositions
soundPreset: SOUND_PRESETS.silent
```

Ou simplement ne passez pas de `soundPreset` - les vidéos fonctionneront sans son.

---

## Crédits

Tous les sons proviennent de [Pixabay](https://pixabay.com/) sous la [Licence Pixabay](https://pixabay.com/service/license-summary/).
