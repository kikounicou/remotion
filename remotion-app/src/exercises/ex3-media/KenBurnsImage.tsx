import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Ken Burns Effect
 *
 * L'effet Ken Burns est un effet de zoom/pan lent sur une image fixe,
 * popularisé par le documentariste Ken Burns.
 *
 * Cet effet donne vie aux images statiques en créant un mouvement subtil.
 */

type KenBurnsDirection = "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp" | "panDown";

interface KenBurnsImageProps {
  readonly src: string;
  readonly direction?: KenBurnsDirection;
  readonly intensity?: number; // 1 = subtil, 2 = modéré, 3 = fort
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  direction = "zoomIn",
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Facteur d'intensité (plus c'est grand, plus le mouvement est visible)
  const factor = intensity * 0.05;

  // Calculer la progression de 0 à 1 sur toute la durée
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Calculer les transformations selon la direction
  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case "zoomIn":
      scale = interpolate(progress, [0, 1], [1, 1 + factor * 4]);
      break;
    case "zoomOut":
      scale = interpolate(progress, [0, 1], [1 + factor * 4, 1]);
      break;
    case "panLeft":
      scale = 1 + factor * 2; // Léger zoom pour éviter les bords
      translateX = interpolate(progress, [0, 1], [factor * 200, -factor * 200]);
      break;
    case "panRight":
      scale = 1 + factor * 2;
      translateX = interpolate(progress, [0, 1], [-factor * 200, factor * 200]);
      break;
    case "panUp":
      scale = 1 + factor * 2;
      translateY = interpolate(progress, [0, 1], [factor * 100, -factor * 100]);
      break;
    case "panDown":
      scale = 1 + factor * 2;
      translateY = interpolate(progress, [0, 1], [-factor * 100, factor * 100]);
      break;
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
