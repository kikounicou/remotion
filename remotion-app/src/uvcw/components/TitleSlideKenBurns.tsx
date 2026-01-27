import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { Logo } from "./Logo";
import { Picto } from "./Picto";
import { TagMatiere } from "./TagMatiere";
import { KenBurnsImage, KenBurnsEffect } from "./KenBurnsImage";

export interface TitleSlideKenBurnsProps {
  titre: string;
  accroche?: string;
  matiere: MatiereSlug;
  photoUrl?: string;
  typeContenu?: string;
  overlayOpacity?: number;
  kenBurnsEffect?: KenBurnsEffect;
  kenBurnsIntensity?: number;
}

/**
 * TitleSlideKenBurns - Slide principal avec Ken Burns amplifié
 *
 * Comme TitleSlide mais avec effet Ken Burns configurable sur l'image
 */
export const TitleSlideKenBurns: React.FC<TitleSlideKenBurnsProps> = ({
  titre,
  accroche,
  matiere,
  photoUrl,
  typeContenu,
  overlayOpacity = 0.72,
  kenBurnsEffect = "zoomInPanRight",
  kenBurnsIntensity = 1.2,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // === ANIMATIONS RAPIDES ===

  // Overlay
  const overlayAnim = interpolate(frame, [0, 15], [0.3, overlayOpacity], {
    extrapolateRight: "clamp",
  });

  // Logo - scale bounce rapide
  const logoScale = interpolate(frame, [5, 12, 18], [0, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const logoOpacity = interpolate(frame, [5, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Picto - pulse punch
  const pictoScale = interpolate(frame, [8, 15, 22], [0, 1.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.5)),
  });
  const pictoOpacity = interpolate(frame, [8, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tag - slide rapide
  const tagX = interpolate(frame, [10, 22], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const tagOpacity = interpolate(frame, [10, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Titre - apparition punch
  const titreY = interpolate(frame, [12, 28], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const titreOpacity = interpolate(frame, [12, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ligne déco sous titre
  const lineWidth = interpolate(frame, [25, 40], [0, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accroche
  const accrocheOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const accrocheY = interpolate(frame, [30, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Type contenu
  const typeOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tronquer le titre si trop long
  const titreTronque = titre.length > 90 ? titre.substring(0, 90) + "..." : titre;

  // Tronquer l'accroche
  const accrocheTronquee = accroche
    ? accroche.length > 180
      ? accroche.substring(0, 180) + "..."
      : accroche
    : null;

  return (
    <AbsoluteFill style={{ backgroundColor: matiereColor }}>
      {/* Image de fond avec Ken Burns */}
      {photoUrl && (
        <KenBurnsImage
          src={photoUrl}
          effect={kenBurnsEffect}
          intensity={kenBurnsIntensity}
        />
      )}

      {/* Overlay couleur matière */}
      <AbsoluteFill
        style={{
          backgroundColor: matiereColor,
          opacity: overlayAnim,
        }}
      />

      {/* Vignette pour profondeur */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.3)",
          pointerEvents: "none",
        }}
      />

      {/* === ÉLÉMENTS DE MARQUE === */}

      {/* Logo UVCW - bas gauche */}
      <div
        style={{
          position: "absolute",
          bottom: UVCW_BRAND.spacing.lg,
          left: UVCW_BRAND.spacing.lg,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Logo size={90} />
      </div>

      {/* Picto matière - haut gauche */}
      <div
        style={{
          position: "absolute",
          top: UVCW_BRAND.spacing.lg,
          left: UVCW_BRAND.spacing.lg,
          transform: `scale(${pictoScale})`,
          opacity: pictoOpacity,
        }}
      >
        <Picto matiere={matiere} size={70} color="#ffffff" />
      </div>

      {/* Tag matière - haut droit */}
      <div
        style={{
          position: "absolute",
          top: UVCW_BRAND.spacing.lg,
          right: UVCW_BRAND.spacing.lg,
          transform: `translateX(${tagX}px)`,
          opacity: tagOpacity,
        }}
      >
        <TagMatiere matiere={matiere} size="md" />
      </div>

      {/* Type contenu - bas droit */}
      {typeContenu && (
        <div
          style={{
            position: "absolute",
            bottom: UVCW_BRAND.spacing.lg,
            right: UVCW_BRAND.spacing.lg,
            opacity: typeOpacity,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: `${UVCW_BRAND.spacing.xs}px ${UVCW_BRAND.spacing.sm}px`,
            borderRadius: 4,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontFamily: UVCW_BRAND.fonts.body,
              fontSize: UVCW_BRAND.fontSize.sm,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {typeContenu}
          </span>
        </div>
      )}

      {/* === CONTENU CENTRAL === */}
      <AbsoluteFill
        style={{
          padding: UVCW_BRAND.spacing.xl,
          paddingTop: 120,
          paddingBottom: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Titre */}
        <div
          style={{
            transform: `translateY(${titreY}px)`,
            opacity: titreOpacity,
          }}
        >
          <h1
            style={{
              color: "#ffffff",
              fontFamily: UVCW_BRAND.fonts.heading,
              fontSize: UVCW_BRAND.fontSize.xl,
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
              textShadow: "0 3px 15px rgba(0,0,0,0.4)",
            }}
          >
            {titreTronque}
          </h1>
        </div>

        {/* Ligne décorative */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            marginTop: UVCW_BRAND.spacing.md,
            marginBottom: UVCW_BRAND.spacing.md,
          }}
        />

        {/* Accroche */}
        {accrocheTronquee && (
          <div
            style={{
              transform: `translateY(${accrocheY}px)`,
              opacity: accrocheOpacity,
            }}
          >
            <p
              style={{
                color: "#ffffff",
                fontFamily: UVCW_BRAND.fonts.body,
                fontSize: UVCW_BRAND.fontSize.md,
                fontWeight: 400,
                lineHeight: 1.5,
                margin: 0,
                opacity: 0.95,
              }}
            >
              {accrocheTronquee}
            </p>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
