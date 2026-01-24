import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { Slide } from "./Slide";

// Durées en frames (à 30 fps)
const INTRO_DURATION = 60; // 2 secondes
const CONTENT_DURATION = 120; // 4 secondes
const OUTRO_DURATION = 60; // 2 secondes
const TRANSITION_DURATION = 15; // 0.5 seconde

// Schema Zod pour les props (utilisé par Remotion pour la validation)
export const videoTemplateSchema = z.object({
  introTitle: z.string(),
  introSubtitle: z.string().optional(),
  contentTitle: z.string(),
  contentSubtitle: z.string().optional(),
  outroCallToAction: z.string(),
  outroSubText: z.string().optional(),
  logoText: z.string().optional(),
  accentColor: zColor().optional(),
});

type VideoTemplateProps = z.infer<typeof videoTemplateSchema>;

export const VideoTemplate: React.FC<VideoTemplateProps> = ({
  introTitle,
  introSubtitle,
  contentTitle,
  contentSubtitle,
  outroCallToAction,
  outroSubText,
  logoText = "R",
  accentColor = "#6C63FF",
}) => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* INTRO */}
        <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
          <Intro
            title={introTitle}
            subtitle={introSubtitle}
            logoText={logoText}
            accentColor={accentColor}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* CONTENU PRINCIPAL */}
        <TransitionSeries.Sequence durationInFrames={CONTENT_DURATION}>
          <Slide
            title={contentTitle}
            subtitle={contentSubtitle}
            backgroundColor={accentColor}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* OUTRO */}
        <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
          <Outro
            callToAction={outroCallToAction}
            subText={outroSubText}
            logoText={logoText}
            accentColor={accentColor}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Props par défaut pour la démo
export const defaultVideoTemplateProps: VideoTemplateProps = {
  introTitle: "Bienvenue",
  introSubtitle: "Exercice 2.2 - Template Intro/Outro",
  contentTitle: "Votre contenu ici",
  contentSubtitle: "Ce template est entièrement personnalisable",
  outroCallToAction: "Abonnez-vous !",
  outroSubText: "Lien en description",
  logoText: "R",
  accentColor: "#6C63FF",
};
