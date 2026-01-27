# Vidéo Infographique : Workflow Évaluations Formations

> Storyboard pour vidéo explicative du système automatisé de traitement des formulaires d'évaluation UVCW.

---

## Informations générales

| Paramètre | Valeur |
|-----------|--------|
| **Durée cible** | 60-90 secondes |
| **Format** | 1920x1080 (YouTube/LinkedIn) |
| **Style** | Infographie animée, icônes flat design |
| **Ton** | Professionnel mais accessible |
| **Public** | Équipe UVCW, direction, partenaires techniques |

---

## Structure de la vidéo

### INTRO (0-5s)
**Hook visuel**

```
┌─────────────────────────────────────────┐
│                                         │
│     📄 → 🤖 → 📊                        │
│                                         │
│   "Du papier au dashboard"              │
│   "en 2 minutes"                        │
│                                         │
└─────────────────────────────────────────┘
```

- **Animation** : 3 icônes qui apparaissent en séquence (papier → robot → graphique)
- **Texte** : Titre accrocheur
- **Son** : Impact subtil

---

### SECTION 1 : Génération du formulaire (5-12s)
**"Avant la formation"**

```
┌─────────────────────────────────────────┐
│  🏢 UVCW                                │
│     │                                   │
│     ▼                                   │
│  💻 ColdFusion ────► 📄 Formulaire      │
│     │                    │              │
│     │                    ▼              │
│  🗄️ SQL Server      TPH/8328/343/       │
│                                         │
└─────────────────────────────────────────┘
```

**Éléments animés :**
1. Icône serveur UVCW pulse
2. Flèche animée vers formulaire Word
3. Code session apparaît (TPH/XXXX/343/)
4. Formulaire "sort" de l'écran vers l'imprimante

**Texte overlay :**
- "Le système génère automatiquement le formulaire"
- "Titre, formateurs, date, questions..."

**Icônes nécessaires :**
- 🏢 Bâtiment/Institution
- 💻 Serveur/Code
- 🗄️ Base de données
- 📄 Document Word
- 🖨️ Imprimante

---

### SECTION 2 : Formation + Scan (12-20s)
**"Après la formation"**

```
┌─────────────────────────────────────────┐
│                                         │
│  👥 Participants                        │
│     │                                   │
│     ▼ (remplissent)                     │
│  📝 Formulaires papier                  │
│     │                                   │
│     ▼                                   │
│  🖨️ Scanner ────────► 📧 Email          │
│              (auto)      │              │
│                          ▼              │
│                     evals@ik.me         │
│                                         │
└─────────────────────────────────────────┘
```

**Éléments animés :**
1. Groupe de personnes avec formulaires
2. Pile de formulaires qui "tombe" dans le scanner
3. Scanner qui pulse/clignote
4. Enveloppe email qui s'envole vers le cloud

**Texte overlay :**
- "Les participants remplissent à la main"
- "Scan automatique → Email"

**Icônes nécessaires :**
- 👥 Groupe de personnes
- 📝 Formulaire avec crayon
- 🖨️ Scanner MFP
- 📧 Enveloppe email

---

### SECTION 3 : N8N Automation (20-28s)
**"Automatisation"**

```
┌─────────────────────────────────────────┐
│                                         │
│  📧 Email                               │
│     │                                   │
│     ▼                                   │
│  ⚡ N8N Workflow                        │
│     │                                   │
│     ├── ✅ Check PDF                    │
│     ├── 🏷️ Rename                       │
│     │                                   │
│     ▼                                   │
│  ☁️ Upload AWS S3                       │
│                                         │
└─────────────────────────────────────────┘
```

**Éléments animés :**
1. Email arrive dans N8N (logo N8N)
2. Checklist qui se coche automatiquement
3. Fichier renommé (animation texte)
4. Upload vers cloud AWS (flèche montante)

**Texte overlay :**
- "N8N surveille la boîte mail"
- "Validation automatique"
- "Upload vers AWS"

**Icônes nécessaires :**
- ⚡ Logo N8N
- ✅ Checkmark
- 🏷️ Tag/Label
- ☁️ Cloud AWS (orange)

---

### SECTION 4 : AWS Lambda Pipeline (28-45s)
**"Le cerveau dans le cloud"**

C'est la section la plus longue et technique. Diviser en sous-animations.

#### 4.1 Lambda 1 - Identification (28-33s)

```
┌─────────────────────────────────────────┐
│  📂 S3 temp/                            │
│     │                                   │
│     ▼                                   │
│  λ1 ─────► 👁️ Textract                  │
│     │         │                         │
│     │         ▼                         │
│     │      "TPH/8328/343/"              │
│     │                                   │
│     ├──► ✂️ Split (2 pages/fichier)     │
│     │                                   │
│     ▼                                   │
│  📂 S3 individuals/                     │
│                                         │
└─────────────────────────────────────────┘
```

