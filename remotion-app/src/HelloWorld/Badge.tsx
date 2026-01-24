import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR_2, FONT_FAMILY } from "./constants";

const badgeStyle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  position: "absolute",
  top: 40,
  right: 40,
  backgroundColor: COLOR_2,
  color: "white",
  padding: "12px 24px",
  borderRadius: 8,
};

export const Badge: React.FC<{
  readonly text: string;
}> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation d'entrée avec spring (rebond)
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });

  // Légère rotation pour effet dynamique
  const rotate = interpolate(frame, [0, 15], [-10, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...badgeStyle,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      {text}
    </div>
  );
};
