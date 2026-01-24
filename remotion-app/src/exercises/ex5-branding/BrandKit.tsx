import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "./brandConfig";

/**
 * Exercice 5.1 - Brand Kit
 *
 * Démonstration visuelle de l'identité de marque :
 * - Palette de couleurs animée
 * - Typographies
 * - Logo placeholder
 *
 * Ce composant sert de référence visuelle pour le branding.
 */

const ColorSwatch: React.FC<{
  color: string;
  name: string;
  delay: number;
}> = ({ color, name, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
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
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          backgroundColor: color,
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      />
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: BRAND.fontSize.sm,
          color: BRAND.colors.dark,
          fontWeight: 600,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: BRAND.fonts.mono,
          fontSize: BRAND.fontSize.xs,
          color: BRAND.colors.gray[500],
        }}
      >
        {color}
      </div>
    </div>
  );
};

export const BrandKit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation du titre
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  // Fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Section active basée sur le temps
  const section = frame < 60 ? "colors" : frame < 120 ? "typography" : "logo";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.gray[100],
        opacity: fadeOut,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: BRAND.fontSize.xl,
            fontWeight: "bold",
            color: BRAND.colors.dark,
            transform: `scale(${titleScale})`,
          }}
        >
          Brand Kit
        </div>
      </div>

      {/* Section Couleurs */}
      {section === "colors" && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: BRAND.fontSize.md,
              color: BRAND.colors.gray[500],
              marginBottom: 40,
            }}
          >
            Palette de couleurs
          </div>
          <div
            style={{
              display: "flex",
              gap: 40,
            }}
          >
            <ColorSwatch
              color={BRAND.colors.primary}
              name="Primary"
              delay={10}
            />
            <ColorSwatch
              color={BRAND.colors.secondary}
              name="Secondary"
              delay={15}
            />
            <ColorSwatch
              color={BRAND.colors.accent}
              name="Accent"
              delay={20}
            />
            <ColorSwatch
              color={BRAND.colors.dark}
              name="Dark"
              delay={25}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* Section Typographie */}
      {section === "typography" && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: BRAND.fontSize.md,
              color: BRAND.colors.gray[500],
              marginBottom: 40,
              opacity: interpolate(frame - 60, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Typographies
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: BRAND.fontSize.xxl,
                fontWeight: "bold",
                color: BRAND.colors.dark,
                opacity: interpolate(frame - 70, [0, 15], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Inter Bold
            </div>
            <div
              style={{
                fontFamily: BRAND.fonts.secondary,
                fontSize: BRAND.fontSize.xl,
                fontStyle: "italic",
                color: BRAND.colors.gray[700],
                opacity: interpolate(frame - 80, [0, 15], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Georgia Italic
            </div>
            <div
              style={{
                fontFamily: BRAND.fonts.mono,
                fontSize: BRAND.fontSize.lg,
                color: BRAND.colors.primary,
                opacity: interpolate(frame - 90, [0, 15], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {"<Monospace />"}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Section Logo */}
      {section === "logo" && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
              opacity: interpolate(frame - 120, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${spring({
                frame: frame - 120,
                fps,
                config: { damping: 12, stiffness: 100 },
              })})`,
            }}
          >
            {/* Logo placeholder */}
            <div
              style={{
                width: 200,
                height: 200,
                background: BRAND.gradients.primary,
                borderRadius: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 20px 60px rgba(108, 99, 255, 0.4)",
              }}
            >
              <div
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: 60,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {BRAND.logo.text}
              </div>
            </div>
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: BRAND.fontSize.md,
                color: BRAND.colors.gray[500],
              }}
            >
              Votre logo ici
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Indicateur de section */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {["colors", "typography", "logo"].map((s, i) => (
          <div
            key={s}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor:
                section === s ? BRAND.colors.primary : BRAND.colors.gray[300],
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
