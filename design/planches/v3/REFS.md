# REFS — Toile V3 (hérite de V2, + parcours 3D)

Date : 2026-11-16 · Direction retenue : **Métier** (loom instrument) · Auteur : Claude (designer).
Repo lu en lecture seule : `Tradoooo/toile` @ `71ceb3f` (clone local, jamais modifié).

## 1. Les 11 références fixes (REFERENCES-DESIGN.md) lues pour Toile

Les fiches viennent de `HACKATONS/REFERENCES-DESIGN.md` (métadonnées webdesign-inspiration du
2026-11-14). On prend des principes, jamais un layout, un texte, un asset ou une marque.

| # | Réf | Je prends pour Toile | Pourquoi (lien au sujet) | Je refuse |
|---|---|---|---|---|
| 1 | LogoPoint | une offre dite en une phrase, noir/blanc, zéro décor autour du pitch | Toile a une promesse simple (« un affichage pour QNX en VM ») qui doit tenir sans paragraphe | la mise en page corporate, la grille SaaS |
| 2 | Igloo | une scène 3D qui **est** le décor principal du premier écran | le métier à tisser porte le concept (framebuffer = toile) | la 3D réaliste lourde, l'univers crypto ; ici 3D CSS/SVG légère |
| 3 | Flow Computing | un seul relief éclairé par la gauche, ombré à droite ; une seule action à l'écran | le châssis aluminium du métier est éclairé comme ce relief ; seule action = « scroll » | le relief blanc et l'onglet Contact vertical |
| 4 | Dominic Burt | très grande linéale serrée ; un signe graphique récurrent | titre à 128 px, interlettrage −0,045 em ; signe récurrent = **la navette orange** | le tiret D—B, le portrait, la forme granuleuse crème |
| 5 | Teko | un seul mot repris dans l'accent ; preuve posée à côté de l'appel | « QNX » seul en orange dans le titre ; le chiffre `0 divergences` posé sous le titre | le magenta, le registre agence (« 40+ Reviews ») |
| 6 | NexusGPT | lisibilité produit avant spectacle | chaque planche nomme des fichiers réels (`core/src/cmdproc.c`…) | l'UI SaaS IA |
| 7 | Noon | fond sombre + **un seul** accent orange | graphite nuit + orange signal `#FF8A1F` = navette, erreur, mot-clé — rien d'autre | la vidéo de fond, le vocabulaire IA |
| 8 | Raben Rifaie | l'orange comme fil narratif d'une section à l'autre | la navette traverse les 5 planches (P1 tisse, P2 absente, P3 parcourt, P4 livre, P5 bute sur le trou) | la composition studio et ses assets 3D |
| 9 | Gapsy Studio | annotations « à la main » par-dessus la scène 3D | étiquettes mono reliées par un filet à la toile (« unwoven = no image yet ») | l'illustration ludique, les lettres en relief au mur |
| 10 | Concept Studio | hiérarchie plate, blocs d'information simples | tableaux de preuves, étapes, sources : blocs plats sans ornement | la palette jaune/blanc |
| 11 | Defy the Current | sombre + un accent chaud ; révélation séquentielle au scroll | reveal rangée par rangée, comme un tissage | le parallax photo, les grandes photos |

**Ancrage principal** (socle §3 : ≥ 2) : **Noon** (fond sombre + un orange unique), **Flow Computing**
(relief éclairé, premier écran sans menu), **Dominic Burt** (typo serrée + signe récurrent).

## 2. Parcours Awwwards réellement effectué (2026-11-16)

Navigateur : panneau navigateur intégré (rendu réel, cookies Awwwards) pour les listings, puis
Chrome headless local (Playwright 1.65, `channel: chrome`) pour ouvrir et capturer chaque site
(le panneau intégré ne dessinait pas : fenêtre masquée → « Screenshot timed out after 5s »).

Listings ouverts (HTTP 200) : `/websites/` (page 1), `/websites/?page=2`, `?page=3`, `?page=4`,
`?page=5` · catégories réellement présentes dans le menu : `/websites/3d/`, `/websites/webgl/`,
`/websites/experimental/`, `/websites/developer/` · `/websites/sites_of_the_day/`.
Note : en V1, `/websites/page/2/` répondait 404 ; la pagination réelle est `?page=N`.

Captures de travail (hors pack, non redistribuées) : scratchpad de session `aww/*.jpg`.

