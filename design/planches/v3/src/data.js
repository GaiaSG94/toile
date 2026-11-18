// Toile V2 — every figure shown on a plate lives here, with the repo file that proves it.
// Repo: github.com/Tradoooo/toile @ 71ceb3f (read-only clone). `needle` must appear in `src`.

export const project = {
  name: 'Toile',
  slogan: 'A display for QNX in a VM.',
  badge: 'QNX Global Hackathon 2026 · Low-level Software',
  commit: '71ceb3f',
  repo: 'github.com/Tradoooo/toile',
  site: 'tradoooo.github.io/toile',
  promise: 'A QNX developer starts a VM on a laptop and sees the QNX guest paint its own screen in a window — no dedicated GPU, no passthrough, no second machine.',
};

export const mire = ['#FCFCFC', '#FFFF00', '#00FFFF', '#00FF00', '#FF00FF', '#FF0000', '#0000FF', '#000000'];

export const figures = {
  div0: { v: '0', label: 'divergences, C core vs Python twin', src: 'README.md', needle: '**0 écart**' },
  cmp63: { v: '63', label: 'byte-for-byte comparisons', src: 'README.md', needle: '63 comparaisons' },
  fix21: { v: '21', label: 'reference fixtures, 8 of them faulty', src: 'README.md', needle: 'dont 8 fautives' },
  py31: { v: '31', label: 'Python tests (make test-py)', src: 'README.md', needle: '31 tests' },
  c4: { v: '4', label: 'C test binaries green (make test-c)', src: 'README.md', needle: '4 binaires de test' },
  sig28: { v: '28/28', label: 'frozen public signatures present', src: 'README.md', needle: '28/28 signatures' },
  gold63: { v: '63', label: 'golden oracles (text, json, md)', src: 'README.md', needle: '63 goldens' },
  res: { v: '1280×800', label: 'test pattern painted in the guest', src: 'README.md', needle: 'capture 1280×800' },
  fps30: { v: '30', label: 'frames/s, three guest clients, one framebuffer', src: 'README.md', needle: '30 im/s' },
  req25: { v: '25', label: 'requirements: S1–S10, C1–C10, X1–X5', src: 'TOILE-cahier-des-charges.md', needle: '| X5 |' },
  verd10: { v: '10', label: 'frozen verdict codes (0–9)', src: 'CONTRACT.md', needle: '| 9 | `TOILE_MODEL_COUNTEREXAMPLE`' },
  dec18: { v: '18', label: 'recorded design decisions D1–D18', src: 'docs/DECISIONS.md', needle: '### D18' },
  ci5: { v: '5 min', label: 'CI budget per job', src: 'CONTRACT.md', needle: '5 min' },
  code4: { v: '4', label: 'codelab chapters', src: 'README.md', needle: '(4 chapitres)' },
  pages8: { v: '8', label: 'pages on the project site', src: 'site/', count: { ext: '.html', n: 8 } },
};

export const personas = [
  { who: 'QNX developer without target hardware', need: 'Build and debug a Screen UI on a laptop', today: 'Serial console only, or buy a board' },
  { who: 'Cockpit / cluster integrator', need: 'Test a full graphics stack before the ECU exists', today: 'Heavy, hypervisor-specific GPU passthrough' },
  { who: 'QNX teacher or student', need: 'Show Screen and graphical apps in a lab', today: 'Impossible in a standard VM' },
  { who: 'Test / CI engineer', need: 'Run Screen UI tests in a VM farm', today: 'No display; graphics tests need hardware' },
  { who: 'Medical device maker', need: 'Validate a certifiable UI in isolation', today: 'No graphics in a VM, no validation on a standard PC' },
];

export const pipeline = [
  { n: 'Command script', files: ['fixtures/boot-graphique.tcl'], role: 'A virtio-gpu 2D sequence written in the fixture DSL (21 fixtures).' },
  { n: 'Parse', files: ['core/src/cmdproc_parse.c', 'core/src/cmdproc.c'], role: 'The command machine reads each line and checks it against the frozen table.' },
  { n: 'Model state', files: ['core/src/resource.c', 'core/src/resource_hash.c', 'core/src/scanout.c'], role: 'Resources, backings and scanouts — the state, hashed for determinism.' },
  { n: 'Wire bytes', files: ['core/src/vgproto.c', 'fixtures/wire/boot-graphique.hex'], role: 'Encode / decode controlq and cursorq, little-endian, against byte oracles.' },
  { n: 'Verdicts and reports', files: ['core/src/verdict.c', 'core/src/report.c', 'core/src/report_json.c', 'core/src/report_md.c'], role: '10 frozen verdicts, rendered as text, JSON and Markdown audit.' },
  { n: 'Reference CLI', files: ['core/cli/toile_cli.c'], role: 'build/toile-run run | wire | golden | selftest — exit codes 0 / 1 / 2 / 3.' },
  { n: 'Python twin', files: ['host/toile/cli.py', 'tests/differential.py'], role: 'An independent second implementation; the same bytes or the build fails.' },
  { n: 'Guest driver', files: ['guest/virtio/toile_transport.c', 'guest/gpu/gpu_pci.c', 'guest/gpu/gpu_resmgr.c'], role: 'PCI 1af4/1050, controlq/cursorq, publishes /dev/gpu0. Transport reused from Passerelle (Apache-2.0).' },
  { n: 'Screen display driver', files: ['guest/display/toile_display.c', 'guest/common/toile_pattern.c'], role: 'OpenWF Display (WFD) + Wfdcfg interface; paints the test pattern.' },
  { n: 'Real loop under QEMU', files: ['qemu/probe-driver.sh', 'qemu/run-demo.sh', 'image/toile-vitrine.build', 'tools/make-gif.py'], role: 'Boot the QNX 8.0 guest, paint, capture the window, print the verdict.' },
];

