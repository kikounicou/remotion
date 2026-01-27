import { AbsoluteFill, Sequence } from "remotion";
import { MatiereSlug } from "../config/matieres";
import { TitleSlide, BulletPoints, Outro } from "../components";

/**
 * Interface pour les données JSON d'un article UVCW
 */
export interface ArticleJsonData {
  titre: string;
  soustitre?: string;
  accroche: string;
  matiere_principale_id: number;
  terme_url: string; // Slug matière (ex: "energie")
  couleur_web: string;
  Type_contenu?: string; // "Actualités", "Formations", etc.
  Type_contenu_court?: string;
  article_id: number;
  article_url: string;
  photo_url?: string;
  contenu: string;
  dateonline?: string;
}

export interface ArticleVideoProps {
  // Données de base
  titre: string;
  accroche: string;
  matiere: MatiereSlug;

  // Optionnels
  photoUrl?: string;
  articleUrl?: string;
  typeContenu?: string;
  pointsCles?: string[];

  // Timing (en frames, 30fps)
  titleDuration?: number; // défaut: 150 (5s) - Slide titre avec tout
  bulletsDuration?: number; // défaut: 300 (10s)
  outroDuration?: number; // défaut: 90 (3s)
}

/**
 * ArticleVideo - Template vidéo complet pour articles UVCW
 *
 * Structure PUNCHY :
 * 1. TITLE SLIDE (5s) - Logo + Picto + Tag + Titre + Accroche + Image - TOUT D'UN COUP
 * 2. POINTS CLÉS (10s) - Bullets animés
 * 3. OUTRO (3s) - CTA + URL + Logo
 *
 * Durée totale: ~18 secondes (540 frames à 30fps)
 */
export const ArticleVideo: React.FC<ArticleVideoProps> = ({
  titre,
  accroche,
  matiere,
  photoUrl,
  articleUrl,
  typeContenu,
  pointsCles = [],
  titleDuration = 150,
  bulletsDuration = 300,
  outroDuration = 90,
}) => {
  // Si pas de points clés fournis, on saute la section
  const showBullets = pointsCles.length > 0;
  const actualBulletsDuration = showBullets ? bulletsDuration : 0;

  // Calculer les points de départ
  const titleStart = 0;
  const bulletsStart = titleDuration;
  const outroStart = bulletsStart + actualBulletsDuration;

  return (
    <AbsoluteFill>
      {/* TITLE SLIDE - Tout intégré : Logo, Picto, Tag, Titre, Accroche, Image */}
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

      {/* POINTS CLÉS - Bullets animés */}
      {showBullets && (
        <Sequence from={bulletsStart} durationInFrames={actualBulletsDuration} layout="none">
          <BulletPoints
            points={pointsCles}
            matiere={matiere}
            titre="Points clés"
            framesPerPoint={Math.floor(actualBulletsDuration / (pointsCles.length + 1))}
          />
        </Sequence>
      )}

      {/* OUTRO - CTA + Logo */}
      <Sequence from={outroStart} durationInFrames={outroDuration} layout="none">
        <Outro matiere={matiere} articleUrl={articleUrl} />
      </Sequence>
    </AbsoluteFill>
  );
};

/**
 * Helper: Transformer un JSON d'article en props ArticleVideo
 */
export function articleJsonToProps(json: ArticleJsonData): ArticleVideoProps {
  return {
    titre: json.titre,
    accroche: json.accroche,
    matiere: json.terme_url as MatiereSlug,
    photoUrl: json.photo_url,
    articleUrl: json.article_url,
    typeContenu: json.Type_contenu_court || json.Type_contenu,
    // Les points clés devront être extraits séparément
    pointsCles: [],
  };
}

/**
 * Helper: Extraire des points clés basiques du contenu
 * (Prend la première phrase de chaque paragraphe)
 */
export function extractBasicKeyPoints(contenu: string, maxPoints: number = 4): string[] {
  const paragraphs = contenu
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  const points: string[] = [];

  for (const paragraph of paragraphs) {
    if (points.length >= maxPoints) break;

    // Prendre la première phrase (jusqu'au premier point)
    const firstSentence = paragraph.split(/\.\s/)[0];
    if (firstSentence && firstSentence.length > 20 && firstSentence.length < 200) {
      points.push(firstSentence.trim() + (firstSentence.endsWith(".") ? "" : "."));
    }
  }

  return points;
}
