/* =========================================================================
   quizzes.js
   -------------------------------------------------------------------------
   Banco de preguntas. Cada fase tiene 5 preguntas de opción múltiple que
   muestrean los 15 términos de esa fase (no es necesario cubrir los 15,
   solo repasar los más representativos). Al final hay un quiz acumulativo
   de 3 preguntas que mezcla términos de varias fases.

   Formato de cada pregunta:
   { q: "texto de la pregunta", options: [...], correct: index }
   ========================================================================= */

const PHASE_QUIZZES = {
  planning: [
    {
      q: "Which term refers to a condition the system must meet to solve a problem?",
      options: ["Constraint", "Requirement", "Estimates"],
      correct: 1,
    },
    {
      q: "An evaluation of whether a project is technically and financially possible is a...",
      options: ["Business Case", "Feasibility Study", "Scope"],
      correct: 1,
    },
    {
      q: "Which term describes the boundaries and objectives of a project?",
      options: ["Scope", "Constraint", "Resource Allocation"],
      correct: 0,
    },
    {
      q: "Describing what the system must do (its functions and behaviors) is a...",
      options: ["Non-functional Requirement", "Functional Requirement", "Use Case"],
      correct: 1,
    },
    {
      q: "The technique used to draw out requirements from stakeholders is called...",
      options: ["Elicitation", "Modeling", "Acceptance Criteria"],
      correct: 0,
    },
  ],

  design: [
    {
      q: "Which term names an organized collection of structured information?",
      options: ["API", "Database", "Schema"],
      correct: 1,
    },
    {
      q: "A reusable solution to a common problem in software design is a...",
      options: ["Design Pattern", "Prototype", "Mockup"],
      correct: 0,
    },
    {
      q: "The feelings and perceptions a user has while using a product describe the...",
      options: ["User Interface (UI)", "User Experience (UX)", "Wireframe"],
      correct: 1,
    },
    {
      q: "A system's ability to handle growth in users or workload is its...",
      options: ["Security", "Scalability", "Architecture"],
      correct: 1,
    },
    {
      q: "A schematic layout of an interface, without visual details, is a...",
      options: ["Wireframe", "Mockup", "Diagram"],
      correct: 0,
    },
  ],

  development: [
    {
      q: "The central place where a project's source code is stored is a...",
      options: ["Repository", "Branch", "Library"],
      correct: 0,
    },
    {
      q: "Combining different branches of code is called...",
      options: ["Commit", "Merge", "Build"],
      correct: 1,
    },
    {
      q: "Git is a real tool developers use for...",
      options: ["Debugging", "Version Control", "Deployment"],
      correct: 1,
    },
    {
      q: "The part of a system users interact with directly is the...",
      options: ["Back-end", "Front-end", "Framework"],
      correct: 1,
    },
    {
      q: "Converting source code into an executable program is called a...",
      options: ["Build", "Commit", "Debugging"],
      correct: 0,
    },
  ],

  testing: [
    {
      q: "A defect in the code that causes unexpected behavior is a...",
      options: ["Bug", "Severity", "Priority"],
      correct: 0,
    },
    {
      q: "Testing done by end users to confirm the software meets their needs is...",
      options: ["Unit Test", "Acceptance Testing (UAT)", "Regression Testing"],
      correct: 1,
    },
    {
      q: "Checking whether the software meets its specifications — \"did we build the product right?\" — is...",
      options: ["Validation", "Verification", "Quality Assurance (QA)"],
      correct: 1,
    },
    {
      q: "Using tools to run repetitive tests without manual effort is called...",
      options: ["Automation", "Test Plan", "Test Case"],
      correct: 0,
    },
    {
      q: "Testing that ensures recent changes haven't broken existing features is...",
      options: ["Performance Testing", "Regression Testing", "Integration Test"],
      correct: 1,
    },
  ],

  deployment: [
    {
      q: "A patch for a critical bug in production that must be applied immediately is a...",
      options: ["Hotfix", "Rollback", "Update"],
      correct: 0,
    },
    {
      q: "Restoring a system to a previous state after a failed deployment is called...",
      options: ["Rollback", "Patch", "Upgrade"],
      correct: 0,
    },
    {
      q: "Continuously observing a system in production to detect issues is...",
      options: ["Logging", "Monitoring", "Feedback"],
      correct: 1,
    },
    {
      q: "The environment that mirrors production for final testing before release is the...",
      options: ["Staging Environment", "Production Environment", "Test Plan"],
      correct: 0,
    },
    {
      q: "A product or version that is no longer developed or maintained is...",
      options: ["Discontinued", "Patch", "Upgrade"],
      correct: 0,
    },
  ],
};

const FINAL_QUIZ = [
  {
    q: "Which term belongs to the Planning & Analysis phase?",
    options: ["Stakeholder", "Database", "Bug"],
    correct: 0,
  },
  {
    q: "Which is the correct order of these three SDLC phases?",
    options: [
      "Testing → Development → Deployment",
      "Development → Testing → Deployment",
      "Deployment → Development → Testing",
    ],
    correct: 1,
  },
  {
    q: "Which term belongs to Deployment & Maintenance, not to Testing?",
    options: ["Regression Testing", "Monitoring", "Unit Test"],
    correct: 1,
  },
];
