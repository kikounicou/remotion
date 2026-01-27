/**
 * AnimatedIcon - Wrapper for icons with entrance animations
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { SPRING_CONFIGS } from "../config/theme";

interface AnimatedIconProps {
  children: React.ReactNode;
  delay?: number;
  label?: string;
  labelPosition?: "bottom" | "top" | "right" | "left";
  labelColor?: string;
  pulseEffect?: boolean;
  glowColor?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  delay = 0,
  label,
  labelPosition = "bottom",
  labelColor = "#FFFFFF",
  pulseEffect = false,
  glowColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulse effect (breathing animation)
  const pulseScale = pulseEffect
    ? 1 + Math.sin((frame - delay) * 0.1) * 0.05
    : 1;

  // Glow animation
  const glowIntensity = glowColor
    ? interpolate(Math.sin((frame - delay) * 0.15), [-1, 1], [10, 25])
    : 0;

  // Label animation (appears slightly after icon)
  const labelEntrance = spring({
    frame: frame - delay - 8,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    fontSize: 14,
    fontWeight: 600,
    color: labelColor,
    whiteSpace: "nowrap",
    opacity: labelEntrance,
    transform: `translateY(${interpolate(labelEntrance, [0, 1], [10, 0])}px)`,
    ...(labelPosition === "bottom" && { top: "100%", marginTop: 8, left: "50%", transform: `translateX(-50%) translateY(${interpolate(labelEntrance, [0, 1], [10, 0])}px)` }),
    ...(labelPosition === "top" && { bottom: "100%", marginBottom: 8, left: "50%", transform: `translateX(-50%) translateY(${interpolate(labelEntrance, [0, 1], [-10, 0])}px)` }),
    ...(labelPosition === "right" && { left: "100%", marginLeft: 12, top: "50%", transform: `translateY(-50%) translateX(${interpolate(labelEntrance, [0, 1], [10, 0])}px)` }),
    ...(labelPosition === "left" && { right: "100%", marginRight: 12, top: "50%", transform: `translateY(-50%) translateX(${interpolate(labelEntrance, [0, 1], [-10, 0])}px)` }),
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale * pulseScale})`,
        filter: glowColor
          ? `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`
          : undefined,
      }}
    >
      {children}
      {label && <div style={labelStyle}>{label}</div>}
    </div>
  );
};
