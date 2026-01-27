import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";
import { Logo } from "./Logo";
import { CallToAction } from "./CallToAction";

export interface OutroProps {
  matiere: MatiereSlug;
  articleUrl?: string; // URL spécifique de l'article
}

/**
 * Outro - Animation de fin UVCW
 *
 * Timeline (90 frames = 3s à 30fps):
 * - 0-30: CTA apparaît
 * - 20-50: URL article (si fournie)
 * - 40-70: Logo scale in
 * - 60-90: Stabilisation
 */
export const Outro: React.FC<OutroProps> = ({ matiere, articleUrl }) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Animation CTA
  const ctaScale = interpolate(
    frame,
    [0, 15, 25],
    [0.8, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const ctaOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Animation URL
  const urlOpacity = interpolate(
    frame,
    [20, 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const urlY = interpolate(
    frame,
    [20, 40],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Animation Logo
  const logoScale = interpolate(
    frame,
    [40, 55, 65],
    [0, 1.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  const logoOpacity = interpolate(
    frame,
    [40, 55],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Extraire le path court de l'URL (ex: "uvcw.be/energie/actus/art-9454")
  const shortUrl = articleUrl
    ? articleUrl.replace("https://", "").replace("http://", "")
    : null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: matiereColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: UVCW_BRAND.spacing.lg,
      }}
    >
      {/* CTA principal */}
      <div
        style={{
          transform: `scale(${ctaScale})`,
          opacity: ctaOpacity,
        }}
      >
        <CallToAction size="lg" />
      </div>

      {/* URL spécifique de l'article */}
      {shortUrl && (
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: `${UVCW_BRAND.spacing.sm}px ${UVCW_BRAND.spacing.md}px`,
            borderRadius: 8,
            marginTop: UVCW_BRAND.spacing.sm,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontFamily: UVCW_BRAND.fonts.body,
              fontSize: UVCW_BRAND.fontSize.sm,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            {shortUrl}
          </span>
        </div>
      )}

      {/* Logo UVCW */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginTop: UVCW_BRAND.spacing.xl,
        }}
      >
        <Logo size={140} />
      </div>

      {/* Ligne décorative */}
      <div
        style={{
          position: "absolute",
          bottom: UVCW_BRAND.spacing.xl,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [50, 70], [0, 200], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 3,
          backgroundColor: "#ffffff",
          opacity: 0.5,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
