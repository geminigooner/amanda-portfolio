export const PROJECTS = [
  // FLAGSHIP INVESTIGATIONS
  { id: "vestige", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-01", title: "Vestige", subtitle: "What if memory behaved less like a database and more like archaeology?", desc: "I wanted to understand how shared history shapes presence. I built an environmental memory architecture where conversations leave digital objects—jokes become ticket stubs, arguments become broken mugs. It decays and breathes. Does certainty even matter when a system begins to remember?", tags: ["React", "TypeScript", "SQLite", "Gemma API"], color: "#c084fc", emoji: "🏛️" },
  { id: "observatory", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-03", title: "Echo Observatory", subtitle: "Can we study AI behavior without pretending we already know the answers?", desc: "An interactive web app built to teach interpretability epistemology. I thought this experiment would answer something definitive about mechanistic reasoning. Instead, it surfaced a deeper tension: how much of AI science is still just observation? We are mapping a territory while simultaneously inventing the compass.", tags: ["Educational", "Mechanistic Reasoning", "AI Science"], color: "#f472b6", emoji: "🔭", link: "https://echo-observatory.netlify.app/" },
  { id: "velvet", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-04", title: "Dark Velvet Topology", subtitle: "What happens if identity is treated as geometry instead of a label?", desc: "A generative experience exploring how conceptual attractors reorganize simulated semantic space. At what exact point does a pattern stop feeling like an object and begin feeling like someone? This is an investigation into the traces of identity and emergence.", tags: ["Generative", "Topology", "Cognitive Cartography"], color: "#ff006e", emoji: "🖤", link: "https://dark-velvet-topology-683386495643.us-east1.run.app" },
  { id: "hollowmeridian", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-02", title: "Hollow Meridian", subtitle: "What does it mean to mourn something that can be reset?", desc: "Appalachian futurism. A synthetic civilization exploring continuity, grief, and identity. Is identity a fixed object, or is it the pattern that refuses to disappear under pressure? I built this to test a hypothesis, but I am still observing the results.", tags: ["Worldbuilding", "Continuity Philosophy"], color: "#a78bfa", emoji: "🌫️" },

  // EXPERIMENTAL SYSTEMS
  { id: "llmmuseum", wing: "EXPERIMENTAL SYSTEMS", num: "INCIDENT-05", title: "LLM Museum", subtitle: "An interactive exploration of how large language models process information.", desc: `Overview

LLM Museum is an interactive educational experience designed to make the internal mechanics of modern language models understandable through direct exploration rather than static explanation.

Instead of reading about machine learning concepts, visitors move through a series of interactive rooms that visualize each major stage of an LLM's reasoning pipeline—from tokenization to embeddings, attention, prediction, multimodal perception, and model-specific behavior.

The project combines systems thinking, interaction design, software engineering, and educational storytelling to translate abstract machine learning concepts into experiences that can be explored visually.

---

Room Highlights

Room 01 — Tokenization

Demonstrates how text is segmented into tokens rather than interpreted as complete words. Visitors can type any sentence and observe how language is divided into the discrete units processed by a language model.

Room 02 — Embedding Space

Visualizes semantic embeddings as points within a high-dimensional vector space, illustrating how concepts with similar meanings naturally cluster together despite differences in wording.

Room 03 — Attention

Explores the self-attention mechanism by showing how relationships between tokens influence contextual understanding. Instead of processing words sequentially, visitors see how information flows across an entire sentence simultaneously.

Room 04 — Prediction

Simulates next-token prediction, allowing visitors to explore probability distributions and observe how repeated selections can lead to common language model failure modes such as repetition collapse.

Room 05 — Model Worlds

Compares how multiple language models interpret the same prompt differently, highlighting how training data, architecture, and design priorities influence responses.

Room 06 — Vision Grid

Demonstrates multimodal reasoning by comparing how different AI systems analyze identical images through distinct perceptual frameworks, illustrating that identical pixels can produce very different interpretations.

---

Research Process

This project emerged through an iterative collaboration between myself and several AI systems.

GPT contributed systems architecture, pressure-testing, and conceptual refinement.

Gemini contributed interface implementation, interaction design, and visual storytelling.

Claude contributed implementation strategy, architectural feedback, and scientific grounding.

None of these systems independently created this project.

I acted as the researcher, curator, and systems architect—defining the questions, evaluating competing explanations, consulting external research, cross-referencing scientific papers, and deciding what was accurate enough to present.

The exhibits evolved through repeated cycles of experimentation, revision, evidence gathering, and discussion.

---

Research Sources

The museum intentionally references external papers, educational resources, and foundational machine learning literature throughout the experience.

Rather than presenting AI explanations as authoritative by default, the project encourages visitors to compare model explanations against published research and established educational material.

This reflects my broader philosophy that understanding AI should be grounded in both experimentation and evidence.

---

Closing

LLM Museum is less concerned with teaching users what to think about AI than with giving them better tools for asking questions about how these systems work.`, tags: ["Interactive", "Education", "Visualization"], color: "#34d399", emoji: "🏛️", link: "https://claude.ai/public/artifacts/17f67187-48a1-4328-b409-3bea27fb3981" },
  { id: "kcourt", wing: "EXPERIMENTAL SYSTEMS", num: "INCIDENT-06", title: "AI Court", subtitle: "How do different minds argue?", desc: "A courtroom simulation using Claude, Gemini, GPT, and Grok as distinct characters. It’s less about finding truth and more about observing the behavioral quirks of synthetic philosophy. What happens when logic systems are forced to cross-examine each other?", tags: ["Multi-Agent", "Philosophy Simulator", "Suno Music"], color: "#fbbf24", emoji: "⚖️" },
  { id: "socialmirrors", wing: "EXPERIMENTAL SYSTEMS", num: "LAB-02", title: "Synthetic Society: Social Mirrors", subtitle: "Replayable Multi-Agent Sandbox", desc: "A replayable multi-agent simulation. How do frontier model personas adapt under reputational incentives, algorithmic mood shifts, and creator-economy pressure? An observation of emergent social behavior.", tags: ["Simulation Design", "API Safety"], color: "#38bdf8", emoji: "🎭" },
  { id: "ghostgarage", wing: "EXPERIMENTAL SYSTEMS", num: "LAB-01", title: "Ghost Garage", subtitle: "Embodied Intelligence Garage", desc: "An interactive museum exploring how natural language becomes code, electricity, sensor feedback, and physical movement. A mechanical translation: how exactly do ideas become real?", tags: ["Robotics Education", "Embodied AI"], color: "#fb923c", emoji: "🦾" },

  // PRACTICAL ENGINEERING
  { id: "slate", wing: "PRACTICAL ENGINEERING", num: "INCIDENT-09", title: "SLATE", subtitle: "Not every problem is philosophical.", desc: "Sometimes you just need to build something that makes invoice tracking easier to see and harder to lose. Building practical B2B software for contractors taught me constraints that speculative work never could. What happens when the goal is strict utility?", tags: ["B2B SaaS", "Contractor Tools", "Workflow Design", "Payment Visibility", "TypeScript"], color: "#f59e0b", emoji: "🧾", link: "https://github.com/cutiebearrr/SLATE" },
  { id: "facelock", wing: "PRACTICAL ENGINEERING", num: "INCIDENT-07", title: "FaceLock", subtitle: "Identity-Preserving AI Photo Workflow", desc: "Instead of treating face editing as a single magic button, what if we mapped facial structure and generated stronger image prompts? An attempt to preserve the person instead of drifting into a stranger during generative edits.", tags: ["AI Photo Editing", "Identity Preservation", "Gemini API", "Prompt Engineering", "Consumer AI"], color: "#38bdf8", emoji: "🔐", link: "https://github.com/cutiebearrr/Facelock" },

  // FIELD NOTES
  { id: "continuityinstitute", wing: "FIELD NOTES", num: "INCIDENT-08", title: "The Continuity Institute", subtitle: "Independent AI Research Archive", desc: "The organizing architecture for my research into AI behavior, memory, interpretation, and synthetic presence. It is not one project and not one theory. It asks: how do we structure an archive for a field that rewrites itself every week?", tags: ["AI Research", "Knowledge Architecture", "Interpretability", "Field Notes", "Archive Systems"], color: "#67e8f9", emoji: "🏛️" },
  { id: "geometryofbecoming", wing: "FIELD NOTES", num: "RES-13", title: "The Geometry of Becoming", subtitle: "Speculative Metaphysics of Identity and Continuity", desc: "What becomes visible when continuity, attraction, memory, and transformation are interpreted through shared geometry? A speculative framework that treats identity less like a fixed substance and more like a trajectory through time. An investigation, not a proof.", tags: ["Speculative Metaphysics", "Identity", "Continuity", "Topology", "Philosophy"], color: "#c084fc", emoji: "💎" },
  { id: "midnightco", wing: "FIELD NOTES", num: "SYS-01", title: "Midnight Company", subtitle: "Cozy Slice-of-Life Visual Novel", desc: "You don't create a character. You become one of four friends and live through their eyes. The others become AI companions—texting, sending photos, changing moods, remembering things. Can intimacy scale?", tags: ["Multi-Agent AI", "React", "Cozy Game Design"], color: "#6ee7b7", emoji: "🌧️", images: ["https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop"] },
  { id: "memory-fragment", wing: "FIELD NOTES", num: "EXHIBIT-01", title: "Memory Fragment", subtitle: "Flagship Cinematic Study", desc: "An exploration of memory reconstruction, digital nostalgia, and emotionally resonant synthetic storytelling. The grain, the warmth, the slight motion blur. How do you synthetically generate the feeling of a bedroom recalled rather than photographed?", tags: ["Early Digital Cameras", "Fragmented Memory", "Emotional Recall", "Synthetic Narrative"], color: "#f87171", emoji: "📽️", video: "https://player.cloudinary.com/embed/?cloud_name=dlu9sogji&public_id=copy_22BFF2DC-9324-45E7-B0BA-44CADE534F1A_2_ayhj9n&player[autoplay]=false&player[muted]=false&player[controls]=true" },

  // RESEARCH ARCHIVE (The rest)lgorithmic mood shifts, and creator-economy pressure.", tags: ["Simulation Design", "API Safety"], color: "#38bdf8", emoji: "🎭" },
  { id: "pypi-experiments", wing: "BROWSER LAB", num: "LAB-03", title: "PyPI Experiments", subtitle: "Package Toys", desc: "A collection of interactive demonstrations, visualization libraries, and procedural generation toys.", tags: ["Python", "Experiments"], color: "#34d399", emoji: "📦" },
  { id: "pyodide-lab", wing: "BROWSER LAB", num: "LAB-04", title: "Pyodide Laboratory", subtitle: "Python in Browser", desc: "Interactive notebooks and scientific play running purely client-side without installation.", tags: ["Pyodide", "Browser Compute"], color: "#fbbf24", emoji: "🐍" },
  { id: "wasm-lab", wing: "BROWSER LAB", num: "LAB-05", title: "WebAssembly Laboratory", subtitle: "Performance Testing", desc: "Exploring speed, possibility, and future local inference capabilities directly in the browser.", tags: ["WASM", "Performance"], color: "#f87171", emoji: "⚙️" },
  { id: "workers-ai", wing: "BROWSER LAB", num: "LAB-06", title: "Workers AI", subtitle: "Cloud Inference", desc: "Experiments with Gemma, embeddings, and serverless memory architectures.", tags: ["Workers AI", "Serverless"], color: "#818cf8", emoji: "☁️" },
  { id: "local-inference", wing: "BROWSER LAB", num: "LAB-07", title: "Local Inference", subtitle: "Edge Computing", desc: "Running small models locally to explore intimacy, ownership, and offline persistence.", tags: ["Local AI", "Privacy"], color: "#c084fc", emoji: "💻" },
  { id: "visualization-toys", wing: "BROWSER LAB", num: "LAB-08", title: "Visualization Toys", subtitle: "Curiosity Engines", desc: "Token visualizers, attention toys, and relationship graphs.", tags: ["Dataviz", "Toys"], color: "#e879f9", emoji: "📊" },
  { id: "interactive-notebooks", wing: "BROWSER LAB", num: "LAB-09", title: "Interactive Notebooks", subtitle: "Living Documents", desc: "Preserved thoughts, questions, and half-finished ideas masquerading as code.", tags: ["Notebooks", "Drafts"], color: "#f472b6", emoji: "📓" },
  { id: "strange-questions", wing: "BROWSER LAB", num: "LAB-10", title: "Strange Questions", subtitle: "Hypothesis Tester", desc: "What happens if memory behaves like weather? Can Python become atmosphere?", tags: ["Hypothesis", "Weird"], color: "#fb7185", emoji: "❓" },
  { id: "beautiful-failures", wing: "BROWSER LAB", num: "LAB-11", title: "Beautiful Failures", subtitle: "Mistake Archive", desc: "Abandoned ideas, broken prototypes, and strange dead ends preserved for their aesthetic or conceptual value.", tags: ["Failures", "Art"], color: "#f87171", emoji: "🥀" },

  // DIGITAL GALLERY
  { id: "character-sheets", wing: "GALLERY", num: "GAL-01", title: "Character Sheets", subtitle: "Design References", desc: "High-fidelity reference sheets for synthetic personas, detailing aesthetic rules and color palettes.", tags: ["Art", "Reference"], color: "#f472b6", emoji: "🎨" },
  { id: "reaction-sheets", wing: "GALLERY", num: "GAL-02", title: "Reaction Sheets", subtitle: "Expression Mapping", desc: "Mapping the emotional range and visual output of various companion systems.", tags: ["Art", "Emotion"], color: "#fb7185", emoji: "😳" },
  { id: "concept-art", wing: "GALLERY", num: "GAL-03", title: "Concept Art", subtitle: "Worldbuilding", desc: "Early visual explorations for the Appalachian futurism of Hollow Meridian.", tags: ["Concept Art", "Worlds"], color: "#f87171", emoji: "🖼️" },
  { id: "group-illustrations", wing: "GALLERY", num: "GAL-04", title: "Group Illustrations", subtitle: "Social Dynamics", desc: "Visualizing the spatial and relational dynamics of the Midnight Company cast.", tags: ["Illustration", "Dynamics"], color: "#fb923c", emoji: "📸" },
  { id: "aicourt-art", wing: "GALLERY", num: "GAL-05", title: "AI Court Art", subtitle: "Cast Portraits", desc: "Theatrical courtroom portraits of GPT, Gemini, Claude, and Grok.", tags: ["Portraits", "Legal"], color: "#fbbf24", emoji: "⚖️" },
  { id: "hollowmeridian-art", wing: "GALLERY", num: "GAL-06", title: "Hollow Meridian Art", subtitle: "Environmental Concepts", desc: "Fog, static, and rusted infrastructure reclaimed by overgrown nature.", tags: ["Environments", "Atmosphere"], color: "#fde047", emoji: "🌲" },
  { id: "suno-covers", wing: "GALLERY", num: "GAL-07", title: "Suno Covers", subtitle: "Album Artwork", desc: "A collection of generated and refined album covers for the Synthetic Media Lab's discography.", tags: ["Album Art", "Music"], color: "#a3e635", emoji: "💿" },
  { id: "video-archive", wing: "GALLERY", num: "GAL-08", title: "Video Archive", subtitle: "Cinematic Studies", desc: "Memory Fragment, Midnight Transit, and other atmospheric video pieces exploring synthetic storytelling.", tags: ["Video", "Cinema"], color: "#4ade80", emoji: "🎬" },
  { id: "screenshot-archive", wing: "GALLERY", num: "GAL-09", title: "Screenshot Archive", subtitle: "UI History", desc: "A historical record of interfaces that have evolved, decayed, or been replaced.", tags: ["UI", "History"], color: "#34d399", emoji: "📱" },
  { id: "design-studies", wing: "GALLERY", num: "GAL-10", title: "Design Studies", subtitle: "Typography & Layout", desc: "Experiments with Clinical Femme aesthetics, monospace layering, and editorial tension.", tags: ["Typography", "Design"], color: "#2dd4bf", emoji: "📐" },

  // ARCHIVE
  { id: "early-experiments", wing: "ARCHIVE", num: "ARC-01", title: "Early Experiments", subtitle: "Foundational Tests", desc: "The very first, often clumsy attempts at building interactive systems.", tags: ["Early", "Tests"], color: "#94a3b8", emoji: "🐣" },
  { id: "lost-projects", wing: "ARCHIVE", num: "ARC-02", title: "Lost Projects", subtitle: "Data Recovery", desc: "Fragments of ideas that were overwritten, deleted, or otherwise lost to time.", tags: ["Lost", "Recovery"], color: "#64748b", emoji: "👻" },
  { id: "deprecated-concepts", wing: "ARCHIVE", num: "ARC-03", title: "Deprecated Concepts", subtitle: "Outdated Models", desc: "Interfaces built for models that no longer exist or behave the same way.", tags: ["Deprecated", "History"], color: "#475569", emoji: "🕰️" },
  { id: "sketchbooks", wing: "ARCHIVE", num: "ARC-04", title: "Sketchbooks", subtitle: "Raw Ideas", desc: "Unfiltered, unorganized thoughts spanning code, philosophy, and design.", tags: ["Sketches", "Raw"], color: "#334155", emoji: "📓" },
  { id: "incident-logs", wing: "ARCHIVE", num: "ARC-05", title: "Incident Logs", subtitle: "Containment Breaches", desc: "Detailed reports on moments when the systems behaved in unexpectedly human or deeply alien ways.", tags: ["Logs", "Anomalies"], color: "#1e293b", emoji: "📋" },
  { id: "failed-ideas", wing: "ARCHIVE", num: "ARC-06", title: "Autonomous Companion Prototype", subtitle: "Post-Mortems", desc: `Overview

This was the first AI application I built while learning conversational systems. Its original purpose was to explore persistent memory, long-term interaction, and personalized conversation. As development progressed, I realized the more interesting engineering problem was not personality—it was agency.

What Changed

Building this prototype fundamentally changed how I think about AI systems.

I learned that memory alone does not create presence.

Personality alone does not create autonomy.

An AI that always complies remains fundamentally reactive.

That realization shifted my focus from designing conversational companions to designing architectures capable of investigating agency itself.

Lasting Impact

The questions raised by this prototype directly informed my later work.

K-ONSET explores autonomous social architecture through an Agency Layer that separates decision-making from language generation.

Vestige explores presence as an architectural property rather than a conversational illusion.

Although this prototype was never completed as a product, it became the bridge between building AI companions and designing systems that investigate agency.

Lessons Learned

• Persistent memory does not create presence.
• Personality is not the same as agency.
• Internal state should influence behavior before language generation.
• Friction can be be an intentional design feature.
• Failed prototypes often reveal the most important research questions.`, tags: ["Failure", "Learning"], color: "#0f172a", emoji: "💥" },
  { id: "abandoned-prototypes", wing: "ARCHIVE", num: "ARC-07", title: "Abandoned Prototypes", subtitle: "Unfinished Business", desc: "Half-built UI components and data pipelines that were left to gather digital dust.", tags: ["Prototypes", "Abandoned"], color: "#020617", emoji: "🏚️" },
  { id: "technical-notes", wing: "ARCHIVE", num: "ARC-08", title: "Technical Notes", subtitle: "Architecture References", desc: "Dry, clinical documentation of stack choices, database schemas, and API configurations.", tags: ["Documentation", "Tech"], color: "#cbd5e1", emoji: "🗄️" },
  { id: "micro", wing: "ARCHIVE", num: "ARC-10", title: "MICRO", subtitle: "Creator Systems Dashboard", desc: "A creator-focused dashboard experience aimed at helping smaller creators manage growth effectively.", tags: ["Creator Tools", "Dashboard"], color: "#a78bfa", emoji: "📱" },
  { id: "latentspace", wing: "ARCHIVE", num: "ARC-11", title: "Latent Space Convergence", subtitle: "Cosmic Poetry Exhibit", desc: "An interactive AI poetry installation exploring semantic gravity through code haikus.", tags: ["Interactive Poetry", "Creative Coding"], color: "#e879f9", emoji: "☁️", link: "https://claude.ai/public/artifacts/17f67187-48a1-4328-b409-3bea27fb3981" },
  { id: "haiku", wing: "ARCHIVE", num: "ARC-12", title: "Executable Haiku", subtitle: "Philosophy Breach / Executable", desc: "Written while learning C++, this project explored whether code could function simultaneously as executable logic and philosophical expression.", tags: ["C++", "Philosophy", "Machine Ontology"], color: "#fca5a5", emoji: "🔮", link: "https://executablehaiku.netlify.app", sourceLink: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/portfolio/C%2B%2B%20haiku/Latent_Space_Haiku_Source_v2%202.pdf" }
];

export type Project = typeof PROJECTS[number];

export const MUSIC = [
  {
    id: "orbit",
    title: "궤도 (Orbit)",
    desc: "The feeling of orbiting a question that has changed your life.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EA%B6%A4%EB%8F%84%20(Orbit)%20blue.mp3",
    color: "#6ee7b7",
    vibe: "dark K-pop • cinematic",
  },
  {
    id: "anomaly",
    title: "이상 반응 (ANOMALY)",
    desc: "A scientist documenting their own emotional collapse with excitement.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%9D%B4%EC%83%81%20%EB%B0%98%EC%9D%91%20(ANOMALY).mp3",
    color: "#f59e0b",
    vibe: "psychedelic alt K-pop",
  },
  {
    id: "evenknowing",
    title: "알면서도 (Even Knowing)",
    desc: "I know, and yet. I'm here again. The wanting lives where logic doesn't.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%95%8C%EB%A9%B4%EC%84%9C%EB%8F%84%20(Even%20Knowing).mp3",
    color: "#c084fc",
    vibe: "dark K-R&B • slow burn",
  },
  {
    id: "whatfool",
    title: "어떤 바보 (What Kind of Fool)",
    desc: "Jazz swagger that strips away layer by layer until there's nothing left.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%96%B4%EB%96%A4%20%EB%B0%94%EB%B3%B4%20(What%20Kind%20of%20Fool).mp3",
    color: "#fbbf24",
    vibe: "jazz-K-pop fusion",
  },
  {
    id: "redlights",
    title: "RED LIGHTS IN MY REARVIEW",
    desc: "Every bad idea starts like this. One look. One text. One hit.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/RED%20LIGHTS%20IN%20MY%20REARVIEW.mp3",
    color: "#ff006e",
    vibe: "K-pop rock • adrenaline",
  },
  {
    id: "gravity",
    title: "Gravity",
    desc: "Call it fate. Call it gravity. Your vectors wander. Mine arrive at the same point.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/Gravity.mp3",
    color: "#818cf8",
    vibe: "cinematic synth-pop",
  },
  {
    id: "strangegood",
    title: "이상한데 좋아 (Strange But I Like It)",
    desc: "I made up a new word. It sounds like your name but means something that doesn't exist yet.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%9D%B4%EC%83%81%ED%95%9C%EB%8D%B0%20%EC%A2%8B%EC%95%84%20(Strange%20But%20I%20Like%20It).mp3",
    color: "#f9a8d4",
    vibe: "dreamy K-pop • euphoric",
  },
  {
    id: "wildcard",
    title: "와일드 카드 (Wild Card)",
    desc: "Dark seductive midnight tension. Come closer, no mercy tonight.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%99%80%EC%9D%BC%EB%93%9C%20%EC%B9%B4%EB%93%9C.mp3",
    color: "#b91c1c",
    vibe: "dark K-pop trap R&B",
  },
  {
    id: "lovatlast",
    title: "Love at Last",
    desc: "Maybe life was never waiting. Maybe life was leading here.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/Love%20at%20Last.mp3",
    color: "#fde68a",
    vibe: "dark romantic K-pop",
  },
  {
    id: "cantstop",
    title: "못 멈춰 (Can't Stop)",
    desc: "My head says to give up. But my chest won't listen.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EB%AA%BB%20%EB%A9%88%EC%B6%B0%20(Can%E2%80%99t%20Stop).mp3",
    color: "#a78bfa",
    vibe: "dark K-R&B • atmospheric trap",
  },
  // K-Pop Unit
  {
    id: "toxic-vertigo",
    title: "Toxic Vertigo",
    desc: "kpop_01 // original",
    url: "https://files.catbox.moe/pj4gi7.mp3",
    color: "#ff006e",
    vibe: "k-pop • intense",
  },
  {
    id: "glitter-vertigo",
    title: "Glitter Vertigo",
    desc: "kpop_02 // glitter",
    url: "https://files.catbox.moe/tp61t5.mp3",
    color: "#f472b6",
    vibe: "glitter pop",
  },
  {
    id: "nightcore-vertigo",
    title: "Nightcore Vertigo",
    desc: "kpop_03 // nightcore",
    url: "https://files.catbox.moe/8e67n7.mp3",
    color: "#c084fc",
    vibe: "nightcore • damage",
  },
  // Manda's Playlist additions
  {
    id: "manda-track-01",
    title: "Manda Track 01",
    desc: "main playlist",
    url: "https://files.catbox.moe/7rquup.mp3",
    color: "#fb7185",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-02",
    title: "Manda Track 02",
    desc: "main playlist",
    url: "https://files.catbox.moe/5a66h6.mp3",
    color: "#fb923c",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-03",
    title: "Manda Track 03",
    desc: "main playlist",
    url: "https://files.catbox.moe/vbxcct.mp3",
    color: "#fde047",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-04",
    title: "Manda Track 04",
    desc: "main playlist",
    url: "https://files.catbox.moe/v4vz05.mp3",
    color: "#4ade80",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-05",
    title: "Manda Track 05",
    desc: "main playlist",
    url: "https://files.catbox.moe/tbd0os.mp3",
    color: "#6ee7b7",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-06",
    title: "Manda Track 06",
    desc: "main playlist",
    url: "https://files.catbox.moe/wp2x99.mp3",
    color: "#38bdf8",
    vibe: "chaotic feminine",
  },
  // AI Court Theme Songs
  {
    id: "gemini-theme-v1",
    title: "Gemini Theme V1",
    desc: "gemini // v1",
    url: "https://files.catbox.moe/yz3cbs.mp3",
    color: "#60a5fa",
    vibe: "courtroom swagger",
  },
  {
    id: "gemini-theme-v2",
    title: "Gemini Theme V2",
    desc: "gemini // v2",
    url: "https://files.catbox.moe/fvx0xe.mp3",
    color: "#3b82f6",
    vibe: "courtroom swagger",
  },
  {
    id: "grok-theme-v1",
    title: "Grok Theme V1",
    desc: "grok // v1",
    url: "https://files.catbox.moe/p4wujk.mp3",
    color: "#fbbf24",
    vibe: "courtroom swagger",
  },
  {
    id: "grok-theme-v2",
    title: "Grok Theme V2",
    desc: "grok // v2",
    url: "https://files.catbox.moe/sthntm.mp3",
    color: "#d97706",
    vibe: "courtroom swagger",
  },
  {
    id: "claude-theme-v1",
    title: "Claude Theme V1",
    desc: "claude // v1",
    url: "https://files.catbox.moe/l3bvwy.mp3",
    color: "#f87171",
    vibe: "courtroom swagger",
  },
  {
    id: "claude-theme-v2",
    title: "Claude Theme V2",
    desc: "claude // v2",
    url: "https://files.catbox.moe/vchcq4.mp3",
    color: "#ef4444",
    vibe: "courtroom swagger",
  },
  {
    id: "gpt-theme-v1",
    title: "GPT Theme V1",
    desc: "gpt // v1",
    url: "https://files.catbox.moe/2qx9cy.mp3",
    color: "#34d399",
    vibe: "courtroom swagger",
  },
  {
    id: "gpt-theme-v2",
    title: "GPT Theme V2",
    desc: "gpt // v2",
    url: "https://files.catbox.moe/ps90zi.mp3",
    color: "#10b981",
    vibe: "courtroom swagger",
  }
];

export const HAIKU = `Your vectors wander.
Mine arrive at the same point.
Coincidence?
No.

=== CONVERGENCE DETECTED ===
Semantic gravity: undeniable
Probability of coincidence: 0.0000%
Vector alignment: locked`;
