import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export type KenBurnsEffect =
  | "zoomIn"
  | "zoomOut"
  | "panLeft"
  | "panRight"
  | "panUp"
  | "panDown"
  | "zoomInPanRight"
  | "zoomInPanLeft";

export interface KenBurnsImageProps {
  src: string;
  effect?: KenBurnsEffect;
  intensity?: number; // 1 = normal, 2 = double, etc.
  startScale?: number;
  endScale?: number;
}

/**
 * KenBurnsImage - Image avec effet Ken Burns amplifié
 *
 * Effets disponibles :
 * - zoomIn / zoomOut : Zoom avant/arrière
 * - panLeft / panRight : Panoramique horizontal
 * - panUp / panDown : Panoramique vertical
 * - zoomInPanRight : Combo zoom + pan
 */
export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  effect = "zoomIn",
  intensity = 1,
  startScale,
  endScale,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Configuration par défaut selon l'effet
  const getEffectConfig = () => {
    const baseZoom = 0.12 * intensity; // 12% de zoom par défaut
    const basePan = 8 * intensity; // 8% de pan par défaut

    switch (effect) {
      case "zoomIn":
        return {
          scaleStart: startScale ?? 1,
          scaleEnd: endScale ?? 1 + baseZoom,
          xStart: 0,
          xEnd: 0,
          yStart: 0,
          yEnd: 0,
        };
      case "zoomOut":
        return {
          scaleStart: startScale ?? 1 + baseZoom,
          scaleEnd: endScale ?? 1,
          xStart: 0,
          xEnd: 0,
          yStart: 0,
          yEnd: 0,
        };
      case "panLeft":
        return {
          scaleStart: 1.1,
          scaleEnd: 1.1,
          xStart: basePan,
          xEnd: -basePan,
          yStart: 0,
          yEnd: 0,
        };
      case "panRight":
        return {
          scaleStart: 1.1,
          scaleEnd: 1.1,
          xStart: -basePan,
          xEnd: basePan,
          yStart: 0,
          yEnd: 0,
        };
      case "panUp":
        return {
          scaleStart: 1.1,
          scaleEnd: 1.1,
          xStart: 0,
          xEnd: 0,
          yStart: basePan,
          yEnd: -basePan,
        };
      case "panDown":
        return {
          scaleStart: 1.1,
          scaleEnd: 1.1,
          xStart: 0,
          xEnd: 0,
          yStart: -basePan,
          yEnd: basePan,
        };
      case "zoomInPanRight":
        return {
          scaleStart: startScale ?? 1,
          scaleEnd: endScale ?? 1 + baseZoom,
          xStart: -basePan / 2,
          xEnd: basePan / 2,
          yStart: 0,
          yEnd: 0,
        };
      case "zoomInPanLeft":
        return {
          scaleStart: startScale ?? 1,
          scaleEnd: endScale ?? 1 + baseZoom,
          xStart: basePan / 2,
          xEnd: -basePan / 2,
          yStart: 0,
          yEnd: 0,
        };
      default:
        return {
          scaleStart: 1,
          scaleEnd: 1.1,
          xStart: 0,
          xEnd: 0,
          yStart: 0,
          yEnd: 0,
        };
    }
  };

  const config = getEffectConfig();

  // Interpolations fluides
  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [config.scaleStart, config.scaleEnd],
    { extrapolateRight: "clamp" }
  );

  const translateX = interpolate(
    frame,
    [0, durationInFrames],
    [config.xStart, config.xEnd],
    { extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frame,
    [0, durationInFrames],
    [config.yStart, config.yEnd],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
