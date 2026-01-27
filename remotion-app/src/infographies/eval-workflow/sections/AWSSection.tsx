/**
 * AWSSection - Lambda pipeline overview
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
import {
  LambdaIcon,
  S3Icon,
  TextractIcon,
  AzureAIIcon,
  EventBridgeIcon,
} from "../config/icons";

export const AWSSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lambda boxes data
  const lambdas = [
    { id: "λ1", name: "Rename", desc: "ID & Split", delay: 20, x: 250 },
    { id: "λ2", name: "Analyze", desc: "OCR", delay: 50, x: 550 },
    { id: "λ3", name: "Parse", desc: "Structure", delay: 80, x: 850 },
    { id: "λ4", name: "Aggregate", desc: "Merge", delay: 110, x: 1150 },
  ];

  // Services data
  const services = [
    { icon: TextractIcon, name: "Textract", color: COLORS.aws.textract, x: 400, y: 320, delay: 60 },
    { icon: AzureAIIcon, name: "Azure DI", color: COLORS.azure.primary, x: 700, y: 320, delay: 90 },
    { icon: EventBridgeIcon, name: "Scheduler", color: COLORS.aws.eventbridge, x: 1000, y: 320, delay: 120 },
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
        stepNumber={3}
        title="Pipeline AWS"
        subtitle="4 fonctions Lambda orchestrées"
        accentColor={COLORS.aws.primary}
      />

      {/* AWS Cloud container */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          bottom: 160,
          backgroundColor: `${COLORS.aws.secondary}40`,
          border: `2px solid ${COLORS.aws.primary}30`,
          borderRadius: 24,
          opacity: spring({ frame, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        {/* AWS label */}
        <div
          style={{
            position: "absolute",
            top: -15,
            left: 30,
            backgroundColor: COLORS.aws.primary,
            color: "white",
            padding: "6px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          ☁️ AWS CLOUD
        </div>
      </div>

      {/* S3 Input */}
      <div style={{ position: "absolute", left: 100, top: 420 }}>
        <ServiceBox label="S3" sublabel="temp/" delay={10} width={80} height={80}>
          <S3Icon size={40} color={COLORS.aws.s3} />
        </ServiceBox>
      </div>

      {/* Lambda functions */}
      {lambdas.map((lambda, index) => (
        <React.Fragment key={lambda.id}>
          <div
            style={{
              position: "absolute",
              left: lambda.x,
              top: 400,
            }}
          >
            <ServiceBox
              label={lambda.id}
              sublabel={lambda.name}
              delay={lambda.delay}
              glowColor={COLORS.aws.lambda}
              width={100}
              height={100}
            >
              <LambdaIcon size={48} color={COLORS.aws.lambda} />
            </ServiceBox>

            {/* Function description */}
            <div
              style={{
                position: "absolute",
                top: 130,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: COLORS.bgMedium,
                padding: "4px 12px",
                borderRadius: 6,
                fontSize: 11,
                color: COLORS.textSecondary,
                whiteSpace: "nowrap",
                fontFamily: "Inter, system-ui, sans-serif",
                opacity: spring({
                  frame: frame - lambda.delay - 15,
                  fps,
                  config: SPRING_CONFIGS.smooth,
                }),
              }}
            >
              {lambda.desc}
            </div>
          </div>

          {/* Arrows between lambdas */}
          {index < lambdas.length - 1 && (
            <FlowArrow
              startX={lambda.x + 100}
              startY={450}
              endX={lambdas[index + 1].x}
              endY={450}
              delay={lambda.delay + 20}
              color={COLORS.aws.lambda}
              animateFlow
            />
          )}
        </React.Fragment>
      ))}

      {/* Arrow from S3 to Lambda 1 */}
      <FlowArrow
        startX={180}
        startY={450}
        endX={250}
        endY={450}
        delay={15}
        color={COLORS.aws.s3}
      />

      {/* S3 Output */}
      <div style={{ position: "absolute", right: 100, top: 420 }}>
        <ServiceBox
          label="S3"
          sublabel="final/"
          delay={140}
          glowColor={COLORS.success}
          width={80}
          height={80}
        >
          <S3Icon size={40} color={COLORS.success} />
        </ServiceBox>
      </div>

      {/* Arrow from Lambda 4 to S3 */}
      <FlowArrow
        startX={1250}
        startY={450}
        endX={1340}
        endY={450}
        delay={130}
        color={COLORS.success}
      />

      {/* External services */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const serviceEntrance = spring({
          frame: frame - service.delay,
          fps,
          config: SPRING_CONFIGS.bouncy,
        });

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: service.x,
              top: service.y,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              opacity: serviceEntrance,
              transform: `scale(${interpolate(serviceEntrance, [0, 1], [0.5, 1])}) translateY(${interpolate(serviceEntrance, [0, 1], [-20, 0])}px)`,
            }}
          >
            <Icon size={44} color={service.color} />
            <span
              style={{
                fontSize: 11,
                color: COLORS.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {service.name}
            </span>

            {/* Connection line to Lambda */}
            <svg
              style={{
                position: "absolute",
                top: 50,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              width="2"
              height="50"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="50"
                stroke={service.color}
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity={0.5}
              />
            </svg>
          </div>
        );
      })}

      {/* Info box */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 40,
          opacity: spring({ frame: frame - 130, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        {[
          { value: "~0.07€", label: "par page OCR", icon: "💰" },
          { value: "Parallèle", label: "Traitement", icon: "⚡" },
          { value: "2 min", label: "Délai agrégation", icon: "⏱️" },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              backgroundColor: COLORS.bgMedium,
              padding: "12px 24px",
              borderRadius: 12,
              border: `1px solid ${COLORS.bgLight}`,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.textPrimary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
