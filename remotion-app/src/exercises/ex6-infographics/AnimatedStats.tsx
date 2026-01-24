import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { BRAND } from "../ex5-branding/brandConfig";

/**
 * Exercice 6.1 - Animated Stats
 *
 * Graphiques et statistiques animés :
 * - Compteurs qui s'incrémentent
 * - Barres de progression
 * - Graphique circulaire (donut)
 *
 * Idéal pour présenter des KPIs, résultats, performances.
 */

// Composant compteur animé
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  color?: string;
}> = ({ value, suffix = "", label, delay = 0, color = BRAND.colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation du nombre
  const progress = interpolate(frame - delay, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const displayValue = Math.floor(value * progress);

  // Animation d'entrée
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.hero,
          fontWeight: "bold",
          color,
        }}
      >
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.md,
          color: BRAND.colors.gray[500],
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Composant barre de progression
const ProgressBar: React.FC<{
  value: number;
  max: number;
  label: string;
  delay?: number;
  color?: string;
}> = ({ value, max, label, delay = 0, color = BRAND.colors.primary }) => {
  const frame = useCurrentFrame();

  const percentage = (value / max) * 100;

  // Animation de la barre
  const barProgress = interpolate(frame - delay, [0, 50], [0, percentage], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.md,
        }}
      >
        <span style={{ color: BRAND.colors.dark }}>{label}</span>
        <span style={{ color, fontWeight: "bold" }}>
          {Math.floor(barProgress)}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 20,
          backgroundColor: BRAND.colors.gray[200],
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barProgress}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
};

// Composant donut chart
const DonutChart: React.FC<{
  value: number;
  label: string;
  delay?: number;
  color?: string;
}> = ({ value, label, delay = 0, color = BRAND.colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animation du cercle
  const progress = interpolate(frame - delay, [0, 60], [0, value / 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const strokeDashoffset = circumference * (1 - progress);

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size}>
          {/* Cercle de fond */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={BRAND.colors.gray[200]}
            strokeWidth={strokeWidth}
          />
          {/* Cercle de progression */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        {/* Valeur au centre */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.xl,
            fontWeight: "bold",
            color: BRAND.colors.dark,
          }}
        >
          {Math.floor(progress * 100)}%
        </div>
      </div>
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.md,
          color: BRAND.colors.gray[500],
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const AnimatedStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.gray[100],
        padding: 80,
        opacity: fadeOut,
      }}
    >
      {/* Titre */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.xl,
            fontWeight: "bold",
            color: BRAND.colors.dark,
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Résultats Q4 2024
        </div>
      </div>

      {/* Compteurs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 80,
        }}
      >
        <AnimatedCounter
          value={12500}
          label="Utilisateurs actifs"
          delay={10}
          color={BRAND.colors.primary}
        />
        <AnimatedCounter
          value={847}
          suffix="K"
          label="Revenus (€)"
          delay={20}
          color={BRAND.colors.secondary}
        />
        <AnimatedCounter
          value={98}
          suffix="%"
          label="Satisfaction"
          delay={30}
          color={BRAND.colors.accent}
        />
      </div>

      {/* Barres de progression */}
      <div
        style={{
          display: "flex",
          gap: 60,
          marginBottom: 60,
        }}
      >
        <div style={{ flex: 1 }}>
          <ProgressBar
            value={85}
            max={100}
            label="Objectif ventes"
            delay={50}
            color={BRAND.colors.primary}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ProgressBar
            value={72}
            max={100}
            label="Croissance"
            delay={60}
            color={BRAND.colors.secondary}
          />
        </div>
      </div>

      {/* Donut charts */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 100,
        }}
      >
        <DonutChart
          value={78}
          label="Rétention"
          delay={80}
          color={BRAND.colors.primary}
        />
        <DonutChart
          value={92}
          label="NPS Score"
          delay={90}
          color={BRAND.colors.secondary}
        />
      </div>
    </AbsoluteFill>
  );
};
