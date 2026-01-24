import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { KenBurnsImage } from "./KenBurnsImage";
import { FONT_FAMILY } from "../../HelloWorld/constants";

/**
 * Exercice 3.1 - Image Showcase
 *
 * Démonstration de l'effet Ken Burns avec différentes directions :
 * - zoomIn : Zoom avant progressif
 * - zoomOut : Zoom arrière progressif
 * - panLeft/Right : Travelling horizontal
 * - panUp/Down : Travelling vertical
 *
 * Images : Unsplash (libres de droits)
 */

// Configuration des slides avec différents effets
const slides = [
  {
    image: "nature1.jpg",
    effect: "zoomIn" as const,
    title: "Zoom In",
    subtitle: "L'image s'agrandit progressivement",
  },
  {
    image: "nature2.jpg",
    effect: "panRight" as const,
    title: "Pan Right",
    subtitle: "Travelling de gauche à droite",
  },
  {
    image: "nature3.jpg",
    effect: "zoomOut" as const,
    title: "Zoom Out",
    subtitle: "L'image se réduit progressivement",
  },
];

const SLIDE_DURATION = 90; // 3 secondes à 30fps
const TRANSITION_DURATION = 20;

// Composant pour afficher le titre sur l'image
const ImageTitle: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [10, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 80,
        fontFamily: FONT_FAMILY,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}
    >
      {/* Badge effet */}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(108, 99, 255, 0.9)",
          color: "white",
          padding: "8px 16px",
          borderRadius: 4,
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Ken Burns Effect
      </div>

      {/* Titre */}
      <h2
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: "white",
          margin: 0,
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </h2>

      {/* Sous-titre */}
      <p
        style={{
          fontSize: 24,
          color: "rgba(255,255,255,0.9)",
          margin: "8px 0 0 0",
          textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export const ImageShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out global à la fin
  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: globalOpacity }}>
      <TransitionSeries>
        {slides.map((slide, index) => (
          <React.Fragment key={index}>
            <TransitionSeries.Sequence durationInFrames={SLIDE_DURATION}>
              <AbsoluteFill>
                <KenBurnsImage
                  src={slide.image}
                  direction={slide.effect}
                  intensity={2}
                />
                <ImageTitle title={slide.title} subtitle={slide.subtitle} />
              </AbsoluteFill>
            </TransitionSeries.Sequence>

            {index < slides.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>

      {/* Indicateur de progression */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          display: "flex",
          gap: 8,
        }}
      >
        {slides.map((_, index) => {
          const slideStart = index * (SLIDE_DURATION - TRANSITION_DURATION);
          const slideEnd = slideStart + SLIDE_DURATION;
          const isActive = frame >= slideStart && frame < slideEnd;

          return (
            <div
              key={index}
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.3)",
              }}
            />
          );
        })}
      </div>

      {/* Attribution Unsplash */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 40,
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          fontFamily: FONT_FAMILY,
        }}
      >
        Photos: Unsplash (libre de droits)
      </div>
    </AbsoluteFill>
  );
};
