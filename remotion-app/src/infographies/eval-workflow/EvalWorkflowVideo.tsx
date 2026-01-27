/**
 * EvalWorkflowVideo - Main composition assembling all sections
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { COLORS } from "./config/theme";
import { ParticleBackground, ProgressTimeline } from "./components";
import {
  IntroSection,
  ScanSection,
  N8NSection,
  AWSSection,
  ImportSection,
  DashboardSection,
  OutroSection,
} from "./sections";

// Section durations in frames (30fps)
const SECTIONS = {
  intro: 150, // 5s
  scan: 180, // 6s
  n8n: 180, // 6s
  aws: 210, // 7s
  import: 180, // 6s
  dashboard: 180, // 6s
  outro: 180, // 6s
};

const TRANSITION_DURATION = 20; // frames

// Calculate total duration
export const EVAL_WORKFLOW_DURATION =
  Object.values(SECTIONS).reduce((a, b) => a + b, 0) -
  6 * TRANSITION_DURATION; // 6 transitions

// Progress timeline steps
const TIMELINE_STEPS = [
  { label: "Intro" },
  { label: "Scan" },
  { label: "N8N" },
  { label: "AWS" },
  { label: "Import" },
  { label: "Dashboard" },
  { label: "Fin" },
];

export const EvalWorkflowVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate current step for progress bar
  const sectionStarts = [
    0,
    SECTIONS.intro - TRANSITION_DURATION,
    SECTIONS.intro + SECTIONS.scan - 2 * TRANSITION_DURATION,
    SECTIONS.intro + SECTIONS.scan + SECTIONS.n8n - 3 * TRANSITION_DURATION,
    SECTIONS.intro + SECTIONS.scan + SECTIONS.n8n + SECTIONS.aws - 4 * TRANSITION_DURATION,
    SECTIONS.intro + SECTIONS.scan + SECTIONS.n8n + SECTIONS.aws + SECTIONS.import - 5 * TRANSITION_DURATION,
    SECTIONS.intro + SECTIONS.scan + SECTIONS.n8n + SECTIONS.aws + SECTIONS.import + SECTIONS.dashboard - 6 * TRANSITION_DURATION,
  ];

  let currentStep = 0;
  let stepProgress = 0;

  for (let i = 0; i < sectionStarts.length; i++) {
    if (frame >= sectionStarts[i]) {
      currentStep = i;
      const nextStart = sectionStarts[i + 1] || durationInFrames;
      stepProgress = (frame - sectionStarts[i]) / (nextStart - sectionStarts[i]);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bgDark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <ParticleBackground particleCount={25} />

      {/* Main content with transitions */}
      <TransitionSeries>
        {/* Intro */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.intro}>
          <IntroSection />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scan */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.scan}>
          <ScanSection />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* N8N */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.n8n}>
          <N8NSection />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* AWS */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.aws}>
          <AWSSection />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Import */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.import}>
          <ImportSection />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Dashboard */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.dashboard}>
          <DashboardSection />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Outro */}
        <TransitionSeries.Sequence durationInFrames={SECTIONS.outro}>
          <OutroSection />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Progress timeline (hidden during intro and outro) */}
      {frame > SECTIONS.intro - 30 && frame < durationInFrames - SECTIONS.outro + 30 && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [
                SECTIONS.intro - 30,
                SECTIONS.intro,
                durationInFrames - SECTIONS.outro,
                durationInFrames - SECTIONS.outro + 30,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <ProgressTimeline
            steps={TIMELINE_STEPS}
            currentStep={currentStep}
            progress={stepProgress}
          />
        </div>
      )}
    </div>
  );
};
