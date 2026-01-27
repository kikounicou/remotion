/**
 * UVCW Brand Configuration
 *
 * Couleurs, typographies et constantes de marque
 * pour l'Union des Villes et Communes de Wallonie
 */

export const UVCW_BRAND = {
  // Couleurs principales (extraites du logo)
  colors: {
    primary: {
      red: "#8B1A1A", // Rouge bordeaux - bâtiments logo
      orange: "#C54B2A", // Rouge orangé - socle logo
      yellow: "#E8C431", // Jaune/Or - accents logo
    },
    // Couleurs secondaires
    secondary: {
      dark: "#2D2D2D",
      light: "#FFFFFF",
      gray: "#6B7280",
      lightGray: "#F3F4F6",
    },
    // Couleur CTA (jaune vif du post LinkedIn)
    cta: "#FBBA00",
  },

  // Typographies
  fonts: {
    // Font principale pour les titres (serif comme le logo)
    heading: "Georgia, 'Times New Roman', serif",
    // Font pour le corps de texte
    body: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    // Font pour les tags/labels
    label: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Tailles de texte (en pixels, pour 1080x1080)
  fontSize: {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 80,
    hero: 96,
  },

  // Espacements
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 60,
    xxl: 80,
  },

  // Durées d'animation (en frames à 30fps)
  animation: {
    fast: 8, // 0.27s
    normal: 15, // 0.5s
    slow: 25, // 0.83s
    verySlow: 40, // 1.33s
  },

  // Formats vidéo
  formats: {
    square: { width: 1080, height: 1080 }, // LinkedIn, Instagram
    landscape: { width: 1920, height: 1080 }, // YouTube, présentation
    portrait: { width: 1080, height: 1920 }, // Stories, Reels
  },

  // URLs
  urls: {
    website: "www.uvcw.be",
    ctaText: "plus d'infos sur www.uvcw.be",
  },
} as const;

// Types pour l'autocomplétion
export type UvcwFormat = keyof typeof UVCW_BRAND.formats;
