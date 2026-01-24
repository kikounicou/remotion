import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR_1, FONT_FAMILY } from "./constants";

const subtitle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: 36,
  textAlign: "center",
  position: "absolute",
  bottom: 120,
  width: "100%",
};

const highlightStyle: React.CSSProperties = {
  color: COLOR_1,
  fontWeight: "bold",
};

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation de fondu avec interpolate
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animation de translation avec spring
  const translateY = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const yOffset = interpolate(translateY, [0, 1], [30, 0]);

  return (
    <div
      style={{
        ...subtitle,
        opacity,
        transform: `translateY(${yOffset}px)`,
      }}
    >
      Concepts: <span style={highlightStyle}>useCurrentFrame()</span>,{" "}
      <span style={highlightStyle}>interpolate()</span>,{" "}
      <span style={highlightStyle}>spring()</span>
    </div>
  );
};
