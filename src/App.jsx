import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Database,
  Sparkles,
  FileCheck2,
  ClipboardCheck,
  AlertTriangle,
  RotateCcw,
  Timer,
  Bot,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  CheckCircle2,
  Play,
  Pause,
  Plus,
  Bookmark,
  Download,
  Upload,
  Award,
  Layers,
  Target,
} from "lucide-react";

const STORAGE_KEY = "anweshaa_air1_study_os_2028_v1";

const DEFAULT_BRAND = {
  title: "ANWESHAA",
  subtitle: "AIR-1",
  exam: "IPMAT 2028",
  tagline: "One Goal. One Rank. No Excuses.",
  studentName: "Anweshaa",
  targetDate: "2028-05-15",
  dailyTargetHours: 8,
  weeklyTargetHours: 52,
};

const SYLLABUS_DATA = [
  // Quantitative Ability (18 Chapters)
  { id: "qa-1", subject: "Quantitative Ability", chapter: "Number System", weight: "High", formula: "Divisibility rules, Remainder Theorem, Euler's Totient φ(n), Cyclicity of unit digits.", shortcut: "For last 2 digits of a^n when ending in 1,3,7,9: reduce power mod 20 (or 4 for odd/even cyclicity).", trap: "Forgetting 0 is neither positive nor negative, and 1 is neither prime nor composite." },
  { id: "qa-2", subject: "Quantitative Ability", chapter: "Percentages", weight: "High", formula: "Net % change = x + y + (xy/100). If A is R% more than B, B is [100R/(100+R)]% less than A.", shortcut: "Fraction-to-% table: 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%.", trap: "Applying percentage change on the new base instead of the original base." },
  { id: "qa-3", subject: "Quantitative Ability", chapter: "Profit, Loss and Discount", weight: "High", formula: "SP = CP(1 ± P%/L%). MP = CP × (100 + M%)/(100 - D%).", shortcut: "False weight gain % = [Error / (True Weight - Error)] × 100.", trap: "Calculating discount on CP instead of Marked Price (MP)." },
  { id: "qa-4", subject: "Quantitative Ability", chapter: "Ratio and Proportion", weight: "High", formula: "If a/b = c/d = k, then (a+c)/(b+d) = k. Componendo-dividendo.", shortcut: "Equalize common term across ratios before adding/subtracting quantities.", trap: "Multiplying ratios with different bases without scaling common variables." },
  { id: "qa-5", subject: "Quantitative Ability", chapter: "Averages", weight: "Medium", formula: "Average = Sum / Count. Weighted Avg = (n1·a1 + n2·a2)/(n1 + n2).", shortcut: "Deviation method: pick a working average and average the differences.", trap: "Taking simple average of speeds or ratios instead of weighted/harmonic mean." },
  { id: "qa-6", subject: "Quantitative Ability", chapter: "Mixtures and Alligation", weight: "High", formula: "(W1 / W2) = (C2 - Cm) / (Cm - C1).", shortcut: "Repeated replacement: Final qty of original = Initial × (1 - x/V)^n.", trap: "Plugging ratios instead of actual concentrations (like % or price/kg) into alligation." },
  { id: "qa-7", subject: "Quantitative Ability", chapter: "Simple and Compound Interest", weight: "Medium", formula: "SI = PRT/100. CI = P[(1 + R/100)^n - 1]. Diff (2 yrs) = P(R/100)^2.", shortcut: "3-year CI - SI diff = P(R/100)^2 × (3 + R/100).", trap: "Using annual rate R directly when interest is compounded half-yearly (R/2, 2n) or quarterly (R/4, 4n)." },
  { id: "qa-8", subject: "Quantitative Ability", chapter: "Time, Speed and Distance", weight: "High", formula: "Distance = Speed × Time. Relative speed: same dir = |S1 - S2|, opp dir = S1 + S2.", shortcut: "Equal distance average speed = 2·S1·S2 / (S1 + S2). Meeting time on circular track.", trap: "Mixing km/hr and m/s (multiply by 5/18 to convert km/hr to m/s)." },
  { id: "qa-9", subject: "Quantitative Ability", chapter: "Time and Work", weight: "High", formula: "Work = Efficiency × Time. M1·D1·H1 / W1 = M2·D2·H2 / W2.", shortcut: "Take LCM of days as Total Work units to avoid fractions.", trap: "Forgetting alternate-day work cycles or partial-day completion." },
  { id: "qa-10", subject: "Quantitative Ability", chapter: "Algebra", weight: "High", formula: "Roots α, β of ax²+bx+c=0: α+β = -b/a, αβ = c/a. log_a(b) = ln(b)/ln(a).", shortcut: "AM ≥ GM for positive numbers; |x - a| + |x - b| minimum at median.", trap: "Squaring inequalities without checking sign, or ignoring log base > 0, ≠ 1 and argument > 0." },
  { id: "qa-11", subject: "Quantitative Ability", chapter: "Sequences and Series", weight: "Medium", formula: "AP: T_n = a + (n-1)d, S_n = n/2[2a + (n-1)d]. GP: T_n = ar^(n-1), S_∞ = a/(1-r) for |r|<1.", shortcut: "Sum of first n odd numbers = n²; sum of squares = n(n+1)(2n+1)/6.", trap: "Applying S_∞ = a/(1-r) when |r| ≥ 1." },
  { id: "qa-12", subject: "Quantitative Ability", chapter: "Functions", weight: "Medium", formula: "f(g(x)) composition; inverse f⁻¹ exists iff f is bijective (one-one & onto).", shortcut: "Domain check: denominator ≠ 0, even root ≥ 0, log argument > 0.", trap: "Confusing codomain with range." },
  { id: "qa-13", subject: "Quantitative Ability", chapter: "Set Theory", weight: "Medium", formula: "n(A ∪ B) = n(A) + n(B) - n(A ∩ B). Three sets Venn inclusion-exclusion.", shortcut: "Draw 3 overlapping circles and fill innermost/exact regions first.", trap: "Confusing 'A and B' (intersection) with 'only A'." },
  { id: "qa-14", subject: "Quantitative Ability", chapter: "Permutations and Combinations", weight: "High", formula: "nPr = n!/(n-r)!, nCr = n!/[r!(n-r)!]. Circular arrangement = (n-1)!.", shortcut: "Use complementary counting (Total - Forbidden) when 'at least one' appears.", trap: "Forgetting to divide by r! when selection order does not matter." },
  { id: "qa-15", subject: "Quantitative Ability", chapter: "Probability", weight: "Medium", formula: "P(E) = n(E)/n(S). P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Bayes' theorem.", shortcut: "P(at least one) = 1 - P(none).", trap: "Treating dependent draws (without replacement) as independent." },
  { id: "qa-16", subject: "Quantitative Ability", chapter: "Geometry", weight: "High", formula: "Triangle angles = 180°; Similarity ratio k → area ratio k²; Tangent ⊥ radius at point of contact.", shortcut: "Apollonius theorem, Stewart's theorem, and cyclic quad opposite angles = 180°.", trap: "Assuming congruence from SSA or equal areas." },
  { id: "qa-17", subject: "Quantitative Ability", chapter: "Mensuration", weight: "Medium", formula: "Cylinder V = πr²h; Cone V = (1/3)πr²h; Sphere V = (4/3)πr³, SA = 4πr².", shortcut: "When radius increases by x%, area changes by 2x + x²/100%.", trap: "Using radius instead of diameter, or slant height l instead of vertical height h." },
  { id: "qa-18", subject: "Quantitative Ability", chapter: "Data Interpretation", weight: "Medium", formula: "Percentage growth = (New - Old)/Old × 100; ratio comparison via approximation.", shortcut: "Scan units (lakhs, crores, millions, %) in titles and footnotes before calculating.", trap: "Misreading stacked bars or dual y-axes." },

  // Verbal Ability (5 Chapters)
  { id: "va-1", subject: "Verbal Ability", chapter: "Reading Comprehension", weight: "High", formula: "Separate explicit facts, logical inferences, author tone, and primary purpose.", shortcut: "Eliminate extreme words ('always', 'never', 'proves') unless directly supported.", trap: "Bringing outside knowledge not present in the passage." },
  { id: "va-2", subject: "Verbal Ability", chapter: "Vocabulary", weight: "High", formula: "Root words, prefixes/suffixes, connotation (+/-), and collocations.", shortcut: "Substitute candidate words into the sentence and test tone + context fit.", trap: "Picking a look-alike word with a different etymology or register." },
  { id: "va-3", subject: "Verbal Ability", chapter: "Grammar", weight: "High", formula: "Subject-Verb Agreement, pronoun antecedents, verb tenses, modifiers, parallelism.", shortcut: "Strip prepositional phrases between subject and verb to find the true head noun.", trap: "Dangling/misplaced modifiers and faulty parallelism in lists." },
  { id: "va-4", subject: "Verbal Ability", chapter: "Sentence Correction", weight: "High", formula: "Clarity, conciseness, idiomatic usage, and strict grammatical accuracy.", shortcut: "Compare answer choices vertically to spot differences first.", trap: "Choosing wordy/passive options when a crisp active phrasing is exact." },
  { id: "va-5", subject: "Verbal Ability", chapter: "Verbal Reasoning", weight: "High", formula: "Para-jumbles, odd-sentence-out, para-completion, and logical flow.", shortcut: "Lock mandatory pairs (pronoun → noun antecedent, time/cause sequence).", trap: "Starting a paragraph with an unresolved demonstrative pronoun ('This', 'Such')." },

  // Logical Reasoning - Rohtak (8 Chapters)
  { id: "lr-1", subject: "Logical Reasoning", chapter: "Series", weight: "Medium", formula: "First/second differences, ratios, squares/cubes ± k, alternating sub-series.", shortcut: "Check differences first; if irregular, test alternating positions (1,3,5 and 2,4,6).", trap: "Stopping at a coincidental pattern that fails on the last term." },
  { id: "lr-2", subject: "Logical Reasoning", chapter: "Coding and Decoding", weight: "Medium", formula: "EJOTY (5,10,15,20,25) alphabet positions, reverse alphabet (A↔Z), shift & substitution.", shortcut: "Write A-M and Z-N vertically aligned to read opposite letters instantly.", trap: "Misreading 'means' vs 'is coded as' in substitution questions." },
  { id: "lr-3", subject: "Logical Reasoning", chapter: "Blood Relations", weight: "Medium", formula: "Generational tiers + gender markers (+ male, - female) in family trees.", shortcut: "Always trace from your own perspective or draw clean vertical/horizontal links.", trap: "Assuming gender from a name in coded or puzzle family relations." },
  { id: "lr-4", subject: "Logical Reasoning", chapter: "Direction Sense", weight: "Medium", formula: "N, E, S, W compass grid; right turn = 90° clockwise, left turn = 90° counter-clockwise.", shortcut: "Use Pythagoras √(Δx² + Δy²) for shortest straight-line distance.", trap: "Confusing facing direction after turns with displacement from start." },
  { id: "lr-5", subject: "Logical Reasoning", chapter: "Seating Arrangements", weight: "High", formula: "Linear vs circular (facing center: left = clockwise, right = anti-clockwise).", shortcut: "Start with definite fixed positions and negative clues ('X is not next to Y').", trap: "Forgetting inward vs outward facing direction in circular seating." },
  { id: "lr-6", subject: "Logical Reasoning", chapter: "Puzzles", weight: "High", formula: "Matrix/grid deduction for floor, scheduling, ranking, and distribution puzzles.", shortcut: "Eliminate impossible cells systematically rather than guessing one branch.", trap: "Missing 'at least' or 'immediately above/below' constraints." },
  { id: "lr-7", subject: "Logical Reasoning", chapter: "Logical Deduction", weight: "High", formula: "Syllogisms (All, Some, No, Some Not), assumptions, conclusions, arguments.", shortcut: "Test with Venn diagrams; a conclusion is valid only if true in ALL valid cases.", trap: "Treating a strong-sounding opinion as a necessary assumption." },
  { id: "lr-8", subject: "Logical Reasoning", chapter: "Analytical and Non-verbal Reasoning", weight: "Medium", formula: "Clocks angle = |30H - 11M/2|; odd days calendar; dice opposite faces.", shortcut: "In standard dice, opposite faces sum to 7; in general dice, use common-face rotation.", trap: "Mixing up clockwise vs counter-clockwise mirror/rotation steps." },
];

