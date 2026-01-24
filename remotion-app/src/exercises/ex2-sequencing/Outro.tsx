import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";

interface OutroProps {
  readonly callToAction: string;
  readonly subText?: string;
  readonly logoText?: string;
  readonly backgroundColor?: string;
  readonly accentColor?: string;
}

export const Outro: React.FC<OutroProps> = ({
  callToAction,
  subText,
  logoText = "R",
  backgroundColor = "#1a1a2e",
  accentColor = "#6C63FF",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation d'entrée du CTA
  const ctaScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Animation du bouton/badge
  const badgeY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const badgeOffset = interpolate(badgeY, [0, 1], [30, 0]);

  // Sous-texte
  const subTextOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo qui pulse légèrement
  const pulse = Math.sin(frame * 0.15) * 0.05 + 1;

  // Fade out à la fin
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        opacity: fadeOut,
      }}
    >
      {/* Call to Action principal */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: "bold",
          color: "white",
          margin: 0,
          textAlign: "center",
          transform: `scale(${ctaScale})`,
        }}
      >
        {callToAction}
      </h1>

      {/* Badge/Bouton */}
      <div
        style={{
          marginTop: 40,
          padding: "16px 40px",
          backgroundColor: accentColor,
          borderRadius: 50,
          transform: `translateY(${badgeOffset}px)`,
          opacity: badgeY,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {subText || "En savoir plus"}
        </span>
      </div>

      {/* Logo en bas */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: subTextOpacity,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulse})`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {logoText}
          </span>
        </div>
        <span
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Powered by Remotion
        </span>
      </div>
    </AbsoluteFill>
  );
};
