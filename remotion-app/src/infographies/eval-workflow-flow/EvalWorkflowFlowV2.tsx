/**
 * EvalWorkflowFlowV2 - Dynamic zoom in/out camera animation
 * Format: 1080x1080 (square)
 * Style: Dark blue/black background, camera movements
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Audio,
  staticFile,
} from "remotion";
import { SPRING_CONFIGS } from "./config/theme";

// Duration: ~20 seconds at 30fps = 600 frames
export const EVAL_FLOW_V2_DURATION = 600;

// Dark theme colors
const DARK_THEME = {
  background: "#0A0F1C",
  backgroundGradient: "radial-gradient(ellipse at center, #1a2744 0%, #0A0F1C 70%)",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  cardBg: "rgba(30, 41, 59, 0.8)",
  cardBorder: "rgba(100, 116, 139, 0.3)",
  accent: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  // Service colors
  scanner: "#6366F1",
  n8n: "#EC4899",
  s3: "#10B981",
  lambda: "#FF9900",
  azure: "#0078D4",
};

// Compact layout - everything fits in ~800x800 area centered
// Row 1: Scanner -> N8N -> S3 -> Lambda (y: 100)
// Row 2: Split PDFs (y: 280)
// Row 3: Analysis (y: 420)
// Row 4: Data + Dashboard (y: 600)

// No camera movement - elements animate in place
// The rhythm comes from spring animations on each element
const CAMERA_KEYFRAMES = [
  { frame: 0, x: 0, y: 0, scale: 1.0 },
  { frame: 600, x: 0, y: 0, scale: 1.0 },
];

// Interpolate camera position
const getCameraTransform = (frame: number) => {
  let x = CAMERA_KEYFRAMES[0].x;
  let y = CAMERA_KEYFRAMES[0].y;
  let scale = CAMERA_KEYFRAMES[0].scale;

  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    const current = CAMERA_KEYFRAMES[i];
    const next = CAMERA_KEYFRAMES[i + 1];

    if (frame >= current.frame && frame <= next.frame) {
      const progress = interpolate(
        frame,
        [current.frame, next.frame],
        [0, 1],
        { easing: Easing.inOut(Easing.cubic) }
      );

      x = interpolate(progress, [0, 1], [current.x, next.x]);
      y = interpolate(progress, [0, 1], [current.y, next.y]);
      scale = interpolate(progress, [0, 1], [current.scale, next.scale]);
      break;
    } else if (frame > next.frame) {
      x = next.x;
      y = next.y;
      scale = next.scale;
    }
  }

  return { x, y, scale };
};

export const EvalWorkflowFlowV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const camera = getCameraTransform(frame);

  // Scene offset - position to center content in 1080x1080
  // Content spans roughly 700x750, so offset to center it
  const sceneCenterX = 190;
  const sceneCenterY = 120;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: DARK_THEME.backgroundGradient,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* CAMERA CONTAINER */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `translate(${sceneCenterX + camera.x}px, ${sceneCenterY + camera.y}px) scale(${camera.scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* ROW 1: Scanner -> N8N -> S3 -> Lambda */}
        <ScannerElement frame={frame} fps={fps} />
        <N8NElement frame={frame} fps={fps} />
        <S3Element frame={frame} fps={fps} />
        <LambdaElement frame={frame} fps={fps} />

        {/* ROW 2: Split PDFs */}
        <SplitPDFsElement frame={frame} fps={fps} />

        {/* ROW 3: Analysis */}
        <AnalysisElement frame={frame} fps={fps} />

        {/* ROW 4: Data + Dashboard */}
        <DataTableElement frame={frame} fps={fps} />
        <DashboardElement frame={frame} fps={fps} />

        {/* Flowing elements & connections */}
        <FlowingElements frame={frame} fps={fps} />
        <ConnectionLines frame={frame} />
      </div>

      {/* Fixed UI - Title (only at start) */}
      {frame < 40 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: DARK_THEME.textPrimary,
              fontFamily: "Inter, system-ui, sans-serif",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Traitement automatisé
          </div>
          <div
            style={{
              fontSize: 18,
              color: DARK_THEME.textSecondary,
              fontFamily: "Inter, system-ui, sans-serif",
              marginTop: 8,
            }}
          >
            Du scan au dashboard
          </div>
        </div>
      )}

      {/* UVCW Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: 0.9,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: "#8B1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          UVCW
        </div>
      </div>

      {/* Audio */}
      <Audio
        src={staticFile("sounds/music/eval-flow-bg.mp3")}
        volume={0.4}
        startFrom={0}
      />
    </div>
  );
};

// ============ SCANNER ELEMENT (Position: 0, 0) ============
const ScannerElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame, fps, config: SPRING_CONFIGS.bouncy });
  const scanLineY = interpolate((frame % 25) / 25, [0, 1], [0, 60]);
  const isScanning = frame < 50;

  return (
    <div
      style={{
        position: "absolute",
        left: -80,
        top: -65,
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.5, 1])})`,
      }}
    >
      <svg width="160" height="130" viewBox="0 0 160 130">
        {/* Base */}
        <rect x="8" y="65" width="144" height="55" rx="10" fill={DARK_THEME.scanner} />
        {/* Top lid */}
        <rect x="8" y="15" width="144" height="50" rx="6" fill="#1E293B" stroke={DARK_THEME.scanner} strokeWidth="2" />
        {/* Scan area */}
        <rect x="20" y="22" width="120" height="36" rx="3" fill="#0F172A" />
        {/* Scan light */}
        {isScanning && (
          <rect x="20" y={22 + scanLineY * 0.6} width="120" height="3" fill={DARK_THEME.success} opacity="0.9">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="0.4s" repeatCount="indefinite" />
          </rect>
        )}
        {/* LED */}
        <circle cx="136" cy="92" r="5" fill={isScanning ? DARK_THEME.success : "#475569"} />
        {/* Paper slot */}
        <rect x="50" y="5" width="60" height="12" rx="3" fill="#334155" />
      </svg>

      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: DARK_THEME.textPrimary, fontFamily: "Inter" }}>
          Scanner
        </div>
        <div style={{ fontSize: 11, color: DARK_THEME.textSecondary, fontFamily: "Inter" }}>
          Formulaires papier
        </div>
      </div>
    </div>
  );
};

