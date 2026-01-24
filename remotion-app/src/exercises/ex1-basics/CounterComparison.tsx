import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Counter, EasingType } from "./Counter";
import { FONT_FAMILY } from "../../HelloWorld/constants";

// Configuration des 4 compteurs à comparer
const counters: { type: EasingType; label: string }[] = [
  { type: "linear", label: "Linear" },
  { type: "easeIn", label: "Ease In" },
  { type: "easeOut", label: "Ease Out" },
  { type: "easeInOut", label: "Ease In-Out" },
];

export const CounterComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in du titre
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

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
    <AbsoluteFill
      style={{
        backgroundColor: "#F8F9FA",
        opacity: globalOpacity,
      }}
    >
      {/* Titre */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#2D3436",
            margin: 0,
          }}
        >
          Comparaison des Easings
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#636E72",
            marginTop: 10,
          }}
        >
          Exercice 1.2 - Compteur de 0 à 100
        </p>
      </div>

      {/* Grille des 4 compteurs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingTop: 100,
        }}
      >
        {counters.map(({ type, label }) => (
          <Counter
            key={type}
            from={0}
            to={100}
            easingType={type}
            label={label}
            fontSize={72}
          />
        ))}
      </div>

      {/* Indicateur de frame en bas */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 18,
          color: "#B2BEC3",
        }}
      >
        Frame {frame} / {durationInFrames} ({Math.round((frame / durationInFrames) * 100)}%)
      </div>
    </AbsoluteFill>
  );
};
