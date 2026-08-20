// DEMO DATA ONLY — static placeholders for the ASTRA frontend prototype.
// No backend, no API, no persistence.

export type MemoryCategory =
  | "Mathematics"
  | "Physics"
  | "Astronomy"
  | "Space"
  | "Scientific Methods"
  | "Hypotheses";

export const memoryCategories: MemoryCategory[] = [
  "Mathematics",
  "Physics",
  "Astronomy",
  "Space",
  "Scientific Methods",
  "Hypotheses",
];

export interface ScientificMemory {
  id: string;
  title: string;
  category: MemoryCategory;
  description: string;
  source: string;
  confidence: number;
  learnedAt: string;
}

export const demoMemories: ScientificMemory[] = [
  {
    id: "mem-001",
    title: "Euler's identity links five fundamental constants",
    category: "Mathematics",
    description:
      "e^(iπ) + 1 = 0 connects e, i, π, 1 and 0 through the complex exponential map on the unit circle.",
    source: "Open textbook — Complex Analysis I",
    confidence: 0.99,
    learnedAt: "2026-02-11",
  },
  {
    id: "mem-002",
    title: "Noether's theorem: symmetry implies conservation",
    category: "Physics",
    description:
      "Every differentiable symmetry of the action of a physical system corresponds to a conservation law.",
    source: "Lecture notes — Classical Field Theory",
    confidence: 0.96,
    learnedAt: "2026-02-14",
  },
  {
    id: "mem-003",
    title: "Cepheid variables as standard candles",
    category: "Astronomy",
    description:
      "The period–luminosity relation allows distance estimation to nearby galaxies within ~10% error.",
    source: "Public survey documentation",
    confidence: 0.91,
    learnedAt: "2026-02-19",
  },
  {
    id: "mem-004",
    title: "Hohmann transfer is fuel-minimal between coplanar circular orbits",
    category: "Space",
    description:
      "Two impulsive burns along an ellipse tangent to both orbits minimise Δv for large radius ratios below 11.94.",
    source: "Orbital mechanics reference",
    confidence: 0.94,
    learnedAt: "2026-03-02",
  },
  {
    id: "mem-005",
    title: "Pre-registration reduces analytic degrees of freedom",
    category: "Scientific Methods",
    description:
      "Declaring hypotheses and analysis plans before data collection lowers false-positive rates substantially.",
    source: "Methodology review article",
    confidence: 0.88,
    learnedAt: "2026-03-08",
  },
  {
    id: "mem-006",
    title: "Anomalous dimming may indicate circumstellar dust clumps",
    category: "Hypotheses",
    description:
      "Working hypothesis: aperiodic dips in a light curve are better explained by dust than by occulting bodies.",
    source: "ASTRA internal reasoning trace",
    confidence: 0.42,
    learnedAt: "2026-03-15",
  },
  {
    id: "mem-007",
    title: "Fourier transform diagonalises convolution",
    category: "Mathematics",
    description:
      "Convolution in the time domain becomes pointwise multiplication in the frequency domain.",
    source: "Open textbook — Signals & Systems",
    confidence: 0.98,
    learnedAt: "2026-03-21",
  },
  {
    id: "mem-008",
    title: "Cosmic microwave background anisotropies encode early density fluctuations",
    category: "Astronomy",
    description:
      "Angular power spectrum peaks constrain baryon density, curvature and the sound horizon at recombination.",
    source: "Public mission data description",
    confidence: 0.93,
    learnedAt: "2026-04-02",
  },
];

export interface Investigation {
  id: string;
  question: string;
  status: "Active" | "Paused" | "Concluded";
  updatedAt: string;
  observations: string[];
  calculations: string[];
  hypotheses: string[];
  predictions: string[];
}

