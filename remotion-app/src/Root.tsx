import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { CounterComparison } from "./exercises/ex1-basics/CounterComparison";
import { Slideshow } from "./exercises/ex2-sequencing/Slideshow";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Apprendre Remotion par la pratique",
          titleColor: "#2D3436",
          logoColor1: "#6C63FF",
          logoColor2: "#4ECDC4",
        }}
      />

      {/* Exercice 1.2 - Compteur animé avec comparaison des easings */}
      <Composition
        id="CounterComparison"
        component={CounterComparison}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Exercice 2.1 - Slideshow avec transitions fade */}
      <Composition
        id="Slideshow"
        component={Slideshow}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
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
