import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { getMatiereColor, MatiereSlug } from "../config/matieres";

export interface ProgressBarProps {
  matiere: MatiereSlug;
  height?: number;
  position?: "top" | "bottom";
  showBackground?: boolean;
  glowEffect?: boolean;
}

/**
 * ProgressBar - Barre de progression de la vidéo
 *
 * Se remplit progressivement du début à la fin de la vidéo.
 * Position discrète en bas ou en haut.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  matiere,
  height = 4,
  position = "bottom",
  showBackground = true,
  glowEffect = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const matiereColor = getMatiereColor(matiere);

  // Calcul du pourcentage de progression
  const progress = (frame / durationInFrames) * 100;

  // Animation d'apparition au début
  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [position]: 0,
          height,
          opacity,
        }}
      >
        {/* Background track */}
        {showBackground && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          />
        )}

        {/* Progress fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress}%`,
            backgroundColor: matiereColor,
            boxShadow: glowEffect
              ? `0 0 10px ${matiereColor}, 0 0 20px ${matiereColor}50`
              : "none",
            transition: "width 0.03s linear",
          }}
        />

        {/* Indicateur lumineux au bout */}
        {glowEffect && (
          <div
            style={{
              position: "absolute",
              top: -2,
              bottom: -2,
              left: `${progress}%`,
              width: 8,
              marginLeft: -4,
              backgroundColor: "#ffffff",
              borderRadius: 4,
              boxShadow: `0 0 8px #ffffff, 0 0 15px ${matiereColor}`,
              opacity: progress > 1 ? 1 : 0,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
