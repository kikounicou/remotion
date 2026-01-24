import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";

interface IntroProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly logoText?: string;
  readonly backgroundColor?: string;
  readonly accentColor?: string;
}

export const Intro: React.FC<IntroProps> = ({
  title,
  subtitle,
  logoText = "R",
  backgroundColor = "#1a1a2e",
  accentColor = "#6C63FF",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation du logo (cercle + lettre)
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoRotate = interpolate(frame, [0, 30], [-180, 0], {
    extrapolateRight: "clamp",
  });

  // Animation du titre (apparaît après le logo)
  const titleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Animation du sous-titre
  const subtitleOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ligne décorative
  const lineWidth = interpolate(frame, [25, 45], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Logo animé */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          marginBottom: 30,
        }}
      >
        <span
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {logoText}
        </span>
      </div>

      {/* Ligne décorative */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: accentColor,
          marginBottom: 30,
          borderRadius: 2,
        }}
      />

      {/* Titre */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: "white",
          margin: 0,
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        {title}
      </h1>

      {/* Sous-titre */}
      {subtitle && (
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            marginTop: 15,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      )}
    </AbsoluteFill>
  );
};
