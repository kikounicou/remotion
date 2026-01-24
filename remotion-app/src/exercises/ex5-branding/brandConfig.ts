/**
 * Configuration de marque centralisée
 *
 * Ce fichier contient toutes les constantes de branding :
 * - Couleurs primaires et secondaires
 * - Typographies
 * - Espacements
 * - Durées d'animation standards
 *
 * Utilisez ces constantes dans tous vos composants pour
 * maintenir une cohérence visuelle.
 */

export const BRAND = {
  // Couleurs principales
  colors: {
    primary: "#6C63FF", // Violet
    secondary: "#4ECDC4", // Turquoise
    accent: "#FF6B6B", // Corail
    dark: "#2D3436",
    light: "#FFFFFF",
    gray: {
      100: "#F5F5F5",
      200: "#E0E0E0",
      300: "#BDBDBD",
      500: "#757575",
      700: "#424242",
      900: "#212121",
    },
  },

  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)",
    sunset: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
    ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    dark: "linear-gradient(135deg, #2D3436 0%, #000000 100%)",
  },

  // Typographie
  fonts: {
    primary: "Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    secondary: "Georgia, serif",
    mono: "SF Mono, Consolas, monospace",
  },

  // Tailles de texte
  fontSize: {
    xs: 14,
    sm: 18,
    md: 24,
    lg: 36,
    xl: 48,
    xxl: 72,
    hero: 96,
  },

  // Espacements
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 60,
    xxl: 100,
  },

  // Durées d'animation (en frames à 30fps)
  animation: {
    fast: 10, // 0.33s
    normal: 20, // 0.66s
    slow: 30, // 1s
    verySlow: 45, // 1.5s
  },

  // Logo (placeholder - à remplacer par votre logo)
  logo: {
    width: 120,
    height: 40,
    text: "BRAND",
  },
} as const;

// Types pour l'autocomplétion
export type BrandColors = keyof typeof BRAND.colors;
export type BrandGradients = keyof typeof BRAND.gradients;
