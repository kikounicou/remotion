import { useCurrentFrame, interpolate, staticFile } from "remotion";
import { UVCW_BRAND } from "../config/brand";
import { getMatiere, MatiereSlug } from "../config/matieres";

// Charger la font picto
const fontFace = `
@font-face {
  font-family: "picto";
  src: url("${staticFile("uvcw/fonts/picto.woff2")}") format("woff2"),
       url("${staticFile("uvcw/fonts/picto.woff")}") format("woff"),
       url("${staticFile("uvcw/fonts/picto.ttf")}") format("truetype");
  font-weight: normal;
  font-style: normal;
}
`;

// Injecter le style une seule fois
if (typeof document !== "undefined") {
  const styleId = "uvcw-picto-font";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = fontFace;
    document.head.appendChild(style);
  }
}

// Mapping des codes unicode pour chaque matière
const PICTO_CODES: Record<string, string> = {
  "aide-alimentaire": "\ue837",
  "aide-aux-familles": "\ue80a",
  "aide-sociale": "\ue809",
  aines: "\ue808",
  "amenagement-territoire": "\ue829",
  communication: "\ue828",
  cultes: "\ue827",
  culture: "\ue826",
  "developpement-local": "\ue80b",
  "propriete-intellectuelle": "\ue82f",
  "e-gov": "\ue824",
  "efficacite-personnelle": "\ue830",
  energie: "\ue836",
  enseignement: "\ue807",
  environnement: "\ue806",
  "population-etat-civil": "\ue810",
  etrangers: "\ue805",
  international: "\ue81e",
  finances: "\ue804",
  fonctionnement: "\ue803",
  "funerailles-sepultures": "\ue818",
  patrimoine: "\ue822",
  incendie: "\ue81a",
  insertion: "\ue81c",
  intercommunalite: "\ue81d",
  jeunesse: "\ue81f",
  logement: "\ue802",
  data: "\ue80c",
  mandataires: "\ue800",
  "marches-publics": "\ue82e",
  "mediation-dette": "",
  "methodologie-travail-social": "\ue831",
  mobilite: "\ue82d",
  paralocaux: "\ue82c",
  "participation-citoyenne": "\ue82b",
  pauvrete: "\ue821",
  personnel: "\ue80d",
  "police-administrative": "\ue80e",
  "police-locale": "\ue80f",
  ville: "\ue832",
  ruralite: "\ue833",
  sante: "\ue812",
  "sociale-energie": "\ue823",
  "sport-loisirs": "\ue813",
  "strategie-management": "\ue801",
  voirie: "\ue815",
};

interface PictoProps {
  matiere: MatiereSlug;
  size?: number;
  color?: string;
  animate?: boolean;
}

export const Picto: React.FC<PictoProps> = ({
  matiere,
  size = 48,
  color,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const matiereData = getMatiere(matiere);
  const pictoCode = PICTO_CODES[matiere];

  if (!pictoCode || !matiereData) {
    return null;
  }

  const finalColor = color || `#${matiereData.couleurTexte}`;

  const opacity = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.fast], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const scale = animate
    ? interpolate(frame, [0, UVCW_BRAND.animation.fast], [0.5, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <span
      style={{
        fontFamily: "picto",
        fontSize: size,
        color: finalColor,
        opacity,
        transform: `scale(${scale})`,
        display: "inline-block",
        lineHeight: 1,
      }}
    >
      {pictoCode}
    </span>
  );
};
