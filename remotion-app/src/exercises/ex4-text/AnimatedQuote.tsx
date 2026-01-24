import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../HelloWorld/constants";

/**
 * Exercice 4.2 - Animated Quote (Style LinkedIn)
 *
 * Citation élégante avec animation progressive.
 * Format carré (1080x1080) idéal pour LinkedIn/Instagram.
 *
 * Concepts :
 * - Animation de texte ligne par ligne
 * - Guillemets décoratifs animés
 * - Apparition progressive de l'auteur
 */

interface AnimatedQuoteProps {
  quote?: string;
  author?: string;
  role?: string;
}

export const AnimatedQuote: React.FC<AnimatedQuoteProps> = ({
  quote = "Le code est de la poésie. Les vidéos sont des symphonies. Remotion les réunit.",
  author = "Un développeur passionné",
  role = "Créateur de contenu",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Diviser la citation en lignes pour animation séquentielle
  const lines = quote.split(". ").map((line, i, arr) =>
    i < arr.length - 1 ? line + "." : line
  );

  // Animation des guillemets
  const quoteMarkScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const quoteMarkOpacity = interpolate(frame, [0, 20], [0, 0.15], {
    extrapolateRight: "clamp",
  });

  // Fade out global
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        opacity: fadeOut,
      }}
    >
      {/* Guillemet décoratif gauche */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 80,
          fontSize: 300,
          fontFamily: "Georgia, serif",
          color: "white",
          opacity: quoteMarkOpacity,
          transform: `scale(${quoteMarkScale})`,
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Guillemet décoratif droit */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 80,
          fontSize: 300,
          fontFamily: "Georgia, serif",
          color: "white",
          opacity: quoteMarkOpacity,
          transform: `scale(${quoteMarkScale}) rotate(180deg)`,
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Conteneur principal */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          zIndex: 1,
        }}
      >
        {/* Citation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {lines.map((line, index) => {
            const lineDelay = index * 25;

            const lineOpacity = interpolate(
              frame - lineDelay,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const lineY = interpolate(
              frame - lineDelay,
              [0, 20],
              [30, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={index}
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 52,
                  fontWeight: 600,
                  color: "white",
                  textAlign: "center",
                  opacity: lineOpacity,
                  transform: `translateY(${lineY}px)`,
                  textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                  maxWidth: 900,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {/* Séparateur */}
        <div
          style={{
            width: interpolate(frame, [60, 90], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 3,
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 2,
          }}
        />

        {/* Auteur */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: interpolate(frame, [80, 100], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [80, 100], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 32,
              fontWeight: "bold",
              color: "white",
            }}
          >
            — {author}
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {role}
          </div>
        </div>
      </div>

      {/* Badge LinkedIn */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [100, 120], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            fontWeight: "bold",
            color: "#0077B5",
          }}
        >
          in
        </div>
      </div>
    </AbsoluteFill>
  );
};
