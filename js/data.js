/* =========================================================================
   data.js
   -------------------------------------------------------------------------
   Glosario del SDLC: 15 términos por fase (elegidos como los más
   importantes de cada hoja del archivo "Vocabulario_ADSO_-_SDLC.xlsx").
   La fase 5 (Deployment & Maintenance) solo trae 13, porque es todo lo que
   contiene esa hoja del glosario original — se incluyeron los 13.

   Cada término trae: name, phonetic (IPA), description (EN), icon (SVG
   inline, imagen representativa), audio (ruta esperada — el archivo NO
   existe todavía, agrégalo tú) y, si aplica, un "tool" real asociado.

   PARA REUTILIZAR ESTA PLANTILLA CON OTRO GLOSARIO:
   Solo edita el arreglo PHASES de este archivo. Todo lo demás (app.js,
   styles.css, quizzes.js) es genérico y no necesita tocarse, siempre que
   mantengas la misma forma de los objetos.
   ========================================================================= */

/* -------------------------------------------------------------------------
   Librería de iconos SVG (imagen representativa de cada término).
   Son ilustraciones genéricas hechas a mano — no logotipos de terceros.
   Varios términos conceptualmente cercanos comparten un mismo icono; el
   color de acento de cada fase los distingue visualmente entre sí.
   ------------------------------------------------------------------------- */
