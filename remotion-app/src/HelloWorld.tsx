import { spring } from "remotion";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Badge } from "./HelloWorld/Badge";
import { Logo } from "./HelloWorld/Logo";
import { Subtitle } from "./HelloWorld/Subtitle";
import { Title } from "./HelloWorld/Title";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
  logoColor1: zColor(),
  logoColor2: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
  titleText: propOne,
  titleColor: propTwo,
  logoColor1,
  logoColor2,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Exercice 1.1 - Animation du logo avec délai réduit (15 frames au lieu de 25)
  const logoTranslationProgress = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 80, // Plus de rebond (damping réduit)
    },
  });

  // Move the logo up by 180 pixels (augmenté pour plus d'espace)
  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [0, -180],
  );

  // Fade out the animation at the end (plus progressif)
  const opacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Exercice 1.1 - Animation du fond (dégradé subtil)
  const backgroundProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const backgroundColor = `hsl(240, ${10 + backgroundProgress * 5}%, ${98 - backgroundProgress * 3}%)`;

  // Musique de fond avec fade in/out
  const musicVolume = interpolate(
    frame,
    [0, 15, durationInFrames - 30, durationInFrames],
    [0, 0.4, 0.4, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Musique de fond - "Let It Go" (Pixabay, libre de droits) */}
      <Audio src={staticFile("music.mp3")} volume={musicVolume} />
      <AbsoluteFill style={{ opacity }}>
        {/* Badge animé - apparaît en premier */}
        <Sequence from={5}>
          <Badge text="Exercice 1.1" />
        </Sequence>

        <AbsoluteFill style={{ transform: `translateY(${logoTranslation}px)` }}>
          <Logo logoColor1={logoColor1} logoColor2={logoColor2} />
        </AbsoluteFill>

        {/* Titre - timing ajusté (frame 25 au lieu de 35) */}
        <Sequence from={25}>
          <Title titleText={propOne} titleColor={propTwo} />
        </Sequence>

        {/* Sous-titre - timing ajusté (frame 60 au lieu de 75) */}
        <Sequence from={60}>
          <Subtitle />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
