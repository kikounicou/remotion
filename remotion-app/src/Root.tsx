import React from "react";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { CounterComparison } from "./exercises/ex1-basics/CounterComparison";
import { Slideshow } from "./exercises/ex2-sequencing/Slideshow";
import {
  VideoTemplate,
  videoTemplateSchema,
  defaultVideoTemplateProps,
} from "./exercises/ex2-sequencing/VideoTemplate";
import { ImageShowcase } from "./exercises/ex3-media/ImageShowcase";

/**
 * Remotion Learning Project
 *
 * Les compositions sont organisées par niveau d'apprentissage.
 * Suivez l'ordre numérique pour progresser du plus simple au plus avancé.
 */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* NIVEAU 1 - LES BASES */}
      <Composition
        id="Ex1-1-HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Apprendre Remotion par la pratique",
          titleColor: "#2D3436",
          logoColor1: "#6C63FF",
          logoColor2: "#4ECDC4",
        }}
      />

      <Composition
        id="Ex1-2-CounterComparison"
        component={CounterComparison}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* NIVEAU 2 - SÉQUENCEMENT */}
      <Composition
        id="Ex2-1-Slideshow"
        component={Slideshow}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Ex2-2-VideoTemplate"
        component={VideoTemplate}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
        schema={videoTemplateSchema}
        defaultProps={defaultVideoTemplateProps}
      />

      {/* NIVEAU 3 - MÉDIA */}
      <Composition
        id="Ex3-1-ImageShowcase"
        component={ImageShowcase}
        durationInFrames={230}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* DEV */}
      <Composition
        id="Dev-Logo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
