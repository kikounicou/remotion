/**
 * N8NSection - Automation workflow
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, SPRING_CONFIGS } from "../config/theme";
import { SectionTitle, ServiceBox, FlowArrow, DocumentFlow } from "../components";
import { N8NIcon, EmailIcon, S3Icon, CheckIcon } from "../config/icons";

export const N8NSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Checklist items animation
  const checklistItems = [
    { label: "Email reçu", delay: 40 },
    { label: "PDF vérifié", delay: 55 },
    { label: "Fichier renommé", delay: 70 },
    { label: "Upload S3", delay: 85 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <SectionTitle
        stepNumber={2}
        title="Automatisation N8N"
        subtitle="Validation et transfert vers AWS"
        accentColor={COLORS.n8n.primary}
      />

      {/* Main flow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        {/* Email input */}
        <ServiceBox label="Email" sublabel="Inbox" delay={10}>
          <EmailIcon size={56} color={COLORS.info} />
        </ServiceBox>

        {/* Arrow to N8N */}
        <svg width="80" height="40">
          <defs>
            <linearGradient id="n8nArrow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.info} />
              <stop offset="100%" stopColor={COLORS.n8n.primary} />
            </linearGradient>
          </defs>
          <path
            d="M 0 20 L 60 20 M 50 10 L 70 20 L 50 30"
            stroke="url(#n8nArrow)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity={spring({ frame: frame - 25, fps, config: SPRING_CONFIGS.smooth })}
          />
        </svg>

        {/* N8N Box */}
        <div style={{ position: "relative" }}>
          <ServiceBox
            label="N8N Workflow"
            sublabel="Automatisation"
            delay={30}
            glowColor={COLORS.n8n.primary}
            width={200}
            height={200}
          >
            <N8NIcon size={72} color={COLORS.n8n.primary} />
          </ServiceBox>

          {/* Checklist overlay */}
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -180,
              backgroundColor: COLORS.bgMedium,
              border: `1px solid ${COLORS.n8n.primary}40`,
              borderRadius: 12,
              padding: 16,
              minWidth: 160,
            }}
          >
            {checklistItems.map((item, index) => {
              const itemProgress = spring({
                frame: frame - item.delay,
                fps,
                config: SPRING_CONFIGS.snappy,
              });

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: index < checklistItems.length - 1 ? 8 : 0,
                    opacity: itemProgress,
                    transform: `translateX(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                  }}
                >
                  <CheckIcon size={18} color={COLORS.success} />
                  <span
                    style={{
                      color: COLORS.textPrimary,
                      fontSize: 13,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow to S3 */}
        <svg width="80" height="40">
          <defs>
            <linearGradient id="s3Arrow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.n8n.primary} />
              <stop offset="100%" stopColor={COLORS.aws.s3} />
            </linearGradient>
          </defs>
          <path
            d="M 0 20 L 60 20 M 50 10 L 70 20 L 50 30"
            stroke="url(#s3Arrow)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity={spring({ frame: frame - 95, fps, config: SPRING_CONFIGS.smooth })}
          />
        </svg>

        {/* S3 Output */}
        <ServiceBox label="S3 Bucket" sublabel="temp/" delay={100} glowColor={COLORS.aws.s3}>
          <S3Icon size={56} color={COLORS.aws.s3} />
        </ServiceBox>
      </div>

      {/* Document flow animation */}
      <DocumentFlow
        type="pdf"
        startX={500}
        startY={480}
        endX={960}
        endY={480}
        delay={35}
        duration={40}
        color={COLORS.error}
        showTrail
      />
      <DocumentFlow
        type="pdf"
        startX={1100}
        startY={480}
        endX={1420}
        endY={480}
        delay={100}
        duration={30}
        color={COLORS.aws.s3}
        label="xxxx.pdf"
      />

      {/* Code snippet */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          backgroundColor: "#1a1a2e",
          border: `1px solid ${COLORS.bgLight}`,
          borderRadius: 12,
          padding: 20,
          fontFamily: "JetBrains Mono, Consolas, monospace",
          fontSize: 14,
          opacity: spring({ frame: frame - 110, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div style={{ color: COLORS.textMuted, marginBottom: 8 }}>
          // Nom de fichier généré
        </div>
        <div>
          <span style={{ color: COLORS.accent2 }}>const</span>{" "}
          <span style={{ color: COLORS.textPrimary }}>filename</span>{" "}
          <span style={{ color: COLORS.textSecondary }}>=</span>{" "}
          <span style={{ color: COLORS.success }}>"aBcD.pdf"</span>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 80,
          display: "flex",
          gap: 30,
          opacity: spring({ frame: frame - 120, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.n8n.primary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            24/7
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textSecondary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Surveillance
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.success,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            &lt;1s
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textSecondary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Traitement
          </div>
        </div>
      </div>
    </div>
  );
};
