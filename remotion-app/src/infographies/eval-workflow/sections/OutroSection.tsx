/**
 * OutroSection - Recap timeline and final stats
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";
import {
  DocumentIcon,
  ScannerIcon,
  N8NIcon,
  LambdaIcon,
  ServerIcon,
  DashboardIcon,
} from "../config/icons";

export const OutroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline steps
  const steps = [
    { icon: DocumentIcon, label: "Formulaire", color: COLORS.textSecondary },
    { icon: ScannerIcon, label: "Scan", color: COLORS.accent1 },
    { icon: N8NIcon, label: "N8N", color: COLORS.n8n.primary },
    { icon: LambdaIcon, label: "AWS", color: COLORS.aws.primary },
    { icon: ServerIcon, label: "Import", color: COLORS.info },
    { icon: DashboardIcon, label: "Dashboard", color: COLORS.success },
  ];

  // Stats
  const stats = [
    { value: "2", unit: "min", label: "Traitement", icon: "⚡" },
    { value: "0", unit: "", label: "Intervention manuelle", icon: "🤖" },
    { value: "~0.10", unit: "€", label: "Par formulaire", icon: "💰" },
    { value: "1600", unit: "€/an", label: "Coût estimé (8000 evals)", icon: "📊" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          opacity: spring({ frame, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: 0,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Récapitulatif du workflow
        </h2>
      </div>

      {/* Timeline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const stepEntrance = spring({
            frame: frame - 15 - index * 8,
            fps,
            config: SPRING_CONFIGS.bouncy,
          });

          // Line animation (between icons)
          const lineProgress = spring({
            frame: frame - 20 - index * 8,
            fps,
            config: { damping: 100 },
          });

          return (
            <React.Fragment key={index}>
              {/* Step */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  opacity: stepEntrance,
                  transform: `scale(${interpolate(stepEntrance, [0, 1], [0.5, 1])}) translateY(${interpolate(stepEntrance, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    backgroundColor: COLORS.bgMedium,
                    border: `2px solid ${step.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 20px ${step.color}30`,
                  }}
                >
                  <Icon size={36} color={step.color} />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: COLORS.textSecondary,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <svg width="40" height="20" style={{ opacity: lineProgress }}>
                  <defs>
                    <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={step.color} />
                      <stop offset="100%" stopColor={steps[index + 1].color} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 10 L 30 10 M 22 4 L 35 10 L 22 16"
                    stroke={`url(#grad-${index})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="50"
                    strokeDashoffset={interpolate(lineProgress, [0, 1], [50, 0])}
                  />
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 20,
        }}
      >
        {stats.map((stat, index) => {
          const statEntrance = spring({
            frame: frame - 80 - index * 10,
            fps,
            config: SPRING_CONFIGS.bouncy,
          });

          return (
            <div
              key={index}
              style={{
                backgroundColor: COLORS.bgMedium,
                border: `1px solid ${COLORS.bgLight}`,
                borderRadius: 16,
                padding: "24px 32px",
                textAlign: "center",
                minWidth: 160,
                opacity: statEntrance,
                transform: `scale(${interpolate(statEntrance, [0, 1], [0.8, 1])}) translateY(${interpolate(statEntrance, [0, 1], [30, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: COLORS.textPrimary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span
                    style={{
                      fontSize: 18,
                      color: COLORS.textSecondary,
                    }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.textSecondary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* UVCW branding */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: spring({ frame: frame - 130, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 12,
            backgroundColor: COLORS.uvcw.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 30px ${COLORS.uvcw.primary}50`,
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: 14,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            UVCW
          </span>
        </div>
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Union des Villes et Communes de Wallonie
          </div>
          <div
            style={{
              fontSize: 13,
              color: COLORS.textMuted,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Service Formations • Automatisation 2026
          </div>
        </div>
      </div>
    </div>
  );
};
