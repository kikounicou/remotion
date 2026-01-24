import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { BRAND } from "./brandConfig";

/**
 * Exercice 5.2 - Lower Thirds
 *
 * Bandeaux animés pour afficher nom + titre.
 * Utilisés dans les interviews, présentations, tutoriels.
 *
 * Concepts :
 * - Animation d'entrée/sortie
 * - Composant réutilisable avec props
 * - Timing précis avec Sequence
 */

interface LowerThirdProps {
  name: string;
  title: string;
  variant?: "default" | "minimal" | "bold";
}

const LowerThird: React.FC<LowerThirdProps> = ({
  name,
  title,
  variant = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation d'entrée
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // Animation de la barre décorative
  const barWidth = interpolate(frame, [5, 25], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animation du texte
  const textOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animation de sortie (à partir de 60 frames avant la fin locale)
  const exitProgress = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideOut = interpolate(exitProgress, [0, 1], [0, 150]);
  const fadeOut = interpolate(exitProgress, [0, 1], [1, 0]);

  // Styles selon la variante
  const styles = {
    default: {
      bg: BRAND.colors.primary,
      barColor: BRAND.colors.secondary,
      nameColor: "white",
      titleColor: "rgba(255,255,255,0.8)",
    },
    minimal: {
      bg: "rgba(0,0,0,0.7)",
      barColor: BRAND.colors.accent,
      nameColor: "white",
      titleColor: "rgba(255,255,255,0.7)",
    },
    bold: {
      bg: BRAND.colors.dark,
      barColor: BRAND.colors.primary,
      nameColor: BRAND.colors.secondary,
      titleColor: "white",
    },
  };

  const s = styles[variant];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 80,
        display: "flex",
        alignItems: "stretch",
        transform: `translateX(${-100 + slideIn * 100 - slideOut}px)`,
        opacity: fadeOut,
      }}
    >
      {/* Barre décorative */}
      <div
        style={{
          width: 8,
          backgroundColor: s.barColor,
          marginRight: 20,
          transform: `scaleY(${barWidth / 100})`,
          transformOrigin: "bottom",
        }}
      />

      {/* Contenu */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: textOpacity,
        }}
      >
        {/* Fond */}
        <div
          style={{
            position: "absolute",
            top: -16,
            left: 20,
            right: -40,
            bottom: -16,
            backgroundColor: s.bg,
            borderRadius: 4,
            zIndex: -1,
          }}
        />

        {/* Nom */}
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.lg,
            fontWeight: "bold",
            color: s.nameColor,
          }}
        >
          {name}
        </div>

        {/* Titre */}
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.md,
            color: s.titleColor,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export const LowerThirds: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out global
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: BRAND.gradients.dark,
        opacity: fadeOut,
      }}
    >
      {/* Titre de la démo */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.md,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Lower Thirds - 3 Variantes
      </div>

      {/* Variante Default */}
      <Sequence from={0} durationInFrames={100}>
        <LowerThird
          name="Marie Dupont"
          title="Directrice Marketing"
          variant="default"
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 80,
            fontFamily: BRAND.fonts.mono,
            fontSize: BRAND.fontSize.sm,
            color: BRAND.colors.primary,
            opacity: interpolate(frame, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          variant="default"
        </div>
      </Sequence>

      {/* Variante Minimal */}
      <Sequence from={100} durationInFrames={100}>
        <LowerThird
          name="Jean Martin"
          title="Lead Developer"
          variant="minimal"
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 80,
            fontFamily: BRAND.fonts.mono,
            fontSize: BRAND.fontSize.sm,
            color: BRAND.colors.accent,
            opacity: interpolate(frame - 100, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          variant="minimal"
        </div>
      </Sequence>

      {/* Variante Bold */}
      <Sequence from={200} durationInFrames={100}>
        <LowerThird
          name="Sophie Bernard"
          title="CEO & Fondatrice"
          variant="bold"
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 80,
            fontFamily: BRAND.fonts.mono,
            fontSize: BRAND.fontSize.sm,
            color: BRAND.colors.secondary,
            opacity: interpolate(frame - 200, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          variant="bold"
        </div>
      </Sequence>

      {/* Indicateur de temps */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          fontFamily: BRAND.fonts.mono,
          fontSize: BRAND.fontSize.xs,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Frame {frame} / {durationInFrames}
      </div>
    </AbsoluteFill>
  );
};
