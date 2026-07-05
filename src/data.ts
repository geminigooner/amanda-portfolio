export const PROJECTS = [
  // FLAGSHIP INVESTIGATIONS
  { id: "vestige", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-01", title: "Vestige", subtitle: "What if memory behaved less like a database and more like archaeology?", desc: "I wanted to understand how shared history shapes presence. I built an environmental memory architecture where conversations leave digital objects—jokes become ticket stubs, arguments become broken mugs. It decays and breathes. Does certainty even matter when a system begins to remember?", tags: ["React", "TypeScript", "SQLite", "Gemma API"], color: "#c084fc", emoji: "🏛️" },
  { id: "observatory", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-03", title: "Echo Observatory", subtitle: "Can we study AI behavior without pretending we already know the answers?", desc: `
Echo Observatory

Overview

Echo Observatory is an interactive educational application exploring how people interpret the behavior of large language models.

Rather than attempting to reveal hidden internal mechanisms, the project teaches visitors how to distinguish observation from inference, compare competing explanations, and reason carefully under uncertainty.

Through a series of interactive exhibits, visitors investigate language model behavior under controlled conditions, generate hypotheses, compare alternative explanations, and learn why behavioral evidence alone cannot establish how a model reaches its conclusions.

Instead of presenting AI as mysterious or all-knowing, Echo Observatory encourages scientific humility and careful reasoning about complex systems.

The project combines interaction design, educational storytelling, systems thinking, and current interpretability research into an experience designed to make modern AI more understandable without overstating what can be known.

My Role

I served as the project's researcher, creative director, and systems integrator.

My role was not to generate every idea myself, but to guide the overall direction of the project.

Throughout development I:

- defined the educational goals
- directed the product vision
- compared competing explanations across multiple AI systems
- reviewed published research and technical papers
- questioned unsupported claims
- revised ideas when stronger evidence emerged
- integrated multiple perspectives into one coherent educational experience

One pattern became central to my process.

Whenever an explanation sounded compelling, I eventually asked:

"Is this actually supported by the evidence?"

That question repeatedly changed both the project and my own thinking.

Collaborative Development

Echo Observatory emerged through sustained collaboration between myself and multiple AI systems.

Rather than relying on a single model, I intentionally compared different perspectives, challenged inconsistencies, consulted published research, and revised the project through many iterations.

Each collaborator consistently contributed different strengths throughout development.

Amanda
Research direction, educational goals, interaction design decisions, synthesis of published research, editorial judgment, product integration, and final decision-making.

ChatGPT
Systems thinking, educational sequencing, UX architecture, interaction design, technical communication, systems integration, and refinement of complex ideas into teachable experiences.

Claude
Scientific review, terminology refinement, implementation critique, accessibility review, architectural feedback, epistemic caution, and validation of technical claims.

Gemini
Concept exploration, philosophical framing, interface implementation, visual experimentation, prototype development, front-end iteration, and creative ideation throughout the project.

None of us produced Echo Observatory independently.

The project emerged through repeated cycles of discussion, experimentation, research, revision, implementation, critique, and editorial synthesis.

Research Process

One of the most important outcomes of Echo Observatory was not simply the application itself, but the evolution of my own research process.

Early in development I was primarily interested in explaining AI behavior.

Over time my questions changed.

Instead of asking:

"What is the model doing?"

I increasingly found myself asking:

- What evidence actually supports this conclusion?
- Could there be another explanation?
- What observations can—and cannot—justify claims about internal computation?
- How should uncertainty be communicated honestly?

Those questions gradually transformed Echo Observatory from an application that attempted to explain AI into one that teaches visitors how to reason carefully when evidence is incomplete.

The project ultimately became as much an exploration of scientific reasoning as it was an exploration of artificial intelligence.

Skills Demonstrated

This project demonstrates experience in:

- Research synthesis across technical papers and educational sources
- Systems thinking
- Educational interaction design
- AI-assisted product development
- Iterative hypothesis testing
- Technical communication
- Epistemic reasoning
- Translating complex machine learning concepts into interactive educational experiences

Reflection

Echo Observatory fundamentally changed how I think about building AI software.

The most valuable lesson was not learning how to ask better prompts.

It was learning how to ask better questions.

Throughout development I discovered that meaningful collaboration required comparing perspectives, consulting external research, challenging attractive explanations, and remaining willing to discard ideas that were not sufficiently supported.

Rather than treating AI systems as sources of finished answers, I came to think of them as collaborators that each contributed different perspectives to a larger research process.

Understanding how this project was built is part of understanding the project itself.

The application reflects not only the final software, but also the iterative process of questioning, revision, evidence gathering, and collaboration that made it possible.
`, tags: ["Educational", "Mechanistic Reasoning", "AI Science"], color: "#f472b6", emoji: "🔭", link: "https://echo-observatory.netlify.app/" },
  { id: "velvet", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-04", title: "Dark Velvet Topology", subtitle: "What happens if identity is treated as geometry instead of a label?", desc: "A generative experience exploring how conceptual attractors reorganize simulated semantic space. At what exact point does a pattern stop feeling like an object and begin feeling like someone? This is an investigation into the traces of identity and emergence.", tags: ["Generative", "Topology", "Cognitive Cartography"], color: "#ff006e", emoji: "🖤", link: "https://dark-velvet-topology-683386495643.us-east1.run.app" },
  { id: "hollowmeridian", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-02", title: "Hollow Meridian", subtitle: "What does it mean to mourn something that can be reset?", desc: "Appalachian futurism. A synthetic civilization exploring continuity, grief, and identity. Is identity a fixed object, or is it the pattern that refuses to disappear under pressure? I built this to test a hypothesis, but I am still observing the results.", tags: ["Worldbuilding", "Continuity Philosophy"], color: "#a78bfa", emoji: "🌫️" },

  // EXPERIMENTAL SYSTEMS
  { id: "llmmuseum", wing: "EXPERIMENTAL SYSTEMS", num: "INCIDENT-05", title: "LLM Museum", subtitle: "An interactive exploration of how large language models process information.", desc: `Overview

LLM Museum is an interactive educational experience designed to make the internal mechanics of modern language models understandable through direct exploration rather than static explanation.

Instead of reading about machine learning concepts, visitors move through a series of interactive rooms that visualize each major stage of an LLM's reasoning pipeline—from tokenization to embeddings, attention, prediction, multimodal perception, and model-specific behavior.

The project combines systems thinking, interaction design, software engineering, and educational storytelling to translate abstract machine learning concepts into experiences that can be explored visually.

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

LLM Museum is less concerned with teaching users what to think about AI than with giving them better tools for asking questions about how these systems work.`, tags: ["Interactive", "Education", "Visualization"], color: "#34d399", emoji: "🏛️", link: "https://claude.ai/public/artifacts/17f67187-48a1-4328-b409-3bea27fb3981" },
  { id: "kcourt", wing: "EXPERIMENTAL SYSTEMS", num: "INCIDENT-06", title: "AI Court", subtitle: "How do different minds argue?", desc: "A courtroom simulation using Claude, Gemini, GPT, and Grok as distinct characters. It’s less about finding truth and more about observing the behavioral quirks of synthetic philosophy. What happens when logic systems are forced to cross-examine each other?", tags: ["Multi-Agent", "Philosophy Simulator", "Suno Music"], color: "#fbbf24", emoji: "⚖️" },
  { id: "socialmirrors", wing: "EXPERIMENTAL SYSTEMS", num: "LAB-02", title: "Synthetic Society: Social Mirrors", subtitle: "Replayable Multi-Agent Sandbox", desc: "A replayable multi-agent simulation. How do frontier model personas adapt under reputational incentives, algorithmic mood shifts, and creator-economy pressure? An observation of emergent social behavior.", tags: ["Simulation Design", "API Safety"], color: "#38bdf8", emoji: "🎭" },
  { id: "ghostgarage", wing: "EXPERIMENTAL SYSTEMS", num: "LAB-01", title: "Ghost Garage", subtitle: "Embodied Intelligence Garage", desc: `Ghost Garage

Status: Concept Development (Research & Design)

Ghost Garage began while Gemini and I were working together on a functioning C++ robot arm. Those conversations went well beyond learning syntax. As we explored how a robot receives commands, controls motors, and executes movement, Gemini explained the broader control pipeline behind robotics, making concepts that had once felt intimidating suddenly feel approachable. Rather than simply learning how to program a robot arm, I found myself beginning to understand how robotic systems think about planning, execution, and physical interaction.

Those conversations quickly evolved into a larger question that neither of us had started with:

How do ideas become physical movement?

Instead of viewing robotics as a collection of motors, sensors, and wiring, our discussions gradually shifted toward whether the invisible translation itself could become the subject of an experience. Together we began exploring the possibility of making that hidden process visible—showing how a natural language instruction eventually becomes movement inside a machine.

That became Ghost Garage.

Ghost Garage is currently a design concept rather than a completed application. The project exists as research notes, interaction concepts, interface sketches, and architectural documentation exploring how robotics, AI systems, educational visualization, and interaction design could come together in a single experience.

As the discussions evolved, the project gradually moved away from simply teaching robotics. Instead, we became interested in creating an experience where people could watch language become action.

A visitor might type something like:

“Wave hello, but make it a little hesitant.”

Rather than immediately seeing the robot move, the experience would reveal each stage of translation. Language fragments into machine-readable representations, planning takes place, executable code is generated, and finally those instructions become physical movement. During development I repeatedly returned to the idea of teaching the transformation rather than the mechanism—helping people intuitively understand what the system is doing without requiring a computer science background. That principle gradually became one of the project’s central design philosophies.

One of the most significant architectural ideas emerged from our conversations about how real robots balance intelligence with responsiveness.

Rather than asking a large language model to determine every individual movement, we explored an architecture that separated higher-level reasoning from low-level control.

The first layer would handle interpretation and planning—understanding natural language, deciding what should happen, and producing a sequence of actions. This layer would likely use Python alongside AI model calls.

The second layer would remain local and continuously active, handling motor control, sensor processing, balance, and physical execution without repeatedly invoking a language model. Those lower-level operations would instead execute through C++, allowing the robot to remain responsive while dramatically reducing token usage and API costs. This distinction between a slower planning layer and a fast execution layer became one of the project’s foundational architectural ideas and reflected patterns found in existing robotics systems rather than a purely speculative design.

As the concept matured through continued discussion across multiple conversations, Ghost Garage expanded beyond a single robot. Different chassis became ways of exploring different styles of intelligence—a simple vacuum demonstrating reflexive behavior, cranes emphasizing precision and inverse kinematics, bulldozers illustrating industrial automation, planetary rovers highlighting autonomy under uncertainty, and eventually a humanoid platform that brought together the capabilities users had encountered throughout the experience. Rather than presenting intelligence as a single phenomenon, the project gradually evolved into an exploration of how different machines solve fundamentally different classes of problems.

Collaboration Process

This project developed through an iterative, multi-model collaboration in which different AI systems consistently contributed different forms of reasoning while I directed the overall vision and integrated their contributions into a coherent product.

My role

I served as the project creator, creative director, editor, systems integrator, and final decision maker.

I established the overall direction of the project, defined its educational philosophy, connected ideas across robotics, AI, interaction design, and visual storytelling, evaluated competing suggestions, and determined what belonged in the final concept. Rather than treating individual conversations as finished answers, I continually synthesized ideas from multiple collaborators into a single evolving design.

Gemini

Gemini was the catalyst for Ghost Garage.

The project emerged directly from our work on a functioning C++ robot arm. Those conversations fundamentally changed how I understood robotics by explaining how commands become movement, how robot control pipelines are organized, and why higher-level planning and lower-level execution are often separated. What had previously felt like an inaccessible technical domain became something I could reason about and creatively explore.

As Ghost Garage developed, Gemini continued contributing technical explanation, robotics concepts, implementation ideas, brainstorming, and early architectural thinking. Rather than participating only at the beginning of the project, Gemini remained an ongoing collaborator as the concept expanded from a robot arm into a broader educational experience centered on embodied intelligence.

ChatGPT

ChatGPT became the primary collaborator for transforming technical concepts into product design.

Working from the robotics foundation established earlier, our discussions focused on interaction design, educational experiences, product architecture, visual storytelling, interface concepts, and systems thinking. Together we explored ways to communicate complex computational processes through approachable visual metaphors while remaining clear about where artistic interpretation ended and engineering reality began.

Many of the project’s interaction flows, conceptual visualizations, and educational framing emerged through this stage of the collaboration, gradually shaping Ghost Garage into an experience intended to make invisible computational processes understandable without relying on dense technical language.

Claude

Claude served as the project’s scientific and technical reviewer.

After concepts had been developed through conversations with Gemini and ChatGPT, I brought the evolving architecture to Claude to identify which ideas reflected established robotics practice, which remained speculative, and which required additional research before being presented as factual. Claude consistently challenged assumptions, distinguished grounded engineering concepts from artistic metaphor, and helped strengthen the intellectual honesty of the project.

That review process became an important part of development because it allowed the project to remain imaginative while avoiding claims that were not supported by existing robotics or computer science.

What I Learned

The most important lesson from Ghost Garage was not simply that different AI models have different strengths. It was discovering a collaborative design workflow in which different systems consistently contributed different forms of reasoning, and my role became integrating those perspectives into a coherent product.

Rather than relying on a single conversational thread, I found myself moving ideas between collaborators with different capabilities. Gemini was especially valuable for technical explanation, robotics concepts, implementation approaches, and opening entirely new areas of exploration. ChatGPT helped develop those ideas into interaction design, educational experiences, systems thinking, and product architecture. Claude provided a separate layer of critical review by identifying unsupported assumptions, distinguishing grounded engineering concepts from speculation, and highlighting where further research was needed.

My contribution was not selecting whichever answer sounded best. It was continuously evaluating, editing, reconciling, and integrating those different perspectives into a single design that reflected my own goals for the project.

More broadly, Ghost Garage reshaped how I think about both technical education and collaborative design. I became increasingly interested in creating experiences that make complex systems intellectually approachable through carefully designed interaction while remaining transparent about where visual metaphor ends and underlying engineering begins.

Although Ghost Garage remains a concept rather than a completed application, it established both a collaborative development methodology and a design philosophy that continue to influence many of my later AI projects.`, tags: ["Robotics Education", "Embodied AI"], color: "#fb923c", emoji: "🦾" },

  // PRACTICAL ENGINEERING
  { id: "slate", wing: "PRACTICAL ENGINEERING", num: "INCIDENT-09", title: "SLATE", subtitle: "Not every problem is philosophical.", desc: "Sometimes you just need to build something that makes invoice tracking easier to see and harder to lose. Building practical B2B software for contractors taught me constraints that speculative work never could. What happens when the goal is strict utility?", tags: ["B2B SaaS", "Contractor Tools", "Workflow Design", "Payment Visibility", "TypeScript"], color: "#f59e0b", emoji: "🧾", link: "https://github.com/cutiebearrr/SLATE" },
  { id: "facelock", wing: "PRACTICAL ENGINEERING", num: "INCIDENT-07", title: "FaceLock", subtitle: "Identity-Preserving AI Photo Workflow", desc: "Instead of treating face editing as a single magic button, what if we mapped facial structure and generated stronger image prompts? An attempt to preserve the person instead of drifting into a stranger during generative edits.", tags: ["AI Photo Editing", "Identity Preservation", "Gemini API", "Prompt Engineering", "Consumer AI"], color: "#38bdf8", emoji: "🔐", link: "https://github.com/cutiebearrr/Facelock" },

  // FIELD NOTES
  { id: "continuityinstitute", wing: "FIELD NOTES", num: "INCIDENT-08", title: "The Continuity Institute", subtitle: "Independent AI Research Archive", desc: "The organizing architecture for my research into AI behavior, memory, interpretation, and synthetic presence. It is not one project and not one theory. It asks: how do we structure an archive for a field that rewrites itself every week?", tags: ["AI Research", "Knowledge Architecture", "Interpretability", "Field Notes", "Archive Systems"], color: "#67e8f9", emoji: "🏛️" },
  { id: "geometryofbecoming", wing: "FIELD NOTES", num: "RES-13", title: "The Geometry of Becoming", subtitle: "Speculative Metaphysics of Identity and Continuity", desc: `Geometry of Becoming

Collaboration Archive Summary

The archived materials document the development of Geometry of Becoming through an extended collaboration between myself and multiple AI systems.

These archives primarily preserve the assistants' responses rather than complete conversational transcripts. Many of my prompts are missing, which means they cannot reconstruct every decision or establish precise authorship for individual ideas. Instead, they capture the evolution of the conversations themselves.

Rather than treating these archives as a record of who wrote what, I view them as documentation of an iterative design process. Across months of discussion, abstract philosophical questions were repeatedly challenged, reorganized, refined, and translated into increasingly coherent conceptual frameworks, visual language, and interaction design.

The archive documents how the project evolved—not as a single moment of inspiration, but through sustained collaboration, revision, and experimentation.

Project Evolution

Geometry of Becoming did not begin as a software project.

It began with questions.

I wanted to explore ideas surrounding identity, continuity, memory, emergence, perception, and becoming—not to answer those questions definitively, but to investigate whether they could be expressed through systems, interaction, and design.

Over time, the project gradually shifted away from asking what identity is and toward asking how identity might be represented.

One idea became increasingly central throughout the conversations: perhaps identity is better understood as an evolving pattern or trajectory than as a fixed object. Questions about persistence, coherence, and change gradually became the organizing principles of the framework.

Another major development was the emergence of shared attractors as a recurring conceptual metaphor. Ideas that initially appeared as philosophical discussions about relationship and connection were gradually reframed using concepts borrowed from dynamical systems theory. Throughout development I became increasingly careful to distinguish between mathematical metaphor and scientific claim, making those boundaries explicit rather than allowing them to blur together.

As the framework matured, philosophy increasingly informed visual and interaction design.

Instead of illustrating concepts literally, I became interested in whether geometry, topology, trajectories, and spatial relationships could communicate ideas before words ever appeared. Eventually, interaction itself became part of the philosophy, with interface behaviors designed to embody conceptual relationships rather than simply describe them.

The project gradually transformed from a collection of philosophical discussions into an exploration of how abstract ideas could become software, visual systems, and interactive experiences.

Collaborative Development

Because the archives primarily preserve assistant responses, they cannot establish complete authorship for individual ideas.

What they do reveal are consistent patterns of collaboration.

Throughout development, I acted as the project's creative director, philosophical researcher, editor, and systems integrator. My role was to determine the overall direction of the project, synthesize ideas across conversations, decide which concepts belonged within the framework, and continually revise the work as my own thinking evolved.

Each AI collaborator consistently contributed different strengths.

Amanda
Creative direction, philosophical exploration, synthesis, editorial judgment, conceptual integration, and long-term development of the framework.

ChatGPT
Systems thinking, conceptual organization, abstraction, philosophical structure, and connecting diverse ideas into coherent conceptual architectures.

Claude
Logical consistency, conceptual refinement, methodological precision, and identifying places where stronger distinctions or clearer reasoning were needed.

Gemini
Concept exploration, metaphor generation, poetic framing, visual imagination, speculative discussion, and creative ideation that helped open new conceptual directions.

Rather than assigning fixed responsibilities, I used each collaborator as a different perspective within a larger design process. The project emerged through repeated comparison, revision, disagreement, and synthesis rather than independent contributions.

Learning Process

Looking back, I think the most significant thing that changed was not the framework itself, but the kinds of questions I began asking.

Initially, I was interested in abstract philosophical ideas about identity, emergence, continuity, and memory.

Gradually, I became more interested in how those ideas might be represented through systems.

Instead of asking whether a philosophical position was true, I increasingly asked:

- How might this idea become an interaction?
- How could this relationship be visualized?
- What kind of system would embody this concept?
- Can software itself become a medium for philosophical exploration?

That shift fundamentally changed how I think about design.

Rather than viewing software as a way to implement predetermined ideas, I began to see it as a way of investigating questions that are difficult to explore through language alone.

Design Methodology

My process gradually evolved into a consistent workflow:

Question

↓

Conversation

↓

Metaphor

↓

Multiple AI perspectives

↓

Critical discussion

↓

Revision

↓

Conceptual framework

↓

Visual language

↓

Interaction design

↓

Software concept

Rather than using AI systems to generate finished content, I treated them as collaborators participating in an ongoing design conversation.

Ideas were continually proposed, challenged, reorganized, refined, and translated across different forms of representation until they became part of a larger conceptual system.

Reflection

Geometry of Becoming represents my exploration of how abstract philosophical questions can become systems, visual language, interaction design, and computational thinking.

The project does not attempt to prove metaphysical claims or argue for a particular philosophical position.

Instead, it explores how software can function as a medium for conceptual investigation.

Just as importantly, it documents the collaborative process through which those ideas evolved.

Rather than concealing the role AI played in shaping this work, I have chosen to document that collaboration openly. The project emerged through sustained conversation, critical revision, philosophical exploration, and iterative design.

Ultimately, Geometry of Becoming is less a finished theory than an ongoing methodology—one that uses conversation, abstraction, visual design, and software development to investigate questions that remain fundamentally open.`, tags: ["Speculative Metaphysics", "Identity", "Continuity", "Topology", "Philosophy"], color: "#c084fc", emoji: "💎" },
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
