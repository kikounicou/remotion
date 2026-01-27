/**
 * ServiceBox - Container for a service/system with icon and label
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";

interface ServiceBoxProps {
  children: React.ReactNode;
  label: string;
  sublabel?: string;
  bgColor?: string;
  borderColor?: string;
  delay?: number;
  width?: number;
  height?: number;
  glowColor?: string;
  badge?: string;
}

export const ServiceBox: React.FC<ServiceBoxProps> = ({
  children,
  label,
  sublabel,
  bgColor = COLORS.bgMedium,
  borderColor = COLORS.bgLight,
  delay = 0,
  width = 120,
  height = 120,
  glowColor,
  badge,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const yOffset = interpolate(entrance, [0, 1], [30, 0]);

  // Glow animation
  const glowIntensity = glowColor
    ? interpolate(Math.sin((frame - delay) * 0.08), [-1, 1], [5, 20])
    : 0;

  // Label animation
  const labelEntrance = spring({
    frame: frame - delay - 10,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `scale(${scale}) translateY(${yOffset}px)`,
      }}
    >
      {/* Main box */}
      <div
        style={{
          width,
          height,
          backgroundColor: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: glowColor
            ? `0 0 ${glowIntensity}px ${glowColor}, 0 4px 20px rgba(0,0,0,0.3)`
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {children}

        {/* Badge */}
        {badge && (
          <div
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              backgroundColor: COLORS.success,
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 10,
              opacity: labelEntrance,
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Labels */}
      <div
        style={{
          textAlign: "center",
          opacity: labelEntrance,
          transform: `translateY(${interpolate(labelEntrance, [0, 1], [10, 0])}px)`,
        }}
      >
        <div
          style={{
            color: COLORS.textPrimary,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              color: COLORS.textSecondary,
              fontSize: 11,
              fontWeight: 400,
              marginTop: 2,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
};
