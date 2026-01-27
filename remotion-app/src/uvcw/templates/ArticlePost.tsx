import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  Sequence,
} from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { Logo, TagMatiere, CallToAction, Title, Subtitle, Picto } from "../components";

export interface ArticlePostProps {
  // Contenu
  titre: string;
  sousTitre?: string;
  matiere: MatiereSlug;

  // Image de fond (optionnel)
  backgroundImage?: string;

  // Personnalisation
  overlayOpacity?: number;
  showPicto?: boolean;
}

/**
 * ArticlePost - Template style LinkedIn UVCW
 *
 * Format: 1080x1080 (carré)
 * Durée recommandée: 150 frames (5s à 30fps)
 */
export const ArticlePost: React.FC<ArticlePostProps> = ({
  titre,
  sousTitre,
  matiere,
  backgroundImage,
  overlayOpacity = 0.75,
  showPicto = true,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Animation de l'overlay
  const overlayAnim = interpolate(
    frame,
    [0, UVCW_BRAND.animation.slow],
    [0, overlayOpacity],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: matiereColor,
      }}
    >
      {/* Image de fond */}
      {backgroundImage && (
        <AbsoluteFill>
          <Img
            src={backgroundImage}
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

      {/* Container principal avec padding */}
      <AbsoluteFill
        style={{
          padding: UVCW_BRAND.spacing.xl,
        }}
      >
        {/* Tag matière - haut droite */}
        <Sequence from={5} layout="none">
          <div
            style={{
              position: "absolute",
              top: UVCW_BRAND.spacing.md,
              right: UVCW_BRAND.spacing.md,
            }}
          >
            <TagMatiere matiere={matiere} size="md" />
          </div>
        </Sequence>

        {/* Picto matière - haut gauche */}
        {showPicto && (
          <Sequence from={8} layout="none">
            <div
              style={{
                position: "absolute",
                top: UVCW_BRAND.spacing.md,
                left: UVCW_BRAND.spacing.md,
              }}
            >
              <Picto matiere={matiere} size={64} color="#ffffff" />
            </div>
          </Sequence>
        )}

        {/* Contenu central - Titre et sous-titre */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: UVCW_BRAND.spacing.lg,
          }}
        >
          {sousTitre && (
            <Sequence from={10} layout="none">
              <div style={{ marginBottom: UVCW_BRAND.spacing.md }}>
                <Subtitle size="lg" delay={0}>
                  {sousTitre}
                </Subtitle>
              </div>
            </Sequence>
          )}

          <Sequence from={15} layout="none">
            <Title size="xl" maxWidth={900}>
              {titre}
            </Title>
          </Sequence>
        </div>

        {/* Logo - bas gauche */}
        <Sequence from={25} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: UVCW_BRAND.spacing.md,
              left: UVCW_BRAND.spacing.md,
            }}
          >
            <Logo size={80} />
          </div>
        </Sequence>

        {/* CTA - bas droite */}
        <Sequence from={25} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: UVCW_BRAND.spacing.md,
              right: UVCW_BRAND.spacing.md,
            }}
          >
            <CallToAction size="md" />
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
