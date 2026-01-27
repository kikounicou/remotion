import { useCurrentFrame, interpolate } from "remotion";
import { UVCW_BRAND } from "../config/brand";

interface TitleProps {
  children: React.ReactNode;
  animate?: boolean;
  color?: string;
  size?: "md" | "lg" | "xl" | "xxl";
  align?: "left" | "center" | "right";
  maxWidth?: number;
}

export const Title: React.FC<TitleProps> = ({
  children,
  animate = true,
  color = UVCW_BRAND.colors.secondary.light,
  size = "xl",
  align = "center",
  maxWidth,
}) => {
  const frame = useCurrentFrame();

  const opacity = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.normal], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const translateY = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.normal], [30, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <h1
      style={{
        fontFamily: UVCW_BRAND.fonts.heading,
        fontSize: UVCW_BRAND.fontSize[size],
        fontWeight: 700,
        color,
        textAlign: align,
        lineHeight: 1.2,
        margin: 0,
        maxWidth: maxWidth || "100%",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </h1>
  );
};

interface SubtitleProps {
  children: React.ReactNode;
  animate?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  delay?: number; // frames de délai
}

export const Subtitle: React.FC<SubtitleProps> = ({
  children,
  animate = true,
  color = UVCW_BRAND.colors.secondary.light,
  size = "md",
  align = "center",
  delay = 5,
}) => {
  const frame = useCurrentFrame();

  const opacity = animate
    ? interpolate(
        frame,
        [delay, delay + UVCW_BRAND.animation.normal],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      )
    : 1;

  return (
    <p
      style={{
        fontFamily: UVCW_BRAND.fonts.body,
        fontSize: UVCW_BRAND.fontSize[size],
        fontWeight: 400,
        fontStyle: "italic",
        color,
        textAlign: align,
        lineHeight: 1.4,
        margin: 0,
        opacity,
      }}
    >
      {children}
    </p>
  );
};
