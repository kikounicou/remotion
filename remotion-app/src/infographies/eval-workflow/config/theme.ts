/**
 * Theme configuration for Eval Workflow Infographic
 */

export const COLORS = {
  // Background
  bgDark: "#0F172A",
  bgMedium: "#1E293B",
  bgLight: "#334155",

  // Cloud Services
  aws: {
    primary: "#FF9900",
    secondary: "#232F3E",
    lambda: "#FF9900",
    s3: "#569A31",
    textract: "#A166FF",
    eventbridge: "#E7157B",
  },
  azure: {
    primary: "#0078D4",
    secondary: "#005A9E",
  },
  n8n: {
    primary: "#FF4F81",
    secondary: "#990033",
  },

  // UVCW
  uvcw: {
    primary: "#8B1A1A",
    secondary: "#C54B2A",
    accent: "#FBBA00",
  },

  // Status
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",

  // Accents
  accent1: "#6366F1", // Indigo
  accent2: "#8B5CF6", // Purple
  accent3: "#EC4899", // Pink
  accent4: "#14B8A6", // Teal
} as const;

export const FONTS = {
  heading: "Inter, system-ui, sans-serif",
  body: "Inter, system-ui, sans-serif",
  mono: "JetBrains Mono, Consolas, monospace",
} as const;

export const SPACING = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
} as const;

export const TIMING = {
  // Durées en frames (30fps)
  fps: 30,

  // Section durations
  intro: 5 * 30, // 5s = 150 frames
  generation: 6 * 30, // 6s = 180 frames
  scan: 7 * 30, // 7s = 210 frames
  n8n: 6 * 30, // 6s = 180 frames
  awsOverview: 4 * 30, // 4s
  lambda1: 5 * 30, // 5s
  lambda2: 4 * 30, // 4s
  lambda3: 5 * 30, // 5s
  lambda4: 4 * 30, // 4s
  import: 6 * 30, // 6s
  dashboard: 6 * 30, // 6s
  outro: 6 * 30, // 6s

  // Animation speeds
  fast: 8, // frames
  normal: 15, // frames
  slow: 25, // frames
  verySlow: 40, // frames

  // Transition overlaps
  transitionDuration: 20, // frames
} as const;

// Calculate total duration
export const TOTAL_DURATION =
  TIMING.intro +
  TIMING.generation +
  TIMING.scan +
  TIMING.n8n +
  TIMING.awsOverview +
  TIMING.lambda1 +
  TIMING.lambda2 +
  TIMING.lambda3 +
  TIMING.lambda4 +
  TIMING.import +
  TIMING.dashboard +
  TIMING.outro -
  11 * TIMING.transitionDuration; // 11 transitions

export const SPRING_CONFIGS = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 12 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
} as const;
