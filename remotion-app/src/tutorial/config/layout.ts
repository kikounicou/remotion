/**
 * Layout du module Tutorial
 * Dimensions et proportions pour le split screen
 */

// Dimensions video
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const FPS = 30;

// Proportions du split screen
export const LAYOUT = {
  // Zone Avatar (gauche)
  avatar: {
    widthPercent: 0.4, // 40%
    width: Math.round(VIDEO_WIDTH * 0.4), // 768px
    height: VIDEO_HEIGHT,
    x: 0,
    y: 0,
  },

  // Zone Infographies (droite)
  info: {
    widthPercent: 0.6, // 60%
    width: Math.round(VIDEO_WIDTH * 0.6), // 1152px
    height: VIDEO_HEIGHT,
    x: Math.round(VIDEO_WIDTH * 0.4), // Commence apres l'avatar
    y: 0,
  },

  // Padding interne des zones
  padding: {
    outer: 40, // Padding externe
    inner: 24, // Padding entre elements
  },

  // Zone de texte dans le panel info
  textArea: {
    maxWidth: 1000,
    marginTop: 100,
  },
};

// Durees par defaut (en secondes)
export const DEFAULT_DURATIONS = {
  intro: 5, // Introduction
  scene: 10, // Scene standard
  transition: 0.5, // Transition entre scenes
  outro: 5, // Conclusion
};

// Calculer les frames
export const framesToSeconds = (frames: number) => frames / FPS;
export const secondsToFrames = (seconds: number) => Math.round(seconds * FPS);
