/**
 * DocumentFlow - Animated document that moves along a path
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";
import { DocumentIcon, JsonIcon, FormIcon } from "../config/icons";

type DocumentType = "pdf" | "json" | "form";

interface DocumentFlowProps {
  type?: DocumentType;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  duration?: number; // in frames
  color?: string;
  size?: number;
  label?: string;
  showTrail?: boolean;
}

export const DocumentFlow: React.FC<DocumentFlowProps> = ({
  type = "pdf",
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  duration = 30,
  color,
  size = 40,
  label,
  showTrail = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Movement progress
  const moveProgress = interpolate(
    frame - delay,
    [0, duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // Current position
  const currentX = interpolate(moveProgress, [0, 1], [startX, endX]);
  const currentY = interpolate(moveProgress, [0, 1], [startY, endY]);

  // Entrance/exit opacity
  const opacity = interpolate(
    frame - delay,
    [0, 5, duration - 5, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slight rotation during movement
  const rotation = interpolate(
    moveProgress,
    [0, 0.5, 1],
    [-5, 0, 5]
  );

  // Scale pulse at start and end
  const scalePulse = interpolate(
    moveProgress,
    [0, 0.1, 0.9, 1],
    [1.2, 1, 1, 1.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Get the appropriate icon
  const getIcon = () => {
    const iconColor = color || (type === "json" ? COLORS.warning : type === "form" ? COLORS.success : COLORS.textSecondary);
    switch (type) {
      case "json":
        return <JsonIcon size={size} color={iconColor} />;
      case "form":
        return <FormIcon size={size} color={iconColor} />;
      default:
        return <DocumentIcon size={size} color={iconColor} />;
    }
  };

  // Trail effect
  const trailPositions = showTrail
    ? [0.7, 0.8, 0.9].map((ratio) => ({
        x: interpolate(ratio * moveProgress, [0, 1], [startX, endX]),
        y: interpolate(ratio * moveProgress, [0, 1], [startY, endY]),
        opacity: 0.2 * ratio,
        scale: 0.6 + 0.2 * ratio,
      }))
    : [];

  if (frame < delay || frame > delay + duration + 10) {
    return null;
  }

  return (
    <>
      {/* Trail */}
      {showTrail &&
        trailPositions.map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform: `translate(-50%, -50%) scale(${pos.scale})`,
              opacity: pos.opacity * opacity,
              pointerEvents: "none",
            }}
          >
            {getIcon()}
          </div>
        ))}

      {/* Main document */}
      <div
        style={{
          position: "absolute",
          left: currentX,
          top: currentY,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scalePulse})`,
          opacity,
          pointerEvents: "none",
          filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
        }}
      >
        {getIcon()}

        {/* Label */}
        {label && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 4,
              fontSize: 10,
              fontWeight: 600,
              color: COLORS.textSecondary,
              whiteSpace: "nowrap",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {label}
          </div>
        )}
      </div>
    </>
  );
};
