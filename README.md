# Interactive SDLC Vocabulary Builder (ADSO)

Recurso web interactivo para repasar el vocabulario técnico del SDLC:
**15 términos por cada una de las 5 fases** (la fase 5, Deployment &
Maintenance, solo tiene 13 porque es todo lo que contiene esa hoja del
glosario original — se incluyeron los 13). Cada término trae pronunciación
IPA, descripción en inglés, espacio para audio propio y, cuando aplica,
referencia a una herramienta real (Git, GitHub, MySQL). Incluye un
mini-quiz de 5 preguntas al final de cada fase y un quiz final de 3
preguntas que repasa todas las fases.

## Estructura del proyecto (modular)

```
index.html          -> estructura de la pagina (no necesitas tocarla)
css/styles.css        -> todos los estilos visuales
js/data.js            -> EL GLOSARIO: los terminos, sus descripciones,
                          fonetica, iconos y rutas de audio. Editalo para
                          reutilizar esta plantilla con otro vocabulario.
js/quizzes.js         -> banco de preguntas (5 por fase + 3 del quiz final)
js/app.js             -> motor de la app: navegacion, render de tarjetas,
                          logica de quiz y resultados (generico, no hace
                          falta modificarlo salvo que quieras cambiar el
                          comportamiento).
audio/                 -> carpeta donde debes colocar tus grabaciones .mp3
```

## Terminos por fase

- **Planning & Analysis (15):** Requirement, Stakeholder, Feasibility Study,
  Scope, Business Case, Gathering, Modeling, Elicitation, Acceptance
  Criteria, Constraint, Use Case, Functional Requirement, Non-functional
  Requirement, Estimates, Resource Allocation.
- **Design & Architecture (15):** Architecture, Design Pattern, User
  Interface (UI), User Experience (UX), Prototype, Database (-> MySQL),
  Schema, Algorithm, Component, Diagram, Wireframe, Mockup, Scalability,
  Security, API.
- **Development (15):** Code, Developer, Programming Language, Back-end,
  Front-end, Framework, Library, Version Control (-> Git), Repository
  (-> GitHub), Commit, Merge, Branch, Build, Debugging, Deployment.
- **Testing (15):** Testing, Quality Assurance (QA), Bug, Test Case, Unit
  Test, Integration Test, Acceptance Testing (UAT), Regression Testing,
  Performance Testing, Automation, Test Plan, Severity, Priority,
  Validation, Verification.
- **Deployment & Maintenance (13 -- el glosario original solo trae 13):**
  Release, Production Environment, Staging Environment, Rollback, Patch,
  Update, Maintenance, Hotfix, Monitoring, Logging, Feedback, Upgrade,
  Discontinued.

## Como agregar tus audios

Cada termino ya tiene un reproductor de audio en su tarjeta, pero vacio
(sin archivo). Grabate pronunciando cada termino y guarda el archivo con
el nombre exacto que aparece bajo cada reproductor, dentro de la carpeta
`audio/`. Lista completa de los 73 archivos esperados:

