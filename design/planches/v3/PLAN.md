# PLAN — Toile V2 (5 planches, site produit, EN)

## Pourquoi une V2

Relecture des captures V1 (2026-11-16) : titre P1 cassé mot par mot dans une colonne trop étroite
(« A / display / for / QNX / in a / VM. »), le titre chevauche la scène, lede coupé sous la ligne de
flottaison, `planche-contact.jpg` écrasée en bandeau illisible, aucune toile réellement tissée (la
« loom » était un écran de mire posé dans un cadre), quatre couleurs d'accent. Corrections chiffrées :
la V1 annonçait 9 verdicts — `CONTRACT.md` §6 en fige **10** (`TOILE_MODEL_COUNTEREXAMPLE` inclus) ;
le brief cite D1–D16 — `docs/DECISIONS.md` va jusqu'à **D18**.

## Trois directions artistiques

| | A — **Métier** (recommandée) | B — Calque | C — Console |
|---|---|---|---|
| Idée | la toile tendue sur un châssis alu, tissée rangée par rangée dans les couleurs de la mire ; le haut reste en fils nus | papier calque clair, relief blanc éclairé à gauche ; la mire est la seule couleur ; oracles imprimés comme des calques | tout part de la console série noire ; l'image se « résout » depuis le texte mono |
| Fond / accent | graphite nuit `#07090D` / orange `#FF8A1F` seul | blanc cassé / noir, aucun accent hors mire | noir / orange |
| Refs | Noon, Flow Computing, Dominic Burt + RIY3, Deferred Damage | Flow Computing, LogoPoint, NexusGPT + Mecha | Zirka, Igloo, D.FY + Turion |
| Force | le nom = l'objet ; scanout/flush lisible sans texte ; continuité avec V1 (direction non verrouillée mais déjà vue par Gaia) | très lisible, très « instrument de mesure » | colle au vécu (« console série uniquement ») |
| Risque | 3D CSS à doser | perd l'énergie du premier écran ; peu de contraste avec les autres projets QNX | raconte le problème mieux que la solution ; monotone sur 5 pages |

**Recommandation : A — Métier**, reconstruite (pas retouchée) : vraie toile tissée, titre sur 3 lignes
pleines, un seul accent, états en glyphe + texte. **Prochaine action** : construire A ; B reste
disponible en `/variantes` si Gaia veut une version claire pour la soumission.

## Système commun

- Grille 12 colonnes, max 1296 px, gouttières 72 px (desktop) / 16 px (mobile).
- Titre : linéale système 700, `clamp(56px, 8.9vw, 128px)`, interligne .9, interlettrage −0,045 em.
- Corps ≥ 18 px ; plus petit texte 16 px (mono, étiquettes, sources).
- Une barre haute sans menu : marque + numéro de planche + badge `QNX Global Hackathon 2026 · Low-level Software`.
- Pied : pager 01–05 + tableau **SRC** (chiffre → fichier du repo @ `71ceb3f`).
- Mouvement : tissage rangée par rangée + navette ; reveal au scroll ; `prefers-reduced-motion` = image figée complète.

## Les 5 planches

| # | Titre (EN) | Fait comprendre | Visuel dominant | Principe appliqué | Données réelles |
|---|---|---|---|---|---|
| P1 `01-comprendre` | A display for QNX in a VM. | Toile donne une image à une VM QNX | la toile à mi-tissage, navette orange, filets « guest /dev/gpu0 » → « QEMU window » | un seul objet (Deferred Damage), relief éclairé (Flow) | `0` divergences / `63` comparaisons ; `1280×800` |
| P2 `02-probleme` | The VM boots. The screen stays black. | le trou G3 : pas d'image en VM | fenêtre QEMU noire + chaîne nue sans trame, éclairée par derrière | le plan avant l'objet (RIY3) | 5 acteurs du cahier §1.1, citation « l'OS qu'on ne voit pas tourner » (traduite) |
| P3 `03-pipeline` | Command in. Pixel out. | les 10 étapes réelles, fichiers nommés | panneau des octets réels `wire/boot-graphique.hex` + 10 rangées de trame | filets qui relient (Atmospherik) | 10 étapes, 26 chemins vérifiés existants, séquence invité↔hôte du README |
| P4 `04-produit` | Watch the guest paint. | **choix : écran réel** (la promesse est visuelle) + vue éclatée 3 couches en annexe | le GIF réel de la vitrine dans une fenêtre QEMU + la mire 1280×800 | l'objet livré (RIY3 : filaire → réel) | 30 im/s, 3 clients, 1280×800, 8 pages de site, 4 chapitres de codelab |
| P5 `05-preuves` | Proven where measured. Open where not. | ce qui est prouvé, ce qui ne l'est pas | grille de chiffres + toile **trouée** pour les limites écrites | chiffre énorme à côté de l'objet (Deferred Damage) | 12 chiffres tracés, E1–E6, 10 verdicts, contrat §1–§13, 5 limites, niveaux S/C/X |