**Animation :**
1. PDF entre dans Lambda (icône λ orange)
2. Œil Textract "scanne" le document
3. Code session extrait (highlight)
4. PDF se découpe en plusieurs petits PDFs
5. Fichiers tombent dans bucket S3

#### 4.2 Lambda 2 - Analyse OCR (33-38s)

```
┌─────────────────────────────────────────┐
│                                         │
│  📄 8328-1.pdf ──► λ2 ──► 👁️ Textract   │
│  📄 8328-2.pdf ──► λ2 ──► 👁️ Textract   │
│  📄 8328-3.pdf ──► λ2 ──► 👁️ Textract   │
│     (parallèle)         │               │
│                         ▼               │
│                    📋 JSON brut         │
│                                         │
└─────────────────────────────────────────┘
```

**Animation :**
1. Plusieurs fichiers entrent en parallèle (effet "fan-out")
2. Textract analyse (tables, forms, layout)
3. JSON sort de chaque analyse

#### 4.3 Lambda 3 - Parsing + Azure (38-43s)

```
┌─────────────────────────────────────────┐
│                                         │
│  📋 JSON Textract                       │
│     │                                   │
│     ▼                                   │
│  λ3 ──────────────────────────┐         │
│     │                         │         │
│     │ Cases cochées?          │ Texte?  │
│     ▼                         ▼         │
│  ✅ Direct              🧠 Azure DI     │
│     │                         │         │
│     └──────────┬──────────────┘         │
│                ▼                        │
│           📋 JSON structuré             │
│                                         │
└─────────────────────────────────────────┘
```

**Animation :**
1. JSON entre dans Lambda 3
2. Branchement : cases cochées (simple) vs texte manuscrit (Azure)
3. Logo Azure (bleu) pour l'OCR manuscrit
4. Les deux flux se rejoignent → JSON structuré

**Point clé à mettre en avant :**
- "AWS pour la structure, Azure pour l'écriture"

#### 4.4 Lambda 4 - Agrégation (43-48s)

```
┌─────────────────────────────────────────┐
│                                         │
│  ⏰ EventBridge (2 min)                 │
│     │                                   │
│     ▼                                   │
│  λ4 ◄── 📋 JSON-1                       │
│     ◄── 📋 JSON-2                       │
│     ◄── 📋 JSON-3                       │
│     │                                   │
│     ▼ (merge)                           │
│  📦 JSON combiné                        │
│     │                                   │
│     ▼                                   │
│  🌐 Webhook UVCW                        │
│                                         │
└─────────────────────────────────────────┘
```

**Animation :**
1. Timer qui compte (ou horloge)
2. Plusieurs JSONs qui "fusionnent" en un seul
3. Flèche vers le serveur UVCW (webhook)

---

### SECTION 5 : Import ColdFusion (48-55s)
**"Retour à la maison"**

```
┌─────────────────────────────────────────┐
│  🏢 UVCW INTRANET                       │
│                                         │
│  🌐 Webhook                             │
│     │                                   │
│     ▼                                   │
│  💻 ColdFusion ──────► 🗄️ SQL Server    │
│     │                                   │
│     ▼                                   │
│  🤖 GPT-4o (correction OCR)             │
│     │                                   │
│     ▼                                   │
│  ✨ Données propres                     │
│                                         │
└─────────────────────────────────────────┘
```

**Éléments animés :**
1. Webhook reçu (notification)
2. Import dans base de données
3. Robot GPT qui "nettoie" le texte
4. Texte avant/après (ex: "fomration" → "formation")

**Texte overlay :**
- "Import automatique en base"
- "IA corrige les erreurs OCR"

---

### SECTION 6 : Dashboard (55-65s)
**"Le résultat final"**

