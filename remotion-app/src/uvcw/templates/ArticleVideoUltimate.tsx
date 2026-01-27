import { AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig } from "remotion";
import { MatiereSlug } from "../config/matieres";
import { KenBurnsEffect } from "../components/KenBurnsImage";
import { HookSlide } from "../components/HookSlide";
import { TitleSlideKenBurns } from "../components/TitleSlideKenBurns";
import { BulletPointsAnimated } from "../components/BulletPointsAnimated";
import { Outro } from "../components/Outro";
import { ProgressBar } from "../components/ProgressBar";
import { SoundPreset } from "../config/sounds";

export interface ArticleVideoUltimateProps {
  // Hook
  hook: {
    chiffreChoc: string;
    contexte: string;
    accroche?: string;
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

  // Ken Burns
  kenBurnsEffect?: KenBurnsEffect;
  kenBurnsIntensity?: number;

  // Audio - Legacy (chemins relatifs depuis public/)
  sounds?: {
    impact?: string;
    whoosh?: string;
    pop?: string;
    success?: string;
  };

  // Audio - Nouveau système avec preset complet
  soundPreset?: SoundPreset;

  // Timing (en frames, 30fps)
  hookDuration?: number;
  titleDuration?: number;
  bulletsDuration?: number;
  outroDuration?: number;

  // Options visuelles
  showProgressBar?: boolean;
}

/**
 * ArticleVideoUltimate - Template vidéo avec TOUT
 *
 * Features :
 * - Hook avec chiffre choc
 * - Ken Burns amplifié sur les images
 * - Word-by-word sur les bullets
 * - Progress bar discrète
 * - Sound design (optionnel)
 *
 * Structure :
 * 1. HOOK (2s) - Chiffre choc + impact sound
 * 2. TITLE (4s) - Ken Burns + whoosh
 * 3. BULLETS (9s) - Word-by-word + pop sounds
 * 4. OUTRO (3s) - CTA + success sound
 *
 * Durée totale: ~18 secondes
 */
export const ArticleVideoUltimate: React.FC<ArticleVideoUltimateProps> = ({
  hook,
  titre,
  accroche,
  matiere,
  photoUrl,
  articleUrl,
  typeContenu,
  pointsCles = [],
  kenBurnsEffect = "zoomInPanRight",
  kenBurnsIntensity = 1.2,
  sounds,
  soundPreset,
  hookDuration = 60,
  titleDuration = 120,
  bulletsDuration = 270,
  outroDuration = 90,
  showProgressBar = true,
}) => {
  const { durationInFrames } = useVideoConfig();

  // Si pas de points clés, on saute la section
  const showBullets = pointsCles.length > 0;
  const actualBulletsDuration = showBullets ? bulletsDuration : 0;

  // Timeline
  const hookStart = 0;
  const titleStart = hookDuration;
  const bulletsStart = titleStart + titleDuration;
  const outroStart = bulletsStart + actualBulletsDuration;

  // Calculer frames par point pour les bullets
  const framesPerPoint = showBullets
    ? Math.floor((actualBulletsDuration - 30) / pointsCles.length)
    : 70;

  // Résoudre les sons (preset a priorité sur sounds legacy)
  const impactSound = soundPreset?.hook || sounds?.impact;
  const impactVolume = soundPreset?.hookVolume ?? 0.7;
  const transitionSound = soundPreset?.transition || sounds?.whoosh;
  const transitionVolume = soundPreset?.transitionVolume ?? 0.5;
  const bulletSound = soundPreset?.bulletPop || sounds?.pop;
  const bulletVolume = soundPreset?.bulletPopVolume ?? 0.4;
  const outroSound = soundPreset?.outro || sounds?.success;
  const outroVolume = soundPreset?.outroVolume ?? 0.6;
  const musicTrack = soundPreset?.music;
  const musicVolume = soundPreset?.musicVolume ?? 0.2;

  return (
    <AbsoluteFill>
      {/* ============================================
          AUDIO - Sound Design
          ============================================ */}

      {/* 🎵 MUSIQUE DE FOND - Toute la durée */}
      {musicTrack && (
        <Audio
          src={staticFile(musicTrack)}
          volume={musicVolume}
          startFrom={0}
        />
      )}

      {/* 💥 Impact sound sur le hook */}
      {impactSound && (
        <Sequence from={5} layout="none">
          <Audio
            src={staticFile(impactSound)}
            volume={impactVolume}
          />
        </Sequence>
      )}

      {/* 🌊 Whoosh sur transition vers title */}
      {transitionSound && (
        <Sequence from={hookDuration - 5} layout="none">
          <Audio
            src={staticFile(transitionSound)}
            volume={transitionVolume}
          />
        </Sequence>
      )}

      {/* 🔊 Pop sounds pour chaque bullet */}
      {bulletSound && showBullets && pointsCles.map((_, index) => {
        const bulletStartFrame = bulletsStart + 25 + index * framesPerPoint;
        return (
          <Sequence key={`bullet-sound-${index}`} from={bulletStartFrame} layout="none">
            <Audio
              src={staticFile(bulletSound)}
              volume={bulletVolume}
            />
          </Sequence>
        );
      })}

      {/* 🌊 Whoosh sur transition vers outro */}
      {transitionSound && (
        <Sequence from={outroStart - 5} layout="none">
          <Audio
            src={staticFile(transitionSound)}
            volume={transitionVolume * 0.8}
          />
        </Sequence>
      )}

      {/* ✅ Success sound sur outro */}
      {outroSound && (
        <Sequence from={outroStart + 15} layout="none">
          <Audio
            src={staticFile(outroSound)}
            volume={outroVolume}
          />
        </Sequence>
      )}

      {/* ============================================
          VIDÉO - Séquences visuelles
          ============================================ */}

      {/* HOOK - Chiffre choc */}
      <Sequence from={hookStart} durationInFrames={hookDuration} layout="none">
        <HookSlide
          chiffreChoc={hook.chiffreChoc}
          contexte={hook.contexte}
          accroche={hook.accroche}
          matiere={matiere}
          photoUrl={photoUrl}
        />
      </Sequence>

      {/* TITLE - Ken Burns amplifié */}
      <Sequence from={titleStart} durationInFrames={titleDuration} layout="none">
        <TitleSlideKenBurns
          titre={titre}
          accroche={accroche}
          matiere={matiere}
          photoUrl={photoUrl}
          typeContenu={typeContenu}
          kenBurnsEffect={kenBurnsEffect}
          kenBurnsIntensity={kenBurnsIntensity}
          overlayOpacity={0.7}
        />
      </Sequence>

      {/* BULLETS - Word-by-word */}
      {showBullets && (
        <Sequence from={bulletsStart} durationInFrames={actualBulletsDuration} layout="none">
          <BulletPointsAnimated
            points={pointsCles}
            matiere={matiere}
            titre="Ce qu'il faut retenir"
            framesPerPoint={framesPerPoint}
            framesPerWord={4}
          />
        </Sequence>
      )}

      {/* OUTRO - CTA */}
      <Sequence from={outroStart} durationInFrames={outroDuration} layout="none">
        <Outro matiere={matiere} articleUrl={articleUrl} />
      </Sequence>

      {/* ============================================
          PROGRESS BAR - Toujours visible
          ============================================ */}
      {showProgressBar && (
        <ProgressBar
          matiere={matiere}
          height={4}
          position="bottom"
          glowEffect={true}
        />
      )}
    </AbsoluteFill>
  );
};
