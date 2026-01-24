import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";

// Types d'easing disponibles
export type EasingType = "linear" | "easeIn" | "easeOut" | "easeInOut" | "bounce";

// Map des fonctions d'easing
const easingFunctions: Record<EasingType, (t: number) => number> = {
  linear: (t) => t,
  easeIn: Easing.in(Easing.cubic),
  easeOut: Easing.out(Easing.cubic),
  easeInOut: Easing.inOut(Easing.cubic),
  bounce: Easing.bounce,
};

// Couleurs pour chaque type
const easingColors: Record<EasingType, string> = {
  linear: "#6C63FF",
  easeIn: "#FF6B6B",
  easeOut: "#4ECDC4",
  easeInOut: "#FFE66D",
  bounce: "#95E1D3",
};

interface CounterProps {
  readonly from: number;
  readonly to: number;
  readonly easingType: EasingType;
  readonly label?: string;
  readonly fontSize?: number;
}

export const Counter: React.FC<CounterProps> = ({
  from,
  to,
  easingType,
  label,
  fontSize = 80,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Réserver 10% du début et 10% de la fin pour pause visuelle
  const animationStart = Math.floor(durationInFrames * 0.1);
  const animationEnd = Math.floor(durationInFrames * 0.9);

  // Interpolation avec l'easing choisi
  const value = interpolate(
    frame,
    [animationStart, animationEnd],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingFunctions[easingType],
    }
  );

  // Arrondir pour affichage
  const displayValue = Math.round(value);

  // Barre de progression pour visualiser
  const progressWidth = interpolate(value, [from, to], [0, 100]);

  const color = easingColors[easingType];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        gap: 20,
      }}
    >
      {/* Label */}
      {label && (
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: color,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {label}
        </div>
      )}

      {/* Valeur du compteur */}
      <div
        style={{
          fontSize,
          fontWeight: "bold",
          color: "#2D3436",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayValue}
      </div>

      {/* Barre de progression */}
      <div
        style={{
          width: 150,
          height: 8,
          backgroundColor: "#E0E0E0",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
};
