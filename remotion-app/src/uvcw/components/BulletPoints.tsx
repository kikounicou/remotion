import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { Picto } from "./Picto";

export interface BulletPointsProps {
  points: string[];
  matiere: MatiereSlug;
  titre?: string; // Titre optionnel au-dessus des points
  framesPerPoint?: number; // Frames entre chaque point (défaut: 30)
}

/**
 * BulletPoints - Points clés animés
 *
 * Chaque point apparaît séquentiellement avec :
 * - Icône qui pulse
 * - Texte qui fade in depuis la gauche
 */
export const BulletPoints: React.FC<BulletPointsProps> = ({
  points,
  matiere,
  titre,
  framesPerPoint = 30,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Animation du titre
  const titreOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const titreY = interpolate(
    frame,
    [0, 20],
    [-20, 0],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: UVCW_BRAND.colors.secondary.dark,
        padding: UVCW_BRAND.spacing.xl,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Titre section */}
      {titre && (
        <div
          style={{
            opacity: titreOpacity,
            transform: `translateY(${titreY}px)`,
            color: matiereColor,
            fontFamily: UVCW_BRAND.fonts.heading,
            fontSize: UVCW_BRAND.fontSize.lg,
            fontWeight: 700,
            marginBottom: UVCW_BRAND.spacing.xl,
            textAlign: "center",
          }}
        >
          {titre}
        </div>
      )}

      {/* Liste des points */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: UVCW_BRAND.spacing.lg,
          paddingLeft: UVCW_BRAND.spacing.lg,
          paddingRight: UVCW_BRAND.spacing.lg,
        }}
      >
        {points.map((point, index) => {
          const startFrame = 25 + index * framesPerPoint;

          // Animation bullet
          const bulletScale = interpolate(
            frame,
            [startFrame, startFrame + 10, startFrame + 15],
            [0, 1.3, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(2)),
            }
          );

          // Animation texte
          const textOpacity = interpolate(
            frame,
            [startFrame + 5, startFrame + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const textX = interpolate(
            frame,
            [startFrame + 5, startFrame + 20],
            [-30, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: UVCW_BRAND.spacing.md,
              }}
            >
              {/* Bullet - petit carré coloré */}
              <div
                style={{
                  transform: `scale(${bulletScale})`,
                  minWidth: 24,
                  height: 24,
                  marginTop: 8,
                  backgroundColor: matiereColor,
                  borderRadius: 4,
                }}
              />

              {/* Texte du point */}
              <div
                style={{
                  opacity: textOpacity,
                  transform: `translateX(${textX}px)`,
                  color: "#ffffff",
                  fontFamily: UVCW_BRAND.fonts.body,
                  fontSize: UVCW_BRAND.fontSize.md,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {point}
              </div>
            </div>
          );
        })}
      </div>

      {/* Picto matière en filigrane */}
      <div
        style={{
          position: "absolute",
          right: UVCW_BRAND.spacing.xl,
          bottom: UVCW_BRAND.spacing.xl,
          opacity: 0.1,
        }}
      >
        <Picto matiere={matiere} size={200} color={matiereColor} />
      </div>
    </AbsoluteFill>
  );
};
