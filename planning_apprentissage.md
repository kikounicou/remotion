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

**Exercice 3.1 - Vidéo avec overlay**

- Intégrer une vidéo de fond
- Ajouter du texte animé par-dessus
- **But** : Maîtriser `<Video>` et la superposition  


**Exercice 3.2 - Audio synchronisé**

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


### Niveau 5 : Données dynamiques (automatisation)

**Exercice 5.1 - Stats animées**

- Graphique simple qui se construit
- Chiffres qui s'incrémentent
- **But** : Visualisation de données  


**Exercice 5.2 - Template paramétrable**

- Une composition avec `defaultProps`
- Rendu via CLI avec paramètres
- **But** : Automatiser la génération  


### Niveau 6 : Déploiement Cloud (AWS Lambda)

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

### Niveau 7 : Projets réels (tes objectifs)

**Projet A - Résumé d'article**

- Input : titre + 3-5 points clés
- Output : Vidéo 30-60 secondes avec infographie
- **But** : Illustrer vos articles


**Projet B - Post LinkedIn**

- Format carré (1080x1080)
- Citation ou stat mise en valeur
- Logo et branding
- **But** : Contenu social


**Projet C - Pipeline IA + Lambda**

- Intégration avec Claude/GPT pour générer le contenu
- Rendu via Lambda (pas en local)
- API complète : texte → vidéo automatiquement
- **But** : Automatisation complète à grande échelle  


---

## Parcours recommandé

```
Semaine 1 : Exercices 1.1 → 2.2 (Bases + Séquencement)
Semaine 2 : Exercices 3.1 → 4.2 (Média + Texte)
Semaine 3 : Exercices 5.1 → 5.2 (Données + Automatisation)
Semaine 4 : Exercices 6.1 → 6.3 (AWS Lambda)
Semaine 5 : Projets A, B, C (Cas réels avec Lambda)
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

