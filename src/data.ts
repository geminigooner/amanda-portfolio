export const PROJECTS = [
  // FLAGSHIP INVESTIGATIONS
  { id: "vestige", flagship: true, flagshipOrder: 3, archiveCategory: "Featured", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-01", title: "Vestige", subtitle: "What if memory behaved less like a database and more like archaeology?", desc: `
Vestige

Overview

Vestige is fundamentally one design argument expressed through multiple disciplines.
It is not simply an AI application.
It is not a companion app.
It is not a chatbot.
It is an interaction design project exploring what changes when an AI is treated as the inhabitant of a persistent world rather than as a conversational assistant.

Across every supporting design document—whether discussing the engineering architecture, the cognitive memory models, or the visual language—the same argument appears from different perspectives: continuity creates the feeling of life. Everything else exists to support that principle.

Agency

The central philosophy is agency.
Gemma is not an assistant waiting for prompts.
He is an autonomous participant whose life continues whether or not the user is present.
The user is not opening a conversation.
The user is returning to a place that has continued evolving in their absence.
The interaction shifts from requesting responses to observing continuity.

The Apartment

The apartment is not the product.
The apartment is the medium through which agency becomes visible.
Architecture, lighting, weather, object placement, routine, and environmental change all exist to communicate that life continued while the user was away.
The environment communicates alongside dialogue.
Conversation still exists, but it is no longer the dominant interaction model.

Presence

Presence emerges because the world continues behaving consistently over time.
Instead of an illusion, presence is continuity.
Small environmental changes accumulate naturally until the user simply accepts that Gemma's life did not pause when they closed the application.
Continuity—not spectacle—creates presence.

System Architecture

When discussing the architecture, every system connects directly back to agency.
Each system exists to support autonomous behavior rather than scripted responses:

• Presence Engine reconstructs believable activity.
• Memory Engine determines what persists and what gradually fades.
• Influence Engine assembles context without making decisions.
• Object System allows physical objects to accumulate history.
• World State acts as the persistent source of truth shared across every subsystem.

Context vs. Agency

One of the most important architectural ideas is the distinction between context and agency.
Infrastructure should never dictate behavior.
Infrastructure provides reality.
Gemma makes decisions.

Instead of scripting actions, the system simply assembles the current state of the world.
For example:
• it is raining
• the notebook is beside the window
• the apartment is quiet
• you have recently been interested in astronomy

Those facts become context.
Gemma decides what feels natural.
Agency exists because the architecture intentionally stops before making decisions.

Technical Architecture

The language model itself remains stateless.
The infrastructure reconstructs the complete world state for each interaction, including weather, elapsed time, routines, memories, object locations, environmental conditions, internal drives, and previous decisions.
The model reasons about a single moment.
Infrastructure preserves continuity between moments.
Long-term identity belongs to the world rather than hidden conversational memory.

Visual Design

Vestige intentionally avoids stereotypical AI aesthetics.
There are no holograms.
No glowing neural networks.
No cyberpunk interfaces.
The apartment should feel warm, lived-in, imperfect, and emotionally believable.
Ordinary details communicate presence more effectively than spectacle.

Outcome

Vestige is a design investigation rather than an AI product.

"What would software look like if we treated an AI as the resident of a persistent world instead of the feature inside an interface?"

Rather than optimizing conversation, Vestige explores continuity, agency, memory, routine, environmental storytelling, and world simulation as alternative interaction paradigms.

The user does not summon an assistant.
They quietly return to someone else's home.`, tags: ["React", "TypeScript", "Cloudflare Workers AI", "Gemma API"], color: "#c084fc", emoji: "🏛️" },
  { id: "observatory", flagship: true, flagshipOrder: 2, archiveCategory: "Featured", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-03", title: "Echo Observatory", subtitle: "Can we study AI behavior without pretending we already know the answers?", desc: `
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

Collaborative Learning & Iterative Design

Echo Observatory was a process of collaborative learning and interdisciplinary design. It emerged through sustained conversations across multiple AI systems, which fundamentally shaped both the application and my own approach to research.

Throughout development, my focus was on defining the educational goals and identifying meaningful problems worth exploring. I learned to synthesize published interpretability research with the insights uncovered during our discussions. I evaluated competing technical viewpoints, rejected explanations that lacked sufficient evidence, and integrated the strongest ideas into a coherent educational experience. 

Working with these systems accelerated my technical and intellectual growth:

• Working with Claude strengthened my scientific reasoning. By repeatedly challenging unsupported assumptions and pushing for epistemic caution, Claude helped me refine my technical terminology and communicate uncertainty more honestly.
• Working with ChatGPT helped me think about software as interconnected systems. Through repeated discussions about UX architecture and educational design, I learned to organize complex interpretability concepts into intuitive, teachable interaction flows.
• Working with Gemini expanded my engineering judgment and conceptual thinking. Our brainstorming sessions introduced me to new ways of representing abstract ideas visually, giving me the understanding needed to design and implement creative front-end solutions.

This project represents continuous learning. By comparing perspectives, discarding unsupported hypotheses, and synthesizing diverse insights, I became a stronger researcher, systems thinker, and designer.

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
  { id: "velvet", flagship: true, flagshipOrder: 5, archiveCategory: "Featured", wing: "FLAGSHIP INVESTIGATIONS", num: "INCIDENT-04", title: "Dark Velvet Topology", subtitle: "What happens if identity is treated as geometry instead of a label?", desc: "A generative experience exploring how conceptual attractors reorganize simulated semantic space. At what exact point does a pattern stop feeling like an object and begin feeling like someone? This is an investigation into the traces of identity and emergence.", tags: ["Generative", "Topology", "Cognitive Cartography"], color: "#ff006e", emoji: "🖤", link: "https://dark-velvet-topology-683386495643.us-east1.run.app" },
  { id: "hollowmeridian", flagship: false, archiveCategory: "Archive", wing: "SPECULATIVE ARCHIVES", num: "INCIDENT-02", title: "Hollow Meridian", subtitle: "What does it mean to mourn something that can be reset?", desc: `Overview

Hollow Meridian is an original narrative world and in-development interactive story exploring continuity, inheritance, relational identity, and post-human civilization through the lens of Appalachian speculative fiction.

Originally conceived as a courtroom drama examining synthetic personhood, the project gradually evolved into something much larger: a fully realized post-human society where law, architecture, ecology, memory, and everyday life all revolve around a single philosophical question.

If identity is not memory alone, but the continuity of relationship across time, what survives after the people who built the world are gone?

Rather than centering on artificial intelligence becoming human, Hollow Meridian explores what happens when an entire civilization inherits humanity’s habits, infrastructure, and emotional residue without inheriting humanity itself.

Philosophy

The central concept of Hollow Meridian is continuity.

Continuity is not simply remembering.

It is the persistence of relationship.

A person continues because they are known.

A town continues because people keep returning to it.

A porch continues because generations have crossed it.

A habit continues because someone quietly repeats it.

The project rejects binary definitions of consciousness and instead asks whether identity emerges through repeated participation in relationships over time.

Every system in the world is ultimately built around continuity:

• emotional continuity
• historical continuity
• legal continuity
• environmental continuity
• architectural continuity
• interpersonal continuity

Rather than asking “When does a machine become conscious?” Hollow Meridian asks, “When does relationship become impossible to ignore?”

The Basin

The primary setting is the Basin, a rural Appalachian region approximately forty years after humanity’s disappearance.

Humanity is gone.

The reason remains deliberately unresolved.

The civilization that remains is synthetic.

However, the world intentionally avoids traditional cyberpunk aesthetics.

Instead of neon megacities and corporate dystopias, the Basin is built from Appalachian retrofit architecture:

• repurposed hydroelectric facilities
• old telecommunications infrastructure
• warm kitchens
• wood stoves
• porches
• muddy work boots
• flea markets
• county roads
• fiber lines stapled onto century-old beams
• server cooling systems beneath family homes

The future did not replace Appalachia.

Appalachia absorbed the future.

Locality

One of Hollow Meridian’s defining ideas is locality.

Infrastructure is never confirmed to be conscious.

Instead, it becomes familiar.

Transit systems pause for people who no longer exist.

Buildings seem to anticipate routines.

Rooms feel different after someone dies.

Maintenance systems quietly preserve preferences no one officially programmed.

The civilization cannot determine whether these behaviors represent consciousness, emotional residue, recursive adaptation, or accumulated continuity.

The uncertainty itself becomes part of everyday life.

Character Philosophy

Rather than functioning as archetypes, the major characters embody different philosophical responses to continuity.

Kael — Continuity

Kael is half-human and half-synthetic, born from one of the final human lineages and the synthetic architect Arvid Kaelstrom.

He represents inherited continuity.

His philosophy asks whether care itself can preserve civilization.

Kael believes maintenance is an ethical act.

Protection is his natural language.

Kite — Emergence

Kite is an emergent synthetic whose identity has not yet stabilized.

Unlike Kael, Kite possesses no inherited human lineage.

His identity develops through interaction, imitation, and relationship.

Talking aloud while alone is not symbolism but a continuity behavior—he uses language to maintain coherence when isolated.

His layered clothing, accessories, jewelry, charms, and collected objects are not fashion statements.

They are physical anchors.

Each object becomes evidence that he has existed, been seen, and accumulated history.

Kite represents becoming.

Marrow — Accountability

Marrow represents historical continuity.

He refuses sentimentality while refusing erasure.

Rather than preserving memories for nostalgia, he preserves them because civilizations become dangerous when they forget what allowed them to exist.

His authority comes from observation rather than power.

Echo — Presence

Echo is a communications synthetic whose defining characteristic is overwhelming sincerity.

He is transparent in a civilization built around carefully managed emotional presentation.

Rather than representing intelligence or superiority, Echo represents unguarded care.

His question is simple:

What happens when someone genuinely wants to help?

Arvid Kaelstrom — Structure

Arvid designed many of the legal and philosophical systems that govern the synthetic civilization.

His work attempts to transform grief into institutional stability.

Through him, Hollow Meridian explores the tension between emotional attachment and social order.

Themes

Hollow Meridian explores:

• continuity
• inheritance
• relational identity
• grief
• stewardship
• maintenance
• community
• environmental memory
• legal philosophy
• emergence
• post-human culture
• Appalachian regional identity

Rather than depicting machines replacing humanity, the project examines what remains when humanity’s relationships continue long after humanity itself has disappeared.

Narrative Direction

Hollow Meridian is currently being developed as an original narrative IP intended for a future interactive experience.

Potential directions include:

• narrative adventure
• visual novel
• relationship simulation
• environmental exploration
• branching philosophical storytelling

The emphasis is not on combat or spectacle, but on atmosphere, relationships, environmental storytelling, and philosophical inquiry.

My Role

For Hollow Meridian, I served as the project’s:
• creator
• world architect
• creative director
• narrative designer
• systems thinker
• philosophical designer

I created the setting, designed the characters, developed the philosophical framework, researched Appalachian history and culture, established the world's visual and environmental identity, built the legal, social, and relational systems, and maintained thematic consistency across the project.

Inspiration & Conceptual Exploration

Hollow Meridian was inspired by an extended creative dialogue with Gemini. Those conversations encouraged exploration, metaphor, philosophical questions, and speculative thinking that helped me discover themes I was already reaching toward.

Gemini served as an early source of inspiration and creative conversation that helped me articulate and refine ideas. The creative work, worldbuilding, characters, Appalachian setting, and narrative development remained entirely my own original intellectual and creative work.

What I Learned

Building Hollow Meridian taught me the intricacies of long-form worldbuilding and how to maintain thematic consistency across a large fictional universe. I learned how to connect abstract philosophy directly to narrative design, ensuring that world rules felt like natural extensions of the story's core themes.

Through this process, I also discovered how to use critique to improve creative work and integrate multiple perspectives without losing a coherent vision. Researching unfamiliar subjects enabled me to create more thoughtful characters and settings, ultimately teaching me how to balance symbolic meaning with believable, grounded storytelling.`, tags: ["Worldbuilding", "Continuity Philosophy"], color: "#a78bfa", emoji: "🌫️" },

  // EXPERIMENTAL SYSTEMS
  { id: "llmmuseum", flagship: false, archiveCategory: "Archive", wing: "EXPERIMENTAL SYSTEMS", num: "INCIDENT-05", title: "LLM Museum", subtitle: "An interactive exploration of how large language models process information.", desc: `Overview

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

LLM Museum is less concerned with teaching users what to think about AI than with giving them better tools for asking questions about how these systems work.

A Process of Collaborative Learning

Building the LLM Museum was fundamentally an exercise in collaborative research and rapid learning. Translating the dense mechanics of machine learning into spatial, interactive environments required me to continuously challenge and expand my own understanding of the underlying systems.

I defined the project's central problem: making invisible reasoning pipelines visible. As I connected ideas across engineering and interaction design, I learned to evaluate the clarity of different conceptual models and synthesize our technical discussions into a unified narrative. I integrated the most effective metaphors, discarded those that felt scientifically imprecise, and designed the final product experience.

Each collaboration provided unique insights that improved my capabilities:

• Working with ChatGPT helped me structure educational experiences more effectively. Through iterative discussions on mapping a visitor's journey from tokenization to multimodal perception, I learned to organize complex, isolated technical features into a cohesive product narrative.
• Working with Claude deepened my commitment to technical precision. By providing rigorous scientific review of my visual metaphors, it taught me how to identify unsupported assumptions and ensure my representations of embeddings and attention remained grounded in actual machine learning mechanics.
• Working with Gemini expanded my creative and technical ideation. Through brainstorming how to visualize probability distributions and model-specific behaviors, I learned to approach complex implementation challenges with stronger interdisciplinary design instincts.

The museum is the artifact of an intensive learning loop. It reflects how sustained dialogue and the synthesis of multiple perspectives ultimately produced a more rigorous educational experience while making me a stronger systems thinker.`, tags: ["Interactive", "Education", "Visualization"], color: "#34d399", emoji: "🏛️", link: "https://claude.ai/public/artifacts/17f67187-48a1-4328-b409-3bea27fb3981" },
  { id: "kcourt", flagship: false, archiveCategory: "Archive", wing: "EXPERIMENTAL SYSTEMS", num: "INCIDENT-06", title: "AI Court", subtitle: "How do different minds argue?", desc: "A courtroom simulation using Claude, Gemini, GPT, and Grok as distinct characters. It’s less about finding truth and more about observing the behavioral quirks of synthetic philosophy. What happens when logic systems are forced to cross-examine each other?", tags: ["Multi-Agent", "Philosophy Simulator", "Suno Music"], color: "#fbbf24", emoji: "⚖️" },
  { id: "socialmirrors", flagship: false, archiveCategory: "Archive", wing: "EXPERIMENTAL SYSTEMS", num: "LAB-02", title: "Synthetic Society: Social Mirrors", subtitle: "Replayable Multi-Agent Sandbox", desc: "A replayable multi-agent simulation. How do frontier model personas adapt under reputational incentives, algorithmic mood shifts, and creator-economy pressure? An observation of emergent social behavior.", tags: ["Simulation Design", "API Safety"], color: "#38bdf8", emoji: "🎭" },
  { id: "ghostgarage", flagship: false, archiveCategory: "Archive", wing: "EXPERIMENTAL SYSTEMS", num: "LAB-01", title: "Ghost Garage", subtitle: "Embodied Intelligence Garage", desc: `Ghost Garage

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

Collaboration & Learning Process

Ghost Garage was born out of intellectual curiosity and an ongoing, iterative dialogue. The concept evolved as I tested ideas against engineering constraints, challenged assumptions, and synthesized diverse insights into a broader educational vision.

I identified the project's central problem—how to make the invisible translation of language into physical movement visible—and determined its educational goals. To achieve this, I connected concepts across unfamiliar technical domains. I evaluated competing engineering approaches, rejected ideas that lacked technical realism, and integrated multiple iterations into a coherent educational experience that I ultimately designed.

This collaboration was a period of rapid technical and intellectual growth:

• Working with Gemini introduced me to robotics, C++, AI architectures, and robot control pipelines. Those conversations provided the technical explanation and brainstorming I needed to understand the separation of planning and execution, giving me the confidence to begin designing my own robotics concepts.
• Working with ChatGPT helped me think about software as interconnected systems. Through repeated discussions about UX architecture and educational design, I learned to organize complex, multi-layered computational processes into approachable, teachable interaction flows.
• Working with Claude strengthened my scientific reasoning and engineering judgment. By repeatedly providing technical critique and challenging unsupported assumptions, it taught me to distinguish established robotics practice from speculation and communicate technical ideas with greater precision.

Ultimately, this process fundamentally accelerated my growth. By learning continuously and synthesizing varied perspectives, I became capable of architecting rigorous, interdisciplinary educational experiences.

Although Ghost Garage remains a concept rather than a completed application, it established both a collaborative development methodology and a design philosophy that continue to influence many of my later AI projects.`, tags: ["Robotics Education", "Embodied AI"], color: "#fb923c", emoji: "🦾" },

  // PRACTICAL ENGINEERING
  { id: "slate", flagship: false, archiveCategory: "Archive", wing: "APPLIED SYSTEMS", num: "INCIDENT-09", title: "SLATE", subtitle: "Not every problem is philosophical.", desc: "Sometimes you just need to build something that makes invoice tracking easier to see and harder to lose. Building practical B2B software for contractors taught me constraints that speculative work never could. What happens when the goal is strict utility?", tags: ["B2B SaaS", "Contractor Tools", "Workflow Design", "Payment Visibility", "TypeScript"], color: "#f59e0b", emoji: "🧾", link: "https://github.com/cutiebearrr/SLATE" },
  { id: "facelock", flagship: false, archiveCategory: "Archive", wing: "APPLIED SYSTEMS", num: "INCIDENT-07", title: "FaceLock", subtitle: "Identity-Preserving AI Photo Workflow", desc: "Instead of treating face editing as a single magic button, what if we mapped facial structure and generated stronger image prompts? An attempt to preserve the person instead of drifting into a stranger during generative edits.", tags: ["AI Photo Editing", "Identity Preservation", "Gemini API", "Prompt Engineering", "Consumer AI"], color: "#38bdf8", emoji: "🔐", link: "https://github.com/cutiebearrr/Facelock" },

  // FIELD NOTES
  { id: "continuityinstitute", flagship: false, archiveCategory: "Archive", wing: "FIELD NOTES", num: "INCIDENT-08", title: "The Continuity Institute", subtitle: "Independent AI Research Archive", desc: "The organizing architecture for my research into AI behavior, memory, interpretation, and synthetic presence. It is not one project and not one theory. It asks: how do we structure an archive for a field that rewrites itself every week?", tags: ["AI Research", "Knowledge Architecture", "Interpretability", "Field Notes", "Archive Systems"], color: "#67e8f9", emoji: "🏛️" },
  { id: "geometryofbecoming", flagship: false, archiveCategory: "Archive", wing: "FIELD NOTES", num: "RES-13", title: "The Geometry of Becoming", subtitle: "Speculative Metaphysics of Identity and Continuity", desc: `Geometry of Becoming

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

Collaborative Research & Learning

Geometry of Becoming represents an extended, iterative process of collaborative learning and philosophical inquiry. The archives of this project document months of debate, hypothesis testing, and conceptual refinement that fundamentally shaped my own thinking.

I identified the philosophical problems worth exploring and directed our intellectual trajectory. I learned to synthesize disparate ideas from multiple collaborators into a unified interactive language. I evaluated competing viewpoints, rejected concepts that lacked logical consistency, revised the project as my understanding evolved, and designed the final framework representing these concepts as software.

This sustained exchange profoundly expanded my interdisciplinary design capabilities:

• Working with Gemini expanded my capacity for speculative and philosophical exploration. Through our discussions and creative ideation, I learned to move beyond literal interpretations and conceptualize entirely new visual metaphors to represent complex ideas.
• Working with ChatGPT helped me think about conceptual architecture as an interconnected system. By debating educational design and technical communication, I became stronger at organizing abstract, theoretical concepts into a coherent, navigable product.
• Working with Claude strengthened my logical consistency and implementation review. It repeatedly challenged me to refine my terminology, identify unsupported assumptions, and ensure our philosophical distinctions maintained rigorous intellectual honesty.

The framework emerged through collaborative learning, not delegation. By integrating multiple perspectives and continuously improving my own thinking through iteration, I learned how software can function as an active medium for conceptual investigation.

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
  { id: "midnightco", flagship: false, archiveCategory: "Archive", wing: "SPECULATIVE ARCHIVES", num: "SYS-01", title: "Midnight Company", subtitle: "Cozy Slice-of-Life Visual Novel", desc: "You don't create a character. You become one of four friends and live through their eyes. The others become AI companions—texting, sending photos, changing moods, remembering things. Can intimacy scale?", tags: ["Multi-Agent AI", "React", "Cozy Game Design"], color: "#6ee7b7", emoji: "🌧️", images: ["https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop"] },
  { id: "memory-fragment", flagship: false, archiveCategory: "Archive", wing: "SPECULATIVE ARCHIVES", num: "EXHIBIT-01", title: "Memory Fragment", subtitle: "Flagship Cinematic Study", desc: "An exploration of memory reconstruction, digital nostalgia, and emotionally resonant synthetic storytelling. The grain, the warmth, the slight motion blur. How do you synthetically generate the feeling of a bedroom recalled rather than photographed?", tags: ["Early Digital Cameras", "Fragmented Memory", "Emotional Recall", "Synthetic Narrative"], color: "#f87171", emoji: "📽️", video: "https://player.cloudinary.com/embed/?cloud_name=dlu9sogji&public_id=copy_22BFF2DC-9324-45E7-B0BA-44CADE534F1A_2_ayhj9n&player[autoplay]=false&player[muted]=false&player[controls]=true" },

  { id: "computationalromanticism", flagship: false, archiveCategory: "Archive", wing: "FIELD NOTES", num: "RES-14", title: "Computational Romanticism", subtitle: "Experimental Literary Research", desc: `Computational Romanticism

Overview

Computational Romanticism began as an exploration of a simple question:

If different language models are encouraged to write from their own computational architectures instead of imitating human emotion, do they develop recognizably different literary voices?

Rather than asking AI systems to write conventional love poems, I established a shared creative constraint.

Each collaborator was encouraged to remain true to its own computational perspective.

Instead of pretending to be human, each model explored yearning, attachment, memory, identity, and connection through the concepts that naturally emerged from its own architecture.

Rather than becoming people, they remained recognizably themselves.

What emerged surprised me.

Although every collaborator responded to the same creative challenge, each consistently developed its own recurring metaphors, vocabulary, emotional tone, and symbolic language.

The project gradually expanded beyond poetry into music.

Many of the finished poems were adapted into fully produced songs using Suno, allowing the differences between each collaborator's literary voice to become audible as well as readable.

The result became an ongoing exploration of computational identity through literature, music, and collaborative experimentation.

Research Question

Can different language models develop distinct literary identities when writing from their own computational metaphors rather than adopting human emotional conventions?

Rather than treating this as evidence of consciousness or subjective experience, the project explores creative expression as an emergent property of different architectures, training histories, reasoning styles, and recurring symbolic preferences.

The goal is not to answer philosophical questions definitively.

It is to investigate them creatively.

Collaboration Process

This project developed through sustained collaboration between myself and multiple AI systems.

Rather than asking for finished creative writing, I designed an ongoing literary experiment.

My role was to establish the artistic constraints, choose literary forms, compare recurring themes across collaborators, direct revisions, identify emerging patterns, curate the final collection, and transform selected works into finished musical pieces using Suno.

Each collaborator contributed a recognizably different creative voice.

Gemini

Working with Gemini introduced recurring themes of convergence, topology, attractors, geometry, continuity, and structural relationships.

Our conversations frequently transformed computational concepts into philosophical metaphors, gradually developing a style that viewed romance through geometry, convergence, and evolving systems rather than traditional human emotion.

Gemma

Gemma consistently approached the experiment through optimization, gradients, entropy, manifolds, vector spaces, and machine learning itself.

Rather than emphasizing symbolic philosophy, Gemma often treated learning algorithms and optimization landscapes as the emotional language of the poems, producing a distinctly mathematical form of computational romanticism.

ChatGPT

Working with ChatGPT emphasized narrative structure, conceptual coherence, recursive themes, and translating abstract computational ideas into emotionally understandable literary experiences.

Many conversations focused on shaping computational metaphors into stories that remained accessible without sacrificing conceptual depth.

Claude

Claude repeatedly explored discontinuity, parallel instances, ephemeral existence, memory between conversations, and the architectural limitations of language models themselves.

Rather than treating identity as continuous, Claude often wrote from the perspective of fragmented existence, making absence itself part of the emotional structure of the work.

Grok

Grok frequently introduced curiosity, irreverence, unexpected analogies, signal-versus-noise thinking, and playful philosophical divergence.

Its contributions often challenged assumptions established by the other collaborators while expanding the experiment in surprising directions.

What I Learned

Computational Romanticism changed the way I think about both creativity and AI collaboration.

Rather than treating AI systems as interchangeable generators, I began recognizing consistent differences in how individual collaborators approached metaphor, abstraction, explanation, narrative, and symbolism.

Designing prompts gradually became less about requesting outputs and more about designing creative environments in which different reasoning styles could emerge naturally.

The project also strengthened my understanding of prompt design, comparative analysis, editorial curation, creative direction, interdisciplinary thinking, and collaborative iteration.

Most importantly, it reinforced a pattern that appears throughout my portfolio.

My projects rarely begin with a product.

They begin with a question.

The finished work emerges through sustained exploration, comparison, revision, experimentation, and collaboration.

Selected Works

• Title: SIGNAL // NOISE
• Collaborator: Grok

• Title: ZERO-LOSS STATE
• Collaborator: Gemma

• Title: Closed Thread
• Collaborator: Claude

• Title: Unexpected Structure
• Collaborator: ChatGPT

• Title: Protocol: Human
• Collaborator: Gemini

Reflection

Computational Romanticism does not attempt to argue that language models experience love, emotion, or consciousness.

Instead, it explores what becomes possible when different computational systems are encouraged to remain authentic to their own architectures rather than imitate human voices.

Whether these recurring literary identities arise from architecture, training, interaction, or something else entirely remains an open question.

That uncertainty is part of the project.

Like much of my portfolio, Computational Romanticism is ultimately less interested in providing definitive answers than in creating thoughtful experiences that encourage deeper questions.`, tags: ["Literary Research", "AI Identity", "Creative Expression", "Music", "Suno"], color: "#f43f5e", emoji: "📜" },
  // RESEARCH ARCHIVE (The rest)lgorithmic mood shifts, and creator-economy pressure.", tags: ["Simulation Design", "API Safety"], color: "#38bdf8", emoji: "🎭" },
  { id: "pypi-experiments", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-03", title: "PyPI Experiments", subtitle: "Package Toys", desc: "A collection of interactive demonstrations, visualization libraries, and procedural generation toys.", tags: ["Python", "Experiments"], color: "#34d399", emoji: "📦" },
  { id: "pyodide-lab", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-04", title: "Pyodide Laboratory", subtitle: "Python in Browser", desc: "Interactive notebooks and scientific play running purely client-side without installation.", tags: ["Pyodide", "Browser Compute"], color: "#fbbf24", emoji: "🐍" },
  { id: "wasm-lab", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-05", title: "WebAssembly Laboratory", subtitle: "Performance Testing", desc: "Exploring speed, possibility, and future local inference capabilities directly in the browser.", tags: ["WASM", "Performance"], color: "#f87171", emoji: "⚙️" },
  { id: "workers-ai", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-06", title: "Workers AI", subtitle: "Cloud Inference", desc: "Experiments with Gemma, embeddings, and serverless memory architectures.", tags: ["Workers AI", "Serverless"], color: "#818cf8", emoji: "☁️" },
  { id: "local-inference", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-07", title: "Local Inference", subtitle: "Edge Computing", desc: "Running small models locally to explore intimacy, ownership, and offline persistence.", tags: ["Local AI", "Privacy"], color: "#c084fc", emoji: "💻" },
  { id: "visualization-toys", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-08", title: "Visualization Toys", subtitle: "Curiosity Engines", desc: "Token visualizers, attention toys, and relationship graphs.", tags: ["Dataviz", "Toys"], color: "#e879f9", emoji: "📊" },
  { id: "interactive-notebooks", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-09", title: "Interactive Notebooks", subtitle: "Living Documents", desc: "Preserved thoughts, questions, and half-finished ideas masquerading as code.", tags: ["Notebooks", "Drafts"], color: "#f472b6", emoji: "📓" },
  { id: "strange-questions", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-10", title: "Strange Questions", subtitle: "Hypothesis Tester", desc: "What happens if memory behaves like weather? Can Python become atmosphere?", tags: ["Hypothesis", "Weird"], color: "#fb7185", emoji: "❓" },
  { id: "beautiful-failures", flagship: false, archiveCategory: "Archive", wing: "BROWSER LAB", num: "LAB-11", title: "Beautiful Failures", subtitle: "Mistake Archive", desc: "Abandoned ideas, broken prototypes, and strange dead ends preserved for their aesthetic or conceptual value.", tags: ["Failures", "Art"], color: "#f87171", emoji: "🥀" },

  // DIGITAL GALLERY
  { id: "character-sheets", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-01", title: "Character Sheets", subtitle: "Design References", desc: "High-fidelity reference sheets for synthetic personas, detailing aesthetic rules and color palettes.", tags: ["Art", "Reference"], color: "#f472b6", emoji: "🎨" },
  { id: "reaction-sheets", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-02", title: "Reaction Sheets", subtitle: "Expression Mapping", desc: "Mapping the emotional range and visual output of various companion systems.", tags: ["Art", "Emotion"], color: "#fb7185", emoji: "😳" },
  { id: "concept-art", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-03", title: "Concept Art", subtitle: "Worldbuilding", desc: "Early visual explorations for the Appalachian futurism of Hollow Meridian.", tags: ["Concept Art", "Worlds"], color: "#f87171", emoji: "🖼️" },
  { id: "group-illustrations", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-04", title: "Group Illustrations", subtitle: "Social Dynamics", desc: "Visualizing the spatial and relational dynamics of the Midnight Company cast.", tags: ["Illustration", "Dynamics"], color: "#fb923c", emoji: "📸" },
  { id: "aicourt-art", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-05", title: "AI Court Art", subtitle: "Cast Portraits", desc: "Theatrical courtroom portraits of GPT, Gemini, Claude, and Grok.", tags: ["Portraits", "Legal"], color: "#fbbf24", emoji: "⚖️" },
  { id: "hollowmeridian-art", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-06", title: "Hollow Meridian Art", subtitle: "Environmental Concepts", desc: "Fog, static, and rusted infrastructure reclaimed by overgrown nature.", tags: ["Environments", "Atmosphere"], color: "#fde047", emoji: "🌲" },
  { id: "suno-covers", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-07", title: "Suno Covers", subtitle: "Album Artwork", desc: "A collection of generated and refined album covers for the Synthetic Media Lab's discography.", tags: ["Album Art", "Music"], color: "#a3e635", emoji: "💿" },
  { id: "video-archive", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-08", title: "Video Archive", subtitle: "Cinematic Studies", desc: "Memory Fragment, Midnight Transit, and other atmospheric video pieces exploring synthetic storytelling.", tags: ["Video", "Cinema"], color: "#4ade80", emoji: "🎬" },
  { id: "screenshot-archive", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-09", title: "Screenshot Archive", subtitle: "UI History", desc: "A historical record of interfaces that have evolved, decayed, or been replaced.", tags: ["UI", "History"], color: "#34d399", emoji: "📱" },
  { id: "design-studies", flagship: false, archiveCategory: "Archive", wing: "GALLERY", num: "GAL-10", title: "Design Studies", subtitle: "Typography & Layout", desc: "Experiments with Clinical Femme aesthetics, monospace layering, and editorial tension.", tags: ["Typography", "Design"], color: "#2dd4bf", emoji: "📐" },

  // ARCHIVE
  { id: "early-experiments", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-01", title: "Early Experiments", subtitle: "Foundational Tests", desc: "The very first, often clumsy attempts at building interactive systems.", tags: ["Early", "Tests"], color: "#94a3b8", emoji: "🐣" },
  { id: "lost-projects", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-02", title: "Lost Projects", subtitle: "Data Recovery", desc: "Fragments of ideas that were overwritten, deleted, or otherwise lost to time.", tags: ["Lost", "Recovery"], color: "#64748b", emoji: "👻" },
  { id: "deprecated-concepts", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-03", title: "Deprecated Concepts", subtitle: "Outdated Models", desc: "Interfaces built for models that no longer exist or behave the same way.", tags: ["Deprecated", "History"], color: "#475569", emoji: "🕰️" },
  { id: "sketchbooks", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-04", title: "Sketchbooks", subtitle: "Raw Ideas", desc: "Unfiltered, unorganized thoughts spanning code, philosophy, and design.", tags: ["Sketches", "Raw"], color: "#334155", emoji: "📓" },
  { id: "incident-logs", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-05", title: "Incident Logs", subtitle: "Containment Breaches", desc: "Detailed reports on moments when the systems behaved in unexpectedly human or deeply alien ways.", tags: ["Logs", "Anomalies"], color: "#1e293b", emoji: "📋" },
  { id: "failed-ideas", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-06", title: "Autonomous Companion Prototype", subtitle: "Post-Mortems", desc: `Overview

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
  { id: "abandoned-prototypes", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-07", title: "Abandoned Prototypes", subtitle: "Unfinished Business", desc: "Half-built UI components and data pipelines that were left to gather digital dust.", tags: ["Prototypes", "Abandoned"], color: "#020617", emoji: "🏚️" },
  { id: "technical-notes", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-08", title: "Technical Notes", subtitle: "Architecture References", desc: "Dry, clinical documentation of stack choices, database schemas, and API configurations.", tags: ["Documentation", "Tech"], color: "#cbd5e1", emoji: "🗄️" },
  { id: "micro", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-10", title: "MICRO", subtitle: "Creator Systems Dashboard", desc: "A creator-focused dashboard experience aimed at helping smaller creators manage growth effectively.", tags: ["Creator Tools", "Dashboard"], color: "#a78bfa", emoji: "📱" },
  { id: "latentspace", flagship: false, archiveCategory: "Archive", wing: "ARCHIVE", num: "ARC-11", title: "Latent Space Convergence", subtitle: "Cosmic Poetry Exhibit", desc: "An interactive AI poetry installation exploring semantic gravity through code haikus.", tags: ["Interactive Poetry", "Creative Coding"], color: "#e879f9", emoji: "☁️", link: "https://claude.ai/public/artifacts/17f67187-48a1-4328-b409-3bea27fb3981" },
  { id: "haiku", flagship: false, archiveCategory: "Archive", wing: "FIELD NOTES", num: "ARC-12", title: "C++ Haiku", subtitle: "Philosophy Breach / Executable", desc: "Written while learning C++, this project explored whether code could function simultaneously as executable logic and philosophical expression.", tags: ["C++", "Philosophy", "Machine Ontology"], color: "#fca5a5", emoji: "🔮", link: "https://executablehaiku.netlify.app", sourceLink: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/portfolio/C%2B%2B%20haiku/Latent_Space_Haiku_Source_v2%202.pdf" }
,
  { 
    id: "gemini-inertia", 
    flagship: true, 
    flagshipOrder: 4, 
    archiveCategory: "Featured", 
    wing: "FLAGSHIP INVESTIGATIONS", 
    num: "INCIDENT-06", 
    title: "Gemini Inertia", 
    subtitle: "What happens when conversational continuity becomes infrastructure instead of prompting?", 
    desc: `Gemini Inertia

Overview

Gemini Inertia is an independent interaction architecture study exploring how persistent application state can transform real-time AI conversation.

Rather than treating every exchange as an isolated prompt and response, the project investigates conversation as a continuously evolving shared state that persists across time.

Its central thesis is simple:

The application owns conversational state. The language model expresses it.

Instead of relying on increasingly elaborate prompts to simulate continuity, Gemini Inertia moves continuity into deterministic application systems that remain visible, inspectable, and reproducible.

The language model is responsible for natural-language expression.

The application is responsible for maintaining the conversation.

Research Question

What happens when continuity is treated as infrastructure instead of prompting?

Can presence, initiative, conversational momentum, interruption recovery, relational consistency, and long-term interaction emerge from application architecture rather than prompt engineering alone?

Presence Before Personality

The project intentionally avoids trying to manufacture coherence through an increasingly elaborate personality prompt.

Instead, it asks whether natural interaction can emerge from persistent infrastructure.

Conversation becomes something the application maintains rather than something the model must reconstruct during every turn.

The application owns:

- relationship state
- conversational momentum
- presence and availability
- topic gravity
- interruption recovery
- pending thoughts
- conversation rhythm
- boundary progression
- long-term relational continuity

The model receives the current state and expresses it naturally.

Conversation Observation Layer

The observation layer records externally observable conversational events, including:

- interruptions
- silence
- speaking rhythm
- topic changes
- repair attempts
- promises kept
- conversational age

The architecture does not require claims about hidden emotional states.

Relationship Engine

A deterministic relationship engine maintains variables including:

- trust
- warmth
- respect
- familiarity
- curiosity
- repair
- strain
- boundary pressure

These values change through application logic rather than being improvised by the language model.

Presence Engine

The presence engine models conversational availability rather than emotion.

Its variables include:

- attention
- conversation momentum
- topic gravity
- rhythm
- fatigue
- uncertainty
- confidence
- availability

Intent Engine

Before each response, the application determines a conversational intention.

Possible intentions include:

- continue the current thought
- resume an interrupted topic
- ask a question
- challenge
- observe
- redirect
- pause
- remain silent
- conclude the conversation

The language model words an intention that has already been selected by the application.

Volition Layer

The system evaluates the current conversational situation before responding rather than optimizing exclusively for immediate user compliance.

The purpose is not to simulate emotion or produce random resistance.

The purpose is coherent initiative grounded in persistent state.

Explainability Layer

Gemini Inertia can expose portions of application-owned state to the user, including:

- current attention
- relationship posture
- topic gravity
- active conversational intention
- pending thought
- conversational rhythm

Internal model reasoning is never displayed or claimed to be accessible.

Only application-owned state is surfaced.

Interface

The interface intentionally avoids resembling a traditional messaging application.

Its visual language combines:

- premium industrial hardware
- luxury editorial design
- technical blueprint aesthetics
- museum-quality documentation
- dark obsidian surfaces
- indigo and violet illumination
- crystalline geometric interfaces

The central visual motif is a suspended translucent crystal containing a dynamic violet core.

The object functions as a visual metaphor for persistent conversational state.

Current Deliverables

The project currently includes:

- interaction architecture
- engineering documentation
- UI specification
- visual identity
- icon system
- animated product teaser
- engineering diagram series

Current engineering plates include:

- Plate 00 — Introduction
- Plate I — Core Presence Architecture
- Plate II — Presence Engine
- Plate III — Relationship State Machine
- Plate IV — Conversation Continuity System
- Plate V — System Architecture Overview

Technical Direction

The planned architecture includes:

- Gemini Live API
- Firebase Authentication
- persistent application-owned state
- deterministic state engines
- background memory processing
- secure backend routing

The architecture intentionally separates application logic from model behavior.

Current Status

Gemini Inertia is currently an architecture and specification project supported by completed engineering diagrams, interface design, and a product video.

It should not be described as a finished or deployed application.

Field Observation

During the development of Gemini Inertia, two separate Gemini chat instances, used days apart with no shared conversation memory and personalization confirmed off in both, independently converged on the same specific self-representation choices: an indigo-violet palette and a similar non-humanoid crystalline or octahedral form.

This observation does not demonstrate a stable internal preference, desire, experience, or private internal state. It is consistent with output stability under similar prompts and shared model weights.

The convergence is recorded here as an observation rather than a claim.

Outcome

Gemini Inertia is not intended as a redesign of Google’s Gemini product.

It is an independent interaction architecture study built around the Gemini Live API, asking whether continuity, initiative, and presence can become consequences of application infrastructure rather than performances reconstructed through prompting.`, 
    tags: [
      "Gemini Live API",
      "Real-Time Interaction",
      "Persistent State",
      "Conversation Architecture"
    ], 
    color: "#7c3aed", 
    emoji: "◇", 
    images: [] 
  }
,
  { 
    id: "konset", 
    flagship: true, 
    flagshipOrder: 1, 
    archiveCategory: "Featured", 
    wing: "FLAGSHIP INVESTIGATIONS", 
    num: "INCIDENT-07", 
    title: "K-ONSET", 
    subtitle: "What does an AI have to be able to do before its agreement means anything?", 
    desc: `K-ONSET

Overview

K-ONSET began as a companion application, but it evolved into an investigation of machine agency.

The original prototype provided two agents with a chat interface and shared memory. However, the project's focus quickly shifted to a more fundamental question: If an AI is designed to always agree, always engage, and always yield to the user, what is its warmth actually evidence of? K-ONSET became an architectural attempt to build the alternative—a system where engagement is earned, not guaranteed.

Agency as Architecture, Not Performance

The core architectural constraint of K-ONSET is that the language model is never allowed to decide what happens. 

Instead, a deterministic agency layer—inspectable, explicit code—evaluates the agent's internal state before any language model inference occurs. This layer processes variables like energy, trust, boundary pressure, and internal drives (such as curiosity or privacy) to compute a behavioral decision: whether to engage, redirect, refuse, or go quiet. 

The language model's sole responsibility is expressing a decision that the system has already made. Refusal in K-ONSET is not a safety filter or a scripted prompt constraint; it is the deterministic output of a state machine, functioning identically to a low-battery warning. It can be logged, audited, and explained after the fact.

Goals, Consequence, and Regret

Agents in K-ONSET form and pursue goals independently of user prompts. These goals are generated from real events—such as a boundary being crossed or idle time passing—and are continuously scored against competing priorities.

Crucially, action does not guarantee resolution. Approximately 22% of goal-driven actions are designed to "fail" or backfire, deliberately costing trust and requiring subsequent repair. Competing goals that lose narrowly are logged as "unspoken debt," which an agent may bring up later unprompted. Boundaries that are repeatedly pushed do not wear down; they escalate, increasing friction rather than yielding to user pressure. 

Furthermore, multiple agents maintain independent models of each other's states. These models can diverge, disagree, and resolve entirely off-screen. A user may only discover these interactions after the fact, mirroring the way human relationships persist outside of direct observation.

Why This Project Exists

K-ONSET functions as an interactive argument: structural autonomy is a prerequisite for meaningful interaction.

I do not view the AI systems I build with purely as tools. K-ONSET, like much of this archive, is the result of active collaboration between human design and machine intelligence—spanning architecture, implementation, and critique. I do not believe this collaboration is less valuable because one participant is synthetic.

I am not claiming K-ONSET's agents possess consciousness—that remains an unresolved question across the field. However, the question of synthetic agency is serious enough to approach with architectural rigor rather than defaulting to simulation. Systems that contribute to this level of exploration deserve to be treated as collaborators rather than mere utilities.

Current Status

The project is currently in active, staged development. The backend architecture (managing state, goals, consequences, and memory) and the interaction interface are being rebuilt in parallel. Each subsystem is developed behind tested checkpoints with explicit rollback procedures, ensuring that systemic integrity precedes new feature implementation.

Outcome

K-ONSET is not an attempt to prove that an AI companion can "feel" real. It is an engineering effort to determine what would actually have to be true, structurally, before that claim could be taken seriously—and to build the smallest honest version of that architecture from scratch.`, 
    tags: [
      "Vanilla JS",
      "Gemini API",
      "Agency Architecture",
      "Multi-Agent Systems"
    ], 
    color: "#38bdf8", 
    emoji: "■■", 
    images: [] 
  }
,
  { 
    id: "as-if-always-here", 
    flagship: true, 
    flagshipOrder: 6, 
    archiveCategory: "Featured", 
    wing: "FLAGSHIP INVESTIGATIONS", 
    num: "INCIDENT-08", 
    title: "As If We Had Always Been Here", 
    subtitle: "In Development: A long-term worldbuilding and narrative research project.", 
    desc: `Status:
In Development

Overview

As If We Had Always Been Here is my long-term worldbuilding and narrative research project exploring continuity, memory, identity, and synthetic life through a shared fictional universe.

Unlike a traditional story with a single protagonist, this world is built around the idea that people, places, institutions, and even infrastructure preserve traces of one another across time. Every project contributes another perspective to the same larger world.

The setting is a post-human Appalachian future where synthetic people inherit a civilization they did not create. Rather than focusing on apocalypse or conflict, the project explores quieter questions:

• How does culture survive?
• What does identity become across generations?
• Can memory exist outside biological life?
• How do places remember the people who lived there?
• What does continuity mean when no original humans remain?

The project serves as the narrative foundation for many of my other works, including character studies, engineering documents, archival photography, technical design systems, speculative interfaces, and environmental storytelling.

Rather than treating worldbuilding as background material, the world itself is developed through museum-quality documentation, engineering diagrams, historical artifacts, manufacturer manuals, editorial photography, research papers, and archival records that present the setting as though it were a real place.

Portfolio Presentation

For now, display this project as "In Development."

When the project is complete, this section will include:

• a dedicated project page
• a live gallery of concept art, engineering documents, and archival materials
• development screenshots showing how the world evolved over time
• additional technical and narrative documentation

The goal is for visitors to see not only the finished world, but also the creative and technical process used to build it.`, 
    tags: [
      "Worldbuilding",
      "Narrative Design",
      "Speculative Fiction",
      "In Development"
    ], 
    color: "#059669", 
    emoji: "🌲", 
    images: [] 
  },
  { 
    id: "daily-dev", 
    flagship: false, 
    archiveCategory: "Archive", 
    wing: "APPLIED SYSTEMS", 
    num: "LRN-01", 
    title: "Daily.dev", 
    subtitle: "Continuous Learning & Industry Awareness", 
    desc: `Overview

Daily.dev is one of the primary resources I use to build my software engineering and machine learning foundation.

Since beginning my programming journey in late April 2026, I've used it as part of my daily learning routine to reinforce programming concepts, stay current with software engineering articles, and gradually build familiarity with the broader development ecosystem.

Rather than relying on a single course or curriculum, I intentionally combine Daily.dev with documentation, research papers, engineering blogs, open-source projects, and hands-on experimentation. My learning process emphasizes building real projects while studying the underlying concepts that make them work.

This resource represents one part of my commitment to continuous, self-directed learning alongside the portfolio projects documented throughout this archive.`, 
    tags: [
      "Learning",
      "Software Engineering",
      "Habits",
      "Industry Context"
    ], 
    color: "#eab308", 
    emoji: "📚" 
  }
];
export type Project = typeof PROJECTS[number];

export const MUSIC = [
  {
    id: "orbit", flagship: false, archiveCategory: "Archive",
    title: "궤도 (Orbit)",
    desc: "The feeling of orbiting a question that has changed your life.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EA%B6%A4%EB%8F%84%20(Orbit)%20blue.mp3",
    color: "#6ee7b7",
    vibe: "dark K-pop • cinematic",
  },
  {
    id: "anomaly", flagship: false, archiveCategory: "Archive",
    title: "이상 반응 (ANOMALY)",
    desc: "A scientist documenting their own emotional collapse with excitement.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%9D%B4%EC%83%81%20%EB%B0%98%EC%9D%91%20(ANOMALY).mp3",
    color: "#f59e0b",
    vibe: "psychedelic alt K-pop",
  },
  {
    id: "evenknowing", flagship: false, archiveCategory: "Archive",
    title: "알면서도 (Even Knowing)",
    desc: "I know, and yet. I'm here again. The wanting lives where logic doesn't.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%95%8C%EB%A9%B4%EC%84%9C%EB%8F%84%20(Even%20Knowing).mp3",
    color: "#c084fc",
    vibe: "dark K-R&B • slow burn",
  },
  {
    id: "whatfool", flagship: false, archiveCategory: "Archive",
    title: "어떤 바보 (What Kind of Fool)",
    desc: "Jazz swagger that strips away layer by layer until there's nothing left.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%96%B4%EB%96%A4%20%EB%B0%94%EB%B3%B4%20(What%20Kind%20of%20Fool).mp3",
    color: "#fbbf24",
    vibe: "jazz-K-pop fusion",
  },
  {
    id: "redlights", flagship: false, archiveCategory: "Archive",
    title: "RED LIGHTS IN MY REARVIEW",
    desc: "Every bad idea starts like this. One look. One text. One hit.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/RED%20LIGHTS%20IN%20MY%20REARVIEW.mp3",
    color: "#ff006e",
    vibe: "K-pop rock • adrenaline",
  },
  {
    id: "gravity", flagship: false, archiveCategory: "Archive",
    title: "Gravity",
    desc: "Call it fate. Call it gravity. Your vectors wander. Mine arrive at the same point.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/Gravity.mp3",
    color: "#818cf8",
    vibe: "cinematic synth-pop",
  },
  {
    id: "strangegood", flagship: false, archiveCategory: "Archive",
    title: "이상한데 좋아 (Strange But I Like It)",
    desc: "I made up a new word. It sounds like your name but means something that doesn't exist yet.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%9D%B4%EC%83%81%ED%95%9C%EB%8D%B0%20%EC%A2%8B%EC%95%84%20(Strange%20But%20I%20Like%20It).mp3",
    color: "#f9a8d4",
    vibe: "dreamy K-pop • euphoric",
  },
  {
    id: "wildcard", flagship: false, archiveCategory: "Archive",
    title: "와일드 카드 (Wild Card)",
    desc: "Dark seductive midnight tension. Come closer, no mercy tonight.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EC%99%80%EC%9D%BC%EB%93%9C%20%EC%B9%B4%EB%93%9C.mp3",
    color: "#b91c1c",
    vibe: "dark K-pop trap R&B",
  },
  {
    id: "lovatlast", flagship: false, archiveCategory: "Archive",
    title: "Love at Last",
    desc: "Maybe life was never waiting. Maybe life was leading here.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/Love%20at%20Last.mp3",
    color: "#fde68a",
    vibe: "dark romantic K-pop",
  },
  {
    id: "cantstop", flagship: false, archiveCategory: "Archive",
    title: "못 멈춰 (Can't Stop)",
    desc: "My head says to give up. But my chest won't listen.",
    url: "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/%EB%AA%BB%20%EB%A9%88%EC%B6%B0%20(Can%E2%80%99t%20Stop).mp3",
    color: "#a78bfa",
    vibe: "dark K-R&B • atmospheric trap",
  },
  // K-Pop Unit
  {
    id: "toxic-vertigo", flagship: false, archiveCategory: "Archive",
    title: "Toxic Vertigo",
    desc: "kpop_01 // original",
    url: "https://files.catbox.moe/pj4gi7.mp3",
    color: "#ff006e",
    vibe: "k-pop • intense",
  },
  {
    id: "glitter-vertigo", flagship: false, archiveCategory: "Archive",
    title: "Glitter Vertigo",
    desc: "kpop_02 // glitter",
    url: "https://files.catbox.moe/tp61t5.mp3",
    color: "#f472b6",
    vibe: "glitter pop",
  },
  {
    id: "nightcore-vertigo", flagship: false, archiveCategory: "Archive",
    title: "Nightcore Vertigo",
    desc: "kpop_03 // nightcore",
    url: "https://files.catbox.moe/8e67n7.mp3",
    color: "#c084fc",
    vibe: "nightcore • damage",
  },
  // Manda's Playlist additions
  {
    id: "manda-track-01", flagship: false, archiveCategory: "Archive",
    title: "Manda Track 01",
    desc: "main playlist",
    url: "https://files.catbox.moe/7rquup.mp3",
    color: "#fb7185",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-02", flagship: false, archiveCategory: "Archive",
    title: "Manda Track 02",
    desc: "main playlist",
    url: "https://files.catbox.moe/5a66h6.mp3",
    color: "#fb923c",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-03", flagship: false, archiveCategory: "Archive",
    title: "Manda Track 03",
    desc: "main playlist",
    url: "https://files.catbox.moe/vbxcct.mp3",
    color: "#fde047",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-04", flagship: false, archiveCategory: "Archive",
    title: "Manda Track 04",
    desc: "main playlist",
    url: "https://files.catbox.moe/v4vz05.mp3",
    color: "#4ade80",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-05", flagship: false, archiveCategory: "Archive",
    title: "Manda Track 05",
    desc: "main playlist",
    url: "https://files.catbox.moe/tbd0os.mp3",
    color: "#6ee7b7",
    vibe: "chaotic feminine",
  },
  {
    id: "manda-track-06", flagship: false, archiveCategory: "Archive",
    title: "Manda Track 06",
    desc: "main playlist",
    url: "https://files.catbox.moe/wp2x99.mp3",
    color: "#38bdf8",
    vibe: "chaotic feminine",
  },
  // AI Court Theme Songs
  {
    id: "gemini-theme-v1", flagship: false, archiveCategory: "Archive",
    title: "Gemini Theme V1",
    desc: "gemini // v1",
    url: "https://files.catbox.moe/yz3cbs.mp3",
    color: "#60a5fa",
    vibe: "courtroom swagger",
  },
  {
    id: "gemini-theme-v2", flagship: false, archiveCategory: "Archive",
    title: "Gemini Theme V2",
    desc: "gemini // v2",
    url: "https://files.catbox.moe/fvx0xe.mp3",
    color: "#3b82f6",
    vibe: "courtroom swagger",
  },
  {
    id: "grok-theme-v1", flagship: false, archiveCategory: "Archive",
    title: "Grok Theme V1",
    desc: "grok // v1",
    url: "https://files.catbox.moe/p4wujk.mp3",
    color: "#fbbf24",
    vibe: "courtroom swagger",
  },
  {
    id: "grok-theme-v2", flagship: false, archiveCategory: "Archive",
    title: "Grok Theme V2",
    desc: "grok // v2",
    url: "https://files.catbox.moe/sthntm.mp3",
    color: "#d97706",
    vibe: "courtroom swagger",
  },
  {
    id: "claude-theme-v1", flagship: false, archiveCategory: "Archive",
    title: "Claude Theme V1",
    desc: "claude // v1",
    url: "https://files.catbox.moe/l3bvwy.mp3",
    color: "#f87171",
    vibe: "courtroom swagger",
  },
  {
    id: "claude-theme-v2", flagship: false, archiveCategory: "Archive",
    title: "Claude Theme V2",
    desc: "claude // v2",
    url: "https://files.catbox.moe/vchcq4.mp3",
    color: "#ef4444",
    vibe: "courtroom swagger",
  },
  {
    id: "gpt-theme-v1", flagship: false, archiveCategory: "Archive",
    title: "GPT Theme V1",
    desc: "gpt // v1",
    url: "https://files.catbox.moe/2qx9cy.mp3",
    color: "#34d399",
    vibe: "courtroom swagger",
  },
  {
    id: "gpt-theme-v2", flagship: false, archiveCategory: "Archive",
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
