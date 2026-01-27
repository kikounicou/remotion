import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { WordByWordBullet } from "./WordByWord";
import { Picto } from "./Picto";

export interface BulletPointsAnimatedProps {
  points: string[];
  matiere: MatiereSlug;
  titre?: string;
  framesPerPoint?: number;
  framesPerWord?: number;
}

/**
 * BulletPointsAnimated - Points clés avec animation word-by-word
 *
 * Chaque point apparaît avec :
 * - Numéro qui bounce
 * - Texte mot par mot avec emphase sur les chiffres/mots-clés
 * - Picto animé en filigrane (breathing effect)
 */
export const BulletPointsAnimated: React.FC<BulletPointsAnimatedProps> = ({
  points,
  matiere,
  titre = "Ce qu'il faut retenir",
  framesPerPoint = 70,
  framesPerWord = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const matiereColor = getMatiereColor(matiere);

  // Animation du titre
  const titreOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titreY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const titreLineWidth = interpolate(frame, [10, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === ANIMATION PICTO - Breathing effect pro ===
  // Cycle de 3 secondes (90 frames à 30fps)
  const breathCycle = (frame % (fps * 3)) / (fps * 3); // 0 à 1
  const breathValue = Math.sin(breathCycle * Math.PI * 2); // -1 à 1

  // Scale subtil (0.95 à 1.05)
  const pictoScale = 1 + breathValue * 0.05;

  // Opacité qui pulse légèrement (0.06 à 0.12)
  const pictoOpacity = 0.09 + breathValue * 0.03;

  // Légère rotation (très subtile, -2° à +2°)
  const pictoRotation = breathValue * 2;

  // Glow qui pulse
  const glowIntensity = 20 + breathValue * 10;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: UVCW_BRAND.colors.secondary.dark,
        padding: UVCW_BRAND.spacing.xl,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Titre section */}
      {titre && (
        <div
          style={{
            opacity: titreOpacity,
            transform: `translateY(${titreY}px)`,
            marginBottom: UVCW_BRAND.spacing.xl,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: matiereColor,
              fontFamily: UVCW_BRAND.fonts.heading,
              fontSize: UVCW_BRAND.fontSize.lg,
              fontWeight: 700,
              margin: 0,
              marginBottom: UVCW_BRAND.spacing.sm,
            }}
          >
            {titre}
          </h2>
          {/* Ligne décorative */}
          <div
            style={{
              width: titreLineWidth,
              height: 3,
              backgroundColor: matiereColor,
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </div>
      )}

      {/* Liste des points - ALIGNÉ À GAUCHE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: UVCW_BRAND.spacing.lg,
          paddingRight: UVCW_BRAND.spacing.xxl + 100, // Espace pour le picto
          maxWidth: 900,
        }}
      >
        {points.map((point, index) => {
          const pointStartFrame = 25 + index * framesPerPoint;

          return (
            <WordByWordBullet
              key={index}
              text={point}
              matiere={matiere}
              bulletIndex={index}
              framesPerWord={framesPerWord}
              startFrame={pointStartFrame}
            />
          );
        })}
      </div>

      {/* Picto matière en filigrane - ANIMÉ */}
      <div
        style={{
          position: "absolute",
          right: UVCW_BRAND.spacing.xl,
          bottom: UVCW_BRAND.spacing.xl,
          opacity: pictoOpacity,
          transform: `scale(${pictoScale}) rotate(${pictoRotation}deg)`,
          filter: `drop-shadow(0 0 ${glowIntensity}px ${matiereColor}40)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Picto matiere={matiere} size={280} color={matiereColor} />
      </div>

      {/* Gradient subtil en haut */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 150,
          background: `linear-gradient(to bottom, ${matiereColor}15, transparent)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
