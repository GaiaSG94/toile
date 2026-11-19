# DESIGN — Toile

## V1 — 2026-11-15

Intention: turn the product promise into a five-page site: a QNX guest becomes visible through a physical loom metaphor, with the real pipeline and the real limits kept readable.

Direction: **Signal Loom** — graphite night, brushed aluminium, smoked QEMU glass, signal orange shuttle, cyan command flow, conformance green only for measured evidence. The 8-bar test pattern remains project data, not decoration.

References applied: LogoPoint, Igloo, Flow Computing, Dominic Burt, Teko, NexusGPT, Noon, Raben Rifaie, Gapsy Studio, Concept Studio, Defy the Current. Awwwards categories actually opened in Chrome: 3D, WebGL, Scrolling, Technology, Portfolio; traversal limitations are recorded in `planches/v1/REFS.md`.

Produced: P1 understanding, P2 problem, P3 ten-step pipeline, P4 real live guest product screen, P5 proofs and written limits. All pages are autonomous and use no network request.

Verification: `node build.mjs` and `node verify.mjs` executed. All plates pass JS, network, identity, overlap, contrast, text size, mobile width, reduced-motion, above-fold, and mire-color checks. Captures generated at 1440×900 and 390×844, plus contact sheet.

Capture review iteration 1: automated geometry/contrast/mobile checks found no overlap or readability defects; the model cannot inspect image pixels directly, so this limitation is explicit.

Capture review iteration 2: pixel audit found P3/P4/P5 first screens too sparse; added the wire panel to P3, the real mire window to P4, and the 63-dot proof field to P5. Rebuilt and reverified.

Open defects: visual human review still recommended because this model cannot read PNG attachments. `planche-contact.jpg` is generated and ready for human review.

### Changelog vs previous round

- First round; no previous design pack existed.
- Added complete autonomous build/verify system and five-page product site.
- Corrected source vocabulary to match the repository and kept the 8 real mire colors.

## V2 — 2026-11-18

Intention : refaire le site produit autour d'**un seul objet** — la toile tendue sur un métier en aluminium, tissée rangée par rangée dans les 8 couleurs réelles de la mire de l'invité. Le nom du projet est l'image.