// ============ N8N ELEMENT (Position: 180, 100) ============
const N8NElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame: frame - 60, fps, config: SPRING_CONFIGS.bouncy });
  const pulse = 1 + Math.sin(frame * 0.12) * 0.04;

  if (frame < 60) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        top: -50,
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.5, 1]) * pulse})`,
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill={DARK_THEME.n8n} />
        <path
          d="M25 60h18l14-25 14 50 14-25h18"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: DARK_THEME.textPrimary, fontFamily: "Inter" }}>N8N</div>
        <div style={{ fontSize: 11, color: DARK_THEME.textSecondary, fontFamily: "Inter" }}>Automatisation</div>
      </div>
    </div>
  );
};

// ============ S3 ELEMENT (Position: 380, 100) ============
const S3Element: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame: frame - 140, fps, config: SPRING_CONFIGS.bouncy });

  if (frame < 140) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 320,
        top: -50,
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.5, 1])})`,
      }}
    >
      <svg width="110" height="120" viewBox="0 0 110 120">
        <path
          d="M15 35 L15 85 Q15 100 55 100 Q95 100 95 85 L95 35"
          fill={DARK_THEME.s3}
          stroke="#047857"
          strokeWidth="2"
        />
        <ellipse cx="55" cy="35" rx="40" ry="15" fill={DARK_THEME.s3} stroke="#047857" strokeWidth="2" />
        <ellipse cx="55" cy="35" rx="40" ry="15" fill="white" opacity="0.15" />
        <text x="55" y="72" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold">S3</text>
      </svg>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: DARK_THEME.textPrimary, fontFamily: "Inter" }}>AWS S3</div>
        <div style={{ fontSize: 11, color: DARK_THEME.textSecondary, fontFamily: "Inter" }}>Stockage Cloud</div>
      </div>
    </div>
  );
};

