/**
 * EvalWorkflowFlow - Dynamic continuous flow animation
 * Format: 1080x1080 (square)
 * Style: White background, motion graphics, continuous flow
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
  Sequence,
} from "remotion";
import { COLORS, TIMING, SPRING_CONFIGS } from "./config/theme";
import { FlowingDocument } from "./components/FlowingDocument";
import { Label } from "./components/Label";

// Total duration export
export const EVAL_FLOW_DURATION = TIMING.total;

export const EvalWorkflowFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === SCANNER SECTION ===
  const scannerX = 150;
  const scannerY = 300;
  const scannerEntrance = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Scanner light animation
  const scanLightY = interpolate(
    (frame % 40) / 40,
    [0, 1],
    [0, 60],
    { easing: Easing.inOut(Easing.quad) }
  );

  // === N8N SECTION ===
  const n8nX = 400;
  const n8nY = 300;
  const n8nEntrance = spring({
    frame: frame - TIMING.n8nStart,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // N8N pulse
  const n8nPulse = interpolate(
    Math.sin((frame - TIMING.n8nStart) * 0.15),
    [-1, 1],
    [0.95, 1.05]
  );

  // === S3 BUCKET ===
  const s3X = 650;
  const s3Y = 300;
  const s3Entrance = spring({
    frame: frame - TIMING.s3Start,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // === LAMBDA SECTION ===
  const lambdaX = 900;
  const lambdaY = 300;
  const lambdaEntrance = spring({
    frame: frame - TIMING.lambdaStart,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Lambda "cutting" animation - PDFs splitting
  const splitProgress = interpolate(
    frame - TIMING.lambdaStart - 20,
    [0, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === ANALYSIS SECTION (below) ===
  const analysisY = 550;
  const analysisEntrance = spring({
    frame: frame - TIMING.analysisStart,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Checkbox animations
  const checkboxes = [
    { x: 200, checked: true, delay: 0 },
    { x: 280, checked: true, delay: 8 },
    { x: 360, checked: false, delay: 16 },
    { x: 440, checked: true, delay: 24 },
  ];

  // Handwriting scan effect
  const scanLineX = interpolate(
    frame - TIMING.analysisStart - 30,
    [0, 40],
    [500, 750],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === DATA/SQL SECTION ===
  const dataX = 540;
  const dataY = 780;
  const dataEntrance = spring({
    frame: frame - TIMING.dataStart,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Data rows filling animation
  const rowsFilled = Math.floor(
    interpolate(
      frame - TIMING.dataStart,
      [0, 40],
      [0, 4],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  // === DASHBOARD SECTION ===
  const dashX = 850;
  const dashY = 780;
  const dashEntrance = spring({
    frame: frame - TIMING.dashboardStart,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Chart bars animation
  const chartProgress = interpolate(
    frame - TIMING.dashboardStart - 10,
    [0, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  // === EMAIL OUT ===
  const emailOutEntrance = spring({
    frame: frame - TIMING.emailOutStart,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: COLORS.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Background subtle pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(circle at 20% 20%, ${COLORS.bgAccent} 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, ${COLORS.bgAccent} 0%, transparent 50%)`,
          opacity: 0.5,
        }}
      />

      {/* Connection lines (draw first, behind everything) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* Scanner to N8N */}
        <path
          d={`M ${scannerX + 80} ${scannerY} Q ${(scannerX + n8nX) / 2} ${scannerY - 50} ${n8nX - 50} ${n8nY}`}
          stroke={COLORS.email}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity={interpolate(frame, [TIMING.emailStart, TIMING.emailStart + 20], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        {/* N8N to S3 */}
        <path
          d={`M ${n8nX + 50} ${n8nY} L ${s3X - 50} ${s3Y}`}
          stroke={COLORS.aws}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity={interpolate(frame, [TIMING.s3Start - 10, TIMING.s3Start + 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        {/* S3 to Lambda */}
        <path
          d={`M ${s3X + 50} ${s3Y} L ${lambdaX - 50} ${lambdaY}`}
          stroke={COLORS.lambda}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity={interpolate(frame, [TIMING.lambdaStart - 10, TIMING.lambdaStart + 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        {/* Lambda to Analysis */}
        <path
          d={`M ${lambdaX} ${lambdaY + 60} Q ${lambdaX - 100} ${(lambdaY + analysisY) / 2} ${540} ${analysisY - 60}`}
          stroke={COLORS.textract}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity={interpolate(frame, [TIMING.analysisStart - 10, TIMING.analysisStart + 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        {/* Analysis to Data */}
        <path
          d={`M ${540} ${analysisY + 60} L ${dataX} ${dataY - 60}`}
          stroke={COLORS.sql}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity={interpolate(frame, [TIMING.dataStart - 10, TIMING.dataStart + 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        {/* Data to Dashboard */}
        <path
          d={`M ${dataX + 120} ${dataY} L ${dashX - 60} ${dashY}`}
          stroke={COLORS.dashboard}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity={interpolate(frame, [TIMING.dashboardStart - 10, TIMING.dashboardStart + 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </svg>

      {/* ===== SCANNER ===== */}
      <div
        style={{
          position: "absolute",
          left: scannerX - 60,
          top: scannerY - 50,
          opacity: scannerEntrance,
          transform: `scale(${interpolate(scannerEntrance, [0, 1], [0.5, 1])})`,
        }}
      >
        {/* Scanner body */}
        <svg width="120" height="100" viewBox="0 0 120 100">
          {/* Base */}
          <rect x="10" y="50" width="100" height="40" rx="8" fill={COLORS.scanner} />
          {/* Top lid */}
          <rect x="10" y="20" width="100" height="30" rx="4" fill={COLORS.bgAccent} stroke={COLORS.scanner} strokeWidth="2" />
          {/* Scan area */}
          <rect x="20" y="25" width="80" height="20" rx="2" fill="white" />
          {/* Scan light */}
          {frame < TIMING.emailStart && (
            <rect
              x="20"
              y={25 + scanLightY * 0.33}
              width="80"
              height="3"
              fill={COLORS.success}
              opacity={0.8}
            />
          )}
          {/* LED */}
          <circle cx="100" cy="70" r="4" fill={frame % 30 < 15 ? COLORS.success : "#ccc"} />
        </svg>
      </div>
      <Label text="Scanner" x={scannerX} y={scannerY + 70} startFrame={5} duration={80} size="small" color={COLORS.textMedium} />

      {/* Paper going into scanner */}
      {frame < TIMING.scanDuration && (
        <FlowingDocument
          type="paper"
          startX={scannerX - 80}
          startY={scannerY - 100}
          endX={scannerX}
          endY={scannerY - 30}
          startFrame={5}
          duration={30}
          size={35}
        />
      )}

      {/* ===== N8N ===== */}
      <div
        style={{
          position: "absolute",
          left: n8nX - 40,
          top: n8nY - 40,
          opacity: n8nEntrance,
          transform: `scale(${interpolate(n8nEntrance, [0, 1], [0.5, 1]) * n8nPulse})`,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill={COLORS.n8n} />
          <path
            d="M20 40h12l8-15 8 30 8-15h12"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <Label text="Automatisation" x={n8nX} y={n8nY + 60} startFrame={TIMING.n8nStart + 10} duration={70} size="small" color={COLORS.textMedium} />

      {/* Email flying to N8N */}
      <FlowingDocument
        type="email"
        startX={scannerX + 80}
        startY={scannerY - 20}
        endX={n8nX - 50}
        endY={n8nY}
        startFrame={TIMING.emailStart}
        duration={25}
        size={35}
        showTrail
      />

      {/* ===== S3 BUCKET ===== */}
      <div
        style={{
          position: "absolute",
          left: s3X - 35,
          top: s3Y - 40,
          opacity: s3Entrance,
          transform: `scale(${interpolate(s3Entrance, [0, 1], [0.5, 1])})`,
        }}
      >
        <svg width="70" height="80" viewBox="0 0 70 80">
          {/* Bucket body */}
          <path
            d="M10 25 L10 65 Q10 75 35 75 Q60 75 60 65 L60 25"
            fill={COLORS.s3}
            stroke="#3d7c1f"
            strokeWidth="2"
          />
          {/* Bucket top */}
          <ellipse cx="35" cy="25" rx="25" ry="10" fill={COLORS.s3} stroke="#3d7c1f" strokeWidth="2" />
          <ellipse cx="35" cy="25" rx="25" ry="10" fill="white" opacity="0.2" />
          {/* S3 text */}
          <text x="35" y="52" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">S3</text>
        </svg>
      </div>
      <Label text="Stockage Cloud" x={s3X} y={s3Y + 60} startFrame={TIMING.s3Start + 10} duration={70} size="small" color={COLORS.textMedium} />

      {/* PDF to S3 */}
      <FlowingDocument
        type="pdf"
        startX={n8nX + 50}
        startY={n8nY}
        endX={s3X - 30}
        endY={s3Y}
        startFrame={TIMING.s3Start - 15}
        duration={25}
        size={30}
        showTrail
      />

      {/* ===== LAMBDA ===== */}
      <div
        style={{
          position: "absolute",
          left: lambdaX - 40,
          top: lambdaY - 40,
          opacity: lambdaEntrance,
          transform: `scale(${interpolate(lambdaEntrance, [0, 1], [0.5, 1])})`,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <rect x="4" y="4" width="72" height="72" rx="12" fill={COLORS.lambda} />
          <text x="40" y="52" textAnchor="middle" fill="white" fontSize="36" fontWeight="bold" fontFamily="Georgia, serif">λ</text>
        </svg>

        {/* Scissors animation */}
        {splitProgress > 0 && splitProgress < 1 && (
          <div
            style={{
              position: "absolute",
              top: -20,
              left: 25,
              transform: `rotate(${interpolate(splitProgress, [0, 1], [0, 360])}deg)`,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill={COLORS.textDark}>
              <path d="M6 6a3 3 0 1 0 0-3 3 3 0 0 0 0 3zm0 15a3 3 0 1 0 0-3 3 3 0 0 0 0 3zm14-9l-8.5 6-1-1.5L17 12l-6.5-4.5 1-1.5L20 12z"/>
            </svg>
          </div>
        )}
      </div>
      <Label text="Découpage PDF" x={lambdaX} y={lambdaY + 60} startFrame={TIMING.lambdaStart + 10} duration={80} size="small" color={COLORS.textMedium} />

      {/* PDF to Lambda */}
      <FlowingDocument
        type="pdf"
        startX={s3X + 50}
        startY={s3Y}
        endX={lambdaX - 40}
        endY={lambdaY}
        startFrame={TIMING.lambdaStart - 15}
        duration={25}
        size={30}
        showTrail
      />

      {/* Split PDFs coming out */}
      {[0, 1, 2].map((i) => (
        <FlowingDocument
          key={i}
          type="pdf"
          startX={lambdaX}
          startY={lambdaY + 50}
          endX={300 + i * 120}
          endY={analysisY - 40}
          startFrame={TIMING.lambdaStart + 25 + i * 8}
          duration={35}
          size={25}
          showTrail
        />
      ))}

      {/* ===== ANALYSIS SECTION ===== */}
      <div
        style={{
          position: "absolute",
          left: 150,
          top: analysisY - 60,
          opacity: analysisEntrance,
          transform: `translateY(${interpolate(analysisEntrance, [0, 1], [30, 0])}px)`,
        }}
      >
        {/* Checkboxes being analyzed */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          {checkboxes.map((cb, i) => {
            const cbEntrance = spring({
              frame: frame - TIMING.analysisStart - cb.delay,
              fps,
              config: SPRING_CONFIGS.snappy,
            });

            return (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  border: `3px solid ${cb.checked ? COLORS.success : COLORS.textLight}`,
                  backgroundColor: cb.checked ? `${COLORS.success}20` : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: cbEntrance,
                  transform: `scale(${interpolate(cbEntrance, [0, 1], [0.5, 1])})`,
                  boxShadow: cb.checked ? `0 0 15px ${COLORS.success}40` : "none",
                }}
              >
                {cb.checked && (
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path
                      d="M5 12l5 5L19 7"
                      stroke={COLORS.success}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        <Label text="Cases cochées détectées" x={180} y={0} startFrame={TIMING.analysisStart + 30} duration={50} size="small" color={COLORS.textMedium} align="left" />
      </div>

      {/* Handwriting analysis */}
      <div
        style={{
          position: "absolute",
          left: 500,
          top: analysisY - 40,
          opacity: analysisEntrance,
          transform: `translateY(${interpolate(analysisEntrance, [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 280,
            height: 80,
            backgroundColor: "white",
            border: `2px solid ${COLORS.textLight}`,
            borderRadius: 8,
            padding: 12,
            position: "relative",
            boxShadow: `0 4px 12px ${COLORS.shadow}`,
          }}
        >
          {/* Handwritten text */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 18,
              color: COLORS.textMedium,
              lineHeight: 1.5,
            }}
          >
            Très bonne formation,
            <br />
            très instructive !
          </div>

          {/* Scan line */}
          {frame > TIMING.analysisStart + 30 && frame < TIMING.analysisStart + 70 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: scanLineX - 500,
                width: 4,
                height: "100%",
                background: `linear-gradient(to bottom, transparent, ${COLORS.azure}, transparent)`,
                boxShadow: `0 0 15px ${COLORS.azure}`,
              }}
            />
          )}
        </div>
        <Label text="Écriture manuscrite analysée" x={640} y={60} startFrame={TIMING.analysisStart + 40} duration={50} size="small" color={COLORS.textMedium} />
      </div>

      {/* Azure AI badge */}
      {frame > TIMING.analysisStart + 35 && (
        <div
          style={{
            position: "absolute",
            left: 800,
            top: analysisY - 30,
            opacity: spring({ frame: frame - TIMING.analysisStart - 35, fps, config: SPRING_CONFIGS.bouncy }),
            transform: `scale(${spring({ frame: frame - TIMING.analysisStart - 35, fps, config: SPRING_CONFIGS.bouncy })})`,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.azure,
              color: "white",
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: `0 4px 12px ${COLORS.azure}40`,
            }}
          >
            🧠 Azure AI
          </div>
        </div>
      )}

      {/* ===== DATA / SQL ===== */}
      <div
        style={{
          position: "absolute",
          left: dataX - 100,
          top: dataY - 50,
          opacity: dataEntrance,
          transform: `translateY(${interpolate(dataEntrance, [0, 1], [30, 0])}px)`,
        }}
      >
        {/* Excel-like grid */}
        <div
          style={{
            backgroundColor: "white",
            border: `2px solid ${COLORS.textLight}`,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: `0 4px 16px ${COLORS.shadow}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              backgroundColor: COLORS.sql,
            }}
          >
            {["ID", "Note", "Commentaire"].map((h, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 16px",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 600,
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none",
                  width: i === 2 ? 120 : 50,
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {[1, 2, 3, 4].map((row) => {
            const rowOpacity = row <= rowsFilled ? 1 : 0.2;
            return (
              <div
                key={row}
                style={{
                  display: "flex",
                  borderTop: `1px solid ${COLORS.bgAccent}`,
                  opacity: rowOpacity,
                  backgroundColor: row <= rowsFilled ? `${COLORS.success}10` : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ padding: "6px 16px", fontSize: 12, width: 50, borderRight: `1px solid ${COLORS.bgAccent}` }}>
                  {row}
                </div>
                <div style={{ padding: "6px 16px", fontSize: 12, width: 50, borderRight: `1px solid ${COLORS.bgAccent}`, color: COLORS.success, fontWeight: 600 }}>
                  {row <= rowsFilled ? "4/4" : "-"}
                </div>
                <div style={{ padding: "6px 16px", fontSize: 11, width: 120, color: COLORS.textMedium }}>
                  {row <= rowsFilled ? "Très bien..." : "-"}
                </div>
              </div>
            );
          })}
        </div>
        <Label text="Base de données" x={dataX} y={80} startFrame={TIMING.dataStart + 15} duration={60} size="small" color={COLORS.textMedium} />
      </div>

      {/* ===== DASHBOARD ===== */}
      <div
        style={{
          position: "absolute",
          left: dashX - 80,
          top: dashY - 60,
          opacity: dashEntrance,
          transform: `scale(${interpolate(dashEntrance, [0, 1], [0.8, 1])})`,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: `2px solid ${COLORS.dashboard}`,
            borderRadius: 12,
            padding: 16,
            width: 180,
            boxShadow: `0 4px 20px ${COLORS.dashboard}30`,
          }}
        >
          {/* Title */}
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDark, marginBottom: 12 }}>
            📊 Dashboard
          </div>

          {/* Mini bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 50 }}>
            {[85, 92, 78, 88].map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${val * chartProgress}%`,
                  backgroundColor: [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.dashboard][i],
                  borderRadius: 4,
                  minHeight: 4,
                }}
              />
            ))}
          </div>

          {/* Score */}
          <div style={{ marginTop: 12, textAlign: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: COLORS.dashboard }}>
              {(4.2 * chartProgress).toFixed(1)}
            </span>
            <span style={{ fontSize: 14, color: COLORS.textLight }}>/5</span>
          </div>
        </div>
        <Label text="Résultats en temps réel" x={dashX + 10} y={100} startFrame={TIMING.dashboardStart + 20} duration={50} size="small" color={COLORS.textMedium} />
      </div>

      {/* ===== EMAIL OUT ===== */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 850,
          opacity: emailOutEntrance,
          transform: `scale(${interpolate(emailOutEntrance, [0, 1], [0.5, 1])}) translateX(${interpolate(emailOutEntrance, [0, 1], [50, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: COLORS.success,
            padding: "12px 20px",
            borderRadius: 30,
            boxShadow: `0 4px 20px ${COLORS.success}40`,
          }}
        >
          <span style={{ fontSize: 24 }}>📧</span>
          <div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 600 }}>Rapport envoyé</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>aux formateurs</div>
          </div>
        </div>
      </div>

      {/* Flying email at the end */}
      <FlowingDocument
        type="email"
        startX={dashX + 100}
        startY={dashY}
        endX={980}
        endY={870}
        startFrame={TIMING.emailOutStart}
        duration={30}
        size={30}
        showTrail
      />

      {/* ===== TITLE ===== */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: spring({ frame, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.textDark,
            margin: 0,
          }}
        >
          Traitement des évaluations
        </h1>
        <p
          style={{
            fontSize: 16,
            color: COLORS.textMedium,
            margin: "8px 0 0 0",
          }}
        >
          Du scan au dashboard en 2 minutes
        </p>
      </div>

      {/* UVCW Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: spring({ frame: frame - 20, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            backgroundColor: "#8B1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          UVCW
        </div>
        <span style={{ fontSize: 12, color: COLORS.textLight }}>
          Service Formations
        </span>
      </div>

      {/* Background music */}
      <Audio
        src={staticFile("sounds/music/upbeat/energetic.mp3")}
        volume={0.15}
        startFrom={0}
      />
    </div>
  );
};
