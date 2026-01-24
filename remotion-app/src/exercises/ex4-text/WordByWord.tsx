import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";

/**
 * Exercice 4.1 - Word By Word (Style TikTok/Reels)
 *
 * Affiche un texte mot par mot avec highlight du mot actuel.
 * Très utilisé pour les sous-titres dynamiques sur TikTok/Instagram.
 *
 * Concepts :
 * - Animation séquentielle basée sur le temps
 * - Calcul du mot actif selon le frame
 * - Styles conditionnels (mot actif vs inactif)
 */

const text = "Remotion transforme votre code React en vidéos professionnelles";
const WORDS_PER_SECOND = 2.5; // Vitesse de lecture

export const WordByWord: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const words = text.split(" ");
  const framesPerWord = fps / WORDS_PER_SECOND;

  // Calculer quel mot est actif
  const activeWordIndex = Math.floor(frame / framesPerWord);

  // Fade in global au début
  const globalOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out à la fin
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
        opacity: globalOpacity * fadeOut,
      }}
    >
      {/* Titre */}
      <div
        style={{
          position: "absolute",
          top: 80,
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: 2,
        }}
      >
        STYLE TIKTOK
      </div>

      {/* Conteneur des mots */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 1200,
          padding: 40,
          gap: 20,
        }}
      >
        {words.map((word, index) => {
          const isActive = index === activeWordIndex;
          const isPast = index < activeWordIndex;

          // Animation du mot actif
          const wordProgress = interpolate(
            frame - index * framesPerWord,
            [0, framesPerWord * 0.3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const scale = isActive ? interpolate(wordProgress, [0, 1], [1.1, 1]) : 1;

          return (
            <span
              key={index}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 72,
                fontWeight: "bold",
                color: isActive
                  ? "#FFD93D"
                  : isPast
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.3)",
                transform: `scale(${scale})`,
                textShadow: isActive
                  ? "0 0 30px rgba(255,217,61,0.5)"
                  : "none",
                transition: "none", // Pas de CSS transition !
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Barre de progression */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "60%",
          height: 6,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(frame / durationInFrames) * 100}%`,
            height: "100%",
            backgroundColor: "#FFD93D",
            borderRadius: 3,
          }}
        />
      </div>

      {/* Indicateur de mot */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: FONT_FAMILY,
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Mot {Math.min(activeWordIndex + 1, words.length)} / {words.length}
      </div>
    </AbsoluteFill>
  );
};
