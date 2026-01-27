import { useCurrentFrame, interpolate, Easing } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiereColor, MatiereSlug } from "../config/matieres";

export interface WordByWordProps {
  text: string;
  matiere: MatiereSlug;
  framesPerWord?: number;
  startFrame?: number;
  fontSize?: number;
  emphasisWords?: string[]; // Mots à mettre en valeur
  autoEmphasis?: boolean; // Détecte automatiquement chiffres et mots-clés
}

/**
 * WordByWord - Texte qui apparaît mot par mot
 *
 * Style TikTok/Reels avec emphase sur les mots importants.
 * Les chiffres et certains mots-clés sont automatiquement mis en valeur.
 */
export const WordByWord: React.FC<WordByWordProps> = ({
  text,
  matiere,
  framesPerWord = 6,
  startFrame = 0,
  fontSize = UVCW_BRAND.fontSize.lg,
  emphasisWords = [],
  autoEmphasis = true,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Séparer le texte en mots
  const words = text.split(/\s+/).filter((w) => w.length > 0);

  // Mots à mettre en emphase automatiquement
  const autoEmphasisPatterns = [
    /^\d+/, // Commence par un chiffre
    /\d+%$/, // Pourcentage
    /^\d+€$/, // Euro
    /^(jamais|toujours|urgent|important|critique|majeur|seul|unique|aucun|zéro)$/i,
  ];

  const isEmphasis = (word: string): boolean => {
    // Nettoyage du mot (enlever ponctuation)
    const cleanWord = word.replace(/[.,!?;:]/g, "");

    // Vérifier dans la liste manuelle
    if (emphasisWords.some((e) => cleanWord.toLowerCase() === e.toLowerCase())) {
      return true;
    }

    // Vérifier les patterns automatiques
    if (autoEmphasis) {
      return autoEmphasisPatterns.some((pattern) => pattern.test(cleanWord));
    }

    return false;
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.3em",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = startFrame + index * framesPerWord;
        const isWordEmphasis = isEmphasis(word);

        // Animation d'apparition
        const opacity = interpolate(
          frame,
          [wordStartFrame, wordStartFrame + 4],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Scale bounce pour les mots emphasis
        const scale = isWordEmphasis
          ? interpolate(
              frame,
              [wordStartFrame, wordStartFrame + 3, wordStartFrame + 6],
              [0.5, 1.2, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.back(2)),
              }
            )
          : interpolate(
              frame,
              [wordStartFrame, wordStartFrame + 4],
              [0.8, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );

        // Translation Y pour effet "pop up"
        const translateY = interpolate(
          frame,
          [wordStartFrame, wordStartFrame + 4],
          [10, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }
        );

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              fontFamily: UVCW_BRAND.fonts.body,
              fontSize: isWordEmphasis ? fontSize * 1.15 : fontSize,
              fontWeight: isWordEmphasis ? 700 : 500,
              color: isWordEmphasis ? matiereColor : "#ffffff",
              opacity,
              transform: `scale(${scale}) translateY(${translateY}px)`,
              textShadow: isWordEmphasis
                ? `0 0 20px ${matiereColor}60, 0 2px 10px rgba(0,0,0,0.5)`
                : "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * WordByWordBullet - Un point clé avec animation word-by-word
 */
export interface WordByWordBulletProps {
  text: string;
  matiere: MatiereSlug;
  bulletIndex: number;
  framesPerWord?: number;
  startFrame?: number;
}

export const WordByWordBullet: React.FC<WordByWordBulletProps> = ({
  text,
  matiere,
  bulletIndex,
  framesPerWord = 5,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const matiereColor = getMatiereColor(matiere);

  // Animation du bullet point
  const bulletScale = interpolate(
    frame,
    [startFrame, startFrame + 8, startFrame + 12],
    [0, 1.4, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(3)),
    }
  );

  const bulletOpacity = interpolate(
    frame,
    [startFrame, startFrame + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: UVCW_BRAND.spacing.md,
        marginBottom: UVCW_BRAND.spacing.lg,
      }}
    >
      {/* Bullet animé */}
      <div
        style={{
          minWidth: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: matiereColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${bulletScale})`,
          opacity: bulletOpacity,
          boxShadow: `0 0 15px ${matiereColor}50`,
          marginTop: 4,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontFamily: UVCW_BRAND.fonts.body,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {bulletIndex + 1}
        </span>
      </div>

      {/* Texte word-by-word */}
      <div style={{ flex: 1, paddingTop: 4 }}>
        <WordByWord
          text={text}
          matiere={matiere}
          framesPerWord={framesPerWord}
          startFrame={startFrame + 10} // Après le bullet
          fontSize={UVCW_BRAND.fontSize.md}
        />
      </div>
    </div>
  );
};
