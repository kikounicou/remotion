## Exercices proposés (alignés avec tes objectifs)

### Niveau 1 : Les bases (comprendre le moteur)

**Exercice 1.1 - Hello World modifié**

- Modifier le texte, couleurs, timing du template existant
- Comprendre `useCurrentFrame()`, `interpolate()`, `spring()`
- **But** : Se familiariser avec le studio et le rendu  


**Exercice 1.2 - Compteur animé**

- Créer un compteur de 0 à 100 avec animation
- Utiliser `interpolate()` pour des easings différents
- **But** : Maîtriser les animations basées sur les frames  


### Niveau 2 : Séquencement (raconter une histoire)

**Exercice 2.1 - Slideshow simple**

- 3 slides avec transitions fade
- Texte + image par slide
- **But** : Comprendre `<Sequence>` et `<Series>`  


**Exercice 2.2 - Intro/Outro template**

- Logo animé en intro
- Contenu central
- Call-to-action en outro
- **But** : Créer un template réutilisable  


### Niveau 3 : Média (enrichir le contenu)

**Exercice 3.1 - Images libres de droits**

- Télécharger des images depuis Unsplash/Pexels
- Utiliser `<Img>` avec animations (zoom, pan, fade)
- Créer un Ken Burns effect (zoom lent sur image)
- **But** : Maîtriser les images et leurs animations

**Exercice 3.2 - Vidéo avec overlay**

- Intégrer une vidéo de fond (Pexels Videos)
- Ajouter du texte animé par-dessus
- Contrôler volume, playbackRate, startFrom/endAt
- **But** : Maîtriser `<Video>` et la superposition

**Exercice 3.3 - Audio synchronisé** ✅ (fait dans 1.1)

- Musique de fond avec fade in/out
- Synchroniser des éléments visuels
- **But** : Comprendre `<Audio>` et le timing audio  


### Niveau 4 : Texte & Captions (ton cas d'usage principal)

**Exercice 4.1 - Texte mot par mot (style TikTok)**

- Afficher un texte mot par mot
- Highlight du mot courant
- **But** : Préparer les sous-titres dynamiques  


**Exercice 4.2 - Citation animée**

- Afficher une citation avec animation élégante
- Auteur qui apparaît après
- **But** : Format idéal pour LinkedIn  


### Niveau 5 : Branding & Templates réutilisables

**Exercice 5.1 - Kit de marque**

- Créer des constantes de branding (couleurs, fonts, logo)
- Composants réutilisables : Logo, Watermark, LowerThird
- Fichier de config centralisé
- **But** : Avoir une identité visuelle cohérente

**Exercice 5.2 - Lower Thirds (bandeaux)**

- Bandeau animé avec nom/titre
- Différents styles (corporate, gaming, minimal)
- Position configurable (bas gauche, bas droite)
- **But** : Éléments pro pour interviews/tutos

**Exercice 5.3 - Transitions de marque**

- Transitions personnalisées avec logo
- Wipe, reveal, glitch effects
- **But** : Transitions uniques à ta marque

---

### Niveau 6 : Infographies & Data Viz

**Exercice 6.1 - Stats animées**

- Graphique simple qui se construit (barres, lignes)
- Chiffres qui s'incrémentent avec easing
- **But** : Visualisation de données

**Exercice 6.2 - Infographie d'article**

- Input : titre + 3-5 bullet points
- Layout automatique avec icônes
- Animation séquentielle des points
- **But** : Transformer un article en vidéo

**Exercice 6.3 - Template paramétrable**

- Une composition avec `defaultProps` et schema Zod
- Rendu via CLI avec paramètres JSON
- **But** : Automatiser la génération

---

### Niveau 7 : Text-to-Speech (Tutoriels)

**Exercice 7.1 - Intégration TTS basique**

- Utiliser une API TTS (ElevenLabs, OpenAI, Google)
- Générer un MP3 depuis du texte
- Synchroniser avec les visuels
- **But** : Ajouter une voix off

**Exercice 7.2 - Captions synchronisées**

- Générer des timestamps depuis le TTS
- Afficher les sous-titres mot par mot
- Highlight du mot prononcé
- **But** : Accessibilité + engagement

**Exercice 7.3 - Tutoriel complet**

- Script texte → TTS → Vidéo avec captions
- Visuels qui suivent la narration
- **But** : Créer des tutos automatiquement  


### Niveau 8 : Déploiement Cloud (AWS Lambda)

**Exercice 6.1 - Setup Lambda**

