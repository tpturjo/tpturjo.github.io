type LinkTone = "primary" | "forest" | "muted";

type PendingLink = {
  label: string;
  href: string;
  tone: LinkTone;
};

type VideoAction = {
  label: string;
  href: string;
  title: string;
  caption: string;
};

type MediaPreview = {
  title: string;
  videoId: string;
  embedSrc?: string;
};

type SpotlightProject = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  links: PendingLink[];
};

type SelectedProject = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  media?: MediaPreview;
  actions: Array<PendingLink | VideoAction>;
};

type AdditionalProject = {
  index: string;
  name: string;
  description: string;
  links: PendingLink[];
  videos?: VideoAction[];
  note?: string;
};

const spotlightProjects: SpotlightProject[] = [
  {
    index: "01 · Honours Thesis · Research Software · 2025–2026",
    name: "Nature’s Palette",
    tagline:
      "“From a browser-based spectral repository to programmable research infrastructure.”",
    description:
      "Extended an existing biological spectral-data platform with a language-agnostic REST API and naturepaletteR, an R package that lets researchers search datasets, inspect structured metadata, and download research data directly inside reproducible R workflows. The new API layer works with the platform’s existing Node.js, Express, and MongoDB architecture while preserving the original web experience.",
    tags: ["Node.js", "Express", "MongoDB", "R", "REST APIs"],
    links: [
      { label: "Research Platform", href: "http://134.87.9.138/", tone: "primary" },
      { label: "R Package", href: "https://github.com/tpturjo/naturepaletteR", tone: "primary" },
      {
        label: "Honours Thesis",
        href: "/projects/natures-palette/honours-thesis.pdf",
        tone: "primary",
      },
      {
        label: "Presentation",
        href: "/projects/natures-palette/presentation.pdf",
        tone: "primary",
      },
    ],
  },
  {
    index: "02 · Applied AI · NLP · 2025",
    name: "AI Employee Scheduler",
    tagline: "“Turning everyday employee requests into structured scheduling decisions.”",
    description:
      "Built an end-to-end scheduling prototype that interprets natural-language availability and shift requests, extracts scheduling information, and converts it into constraints for roster generation. The system combines machine-learning intent classification, spaCy-based information extraction, and deterministic scheduling logic for conflicts, workload balancing, fairness, and shift assignment.",
    tags: ["Python", "scikit-learn", "spaCy", "Streamlit"],
    links: [
      {
        label: "Live Application",
        href: "https://ai-employee-scheduler1.streamlit.app/",
        tone: "primary",
      },
      { label: "GitHub", href: "https://github.com/tpturjo/ai-employee-scheduler", tone: "forest" },
    ],
  },
];

const LAST_FIRE_VIDEO_ID = "qAjsH7YrajQ";
const GYM_PRESENTATION_VIDEO_ID = "P8wDpish9nA";

function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

const selectedProjects: SelectedProject[] = [
  {
    index: "03 · Game Development · Interactive Systems · 2024",
    name: "One Man Army",
    tagline: "“A complete top-down action game engineered without a commercial game engine.”",
    description:
      "Built as a three-person project in C++ and SFML around an Entity-Component-System architecture. The game combines multiple levels, combat, enemy AI, inventory, progression, lighting, and visual effects. My work focused on menu systems, layered parallax backgrounds, particle effects, and the progression framework connecting the full game experience.",
    tags: ["C++", "SFML", "ImGui", "ECS"],
    media: {
      title: "One Man Army - Gameplay",
      videoId: "kkJ6LuliTpA",
    },
    actions: [
      {
        label: "Trailer ▶",
        href: "https://www.youtube.com/watch?v=kkJ6LuliTpA",
        title: "One Man Army - Trailer",
        caption:
          "Complete gameplay trailer showcasing combat, level progression, and enemy AI.",
      },
      { label: "Presentation", href: "https://www.youtube.com/watch?v=aJQrVvM_b1g", tone: "primary" },
    ],
  },
  {
    index: "04 · Database Engineering · Relational Modelling · 2024",
    name: "Child Welfare Database System",
    tagline: "“Connecting complex child-welfare data through a structured relational model.”",
    description:
      "Designed a normalized relational database connecting information about child labour, education, NGOs, regions, and local crises. The project used ER modelling, relationship and cardinality design, referential integrity, SQL querying, and a PHP/MySQL interface for creating, updating, exploring, and retrieving records.",
    tags: ["MySQL", "SQL", "PHP", "ER Modelling"],
    actions: [
      { label: "GitHub", href: "https://github.com/fazoha/Child-Labour-Database-Comp-4754", tone: "forest" },
    ],
  },
  {
    index: "05 · Behavioural AI · Autonomous Systems · 2024",
    name: "The Last Fire: Horizon’s Reach",
    tagline:
      "“A browser-based survival game where autonomous creatures react to the player and environment.”",
    description:
      "Built as a two-person Three.js survival game combining resource gathering, combat, environmental systems, pathfinding, and autonomous wildlife. My work focused on behavioural AI using finite-state-machine decision making, Wander and Seek steering behaviours, and whisker-based collision avoidance to create responsive creature movement.",
    tags: ["Three.js", "JavaScript", "Finite State Machines", "Steering Behaviours"],
    media: {
      title: "The Last Fire - Gameplay Demo",
      videoId: LAST_FIRE_VIDEO_ID,
    },
    actions: [
      {
        label: "Gameplay ▶",
        href: "https://www.youtube.com/watch?v=qAjsH7YrajQ",
        title: "The Last Fire - Gameplay Demo",
        caption: "Gameplay video.",
      },
    ],
  },
  {
    index: "06 · Data Analytics · Trend Analysis · 2024",
    name: "Community Gym Insights Dashboard",
    tagline:
      "“Exploring how a community fitness facility is used through data and interactive visualization.”",
    description:
      "Analyzed participation data to understand when the facility is busiest, who uses it, and how activity changes over time. The project examines seasonal, demographic, residency, and facility-usage patterns through interactive dashboards, traffic heatmaps, and regression-based trend analysis.",
    tags: ["Python", "Pandas", "Regression", "Interactive Visualization"],
    media: {
      title: "Community Gym Insights - Presentation Video",
      videoId: GYM_PRESENTATION_VIDEO_ID,
    },
    actions: [
      {
        label: "Presentation",
        href:  "https://www.youtube.com/watch?v=P8wDpish9nA",
        tone: "primary",
      },
      {
        label: "GitHub",
        href: "https://github.com/tpturjo/Community-Gym-Insights-Dashboard",
        tone: "forest",
      },
    ],
  },
];

