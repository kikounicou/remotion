import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { UVCW_BRAND } from "../config/brand";

interface LogoProps {
  size?: number;
  animate?: boolean;
  variant?: "full" | "icon";
}

export const Logo: React.FC<LogoProps> = ({
  size = 120,
  animate = true,
  variant = "full",
}) => {
  const frame = useCurrentFrame();

  const opacity = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.normal], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const scale = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.normal], [0.8, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <Img
        src={staticFile("uvcw/logos/logo_uvcw.png")}
        style={{
          height: size,
          width: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
