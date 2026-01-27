/**
 * IntroSection - Hook visuel "Du papier au dashboard"
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";
import { DocumentIcon, AIIcon, DashboardIcon } from "../config/icons";

export const IntroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon animations with stagger
  const icon1 = spring({ frame, fps, config: SPRING_CONFIGS.bouncy });
  const icon2 = spring({ frame: frame - 8, fps, config: SPRING_CONFIGS.bouncy });
  const icon3 = spring({ frame: frame - 16, fps, config: SPRING_CONFIGS.bouncy });

  // Arrow animations
  const arrow1 = spring({ frame: frame - 20, fps, config: SPRING_CONFIGS.snappy });
  const arrow2 = spring({ frame: frame - 28, fps, config: SPRING_CONFIGS.snappy });

  // Title animation
  const titleEntrance = spring({ frame: frame - 35, fps, config: SPRING_CONFIGS.smooth });

  // Subtitle animation
  const subtitleEntrance = spring({ frame: frame - 50, fps, config: SPRING_CONFIGS.smooth });

  // Badge animation
  const badgeEntrance = spring({ frame: frame - 65, fps, config: SPRING_CONFIGS.bouncy });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Icon flow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Document icon */}
        <div
          style={{
            opacity: icon1,
            transform: `scale(${interpolate(icon1, [0, 1], [0, 1])}) rotate(${interpolate(icon1, [0, 1], [-20, 0])}deg)`,
          }}
        >
          <DocumentIcon size={80} color={COLORS.textSecondary} />
        </div>

        {/* Arrow 1 */}
        <svg width="60" height="24" style={{ opacity: arrow1 }}>
          <defs>
            <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.textSecondary} />
              <stop offset="100%" stopColor={COLORS.accent1} />
            </linearGradient>
          </defs>
          <path
            d="M 0 12 L 45 12 M 35 4 L 50 12 L 35 20"
            stroke="url(#arrowGrad1)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="60"
            strokeDashoffset={interpolate(arrow1, [0, 1], [60, 0])}
          />
        </svg>

        {/* AI/Robot icon */}
        <div
          style={{
            opacity: icon2,
            transform: `scale(${interpolate(icon2, [0, 1], [0, 1])})`,
          }}
        >
          <div
            style={{
              filter: `drop-shadow(0 0 ${interpolate(Math.sin(frame * 0.1), [-1, 1], [10, 25])}px ${COLORS.accent1})`,
            }}
          >
            <AIIcon size={80} color={COLORS.accent1} />
          </div>
        </div>

        {/* Arrow 2 */}
        <svg width="60" height="24" style={{ opacity: arrow2 }}>
          <defs>
            <linearGradient id="arrowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.accent1} />
              <stop offset="100%" stopColor={COLORS.success} />
            </linearGradient>
          </defs>
          <path
            d="M 0 12 L 45 12 M 35 4 L 50 12 L 35 20"
            stroke="url(#arrowGrad2)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="60"
            strokeDashoffset={interpolate(arrow2, [0, 1], [60, 0])}
          />
        </svg>

        {/* Dashboard icon */}
        <div
          style={{
            opacity: icon3,
            transform: `scale(${interpolate(icon3, [0, 1], [0, 1])}) rotate(${interpolate(icon3, [0, 1], [20, 0])}deg)`,
          }}
        >
          <DashboardIcon size={80} color={COLORS.success} />
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.textPrimary,
            margin: 0,
            fontFamily: "Inter, system-ui, sans-serif",
            opacity: titleEntrance,
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [40, 0])}px)`,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Du{" "}
          <span style={{ color: COLORS.textSecondary }}>papier</span>
          {" "}au{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            dashboard
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.textSecondary,
            margin: "20px 0 0 0",
            fontFamily: "Inter, system-ui, sans-serif",
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`,
          }}
        >
          Traitement automatisé des évaluations de formations
        </p>
      </div>

      {/* Badge */}
      <div
        style={{
          display: "flex",
          gap: 20,
          opacity: badgeEntrance,
          transform: `scale(${interpolate(badgeEntrance, [0, 1], [0.8, 1])})`,
        }}
      >
        <div
          style={{
            padding: "12px 24px",
            borderRadius: 30,
            backgroundColor: COLORS.bgMedium,
            border: `1px solid ${COLORS.bgLight}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>⚡</span>
          <span
            style={{
              color: COLORS.textPrimary,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            2 minutes
          </span>
        </div>

        <div
          style={{
            padding: "12px 24px",
            borderRadius: 30,
            backgroundColor: COLORS.bgMedium,
            border: `1px solid ${COLORS.bgLight}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>🤖</span>
          <span
            style={{
              color: COLORS.textPrimary,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            100% automatisé
          </span>
        </div>
      </div>

      {/* UVCW branding */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          opacity: badgeEntrance * 0.7,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: COLORS.uvcw.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 12,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          UVCW
        </div>
        <span
          style={{
            color: COLORS.textMuted,
            fontSize: 14,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Union des Villes et Communes de Wallonie
        </span>
      </div>
    </div>
  );
};