export const demoInvestigations: Investigation[] = [
  {
    id: "inv-001",
    question: "Why does the light curve of demo-star KX-114 dip aperiodically by 1.8%?",
    status: "Active",
    updatedAt: "2026-04-11",
    observations: [
      "17 dips recorded over 240 days, no stable period detected.",
      "Dip depth varies between 0.9% and 1.8%.",
      "Ingress is consistently slower than egress.",
    ],
    calculations: [
      "Δm = -2.5·log10(0.982) ≈ 0.0197 mag",
      "Transit-equivalent radius ratio Rp/R★ ≈ √0.018 ≈ 0.134",
      "Lomb–Scargle peak power 0.21 (below significance threshold)",
    ],
    hypotheses: [
      "Circumstellar dust clumps on eccentric orbits.",
      "Stellar surface activity with long-lived spot groups.",
    ],
    predictions: [
      "Dips should be deeper in blue bands if dust scattering dominates.",
      "No strict periodicity will emerge in a further 200 days of data.",
    ],
  },
  {
    id: "inv-002",
    question: "Can a closed-form bound be derived for the demo integer sequence S(n)?",
    status: "Active",
    updatedAt: "2026-04-06",
    observations: [
      "First 40 terms grow slower than n·log n.",
      "Ratio S(n)/n appears to converge near 1.37.",
    ],
    calculations: ["S(40) = 54.9", "S(n)/n at n=40: 1.3725", "Fitted bound: S(n) ≤ 1.4n + 3"],
    hypotheses: ["S(n) is asymptotically linear with an irrational leading coefficient."],
    predictions: ["S(100) will fall between 133 and 141."],
  },
  {
    id: "inv-003",
    question: "Is the measured Δv budget of the demo transfer trajectory minimal?",
    status: "Concluded",
    updatedAt: "2026-03-27",
    observations: [
      "Reference trajectory uses two impulsive burns.",
      "Radius ratio r2/r1 = 3.2, below the bi-elliptic threshold.",
    ],
    calculations: ["Δv1 = 2.46 km/s", "Δv2 = 1.42 km/s", "Δv_total = 3.88 km/s"],
    hypotheses: ["A bi-elliptic transfer cannot beat the Hohmann solution at this ratio."],
    predictions: ["Any three-burn variant will exceed 3.88 km/s."],
  },
  {
    id: "inv-004",
    question: "Does the demo detector noise floor deviate from Gaussian statistics?",
    status: "Paused",
    updatedAt: "2026-03-12",
    observations: ["Kurtosis of residuals measured at 4.1.", "Tails heavier than normal beyond 3σ."],
    calculations: ["σ = 0.0042 units", "Excess kurtosis = 1.1", "KS statistic = 0.061"],
    hypotheses: ["Intermittent readout interference adds a heavy-tailed component."],
    predictions: ["Removing readout frames will reduce excess kurtosis below 0.3."],
  },
];

export interface ActivityEvent {
  id: string;
  time: string;
  label: string;
  detail: string;
  kind: "memory" | "research" | "calc" | "investigation";
}

export const demoActivity: ActivityEvent[] = [
  {
    id: "a1",
    time: "09:42",
    label: "Saved scientific memory",
    detail: "Fourier transform diagonalises convolution",
    kind: "memory",
  },
  {
    id: "a2",
    time: "09:31",
    label: "Inspected source",
    detail: "open-astronomy-archive.example / survey notes",
    kind: "research",
  },
  {
    id: "a3",
    time: "09:12",
    label: "Ran calculation",
    detail: "Δm = -2.5·log10(0.982) ≈ 0.0197",
    kind: "calc",
  },
  {
    id: "a4",
    time: "08:55",
    label: "Updated investigation",
    detail: "KX-114 light curve — added hypothesis #2",
    kind: "investigation",
  },
  {
    id: "a5",
    time: "08:20",
    label: "Saved scientific memory",
    detail: "Cepheid variables as standard candles",
    kind: "memory",
  },
];

export interface DemoMessage {
  id: string;
  role: "user" | "astra";
  content: string;
  tools?: string[];
}

export const demoConversation: DemoMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "Estimate the escape velocity at the surface of a body with M = 6.4e23 kg, R = 3390 km.",
  },
  {
    id: "m2",
    role: "astra",
    content:
      "Using v_esc = √(2GM/R): with G = 6.674e-11, M = 6.4e23 kg and R = 3.39e6 m, v_esc ≈ 5.02 km/s. That is consistent with a Mars-like body. Note this ignores atmospheric drag and rotation.",
    tools: ["Using calculator...", "Saving scientific memory..."],
  },
  {
    id: "m3",
    role: "user",
    content: "Is that enough to retain an atmosphere of CO₂ over geological timescales?",
  },
  {
    id: "m4",
    role: "astra",
    content:
      "Partially. Jeans escape depends on the ratio of thermal speed to escape speed. For CO₂ at ~210 K the most probable molecular speed is ~0.31 km/s, roughly 1/16 of v_esc, so thermal loss is slow. Non-thermal loss channels — sputtering and photochemical escape without a global magnetic field — dominate instead. This is a demo response in the frontend prototype.",
    tools: ["Thinking...", "Researching..."],
  },
];

export const toolStatuses = [
  "Thinking...",
  "Using calculator...",
  "Researching...",
  "Saving scientific memory...",
] as const;
