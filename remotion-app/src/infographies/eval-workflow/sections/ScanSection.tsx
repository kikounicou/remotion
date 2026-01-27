/**
 * ScanSection - Formation + Scan + Email
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
import {
  UsersIcon,
  FormIcon,
  ScannerIcon,
  EmailIcon,
  CloudIcon,
} from "../config/icons";

export const ScanSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Positions for the flow
  const positions = {
    users: { x: 200, y: 450 },
    forms: { x: 450, y: 450 },
    scanner: { x: 750, y: 450 },
    email: { x: 1050, y: 450 },
    cloud: { x: 1350, y: 450 },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <SectionTitle
        stepNumber={1}
        title="Scan & Envoi"
        subtitle="Les participants remplissent, le scanner envoie"
        accentColor={COLORS.accent1}
      />

      {/* Flow arrows */}
      <FlowArrow
        startX={positions.users.x + 60}
        startY={positions.users.y}
        endX={positions.forms.x - 60}
        endY={positions.forms.y}
        delay={30}
        color={COLORS.textSecondary}
      />
      <FlowArrow
        startX={positions.forms.x + 60}
        startY={positions.forms.y}
        endX={positions.scanner.x - 60}
        endY={positions.scanner.y}
        delay={60}
        color={COLORS.accent1}
        label="Papier"
      />
      <FlowArrow
        startX={positions.scanner.x + 60}
        startY={positions.scanner.y}
        endX={positions.email.x - 60}
        endY={positions.email.y}
        delay={90}
        color={COLORS.info}
        label="Auto"
      />
      <FlowArrow
        startX={positions.email.x + 60}
        startY={positions.email.y}
        endX={positions.cloud.x - 60}
        endY={positions.cloud.y}
        delay={120}
        color={COLORS.aws.primary}
        curved
      />

      {/* Service boxes */}
      <div style={{ position: "absolute", left: positions.users.x - 60, top: positions.users.y - 60 }}>
        <ServiceBox label="Participants" sublabel="Fin de formation" delay={10}>
          <UsersIcon size={56} color={COLORS.accent4} />
        </ServiceBox>
      </div>

      <div style={{ position: "absolute", left: positions.forms.x - 60, top: positions.forms.y - 60 }}>
        <ServiceBox label="Formulaires" sublabel="Remplis à la main" delay={35} glowColor={COLORS.success}>
          <FormIcon size={56} color={COLORS.success} />
        </ServiceBox>
      </div>

      <div style={{ position: "absolute", left: positions.scanner.x - 60, top: positions.scanner.y - 60 }}>
        <ServiceBox label="Scanner MFP" sublabel="Recto/verso" delay={65} glowColor={COLORS.accent1}>
          <ScannerIcon size={56} color={COLORS.accent1} />
        </ServiceBox>
      </div>

      <div style={{ position: "absolute", left: positions.email.x - 60, top: positions.email.y - 60 }}>
        <ServiceBox label="Email" sublabel="evals@ik.me" delay={95}>
          <EmailIcon size={56} color={COLORS.info} />
        </ServiceBox>
      </div>

      <div style={{ position: "absolute", left: positions.cloud.x - 60, top: positions.cloud.y - 60 }}>
        <ServiceBox label="AWS Cloud" sublabel="Stockage S3" delay={125} glowColor={COLORS.aws.primary}>
          <CloudIcon size={56} color={COLORS.aws.primary} />
        </ServiceBox>
      </div>

      {/* Document animations */}
      <DocumentFlow
        type="form"
        startX={positions.forms.x}
        startY={positions.forms.y - 30}
        endX={positions.scanner.x}
        endY={positions.scanner.y - 30}
        delay={75}
        duration={25}
        showTrail
      />
      <DocumentFlow
        type="pdf"
        startX={positions.scanner.x}
        startY={positions.scanner.y - 30}
        endX={positions.email.x}
        endY={positions.email.y - 30}
        delay={105}
        duration={25}
        color={COLORS.error}
        label="PDF"
      />

      {/* Info callout */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: COLORS.bgMedium,
          border: `1px solid ${COLORS.bgLight}`,
          borderRadius: 12,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: spring({ frame: frame - 140, fps, config: SPRING_CONFIGS.smooth }),
        }}
      >
        <span style={{ fontSize: 28 }}>💡</span>
        <div>
          <div
            style={{
              color: COLORS.textPrimary,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Configuration "Fire & Forget"
          </div>
          <div
            style={{
              color: COLORS.textSecondary,
              fontSize: 13,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Le scanner envoie automatiquement à l'adresse mail configurée
          </div>
        </div>
      </div>
    </div>
  );
};
