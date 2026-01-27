/**
 * ImportSection - ColdFusion import + GPT correction
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";
import { SectionTitle, ServiceBox, FlowArrow } from "../components";
import { ServerIcon, AIIcon, JsonIcon, BuildingIcon } from "../config/icons";

export const ImportSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // OCR correction animation
  const correctionDelay = 90;
  const showCorrection = frame > correctionDelay;

  const corrections = [
    { before: "fomration", after: "formation" },
    { before: "excellant", after: "excellent" },
    { before: "trés bien", after: "très bien" },
  ];

  const activeCorrection = Math.floor(
    interpolate(
      frame - correctionDelay,
      [0, 90],
      [0, corrections.length],
      { extrapolateRight: "clamp" }
    )
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <SectionTitle
        stepNumber={4}
        title="Import & Correction IA"
        subtitle="Webhook vers l'intranet UVCW"
        accentColor={COLORS.uvcw.primary}
      />

      {/* Intranet container */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          bottom: 140,
          backgroundColor: `${COLORS.uvcw.primary}15`,
          border: `2px solid ${COLORS.uvcw.primary}30`,
          borderRadius: 24,
          opacity: spring({ frame, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -15,
            left: 30,
            backgroundColor: COLORS.uvcw.primary,
            color: "white",
            padding: "6px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          🏢 INTRANET UVCW
        </div>
      </div>

      {/* Flow: Webhook -> ColdFusion -> SQL -> GPT -> Done */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 150,
          display: "flex",
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* JSON Input */}
        <ServiceBox label="Webhook" sublabel="POST JSON" delay={15} width={100} height={100}>
          <JsonIcon size={48} color={COLORS.warning} />
        </ServiceBox>

        {/* Arrow */}
        <FlowArrow startX={250} startY={400} endX={350} endY={400} delay={30} color={COLORS.warning} />

        {/* ColdFusion */}
        <ServiceBox
          label="ColdFusion"
          sublabel="Import"
          delay={40}
          glowColor={COLORS.info}
          width={120}
          height={120}
        >
          <ServerIcon size={56} color={COLORS.info} />
        </ServiceBox>

        {/* Arrow */}
        <FlowArrow startX={520} startY={400} endX={620} endY={400} delay={55} color={COLORS.info} />

        {/* SQL Server */}
        <ServiceBox label="SQL Server" sublabel="Stockage" delay={65} width={110} height={110}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: "#003366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            SQL
          </div>
        </ServiceBox>

        {/* Arrow */}
        <FlowArrow startX={780} startY={400} endX={880} endY={400} delay={80} color={COLORS.accent2} curved />

        {/* GPT */}
        <ServiceBox
          label="GPT-4o-mini"
          sublabel="Correction OCR"
          delay={95}
          glowColor={COLORS.accent3}
          width={130}
          height={130}
        >
          <AIIcon size={60} color={COLORS.accent3} />
        </ServiceBox>

        {/* Arrow back */}
        <FlowArrow
          startX={1060}
          startY={400}
          endX={1160}
          endY={400}
          delay={110}
          color={COLORS.success}
        />

        {/* Final */}
        <ServiceBox
          label="Données"
          sublabel="Nettoyées"
          delay={120}
          glowColor={COLORS.success}
          badge="OK"
          width={100}
          height={100}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: COLORS.success,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            ✓
          </div>
        </ServiceBox>
      </div>

      {/* OCR Correction visualization */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: COLORS.bgMedium,
          border: `1px solid ${COLORS.bgLight}`,
          borderRadius: 16,
          padding: 24,
          opacity: spring({ frame: frame - 100, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            marginBottom: 16,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          🤖 Correction automatique des erreurs OCR
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {corrections.map((item, index) => {
            const isActive = index < activeCorrection;
            const progress = spring({
              frame: frame - correctionDelay - index * 30,
              fps,
              config: SPRING_CONFIGS.snappy,
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: progress,
                }}
              >
                {/* Before */}
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 16,
                    color: COLORS.error,
                    textDecoration: isActive ? "line-through" : "none",
                    opacity: isActive ? 0.5 : 1,
                  }}
                >
                  {item.before}
                </span>

                {/* Arrow */}
                <span style={{ color: COLORS.textMuted }}>→</span>

                {/* After */}
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 16,
                    color: COLORS.success,
                    fontWeight: 600,
                    opacity: isActive ? 1 : 0.3,
                  }}
                >
                  {item.after}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 100,
          display: "flex",
          gap: 24,
          opacity: spring({ frame: frame - 130, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.accent3,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            ~0.01€
          </div>
          <div
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            par correction
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.success,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            +95%
          </div>
          <div
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            précision
          </div>
        </div>
      </div>
    </div>
  );
};
