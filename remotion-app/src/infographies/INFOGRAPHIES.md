# Infographies Animees

Module de visualisation de workflows et diagrammes animes.

## Compositions

| ID | Description | Duree | Format |
|----|-------------|-------|--------|
| `Infographie-EvalWorkflow` | Workflow complet avec sections | 38s | 1920x1080 |
| `Infographie-EvalFlow` | Diagramme de flux simplifie | 15s | 1080x1080 |
| `Infographie-EvalFlowV2` | Version dark theme optimisee | 20s | 1080x1080 |

## Structure

```
infographies/
├── eval-workflow/              # Workflow multi-sections
│   ├── components/             # Composants visuels
│   │   ├── AnimatedIcon.tsx    # Icones avec spring animations
│   │   ├── DocumentFlow.tsx    # Animation de documents
│   │   ├── FlowArrow.tsx       # Fleches de connexion
│   │   ├── ParticleBackground.tsx  # Particules decoratives
│   │   ├── ProgressTimeline.tsx    # Timeline de progression
│   │   ├── SectionTitle.tsx    # Titres de sections
│   │   └── ServiceBox.tsx      # Boites de services
│   ├── config/
│   │   ├── theme.ts            # Couleurs, polices
│   │   └── icons.tsx           # Bibliotheque d'icones SVG
│   ├── sections/               # Sections de la video
│   │   ├── IntroSection.tsx    # Introduction
│   │   ├── ScanSection.tsx     # Etape Scanner
│   │   ├── N8NSection.tsx      # Etape N8N automation
│   │   ├── AWSSection.tsx      # Etape AWS Lambda
│   │   ├── DashboardSection.tsx # Etape Dashboard
│   │   └── OutroSection.tsx    # Conclusion
│   ├── EvalWorkflowVideo.tsx   # Composition principale
│   └── index.ts                # Exports
│
├── eval-workflow-flow/         # Diagramme de flux anime
│   ├── components/
│   │   ├── FlowingDocument.tsx # Document avec animation
│   │   └── Label.tsx           # Labels textuels
│   ├── config/
│   │   └── theme.ts            # Theme sombre
│   ├── EvalWorkflowFlow.tsx    # Version 1 (fond clair)
│   ├── EvalWorkflowFlowV2.tsx  # Version 2 (fond sombre)
│   └── index.ts
│
├── index.ts                    # Export principal
└── INFOGRAPHIES.md             # Ce fichier
```

## EvalWorkflowFlow V2 (recommande)

La version V2 est la plus aboutie :

- **Theme sombre** : Fond bleu nuit (#0A0F1C → #1a2744)
- **Format carre** : 1080x1080 (ideal reseaux sociaux)
- **Animations spring** : Mouvements naturels
- **Sans mouvement de camera** : Tous elements dans le cadre

### Workflow visualise

```
Scanner → N8N → S3 → Lambda
                 ↓
         Split PDFs
                 ↓
         Analysis (Azure)
                 ↓
      Data + Dashboard
```

### Theme de couleurs

```typescript
const DARK_THEME = {
  background: "#0A0F1C",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  accent: "#6366F1",      // Violet
  success: "#10B981",     // Vert
  warning: "#F59E0B",     // Orange
  // Services
  scanner: "#6366F1",
  n8n: "#EC4899",         // Rose
  s3: "#10B981",
  lambda: "#FF9900",      // Orange AWS
  azure: "#0078D4",       // Bleu Azure
};
```

## Commandes

```bash
# Rendu video
npx remotion render Infographie-EvalFlowV2 output.mp4

# Rendu image (frame specifique)
npx remotion still Infographie-EvalFlowV2 preview.png --frame=300
```

## Notes techniques

- Utilise `spring()` pour toutes les animations d'entree
- `interpolate()` avec Easing pour les transitions
- Pas de `Math.random()` (non deterministe)
- Audio optionnel via `staticFile()`