| # | Site (URL réellement visitée) | Trouvé via | 3 principes transférables | Je refuse |
|---|---|---|---|---|
| 1 | RIY3.0 Hive — https://riy3.com/ | `?page=2` | (a) un **plan filaire qui devient l'objet réel** au scroll ; (b) noir quasi total, une seule forme centrée ; (c) mini-tableau mono de statut en bas à gauche | le drone, le rendu 3D, la palette |
| 2 | Idealworks — https://www.idealworks.com/ | `?page=2` | (a) preuve en cartes blanches à puces cochées ; (b) titre court sur photo réelle de terrain ; (c) phrase de garantie par carte | le mur de cookies plein écran, la photo d'entrepôt |
| 3 | Turion Space — https://www.turionspace.com/ | `?page=5` | (a) sections numérotées `001/002/003` ; (b) télémétrie en ligne mono ; (c) titre de mission très court | — le headless a reçu une version texte (markdown) : je n'en tire que la structure, pas le rendu |
| 4 | North — https://north.cloud | `/webgl/` | (a) titre géant en capitales **décalé** sur deux colonnes ; (b) un seul petit cadre à coins pointés comme « objet » ; (c) section pleine couleur unique avec une phrase-choc | le violet, l'ordinateur-cerveau |
| 5 | Zirka — https://www.zrk.technology/ | page 1 / SOTD | (a) bandeau HUD mono en tête (horodatage, statut) ; (b) fond noir granuleux, sujet à peine éclairé ; (c) titre bas-gauche 3 lignes | le sujet militaire, la vidéo |
| 6 | Mecha — https://mecha-xyz.webflow.io/ | page 1 | (a) un énoncé en serif très large sur blanc ; (b) photos en mosaïque irrégulière ; (c) un seul bouton de couleur fixé en bas à droite | le serif, le bordeaux, la mosaïque photo |
| 7 | Forge Automotive — https://forgeautomotive.co.uk/ | page 1 | (a) écran noir + une ligne de manifeste centrée ; (b) logo seul en haut ; (c) entrée par consentement explicite | l'univers automobile, le pré-écran |
| 8 | Signal-A — https://signal-a.studio | `?page=4` | (a) typo mélangeant **fin et gras** dans la même phrase ; (b) grille de projets en lignes avec métadonnées mono à droite ; (c) heure/lieu en en-tête | le blanc studio, la phrase justifiée éclatée |
| 9 | Atmospherik — https://atmospherik.ai | `?page=4` | (a) **des filets lumineux qui relient des nœuds** au sol ; (b) progression chiffrée (%) en bas ; (c) titre minuscule centré, la scène parle | le personnage, la vidéo, le ciel |
| 10 | Orchestrated — https://orchestrated.nl/ | `/webgl/` | (a) préchargeur à compteur chiffré ; (b) un seul pictogramme blanc ; (c) « click to enable sound » discret | — seul le préchargeur a rendu en 5 s ; rien d'autre n'est cité |
| 11 | Autopilot — https://launch.joinautopilot.com | `/webgl/` | (a) mot à gauche / marque à droite, objet au centre ; (b) halo radial très doux ; (c) % de chargement | — seul le préchargeur a rendu ; pas d'autre principe revendiqué |
| 12 | Cyera AI Guardian — https://secure-the-unknown.cyera.com/ | SOTD page 1 | (a) un faisceau vertical comme marqueur de progression ; (b) éléments flottants autour du logo ; (c) barre de chargement fine | le violet, le mini-jeu (non rendu en headless) |
| 13 | Deferred Damage — http://plastic-ocean.com/ | `?page=5` | (a) **un seul objet** suivi tout au long du scroll ; (b) titre géant serré en haut, phrase courte en bas ; (c) **un chiffre énorme** posé à côté de l'objet | la bouteille, le turquoise, le sujet |

Couverture : 13 sites distincts, dont 9 venus des pages 2+ ou de catégories (RIY3, Idealworks, Turion,
North, Signal-A, Atmospherik, Orchestrated, Autopilot, Deferred Damage). Limites honnêtes : 3 sites
(Orchestrated, Autopilot, Cyera) n'ont montré que leur préchargeur en 5 s ; Turion a servi du texte.

## 3. Synthèse — les 5 principes retenus pour Toile