Direction : **Métier** (option A, recommandée parmi A Métier / B Calque / C Console — voir `planches/v2/PLAN.md`). Graphite nuit, **un seul accent orange** (navette, mot-clé, verdict d'erreur) ; états portés par glyphe + texte (● ◐ ✕ ○), plus par la couleur ; typo système très grande et serrée ; mono pour fichiers, octets, verdicts.

Références : 11 refs fixes lues et appliquées (ancrage Noon, Flow Computing, Dominic Burt) + parcours Awwwards réel du 2026-11-16 : pages 1 à 5 du listing (`?page=N`), catégories 3D, WebGL, Experimental, Developer, Sites of the Day ; 13 sites ouverts et capturés en Chrome headless (RIY3, Idealworks, Turion, North, Zirka, Mecha, Forge, Signal-A, Atmospherik, Orchestrated, Autopilot, Cyera, Deferred Damage). Détail et refus dans `planches/v2/REFS.md`.

Planches : P1 toile à mi-tissage · P2 chaîne nue, écran noir, 5 acteurs du cahier, avant/après · P3 octets réels `wire/boot-graphique.hex` + 10 étapes nommées (24 chemins vérifiés) + boucle invité↔hôte · P4 **écran réel** (GIF de la vitrine + mire 1280×800) + vue éclatée 3 couches en annexe + 8 pages de site · P5 12 chiffres tracés, E1–E6, invariants, 5 limites écrites, toile **trouée** (SIGSEGV resmgr), niveaux S/C/X.

Vérification : `node build.mjs` + `node verify.mjs` → ALL PLATES PASS (sortie dans STATUS.md). Les chiffres sont vérifiés contre un clone lecture seule du repo (`TOILE_REPO`) : chaque valeur doit apparaître telle quelle dans son fichier source.

Relecture des captures :
- Itération 1 : débord horizontal mobile (rotation 3D du métier +1 px, grille des pages P4 +34 px) → `scale(.96)` mobile, `overflow-wrap` sur les cartes. Ajout d'un avertissement P4 (voir défauts). Planche-contact recadrée.
- Itération 2 : P5, chiffres-clés et grille rendus en 16 px (un sélecteur `span` écrasait le grand chiffre) → sélecteurs enfants ; titre P5 sur 5 lignes → taille réduite ; texte collé au bord gauche en 390 px (`padding` du héros écrasant la gouttière) → `padding-block` ; conteneur porté à 1440 px pour garder 1296 px utiles ; étiquette P2 qui masquait la navette déplacée.

Défauts ouverts / points à trancher :
1. **FPS** : le README annonce 30 im/s ; les compteurs visibles dans `site/gif/toile.gif` affichent « FPS 14 » par client. Affiché tel quel sur P4 comme point ouvert — à confirmer par Baptiste.
2. **Mire** : le README parle de « six barres de couleur » ; l'image `docs/preuves/toile-mire-1280x800.png` en montre **8** (+ rampe de gris + damier). Les planches suivent l'image.
3. Le brief annonçait 9 verdicts et D1–D16 : le repo en fige **10** (`CONTRACT.md` §6, avec `TOILE_MODEL_COUNTEREXAMPLE`) et va jusqu'à **D18**. Planches alignées sur le repo.
4. `verify.mjs` : la fonction `checkPlate` dépasse 50 lignes (règle d'hygiène du socle §4) — à découper.
5. Polices système (Segoe UI / Cascadia) : rendu différent hors Windows ; pas de police embarquée par choix (zéro réseau, pas de licence).

### Changelog vs V1

- Toile réellement tissée (rangées animées, motif dessus/dessous) au lieu d'un écran de mire dans un cadre ; trou en P5.
- Titre P1 sur 3 lignes pleines (V1 : un mot par ligne, chevauchant la scène) ; lede et chiffre-clé au-dessus de la ligne de flottaison.
- 4 couleurs d'accent → 1 (orange) ; cyan et vert retirés ; glyphes d'état.
- Images réelles du repo embarquées en `data:` (GIF vitrine, mire) au lieu de mires redessinées.
- Chiffres corrigés (10 verdicts, D18) et tracés automatiquement contre le repo, table SRC en pied de chaque planche.
- Parcours Awwwards refait avec 13 sites réellement ouverts (V1 : aucun site individuel visité).
- Planche-contact lisible (5 planches côte à côte, 3000 px).

## V3 — 2026-11-18

Demande de Gaia : « inspire-toi davantage des refs design de la catégorie 3D ». Delta sur V2, même direction (Métier), même texte, mêmes chiffres.

Intention : passer d'une 3D CSS/SVG à une **vraie scène WebGL** où le métier à tisser est un objet réaliste, éclairé, qui porte chaque planche.

Références : parcours de la catégorie Awwwards **3D** (pages 1 à 3 du listing, 14 sites ouverts et capturés en Chrome headless avec WebGL) + les 4 refs fixes taguées 3D (Igloo, Flow Computing, Raben Rifaie, Gapsy). Principes retenus : objet unique monochrome (Igloo), mot géant derrière l'objet (Le Borrel), caméra qui avance au scroll (Konk), contre-jour (Stanza27), vue éclatée annotée (Igloo, Flow). Détail dans `planches/v3/REFS.md` §4.

Technique : `src/scene3d.js` (three.js r187) → `bundle3d.mjs` (rolldown, une fois) → `src/vendor/scene3d.iife.js` (547 Ko, MIT, vendorisé) → inliné par `build.mjs`. Zéro requête réseau. Presets : P1 mi-tissé · P2 chaîne nue en contre-jour · P3 plan rapproché sur la navette · P4 vue éclatée des 3 couches · P5 toile trouée éclairée par derrière. Repli : la loom SVG de V2 reste dans chaque conteneur si WebGL manque. La boucle de rendu s'arrête après l'intro (~4 s) et ne repart qu'au pointeur ou au scroll ; `prefers-reduced-motion` = une image fixe, aucune boucle.

Vérification : `node build.mjs` + `node verify.mjs` → ALL PLATES PASS, avec deux contrôles nouveaux : WebGL actif sur 5/5 planches, boucle 3D arrêtée en reduced-motion (sortie dans STATUS.md).

Relecture des captures :
- Itération 1 : objet trop près et rogné, alu « plastique blanc », couleurs de mire délavées par ACES, fils de chaîne devant la trame, étiquettes sous le canvas, trou P5 invisible → caméras reculées, alu plus sombre, tone mapping Neutral, chaîne derrière la trame, z-index des étiquettes, disque lumineux derrière le trou.
- Itération 2 : P3 trop serré et coupé net, trou P5 toujours plein → cadrage P3 élargi, bords du canvas fondus (masque). Cause du trou trouvée en instrumentant : `destination-out` reprenait l'alpha 16 % du dernier `fillStyle` (alpha 214 au centre du trou) → remplissage opaque, alpha 0 vérifié.
- Itération 3 : vue éclatée P4 ajoutée, dalle haute rognée et flèches posées sur les dalles → caméra reculée, flèches à côté.

Défauts ouverts :
1. FPS (README 30 im/s vs « FPS 14 » dans le GIF) et mire (6 vs 8 barres) — toujours à trancher par Baptiste.
2. Le bundle 3D dépend de `three` + `rolldown` présents dans `2026-12-04-kiroween/Crypte/node_modules` (variable `THREE_ROOT`) ; le fichier vendorisé suffit pour reconstruire sans eux.
3. Rendu WebGL vérifié en SwiftShader (headless) ; à revoir sur un vrai GPU et un vrai mobile (performances, ombres).
4. Poids : ~580 Ko par planche (three.js inliné dans chacune, pour rester autonomes).

### Changelog vs V2

- Loom SVG/CSS → scène three.js réelle (métal PBR, ombres, environnement, 96 fils, navette usinée), SVG gardé en repli.
- P3 : le héros devient le plan rapproché 3D sur la navette ; le panneau d'octets descend en première section.
- P4 : la vue éclatée des 3 couches passe en dalles 3D annotées.
- P5 : vrai trou découpé dans la toile, lumière derrière.
- P1 : « Toile » géant en filigrane derrière le métier.
- `verify.mjs` découpé (plus de fonction > 50 lignes) et étendu aux contrôles WebGL.

## LOCK — V3 — 2026-11-18

Décision de Gaia : **« Garder, lock V3 »**. Les 5 planches V3 sont validées ensemble (`/lock` : toutes les pages ont leur planche validée).

- Design verrouillé : direction **Métier 3D** (`planches/v3/`), système commun (grille, typo, palette graphite + un seul accent orange `#FF8A1F`, métier WebGL, glyphes d'état ● ◐ ✕ ○).
- À partir d'ici : **plus d'exploration**, uniquement des deltas (`/delta`, `/cible <écran>`), appliqués dans un nouveau dossier `v4/` qui part de V3. V1, V2 et V3 restent archivées et ne sont plus modifiées.
- Restent ouverts et ne bloquent pas le lock : FPS (README 30 im/s vs « FPS 14 » dans le GIF), mire (6 vs 8 barres), contrôle sur un vrai GPU et un vrai mobile. Si Baptiste corrige le README, le delta se limite à `src/data.js` et à l'avertissement de P4.
