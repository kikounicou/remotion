/**
 * SectionTitle - Animated section header with step number
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";

interface SectionTitleProps {
  stepNumber?: number | string;
  title: string;
  subtitle?: string;
  delay?: number;
  accentColor?: string;
  position?: "top-left" | "top-center" | "center";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  stepNumber,
  title,
  subtitle,
  delay = 0,
  accentColor = COLORS.accent1,
  position = "top-left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge animation
  const badgeEntrance = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Title animation
  const titleEntrance = spring({
    frame: frame - delay - 5,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  // Subtitle animation
  const subtitleEntrance = spring({
    frame: frame - delay - 12,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Line animation
  const lineWidth = interpolate(titleEntrance, [0, 1], [0, 100], {
    extrapolateRight: "clamp",
  });

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    ...(position === "top-left" && { top: 60, left: 80 }),
    ...(position === "top-center" && { top: 60, left: "50%", transform: "translateX(-50%)", alignItems: "center" }),
    ...(position === "center" && { top: "50%", left: "50%", transform: "translate(-50%, -50%)", alignItems: "center" }),
  };

  return (
    <div style={containerStyle}>
      {/* Step badge */}
      {stepNumber && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: badgeEntrance,
            transform: `scale(${interpolate(badgeEntrance, [0, 1], [0.5, 1])})`,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: `0 0 20px ${accentColor}50`,
            }}
          >
            {stepNumber}
          </div>
          <div
            style={{
              height: 2,
              width: lineWidth,
              backgroundColor: accentColor,
              opacity: 0.5,
            }}
          />
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          color: COLORS.textPrimary,
          fontSize: 42,
          fontWeight: 700,
          fontFamily: "Inter, system-ui, sans-serif",
          margin: 0,
          opacity: titleEntrance,
          transform: `translateX(${interpolate(titleEntrance, [0, 1], [-30, 0])}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            color: COLORS.textSecondary,
            fontSize: 20,
            fontWeight: 400,
            fontFamily: "Inter, system-ui, sans-serif",
            margin: 0,
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [15, 0])}px)`,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
