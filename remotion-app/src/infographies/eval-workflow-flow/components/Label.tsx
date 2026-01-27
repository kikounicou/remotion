/**
 * Label - Simple animated text label
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";

interface LabelProps {
  text: string;
  x: number;
  y: number;
  startFrame: number;
  duration?: number;
  color?: string;
  size?: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
}

export const Label: React.FC<LabelProps> = ({
  text,
  x,
  y,
  startFrame,
  duration = 60,
  color = COLORS.textDark,
  size = "medium",
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const exit = duration
    ? interpolate(
        frame - startFrame,
        [duration - 15, duration],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  const opacity = Math.min(entrance, exit);
  const yOffset = interpolate(entrance, [0, 1], [15, 0]);

  if (frame < startFrame || (duration && frame > startFrame + duration)) return null;

  const fontSize = size === "small" ? 14 : size === "large" ? 24 : 18;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${align === "center" ? "-50%" : align === "right" ? "-100%" : "0"}, -50%) translateY(${yOffset}px)`,
        opacity,
        color,
        fontSize,
        fontWeight: 600,
        fontFamily: "Inter, system-ui, sans-serif",
        whiteSpace: "nowrap",
        textShadow: "0 1px 2px rgba(255,255,255,0.8)",
        pointerEvents: "none",
      }}
    >
      {text}
    </div>
  );
};
