import { useCurrentFrame, interpolate } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiere, MatiereSlug } from "../config/matieres";

interface TagMatiereProps {
  matiere: MatiereSlug;
  animate?: boolean;
  showHashtag?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { fontSize: 20, padding: "8px 16px", borderRadius: 8 },
  md: { fontSize: 28, padding: "12px 24px", borderRadius: 12 },
  lg: { fontSize: 36, padding: "16px 32px", borderRadius: 16 },
};

export const TagMatiere: React.FC<TagMatiereProps> = ({
  matiere,
  animate = true,
  showHashtag = true,
  size = "md",
}) => {
  const frame = useCurrentFrame();
  const matiereData = getMatiere(matiere);

  if (!matiereData) {
    return null;
  }

  const { fontSize, padding, borderRadius } = SIZES[size];

  const opacity = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.fast], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const translateX = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.fast], [20, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  const bgColor = `#${matiereData.couleur}`;
  const textColor = `#${matiereData.couleurTexte}`;
  const displayText = showHashtag
    ? `#${matiereData.nomCourt.toLowerCase()}`
    : matiereData.nomCourt;

  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: UVCW_BRAND.fonts.label,
        fontSize,
        fontWeight: 700,
        padding,
        borderRadius,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {displayText}
    </div>
  );
};
