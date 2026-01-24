import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Slide } from "./Slide";
import { FONT_FAMILY } from "../../HelloWorld/constants";

// Configuration des slides
const slides = [
  {
    title: "Bienvenue",
    subtitle: "Exercice 2.1 - Slideshow avec transitions",
    backgroundColor: "#6C63FF",
  },
  {
    title: "Remotion",
    subtitle: "Créez des vidéos avec React",
    backgroundColor: "#FF6B6B",
  },
  {
    title: "Merci !",
    subtitle: "Passez à l'exercice suivant",
    backgroundColor: "#4ECDC4",
  },
];

// Durée de chaque slide et transition (en frames)
const SLIDE_DURATION = 60; // 2 secondes à 30fps
const TRANSITION_DURATION = 15; // 0.5 seconde

export const Slideshow: React.FC = () => {
  const frame = useCurrentFrame();
  const totalSlides = slides.length;

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      <TransitionSeries>
        {slides.map((slide, index) => (
          <React.Fragment key={index}>
            <TransitionSeries.Sequence durationInFrames={SLIDE_DURATION}>
              <Slide
                title={slide.title}
                subtitle={slide.subtitle}
                backgroundColor={slide.backgroundColor}
              />
            </TransitionSeries.Sequence>

            {/* Transition fade entre les slides (sauf après le dernier) */}
            {index < slides.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>

      {/* Barre de progression */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        {slides.map((_, index) => {
          // Calculer si ce slide est actif
          const slideStart = index * (SLIDE_DURATION - TRANSITION_DURATION);
          const slideEnd = slideStart + SLIDE_DURATION;
          const isActive = frame >= slideStart && frame < slideEnd;
          const isPast = frame >= slideEnd;

          return (
            <div
              key={index}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: isPast || isActive ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                transform: isActive ? "scale(1.3)" : "scale(1)",
                transition: "none", // Pas de CSS transition !
              }}
            />
          );
        })}
      </div>

      {/* Numéro de slide */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          fontFamily: FONT_FAMILY,
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {Math.min(Math.floor(frame / (SLIDE_DURATION - TRANSITION_DURATION)) + 1, totalSlides)} / {totalSlides}
      </div>
    </AbsoluteFill>
  );
};
