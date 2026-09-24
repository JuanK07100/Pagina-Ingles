/* =========================================================================
   app.js
   -------------------------------------------------------------------------
   Motor genérico de la actividad interactiva. Construye la secuencia de
   pantallas a partir de PHASES (data.js) y PHASE_QUIZZES / FINAL_QUIZ
   (quizzes.js), y maneja la navegación "Siguiente" entre ellas.

   Secuencia generada automáticamente:
   home → [terms(fase 1) → quiz(fase 1) → results(fase 1)] × 5 → final-quiz → final-results
   ========================================================================= */

(function () {
  const root = document.getElementById("app-main");
  const pipelineEl = document.getElementById("pipeline");
  const guideBtn = document.getElementById("guide-btn");
  const guideOverlay = document.getElementById("guide-overlay");
  const guideClose = document.getElementById("guide-close");

  /* ---------------------------------------------------------------------
     Construir la secuencia de pantallas
     --------------------------------------------------------------------- */
  const screens = [{ type: "home" }];
  PHASES.forEach((phase) => {
    screens.push({ type: "terms", phase });
    screens.push({ type: "quiz", phase, questions: PHASE_QUIZZES[phase.id] });
    screens.push({ type: "phase-results", phase });
  });
  screens.push({ type: "final-quiz", questions: FINAL_QUIZ });
  screens.push({ type: "final-results" });

  let current = 0;
  const state = {
    scores: {}, // { phaseId: {correct, total} }
    finalScore: null,
  };

  function accentFor(screen) {
    if (screen.phase) return screen.phase.accent;
    if (screen.type === "final-quiz" || screen.type === "final-results") return "#F2C14E";
    return "#6FA8DC";
  }

  function applyAccent(color) {
    document.documentElement.style.setProperty("--step-color", color);
  }

  function go(index) {
    current = Math.max(0, Math.min(screens.length - 1, index));
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() { go(current + 1); }

  /* ---------------------------------------------------------------------
     Render de la barra de progreso (pipeline de fases)
     --------------------------------------------------------------------- */
  function renderPipeline() {
    pipelineEl.innerHTML = "";
    PHASES.forEach((phase, i) => {
      const step = document.createElement("div");
      step.className = "pipeline__step";
      step.style.setProperty("--step-color", phase.accent);

      const screenIndexForPhase = screens.findIndex(
        (s) => s.phase && s.phase.id === phase.id && s.type === "terms"
      );
      const currentScreen = screens[current];
      const isActivePhase = currentScreen.phase && currentScreen.phase.id === phase.id;
      const isDone = current > screens.findIndex(
        (s) => s.phase && s.phase.id === phase.id && s.type === "phase-results"
      );

      if (isActivePhase) step.classList.add("is-active");
      if (isDone) step.classList.add("is-done");

      step.innerHTML = `<span class="num">${phase.number}</span><span class="label">${phase.title}</span>`;
      pipelineEl.appendChild(step);
    });
  }

  /* ---------------------------------------------------------------------
     Pantallas
     --------------------------------------------------------------------- */
  function renderHome() {
    root.innerHTML = `
      <div class="screen">
        <p class="eyebrow">// ADSO · Bilingüismo Técnico</p>
        <h1 class="hero-title">Interactive SDLC<br/>Vocabulary Builder</h1>
        <p class="lede">
          Vas a recorrer las 5 fases del ciclo de vida del software (SDLC) y aprender
          15 términos técnicos clave en inglés: su significado, pronunciación (IPA)
          y las herramientas reales asociadas. Al final de cada fase respondes un
          mini-quiz de 5 preguntas, y al terminar todo, un quiz final de 3 preguntas
          repasa todo lo aprendido.
        </p>

        <div class="home-panel">
          <div class="home-terminal">
            <div class="home-terminal__bar"><span></span><span></span><span></span></div>
            <div class="home-terminal__body">
              <p><span class="prompt">$</span> npm run learn-sdlc-vocabulary</p>
              <p>&gt; loading 5 phases, 15 terms, 5 mini-quizzes, 1 final quiz...</p>
              <p>&gt; ready. press "Comenzar" to start.</p>
            </div>
          </div>

          <ul class="phase-list">
            ${PHASES.map(
              (p) => `
              <li style="border-left-color:${p.accent}">
                <span class="n">0${p.number}</span>
                <span>${p.title} — ${p.subtitle}</span>
              </li>`
            ).join("")}
          </ul>

          <div class="actions-row">
            <button class="btn btn--primary" id="start-btn">Comenzar →</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("start-btn").addEventListener("click", next);
  }

  function renderTerms(screen) {
    const { phase } = screen;
    root.innerHTML = `
      <div class="screen">
        <div class="phase-header">
          <p class="eyebrow">Fase ${phase.number} de 5</p>
          <h1 class="hero-title">${phase.title}</h1>
          <p class="subtitle">${phase.subtitle}</p>
          <p class="lede">${phase.intro}</p>
        </div>

        <div class="term-grid">
          ${phase.terms
            .map(
              (t, i) => `
            <article class="term-card">
              <div class="term-card__window">
                <span></span><span></span><span></span>
                <span class="filename">${t.name.toLowerCase().replace(/\s+/g, "-")}.term</span>
              </div>
              <div class="term-card__body">
                <div class="term-card__icon">${t.icon}</div>
                <h3 class="term-card__name">${t.name}</h3>
                <p class="term-card__phonetic">${t.phonetic}</p>
                <p class="term-card__desc">${t.description}</p>
                ${
                  t.tool
                    ? `<span class="term-card__tool">${t.tool.icon}${t.tool.name}</span>`
                    : ""
                }
                <div class="term-card__audio">
                  <audio controls preload="none">
                    <source src="${t.audio}" type="audio/mpeg" />
                  </audio>
                </div>
                <p class="term-card__audio-note">audio: ${t.audio} (agrega tu grabación aquí)</p>
              </div>
            </article>
          `
            )
            .join("")}
        </div>

        <div class="actions-row">
          <button class="btn btn--primary" id="next-btn">Siguiente: mini-quiz →</button>
        </div>
      </div>
    `;
    document.getElementById("next-btn").addEventListener("click", next);
  }

  function renderQuiz(screen) {
    const { questions, phase } = screen;
    const isFinal = !phase;
    let qIndex = 0;
    let correctCount = 0;

    function renderQuestion() {
      const q = questions[qIndex];
      root.innerHTML = `
        <div class="screen">
          <p class="eyebrow">${isFinal ? "Quiz final" : `Mini-quiz · ${phase.title}`}</p>
          <h1 class="hero-title">${isFinal ? "Repaso general" : "¿Qué tanto recuerdas?"}</h1>
          <p class="quiz-progress">Pregunta ${qIndex + 1} de ${questions.length}</p>

          <div class="quiz-card">
            <p class="quiz-card__question">${q.q}</p>
            <div class="quiz-options">
              ${q.options
                .map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`)
                .join("")}
            </div>
            <p class="quiz-feedback" id="quiz-feedback"></p>
          </div>

          <div class="actions-row">
            <button class="btn btn--primary" id="quiz-next-btn" disabled>
              ${qIndex === questions.length - 1 ? "Ver resultados →" : "Siguiente pregunta →"}
            </button>
          </div>
        </div>
      `;

      const optionButtons = [...document.querySelectorAll(".quiz-option")];
      const feedbackEl = document.getElementById("quiz-feedback");
      const nextBtn = document.getElementById("quiz-next-btn");

      optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = Number(btn.dataset.i);
          const isCorrect = chosen === q.correct;
          optionButtons.forEach((b) => (b.disabled = true));

          if (isCorrect) {
            btn.classList.add("is-correct");
            correctCount++;
            feedbackEl.textContent = "✓ ¡Correcto!";
            feedbackEl.className = "quiz-feedback ok";
          } else {
            btn.classList.add("is-wrong");
            optionButtons[q.correct].classList.add("is-correct");
            feedbackEl.textContent = "✗ No exactamente — revisa la respuesta resaltada.";
            feedbackEl.className = "quiz-feedback no";
          }
          nextBtn.disabled = false;
        });
      });

      nextBtn.addEventListener("click", () => {
        if (qIndex < questions.length - 1) {
          qIndex++;
          renderQuestion();
        } else {
          if (isFinal) {
            state.finalScore = { correct: correctCount, total: questions.length };
          } else {
            state.scores[phase.id] = { correct: correctCount, total: questions.length };
          }
          next();
        }
      });
    }

    renderQuestion();
  }

  function renderPhaseResults(screen) {
    const { phase } = screen;
    const score = state.scores[phase.id];
    root.innerHTML = `
      <div class="screen">
        <p class="eyebrow">Resultado · ${phase.title}</p>
        <div class="results-panel">
          <p class="results-score">${score.correct}/${score.total}</p>
          <p class="results-label">respuestas correctas en esta fase</p>
          <div class="actions-row" style="justify-content:center">
            <button class="btn btn--primary" id="continue-btn">
              ${phase.number === PHASES.length ? "Ir al quiz final →" : "Continuar a la siguiente fase →"}
            </button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("continue-btn").addEventListener("click", next);
  }

  function renderFinalResults() {
    const score = state.finalScore;
    const phaseSummary = PHASES.map(
      (p) => `${p.title}: ${state.scores[p.id].correct}/${state.scores[p.id].total}`
    ).join(" · ");

    root.innerHTML = `
      <div class="screen">
        <p class="eyebrow">// build complete</p>
        <div class="results-panel">
          <h1 class="hero-title" style="margin-bottom:6px">¡Actividad completada!</h1>
          <p class="results-score">${score.correct}/${score.total}</p>
          <p class="results-label">respuestas correctas en el quiz final</p>
          <p style="color:var(--muted); font-family:var(--mono); font-size:12.5px; margin-bottom:26px;">
            ${phaseSummary}
          </p>
          <div class="actions-row" style="justify-content:center">
            <button class="btn btn--ghost" id="restart-btn">↺ Repetir la actividad</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("restart-btn").addEventListener("click", () => {
      state.scores = {};
      state.finalScore = null;
      go(0);
    });
  }

  /* ---------------------------------------------------------------------
     Render principal
     --------------------------------------------------------------------- */
  function render() {
    const screen = screens[current];
    applyAccent(accentFor(screen));
    renderPipeline();

    switch (screen.type) {
      case "home":
        renderHome();
        break;
      case "terms":
        renderTerms(screen);
        break;
      case "quiz":
        renderQuiz(screen);
        break;
      case "phase-results":
        renderPhaseResults(screen);
        break;
      case "final-quiz":
        renderQuiz(screen);
        break;
      case "final-results":
        renderFinalResults();
        break;
    }
  }

  /* ---------------------------------------------------------------------
     Guía fonética (overlay accesible en cualquier momento)
     --------------------------------------------------------------------- */
  function renderGuide() {
    const grid = document.getElementById("guide-grid");
    grid.innerHTML = PHONETIC_GUIDE.map(
      (g) => `
      <div class="guide-item">
        <span class="sym">${g.symbol}</span>
        <span class="ex">${g.example}</span>
      </div>`
    ).join("");
  }

  guideBtn.addEventListener("click", () => {
    renderGuide();
    guideOverlay.classList.remove("hidden");
  });
  guideClose.addEventListener("click", () => guideOverlay.classList.add("hidden"));
  guideOverlay.addEventListener("click", (e) => {
    if (e.target === guideOverlay) guideOverlay.classList.add("hidden");
  });

  /* ---------------------------------------------------------------------
     Arranque
     --------------------------------------------------------------------- */
  render();
})();
