# Interactive SDLC Vocabulary Builder (ADSO)

Recurso web interactivo para repasar el vocabulario técnico del SDLC:
**15 términos por cada una de las 5 fases** (la fase 5, Deployment &
Maintenance, solo tiene 13 porque es todo lo que contiene esa hoja del
glosario original — se incluyeron los 13). Cada término trae pronunciación
IPA, descripción en inglés, frase de ejemplo, audio propio y, cuando aplica,
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
audio/                 -> grabaciones .ogg numeradas (01-requirement.ogg ...)
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

## Audios

Los audios (formato .ogg) estan en `audio/`, numerados del 01 al 73 en el
orden del glosario, con el nombre `NN-palabra.ogg` (el texto entre
parentesis, como "(UI)", se ignora en el nombre). Cada termino apunta a su
archivo mediante el campo `audio` de `js/data.js`.

**Pendiente:** falta grabar `audio/70-logging.ogg` (Logging, fase 5). Cuando
lo agregues con ese nombre, funciona sin tocar nada mas.

Lista de los 73 archivos:

```
audio/01-requirement.ogg
audio/02-stakeholder.ogg
audio/03-feasibility-study.ogg
audio/04-scope.ogg
audio/05-business-case.ogg
audio/06-gathering.ogg
audio/07-modeling.ogg
audio/08-elicitation.ogg
audio/09-acceptance-criteria.ogg
audio/10-constraint.ogg
audio/11-use-case.ogg
audio/12-functional-requirement.ogg
audio/13-non-functional-requirement.ogg
audio/14-estimates.ogg
audio/15-resource-allocation.ogg
audio/16-architecture.ogg
audio/17-design-pattern.ogg
audio/18-user-interface.ogg
audio/19-user-experience.ogg
audio/20-prototype.ogg
audio/21-database.ogg
audio/22-schema.ogg
audio/23-algorithm.ogg
audio/24-component.ogg
audio/25-diagram.ogg
audio/26-wireframe.ogg
audio/27-mockup.ogg
audio/28-scalability.ogg
audio/29-security.ogg
audio/30-api.ogg
audio/31-code.ogg
audio/32-developer.ogg
audio/33-programming-language.ogg
audio/34-back-end.ogg
audio/35-front-end.ogg
audio/36-framework.ogg
audio/37-library.ogg
audio/38-version-control.ogg
audio/39-repository.ogg
audio/40-commit.ogg
audio/41-merge.ogg
audio/42-branch.ogg
audio/43-build.ogg
audio/44-debugging.ogg
audio/45-deployment.ogg
audio/46-testing.ogg
audio/47-quality-assurance.ogg
audio/48-bug.ogg
audio/49-test-case.ogg
audio/50-unit-test.ogg
audio/51-integration-test.ogg
audio/52-acceptance-testing.ogg
audio/53-regression-testing.ogg
audio/54-performance-testing.ogg
audio/55-automation.ogg
audio/56-test-plan.ogg
audio/57-severity.ogg
audio/58-priority.ogg
audio/59-validation.ogg
audio/60-verification.ogg
audio/61-release.ogg
audio/62-production-environment.ogg
audio/63-staging-environment.ogg
audio/64-rollback.ogg
audio/65-patch.ogg
audio/66-update.ogg
audio/67-maintenance.ogg
audio/68-hotfix.ogg
audio/69-monitoring.ogg
audio/70-logging.ogg
audio/71-feedback.ogg
audio/72-upgrade.ogg
audio/73-discontinued.ogg
```

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
