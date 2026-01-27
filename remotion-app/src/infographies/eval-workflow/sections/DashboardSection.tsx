/**
 * DashboardSection - Final dashboard visualization
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
import { SectionTitle } from "../components";

export const DashboardSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated counter
  const counterValue = interpolate(
    frame,
    [30, 90],
    [0, 4.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Bar chart data
  const bars = [
    { label: "Contenu", value: 85, color: COLORS.accent1, delay: 40 },
    { label: "Animation", value: 92, color: COLORS.accent2, delay: 50 },
    { label: "Conditions", value: 78, color: COLORS.accent4, delay: 60 },
    { label: "Global", value: 88, color: COLORS.success, delay: 70 },
  ];

  // Dashboard entrance
  const dashboardEntrance = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <SectionTitle
        stepNumber={5}
        title="Dashboard"
        subtitle="Visualisation et vérification des résultats"
        accentColor={COLORS.success}
      />

      {/* Dashboard mockup */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) scale(${interpolate(dashboardEntrance, [0, 1], [0.9, 1])})`,
          width: 1200,
          height: 550,
          backgroundColor: COLORS.bgMedium,
          borderRadius: 20,
          border: `2px solid ${COLORS.bgLight}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          overflow: "hidden",
          opacity: dashboardEntrance,
        }}
      >
        {/* Browser header */}
        <div
          style={{
            height: 40,
            backgroundColor: COLORS.bgLight,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div
            style={{
              marginLeft: 20,
              flex: 1,
              height: 24,
              backgroundColor: COLORS.bgDark,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              fontSize: 12,
              color: COLORS.textMuted,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            🔒 intranet.uvcw.be/formations/evaluations/dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <div
          style={{
            display: "flex",
            height: "calc(100% - 40px)",
          }}
        >
          {/* Left panel - Stats */}
          <div
            style={{
              width: 350,
              padding: 24,
              borderRight: `1px solid ${COLORS.bgLight}`,
            }}
          >
            {/* Score card */}
            <div
              style={{
                backgroundColor: COLORS.bgDark,
                borderRadius: 16,
                padding: 24,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  color: COLORS.textSecondary,
                  marginBottom: 8,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Note moyenne
              </div>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: COLORS.success,
                  fontFamily: "Inter, system-ui, sans-serif",
                  lineHeight: 1,
                }}
              >
                {counterValue.toFixed(1)}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.textMuted,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                / 5
              </div>

              {/* Stars */}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= Math.round(counterValue);
                  return (
                    <span
                      key={star}
                      style={{
                        fontSize: 24,
                        opacity: spring({
                          frame: frame - 40 - star * 5,
                          fps,
                          config: SPRING_CONFIGS.bouncy,
                        }),
                      }}
                    >
                      {filled ? "⭐" : "☆"}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ marginTop: 20 }}>
              {bars.map((bar, index) => {
                const barProgress = spring({
                  frame: frame - bar.delay,
                  fps,
                  config: SPRING_CONFIGS.smooth,
                });
                const width = interpolate(barProgress, [0, 1], [0, bar.value]);

                return (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                        fontSize: 12,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      <span style={{ color: COLORS.textSecondary }}>{bar.label}</span>
                      <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>
                        {Math.round(width)}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        backgroundColor: COLORS.bgDark,
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${width}%`,
                          backgroundColor: bar.color,
                          borderRadius: 4,
                          boxShadow: `0 0 10px ${bar.color}50`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel - PDF viewer mockup */}
          <div style={{ flex: 1, padding: 24 }}>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textSecondary,
                marginBottom: 16,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              📄 Vérification visuelle avec highlighting
            </div>

            {/* PDF mockup */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 20,
                height: 380,
                position: "relative",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Form header */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: 16,
                  fontFamily: "Georgia, serif",
                }}
              >
                FORMULAIRE D'ÉVALUATION
              </div>

              {/* Form rows mockup */}
              {[0, 1, 2, 3].map((row) => {
                const isHighlighted = row === 1;
                const rowEntrance = spring({
                  frame: frame - 80 - row * 10,
                  fps,
                  config: SPRING_CONFIGS.smooth,
                });

                return (
                  <div
                    key={row}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      padding: "8px 12px",
                      borderRadius: 6,
                      backgroundColor: isHighlighted ? `${COLORS.success}30` : "transparent",
                      border: isHighlighted ? `2px solid ${COLORS.success}` : "2px solid transparent",
                      opacity: rowEntrance,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 12,
                        backgroundColor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginLeft: 20,
                      }}
                    >
                      {[1, 2, 3, 4].map((box) => (
                        <div
                          key={box}
                          style={{
                            width: 20,
                            height: 20,
                            border: "2px solid #9ca3af",
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: box === 4 && isHighlighted ? COLORS.success : "transparent",
                          }}
                        >
                          {box === 4 && isHighlighted && (
                            <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Highlight badge */}
              {frame > 100 && (
                <div
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 100,
                    backgroundColor: COLORS.success,
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "Inter, system-ui, sans-serif",
                    opacity: spring({ frame: frame - 100, fps, config: SPRING_CONFIGS.bouncy }),
                    boxShadow: `0 0 15px ${COLORS.success}`,
                  }}
                >
                  Réponse détectée: 4/4
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
