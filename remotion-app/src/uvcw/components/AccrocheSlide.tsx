import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { TagMatiere } from "./TagMatiere";

export interface AccrocheSlideProps {
  titre: string;
  accroche: string;
  matiere: MatiereSlug;
  photoUrl?: string;
  overlayOpacity?: number;
}

/**
 * AccrocheSlide - Slide titre + accroche
 *
 * Affiche le titre principal et l'accroche de l'article
 * avec image de fond optionnelle
 */
export const AccrocheSlide: React.FC<AccrocheSlideProps> = ({
  titre,
  accroche,
  matiere,
  photoUrl,
  overlayOpacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Animation overlay
  const overlayAnim = interpolate(
    frame,
    [0, 20],
    [0, overlayOpacity],
    { extrapolateRight: "clamp" }
  );

  // Animation tag matière
  const tagOpacity = interpolate(
    frame,
    [5, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const tagY = interpolate(
    frame,
    [5, 20],
    [-20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Animation titre
  const titreOpacity = interpolate(
    frame,
    [15, 35],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titreY = interpolate(
    frame,
    [15, 35],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Animation accroche
  const accrocheOpacity = interpolate(
    frame,
    [35, 55],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const accrocheY = interpolate(
    frame,
    [35, 55],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Tronquer le titre si trop long
  const titreTronque =
    titre.length > 100 ? titre.substring(0, 100) + "..." : titre;

  // Tronquer l'accroche si trop longue
  const accrocheTronquee =
    accroche.length > 200 ? accroche.substring(0, 200) + "..." : accroche;

  return (
    <AbsoluteFill style={{ backgroundColor: matiereColor }}>
      {/* Image de fond */}
      {photoUrl && (
        <AbsoluteFill>
          <Img
            src={photoUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Overlay couleur matière */}
      <AbsoluteFill
        style={{
          backgroundColor: matiereColor,
          opacity: overlayAnim,
        }}
      />

      {/* Contenu */}
      <AbsoluteFill
        style={{
          padding: UVCW_BRAND.spacing.xl,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Tag matière en haut */}
        <div
          style={{
            position: "absolute",
            top: UVCW_BRAND.spacing.lg,
            left: UVCW_BRAND.spacing.lg,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          <TagMatiere matiere={matiere} size="md" />
        </div>

        {/* Zone centrale : Titre + Accroche */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: UVCW_BRAND.spacing.lg,
            paddingTop: UVCW_BRAND.spacing.xxl,
          }}
        >
          {/* Titre */}
          <div
            style={{
              opacity: titreOpacity,
              transform: `translateY(${titreY}px)`,
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontFamily: UVCW_BRAND.fonts.heading,
                fontSize: UVCW_BRAND.fontSize.xl,
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {titreTronque}
            </h1>
          </div>

          {/* Ligne de séparation */}
          <div
            style={{
              width: interpolate(frame, [30, 50], [0, 120], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              height: 4,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          />

          {/* Accroche */}
          <div
            style={{
              opacity: accrocheOpacity,
              transform: `translateY(${accrocheY}px)`,
            }}
          >
            <p
              style={{
                color: "#ffffff",
                fontFamily: UVCW_BRAND.fonts.body,
                fontSize: UVCW_BRAND.fontSize.md,
                fontWeight: 400,
                lineHeight: 1.6,
                margin: 0,
                opacity: 0.95,
              }}
            >
              {accrocheTronquee}
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
