/**
 * FlowingDocument - Document that moves along a path with trail effect
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { COLORS } from "../config/theme";

interface FlowingDocumentProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startFrame: number;
  duration: number;
  type?: "paper" | "pdf" | "email" | "data";
  size?: number;
  color?: string;
  showTrail?: boolean;
  rotation?: number;
}

export const FlowingDocument: React.FC<FlowingDocumentProps> = ({
  startX,
  startY,
  endX,
  endY,
  startFrame,
  duration,
  type = "paper",
  size = 40,
  color,
  showTrail = true,
  rotation = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame - startFrame,
    [0, duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);

  const opacity = interpolate(
    frame - startFrame,
    [0, 5, duration - 5, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dynamicRotation = rotation + interpolate(progress, [0, 0.5, 1], [-5, 0, 5]);
  const scale = interpolate(progress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.9]);

  if (frame < startFrame || frame > startFrame + duration + 10) return null;

  const docColor = color || COLORS.textMedium;

  // Trail positions
  const trailCount = 4;
  const trails = showTrail
    ? Array.from({ length: trailCount }, (_, i) => {
        const trailProgress = Math.max(0, progress - (i + 1) * 0.08);
        return {
          x: interpolate(trailProgress, [0, 1], [startX, endX]),
          y: interpolate(trailProgress, [0, 1], [startY, endY]),
          opacity: (1 - (i + 1) / (trailCount + 1)) * 0.3 * opacity,
          scale: 1 - (i + 1) * 0.1,
        };
      })
    : [];

  const renderDocument = (docOpacity: number, docScale: number, isTrail = false) => {
    if (type === "paper") {
      return (
        <svg width={size} height={size * 1.3} viewBox="0 0 40 52" style={{ opacity: docOpacity }}>
          <path
            d="M4 4h24l8 8v36c0 2-2 4-4 4H8c-2 0-4-2-4-4V8c0-2 2-4 4-4z"
            fill="white"
            stroke={docColor}
            strokeWidth="2"
          />
          <path d="M28 4v8h8" fill={COLORS.bgAccent} stroke={docColor} strokeWidth="1" />
          {!isTrail && (
            <>
              <rect x="8" y="18" width="20" height="2" rx="1" fill={COLORS.textLight} />
              <rect x="8" y="24" width="16" height="2" rx="1" fill={COLORS.textLight} />
              <rect x="8" y="30" width="18" height="2" rx="1" fill={COLORS.textLight} />
              <rect x="8" y="36" width="12" height="2" rx="1" fill={COLORS.textLight} />
            </>
          )}
        </svg>
      );
    }

    if (type === "pdf") {
      return (
        <svg width={size} height={size * 1.3} viewBox="0 0 40 52" style={{ opacity: docOpacity }}>
          <path
            d="M4 4h24l8 8v36c0 2-2 4-4 4H8c-2 0-4-2-4-4V8c0-2 2-4 4-4z"
            fill="#DC2626"
            stroke="#B91C1C"
            strokeWidth="1"
          />
          <text x="20" y="34" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            PDF
          </text>
        </svg>
      );
    }

    if (type === "email") {
      return (
        <svg width={size} height={size * 0.7} viewBox="0 0 48 32" style={{ opacity: docOpacity }}>
          <rect x="2" y="2" width="44" height="28" rx="4" fill={COLORS.email} />
          <path d="M2 8l22 12 22-12" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      );
    }

    if (type === "data") {
      return (
        <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 32 32" style={{ opacity: docOpacity }}>
          <circle cx="16" cy="16" r="14" fill={COLORS.success} />
          <path d="M10 16l4 4 8-8" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    return null;
  };

  return (
    <>
      {/* Trails */}
      {trails.map((trail, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: trail.x,
            top: trail.y,
            transform: `translate(-50%, -50%) scale(${trail.scale})`,
            pointerEvents: "none",
          }}
        >
          {renderDocument(trail.opacity, trail.scale, true)}
        </div>
      ))}

      {/* Main document */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate(-50%, -50%) rotate(${dynamicRotation}deg) scale(${scale})`,
          pointerEvents: "none",
          filter: `drop-shadow(0 4px 8px ${COLORS.shadow})`,
        }}
      >
        {renderDocument(opacity, scale)}
      </div>
    </>
  );
};
