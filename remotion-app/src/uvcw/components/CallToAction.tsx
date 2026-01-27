import { useCurrentFrame, interpolate, Easing } from "remotion";
import { UVCW_BRAND } from "../config/brand";

interface CallToActionProps {
  text?: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "text"; // badge = fond blanc, text = texte seul
}

const SIZES = {
  sm: { font: 18, padding: "8px 16px" },
  md: { font: 24, padding: "12px 24px" },
  lg: { font: 32, padding: "16px 32px" },
};

export const CallToAction: React.FC<CallToActionProps> = ({
  text = UVCW_BRAND.urls.ctaText,
  animate = true,
  size = "md",
  variant = "badge",
}) => {
  const frame = useCurrentFrame();
  const sizeConfig = SIZES[size];

  const opacity = animate
    ? interpolate(frame, [0, 12], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const scale = animate
    ? interpolate(frame, [0, 8, 15], [0.8, 1.05, 1], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.back(1.5)),
      })
    : 1;

  if (variant === "text") {
    return (
      <div
        style={{
          fontFamily: UVCW_BRAND.fonts.body,
          fontSize: sizeConfig.font,
          fontWeight: 600,
          color: "#ffffff",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {text}
      </div>
    );
  }

  // Variant "badge" - fond blanc, texte foncé
  return (
    <div
      style={{
        fontFamily: UVCW_BRAND.fonts.body,
        fontSize: sizeConfig.font,
        fontWeight: 700,
        color: UVCW_BRAND.colors.secondary.dark,
        backgroundColor: "#ffffff",
        padding: sizeConfig.padding,
        borderRadius: 8,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {text}
    </div>
  );
};
