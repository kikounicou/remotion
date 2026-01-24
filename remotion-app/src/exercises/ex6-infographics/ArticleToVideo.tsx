import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { BRAND } from "../ex5-branding/brandConfig";

/**
 * Exercice 6.2 - Article To Video
 *
 * Transforme des points clés d'article en vidéo infographique.
 * Structure : Titre → Points clés animés → Conclusion
 *
 * Ce template peut être alimenté dynamiquement avec des données JSON.
 */

interface ArticleData {
  title: string;
  subtitle?: string;
  points: {
    icon: string;
    title: string;
    description: string;
  }[];
  conclusion: string;
  source?: string;
}

// Données d'exemple (pourrait venir d'une API/JSON)
const articleData: ArticleData = {
  title: "5 Tendances Tech 2024",
  subtitle: "Ce qui va transformer votre business",
  points: [
    {
      icon: "🤖",
      title: "IA Générative",
      description: "Automatisation créative à grande échelle",
    },
    {
      icon: "🔒",
      title: "Zero Trust Security",
      description: "Sécurité sans périmètre fixe",
    },
    {
      icon: "☁️",
      title: "Edge Computing",
      description: "Traitement proche des utilisateurs",
    },
    {
      icon: "🌱",
      title: "Green Tech",
      description: "IT durable et éco-responsable",
    },
  ],
  conclusion: "L'avenir appartient aux entreprises agiles",
  source: "TechInsights 2024",
};

// Composant pour un point clé
const KeyPoint: React.FC<{
  icon: string;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 8;

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 30,
        opacity,
        transform: `translateX(${(1 - slideIn) * 100}px)`,
      }}
    >
      {/* Icône */}
      <div
        style={{
          width: 80,
          height: 80,
          backgroundColor: BRAND.colors.primary,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
          boxShadow: "0 8px 24px rgba(108, 99, 255, 0.3)",
        }}
      >
        {icon}
      </div>

      {/* Texte */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.lg,
            fontWeight: "bold",
            color: BRAND.colors.dark,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.md,
            color: BRAND.colors.gray[500],
          }}
        >
          {description}
        </div>
      </div>

      {/* Numéro */}
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.xxl,
          fontWeight: "bold",
          color: BRAND.colors.gray[200],
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
};

export const ArticleToVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const INTRO_DURATION = 60;
  const POINTS_DURATION = 150;
  const OUTRO_DURATION = 60;

  // Fade out global
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.gray[100],
        opacity: fadeOut,
      }}
    >
      {/* Intro - Titre */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: BRAND.gradients.primary,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Titre */}
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: BRAND.fontSize.hero,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                transform: `scale(${spring({
                  frame,
                  fps,
                  config: { damping: 12, stiffness: 100 },
                })})`,
              }}
            >
              {articleData.title}
            </div>

            {/* Sous-titre */}
            {articleData.subtitle && (
              <div
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: BRAND.fontSize.lg,
                  color: "rgba(255,255,255,0.8)",
                  opacity: interpolate(frame, [20, 40], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {articleData.subtitle}
              </div>
            )}

            {/* Indicateur */}
            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 8,
                opacity: interpolate(frame, [30, 45], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {articleData.points.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Points clés */}
      <Sequence from={INTRO_DURATION} durationInFrames={POINTS_DURATION}>
        <AbsoluteFill
          style={{
            padding: 80,
            justifyContent: "center",
          }}
        >
          {/* Header compact */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 80,
              fontFamily: BRAND.fonts.primary,
              fontSize: BRAND.fontSize.md,
              color: BRAND.colors.primary,
              fontWeight: "bold",
            }}
          >
            {articleData.title}
          </div>

          {/* Liste des points */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            {articleData.points.map((point, index) => (
              <KeyPoint
                key={index}
                icon={point.icon}
                title={point.title}
                description={point.description}
                index={index}
              />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Outro - Conclusion */}
      <Sequence
        from={INTRO_DURATION + POINTS_DURATION}
        durationInFrames={OUTRO_DURATION}
      >
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: BRAND.gradients.dark,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
            }}
          >
            {/* Conclusion */}
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: BRAND.fontSize.xl,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                maxWidth: 800,
                transform: `scale(${spring({
                  frame: frame - INTRO_DURATION - POINTS_DURATION,
                  fps,
                  config: { damping: 15, stiffness: 120 },
                })})`,
              }}
            >
              {articleData.conclusion}
            </div>

            {/* Source */}
            {articleData.source && (
              <div
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: BRAND.fontSize.sm,
                  color: "rgba(255,255,255,0.5)",
                  opacity: interpolate(
                    frame - INTRO_DURATION - POINTS_DURATION,
                    [20, 35],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  ),
                }}
              >
                Source : {articleData.source}
              </div>
            )}

            {/* Logo/Branding */}
            <div
              style={{
                marginTop: 20,
                padding: "16px 32px",
                backgroundColor: BRAND.colors.primary,
                borderRadius: 12,
                fontFamily: BRAND.fonts.primary,
                fontSize: BRAND.fontSize.md,
                fontWeight: "bold",
                color: "white",
                opacity: interpolate(
                  frame - INTRO_DURATION - POINTS_DURATION,
                  [30, 45],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                ),
              }}
            >
              {BRAND.logo.text}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
