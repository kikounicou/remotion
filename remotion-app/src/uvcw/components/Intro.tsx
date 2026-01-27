import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { Logo } from "./Logo";
import { Picto } from "./Picto";
import { TagMatiere } from "./TagMatiere";

export interface IntroProps {
  matiere: MatiereSlug;
  typeContenu?: string; // "Actualité", "Formation", etc.
}

/**
 * Intro - Animation d'introduction UVCW
 *
 * Timeline (90 frames = 3s à 30fps):
 * - 0-30: Logo apparaît et scale
 * - 20-50: Picto matière pulse
 * - 40-70: Tag matière slide in
 * - 60-90: Tout se stabilise
 */
export const Intro: React.FC<IntroProps> = ({ matiere, typeContenu }) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Animation Logo - apparition avec scale bounce
  const logoScale = interpolate(
    frame,
    [0, 20, 30],
    [0, 1.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  const logoOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Animation Picto - pulse effect
  const pictoScale = interpolate(
    frame,
    [20, 35, 45, 50],
    [0, 1.2, 0.9, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const pictoOpacity = interpolate(
    frame,
    [20, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animation Tag - slide from right
  const tagTranslateX = interpolate(
    frame,
    [40, 60],
    [100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const tagOpacity = interpolate(
    frame,
    [40, 55],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animation Type Contenu (si présent) - fade in
  const typeOpacity = interpolate(
    frame,
    [50, 70],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: matiereColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: UVCW_BRAND.spacing.xl,
      }}
    >
      {/* Logo UVCW */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Logo size={180} />
      </div>

      {/* Picto matière */}
      <div
        style={{
          transform: `scale(${pictoScale})`,
          opacity: pictoOpacity,
          marginTop: UVCW_BRAND.spacing.lg,
        }}
      >
        <Picto matiere={matiere} size={120} color="#ffffff" />
      </div>

      {/* Tag matière */}
      <div
        style={{
          transform: `translateX(${tagTranslateX}px)`,
          opacity: tagOpacity,
          marginTop: UVCW_BRAND.spacing.md,
        }}
      >
        <TagMatiere matiere={matiere} size="lg" />
      </div>

      {/* Type de contenu (Actualité, Formation, etc.) */}
      {typeContenu && (
        <div
          style={{
            opacity: typeOpacity,
            color: "#ffffff",
            fontFamily: UVCW_BRAND.fonts.body,
            fontSize: UVCW_BRAND.fontSize.md,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginTop: UVCW_BRAND.spacing.sm,
          }}
        >
          {typeContenu}
        </div>
      )}
    </AbsoluteFill>
  );
};
