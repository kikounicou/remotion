import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";

interface SlideProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly backgroundColor: string;
  readonly textColor?: string;
  readonly image?: string;
}

export const Slide: React.FC<SlideProps> = ({
  title,
  subtitle,
  backgroundColor,
  textColor = "#FFFFFF",
  image,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation d'entrée du titre
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const titleY = interpolate(titleScale, [0, 1], [50, 0]);

  // Animation du sous-titre (décalé de 10 frames)
  const subtitleOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [10, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animation de l'image (si présente)
  const imageScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 20, stiffness: 100 },
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
        padding: 80,
      }}
    >
      {/* Image optionnelle */}
      {image && (
        <div
          style={{
            marginBottom: 40,
            transform: `scale(${imageScale})`,
          }}
        >
          <Img
            src={staticFile(image)}
            style={{
              width: 200,
              height: 200,
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* Titre */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: textColor,
          margin: 0,
          textAlign: "center",
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        {title}
      </h1>

      {/* Sous-titre */}
      {subtitle && (
        <p
          style={{
            fontSize: 32,
            color: textColor,
            marginTop: 20,
            textAlign: "center",
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleOpacity * 0.8,
          }}
        >
          {subtitle}
        </p>
      )}
    </AbsoluteFill>
  );
};
