import { Composition } from "remotion";
import {
  ArticlePost,
  ArticlePostProps,
  ArticleVideo,
  ArticleVideoProps,
  ArticleVideoWithHook,
  ArticleVideoWithHookProps,
  ArticleVideoUltimate,
  ArticleVideoUltimateProps,
} from "./templates";
import { UVCW_BRAND } from "./config/brand";
import { SOUND_PRESETS } from "./config/sounds";

/**
 * Compositions UVCW
 *
 * À importer dans Root.tsx
 */
export const UvcwCompositions: React.FC = () => {
  const { width, height } = UVCW_BRAND.formats.square;
  const fps = 30;

  return (
    <>
      {/* Template Article Post - Style LinkedIn */}
      <Composition
        id="UVCW-ArticlePost"
        component={ArticlePost}
        durationInFrames={150} // 5 secondes
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            titre: "L'UVCW s'inquiète et questionne le Fédéral",
            sousTitre: "Saturation des réseaux électriques en Wallonie :",
            matiere: "energie",
            overlayOpacity: 0.75,
          } satisfies ArticlePostProps
        }
      />

      {/* Variantes de test pour différentes matières */}
      <Composition
        id="UVCW-ArticlePost-Environnement"
        component={ArticlePost}
        durationInFrames={150}
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            titre: "Nouvelles mesures pour la gestion des déchets communaux",
            sousTitre: "Environnement :",
            matiere: "environnement",
            overlayOpacity: 0.8,
          } satisfies ArticlePostProps
        }
      />

      <Composition
        id="UVCW-ArticlePost-Finances"
        component={ArticlePost}
        durationInFrames={150}
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            titre: "Budget 2026 : ce qui change pour les communes",
            sousTitre: "Finances et fiscalité :",
            matiere: "finances",
            overlayOpacity: 0.8,
          } satisfies ArticlePostProps
        }
      />

      {/* ===========================================
          ARTICLE VIDEO - Template vidéo complet
          =========================================== */}

      {/* Article 9454 - Énergie - Communautés d'énergie */}
      <Composition
        id="UVCW-ArticleVideo-9454"
        component={ArticleVideo}
        durationInFrames={540} // 18 secondes à 30fps (5s titre + 10s bullets + 3s outro)
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            titre: "Publication du rapport de la CWaPE sur les communautés d'énergie",
            accroche:
              "En février 2025, la CWaPE a publié un rapport faisant suite à une consultation publique sur les communautés d'énergie, à laquelle l'UVCW avait participé.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "L'UVCW a participé à une consultation publique sur les communautés d'énergie en septembre 2024.",
              "Seuls 3 projets de communautés d'énergie validés à ce jour en Wallonie.",
              "Incompatibilité entre le cadre actuel et les régies communales autonomes.",
              "Nécessité d'un accompagnement structuré avec un facilitateur indépendant.",
            ],
            titleDuration: 150,
            bulletsDuration: 300,
            outroDuration: 90,
          } satisfies ArticleVideoProps
        }
      />

      {/* Version courte sans bullets - Test */}
      <Composition
        id="UVCW-ArticleVideo-Short"
        component={ArticleVideo}
        durationInFrames={240} // 8 secondes (5s titre + 3s outro)
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            titre: "Publication du rapport de la CWaPE sur les communautés d'énergie",
            accroche:
              "En février 2025, la CWaPE a publié un rapport faisant suite à une consultation publique sur les communautés d'énergie.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [], // Pas de points clés = pas de section bullets
            titleDuration: 150,
            bulletsDuration: 0,
            outroDuration: 90,
          } satisfies ArticleVideoProps
        }
      />

      {/* ===========================================
          ARTICLE VIDEO WITH HOOK - Version game-changer
          =========================================== */}

      {/* Article 9454 avec HOOK - Chiffre choc d'accroche */}
      <Composition
        id="UVCW-ArticleVideo-9454-Hook"
        component={ArticleVideoWithHook}
        durationInFrames={540} // 18s (2s hook + 4s titre + 9s bullets + 3s outro)
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            // HOOK - Le chiffre qui arrête le scroll
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes wallonnes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "Incompatibilité avec les régies communales autonomes",
              "Frais administratifs trop élevés des fournisseurs",
              "Aucun intérêt pour les bénéficiaires du tarif social",
              "Absence d'accompagnement structuré",
            ],
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoWithHookProps
        }
      />

      {/* Version Hook courte - Sans bullets */}
      <Composition
        id="UVCW-ArticleVideo-Hook-Short"
        component={ArticleVideoWithHook}
        durationInFrames={270} // 9s (2s hook + 4s titre + 3s outro)
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes wallonnes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [],
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 0,
            outroDuration: 90,
          } satisfies ArticleVideoWithHookProps
        }
      />

      {/* ===========================================
          ARTICLE VIDEO ULTIMATE - Toutes les features
          =========================================== */}

      {/* Version ULTIMATE - Hook + Ken Burns + Word-by-word + Progress bar */}
      <Composition
        id="UVCW-ArticleVideo-Ultimate"
        component={ArticleVideoUltimate}
        durationInFrames={540} // 18s
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes wallonnes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "Incompatibilité avec les régies communales autonomes",
              "Frais administratifs trop élevés des fournisseurs",
              "Aucun intérêt pour les bénéficiaires du tarif social",
              "Absence d'accompagnement structuré",
            ],
            kenBurnsEffect: "zoomInPanRight",
            kenBurnsIntensity: 1.2,
            showProgressBar: true,
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoUltimateProps
        }
      />

      {/* Ultimate avec autre effet Ken Burns */}
      <Composition
        id="UVCW-ArticleVideo-Ultimate-PanLeft"
        component={ArticleVideoUltimate}
        durationInFrames={540}
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "Incompatibilité avec les régies communales autonomes",
              "Frais administratifs trop élevés des fournisseurs",
              "Aucun intérêt pour les bénéficiaires du tarif social",
              "Absence d'accompagnement structuré",
            ],
            kenBurnsEffect: "zoomInPanLeft",
            kenBurnsIntensity: 1.5,
            showProgressBar: true,
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoUltimateProps
        }
      />

      {/* ===========================================
          🔊 ULTIMATE AVEC SOUND DESIGN COMPLET
          =========================================== */}

      {/* Version ULTIMATE + CINEMATIC SOUND - La totale ! */}
      <Composition
        id="UVCW-ArticleVideo-Ultimate-Sound"
        component={ArticleVideoUltimate}
        durationInFrames={540} // 18s
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes wallonnes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "Incompatibilité avec les régies communales autonomes",
              "Frais administratifs trop élevés des fournisseurs",
              "Aucun intérêt pour les bénéficiaires du tarif social",
              "Absence d'accompagnement structuré",
            ],
            kenBurnsEffect: "zoomInPanRight",
            kenBurnsIntensity: 1.2,
            showProgressBar: true,
            // 🔊 SOUND DESIGN - Preset cinématique complet
            soundPreset: SOUND_PRESETS.cinematic,
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoUltimateProps
        }
      />

      {/* Version CORPORATE SOUND - Plus subtile */}
      <Composition
        id="UVCW-ArticleVideo-Ultimate-Corporate"
        component={ArticleVideoUltimate}
        durationInFrames={540}
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "Incompatibilité avec les régies communales autonomes",
              "Frais administratifs trop élevés des fournisseurs",
              "Aucun intérêt pour les bénéficiaires du tarif social",
              "Absence d'accompagnement structuré",
            ],
            kenBurnsEffect: "zoomIn",
            kenBurnsIntensity: 1.0,
            showProgressBar: true,
            // 🔊 SOUND DESIGN - Preset corporate (plus subtil)
            soundPreset: SOUND_PRESETS.corporate,
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoUltimateProps
        }
      />

      {/* Version SOCIAL SOUND - Dynamique pour réseaux sociaux */}
      <Composition
        id="UVCW-ArticleVideo-Ultimate-Social"
        component={ArticleVideoUltimate}
        durationInFrames={540}
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "3",
              contexte: "projets validés sur 262 communes",
              accroche: "Pourquoi si peu ?",
            },
            titre: "Communautés d'énergie : le rapport de la CWaPE",
            accroche:
              "L'UVCW a participé à la consultation et relayé les freins rencontrés par les communes.",
            matiere: "energie",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/2946.jpg",
            articleUrl: "https://www.uvcw.be/energie/actus/art-9454",
            pointsCles: [
              "Incompatibilité avec les régies communales autonomes",
              "Frais administratifs trop élevés des fournisseurs",
              "Aucun intérêt pour les bénéficiaires du tarif social",
              "Absence d'accompagnement structuré",
            ],
            kenBurnsEffect: "panRight",
            kenBurnsIntensity: 1.3,
            showProgressBar: true,
            // 🔊 SOUND DESIGN - Preset social (dynamique)
            soundPreset: SOUND_PRESETS.social,
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoUltimateProps
        }
      />

      {/* ===========================================
          ARTICLE 9653 - Réforme du chômage (Insertion)
          =========================================== */}

      {/* Article 9653 - Insertion socioprofessionnelle - Réforme chômage */}
      <Composition
        id="UVCW-ArticleVideo-9653"
        component={ArticleVideoUltimate}
        durationInFrames={540}
        fps={fps}
        width={width}
        height={height}
        defaultProps={
          {
            hook: {
              chiffreChoc: "180 000",
              contexte: "personnes exclues du chômage dès 2026",
              accroche: "Qui va les accompagner ?",
            },
            titre: "Réforme du chômage : impacts sur les pouvoirs locaux",
            accroche:
              "L'UVCW et la Fédération des CPAS alertent sur les conséquences durables pour les communes.",
            matiere: "insertion",
            typeContenu: "Actualité",
            photoUrl: "https://www.uvcw.be/images/photos/1500/3015.jpg",
            articleUrl: "https://www.uvcw.be/insertion/actus/art-9653",
            pointsCles: [
              "300 millions insuffisants selon les estimations",
              "Prise en charge sur fonds propres des CPAS dès 2027",
              "Mécanismes bonus/malus complexifient la répartition",
              "L'UVCW demande un suivi rigoureux et une réévaluation",
            ],
            kenBurnsEffect: "zoomInPanLeft",
            kenBurnsIntensity: 1.5,
            showProgressBar: true,
            hookDuration: 60,
            titleDuration: 120,
            bulletsDuration: 270,
            outroDuration: 90,
          } satisfies ArticleVideoUltimateProps
        }
      />
    </>
  );
};