const ICONS = {
  document: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="6" width="36" height="52" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M22 20h20M22 30h20M22 40h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  magnifier: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="16" stroke="currentColor" stroke-width="2.5"/><path d="M40 40l14 14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  diagramflow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="16" r="6" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="16" r="6" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="48" r="6" stroke="currentColor" stroke-width="2.5"/><path d="M18 20l10 22M46 20L36 42" stroke="currentColor" stroke-width="2.5"/></svg>`,
  ruler: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="26" width="52" height="14" rx="2" stroke="currentColor" stroke-width="2.5" transform="rotate(-8 32 32)"/><path d="M16 30v4M24 29v6M32 28v8M40 27v6M48 26v4" stroke="currentColor" stroke-width="2" transform="rotate(-8 32 32)"/></svg>`,
  calculator: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="6" width="32" height="52" rx="3" stroke="currentColor" stroke-width="2.5"/><rect x="22" y="12" width="20" height="10" rx="1" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="32" r="2.4" fill="currentColor"/><circle cx="32" cy="32" r="2.4" fill="currentColor"/><circle cx="40" cy="32" r="2.4" fill="currentColor"/><circle cx="24" cy="42" r="2.4" fill="currentColor"/><circle cx="32" cy="42" r="2.4" fill="currentColor"/><circle cx="40" cy="42" r="2.4" fill="currentColor"/><circle cx="24" cy="50" r="2.4" fill="currentColor"/><circle cx="32" cy="50" r="2.4" fill="currentColor"/><circle cx="40" cy="50" r="2.4" fill="currentColor"/></svg>`,
  resource: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="36" width="10" height="20" stroke="currentColor" stroke-width="2.5"/><rect x="27" y="26" width="10" height="30" stroke="currentColor" stroke-width="2.5"/><rect x="44" y="16" width="10" height="40" stroke="currentColor" stroke-width="2.5"/><path d="M14 30l13-10 13 6 10-10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  stakeholder: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="20" r="8" stroke="currentColor" stroke-width="2.5"/><circle cx="44" cy="24" r="6" stroke="currentColor" stroke-width="2.5"/><path d="M8 52c0-9 6-15 14-15s14 6 14 15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M36 52c1-7 5-12 12-12s12 5 12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  usecase: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="32" r="9" stroke="currentColor" stroke-width="2.5"/><ellipse cx="42" cy="32" rx="16" ry="11" stroke="currentColor" stroke-width="2.5"/><path d="M25 32h8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M30 28l4 4-4 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  architecture: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="38" width="14" height="18" stroke="currentColor" stroke-width="2.5"/><rect x="25" y="26" width="14" height="30" stroke="currentColor" stroke-width="2.5"/><rect x="42" y="14" width="14" height="42" stroke="currentColor" stroke-width="2.5"/><path d="M4 56h56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  puzzle: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h12v6a5 5 0 0 0 10 0v-6h8v14h-6a5 5 0 0 0 0 10h6v14H12V36h6a5 5 0 0 0 0-10h-6V22h10z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  window: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="48" height="40" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M8 22h48" stroke="currentColor" stroke-width="2.5"/><circle cx="15" cy="17" r="1.6" fill="currentColor"/><circle cx="21" cy="17" r="1.6" fill="currentColor"/><rect x="16" y="30" width="14" height="14" rx="1.5" stroke="currentColor" stroke-width="2"/><path d="M36 32h14M36 38h14M36 44h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  smileyheart: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2.5"/><path d="M22 36c3 6 8 9 10 9s7-3 10-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="26" r="2.4" fill="currentColor"/><circle cx="40" cy="26" r="2.4" fill="currentColor"/></svg>`,
  flask: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 8h12M28 8v16l-14 26a5 5 0 0 0 4 8h28a5 5 0 0 0 4-8l-14-26V8" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 42h20" stroke="currentColor" stroke-width="2.5"/></svg>`,
  database: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="14" rx="20" ry="7" stroke="currentColor" stroke-width="2.5"/><path d="M12 14v18c0 3.9 8.9 7 20 7s20-3.1 20-7V14" stroke="currentColor" stroke-width="2.5"/><path d="M12 32v18c0 3.9 8.9 7 20 7s20-3.1 20-7V32" stroke="currentColor" stroke-width="2.5"/></svg>`,
  table: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="48" height="40" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M8 24h48M8 36h48M24 12v40M40 12v40" stroke="currentColor" stroke-width="2"/></svg>`,
  block: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6l22 12v28L32 58 10 46V18z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 18l22 12 22-12M32 30v28" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  wireframegrid: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="48" height="44" rx="2" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/><path d="M8 22h48M28 22v32" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/></svg>`,
  frame: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="48" height="44" rx="3" stroke="currentColor" stroke-width="2.5"/><circle cx="22" cy="24" r="5" stroke="currentColor" stroke-width="2.5"/><path d="M12 46l14-14 10 10 8-8 10 10" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  expandarrows: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 24V10h14M54 24V10H40M10 40v14h14M54 40v14H40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  lock: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="28" width="36" height="26" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M20 28v-8a12 12 0 0 1 24 0v8" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="40" r="3" fill="currentColor"/></svg>`,
  api: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="26" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2.5"/><rect x="42" y="26" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2.5"/><path d="M22 32h20" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 3"/><path d="M16 26v-6M16 44v-6M48 26v-6M48 44v-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  codebrackets: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16L8 32l14 16M42 16l14 16-14 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 12l-8 40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  personcode: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="18" r="8" stroke="currentColor" stroke-width="2.5"/><path d="M10 50c0-9 6-15 14-15s14 6 14 15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M42 34l8 8-8 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  globe: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2.5"/><ellipse cx="32" cy="32" rx="10" ry="24" stroke="currentColor" stroke-width="2"/><path d="M8 32h48" stroke="currentColor" stroke-width="2"/></svg>`,
  server: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="44" height="16" rx="2" stroke="currentColor" stroke-width="2.5"/><rect x="10" y="30" width="44" height="16" rx="2" stroke="currentColor" stroke-width="2.5"/><circle cx="18" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="38" r="2" fill="currentColor"/><path d="M22 54h20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  browserwindow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="48" height="36" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M8 24h48" stroke="currentColor" stroke-width="2.5"/><circle cx="15" cy="19" r="1.6" fill="currentColor"/><path d="M18 34l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  scaffold: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="38" width="36" height="14" stroke="currentColor" stroke-width="2.5"/><rect x="20" y="24" width="24" height="14" stroke="currentColor" stroke-width="2.5"/><rect x="26" y="10" width="12" height="14" stroke="currentColor" stroke-width="2.5"/></svg>`,
  books: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="12" width="12" height="40" stroke="currentColor" stroke-width="2.5"/><rect x="24" y="16" width="12" height="36" stroke="currentColor" stroke-width="2.5"/><path d="M40 14l12 4-10 38-12-4z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  versioncontrol: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="14" r="6" stroke="currentColor" stroke-width="2.5"/><circle cx="16" cy="50" r="6" stroke="currentColor" stroke-width="2.5"/><circle cx="46" cy="32" r="6" stroke="currentColor" stroke-width="2.5"/><path d="M16 20v24" stroke="currentColor" stroke-width="2.5"/><path d="M16 32c0 0 12 0 24 0" stroke="currentColor" stroke-width="2.5"/></svg>`,
  repository: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20l6-8h32l6 8" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><rect x="8" y="20" width="48" height="30" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M26 30l-6 6 6 6M38 30l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  commitdot: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 32h16M40 32h16" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="2.5"/><path d="M27 32l4 4 7-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  mergearrows: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="5" stroke="currentColor" stroke-width="2.5"/><circle cx="14" cy="50" r="5" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="32" r="5" stroke="currentColor" stroke-width="2.5"/><path d="M14 19v6c0 6 4 7 12 7h10M14 45v-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M40 32h5" stroke="currentColor" stroke-width="2.5"/></svg>`,
  hammer: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="8" width="14" height="20" rx="2" stroke="currentColor" stroke-width="2.5" transform="rotate(45 37 18)"/><path d="M30 30L12 48a5 5 0 0 0 7 7l18-18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  debugging: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="28" r="14" stroke="currentColor" stroke-width="2.5"/><path d="M36 38l16 16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M26 20v4M20 28h4M32 28h4M22 22l3 3M30 22l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  deployment: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6c8 6 12 15 12 25 0 6-2 11-4 14l-8 8-8-8c-2-3-4-8-4-14 0-10 4-19 12-25z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="32" cy="26" r="5" stroke="currentColor" stroke-width="2.5"/><path d="M22 46l-6 12M42 46l6 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  checklist: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="8" width="40" height="48" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M20 22l4 4 8-8M20 38l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 20h6M40 36h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  shieldcheck: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6l20 8v16c0 14-8 24-20 28-12-4-20-14-20-28V14z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M23 32l6 6 12-13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bug: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="36" rx="14" ry="18" stroke="currentColor" stroke-width="2.5"/><path d="M32 18v-6M22 24l-8-6M42 24l8-6M18 36H8M56 36H46M22 48l-8 6M42 48l8 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M24 30h16" stroke="currentColor" stroke-width="2.5"/></svg>`,
  unittest: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 8v18l-14 24a6 6 0 0 0 5 9h30a6 6 0 0 0 5-9l-14-24V8" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M21 8h22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M20 40h24" stroke="currentColor" stroke-width="2.5"/><path d="M28 48l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  handshake: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 28l12-8 8 4M58 28l-12-8-8 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 24l10 10-4 4a4 4 0 0 1-6-6M46 24L36 34l4 4a4 4 0 0 0 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  refresharrow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 32a20 20 0 0 1 34-14l4 4M52 32a20 20 0 0 1-34 14l-4-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M46 12v10h-10M18 52V42h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  speedometer: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 44a24 24 0 1 1 48 0" stroke="currentColor" stroke-width="2.5"/><path d="M32 44L44 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="44" r="3" fill="currentColor"/></svg>`,
  automation: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="26" r="9" stroke="currentColor" stroke-width="2.5"/><path d="M26 13v-4M26 43v-4M13 26h-4M43 26h-4M17 17l-3-3M35 17l3-3M17 35l-3 3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="46" cy="46" r="6" stroke="currentColor" stroke-width="2.5"/><path d="M46 37v-3M46 55v-3M37 46h-3M55 46h-3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  warningtriangle: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8l26 46H6z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M32 26v14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="46" r="2.2" fill="currentColor"/></svg>`,
  flag: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8v48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M16 10l30 6-30 6V10z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,

  release: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10v44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M12 12l36 8-36 8V12z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  servercloud: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 40a10 10 0 0 1-2-19.8A14 14 0 0 1 44 16a11 11 0 0 1 2 21.9" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 40h28" stroke="currentColor" stroke-width="2.5"/><rect x="16" y="44" width="32" height="12" rx="2" stroke="currentColor" stroke-width="2.5"/><circle cx="22" cy="50" r="1.6" fill="currentColor"/></svg>`,
  undoarrow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 28h24a12 12 0 0 1 0 24H26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M22 18L12 28l10 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bandage: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="26" width="44" height="12" rx="6" stroke="currentColor" stroke-width="2.5" transform="rotate(-30 32 32)"/><circle cx="24" cy="26" r="2" fill="currentColor" transform="rotate(-30 32 32)"/><circle cx="40" cy="38" r="2" fill="currentColor" transform="rotate(-30 32 32)"/></svg>`,
  wrench: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 10a12 12 0 0 0-15 15L10 42l6 6 17-17a12 12 0 0 0 15-15l-8 8-6-2-2-6z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  firefix: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6c6 10-4 12-2 20 6-2 8-8 8-8 4 6 2 14-4 18-8 5-18 1-20-8-2-8 4-14 6-18 2 6 8 4 12-4z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  monitoring: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="48" height="30" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M14 36l8-10 8 6 10-14 10 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 50h12M32 44v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  listlines: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="44" height="44" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M18 22h28M18 32h28M18 42h18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  speechbubble: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14h44v28H26l-10 10V42H10z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 24h28M18 32h18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  arrowup: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 52V16M18 30l14-14 14 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  xcircle: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2.5"/><path d="M24 24l16 16M40 24L24 40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  /* Iconos de referencia de herramientas reales (diseños genéricos propios,
     no son los logotipos oficiales, solo representan la marca por nombre). */
  toolMysql: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 46c8-18 10-30 6-38" stroke="#2E7BB8" stroke-width="3" stroke-linecap="round"/><path d="M20 46c10-16 14-26 10-36" stroke="#F2A93B" stroke-width="3" stroke-linecap="round"/><path d="M10 50h44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  toolGit: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="#F2521B" opacity="0.12"/><circle cx="20" cy="20" r="5" stroke="#F2521B" stroke-width="3"/><circle cx="20" cy="44" r="5" stroke="#F2521B" stroke-width="3"/><circle cx="44" cy="32" r="5" stroke="#F2521B" stroke-width="3"/><path d="M20 25v14" stroke="#F2521B" stroke-width="3"/><path d="M20 32h19" stroke="#F2521B" stroke-width="3"/></svg>`,
  toolGithub: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="currentColor" opacity="0.08"/><rect x="16" y="20" width="32" height="24" rx="3" stroke="currentColor" stroke-width="3"/><path d="M24 32l-5 4 5 4M40 32l5 4-5 4M34 28l-4 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* -------------------------------------------------------------------------
   Fases del SDLC — 15 términos cada una (fase 5: 13, ver nota arriba).
   ------------------------------------------------------------------------- */
const PHASES = [
  {
    id: "planning",
    number: 1,
    accent: "#F2C14E",
    title: "Planning & Analysis",
    subtitle: "Planificación y Análisis",
    intro: "In this phase, teams gather requirements and define the project's scope before writing any code.",
    terms: [
      { name: "Requirement", phonetic: "/rɪˈkwaɪər.mənt/", description: "A condition or capability the system must meet to solve a problem or achieve an objective.", icon: ICONS.document, audio: "audio/planning-requirement.mp3" },
      { name: "Stakeholder", phonetic: "/ˈsteɪkˌhoʊl.dər/", description: "A person, group, or organization with an interest in — or affected by — the project.", icon: ICONS.stakeholder, audio: "audio/planning-stakeholder.mp3" },
      { name: "Feasibility Study", phonetic: "/ˌfiː.zəˈbɪl.ə.ti ˈstʌd.i/", description: "An evaluation of whether a project is technically, financially, and operationally possible.", icon: ICONS.magnifier, audio: "audio/planning-feasibilitystudy.mp3" },
      { name: "Scope", phonetic: "/skoʊp/", description: "The boundaries and objectives of a project, including its deliverables and features.", icon: ICONS.ruler, audio: "audio/planning-scope.mp3" },
      { name: "Business Case", phonetic: "/ˈbɪz.nɪs keɪs/", description: "A document that justifies investing in a project by detailing its benefits, costs, and risks.", icon: ICONS.document, audio: "audio/planning-businesscase.mp3" },
      { name: "Gathering", phonetic: "/ˈgæð.ər.ɪŋ/", description: "The process of collecting requirements from stakeholders.", icon: ICONS.magnifier, audio: "audio/planning-gathering.mp3" },
      { name: "Modeling", phonetic: "/ˈmɑː.dəl.ɪŋ/", description: "The process of creating abstract representations of a system.", icon: ICONS.diagramflow, audio: "audio/planning-modeling.mp3" },
      { name: "Elicitation", phonetic: "/ɪˌlɪs.əˈteɪ.ʃən/", description: "A technique used to draw out requirements from stakeholders.", icon: ICONS.magnifier, audio: "audio/planning-elicitation.mp3" },
      { name: "Acceptance Criteria", phonetic: "/əkˈsep.təns kraɪˈtɪr.i.ə/", description: "The conditions software must meet to be accepted by the client.", icon: ICONS.checklist, audio: "audio/planning-acceptancecriteria.mp3" },
      { name: "Constraint", phonetic: "/kənˈstreɪnt/", description: "A factor that limits development options, such as time, budget, or technology.", icon: ICONS.ruler, audio: "audio/planning-constraint.mp3" },
      { name: "Use Case", phonetic: "/juːs keɪs/", description: "A description of how a user interacts with the system to achieve a specific goal.", icon: ICONS.usecase, audio: "audio/planning-usecase.mp3" },
      { name: "Functional Requirement", phonetic: "/ˈfʌŋk.ʃən.əl rɪˈkwaɪər.mənt/", description: "Describes what the system must do — its functions and behaviors.", icon: ICONS.document, audio: "audio/planning-functionalrequirement.mp3" },
      { name: "Non-functional Requirement", phonetic: "/nɒn ˈfʌŋk.ʃən.əl rɪˈkwaɪər.mənt/", description: "Describes how the system should be, such as its performance, security, or usability.", icon: ICONS.document, audio: "audio/planning-nonfunctionalrequirement.mp3" },
      { name: "Estimates", phonetic: "/ˈes.tɪ.mətz/", description: "Approximate calculations of the time, cost, and effort a project will require.", icon: ICONS.calculator, audio: "audio/planning-estimates.mp3" },
      { name: "Resource Allocation", phonetic: "/ˈriː.sɔːrs ˌæl.əˈkeɪ.ʃən/", description: "The distribution of people, equipment, and budget across a project.", icon: ICONS.resource, audio: "audio/planning-resourceallocation.mp3" },
    ],
  },
  {
    id: "design",
    number: 2,
    accent: "#6FA8DC",
    title: "Design & Architecture",
    subtitle: "Diseño y Arquitectura",
    intro: "Here, the team designs the system's structure, its data, and how its pieces will fit together.",
    terms: [
      { name: "Architecture", phonetic: "/ˈɑːr.kə.tek.tʃər/", description: "The fundamental structure of a system: its components, their relationships, and design principles.", icon: ICONS.architecture, audio: "audio/design-architecture.mp3" },
      { name: "Design Pattern", phonetic: "/dɪˈzaɪn ˈpæt.ərn/", description: "A reusable solution to a common problem in software design.", icon: ICONS.puzzle, audio: "audio/design-designpattern.mp3" },
      { name: "User Interface (UI)", phonetic: "/ˈjuː.zər ˈɪn.tər.feɪs/", description: "The visual components and elements a user interacts with.", icon: ICONS.window, audio: "audio/design-ui.mp3" },
      { name: "User Experience (UX)", phonetic: "/ˈjuː.zər ɪkˈspɪr.i.əns/", description: "The feelings, attitudes, and perceptions a user has while using the product.", icon: ICONS.smileyheart, audio: "audio/design-ux.mp3" },
      { name: "Prototype", phonetic: "/ˈproʊ.tə.taɪp/", description: "An early or simulated version of a product or feature, built for testing.", icon: ICONS.flask, audio: "audio/design-prototype.mp3" },
      { name: "Database", phonetic: "/ˈdeɪ.tə.beɪs/", description: "An organized collection of structured information.", icon: ICONS.database, audio: "audio/design-database.mp3", tool: { name: "MySQL", icon: ICONS.toolMysql } },
      { name: "Schema", phonetic: "/ˈskiː.mə/", description: "The structure or design of a database or other information model.", icon: ICONS.table, audio: "audio/design-schema.mp3" },
      { name: "Algorithm", phonetic: "/ˈæl.gə.rɪ.ðəm/", description: "A defined, ordered set of instructions used to solve a problem.", icon: ICONS.codebrackets, audio: "audio/design-algorithm.mp3" },
      { name: "Component", phonetic: "/kəmˈpoʊ.nənt/", description: "A modular, replaceable part of a software system.", icon: ICONS.block, audio: "audio/design-component.mp3" },
      { name: "Diagram", phonetic: "/ˈdaɪ.ə.græm/", description: "A graphical representation of a system's structure, behavior, or design.", icon: ICONS.diagramflow, audio: "audio/design-diagram.mp3" },
      { name: "Wireframe", phonetic: "/ˈwaɪər.freɪm/", description: "A schematic layout of an interface without visual details.", icon: ICONS.wireframegrid, audio: "audio/design-wireframe.mp3" },
      { name: "Mockup", phonetic: "/ˈmɑːk.ʌp/", description: "A static, visual representation of what the final product will look like.", icon: ICONS.frame, audio: "audio/design-mockup.mp3" },
      { name: "Scalability", phonetic: "/ˌskeɪ.ləˈbɪl.ə.ti/", description: "A system's ability to handle growth in workload or users.", icon: ICONS.expandarrows, audio: "audio/design-scalability.mp3" },
      { name: "Security", phonetic: "/sɪˈkjʊr.ə.ti/", description: "Measures taken to protect a system from unauthorized access, damage, or theft.", icon: ICONS.lock, audio: "audio/design-security.mp3" },
      { name: "API", phonetic: "/ˌeɪ.piːˈaɪ/", description: "A set of rules that lets different pieces of software communicate with each other.", icon: ICONS.api, audio: "audio/design-api.mp3" },
    ],
  },
  {
    id: "development",
    number: 3,
    accent: "#7FD9A6",
    title: "Development",
    subtitle: "Desarrollo",
    intro: "Developers write, organize, and track the source code that brings the design to life.",
    terms: [
      { name: "Code", phonetic: "/koʊd/", description: "Instructions written in a programming language.", icon: ICONS.codebrackets, audio: "audio/development-code.mp3" },
      { name: "Developer", phonetic: "/dɪˈvel.ə.pər/", description: "The person who writes a software's source code.", icon: ICONS.personcode, audio: "audio/development-developer.mp3" },
      { name: "Programming Language", phonetic: "/ˈproʊ.græm.ɪŋ ˈlæŋ.gwɪdʒ/", description: "A formal system for writing instructions a computer can execute.", icon: ICONS.globe, audio: "audio/development-programminglanguage.mp3" },
      { name: "Back-end", phonetic: "/ˈbæk.end/", description: "The part of a system users don't access directly — business logic and databases.", icon: ICONS.server, audio: "audio/development-backend.mp3" },
      { name: "Front-end", phonetic: "/ˈfrʌnt.end/", description: "The part of a system users interact with directly — the interface.", icon: ICONS.browserwindow, audio: "audio/development-frontend.mp3" },
      { name: "Framework", phonetic: "/ˈfreɪm.wɜːrk/", description: "A support structure that provides a foundation for building software.", icon: ICONS.scaffold, audio: "audio/development-framework.mp3" },
      { name: "Library", phonetic: "/ˈlaɪ.brer.i/", description: "A collection of pre-written code and functions ready to use in a program.", icon: ICONS.books, audio: "audio/development-library.mp3" },
      { name: "Version Control", phonetic: "/ˈvɜːr.ʒən kənˈtroʊl/", description: "A system that tracks and manages changes to source code over time.", icon: ICONS.versioncontrol, audio: "audio/development-versioncontrol.mp3", tool: { name: "Git", icon: ICONS.toolGit } },
      { name: "Repository", phonetic: "/rɪˈpɑː.zɪ.tɔːr.i/", description: "The central location where a project's source code is stored and maintained.", icon: ICONS.repository, audio: "audio/development-repository.mp3", tool: { name: "GitHub", icon: ICONS.toolGithub } },
      { name: "Commit", phonetic: "/kəˈmɪt/", description: "Recording a set of code changes in the version control system.", icon: ICONS.commitdot, audio: "audio/development-commit.mp3" },
      { name: "Merge", phonetic: "/mɜːrdʒ/", description: "Combining different branches or sets of code changes.", icon: ICONS.mergearrows, audio: "audio/development-merge.mp3" },
      { name: "Branch", phonetic: "/bræntʃ/", description: "A separate line of development in a repository for new features or fixes.", icon: ICONS.versioncontrol, audio: "audio/development-branch.mp3" },
      { name: "Build", phonetic: "/bɪld/", description: "The process of converting source code into an executable program.", icon: ICONS.hammer, audio: "audio/development-build.mp3" },
      { name: "Debugging", phonetic: "/diːˈbʌg.ɪŋ/", description: "The process of finding and fixing errors in the code.", icon: ICONS.debugging, audio: "audio/development-debugging.mp3" },
      { name: "Deployment", phonetic: "/dɪˈplɔɪ.mənt/", description: "The process of moving software to an environment where users can access it.", icon: ICONS.deployment, audio: "audio/development-deployment.mp3" },
    ],
  },
  {
    id: "testing",
    number: 4,
    accent: "#E2574C",
    title: "Testing",
    subtitle: "Pruebas y Garantía de Calidad",
    intro: "Before release, the software is checked thoroughly to catch errors and confirm it meets its requirements.",
    terms: [
      { name: "Testing", phonetic: "/ˈtes.tɪŋ/", description: "The process of evaluating a system to find errors and confirm it meets requirements.", icon: ICONS.checklist, audio: "audio/testing-testing.mp3" },
      { name: "Quality Assurance (QA)", phonetic: "/ˈkwɒl.ə.ti əˈʃʊr.əns/", description: "A set of preventive activities that ensure the development process is done correctly.", icon: ICONS.shieldcheck, audio: "audio/testing-qa.mp3" },
      { name: "Bug", phonetic: "/bʌg/", description: "A defect in the code that causes unexpected behavior.", icon: ICONS.bug, audio: "audio/testing-bug.mp3" },
      { name: "Test Case", phonetic: "/test keɪs/", description: "A set of conditions, inputs, and expected results used to verify a feature.", icon: ICONS.document, audio: "audio/testing-testcase.mp3" },
      { name: "Unit Test", phonetic: "/ˈjuː.nɪt test/", description: "A test that checks a single, small piece of code, such as a function or method.", icon: ICONS.unittest, audio: "audio/testing-unittest.mp3" },
      { name: "Integration Test", phonetic: "/ˌɪn.tɪˈgreɪ.ʃən test/", description: "A test that verifies multiple modules work correctly together.", icon: ICONS.puzzle, audio: "audio/testing-integrationtest.mp3" },
      { name: "Acceptance Testing (UAT)", phonetic: "/əkˈsep.təns ˈtes.tɪŋ/", description: "Testing done by end users to confirm the software meets their needs.", icon: ICONS.handshake, audio: "audio/testing-acceptancetesting.mp3" },
      { name: "Regression Testing", phonetic: "/rɪˈgreʃ.ən ˈtes.tɪŋ/", description: "Testing that ensures recent changes haven't broken existing functionality.", icon: ICONS.refresharrow, audio: "audio/testing-regressiontesting.mp3" },
      { name: "Performance Testing", phonetic: "/pərˈfɔːr.məns ˈtes.tɪŋ/", description: "Testing that evaluates speed, responsiveness, and stability under load.", icon: ICONS.speedometer, audio: "audio/testing-performancetesting.mp3" },
      { name: "Automation", phonetic: "/ˌɔː.təˈmeɪ.ʃən/", description: "The use of tools to run repetitive tests without manual effort.", icon: ICONS.automation, audio: "audio/testing-automation.mp3" },
      { name: "Test Plan", phonetic: "/test plæn/", description: "A document describing the scope, approach, resources, and schedule for testing.", icon: ICONS.document, audio: "audio/testing-testplan.mp3" },
      { name: "Severity", phonetic: "/sɪˈver.ə.ti/", description: "The impact a defect has on the system's functionality or usability.", icon: ICONS.warningtriangle, audio: "audio/testing-severity.mp3" },
      { name: "Priority", phonetic: "/praɪˈɔːr.ə.ti/", description: "How urgently a defect needs to be fixed.", icon: ICONS.flag, audio: "audio/testing-priority.mp3" },
      { name: "Validation", phonetic: "/ˌvæl.əˈdeɪ.ʃən/", description: "Checking whether the system meets the user's needs — \"did we build the right product?\"", icon: ICONS.shieldcheck, audio: "audio/testing-validation.mp3" },
      { name: "Verification", phonetic: "/ˌver.ə.fəˈkeɪ.ʃən/", description: "Checking whether the software meets its specifications — \"did we build the product right?\"", icon: ICONS.checklist, audio: "audio/testing-verification.mp3" },
    ],
  },
  {
    id: "deployment",
    number: 5,
    accent: "#B98CE0",
    title: "Deployment & Maintenance",
    subtitle: "Despliegue y Mantenimiento",
    intro: "This phase delivers the software to users and keeps it running smoothly afterward. Note: the source glossary only lists 13 terms for this phase (not 15).",
    terms: [
      { name: "Release", phonetic: "/rɪˈliːs/", description: "The delivery of the software, or a new version of it, to its users.", icon: ICONS.release, audio: "audio/deployment-release.mp3" },
      { name: "Production Environment", phonetic: "/prəˈdʌk.ʃən ɪnˈvaɪ.rən.mənt/", description: "The environment where the software is actually used by end users.", icon: ICONS.servercloud, audio: "audio/deployment-productionenvironment.mp3" },
      { name: "Staging Environment", phonetic: "/ˈsteɪ.dʒɪŋ ɪnˈvaɪ.rən.mənt/", description: "An environment that mirrors production, used for final testing before release.", icon: ICONS.servercloud, audio: "audio/deployment-stagingenvironment.mp3" },
      { name: "Rollback", phonetic: "/ˈroʊl.bæk/", description: "Restoring the system to a previous state after a failed deployment.", icon: ICONS.undoarrow, audio: "audio/deployment-rollback.mp3" },
      { name: "Patch", phonetic: "/pætʃ/", description: "A small piece of code designed to fix a bug or improve a feature.", icon: ICONS.bandage, audio: "audio/deployment-patch.mp3" },
      { name: "Update", phonetic: "/ˈʌp.deɪt/", description: "A new version of the software that adds features or improves existing ones.", icon: ICONS.refresharrow, audio: "audio/deployment-update.mp3" },
      { name: "Maintenance", phonetic: "/ˈmeɪn.tən.əns/", description: "Activities performed after deployment to fix errors, improve performance, or adapt the software.", icon: ICONS.wrench, audio: "audio/deployment-maintenance.mp3" },
      { name: "Hotfix", phonetic: "/ˈhɒt.fɪks/", description: "A patch for a critical bug in production that must be applied immediately.", icon: ICONS.firefix, audio: "audio/deployment-hotfix.mp3" },
      { name: "Monitoring", phonetic: "/ˈmɑː.nɪ.tər.ɪŋ/", description: "The continuous observation of a system in production to detect issues.", icon: ICONS.monitoring, audio: "audio/deployment-monitoring.mp3" },
      { name: "Logging", phonetic: "/ˈlɒg.ɪŋ/", description: "Recording system events and operations, useful for debugging and auditing.", icon: ICONS.listlines, audio: "audio/deployment-logging.mp3" },
      { name: "Feedback", phonetic: "/ˈfiːd.bæk/", description: "Information from users or stakeholders about the software.", icon: ICONS.speechbubble, audio: "audio/deployment-feedback.mp3" },
      { name: "Upgrade", phonetic: "/ˈʌp.greɪd/", description: "Replacing a product or system with a newer, superior version.", icon: ICONS.arrowup, audio: "audio/deployment-upgrade.mp3" },
      { name: "Discontinued", phonetic: "/ˌdɪs.kənˈtɪn.juːd/", description: "Refers to a product or version that is no longer developed or maintained.", icon: ICONS.xcircle, audio: "audio/deployment-discontinued.mp3" },
    ],
  },
];

/* -------------------------------------------------------------------------
   Guía fonética rápida (sección opcional recomendada por la guía).
   ------------------------------------------------------------------------- */
const PHONETIC_GUIDE = [
  { symbol: "/ə/", example: "the schwa — like the 'a' in about" },
  { symbol: "/ɪ/", example: "like the 'i' in bit" },
  { symbol: "/iː/", example: "like the 'ee' in see" },
  { symbol: "/æ/", example: "like the 'a' in cat" },
  { symbol: "/ʌ/", example: "like the 'u' in bug" },
  { symbol: "/ɔː/", example: "like the 'aw' in law" },
  { symbol: "/ŋ/", example: "the 'ng' sound in sing" },
  { symbol: "/tʃ/", example: "the 'ch' in chair" },
  { symbol: "/dʒ/", example: "the 'j' sound in judge" },
  { symbol: "ˈ", example: "mark before the stressed syllable" },
];