const additionalProjects: AdditionalProject[] = [
  {
    index: "07 · Collaborative Software Development · 2023",
    name: "Performance Review Web Application",
    description:
      "Team-built review platform used to practise the complete software-development lifecycle: requirements, sprint planning, Scrum, Kanban, UML, code reviews, testing, QA, and iterative releases, implemented with Python, Bottle, and SQLite.",
    links: [
      { label: "GitHub", href: "https://github.com/tpturjo/Performance-Review-Web-Application", tone: "forest" },
      {
        label: "Documentation",
        href: "https://github.com/tpturjo/Performance-Review-Web-Application/tree/master/docs",
        tone: "muted",
      },
    ],
  },
  {
    index: "08 · Backend Engineering · 2024",
    name: "Stock Trading Game",
    description:
      "Full-stack virtual trading game using real stock-price data, REST APIs, authentication, game sessions, virtual portfolios, and transaction logic. Built with Node.js and Express using MVC architecture, with 26 unit tests covering core trading and application behaviour.",
    videos: [
      {
        label: "Watch Demo ▶",
        href: "https://drive.google.com/file/d/17b_XvBdmI8xFBJ6RI-oeieIB6wUiixTY/view?usp=sharing",
        title: "Stock Trading Game Demo",
        caption:
          "Virtual portfolio simulation, REST API quote streaming, and unit test execution suite in Node.js / Express.",
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/tpturjo/Stock-Trading-game", tone: "forest" }],
  },
  {
    index: "09 · Game Systems · 2023",
    name: "Apódosi",
    description:
      "Feature-rich 2D RPG developed as a team project. My work focused on collision response, animation, camera behaviour, particle effects, and UI/HUD systems while contributing to the integration of the game’s broader combat, physics, abilities, and visual systems.",
    videos: [
      {
        label: "Trailer ▶",
        href: "https://youtu.be/ekdjXX7HOCM",
        title: "Apódosi 2D RPG Trailer",
        caption:
          "C++ game loop, collision response, animated camera and particle systems walkthrough.",
      },
    ],
    links: [],
  },
  {
    index: "10 · Object-Oriented Programming · 2023",
    name: "Simple ATM Application",
    description:
      "Desktop ATM simulation built around object-oriented design, separating accounts, transactions, and interface behaviour through encapsulation, inheritance, abstraction, and polymorphism with a Java Swing interface.",
    links: [
      { label: "GitHub", href: "https://github.com/tpturjo/Simple-ATM-Application", tone: "forest" },
    ],
    note: "Java Swing OOP",
  },
];

const actionRowClass =
  "mt-space-md flex flex-wrap items-center gap-x-space-md gap-y-2 border-t border-border-hairline pt-space-sm font-meta-mono text-label-code";

const presentationLinks: PendingLink[] = [
  {
    label: "Watch Presentation",
    href: "https://youtu.be/GUofbMZWf8Q?si=y1W0uHRvERMXNeY1",
    tone: "primary",
  },
];

const projectCardClass =
  "project-card group/card relative border border-border-hairline bg-surface-card motion-safe:transition-[border-color,background-color,transform] motion-safe:duration-[220ms] motion-safe:ease-out hover:border-stone-sand has-[:is(a,button):focus-visible]:border-stone-sand hover:bg-[#F4F6F3] has-[:is(a,button):focus-visible]:bg-[#F4F6F3] motion-safe:hover:-translate-y-px motion-safe:has-[:is(a,button):focus-visible]:-translate-y-px";

const toneClass: Record<LinkTone, string> = {
  primary: "text-ink-primary",
  forest: "text-forest-deep",
  muted: "text-ink-muted",
};

function isVideoAction(action: PendingLink | VideoAction): action is VideoAction {
  return "title" in action;
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full border-y border-border-hairline bg-surface-subtle py-space-2xl"
    >
      <style>{`
        .project-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 58%;
          height: 1px;
          background: var(--color-forest-moss);
          transform: scaleX(0);
          transform-origin: left center;
          pointer-events: none;
          transition: transform 320ms ease-out;
        }
        .project-card:hover::before,
        .project-card:has(:is(a, button):focus-visible)::before {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .project-card::before,
          .project-card:hover::before,
          .project-card:has(:is(a, button):focus-visible)::before {
            transition: none;
            transform: scaleX(0);
          }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-margin lg:px-margin-desktop">
        <div className="mb-space-xl flex flex-col justify-between border-b border-border-hairline pb-space-sm md:flex-row md:items-end">
          <div>
            <span className="mb-1 block font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
              Selected Work
            </span>
            <h2 className="font-serif text-headline-lg text-ink-primary">Projects</h2>
          </div>
          <a
            href="https://github.com/tpturjo"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-2 inline-flex items-center gap-1 font-meta-mono text-label-code text-forest-moss no-underline motion-safe:transition-colors motion-safe:duration-[170ms] motion-safe:ease-out hover:text-forest-deep focus-visible:text-forest-deep md:mt-0"
          >
            <span className="relative">
              More work on GitHub
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
              />
            </span>
            <ArrowOutIcon />
          </a>
        </div>

        <div className="mb-space-xl space-y-space-md">
          {spotlightProjects.map((project) => (
            <article
              key={project.name}
              className={`${projectCardClass} rounded p-space-lg`}
            >
              <p className="mb-2 font-meta-mono text-label-code font-semibold tracking-wider text-forest-moss uppercase">
                {project.index}
              </p>
              <h3 className="mb-1.5 font-serif text-2xl font-semibold text-ink-primary lg:text-3xl">
                {project.name}
              </h3>
              <p className="mb-space-sm font-serif text-base text-forest-moss italic">
                {project.tagline}
              </p>
              <p className="mb-space-md max-w-4xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                {project.description}
              </p>
              <TagList tags={project.tags} />
              <ActionRow links={project.links} />
            </article>
          ))}
        </div>

        <div className="mb-space-xl">
          <div className="mb-space-md border-b border-border-hairline pb-2">
            <span className="font-meta-mono text-label-code font-semibold tracking-widest text-forest-moss uppercase">
              Selected Technical Projects
            </span>
          </div>
          <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-2">
            {selectedProjects.map((project) => (
              <article
                key={project.name}
                className={`${projectCardClass} flex flex-col justify-between rounded p-space-lg`}
              >
                <div>
                  <p className="mb-space-xs font-meta-mono text-label-code font-semibold text-forest-moss uppercase">
                    {project.index}
                  </p>
                  <h3 className="mb-1 font-serif text-headline-md text-ink-primary">{project.name}</h3>
                  <p className="mb-space-sm text-body-sm text-forest-moss italic">{project.tagline}</p>
                  {project.media ? <MediaFrame media={project.media} /> : null}
                  <p className="mb-space-md text-body-sm leading-relaxed text-ink-secondary">
                    {project.description}
                  </p>
                  <TagList tags={project.tags} />
                </div>
                <ActionRow actions={project.actions} />
              </article>
            ))}
          </div>
        </div>

        <div className="border-t border-border-hairline pt-space-md">
          <div className="mb-space-md flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-meta-mono text-label-code font-semibold tracking-widest text-forest-moss uppercase">
              Additional Systems & Course Projects
            </span>
            <span className="font-label-code text-label-code text-ink-muted">
              2023–2024 Academic & Systems Work
            </span>
          </div>
          <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
            {additionalProjects.map((project) => (
              <article
                key={project.name}
                className={`${projectCardClass} flex flex-col justify-between rounded p-space-md`}
              >
                <div>
                  <span className="mb-1 block font-meta-mono text-[10px] font-semibold text-forest-moss uppercase">
                    {project.index}
                  </span>
                  <h4 className="mb-1 text-body-md font-semibold text-ink-primary">{project.name}</h4>
                  <p className="mb-3 text-xs leading-relaxed text-ink-secondary">{project.description}</p>
                </div>
                <AdditionalFooter project={project} />
              </article>
            ))}
          </div>

          <article className={`${projectCardClass} mt-space-md flex flex-col justify-between gap-space-md rounded p-space-md md:flex-row md:items-center`}>
            <div className="max-w-3xl">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-meta-mono text-label-code font-semibold text-forest-moss uppercase">
                  Technical Presentation
                </span>
                <span className="text-border-hairline" aria-hidden="true">
                  ·
                </span>
                <span className="font-meta-mono text-meta-mono text-ink-muted">
                  Machine Learning · Unsupervised Learning · March 2026
                </span>
              </div>
              <h4 className="mb-1.5 font-serif text-body-lg font-semibold text-ink-primary">
                Self-Organizing Maps (SOM)
              </h4>
              <p className="text-xs leading-relaxed text-ink-secondary sm:text-sm">
                Presented Self-Organizing Maps as an unsupervised neural-network approach for clustering
                and visualizing high-dimensional data. Covered competitive learning, Best Matching Units,
                neighborhood updates, topology preservation, key hyperparameters, and practical
                applications, supported by an interactive learning visualization.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center gap-3 border-t border-border-hairline pt-2 font-meta-mono text-label-code md:flex-col md:border-t-0 md:pt-0 lg:flex-row">
              {presentationLinks.map((link) => (
                <PendingLinkView key={link.label} link={link} emphasized />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function AdditionalFooter({ project }: { project: AdditionalProject }) {
  const hasResources = (project.videos?.length ?? 0) > 0 || project.links.length > 0 || Boolean(project.note);
  if (!hasResources) return null;

  return (
    <div className={actionRowClass}>
      {project.videos?.map((action) => (
        <VideoButton key={action.label} action={action} />
      ))}
      {project.links.map((link) => (
        <PendingLinkView key={link.label} link={link} />
      ))}
      {project.note ? <span className="text-[11px] text-ink-muted">{project.note}</span> : null}
    </div>
  );
}

function ActionRow({
  links = [],
  actions = [],
}: {
  links?: PendingLink[];
  actions?: Array<PendingLink | VideoAction>;
}) {
  const videos = actions.filter(isVideoAction);
  const textLinks = [...links, ...actions.filter((action): action is PendingLink => !isVideoAction(action))];

  if (videos.length === 0 && textLinks.length === 0) return null;

  return (
    <div className={actionRowClass}>
      {videos.map((action) => (
        <VideoButton key={action.label} action={action} />
      ))}
      {textLinks.map((link) => (
        <PendingLinkView key={link.label} link={link} />
      ))}
    </div>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex min-w-0 flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-[2px] border border-border-hairline bg-transparent px-2 py-0.5 font-meta-mono text-label-code text-ink-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function PendingLinkView({ link, emphasized = false }: { link: PendingLink; emphasized?: boolean }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex shrink-0 items-center gap-1 no-underline motion-safe:transition-colors motion-safe:duration-[170ms] motion-safe:ease-out hover:text-forest-deep focus-visible:text-forest-deep ${toneClass[link.tone]} ${
        emphasized ? "font-medium" : ""
      }`}
    >
      <span className="relative">
        {link.label}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
        />
      </span>
      <ArrowOutIcon />
    </a>
  );
}

function VideoButton({ action }: { action: VideoAction }) {
  const playMark = " ▶";
  const hasPlayMark = action.label.endsWith(playMark);
  const label = hasPlayMark ? action.label.slice(0, -playMark.length) : action.label;

  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1 font-medium text-ink-primary no-underline motion-safe:transition-colors motion-safe:duration-[170ms] motion-safe:ease-out hover:text-forest-deep focus-visible:text-forest-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-forest-moss"
      aria-label={`${action.title}. ${action.caption}`}
    >
      <span className="relative">
        {label}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
        />
      </span>
      {hasPlayMark ? (
        <span
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-focus-visible/link:translate-x-0.5"
        >
          ▶
        </span>
      ) : null}
    </a>
  );
}

function MediaFrame({ media }: { media: MediaPreview }) {
  return (
    <div className="mb-space-md overflow-hidden rounded border border-border-hairline bg-surface-subtle">
      <iframe
        className="aspect-video w-full"
        src={media.embedSrc ?? youtubeEmbedUrl(media.videoId)}
        title={media.title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function ArrowOutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3 motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-focus-visible/link:translate-x-0.5 motion-safe:group-focus-visible/link:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