export const wire = [
  ['resource_create_2d id=1 64x48', '01 01 00 00 00 00 00 00 … 01 00 00 00 40 00 00 00 30 00 00 00'],
  ['resource_attach_backing id=1', '06 01 00 00 00 00 00 00 … 00 10 00 00 00 00 00 00 00 10 00 00'],
  ['set_scanout scanout=0 id=1', '03 01 00 00 00 00 00 00 … 40 00 00 00 30 00 00 00 … 01 00 00 00'],
  ['transfer_to_host_2d id=1', '05 01 00 00 00 00 00 00 … 40 00 00 00 30 00 00 00 … 01 00 00 00'],
  ['resource_flush id=1', '04 01 00 00 00 00 00 00 … 40 00 00 00 30 00 00 00 01 00 00 00'],
];

export const loop = [
  ['PCI enumeration 1af4/1050', '→', 'device present'],
  ['GET_DISPLAY_INFO', '→', 'scanout 0, 1280×800 enabled'],
  ['RESOURCE_CREATE_2D + backing', '→', 'resource registered'],
  ['SET_SCANOUT', '→', 'surface selected for display'],
  ['paint + flush', '→', 'the emulator window shows it'],
  ['TRANSFER_FROM_HOST (0x0206)', '←', 'read back, numeric proof'],
];

export const trials = [
  { id: 'E1', st: 'pass', txt: 'Settled positive (executed)' },
  { id: 'E2', st: 'part', txt: 'Partly settled: interface is OpenWF WFD + Wfdcfg, not io-display' },
  { id: 'E3', st: 'part', txt: 'Partly settled: transport reused with one patch' },
  { id: 'E4', st: 'fail', txt: 'Settled negative: hypervisor DDK absent from the SDP' },
  { id: 'E5', st: 'open', txt: 'Not settled on target: only the model throughput is measured' },
  { id: 'E6', st: 'pass', txt: 'Settled positive: guest driver runs in a real QNX 8.0' },
];

export const limits = [
  { t: 'Opening /dev/gpu0 from a client crashes', d: 'SIGSEGV inside the QNX 8.0 resmgr library, before any Toile handler. The last guest-side obstacle.', src: 'docs/TRIALS-E1-E6.md' },
  { t: 'Full Screen desktop not shown yet', d: 'Needs the Screen BSP (libWFDplatform, wfd-server, libwfdcfg.so), outside the free SDP.', src: 'README.md' },
  { t: 'Guest → host throughput not measured', d: 'No complete display path yet; only the model throughput is measured.', src: 'docs/TRIALS-E5.md' },
  { t: 'Host-side vdev (part B) is negative', d: 'E4: the QNX Hypervisor DDK is absent from the SDP and outside the licence.', src: 'README.md' },
  { t: 'The virtio transport is not ours', d: 'Reused from sister project Passerelle (Apache-2.0), credited in NOTICE; patch applied to a build copy only.', src: 'NOTICE' },
];

export const layers = [
  { k: 'Layer 3', n: 'Screen display driver', p: 'guest/display/', d: 'OpenWF Display (WFD) + Wfdcfg' },
  { k: 'Layer 2', n: 'Guest driver', p: 'guest/gpu, guest/virtio, guest/input', d: 'PCI, controlq / cursorq, /dev/gpu0' },
  { k: 'Layer 1', n: 'Portable core, C11', p: 'core/', d: 'No file, clock, socket, QNX API or malloc' },
];

export const sitePages = ['index', 'architecture', 'emulator', 'emulator-live', 'trials', 'limits', 'codelab', 'contract'];

export const levels = [
  { k: 'S', when: 'Deliverable by 15 Dec 2026', what: 'virtio-gpu 2D, single scanout, flush, basic Screen in a QEMU guest, portable core tested off-target.' },
  { k: 'C', when: '3 months', what: 'Multi-scanout, hardware cursor, damage tracking, double buffer + vsync, virtio-input, full Screen.' },
  { k: 'X', when: 'Documented', what: 'Host-side virtio-gpu vdev on QNX Hypervisor, host 2D acceleration, virgl / venus 3D track.' },
];

// Which figures each plate prints (verify.mjs checks each one against the repo).
export const plateFigures = {
  '01-comprendre': ['div0', 'cmp63', 'res'],
  '02-probleme': ['res'],
  '03-pipeline': ['fix21', 'verd10', 'cmp63'],
  '04-produit': ['fps30', 'res', 'pages8', 'code4'],
  '05-preuves': ['div0', 'cmp63', 'fix21', 'py31', 'c4', 'sig28', 'gold63', 'res', 'fps30', 'req25', 'verd10', 'dec18', 'ci5'],
};
