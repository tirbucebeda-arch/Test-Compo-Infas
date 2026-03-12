/* global QUIZ_QUESTIONS, ACCESS_CODES */

(function () {
  const els = {
    screenCode: document.getElementById("screenCode"),
    appContent: document.getElementById("appContent"),
    formCode: document.getElementById("formCode"),
    inputAccessCode: document.getElementById("inputAccessCode"),
    codeError: document.getElementById("codeError"),

    screenStart: document.getElementById("screenStart"),
    screenQuiz: document.getElementById("screenQuiz"),
    screenResult: document.getElementById("screenResult"),
    screenReview: document.getElementById("screenReview"),

    selectLevel: document.getElementById("selectLevel"),
    selectSubject: document.getElementById("selectSubject"),
    selectTopic: document.getElementById("selectTopic"),
    btnStart: document.getElementById("btnStart"),
    btnReset: document.getElementById("btnReset"),
    questionBankInfo: document.getElementById("questionBankInfo"),

    quizMeta: document.getElementById("quizMeta"),
    questionText: document.getElementById("questionText"),
    answers: document.getElementById("answers"),
    btnPrev: document.getElementById("btnPrev"),
    btnSkip: document.getElementById("btnSkip"),
    btnNext: document.getElementById("btnNext"),
    progressBar: document.getElementById("progressBar"),
    progressText: document.getElementById("progressText"),
    quizTimer: document.getElementById("quizTimer"),

    scoreText: document.getElementById("scoreText"),
    btnRetry: document.getElementById("btnRetry"),
    btnReview: document.getElementById("btnReview"),

    reviewList: document.getElementById("reviewList"),
    btnBackToStart: document.getElementById("btnBackToStart"),

    btnOpenSettings: document.getElementById("btnOpenSettings"),
    settingsDialog: document.getElementById("settingsDialog"),
    inputStudentName: document.getElementById("inputStudentName"),
    toggleShuffle: document.getElementById("toggleShuffle"),
    btnSaveSettings: document.getElementById("btnSaveSettings"),
    btnLogout: document.getElementById("btnLogout"),
  };

  const STORAGE_KEYS = {
    settings: "quizRevision.settings.v1",
    last: "quizRevision.lastSession.v1",
    accessCode: "quizRevision.accessCode.v1",
  };

  function isAccessGranted() {
    const code = sessionStorage.getItem(STORAGE_KEYS.accessCode);
    const codes = Array.isArray(window.ACCESS_CODES) ? window.ACCESS_CODES : [];
    return code && codes.includes(code);
  }

  function grantAccess(savedCode) {
    if (savedCode) sessionStorage.setItem(STORAGE_KEYS.accessCode, savedCode);
    if (els.screenCode) els.screenCode.classList.add("hidden");
    if (els.appContent) els.appContent.classList.remove("hidden");
  }

  function denyAccess() {
    sessionStorage.removeItem(STORAGE_KEYS.accessCode);
    if (els.screenCode) els.screenCode.classList.remove("hidden");
    if (els.appContent) els.appContent.classList.add("hidden");
    if (els.inputAccessCode) els.inputAccessCode.value = "";
    if (els.codeError) {
      els.codeError.style.display = "none";
      els.codeError.textContent = "";
    }
  }

  const QUESTION_TIME_SEC = 20;
  let questionTimerId = null;
  let questionTimerRemaining = 0;
  let lastTimedQuestionIndex = -1;

  function safeText(s) {
    return String(s ?? "");
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.settings);
      if (!raw) return { studentName: "", shuffleQuestions: true };
      const parsed = JSON.parse(raw);
      return {
        studentName: typeof parsed.studentName === "string" ? parsed.studentName : "",
        shuffleQuestions: Boolean(parsed.shuffleQuestions),
      };
    } catch {
      return { studentName: "", shuffleQuestions: true };
    }
  }

  function saveSettings(next) {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(next));
  }

  function clearQuestionTimer() {
    if (questionTimerId) {
      clearInterval(questionTimerId);
      questionTimerId = null;
    }
  }

  function startQuestionTimer() {
    clearQuestionTimer();
    questionTimerRemaining = QUESTION_TIME_SEC;
    if (els.quizTimer) els.quizTimer.textContent = `${questionTimerRemaining} s`;
    questionTimerId = setInterval(() => {
      questionTimerRemaining--;
      if (els.quizTimer) els.quizTimer.textContent = `${questionTimerRemaining} s`;
      if (questionTimerRemaining <= 0) {
        clearQuestionTimer();
        goNext();
      }
    }, 1000);
  }

  function showScreen(which) {
    if (which !== els.screenQuiz) clearQuestionTimer();
    const screens = [els.screenStart, els.screenQuiz, els.screenResult, els.screenReview];
    for (const s of screens) s.classList.add("hidden");
    which.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function normalizeQuestion(q) {
    if (!q || typeof q !== "object") return null;
    const level = safeText(q.level || "");
    const subject = safeText(q.subject || "");
    const topic = safeText(q.topic || "");
    const category = safeText(q.category || "");
    const computedCategory =
      level && subject ? `${level} — ${subject}` : category || (level ? level : "Sans catégorie");
    const base = {
      id: safeText(q.id),
      category: computedCategory,
      level: level || "",
      subject: subject || "",
      topic: topic || "",
      question: safeText(q.question),
      explanation: q.explanation ? safeText(q.explanation) : "",
    };

    if (q.type === "tf") {
      if (typeof q.answer !== "boolean") return null;
      return { ...base, type: "tf", answer: q.answer };
    }

    // default: mcq (une ou plusieurs bonnes réponses)
    if (!Array.isArray(q.choices) || q.choices.length < 2) return null;
    const choices = q.choices.map((c) => safeText(c));

    if (Array.isArray(q.answerIndices)) {
      const answerIndices = q.answerIndices
        .map((n) => (Number.isInteger(n) ? n : -1))
        .filter((n) => n >= 0 && n < choices.length);
      const uniqueSorted = Array.from(new Set(answerIndices)).sort((a, b) => a - b);
      if (uniqueSorted.length < 1) return null;
      return { ...base, type: "mcq_multi", choices, answerIndices: uniqueSorted };
    }

    const answerIndex = Number.isInteger(q.answerIndex) ? q.answerIndex : -1;
    if (answerIndex < 0 || answerIndex >= choices.length) return null;
    return { ...base, type: "mcq", choices, answerIndex };
  }

  function getQuestionBank() {
    const raw = Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : [];
    const normalized = raw.map(normalizeQuestion).filter(Boolean);
    // remove duplicates by id (keep first)
    const seen = new Set();
    const unique = [];
    for (const q of normalized) {
      if (!q.id || seen.has(q.id)) continue;
      seen.add(q.id);
      unique.push(q);
    }
    return unique;
  }

  const ALL_LEVELS = [
    "Auxiliaire 1 année",
    "Auxiliaire 2 année",
    "Licence 1 IDE/SFM",
    "Licence 2 IDE/SFM",
    "Licence 3 IDE/SFM",
  ];

  const ALL_SUBJECTS = ["Pédiatrie", "Santé Publique", "Chirurgie", "Médecine"];

  function computeLevels() {
    return ["Tous les niveaux", ...ALL_LEVELS];
  }

  function computeSubjectsForLevel(level) {
    // Pour l’instant, mêmes matières pour tous les niveaux
    return ["Toutes les matières", ...ALL_SUBJECTS];
  }

  function computeTopicsForSubject(subject) {
    if (!subject || subject === "Toutes les matières") return ["Tous les sujets"];
    var sujets = window.SUJETS_PAR_MATIERE && window.SUJETS_PAR_MATIERE[subject];
    if (!Array.isArray(sujets) || sujets.length === 0) return ["Tous les sujets"];
    return ["Tous les sujets"].concat(sujets);
  }

  function setOptions(select, options, valueToSelect) {
    select.innerHTML = "";
    for (const opt of options) {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      select.appendChild(o);
    }
    if (valueToSelect && options.includes(valueToSelect)) select.value = valueToSelect;
  }

  function filterBank(bank, { level, subject, topic }) {
    let out = bank;
    if (level && level !== "Tous les niveaux") out = out.filter((q) => q.level === level);
    if (subject && subject !== "Toutes les matières") out = out.filter((q) => q.subject === subject);
    if (topic && topic !== "Tous les sujets") out = out.filter((q) => q.topic === topic);
    return out;
  }

  function pickQuestions(filtered, shuffleQuestions) {
    const pool = filtered.slice();
    if (shuffleQuestions) shuffleInPlace(pool);
    return pool;
  }

  function formatMeta({ level, subject, topic, total }, settings) {
    const parts = [];
    if (level && level !== "Tous les niveaux") parts.push(level);
    if (subject && subject !== "Toutes les matières") parts.push(subject);
    if (topic && topic !== "Tous les sujets") parts.push(topic);
    parts.push("QCM + V/F");
    parts.push(`${total} question${total > 1 ? "s" : ""}`);
    const name = settings.studentName.trim();
    if (name) parts.push(`Bon courage, ${name} !`);
    return parts.join(" • ");
  }

  function isAnswered(q, answer) {
    if (!q) return false;
    if (q.type === "mcq") return Number.isInteger(answer?.selectedIndex);
    if (q.type === "mcq_multi") return Array.isArray(answer?.selectedIndices) && answer.selectedIndices.length > 0;
    if (q.type === "tf") return typeof answer?.selectedBool === "boolean";
    return false;
  }

  function normalizeSelectedIndices(indices, maxLen) {
    if (!Array.isArray(indices)) return [];
    const cleaned = indices
      .map((n) => (Number.isInteger(n) ? n : -1))
      .filter((n) => n >= 0 && n < maxLen);
    return Array.from(new Set(cleaned)).sort((a, b) => a - b);
  }

  function isCorrect(q, answer) {
    if (!isAnswered(q, answer)) return false;
    if (q.type === "mcq") return answer.selectedIndex === q.answerIndex;
    if (q.type === "mcq_multi") {
      const selected = normalizeSelectedIndices(answer?.selectedIndices, q.choices.length);
      if (selected.length !== q.answerIndices.length) return false;
      for (let i = 0; i < selected.length; i++) if (selected[i] !== q.answerIndices[i]) return false;
      return true;
    }
    if (q.type === "tf") return answer.selectedBool === q.answer;
    return false;
  }

  let bank = getQuestionBank();
  let settings = loadSettings();

  let session = {
    startedAt: null,
    level: "Tous les niveaux",
    subject: "Toutes les matières",
    topic: "Tous les sujets",
    questions: [],
    answersById: {}, // { [id]: { selectedIndex? , selectedBool? } }
    index: 0,
  };

  function updateStartInfo() {
    bank = getQuestionBank();
    const levels = computeLevels();
    setOptions(els.selectLevel, levels, session.level);

    const subjects = computeSubjectsForLevel(els.selectLevel.value);
    const desiredSubject = subjects.includes(session.subject) ? session.subject : "Toutes les matières";
    setOptions(els.selectSubject, subjects, desiredSubject);
    session.subject = els.selectSubject.value;

    const topics = computeTopicsForSubject(els.selectSubject.value);
    const desiredTopic = topics.includes(session.topic) ? session.topic : "Tous les sujets";
    setOptions(els.selectTopic, topics, desiredTopic);
    session.topic = els.selectTopic.value;

    const filtered = filterBank(bank, {
      level: els.selectLevel.value,
      subject: els.selectSubject.value,
      topic: els.selectTopic.value,
    });
    els.questionBankInfo.textContent = `${filtered.length} question${filtered.length > 1 ? "s" : ""} dispo`;

    const max = filtered.length;
    els.btnStart.disabled = max === 0;
  }

  function renderQuiz() {
    const q = session.questions[session.index];
    if (!q) return;

    if (session.index !== lastTimedQuestionIndex) {
      lastTimedQuestionIndex = session.index;
      startQuestionTimer();
    }

    const total = session.questions.length;
    const pos = session.index + 1;

    els.quizMeta.textContent = formatMeta(
      { level: session.level, subject: session.subject, topic: session.topic, total },
      settings
    );
    els.questionText.textContent = q.question;

    const pct = total === 0 ? 0 : Math.round((pos / total) * 100);
    els.progressBar.style.width = `${pct}%`;
    const answeredCount = session.questions.reduce(
      (acc, qq) => acc + (isAnswered(qq, session.answersById[qq.id]) ? 1 : 0),
      0
    );
    els.progressText.textContent = `Question ${pos}/${total} • Répondu: ${answeredCount}/${total}`;

    els.btnPrev.disabled = session.index === 0;
    els.btnNext.textContent = session.index === total - 1 ? "Terminer" : "Suivant";

    els.answers.innerHTML = "";
    const currentAnswer = session.answersById[q.id] || {};

    if (q.type === "tf") {
      const tfChoices = [
        { label: "Vrai", value: true },
        { label: "Faux", value: false },
      ];
      for (const c of tfChoices) {
        const item = document.createElement("label");
        item.className = "answer";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = c.value ? "true" : "false";
        input.checked = currentAnswer.selectedBool === c.value;
        const text = document.createElement("div");
        text.className = "answer__text";
        text.textContent = c.label;
        item.appendChild(input);
        item.appendChild(text);
        if (input.checked) item.classList.add("answer--selected");
        item.addEventListener("click", () => {
          session.answersById[q.id] = { selectedBool: c.value };
          renderQuiz();
        });
        els.answers.appendChild(item);
      }
      return;
    }

    if (q.type === "mcq_multi") {
      const selected = normalizeSelectedIndices(currentAnswer.selectedIndices, q.choices.length);
      for (let idx = 0; idx < q.choices.length; idx++) {
        const choiceText = q.choices[idx];
        const item = document.createElement("label");
        item.className = "answer";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "answerMulti";
        input.value = String(idx);
        input.checked = selected.includes(idx);
        const text = document.createElement("div");
        text.className = "answer__text";
        text.textContent = choiceText;
        item.appendChild(input);
        item.appendChild(text);
        if (input.checked) item.classList.add("answer--selected");
        item.addEventListener("click", () => {
          const next = new Set(selected);
          if (next.has(idx)) next.delete(idx);
          else next.add(idx);
          session.answersById[q.id] = { selectedIndices: Array.from(next) };
          renderQuiz();
        });
        els.answers.appendChild(item);
      }
      return;
    }

    for (let idx = 0; idx < q.choices.length; idx++) {
      const choiceText = q.choices[idx];
      const item = document.createElement("label");
      item.className = "answer";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = String(idx);
      input.checked = currentAnswer.selectedIndex === idx;
      const text = document.createElement("div");
      text.className = "answer__text";
      text.textContent = choiceText;
      item.appendChild(input);
      item.appendChild(text);
      if (input.checked) item.classList.add("answer--selected");
      item.addEventListener("click", () => {
        session.answersById[q.id] = { selectedIndex: idx };
        renderQuiz();
      });
      els.answers.appendChild(item);
    }
  }

  function computeScore() {
    let correct = 0;
    let answered = 0;
    for (const q of session.questions) {
      const a = session.answersById[q.id];
      if (isAnswered(q, a)) answered++;
      if (isCorrect(q, a)) correct++;
    }
    return { correct, answered, total: session.questions.length };
  }

  function renderResult() {
    const { correct, answered, total } = computeScore();
    const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
    els.scoreText.textContent = `${correct}/${total} correct • ${pct}% • répondu: ${answered}/${total}`;
  }

  function renderReview() {
    els.reviewList.innerHTML = "";
    const { correct, total } = computeScore();
    const head = document.createElement("div");
    head.className = "pill";
    head.textContent = `Score: ${correct}/${total}`;
    els.reviewList.appendChild(head);

    for (let i = 0; i < session.questions.length; i++) {
      const q = session.questions[i];
      const a = session.answersById[q.id] || {};
      const ok = isCorrect(q, a);
      const answered = isAnswered(q, a);

      const item = document.createElement("div");
      item.className = "reviewItem";

      const qEl = document.createElement("div");
      qEl.className = "reviewItem__q";
      qEl.textContent = `${i + 1}. ${q.question}`;

      const meta = document.createElement("div");
      meta.className = "reviewItem__meta";
      const tag1 = document.createElement("span");
      tag1.className = "tag";
      tag1.textContent = q.category;
      const tag2 = document.createElement("span");
      tag2.className = `tag ${ok ? "tag--ok" : "tag--bad"}`;
      tag2.textContent = ok ? "Correct" : answered ? "Incorrect" : "Non répondu";
      meta.appendChild(tag1);
      meta.appendChild(tag2);

      const body = document.createElement("div");
      body.className = "muted";

      if (q.type === "tf") {
        const your = typeof a.selectedBool === "boolean" ? (a.selectedBool ? "Vrai" : "Faux") : "—";
        const right = q.answer ? "Vrai" : "Faux";
        body.textContent = `Ta réponse: ${your} • Bonne réponse: ${right}`;
      } else if (q.type === "mcq_multi") {
        const selected = normalizeSelectedIndices(a.selectedIndices, q.choices.length);
        const your =
          selected.length > 0 ? selected.map((i2) => q.choices[i2]).filter(Boolean).join(", ") : "—";
        const right = q.answerIndices.map((i2) => q.choices[i2]).filter(Boolean).join(", ");
        body.textContent = `Tes réponses: ${your} • Bonnes réponses: ${right}`;
      } else {
        const your =
          Number.isInteger(a.selectedIndex) && q.choices[a.selectedIndex] != null
            ? q.choices[a.selectedIndex]
            : "—";
        const right = q.choices[q.answerIndex];
        body.textContent = `Ta réponse: ${your} • Bonne réponse: ${right}`;
      }

      item.appendChild(qEl);
      item.appendChild(meta);
      item.appendChild(body);

      if (q.explanation) {
        const exp = document.createElement("div");
        exp.className = "small muted";
        exp.style.marginTop = "8px";
        exp.textContent = `Explication: ${q.explanation}`;
        item.appendChild(exp);
      }

      els.reviewList.appendChild(item);
    }
  }

  function startNewSession() {
    const level = els.selectLevel.value;
    const subject = els.selectSubject.value;
    const topic = els.selectTopic?.value || "Tous les sujets";
    const filtered = filterBank(bank, { level, subject, topic });
    const picked = pickQuestions(filtered, settings.shuffleQuestions);

    lastTimedQuestionIndex = -1;
    session = {
      startedAt: Date.now(),
      level,
      subject,
      topic,
      questions: picked,
      answersById: {},
      index: 0,
    };

    try {
      localStorage.setItem(
        STORAGE_KEYS.last,
        JSON.stringify({
          startedAt: session.startedAt,
          level,
          subject,
          questionIds: picked.map((q) => q.id),
        })
      );
    } catch {
      // ignore
    }

    showScreen(els.screenQuiz);
    renderQuiz();
  }

  function goNext() {
    const atLast = session.index >= session.questions.length - 1;
    if (atLast) {
      showScreen(els.screenResult);
      renderResult();
      return;
    }
    session.index++;
    renderQuiz();
  }

  function goPrev() {
    if (session.index <= 0) return;
    session.index--;
    renderQuiz();
  }

  function skipQuestion() {
    const q = session.questions[session.index];
    if (!q) return;
    delete session.answersById[q.id];
    goNext();
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEYS.last);
    localStorage.removeItem(STORAGE_KEYS.settings);
    settings = loadSettings();
    els.inputStudentName.value = settings.studentName;
    els.toggleShuffle.checked = settings.shuffleQuestions;
    session.index = 0;
    showScreen(els.screenStart);
    updateStartInfo();
  }

  // Events
  els.selectLevel.addEventListener("change", () => {
    session.level = els.selectLevel.value;
    session.subject = "Toutes les matières";
    session.topic = "Tous les sujets";
    updateStartInfo();
  });
  els.selectSubject.addEventListener("change", () => {
    session.subject = els.selectSubject.value;
    session.topic = "Tous les sujets";
    updateStartInfo();
  });
  if (els.selectTopic) {
    els.selectTopic.addEventListener("change", () => {
      session.topic = els.selectTopic.value;
      updateStartInfo();
    });
  }

  els.btnStart.addEventListener("click", startNewSession);
  els.btnPrev.addEventListener("click", goPrev);
  els.btnNext.addEventListener("click", goNext);
  els.btnSkip.addEventListener("click", skipQuestion);

  els.btnRetry.addEventListener("click", () => {
    showScreen(els.screenStart);
    updateStartInfo();
  });
  els.btnReview.addEventListener("click", () => {
    showScreen(els.screenReview);
    renderReview();
  });
  els.btnBackToStart.addEventListener("click", () => {
    showScreen(els.screenStart);
    updateStartInfo();
  });

  els.btnOpenSettings.addEventListener("click", () => {
    els.inputStudentName.value = settings.studentName;
    els.toggleShuffle.checked = settings.shuffleQuestions;
    els.settingsDialog.showModal();
  });
  els.btnSaveSettings.addEventListener("click", () => {
    settings = {
      studentName: safeText(els.inputStudentName.value).slice(0, 40),
      shuffleQuestions: Boolean(els.toggleShuffle.checked),
    };
    saveSettings(settings);
  });

  els.btnReset.addEventListener("click", () => {
    const ok = confirm("Réinitialiser la progression et les paramètres ?");
    if (!ok) return;
    resetAll();
  });

  if (els.formCode) {
    els.formCode.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = (els.inputAccessCode?.value || "").trim();
      const codes = Array.isArray(window.ACCESS_CODES) ? window.ACCESS_CODES : [];
      if (codes.includes(code)) {
        grantAccess(code);
        els.inputStudentName.value = settings.studentName;
        els.toggleShuffle.checked = settings.shuffleQuestions;
        updateStartInfo();
        showScreen(els.screenStart);
      } else {
        if (els.codeError) {
          els.codeError.textContent = "Code invalide.";
          els.codeError.style.display = "block";
        }
      }
    });
  }

  if (els.btnLogout) {
    els.btnLogout.addEventListener("click", () => {
      denyAccess();
    });
  }

  // init
  if (isAccessGranted()) {
    grantAccess();
    els.inputStudentName.value = settings.studentName;
    els.toggleShuffle.checked = settings.shuffleQuestions;
    updateStartInfo();
    showScreen(els.screenStart);
  } else {
    denyAccess();
  }
})();

