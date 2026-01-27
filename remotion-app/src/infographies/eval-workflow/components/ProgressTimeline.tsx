/**
 * ProgressTimeline - Bottom progress bar showing current step
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";

interface Step {
  label: string;
  icon?: string;
  color?: string;
}

interface ProgressTimelineProps {
  steps: Step[];
  currentStep: number;
  progress?: number; // 0-1 progress within current step
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  steps,
  currentStep,
  progress = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall progress
  const totalProgress = (currentStep + progress) / steps.length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 80,
        right: 80,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          height: 6,
          backgroundColor: COLORS.bgLight,
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Filled portion */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${totalProgress * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.accent1}, ${COLORS.accent2})`,
            borderRadius: 3,
            transition: "width 0.3s ease-out",
          }}
        />

        {/* Glow effect at the end */}
        <div
          style={{
            position: "absolute",
            top: -4,
            left: `${totalProgress * 100}%`,
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: COLORS.accent2,
            transform: "translateX(-50%)",
            boxShadow: `0 0 15px ${COLORS.accent2}`,
            opacity: interpolate(Math.sin(frame * 0.15), [-1, 1], [0.5, 1]),
          }}
        />
      </div>

      {/* Step indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                opacity: isComplete ? 1 : isActive ? 1 : 0.4,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  borderRadius: "50%",
                  backgroundColor: isComplete
                    ? COLORS.success
                    : isActive
                    ? COLORS.accent2
                    : COLORS.bgLight,
                  boxShadow: isActive
                    ? `0 0 10px ${COLORS.accent2}`
                    : undefined,
                  transition: "all 0.3s ease",
                }}
              />

              {/* Label */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? COLORS.textPrimary : COLORS.textSecondary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