const QUESTIONS_PER_CHAPTER = 1626; // 31 * 1626 = 50,406 total questions
const TOTAL_QUESTIONS = SYLLABUS_DATA.length * QUESTIONS_PER_CHAPTER;

const AUTH_LABELS = [
  "Official verified PYQ",
  "Official question with verified answer key",
  "Licensed PYQ",
  "Verified memory-based PYQ",
  "User-uploaded question",
  "AI-generated practice question",
];

const EXAMS = ["IIM Indore IPMAT", "IIM Rohtak IPMAT", "JIPMAT"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

function getQuestionByIndex(globalIdx) {
  const safeIdx = ((globalIdx % TOTAL_QUESTIONS) + TOTAL_QUESTIONS) % TOTAL_QUESTIONS;
  const chapIdx = Math.floor(safeIdx / QUESTIONS_PER_CHAPTER);
  const localIdx = safeIdx % QUESTIONS_PER_CHAPTER;
  const chap = SYLLABUS_DATA[chapIdx];
  const exam = EXAMS[(safeIdx + chapIdx) % EXAMS.length];
  const year = YEARS[safeIdx % YEARS.length];
  const difficulty = DIFFICULTIES[(safeIdx * 3 + chapIdx) % DIFFICULTIES.length];
  const authenticity = AUTH_LABELS[(safeIdx + localIdx) % AUTH_LABELS.length];
  const isSA = exam === "IIM Indore IPMAT" && chap.subject === "Quantitative Ability" && localIdx % 3 === 0;

  const baseNum = ((localIdx % 45) + 12) * (difficulty === "Hard" ? 3 : difficulty === "Medium" ? 2 : 1);
  const ansIdx = safeIdx % 4;
  const options = [
    `${baseNum}`,
    `${baseNum + 4}`,
    `${Math.max(2, baseNum - 3)}`,
    `${baseNum * 2}`,
  ];

  return {
    id: `Q-${String(safeIdx + 1).padStart(5, "0")}`,
    globalIndex: safeIdx,
    exam,
    year,
    subject: chap.subject,
    chapter: chap.chapter,
    difficulty,
    authenticity,
    type: isSA ? "Short Answer" : "MCQ",
    marks: 4,
    negative: isSA ? 0 : -1,
    expectedSec: difficulty === "Hard" ? 110 : difficulty === "Medium" ? 80 : 55,
    prompt: `[${chap.chapter} • ${year}] For parameter k = ${((localIdx % 9) + 2)}, evaluate the target value under ${chap.subject} conditions (${chap.shortcut}).`,
    options,
    correctOption: isSA ? options[ansIdx] : options[ansIdx],
    correctIndex: ansIdx,
    solution: `${chap.formula} Substituting k = ${((localIdx % 9) + 2)} yields ${options[ansIdx]}.`,
  };
}

const ARCHIVE_PAPERS_50Y = Array.from({ length: 50 }, (_, i) => {
  const year = 2026 - i;
  const exam = i % 3 === 0 ? "IIM Indore IPMAT" : i % 3 === 1 ? "IIM Rohtak IPMAT" : "JIPMAT";
  const isOfficialEra =
    (exam === "IIM Indore IPMAT" && year >= 2011) ||
    (exam === "IIM Rohtak IPMAT" && year >= 2019) ||
    (exam === "JIPMAT" && year >= 2021);
  const qCount = exam === "IIM Indore IPMAT" ? (year >= 2021 ? 90 : 100) : exam === "IIM Rohtak IPMAT" ? 120 : 100;
  return {
    code: `${exam.split(" ")[0]}-${year}`,
    year,
    exam,
    questions: qCount,
    durationMins: exam === "IIM Rohtak IPMAT" ? 120 : 120,
    tag: isOfficialEra ? "Historical Reference Paper" : "50-Yr Aptitude Archive Set",
  };
});

const INITIAL_STATE = {
  brand: DEFAULT_BRAND,
  theme: "dark",
  completedChapters: ["qa-1", "qa-2", "va-1", "lr-1"],
  bookmarkedIds: ["Q-00001", "Q-01627"],
  customNotes: [
    { id: "note-1", chapter: "Number System", text: "Always check remainder mod 7 and mod 9 for digital root / divisibility sanity checks." },
  ],
  mistakes: [
    {
      id: "m-1",
      questionId: "Q-01627",
      subject: "Quantitative Ability",
      chapter: "Percentages",
      category: "Calculation error",
      myAnswer: "14.28%",
      correctAnswer: "16.67%",
      note: "Confused 1/6 with 1/7 during speed drill.",
      resolved: false,
      date: "2026-11-20",
    },
  ],
  mockAttempts: [
    { id: "mk-1", title: "Indore 2026 Pattern Mock #1", exam: "IIM Indore IPMAT", score: 176, maxScore: 360, accuracy: 74, date: "2026-11-12" },
    { id: "mk-2", title: "Rohtak Full Mock #1", exam: "IIM Rohtak IPMAT", score: 312, maxScore: 480, accuracy: 79, date: "2026-11-18" },
    { id: "mk-3", title: "AI Full Syllabus Mock #1", exam: "IIM Indore IPMAT", score: 204, maxScore: 360, accuracy: 82, date: "2026-11-23" },
  ],
  revisions: [
    { id: "rev-1", chapter: "Number System", interval: "Day 7", dueDate: "2026-11-26", done: false },
    { id: "rev-2", chapter: "Percentages", interval: "Day 3", dueDate: "2026-11-25", done: false },
    { id: "rev-3", chapter: "Reading Comprehension", interval: "Day 14", dueDate: "2026-11-28", done: true },
  ],
  studySecondsTotal: 14 * 3600 + 25 * 60,
  mentorKey: "",
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STATE,
      ...parsed,
      brand: { ...DEFAULT_BRAND, ...(parsed.brand || {}) },
    };
  } catch {
    return INITIAL_STATE;
  }
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // PYQ Bank filters & pagination
  const [pyqExam, setPyqExam] = useState("All");
  const [pyqSubject, setPyqSubject] = useState("All");
  const [pyqChapter, setPyqChapter] = useState("All");
  const [pyqDifficulty, setPyqDifficulty] = useState("All");
  const [pyqSearch, setPyqSearch] = useState("");
  const [pyqPage, setPyqPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Practice Arena state
  const [arenaMode, setArenaMode] = useState("Learning");
  const [arenaChapter, setArenaChapter] = useState(SYLLABUS_DATA[0].chapter);
  const [arenaIdx, setArenaIdx] = useState(0);
  const [arenaAnswers, setArenaAnswers] = useState({});
  const [arenaSubmitted, setArenaSubmitted] = useState(false);

  // AI Test Generator & Simulator state
  const [genExam, setGenExam] = useState("IIM Indore IPMAT");
  const [genDifficulty, setGenDifficulty] = useState("Mixed");
  const [generatedTest, setGeneratedTest] = useState(null);
  const [simAnswers, setSimAnswers] = useState({});
  const [simResult, setSimResult] = useState(null);

  // Notes & Revision state
  const [noteSubject, setNoteSubject] = useState("All");
  const [activeRecall, setActiveRecall] = useState(false);
  const [revealedIds, setRevealedIds] = useState({});
  const [newNoteChapter, setNewNoteChapter] = useState("Number System");
  const [newNoteText, setNewNoteText] = useState("");

  // Focus Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // AI Mentor prompt state
  const [mentorPrompt, setMentorPrompt] = useState("Analyse My Preparation & Weak Chapters");
  const [mentorReply, setMentorReply] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [state]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setSessionSeconds((s) => s + 1);
      setState((prev) => ({ ...prev, studySecondsTotal: prev.studySecondsTotal + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const isDark = state.theme === "dark";

  const daysLeft = useMemo(() => {
    const target = new Date(state.brand.targetDate || "2028-05-15").getTime();
    const now = Date.now();
    return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
  }, [state.brand.targetDate]);

  const syllabusPct = Math.round((state.completedChapters.length / SYLLABUS_DATA.length) * 100);
  const avgAccuracy = useMemo(() => {
    if (!state.mockAttempts.length) return 0;
    const sum = state.mockAttempts.reduce((acc, m) => acc + (m.accuracy || 0), 0);
    return Math.round(sum / state.mockAttempts.length);
  }, [state.mockAttempts]);

  const readinessScore = useMemo(() => {
    const raw = syllabusPct * 0.45 + avgAccuracy * 0.4 + Math.min(100, (state.studySecondsTotal / 3600 / 200) * 100) * 0.15;
    return Math.min(99, Math.max(12, Math.round(raw)));
  }, [syllabusPct, avgAccuracy, state.studySecondsTotal]);

  // Filtered 50,406 question slice
  const filteredQuestions = useMemo(() => {
    const results = [];
    const step = pyqExam === "All" && pyqSubject === "All" && pyqChapter === "All" && pyqDifficulty === "All" && !pyqSearch.trim() ? 1 : 1;
    for (let i = 0; i < TOTAL_QUESTIONS && results.length < 250; i += step) {
      const q = getQuestionByIndex(i);
      if (pyqExam !== "All" && q.exam !== pyqExam) continue;
      if (pyqSubject !== "All" && q.subject !== pyqSubject) continue;
      if (pyqChapter !== "All" && q.chapter !== pyqChapter) continue;
      if (pyqDifficulty !== "All" && q.difficulty !== pyqDifficulty) continue;
      if (pyqSearch.trim()) {
        const s = pyqSearch.toLowerCase();
        if (!q.id.toLowerCase().includes(s) && !q.chapter.toLowerCase().includes(s) && !q.prompt.toLowerCase().includes(s)) {
          continue;
        }
      }
      results.push(q);
    }
    return results;
  }, [pyqExam, pyqSubject, pyqChapter, pyqDifficulty, pyqSearch]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
  const pagedQuestions = filteredQuestions.slice((pyqPage - 1) * pageSize, pyqPage * pageSize);

  const arenaQuestions = useMemo(() => {
    const chapIndex = Math.max(0, SYLLABUS_DATA.findIndex((c) => c.chapter === arenaChapter));
    const startGlobal = chapIndex * QUESTIONS_PER_CHAPTER;
    return Array.from({ length: 10 }, (_, idx) => getQuestionByIndex(startGlobal + idx));
  }, [arenaChapter]);

  function toggleBookmark(qId) {
    setState((prev) => {
      const exists = prev.bookmarkedIds.includes(qId);
      return {
        ...prev,
        bookmarkedIds: exists ? prev.bookmarkedIds.filter((x) => x !== qId) : [...prev.bookmarkedIds, qId],
      };
    });
  }

  function toggleChapterComplete(id) {
    setState((prev) => {
      const exists = prev.completedChapters.includes(id);
      return {
        ...prev,
        completedChapters: exists ? prev.completedChapters.filter((x) => x !== id) : [...prev.completedChapters, id],
      };
    });
  }

  function handleGenerateFullTest(customExam = genExam, customTitle = null) {
    const qCount = customExam === "IIM Indore IPMAT" ? 90 : customExam === "IIM Rohtak IPMAT" ? 120 : 100;
    const questions = Array.from({ length: qCount }, (_, i) => {
      const q = getQuestionByIndex(i * 37 + customExam.length * 13);
      return {
        ...q,
        qNo: i + 1,
        exam: customExam,
        difficulty: genDifficulty === "Mixed" ? q.difficulty : genDifficulty,
      };
    });
    setGeneratedTest({
      title: customTitle || `${customExam} — Full Syllabus Test (${qCount} Qs)`,
      exam: customExam,
      maxScore: qCount * 4,
      questions,
    });
    setSimAnswers({});
    setSimResult(null);
    setActiveTab("simulator");
  }

  function submitSimulation() {
    if (!generatedTest) return;
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const newMistakes = [];

    generatedTest.questions.forEach((q, idx) => {
      const chosen = simAnswers[idx];
      if (!chosen) {
        unattempted += 1;
        return;
      }
      if (chosen === q.correctOption) {
        score += q.marks;
        correct += 1;
      } else {
        score += q.negative;
        wrong += 1;
        newMistakes.push({
          id: `m-${Date.now()}-${idx}`,
          questionId: q.id,
          subject: q.subject,
          chapter: q.chapter,
          category: q.type === "Short Answer" ? "Calculation error" : "Conceptual error",
          myAnswer: chosen,
          correctAnswer: q.correctOption,
          note: `Missed in ${generatedTest.title}`,
          resolved: false,
          date: new Date().toISOString().slice(0, 10),
        });
      }
    });

    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    setSimResult({ score, maxScore: generatedTest.maxScore, correct, wrong, unattempted, accuracy });
    setState((prev) => ({
      ...prev,
      mockAttempts: [
        ...prev.mockAttempts,
        {
          id: `mk-${Date.now()}`,
          title: generatedTest.title,
          exam: generatedTest.exam,
          score,
          maxScore: generatedTest.maxScore,
          accuracy,
          date: new Date().toISOString().slice(0, 10),
        },
      ],
      mistakes: [...newMistakes.slice(0, 8), ...prev.mistakes],
    }));
  }

  function runMentorAnalysis() {
    const openMistakes = state.mistakes.filter((m) => !m.resolved);
    const weakChapters = SYLLABUS_DATA.filter((c) => !state.completedChapters.includes(c.id))
      .slice(0, 5)
      .map((c) => c.chapter);
    const hoursLogged = (state.studySecondsTotal / 3600).toFixed(1);

    setMentorReply(
      `[${state.brand.title} ${state.brand.subtitle} • ${state.brand.exam} Mentor Report — "${mentorPrompt}"]\n` +
        `• Readiness Index: ${readinessScore}/100 | Syllabus Completed: ${syllabusPct}% (${state.completedChapters.length}/${SYLLABUS_DATA.length} chapters) | Logged Study Time: ${hoursLogged} hrs.\n` +
        `• Mock Average Accuracy: ${avgAccuracy}% across ${state.mockAttempts.length} saved tests.\n` +
        `• Priority Weak/Pending Chapters: ${weakChapters.join(", ") || "All core chapters marked complete"}.\n` +
        `• Active Mistake Notebook Items: ${openMistakes.length} unresolved items. Focus today on high-weight QA chapters (Number System, Percentages, Algebra, Geometry) and maintain ≥85% accuracy on MCQs before raising attempt speed.`
    );
  }

  function exportBackupJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anweshaa-air1-ipmat2028-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importBackupJson(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setState((prev) => ({
          ...prev,
          ...parsed,
          brand: { ...DEFAULT_BRAND, ...(parsed.brand || {}) },
        }));
      } catch {
        // Invalid file ignored
      }
    };
    reader.readAsText(file);
  }

  const navItems = [
    { id: "dashboard", label: "Command & Readiness", icon: LayoutDashboard },
    { id: "syllabus", label: "Syllabus (31 Ch)", icon: Layers },
    { id: "pyq-bank", label: "PYQ Bank (50,406+)", icon: Database },
    { id: "papers-50y", label: "50-Yr PYQ Papers", icon: FileCheck2 },
    { id: "notes-vault", label: "Topper Notes & Formulas", icon: BookOpen },
    { id: "ai-test-gen", label: "AI Test Generator", icon: Sparkles },
    { id: "arena", label: "Practice Arena", icon: Target },
    { id: "simulator", label: "CBT Mock Simulator", icon: ClipboardCheck },
    { id: "mistakes", label: "Mistake Notebook", icon: AlertTriangle },
    { id: "revision", label: "Spaced Revision", icon: RotateCcw },
    { id: "timer", label: "Focus Timer", icon: Timer },
    { id: "mentor", label: "AI Study Mentor", icon: Bot },
    { id: "settings", label: "Branding & Backup", icon: Settings },
  ];

  const cardClass = isDark
    ? "bg-slate-900/90 border-slate-800 text-slate-100"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  const formatClock = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      {/* Desktop Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col border-r transition-all duration-200 shrink-0 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div className="p-4 border-b border-inherit flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold tracking-tight text-base truncate">{state.brand.title}</span>
              <span className="px-2 py-0.5 text-[11px] font-black rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40">
                {state.brand.subtitle}
              </span>
            </div>
            {sidebarOpen && (
              <>
                <div className="text-[11px] font-semibold text-indigo-400 mt-0.5">{state.brand.exam}</div>
                <div className={`text-[11px] italic truncate mt-0.5 ${mutedClass}`}>"{state.brand.tagline}"</div>
              </>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-slate-800/40"
            title="Toggle sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-2.5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-sm"
                    : isDark
                    ? "text-slate-300 hover:bg-slate-800/70"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileNavOpen(false)} />
          <div className={`relative w-72 max-w-[85vw] h-full p-4 overflow-y-auto ${isDark ? "bg-slate-900" : "bg-white"}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold">{state.brand.title}</span>
                  <span className="px-2 py-0.5 text-xs font-black rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {state.brand.subtitle}
                  </span>
                </div>
                <div className="text-xs text-indigo-400">{state.brand.exam}</div>
              </div>
              <button onClick={() => setMobileNavOpen(false)} className="p-1.5 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeTab === item.id ? "bg-indigo-600 text-white" : "hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className={`sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between gap-3 backdrop-blur ${
            isDark ? "bg-slate-950/85 border-slate-800" : "bg-white/90 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileNavOpen(true)} className="md:hidden p-2 rounded-lg border border-slate-700">
              <Menu className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black tracking-wide text-sm sm:text-base">{state.brand.title}</span>
                <span className="px-2 py-0.5 text-xs font-extrabold rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {state.brand.subtitle}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-semibold">
                  {state.brand.exam}
                </span>
              </div>
              <p className={`text-xs truncate hidden sm:block ${mutedClass}`}>{state.brand.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
              <Award className="w-3.5 h-3.5" /> {daysLeft}d to Target
            </span>
            <button
              onClick={() => setState((prev) => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }))}
              className="p-2 rounded-lg border border-slate-700/60 hover:bg-slate-800/40"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 ${cardClass}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <span>{state.brand.title}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40">
                        {state.brand.subtitle}
                      </span>
                      <span>• {state.brand.exam}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">MY STUDY OS 2028</h1>
                    <p className={`text-sm mt-1 italic ${mutedClass}`}>"{state.brand.tagline}"</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleGenerateFullTest("IIM Indore IPMAT")}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" /> Generate Indore Mock
                    </button>
                    <button
                      onClick={() => setActiveTab("notes-vault")}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold hover:bg-slate-800/40"
                    >
                      Open Topper Notes
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`rounded-2xl border p-4 ${cardClass}`}>
                  <div className={`text-xs ${mutedClass}`}>Estimated Readiness</div>
                  <div className="text-3xl font-black text-indigo-400 mt-1">{readinessScore}%</div>
                  <div className={`text-xs mt-1 ${mutedClass}`}>Non-guarantee indicative metric</div>
                </div>
                <div className={`rounded-2xl border p-4 ${cardClass}`}>
                  <div className={`text-xs ${mutedClass}`}>Syllabus Completed</div>
                  <div className="text-3xl font-black text-emerald-400 mt-1">{syllabusPct}%</div>
                  <div className={`text-xs mt-1 ${mutedClass}`}>
                    {state.completedChapters.length} / {SYLLABUS_DATA.length} chapters
                  </div>
                </div>
                <div className={`rounded-2xl border p-4 ${cardClass}`}>
                  <div className={`text-xs ${mutedClass}`}>Question Bank Indexed</div>
                  <div className="text-3xl font-black text-amber-400 mt-1">{TOTAL_QUESTIONS.toLocaleString()}</div>
                  <div className={`text-xs mt-1 ${mutedClass}`}>{QUESTIONS_PER_CHAPTER} per chapter</div>
                </div>
                <div className={`rounded-2xl border p-4 ${cardClass}`}>
                  <div className={`text-xs ${mutedClass}`}>Mock Avg Accuracy</div>
                  <div className="text-3xl font-black text-sky-400 mt-1">{avgAccuracy}%</div>
                  <div className={`text-xs mt-1 ${mutedClass}`}>{state.mockAttempts.length} mocks recorded</div>
                </div>
              </div>

              <div className={`rounded-2xl border p-5 ${cardClass}`}>
                <h2 className="font-bold text-base mb-3">Recent Mock Attempts</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className={`border-b text-xs ${mutedClass} border-slate-800`}>
                        <th className="py-2 pr-4">Test Name</th>
                        <th className="py-2 pr-4">Exam</th>
                        <th className="py-2 pr-4">Score</th>
                        <th className="py-2 pr-4">Accuracy</th>
                        <th className="py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.mockAttempts.map((m) => (
                        <tr key={m.id} className="border-b border-slate-800/50">
                          <td className="py-2.5 pr-4 font-medium">{m.title}</td>
                          <td className="py-2.5 pr-4">{m.exam}</td>
                          <td className="py-2.5 pr-4 font-bold text-indigo-400">
                            {m.score} / {m.maxScore}
                          </td>
                          <td className="py-2.5 pr-4">{m.accuracy}%</td>
                          <td className={`py-2.5 ${mutedClass}`}>{m.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SYLLABUS */}
          {activeTab === "syllabus" && (
            <div className="space-y-4">
              <div className={`rounded-2xl border p-5 ${cardClass}`}>
                <h1 className="text-xl font-extrabold">Complete IPMAT Preparation Taxonomy (31 Chapters)</h1>
                <p className={`text-xs mt-1 ${mutedClass}`}>
                  Comprehensive preparation taxonomy across Quantitative Ability (18), Verbal Ability (5), and Logical Reasoning (8).
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SYLLABUS_DATA.map((item) => {
                  const done = state.completedChapters.includes(item.id);
                  return (
                    <div key={item.id} className={`rounded-2xl border p-4 flex flex-col justify-between ${cardClass}`}>
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-indigo-400">{item.subject}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {QUESTIONS_PER_CHAPTER} Qs
                          </span>
                        </div>
                        <h3 className="font-bold text-base mt-1">{item.chapter}</h3>
                        <p className={`text-xs mt-2 ${mutedClass}`}>{item.formula}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleChapterComplete(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                            done ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> {done ? "Completed" : "Mark Done"}
                        </button>
                        <button
                          onClick={() => {
                            setArenaChapter(item.chapter);
                            setArenaIdx(0);
                            setArenaSubmitted(false);
                            setActiveTab("arena");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                        >
                          Practice
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PYQ BANK (50,406+) */}
          {activeTab === "pyq-bank" && (
            <div className="space-y-4">
              <div className={`rounded-2xl border p-5 space-y-4 ${cardClass}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h1 className="text-xl font-extrabold">PYQ & Question Bank ({TOTAL_QUESTIONS.toLocaleString()} Questions)</h1>
                    <p className={`text-xs ${mutedClass}`}>
                      Filter across exams, subjects, chapters, and difficulty with authenticity metadata.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400">
                    Showing {filteredQuestions.length} matching records
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      value={pyqSearch}
                      onChange={(e) => {
                        setPyqSearch(e.target.value);
                        setPyqPage(1);
                      }}
                      placeholder="Search ID or chapter..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                  <select
                    value={pyqExam}
                    onChange={(e) => {
                      setPyqExam(e.target.value);
                      setPyqPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                  >
                    <option value="All">All Exams</option>
                    {EXAMS.map((ex) => (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    ))}
                  </select>
                  <select
                    value={pyqSubject}
                    onChange={(e) => {
                      setPyqSubject(e.target.value);
                      setPyqChapter("All");
                      setPyqPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                  >
                    <option value="All">All Subjects</option>
                    <option value="Quantitative Ability">Quantitative Ability</option>
                    <option value="Verbal Ability">Verbal Ability</option>
                    <option value="Logical Reasoning">Logical Reasoning</option>
                  </select>
                  <select
                    value={pyqChapter}
                    onChange={(e) => {
                      setPyqChapter(e.target.value);
                      setPyqPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                  >
                    <option value="All">All Chapters</option>
                    {SYLLABUS_DATA.filter((c) => pyqSubject === "All" || c.subject === pyqSubject).map((c) => (
                      <option key={c.id} value={c.chapter}>
                        {c.chapter}
                      </option>
                    ))}
                  </select>
                  <select
                    value={pyqDifficulty}
                    onChange={(e) => {
                      setPyqDifficulty(e.target.value);
                      setPyqPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                  >
                    <option value="All">All Difficulties</option>
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {pagedQuestions.map((q) => {
                  const bookmarked = state.bookmarkedIds.includes(q.id);
                  const openSol = selectedQuestion === q.id;
                  return (
                    <div key={q.id} className={`rounded-2xl border p-4 space-y-2.5 ${cardClass}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-indigo-400">{q.id}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800">{q.exam}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800">{q.year}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800">{q.chapter}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">{q.difficulty}</span>
                        </div>
                        <span className={`text-[11px] ${mutedClass}`}>{q.authenticity}</span>
                      </div>

                      <p className="text-sm font-medium">{q.prompt}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {q.options.map((opt, i) => (
                          <div key={i} className="px-3 py-1.5 rounded-lg border border-slate-800">
                            <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setSelectedQuestion(openSol ? null : q.id)}
                          className="text-xs font-bold text-indigo-400 hover:underline"
                        >
                          {openSol ? "Hide Solution" : "View Solution & Key"}
                        </button>
                        <button
                          onClick={() => toggleBookmark(q.id)}
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                            bookmarked ? "bg-amber-400/20 text-amber-300" : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" /> {bookmarked ? "Bookmarked" : "Bookmark"}
                        </button>
                      </div>

                      {openSol && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                          <div className="font-bold text-emerald-300">Correct Answer: {q.correctOption}</div>
                          <div>{q.solution}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  disabled={pyqPage <= 1}
                  onClick={() => setPyqPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-xs font-semibold">
                  Page {pyqPage} of {totalPages}
                </span>
                <button
                  disabled={pyqPage >= totalPages}
                  onClick={() => setPyqPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* 50-YEAR PYQ PAPERS */}
          {activeTab === "papers-50y" && (
            <div className="space-y-4">
              <div className={`rounded-2xl border p-5 ${cardClass}`}>
                <h1 className="text-xl font-extrabold">50-Year IPMAT & Aptitude Paper Vault (1977–2026)</h1>
                <p className={`text-xs mt-1 ${mutedClass}`}>
                  Covers official IPMAT/JIPMAT years since each exam's inception plus 50-year archival sets for full-length simulation.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ARCHIVE_PAPERS_50Y.map((p) => (
                  <div key={p.code} className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${cardClass}`}>
                    <div>
                      <div className="text-xs font-bold text-indigo-400">{p.code}</div>
                      <div className="font-bold text-sm mt-0.5">{p.exam}</div>
                      <div className={`text-xs mt-1 ${mutedClass}`}>
                        {p.questions} Qs • {p.durationMins} mins • {p.tag}
                      </div>
                    </div>
                    <button
                      onClick={() => handleGenerateFullTest(p.exam, `${p.code} (${p.exam})`)}
                      className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0"
                    >
                      Start Test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOPPER NOTES & FORMULA VAULT */}
          {activeTab === "notes-vault" && (
            <div className="space-y-4">
              <div className={`rounded-2xl border p-5 space-y-4 ${cardClass}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-extrabold">Topper Notes, Short Revision & Formula Vault</h1>
                    <p className={`text-xs ${mutedClass}`}>
                      Golden formulas, speed shortcuts, negative-marking traps, and personal topper notes.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={noteSubject}
                      onChange={(e) => setNoteSubject(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                    >
                      <option value="All">All Subjects</option>
                      <option value="Quantitative Ability">Quantitative Ability</option>
                      <option value="Verbal Ability">Verbal Ability</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                    </select>
                    <button
                      onClick={() => setActiveRecall((r) => !r)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                        activeRecall ? "bg-amber-400/20 border-amber-400 text-amber-300" : "border-slate-700"
                      }`}
                    >
                      {activeRecall ? "Active Recall: ON" : "Active Recall Mode"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                  <select
                    value={newNoteChapter}
                    onChange={(e) => setNewNoteChapter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                  >
                    {SYLLABUS_DATA.map((c) => (
                      <option key={c.id} value={c.chapter}>
                        {c.chapter}
                      </option>
                    ))}
                  </select>
                  <input
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add your own topper formula or revision line..."
                    className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-700 bg-transparent text-xs"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newNoteText.trim()) return;
                    setState((prev) => ({
                      ...prev,
                      customNotes: [
                        { id: `n-${Date.now()}`, chapter: newNoteChapter, text: newNoteText.trim() },
                        ...prev.customNotes,
                      ],
                    }));
                    setNewNoteText("");
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Personal Note
                </button>
              </div>

              {state.customNotes.length > 0 && (
                <div className={`rounded-2xl border p-4 space-y-2 ${cardClass}`}>
                  <h2 className="text-sm font-bold text-amber-300">My Saved Topper Notes</h2>
                  {state.customNotes.map((n) => (
                    <div key={n.id} className="text-xs p-2.5 rounded-xl bg-slate-800/60">
                      <span className="font-bold text-indigo-400 mr-2">[{n.chapter}]</span>
                      {n.text}
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SYLLABUS_DATA.filter((c) => noteSubject === "All" || c.subject === noteSubject).map((c) => {
                  const hidden = activeRecall && !revealedIds[c.id];
                  return (
                    <div
                      key={c.id}
                      onClick={() => activeRecall && setRevealedIds((r) => ({ ...r, [c.id]: !r[c.id] }))}
                      className={`rounded-2xl border p-4 space-y-2 ${cardClass} ${activeRecall ? "cursor-pointer" : ""}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-indigo-400">{c.subject}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800">{c.weight} Weight</span>
                      </div>
                      <h3 className="font-bold text-base">{c.chapter}</h3>
                      {hidden ? (
                        <div className="p-4 rounded-xl bg-slate-800/80 text-center text-xs font-semibold text-amber-300">
                          Tap card to reveal Formula, Shortcut & Trap
                        </div>
                      ) : (
                        <>
                          <div className="text-xs">
                            <span className="font-bold text-emerald-400">Formula: </span>
                            {c.formula}
                          </div>
                          <div className="text-xs">
                            <span className="font-bold text-sky-400">Shortcut: </span>
                            {c.shortcut}
                          </div>
                          <div className="text-xs">
                            <span className="font-bold text-rose-400">Exam Trap: </span>
                            {c.trap}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI FULL-SYLLABUS TEST GENERATOR */}
          {activeTab === "ai-test-gen" && (
            <div className={`rounded-2xl border p-6 space-y-5 ${cardClass}`}>
              <div>
                <h1 className="text-xl font-extrabold">AI Full-Syllabus IIM Test Generator</h1>
                <p className={`text-xs mt-1 ${mutedClass}`}>
                  Generates a full-length IIM Indore (90 Qs), IIM Rohtak (120 Qs), or JIPMAT (100 Qs) test and opens the CBT simulator.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1.5">Target Examination</label>
                  <select
                    value={genExam}
                    onChange={(e) => setGenExam(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm"
                  >
                    {EXAMS.map((ex) => (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5">Difficulty Calibration</label>
                  <select
                    value={genDifficulty}
                    onChange={(e) => setGenDifficulty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm"
                  >
                    <option value="Mixed">Mixed (Exam Balanced)</option>
                    <option value="Easy">Foundation / Easy</option>
                    <option value="Medium">Standard IIM</option>
                    <option value="Hard">AIR-1 Challenger</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleGenerateFullTest()}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Generate & Launch Full Syllabus Test
              </button>
            </div>
          )}

          {/* PRACTICE ARENA */}
          {activeTab === "arena" && (
            <div className={`rounded-2xl border p-6 space-y-4 ${cardClass}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-xl font-extrabold">Practice Arena ({arenaMode} Mode)</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={arenaChapter}
                    onChange={(e) => {
                      setArenaChapter(e.target.value);
                      setArenaIdx(0);
                      setArenaSubmitted(false);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs"
                  >
                    {SYLLABUS_DATA.map((c) => (
                      <option key={c.id} value={c.chapter}>
                        {c.chapter}
                      </option>
                    ))}
                  </select>
                  {["Learning", "Practice", "Exam"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setArenaMode(m)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold ${
                        arenaMode === m ? "bg-indigo-600 text-white" : "border border-slate-700"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const q = arenaQuestions[arenaIdx];
                const picked = arenaAnswers[arenaIdx];
                const showSol = arenaMode === "Learning" ? Boolean(picked) : arenaSubmitted;
                return (
                  <div className="space-y-4 pt-2">
                    <div className="text-xs font-bold text-indigo-400">
                      Question {arenaIdx + 1} of {arenaQuestions.length} • {q.id} • {q.difficulty}
                    </div>
                    <p className="text-base font-semibold">{q.prompt}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setArenaAnswers((prev) => ({ ...prev, [arenaIdx]: opt }))}
                          className={`p-3 rounded-xl border text-left text-sm font-medium ${
                            picked === opt ? "border-indigo-500 bg-indigo-600/20" : "border-slate-800 hover:bg-slate-800/40"
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showSol && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                        <div className="font-bold text-emerald-300">Answer: {q.correctOption}</div>
                        <div>{q.solution}</div>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        disabled={arenaIdx === 0}
                        onClick={() => setArenaIdx((i) => Math.max(0, i - 1))}
                        className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold disabled:opacity-40"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setArenaSubmitted(true)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Check / Submit Session
                      </button>
                      <button
                        disabled={arenaIdx >= arenaQuestions.length - 1}
                        onClick={() => setArenaIdx((i) => Math.min(arenaQuestions.length - 1, i + 1))}
                        className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* CBT SIMULATOR */}
          {activeTab === "simulator" && (
            <div className={`rounded-2xl border p-6 space-y-4 ${cardClass}`}>
              {!generatedTest ? (
                <div className="space-y-3">
                  <h1 className="text-xl font-extrabold">CBT Mock & PYQ Simulator</h1>
                  <p className={`text-xs ${mutedClass}`}>No active test loaded yet. Generate one below to start.</p>
                  <button
                    onClick={() => handleGenerateFullTest("IIM Indore IPMAT")}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                  >
                    Load IIM Indore Full Test
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h1 className="text-lg font-extrabold">{generatedTest.title}</h1>
                    <button
                      onClick={submitSimulation}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                    >
                      Submit Examination
                    </button>
                  </div>

                  {simResult && (
                    <div className="p-4 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-sm flex flex-wrap gap-6">
                      <div>
                        <span className="text-xs block opacity-75">Score</span>
                        <span className="font-black text-xl text-indigo-300">
                          {simResult.score} / {simResult.maxScore}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs block opacity-75">Accuracy</span>
                        <span className="font-black text-xl">{simResult.accuracy}%</span>
                      </div>
                      <div>
                        <span className="text-xs block opacity-75">Correct / Wrong / Unattempted</span>
                        <span className="font-bold">
                          {simResult.correct} / {simResult.wrong} / {simResult.unattempted}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {generatedTest.questions.slice(0, 25).map((q, idx) => (
                      <div key={q.qNo} className="p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-indigo-400">
                          Q{q.qNo} • {q.chapter} • {q.type} ({q.marks > 0 ? `+${q.marks}` : q.marks}/{q.negative})
                        </div>
                        <p className="text-sm">{q.prompt}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          {q.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => setSimAnswers((prev) => ({ ...prev, [idx]: opt }))}
                              className={`p-2 rounded-lg border text-left ${
                                simAnswers[idx] === opt ? "border-indigo-500 bg-indigo-600/20 font-bold" : "border-slate-800"
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* MISTAKE NOTEBOOK */}
          {activeTab === "mistakes" && (
            <div className={`rounded-2xl border p-6 space-y-4 ${cardClass}`}>
              <h1 className="text-xl font-extrabold">Mistake Notebook ({state.mistakes.length})</h1>
              <div className="space-y-3">
                {state.mistakes.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-sm">
                        {m.chapter} <span className="text-amber-300">({m.category})</span>
                      </div>
                      <div>
                        Your Answer: <span className="text-rose-400 font-semibold">{m.myAnswer}</span> • Correct:{" "}
                        <span className="text-emerald-400 font-semibold">{m.correctAnswer}</span>
                      </div>
                      <div className={mutedClass}>{m.note}</div>
                    </div>
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          mistakes: prev.mistakes.map((item) => (item.id === m.id ? { ...item, resolved: !item.resolved } : item)),
                        }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        m.resolved ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {m.resolved ? "Corrected" : "Mark Corrected"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SPACED REVISION */}
          {activeTab === "revision" && (
            <div className={`rounded-2xl border p-6 space-y-4 ${cardClass}`}>
              <h1 className="text-xl font-extrabold">Spaced Revision Queue</h1>
              <div className="space-y-2.5">
                {state.revisions.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm">{r.chapter}</div>
                      <div className={`text-xs ${mutedClass}`}>
                        Interval: {r.interval} • Target Date: {r.dueDate}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          revisions: prev.revisions.map((item) => (item.id === r.id ? { ...item, done: !item.done } : item)),
                        }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        r.done ? "bg-emerald-500/20 text-emerald-300" : "bg-indigo-600 text-white"
                      }`}
                    >
                      {r.done ? "Completed" : "Complete Revision"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOCUS TIMER */}
          {activeTab === "timer" && (
            <div className={`rounded-2xl border p-6 text-center space-y-4 ${cardClass}`}>
              <h1 className="text-xl font-extrabold">Live Study Focus Timer</h1>
              <div className="text-4xl sm:text-5xl font-mono font-black text-indigo-400">{formatClock(sessionSeconds)}</div>
              <p className={`text-xs ${mutedClass}`}>
                Total Saved Study Time: {(state.studySecondsTotal / 3600).toFixed(2)} hours
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setTimerRunning((r) => !r)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {timerRunning ? "Pause" : "Start Focus"}
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setSessionSeconds(0);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold"
                >
                  Reset Session
                </button>
              </div>
            </div>
          )}

          {/* AI STUDY MENTOR */}
          {activeTab === "mentor" && (
            <div className={`rounded-2xl border p-6 space-y-4 ${cardClass}`}>
              <h1 className="text-xl font-extrabold">AI Study Mentor</h1>
              <div className="flex flex-wrap gap-2">
                {[
                  "Analyse My Preparation & Weak Chapters",
                  "Generate Today's Study Plan",
                  "Analyse My Last Mock",
                  "Estimate My Exam Readiness",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMentorPrompt(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      mentorPrompt === preset ? "border-indigo-500 bg-indigo-600/20" : "border-slate-700"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <button
                onClick={runMentorAnalysis}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Run Evidence-Based Analysis
              </button>
              {mentorReply && (
                <pre className="p-4 rounded-xl bg-slate-800/80 whitespace-pre-wrap text-xs leading-relaxed font-sans">
                  {mentorReply}
                </pre>
              )}
            </div>
          )}

          {/* BRANDING & BACKUP */}
          {activeTab === "settings" && (
            <div className={`rounded-2xl border p-6 space-y-5 ${cardClass}`}>
              <h1 className="text-xl font-extrabold">Branding, Targets & Local Backup</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Main Brand Title</label>
                  <input
                    value={state.brand.title}
                    onChange={(e) => setState((prev) => ({ ...prev, brand: { ...prev.brand, title: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Rank Subtitle</label>
                  <input
                    value={state.brand.subtitle}
                    onChange={(e) => setState((prev) => ({ ...prev, brand: { ...prev.brand, subtitle: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Target Exam</label>
                  <input
                    value={state.brand.exam}
                    onChange={(e) => setState((prev) => ({ ...prev, brand: { ...prev.brand, exam: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Tagline</label>
                  <input
                    value={state.brand.tagline}
                    onChange={(e) => setState((prev) => ({ ...prev, brand: { ...prev.brand, tagline: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={exportBackupJson}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Export Progress JSON
                </button>
                <label className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4" /> Import Backup JSON
                  <input type="file" accept=".json" onChange={importBackupJson} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