```
┌─────────────────────────────────────────┐
│  📊 DASHBOARD                           │
│  ┌─────────────────────────────────┐    │
│  │ ★★★★☆ 4.2/5                     │    │
│  │ ████████░░ 82%                  │    │
│  │                                 │    │
│  │ 📄 PDF + 🔍 Highlight           │    │
│  │ ┌─────────────────────────┐    │    │
│  │ │ [X] Très satisfait      │    │    │
│  │ │ [ ] Satisfait           │    │    │
│  │ └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

**Éléments animés :**
1. Dashboard qui s'ouvre
2. Graphiques qui s'animent (barres, camembert)
3. PDF avec zone surlignée (highlight géométrique)
4. Statistiques qui comptent (4.2/5)

**Texte overlay :**
- "Vérification visuelle"
- "Correction en un clic"

---

### OUTRO (65-75s)
**Récapitulatif visuel**

```
┌─────────────────────────────────────────┐
│                                         │
│  📄 ──► 🖨️ ──► ⚡ ──► ☁️ ──► 📊        │
│  Papier  Scan   N8N   AWS   Dashboard   │
│                                         │
│         "2 minutes"                     │
│      "0 intervention manuelle"          │
│                                         │
│         🏢 UVCW                         │
│                                         │
└─────────────────────────────────────────┘
```

**Animation finale :**
1. Timeline horizontale avec toutes les étapes
2. Flèche qui parcourt le flux
3. Chiffres clés qui apparaissent
4. Logo UVCW

**Chiffres à afficher :**
- "2 minutes" de traitement
- "0 intervention manuelle"
- "~0.10€ par formulaire"

---

## Palette de couleurs

| Élément | Couleur | Hex |
|---------|---------|-----|
| AWS | Orange | `#FF9900` |
| Azure | Bleu | `#0078D4` |
| N8N | Rose/Magenta | `#FF4F81` |
| UVCW | Rouge bordeaux | `#8B1A1A` |
| ColdFusion | Bleu foncé | `#2563EB` |
| Success/OK | Vert | `#10B981` |
| Fond | Gris foncé | `#1F2937` |
| Texte | Blanc | `#FFFFFF` |

---

## Icônes nécessaires

### Services Cloud
- AWS Lambda (λ orange)
- AWS S3 (bucket vert)
- AWS Textract (œil violet)
- AWS EventBridge (horloge violette)
- Azure Document Intelligence (cerveau bleu)

### Infrastructure
- Serveur / Base de données
- Cloud générique
- Webhook / API

### Documents
- PDF / Document
- Formulaire papier
- JSON / Code

### Actions
- Scanner / Imprimante
- Email / Enveloppe
- Flèches / Flux
- Checkmark / Validation
- Ciseaux (split)
- Merge / Fusion

### Personnes
- Groupe de participants
- Robot / IA

---

## Transitions suggérées

| Entre sections | Type de transition |
|----------------|-------------------|
| Intro → Section 1 | Fade |
| Section 1 → 2 | Slide (formulaire qui sort) |
| Section 2 → 3 | Whoosh (email qui s'envole) |
| Section 3 → 4 | Zoom into cloud |
| Section 4.x → 4.y | Slide horizontal |
| Section 4 → 5 | Flèche descendante |
| Section 5 → 6 | Ouverture dashboard |
| Section 6 → Outro | Zoom out timeline |

---

## Sons suggérés

| Moment | Son |
|--------|-----|
| Intro | Impact léger |
| Upload S3 | Whoosh montant |
| Lambda trigger | Pop/Click |
| Textract scan | Scan sound |
| Merge JSONs | Success chord |
| Dashboard | UI sounds |
| Outro | Music fade out |

---

## Notes techniques Remotion

### Composants à créer

1. **FlowArrow** - Flèche animée entre deux points
2. **ServiceIcon** - Icône de service avec label
3. **DocumentFlow** - Document qui se déplace
4. **ParallelProcess** - Plusieurs éléments en parallèle
5. **MergeAnimation** - Fusion de plusieurs éléments
6. **DashboardMockup** - Interface dashboard simplifiée
7. **Timeline** - Ligne de temps horizontale

### Structure suggérée

```
src/infographies/
├── eval-workflow/
│   ├── EvalWorkflowVideo.tsx      # Composition principale
│   ├── components/
│   │   ├── FlowArrow.tsx
│   │   ├── ServiceIcon.tsx
│   │   ├── DocumentFlow.tsx
│   │   └── ...
│   ├── sections/
│   │   ├── IntroSection.tsx
│   │   ├── GenerationSection.tsx
│   │   ├── ScanSection.tsx
│   │   ├── N8NSection.tsx
│   │   ├── AWSSection.tsx
│   │   ├── ImportSection.tsx
│   │   ├── DashboardSection.tsx
│   │   └── OutroSection.tsx
│   └── config/
│       ├── colors.ts
│       ├── timing.ts
│       └── icons.ts
└── index.ts
```

---

## Prochaines étapes

1. [ ] Valider le storyboard avec l'équipe
2. [ ] Sourcer les icônes (Lucide, Heroicons, ou custom SVG)
3. [ ] Créer la structure de dossiers
4. [ ] Développer les composants de base
5. [ ] Assembler section par section
6. [ ] Ajouter les sons
7. [ ] Review et ajustements
8. [ ] Render final

---

*Document créé le 27/01/2026*
