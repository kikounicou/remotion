/**
 * Shared Sound Library
 *
 * Bibliothèque de sons réutilisables pour tous les projets Remotion.
 *
 * ⚠️ Les fichiers audio ne sont PAS inclus dans le repo.
 * Voir SOUNDS-SETUP.md pour télécharger les sons gratuits depuis Pixabay.
 *
 * Structure attendue dans public/sounds/ :
 * ├── music/
 * │   ├── epic/cinematic_trailer.mp3
 * │   ├── corporate/professional.mp3
 * │   └── upbeat/energetic.mp3
 * └── sfx/
 *     ├── impacts/impact_cinematic.mp3, impact_deep.mp3, impact_hit.mp3
 *     ├── whooshes/whoosh_fast.mp3, whoosh_soft.mp3
 *     ├── ui/pop_soft.mp3, tick.mp3
 *     └── success/success_chord.mp3, chime_positive.mp3
 */

// ============================================
// TYPES
// ============================================

export type SoundCategory = "impacts" | "whooshes" | "ui" | "success";
export type MusicStyle = "epic" | "corporate" | "upbeat";

export interface SoundPreset {
  name: string;
  description: string;
  music?: string;
  musicVolume?: number;
  hook?: string;
  hookVolume?: number;
  transition?: string;
  transitionVolume?: number;
  bulletPop?: string;
  bulletPopVolume?: number;
  outro?: string;
  outroVolume?: number;
}

// ============================================
// CHEMINS DES SONS
// ============================================

const SOUND_BASE = "sounds";

/**
 * Catalogue des SFX disponibles
 *
 * Téléchargez ces sons depuis Pixabay (voir SOUNDS-SETUP.md)
 */
export const SFX = {
  impacts: {
    cinematic: `${SOUND_BASE}/sfx/impacts/impact_cinematic.mp3`,
    deep: `${SOUND_BASE}/sfx/impacts/impact_deep.mp3`,
    hit: `${SOUND_BASE}/sfx/impacts/impact_hit.mp3`,
  },
  whooshes: {
    fast: `${SOUND_BASE}/sfx/whooshes/whoosh_fast.mp3`,
    soft: `${SOUND_BASE}/sfx/whooshes/whoosh_soft.mp3`,
  },
  ui: {
    pop: `${SOUND_BASE}/sfx/ui/pop_soft.mp3`,
    tick: `${SOUND_BASE}/sfx/ui/tick.mp3`,
  },
  success: {
    chord: `${SOUND_BASE}/sfx/success/success_chord.mp3`,
    chime: `${SOUND_BASE}/sfx/success/chime_positive.mp3`,
  },
} as const;

/**
 * Catalogue des musiques de fond
 */
export const MUSIC = {
  epic: {
    trailer: `${SOUND_BASE}/music/epic/cinematic_trailer.mp3`,
  },
  corporate: {
    professional: `${SOUND_BASE}/music/corporate/professional.mp3`,
  },
  upbeat: {
    energetic: `${SOUND_BASE}/music/upbeat/energetic.mp3`,
  },
} as const;

// ============================================
// PRESETS - Combinaisons prédéfinies
// ============================================

/**
 * Presets de sound design prêts à l'emploi
 *
 * Note: Si les fichiers n'existent pas, Remotion affichera un warning
 * mais la vidéo se générera quand même (sans son).
 */
export const SOUND_PRESETS: Record<string, SoundPreset> = {
  // Style bande-annonce cinéma
  cinematic: {
    name: "Cinematic",
    description: "Style bande-annonce - Impact fort, musique épique",
    music: MUSIC.epic.trailer,
    musicVolume: 0.25,
    hook: SFX.impacts.cinematic,
    hookVolume: 0.8,
    transition: SFX.whooshes.fast,
    transitionVolume: 0.5,
    bulletPop: SFX.ui.pop,
    bulletPopVolume: 0.4,
    outro: SFX.success.chord,
    outroVolume: 0.7,
  },

  // Style corporate/institutionnel
  corporate: {
    name: "Corporate",
    description: "Style institutionnel - Plus subtil et professionnel",
    music: MUSIC.corporate.professional,
    musicVolume: 0.2,
    hook: SFX.impacts.deep,
    hookVolume: 0.6,
    transition: SFX.whooshes.soft,
    transitionVolume: 0.4,
    bulletPop: SFX.ui.tick,
    bulletPopVolume: 0.3,
    outro: SFX.success.chime,
    outroVolume: 0.5,
  },

  // Style dynamique/réseaux sociaux
  social: {
    name: "Social",
    description: "Style réseaux sociaux - Dynamique et accrocheur",
    music: MUSIC.upbeat.energetic,
    musicVolume: 0.3,
    hook: SFX.impacts.hit,
    hookVolume: 0.7,
    transition: SFX.whooshes.fast,
    transitionVolume: 0.5,
    bulletPop: SFX.ui.pop,
    bulletPopVolume: 0.4,
    outro: SFX.success.chord,
    outroVolume: 0.6,
  },

  // Minimaliste - sons subtils uniquement
  minimal: {
    name: "Minimal",
    description: "Style minimaliste - Quelques sons discrets",
    music: MUSIC.corporate.professional,
    musicVolume: 0.15,
    transition: SFX.whooshes.soft,
    transitionVolume: 0.3,
    bulletPop: SFX.ui.tick,
    bulletPopVolume: 0.2,
  },

  // Sans musique - SFX uniquement
  sfxOnly: {
    name: "SFX Only",
    description: "Effets sonores uniquement, pas de musique de fond",
    hook: SFX.impacts.cinematic,
    hookVolume: 0.8,
    transition: SFX.whooshes.fast,
    transitionVolume: 0.5,
    bulletPop: SFX.ui.pop,
    bulletPopVolume: 0.4,
    outro: SFX.success.chord,
    outroVolume: 0.7,
  },

  // Silencieux - Aucun son
  silent: {
    name: "Silent",
    description: "Pas de son du tout",
  },
};

// ============================================
// HELPERS
// ============================================

/**
 * Récupère un preset par son nom
 */
export const getSoundPreset = (presetName: string): SoundPreset => {
  return SOUND_PRESETS[presetName] || SOUND_PRESETS.silent;
};

/**
 * Liste tous les presets disponibles
 */
export const listSoundPresets = (): string[] => {
  return Object.keys(SOUND_PRESETS);
};

/**
 * Volumes recommandés par type de son
 */
export const RECOMMENDED_VOLUMES = {
  music: 0.2,      // Musique de fond - discret
  hook: 0.8,       // Impact hook - fort
  transition: 0.5, // Whoosh - moyen
  bulletPop: 0.4,  // Pop texte - subtil
  outro: 0.7,      // Sting final - notable
} as const;

/**
 * Durées typiques des SFX (en frames à 30fps)
 */
export const SFX_DURATIONS = {
  impact: 30,  // ~1s
  whoosh: 15,  // ~0.5s
  pop: 10,     // ~0.33s
  sting: 45,   // ~1.5s
} as const;
