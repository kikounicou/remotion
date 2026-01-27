import { AbsoluteFill, Sequence } from "remotion";
import { MatiereSlug } from "../config/matieres";
import { HookSlide, TitleSlide, BulletPoints, Outro } from "../components";

export interface ArticleVideoWithHookProps {
  // Hook - L'accroche choc
  hook: {
    chiffreChoc: string; // "3", "85%", "0€"
    contexte: string; // "projets validés en Wallonie"
    accroche?: string; // "Pourquoi si peu ?"
  };

  // Contenu principal
  titre: string;
  accroche: string;
  matiere: MatiereSlug;

  // Optionnels
  photoUrl?: string;
  articleUrl?: string;
  typeContenu?: string;
  pointsCles?: string[];

  // Timing (en frames, 30fps)
  hookDuration?: number; // défaut: 60 (2s)
  titleDuration?: number; // défaut: 120 (4s)
  bulletsDuration?: number; // défaut: 270 (9s)
  outroDuration?: number; // défaut: 90 (3s)
}

/**
 * ArticleVideoWithHook - Template vidéo avec HOOK d'accroche
 *
 * Structure STORYTELLING :
 * 1. HOOK (2s) - Chiffre choc qui arrête le scroll
 * 2. TITLE SLIDE (4s) - Contexte complet
 * 3. POINTS CLÉS (9s) - Les détails importants
 * 4. OUTRO (3s) - CTA
 *
 * Durée totale: ~18 secondes (540 frames à 30fps)
 */
export const ArticleVideoWithHook: React.FC<ArticleVideoWithHookProps> = ({
  hook,
  titre,
  accroche,
  matiere,
  photoUrl,
  articleUrl,
  typeContenu,
  pointsCles = [],
  hookDuration = 60,
  titleDuration = 120,
  bulletsDuration = 270,
  outroDuration = 90,
}) => {
  // Si pas de points clés, on saute la section
  const showBullets = pointsCles.length > 0;
  const actualBulletsDuration = showBullets ? bulletsDuration : 0;

  // Timeline
  const hookStart = 0;
  const titleStart = hookDuration;
  const bulletsStart = titleStart + titleDuration;
  const outroStart = bulletsStart + actualBulletsDuration;

  return (
    <AbsoluteFill>
      {/* HOOK - Chiffre choc pour arrêter le scroll */}
      <Sequence from={hookStart} durationInFrames={hookDuration} layout="none">
        <HookSlide
          chiffreChoc={hook.chiffreChoc}
          contexte={hook.contexte}
          accroche={hook.accroche}
          matiere={matiere}
          photoUrl={photoUrl}
        />
      </Sequence>

      {/* TITLE SLIDE - Contexte complet */}
      <Sequence from={titleStart} durationInFrames={titleDuration} layout="none">
        <TitleSlide
          titre={titre}
          accroche={accroche}
          matiere={matiere}
          photoUrl={photoUrl}
          typeContenu={typeContenu}
          overlayOpacity={0.72}
        />
      </Sequence>

      {/* POINTS CLÉS - Détails */}
      {showBullets && (
        <Sequence from={bulletsStart} durationInFrames={actualBulletsDuration} layout="none">
          <BulletPoints
            points={pointsCles}
            matiere={matiere}
            titre="Ce qu'il faut retenir"
            framesPerPoint={Math.floor(actualBulletsDuration / (pointsCles.length + 1))}
          />
        </Sequence>
      )}

      {/* OUTRO - CTA */}
      <Sequence from={outroStart} durationInFrames={outroDuration} layout="none">
        <Outro matiere={matiere} articleUrl={articleUrl} />
      </Sequence>
    </AbsoluteFill>
  );
};
