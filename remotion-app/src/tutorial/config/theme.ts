/**
 * Theme du module Tutorial
 * Couleurs, fonts, styles pour les videos tutoriels
 */

export const TUTORIAL_THEME = {
  // Couleurs principales
  colors: {
    // Background
    background: "#0F172A", // Bleu tres fonce
    backgroundLight: "#1E293B", // Bleu fonce
    backgroundGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",

    // Texte
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",

    // Accents
    accent: "#3B82F6", // Bleu
    accentLight: "#60A5FA",
    success: "#10B981", // Vert
    warning: "#F59E0B", // Orange
    error: "#EF4444", // Rouge

    // Panneaux
    panelBg: "rgba(30, 41, 59, 0.9)",
    panelBorder: "rgba(148, 163, 184, 0.2)",
  },

  // Typographie
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, monospace",
  },

  // Tailles de texte
  fontSizes: {
    title: 48,
    subtitle: 32,
    body: 24,
    caption: 18,
    small: 14,
  },

  // Espacements
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Animations
  spring: {
    default: { damping: 15, stiffness: 100 },
    bouncy: { damping: 10, stiffness: 150 },
    smooth: { damping: 20, stiffness: 80 },
  },
};

export type TutorialTheme = typeof TUTORIAL_THEME;
