// UVCW - Union des Villes et Communes de Wallonie
// Module Remotion pour la création de vidéos

// Configuration
export { UVCW_BRAND } from "./config/brand";
export type { UvcwFormat } from "./config/brand";

export { MATIERES, getMatiere, getMatiereColor } from "./config/matieres";
export type { Matiere, MatiereSlug, MatiereOrganisation } from "./config/matieres";

// Composants
export * from "./components";

// Templates
export * from "./templates";

// Compositions (à importer dans Root.tsx)
export { UvcwCompositions } from "./compositions";