```
audio/planning-requirement.mp3
audio/planning-stakeholder.mp3
audio/planning-feasibilitystudy.mp3
audio/planning-scope.mp3
audio/planning-businesscase.mp3
audio/planning-gathering.mp3
audio/planning-modeling.mp3
audio/planning-elicitation.mp3
audio/planning-acceptancecriteria.mp3
audio/planning-constraint.mp3
audio/planning-usecase.mp3
audio/planning-functionalrequirement.mp3
audio/planning-nonfunctionalrequirement.mp3
audio/planning-estimates.mp3
audio/planning-resourceallocation.mp3
audio/design-architecture.mp3
audio/design-designpattern.mp3
audio/design-ui.mp3
audio/design-ux.mp3
audio/design-prototype.mp3
audio/design-database.mp3
audio/design-schema.mp3
audio/design-algorithm.mp3
audio/design-component.mp3
audio/design-diagram.mp3
audio/design-wireframe.mp3
audio/design-mockup.mp3
audio/design-scalability.mp3
audio/design-security.mp3
audio/design-api.mp3
audio/development-code.mp3
audio/development-developer.mp3
audio/development-programminglanguage.mp3
audio/development-backend.mp3
audio/development-frontend.mp3
audio/development-framework.mp3
audio/development-library.mp3
audio/development-versioncontrol.mp3
audio/development-repository.mp3
audio/development-commit.mp3
audio/development-merge.mp3
audio/development-branch.mp3
audio/development-build.mp3
audio/development-debugging.mp3
audio/development-deployment.mp3
audio/testing-testing.mp3
audio/testing-qa.mp3
audio/testing-bug.mp3
audio/testing-testcase.mp3
audio/testing-unittest.mp3
audio/testing-integrationtest.mp3
audio/testing-acceptancetesting.mp3
audio/testing-regressiontesting.mp3
audio/testing-performancetesting.mp3
audio/testing-automation.mp3
audio/testing-testplan.mp3
audio/testing-severity.mp3
audio/testing-priority.mp3
audio/testing-validation.mp3
audio/testing-verification.mp3
audio/deployment-release.mp3
audio/deployment-productionenvironment.mp3
audio/deployment-stagingenvironment.mp3
audio/deployment-rollback.mp3
audio/deployment-patch.mp3
audio/deployment-update.mp3
audio/deployment-maintenance.mp3
audio/deployment-hotfix.mp3
audio/deployment-monitoring.mp3
audio/deployment-logging.mp3
audio/deployment-feedback.mp3
audio/deployment-upgrade.mp3
audio/deployment-discontinued.mp3
```

Si prefieres usar otros nombres de archivo, solo cambia el valor
`audio: "..."` de cada termino en `js/data.js`.

## Como verlo

Simplemente abre `index.html` en tu navegador (doble clic). No necesita
servidor ni instalacion.

## Como publicarlo (para entregarlo o compartirlo)

Puedes subir toda esta carpeta tal cual a:
- **GitHub Pages** (arrastra la carpeta a un repositorio y activa Pages).
- **Wix** (uno de los aplicativos recomendados en la guia) si prefieres
  reconstruir el diseno en su editor.
- Cualquier hosting estatico (Netlify, Vercel, etc.): solo arrastra la
  carpeta completa.

## Como reutilizar esta plantilla con otro glosario

1. Abre `js/data.js`.
2. Cambia el arreglo `PHASES` con tus propias fases y terminos (misma
   estructura: `name`, `phonetic`, `description`, `icon`, `audio`, y
   opcionalmente `tool`).
3. Si quieres iconos nuevos, agregalos al objeto `ICONS` como SVG en
   linea (puedes copiar el estilo de linea de los que ya existen).
4. Abre `js/quizzes.js` y actualiza `PHASE_QUIZZES` / `FINAL_QUIZ` con
   preguntas sobre tu nuevo vocabulario.
5. No necesitas tocar `index.html`, `css/styles.css` ni `js/app.js` -- el
   motor arma automaticamente la secuencia Home -> 5 fases (con su
   mini-quiz de 5 preguntas cada una) -> quiz final de 3 preguntas.

## Que construye cada fase automaticamente

Por cada fase del arreglo `PHASES`, `app.js` genera:
1. Una pantalla con todas las tarjetas de termino de esa fase (imagen,
   descripcion en ingles, fonetica IPA, audio y -si aplica- el logo de la
   herramienta real asociada).
2. Un mini-quiz de 5 preguntas de opcion multiple.
3. Una pantalla de resultado ("X/5 correctas") con boton para continuar.

Al terminar las 5 fases, se muestra un quiz final acumulativo de 3
preguntas y un resumen general de puntajes por fase.

## Notas de diseno

Los iconos de los terminos son ilustraciones propias en SVG (no logotipos
de terceros); varios terminos conceptualmente cercanos comparten un mismo
icono, diferenciados por el color de acento de cada fase. Los iconos de
herramientas (Git, GitHub, MySQL) son representaciones genericas con el
nombre de la marca en texto, para evitar el uso de logotipos oficiales con
derechos de autor.
