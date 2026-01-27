/**
 * Configuration des sons UVCW
 *
 * Réexporte la bibliothèque de sons partagée avec des alias UVCW.
 * Permet d'utiliser les mêmes sons que les autres projets tout en
 * gardant une API cohérente avec le reste du module UVCW.
 */

// Import de la bibliothèque partagée
import {
  SFX,
  MUSIC,
  SOUND_PRESETS as SHARED_PRESETS,
  RECOMMENDED_VOLUMES,
  SFX_DURATIONS,
  getSoundPreset,
  listSoundPresets,
} from "../../shared/sounds";

// Réexporter les types
export type { SoundPreset, SoundCategory, MusicStyle } from "../../shared/sounds";

// ============================================
// ALIAS UVCW (pour rétrocompatibilité)
// ============================================

/**
 * SFX avec préfixe UVCW pour clarté dans le code UVCW
 */
export const UVCW_SFX = SFX;

/**
 * Musiques avec préfixe UVCW
 */
export const UVCW_MUSIC = MUSIC;

/**
 * Presets de sound design UVCW
 * Utilise les presets partagés
 */
export const SOUND_PRESETS = SHARED_PRESETS;

// Réexporter les helpers
export {
  getSoundPreset,
  listSoundPresets,
  RECOMMENDED_VOLUMES,
  SFX_DURATIONS,
};