- Configurer AWS credentials
- Installer `@remotion/lambda`
- Déployer une fonction Lambda
- **But** : Préparer l'infrastructure cloud

**Exercice 6.2 - Rendu distant**

- Rendre une vidéo via Lambda (pas en local)
- Comparer les temps de rendu local vs cloud
- Gérer les fichiers S3 (input/output)
- **But** : Maîtriser le rendu serverless

**Exercice 6.3 - API de génération**

- Créer une API (Express/Fastify) qui déclenche Lambda
- Endpoint POST avec paramètres → vidéo générée
- Webhook de notification quand la vidéo est prête
- **But** : Exposer la génération vidéo comme service

**Pourquoi Lambda ?**

| Local | Lambda |
|-------|--------|
| 1 vidéo à la fois | Centaines en parallèle |
| Ta machine bloquée | Serverless, scalable |
| Gratuit | ~0.01-0.05$ par vidéo |

Cas d'usage : GitHub Unwrapped, Spotify Wrapped, vidéos personnalisées SaaS.

---

### Niveau 9 : Projets réels (tes objectifs)

**Projet A - Résumé d'article avec infographie**

- Input : titre + 3-5 points clés (JSON ou Markdown)
- Infographie animée avec icônes
- Voix off TTS optionnelle
- Output : Vidéo 30-60 secondes
- **But** : Transformer vos articles en vidéos

**Projet B - Post LinkedIn/TikTok**

- Format carré (1080x1080) ou vertical (1080x1920)
- Citation ou stat mise en valeur
- Branding complet (logo, couleurs, lower third)
- Musique de fond
- **But** : Contenu social viral

**Projet C - Tutoriel automatisé**

- Script texte → TTS (ElevenLabs/OpenAI)
- Captions synchronisées mot par mot
- Visuels qui suivent la narration
- **But** : Créer des tutos sans enregistrer sa voix

**Projet D - Pipeline IA + Lambda**

- Claude/GPT génère le script et les bullet points
- TTS génère la voix
- Remotion Lambda rend la vidéo
- API complète : sujet → vidéo automatiquement
- **But** : Automatisation complète à grande échelle  


---

## Parcours recommandé

```
Semaine 1 : Exercices 1.1 → 2.2 (Bases + Séquencement) ✅ FAIT
Semaine 2 : Exercices 3.1 → 4.2 (Média + Texte)
Semaine 3 : Exercices 5.1 → 5.3 (Branding + Templates)
Semaine 4 : Exercices 6.1 → 6.3 (Infographies + Data)
Semaine 5 : Exercices 7.1 → 7.3 (Text-to-Speech)
Semaine 6 : Exercices 8.1 → 8.3 (AWS Lambda)
Semaine 7 : Projets A, B, C, D (Cas réels)
```

---

## Fichiers clés du projet existant

- `remotion-app/src/Root.tsx` - Définition des compositions
- `remotion-app/src/HelloWorld.tsx` - Exemple d'animation complète
- `remotion-app/src/HelloWorld/Title.tsx` - Animation texte mot par mot
- `.claude/skills/remotion/rules/` - 28 règles de bonnes pratiques  


---

## Vérification

Pour valider chaque exercice :

1. Ouvrir le studio (`npm run dev` dans remotion-app)
2. Prévisualiser l'animation
3. Rendre en MP4 (`npx remotion render <id> output.mp4`)
4. Vérifier la qualité du rendu final  


---

## Prochaine étape : Exercice 1.1 - Modifier Hello World

### Objectif

Comprendre les concepts fondamentaux en modifiant le template existant.

### Ce qu'on va faire

1. **Ouvrir le studio** et observer l'animation HelloWorld
2. **Modifier les props** : texte, couleurs
3. **Modifier le timing** : durée, délais entre éléments
4. **Ajouter une animation simple** : un nouvel élément qui apparaît
5. **Rendre la vidéo** en MP4  


### Concepts à maîtriser

- `useCurrentFrame()` - obtenir le frame actuel
- `useVideoConfig()` - obtenir fps, durée, dimensions
- `interpolate()` - mapper une valeur sur une plage
- `spring()` - animation avec rebond naturel
- `<Sequence>` - positionner dans le temps  


### Fichiers à modifier

- `remotion-app/src/Root.tsx` - pour les defaultProps
- `remotion-app/src/HelloWorld.tsx` - pour les animations
- `remotion-app/src/HelloWorld/Title.tsx` - pour le texte animé  

