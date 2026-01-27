/**
 * ParticleBackground - Subtle animated background with floating particles
 */

import React from "react";
import { useCurrentFrame, random, interpolate } from "remotion";
import { COLORS } from "../config/theme";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 30,
  colors = [COLORS.accent1, COLORS.accent2, COLORS.aws.primary, COLORS.azure.primary],
}) => {
  const frame = useCurrentFrame();

  // Generate particles deterministically using random()
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: random(`particle-x-${i}`) * 1920,
      y: random(`particle-y-${i}`) * 1080,
      size: random(`particle-size-${i}`) * 3 + 1,
      speed: random(`particle-speed-${i}`) * 0.5 + 0.2,
      opacity: random(`particle-opacity-${i}`) * 0.3 + 0.1,
      color: colors[Math.floor(random(`particle-color-${i}`) * colors.length)],
    }));
  }, [particleCount, colors]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 20% 20%, ${COLORS.accent1}10 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${COLORS.accent2}10 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${COLORS.bgMedium}50 0%, transparent 70%)
          `,
        }}
      />

      {/* Particles */}
      {particles.map((particle) => {
        const yOffset = (frame * particle.speed) % 1200;
        const currentY = (particle.y + yOffset) % 1200 - 60;
        const pulseOpacity =
          particle.opacity *
          interpolate(Math.sin(frame * 0.05 + particle.id), [-1, 1], [0.5, 1]);

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: particle.x,
              top: currentY,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: particle.color,
              opacity: pulseOpacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        );
      })}

      {/* Grid lines (subtle) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
        }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={COLORS.textPrimary}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