// ============ LAMBDA ELEMENT (Position: 580, 100) ============
const LambdaElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame: frame - 200, fps, config: SPRING_CONFIGS.bouncy });
  const isCutting = frame > 240 && frame < 290;
  const scissorRotation = isCutting ? Math.sin((frame - 240) * 0.3) * 20 : 0;

  if (frame < 200) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 520,
        top: -50,
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.5, 1])})`,
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect x="8" y="8" width="104" height="104" rx="18" fill={DARK_THEME.lambda} />
        <text x="60" y="82" textAnchor="middle" fill="white" fontSize="56" fontWeight="bold" fontFamily="Georgia, serif">λ</text>
      </svg>

      {isCutting && (
        <div
          style={{
            position: "absolute",
            top: -20,
            left: 45,
            transform: `rotate(${scissorRotation}deg)`,
            fontSize: 32,
          }}
        >
          ✂️
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: DARK_THEME.textPrimary, fontFamily: "Inter" }}>Lambda</div>
        <div style={{ fontSize: 11, color: DARK_THEME.textSecondary, fontFamily: "Inter" }}>Découpage PDF</div>
      </div>
    </div>
  );
};

// ============ SPLIT PDFs ELEMENT (Position: varied, 280) ============
const SplitPDFsElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < 270) return null;

  const pdfs = [
    { x: 180, y: 200, delay: 0 },
    { x: 300, y: 220, delay: 8 },
    { x: 420, y: 200, delay: 16 },
    { x: 240, y: 290, delay: 24 },
    { x: 360, y: 290, delay: 32 },
  ];

  return (
    <>
      {pdfs.map((pdf, i) => {
        const entrance = spring({ frame: frame - 270 - pdf.delay, fps, config: SPRING_CONFIGS.bouncy });
        if (entrance <= 0) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pdf.x,
              top: pdf.y,
              opacity: entrance,
              transform: `scale(${interpolate(entrance, [0, 1], [0, 1])}) rotate(${(i - 2) * 4}deg)`,
            }}
          >
            <svg width="40" height="52" viewBox="0 0 40 52">
              <path
                d="M4 4h24l8 8v36c0 2-2 3-3 3H7c-2 0-3-1-3-3V7c0-2 1-3 3-3z"
                fill="#DC2626"
                stroke="#B91C1C"
                strokeWidth="1"
              />
              <path d="M28 4v8h8" fill="#FCA5A5" />
              <text x="20" y="34" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PDF</text>
            </svg>
          </div>
        );
      })}
    </>
  );
};

// ============ ANALYSIS ELEMENT (Position: 200, 420) ============
const AnalysisElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame: frame - 320, fps, config: SPRING_CONFIGS.smooth });

  if (frame < 320) return null;

  const checkboxes = [true, true, false, true];
  const scanLineX = interpolate(frame - 350, [0, 35], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 380,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
      }}
    >
      {/* Checkboxes */}
      <div
        style={{
          backgroundColor: DARK_THEME.cardBg,
          borderRadius: 12,
          padding: 16,
          border: `1px solid ${DARK_THEME.cardBorder}`,
          marginBottom: 12,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: DARK_THEME.textSecondary, marginBottom: 12, fontFamily: "Inter" }}>
          📋 Cases cochées détectées
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {checkboxes.map((checked, i) => {
            const cbEntrance = spring({ frame: frame - 330 - i * 8, fps, config: SPRING_CONFIGS.snappy });
            return (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 6,
                  border: `2px solid ${checked ? DARK_THEME.success : "#475569"}`,
                  backgroundColor: checked ? "rgba(16, 185, 129, 0.2)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: cbEntrance,
                  transform: `scale(${cbEntrance})`,
                }}
              >
                {checked && (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L19 7" stroke={DARK_THEME.success} strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Handwriting */}
      <div
        style={{
          backgroundColor: DARK_THEME.cardBg,
          borderRadius: 12,
          padding: 16,
          border: `1px solid ${DARK_THEME.cardBorder}`,
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: DARK_THEME.textSecondary, marginBottom: 8, fontFamily: "Inter" }}>
          ✍️ Écriture manuscrite
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 16,
            color: DARK_THEME.textPrimary,
            lineHeight: 1.5,
          }}
        >
          "Très bonne formation,<br />formateur excellent !"
        </div>

        {frame > 350 && frame < 385 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: scanLineX,
              width: 3,
              height: "100%",
              background: `linear-gradient(to bottom, transparent, ${DARK_THEME.azure}, transparent)`,
              boxShadow: `0 0 15px ${DARK_THEME.azure}`,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: DARK_THEME.azure,
            color: "white",
            padding: "4px 10px",
            borderRadius: 16,
            fontSize: 10,
            fontWeight: 600,
            opacity: spring({ frame: frame - 370, fps, config: SPRING_CONFIGS.bouncy }),
          }}
        >
          🧠 Azure AI
        </div>
      </div>
    </div>
  );
};

// ============ DATA TABLE ELEMENT (Position: 300, 600) ============
const DataTableElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame: frame - 420, fps, config: SPRING_CONFIGS.smooth });

  if (frame < 420) return null;

  const rowsFilled = Math.min(4, Math.floor((frame - 430) / 8));

  return (
    <div
      style={{
        position: "absolute",
        left: 180,
        top: 580,
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1])})`,
      }}
    >
      <div
        style={{
          backgroundColor: DARK_THEME.cardBg,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${DARK_THEME.cardBorder}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", backgroundColor: "#0F172A" }}>
          {["ID", "Note", "Commentaire"].map((h, i) => (
            <div
              key={i}
              style={{
                padding: "8px 14px",
                color: DARK_THEME.textPrimary,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "Inter",
                width: i === 2 ? 100 : 45,
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {[1, 2, 3, 4].map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              backgroundColor: row <= rowsFilled ? "rgba(16, 185, 129, 0.1)" : "transparent",
              opacity: row <= rowsFilled ? 1 : 0.4,
            }}
          >
            <div style={{ padding: "6px 14px", fontSize: 11, width: 45, borderRight: "1px solid rgba(255,255,255,0.05)", color: DARK_THEME.textSecondary, fontFamily: "Inter" }}>
              {row}
            </div>
            <div style={{ padding: "6px 14px", fontSize: 11, width: 45, borderRight: "1px solid rgba(255,255,255,0.05)", color: DARK_THEME.success, fontWeight: 600, fontFamily: "Inter" }}>
              {row <= rowsFilled ? "4/4" : "-"}
            </div>
            <div style={{ padding: "6px 14px", fontSize: 10, width: 100, color: DARK_THEME.textMuted, fontFamily: "Inter" }}>
              {row <= rowsFilled ? "Très bien..." : "-"}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 600, color: DARK_THEME.textPrimary, fontFamily: "Inter" }}>
        🗄️ Base de données
      </div>
    </div>
  );
};

// ============ DASHBOARD ELEMENT (Position: 500, 600) ============
const DashboardElement: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrance = spring({ frame: frame - 460, fps, config: SPRING_CONFIGS.smooth });

  if (frame < 460) return null;

  const chartProgress = interpolate(frame - 470, [0, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const scoreValue = 4.2 * chartProgress;

  return (
    <div
      style={{
        position: "absolute",
        left: 430,
        top: 550,
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1])})`,
      }}
    >
      {/* Browser mockup */}
      <div
        style={{
          width: 280,
          backgroundColor: "#0F172A",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          border: `1px solid ${DARK_THEME.cardBorder}`,
        }}
      >
        <div style={{ padding: "8px 12px", backgroundColor: "#1E293B", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div style={{ marginLeft: 8, flex: 1, padding: "4px 8px", backgroundColor: "#0F172A", borderRadius: 4, fontSize: 9, color: DARK_THEME.textMuted, fontFamily: "Inter" }}>
            🔒 intranet.uvcw.be/dashboard
          </div>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: DARK_THEME.textMuted, marginBottom: 4, fontFamily: "Inter" }}>Note moyenne</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: DARK_THEME.success, fontFamily: "Inter" }}>
              {scoreValue.toFixed(1)}
            </div>
            <div style={{ fontSize: 14, color: DARK_THEME.textMuted, fontFamily: "Inter" }}>/5</div>
            <div style={{ marginTop: 4, fontSize: 18 }}>
              {"⭐".repeat(Math.round(scoreValue))}{"☆".repeat(5 - Math.round(scoreValue))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 50, marginBottom: 8 }}>
            {[
              { value: 85, color: DARK_THEME.scanner },
              { value: 92, color: "#8B5CF6" },
              { value: 78, color: DARK_THEME.n8n },
              { value: 88, color: DARK_THEME.success },
            ].map((bar, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${bar.value * chartProgress}%`,
                  backgroundColor: bar.color,
                  borderRadius: 4,
                  minHeight: 4,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {["Cont.", "Anim.", "Cond.", "Glob."].map((label, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 8, color: DARK_THEME.textMuted, fontFamily: "Inter" }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {frame > 530 && (
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: 0,
            backgroundColor: DARK_THEME.success,
            color: "white",
            padding: "8px 14px",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: `0 6px 20px rgba(16, 185, 129, 0.4)`,
            opacity: spring({ frame: frame - 530, fps, config: SPRING_CONFIGS.bouncy }),
            transform: `scale(${spring({ frame: frame - 530, fps, config: SPRING_CONFIGS.bouncy })})`,
          }}
        >
          <span style={{ fontSize: 16 }}>📧</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Inter" }}>Rapport envoyé</div>
            <div style={{ fontSize: 9, opacity: 0.9, fontFamily: "Inter" }}>aux formateurs</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ FLOWING ELEMENTS ============
const FlowingElements: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <>
      {frame >= 8 && frame < 45 && (
        <MovingDocument type="paper" startX={-30} startY={-100} endX={-30} endY={-20} startFrame={8} duration={30} frame={frame} />
      )}
      {frame >= 45 && frame < 90 && (
        <MovingDocument type="email" startX={80} startY={20} endX={140} endY={20} startFrame={45} duration={35} frame={frame} />
      )}
      {frame >= 120 && frame < 165 && (
        <MovingDocument type="pdf" startX={230} endX={350} startY={20} endY={20} startFrame={120} duration={35} frame={frame} />
      )}
      {frame >= 180 && frame < 225 && (
        <MovingDocument type="pdf" startX={440} endX={550} startY={20} endY={20} startFrame={180} duration={35} frame={frame} />
      )}
      {frame >= 400 && frame < 440 && (
        <MovingDocument type="data" startX={280} startY={520} endX={230} endY={620} startFrame={400} duration={30} frame={frame} />
      )}
      {frame >= 450 && frame < 490 && (
        <MovingDocument type="data" startX={380} startY={650} endX={460} endY={620} startFrame={450} duration={30} frame={frame} />
      )}
    </>
  );
};

const MovingDocument: React.FC<{
  type: "paper" | "email" | "pdf" | "data";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startFrame: number;
  duration: number;
  frame: number;
}> = ({ type, startX, startY, endX, endY, startFrame, duration, frame }) => {
  const progress = interpolate(
    frame - startFrame,
    [0, duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
  );

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const size = 30;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `rotate(${progress * 8 - 4}deg)`,
        filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))",
      }}
    >
      {type === "paper" && (
        <svg width={size} height={size * 1.3} viewBox="0 0 30 40">
          <path d="M3 3h18l6 6v28c0 1.5-1.5 3-3 3H6c-1.5 0-3-1.5-3-3V6c0-1.5 1.5-3 3-3z" fill="white" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M21 3v6h6" fill="#E2E8F0" />
        </svg>
      )}
      {type === "email" && (
        <svg width={size} height={size * 0.7} viewBox="0 0 36 24">
          <rect x="1.5" y="1.5" width="33" height="21" rx="3" fill="#3B82F6" />
          <path d="M1.5 6l16.5 9 16.5-9" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      )}
      {type === "pdf" && (
        <svg width={size} height={size * 1.3} viewBox="0 0 30 40">
          <path d="M3 3h18l6 6v28c0 1.5-1.5 3-3 3H6c-1.5 0-3-1.5-3-3V6c0-1.5 1.5-3 3-3z" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
          <text x="15" y="26" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PDF</text>
        </svg>
      )}
      {type === "data" && (
        <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill={DARK_THEME.success} />
          <path d="M7 12l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )}
    </div>
  );
};

// ============ CONNECTION LINES ============
const ConnectionLines: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: -100,
        left: -100,
        width: 900,
        height: 900,
        pointerEvents: "none",
      }}
    >
      {/* Scanner to N8N */}
      <path d="M 180 130 Q 240 100 310 130" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 55 ? 1 : 0} />

      {/* N8N to S3 */}
      <path d="M 430 130 L 520 130" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 135 ? 1 : 0} />

      {/* S3 to Lambda */}
      <path d="M 630 130 L 720 130" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 195 ? 1 : 0} />

      {/* Lambda to PDFs */}
      <path d="M 720 200 Q 620 280 500 340" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 265 ? 1 : 0} />

      {/* PDFs to Analysis */}
      <path d="M 380 380 Q 320 420 300 480" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 315 ? 1 : 0} />

      {/* Analysis to Data */}
      <path d="M 350 620 Q 380 660 400 680" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 415 ? 1 : 0} />

      {/* Data to Dashboard */}
      <path d="M 480 700 L 550 700" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="8 5" fill="none" opacity={frame > 455 ? 1 : 0} />
    </svg>
  );
};
