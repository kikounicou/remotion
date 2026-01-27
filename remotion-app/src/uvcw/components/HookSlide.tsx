import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";

export interface HookSlideProps {
  // Le chiffre choc (ex: "3", "85%", "0€")
  chiffreChoc: string;
  // Le contexte du chiffre (ex: "projets validés en Wallonie")
  contexte: string;
  // Question ou accroche (ex: "Pourquoi si peu ?")
  accroche?: string;
  matiere: MatiereSlug;
  photoUrl?: string;
}

/**
 * HookSlide - L'accroche qui arrête le scroll
 *
 * Timeline ultra-punchy (45 frames = 1.5s) :
 * - 0-12: Chiffre explose au centre
 * - 8-25: Contexte apparaît
 * - 20-40: Accroche slide in
 * - 35-45: Léger zoom out pour respiration
 */
export const HookSlide: React.FC<HookSlideProps> = ({
  chiffreChoc,
  contexte,
  accroche,
  matiere,
  photoUrl,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // === ANIMATIONS EXPLOSIVES ===

  // Chiffre - explosion scale
  const chiffreScale = interpolate(
    frame,
    [0, 6, 12],
    [0, 1.4, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(3)),
    }
  );

  const chiffreOpacity = interpolate(
    frame,
    [0, 6],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Effet de "shake" subtil sur le chiffre
  const chiffreShake = interpolate(
    frame,
    [6, 8, 10, 12],
    [0, -3, 3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Contexte - slide up rapide
  const contexteY = interpolate(
    frame,
    [8, 20],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const contexteOpacity = interpolate(
    frame,
    [8, 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Accroche - apparition avec emphasis
  const accrocheScale = interpolate(
    frame,
    [20, 30, 38],
    [0.8, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(2)),
    }
  );

  const accrocheOpacity = interpolate(
    frame,
    [20, 32],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Zoom global léger pour dynamisme
  const globalScale = interpolate(
    frame,
    [0, 45],
    [1.05, 1],
    { extrapolateRight: "clamp" }
  );

  // Flash blanc initial
  const flashOpacity = interpolate(
    frame,
    [0, 4, 10],
    [0.4, 0.2, 0],
    { extrapolateRight: "clamp" }
  );

  // Ligne décorative animée
  const lineWidth = interpolate(
    frame,
    [15, 30],
    [0, 200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
        transform: `scale(${globalScale})`,
      }}
    >
      {/* Image de fond avec forte opacité */}
      {photoUrl && (
        <AbsoluteFill>
          <Img
            src={photoUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.3)",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Overlay gradient dramatique */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center,
            transparent 0%,
            rgba(0,0,0,0.7) 70%,
            rgba(0,0,0,0.9) 100%)`,
        }}
      />

      {/* Flash blanc initial */}
      <AbsoluteFill
        style={{
          backgroundColor: "#ffffff",
          opacity: flashOpacity,
        }}
      />

      {/* Contenu centré */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: UVCW_BRAND.spacing.xl,
        }}
      >
        {/* CHIFFRE CHOC */}
        <div
          style={{
            transform: `scale(${chiffreScale}) translateX(${chiffreShake}px)`,
            opacity: chiffreOpacity,
          }}
        >
          <span
            style={{
              fontFamily: UVCW_BRAND.fonts.heading,
              fontSize: 180,
              fontWeight: 700,
              color: matiereColor,
              textShadow: `0 0 60px ${matiereColor}80, 0 4px 20px rgba(0,0,0,0.5)`,
              letterSpacing: -5,
            }}
          >
            {chiffreChoc}
          </span>
        </div>

        {/* Ligne décorative */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: matiereColor,
            borderRadius: 2,
            marginTop: UVCW_BRAND.spacing.md,
            marginBottom: UVCW_BRAND.spacing.md,
            boxShadow: `0 0 20px ${matiereColor}60`,
          }}
        />

        {/* CONTEXTE */}
        <div
          style={{
            transform: `translateY(${contexteY}px)`,
            opacity: contexteOpacity,
          }}
        >
          <span
            style={{
              fontFamily: UVCW_BRAND.fonts.body,
              fontSize: UVCW_BRAND.fontSize.xl,
              fontWeight: 600,
              color: "#ffffff",
              textAlign: "center",
              display: "block",
              maxWidth: 800,
            }}
          >
            {contexte}
          </span>
        </div>

        {/* ACCROCHE / QUESTION */}
        {accroche && (
          <div
            style={{
              transform: `scale(${accrocheScale})`,
              opacity: accrocheOpacity,
              marginTop: UVCW_BRAND.spacing.lg,
            }}
          >
            <span
              style={{
                fontFamily: UVCW_BRAND.fonts.body,
                fontSize: UVCW_BRAND.fontSize.lg,
                fontWeight: 500,
                color: matiereColor,
                textAlign: "center",
                display: "block",
                fontStyle: "italic",
              }}
            >
              {accroche}
            </span>
          </div>
        )}
      </AbsoluteFill>

      {/* Vignette coins */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.6)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
