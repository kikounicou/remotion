/**
 * Theme for Flow Animation - Light/White background
 */

export const COLORS = {
  // Background
  bg: "#FFFFFF",
  bgSubtle: "#F8FAFC",
  bgAccent: "#F1F5F9",

  // Primary colors
  primary: "#3B82F6", // Blue
  secondary: "#8B5CF6", // Purple
  accent: "#EC4899", // Pink

  // Service colors
  scanner: "#6366F1", // Indigo
  email: "#3B82F6", // Blue
  n8n: "#EC4899", // Pink
  aws: "#FF9900", // AWS Orange
  lambda: "#FF9900",
  s3: "#569A31", // Green
  textract: "#8B5CF6", // Purple
  azure: "#0078D4", // Azure Blue
  sql: "#0F172A", // Dark
  dashboard: "#10B981", // Green
  success: "#10B981",

  // Text
  textDark: "#0F172A",
  textMedium: "#475569",
  textLight: "#94A3B8",

  // Effects
  shadow: "rgba(0, 0, 0, 0.1)",
  glow: "rgba(59, 130, 246, 0.5)",
} as const;

export const TIMING = {
  fps: 30,

  // Scene timings (in frames)
  scanStart: 0,
  scanDuration: 45,

  emailStart: 35,
  emailDuration: 40,

  n8nStart: 65,
  n8nDuration: 35,

  s3Start: 90,
  s3Duration: 35,

  lambdaStart: 115,
  lambdaDuration: 50,

  analysisStart: 155,
  analysisDuration: 60,

  dataStart: 205,
  dataDuration: 45,

  dashboardStart: 240,
  dashboardDuration: 50,

  emailOutStart: 280,
  emailOutDuration: 40,

  // Total
  total: 330, // ~11 seconds - fast and punchy!
} as const;

export const SPRING_CONFIGS = {
  smooth: { damping: 200 },
  snappy: { damping: 15, stiffness: 200 },
  bouncy: { damping: 10, stiffness: 150 },
  wobbly: { damping: 8, stiffness: 180 },
} as const;