1. **Un seul objet tout le long** (Deferred Damage, RIY3) : la toile tendue sur son châssis. P1 à moitié
   tissée, P2 vide (seulement la chaîne), P3 parcourue rangée par rangée, P4 livrée (l'écran réel), P5
   trouée là où la limite est écrite. Le nom du projet *est* l'objet.
2. **Le plan devient l'objet** (RIY3) : la partie haute de la toile reste en fils de chaîne nus
   (le plan), la partie basse est tissée dans les **8 couleurs réelles de la mire** (`docs/preuves/
   toile-mire-1280x800.png`). On comprend « scanout + flush » sans lire.
3. **Un seul accent** (Noon, Teko) : orange = navette, mot « QNX », verdict `error`. Les états
   (passé, partiel, négatif, ouvert) sont portés par **glyphe + texte** (● ◐ ✕ ○), pas par la couleur.
   Cyan et vert de la V1 sont retirés (trop de couleurs, et l'info ne doit pas dépendre de la couleur).
4. **Typo comme image** (Dominic Burt, North) : linéale système très grande et serrée, mono pour tout
   ce qui est fichier, octet ou verdict ; mélange fin/gras pour le lede (Signal-A).
5. **Filets qui relient** (Atmospherik, Gapsy) : les annotations sont posées sur la scène par un filet
   fin — « guest · /dev/gpu0 », « QEMU window · scanout 0 », « unwoven = no image yet ».

Polices : **système uniquement** (Segoe UI Variable / Segoe UI / system-ui ; Cascadia Mono / Consolas),
aucune police sous licence embarquée, aucun CDN. Aucun asset tiers : les seules images sont deux
fichiers du repo Toile (MIT) ré-encodés en `data:` : `site/gif/toile.gif` et la mire 1280×800.

## 4. V3 — parcours de la catégorie 3D (2026-11-18, demande de Gaia : « inspire-toi davantage des refs 3D »)

Listings ouverts (navigateur intégré, HTTP 200) : `/websites/3d/`, `/websites/3d/?page=2`, `/websites/3d/?page=3`
(60 fiches lues, 40 URL de sites résolues). Sites ouverts et capturés en Chrome headless (Playwright,
WebGL SwiftShader, 3 captures par site : chargement, scroll 1 400 px, scroll 2 600 px).
Refus : `shvgvn.com` et `gencherry.com` ont répondu **403** au headless — non cités comme références.

| Site (URL visitée) | Source | Principe 3D transférable | Appliqué à Toile V3 | Je refuse |
|---|---|---|---|---|
| Igloo — https://www.igloo.inc/ | réf. fixe n° 2 | objet unique réaliste, **monochrome**, qui **s'éclate en blocs annotés** au scroll | métier alu monochrome ; P4 : les 3 couches en dalles éclatées, annotées à côté | la neige, l'igloo, les blocs lumineux |
| Flow Computing — https://flow-computing.com/ | réf. fixe n° 3 | relief mat éclairé par la gauche ; **puces vues de trois-quarts haut** | lumière clé à gauche ; vue éclatée en trois-quarts plongeant | le blanc total, les puces |
| Raben Rifaie — https://rabenrifaie.com/ | réf. fixe n° 8 | — seul l'écran d'accueil a rendu (bouton « Welcome ») | rien de plus que V2 | — |
| Gapsy — https://gapsystudio.com/ | réf. fixe n° 9 | lettres 3D dans une pièce, **lumière en bandes** | — (gardé : annotations sur la scène) | la pièce, les lettres rouges |
| Le Borrel — https://www.leborrel.nl/ | 3D p. 1 | **un objet centré, le mot géant derrière lui** ; mots de part et d'autre | « Toile » en filigrane géant derrière le métier (P1) | la boule à facettes, le serif |
| Konk Electrical — https://konkelectrical.com/ | 3D p. 1 | **la caméra avance au scroll** à travers des objets en profondeur, typo entre les plans | dolly caméra au scroll dans le héros | le marron/or, les photos |
| Genomines — https://www.genomines.com/ | 3D p. 1 | **fibres générées qui coulent** ; plongée aérienne en scroll | fils de chaîne en vraie géométrie (96 fils métal) | le vert, la vidéo agricole |
| mowa.studio — https://mowa.studio/ | 3D p. 1 | objet noir brillant extrudé, chiffres-preuves en bas | matière métal + clearcoat sur la navette | le logo blob |
| Stanza27 — https://stanza27.com/ | 3D p. 1 | lumière de **contre-jour** derrière une forme (horizon) | **le trou de P5 éclairé par derrière** | l'espace, le monolithe |
| Anduril — https://www.anduril.com/ | 3D p. 2 | rendus matériels sur tuiles sombres, un objet par tuile | — (confirme : un objet par planche) | les visuels défense |
| /nk.studio — https://www.nk.studio/ | 3D p. 1 | typo géante + un seul point de couleur | — (déjà en V2 : un seul accent) | le turquoise |
| Psychoactive — https://www.psychoactive.co.nz/ | 3D p. 2 | brume de profondeur, cartes flottantes | fondu des bords du canvas (masque) | la brume volumétrique, le son |
| ORVAE — https://orvae.undreamstudio.com/ | 3D p. 2 | — seul le préchargeur a rendu | — | — |
| Matthis Garnier — https://matthisgarnier.com | 3D p. 1 | objets manipulables (boutons, cassettes) | parallaxe au pointeur sur la caméra | l'esthétique bureau rétro |

### Synthèse 3D retenue pour V3

1. **Une vraie scène WebGL, un seul objet** (Igloo, Le Borrel) : three.js r187, métier en alu brossé,
   96 fils de chaîne, toile tissée (texture de mire + carte de normales du tissage), navette usinée.
2. **Le mot derrière l'objet** (Le Borrel, Konk) : « Toile » géant en filigrane derrière le métier (P1).
3. **La caméra qui raconte** (Konk) : intro tissée en 2,6 s, dolly au scroll, parallaxe au pointeur ;
   la boucle de rendu s'arrête seule ; `prefers-reduced-motion` = une seule image, aucune boucle.
4. **Contre-jour** (Stanza27) : P2 chaîne nue éclairée par derrière, P5 trou béant éclairé par derrière.
5. **Vue éclatée annotée** (Igloo, Flow) : P4, les 3 couches en dalles 3D, mire sur la couche Screen,
   flèches de dépendance orange vers le bas.
