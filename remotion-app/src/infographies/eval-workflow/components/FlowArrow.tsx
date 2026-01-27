/**
 * FlowArrow - Animated arrow that draws itself between two points
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

interface FlowArrowProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  color?: string;
  strokeWidth?: number;
  curved?: boolean;
  dashed?: boolean;
  showArrowHead?: boolean;
  animateFlow?: boolean; // Flowing dots animation
  label?: string;
}

export const FlowArrow: React.FC<FlowArrowProps> = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  color = COLORS.textSecondary,
  strokeWidth = 3,
  curved = false,
  dashed = false,
  showArrowHead = true,
  animateFlow = false,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate path
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Draw animation
  const drawProgress = spring({
    frame: frame - delay,
    fps,
    config: { ...SPRING_CONFIGS.smooth, damping: 100 },
  });

  // Curved path calculation
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const curveOffset = curved ? Math.min(length * 0.3, 60) : 0;

  // Perpendicular offset for curve
  const perpX = -deltaY / length;
  const perpY = deltaX / length;
  const controlX = midX + perpX * curveOffset;
  const controlY = midY + perpY * curveOffset;

  const pathD = curved
    ? `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
    : `M ${startX} ${startY} L ${endX} ${endY}`;

  // Arrow head calculation
  const arrowLength = 12;
  const arrowAngle = Math.PI / 6;
  const angle = Math.atan2(deltaY, deltaX);

  const arrowPath = showArrowHead
    ? `M ${endX} ${endY}
       L ${endX - arrowLength * Math.cos(angle - arrowAngle)} ${endY - arrowLength * Math.sin(angle - arrowAngle)}
       M ${endX} ${endY}
       L ${endX - arrowLength * Math.cos(angle + arrowAngle)} ${endY - arrowLength * Math.sin(angle + arrowAngle)}`
    : "";

  // Flowing dots animation
  const flowOffset = animateFlow
    ? interpolate(
        (frame - delay) % 30,
        [0, 30],
        [0, 20],
        { extrapolateRight: "clamp" }
      )
    : 0;

  // Stroke dash animation
  const pathLength = curved ? length * 1.2 : length; // Approximation for curve
  const dashOffset = interpolate(drawProgress, [0, 1], [pathLength, 0]);

  // Label position
  const labelX = curved ? controlX : midX;
  const labelY = curved ? controlY - 20 : midY - 15;

  const labelOpacity = spring({
    frame: frame - delay - 15,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* Main path */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashed ? "8 6" : pathLength}
        strokeDashoffset={dashed ? flowOffset : dashOffset}
        opacity={0.9}
      />

      {/* Arrow head */}
      {showArrowHead && (
        <path
          d={arrowPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={drawProgress}
        />
      )}

      {/* Flowing dot (particle effect) */}
      {animateFlow && drawProgress > 0.9 && (
        <circle
          cx={interpolate(
            ((frame - delay) % 60) / 60,
            [0, 1],
            [startX, endX]
          )}
          cy={interpolate(
            ((frame - delay) % 60) / 60,
            [0, 1],
            [startY, endY]
          )}
          r={4}
          fill={color}
          opacity={0.8}
        />
      )}

      {/* Label */}
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fill={COLORS.textSecondary}
          fontSize={12}
          fontWeight={500}
          opacity={labelOpacity}
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          {label}
        </text>
      )}
    </svg>
  );
};
