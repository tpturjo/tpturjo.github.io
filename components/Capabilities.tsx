const capabilities = [
  {
    index: "01 / Software Development",
    title: "Software Development",
    description:
      "Build and maintain software across backend, full-stack, and web environments, with experience working on APIs, application architecture, testing, authentication, external integrations, and production-facing systems.",
    technologies:
      "Python · JavaScript · TypeScript · Node.js · Express · React · REST APIs · HTML · CSS · Tailwind CSS · Vite · PHP",
  },
  {
    index: "02 / AI & Data",
    title: "AI & Data",
    description:
      "Develop applied AI and data-driven systems that combine machine learning, NLP, data processing, analysis, and visualization with practical application logic.",
    technologies:
      "Python · scikit-learn · spaCy · Pandas · NumPy · Jupyter · NLP · Machine Learning · Data Analysis · Data Visualization",
  },
  {
    index: "03 / Data Systems",
    title: "Databases & Data Systems",
    description:
      "Design and work with relational and document-based data systems, from schema modelling and SQL queries to database-backed applications and data-processing workflows.",
    technologies:
      "SQL · MySQL · SQLite · MongoDB · Relational Modelling · ER Modelling · Data Processing",
  },
  {
    index: "04 / Research Software",
    title: "Research & Scientific Software",
    description:
      "Build software that supports research workflows, reproducibility, scientific data access, statistical analysis, and communication of research results.",
    technologies:
      "R · Quarto · Research APIs · Reproducible Workflows · Statistical Analysis · Scientific Data · Research Software",
  },
  {
    index: "05 / Interactive Systems",
    title: "Interactive & Systems Development",
    description:
      "Build real-time and interactive systems involving application state, behavioural logic, movement, visual effects, interfaces, and performance-sensitive components.",
    technologies:
      "C++ · SFML · Three.js · Finite State Machines · Steering Behaviours · ECS · Interactive Systems",
  },
  {
    index: "06 / Development Practice",
    title: "Development Practice",
    description:
      "Work within collaborative development processes involving planning, version control, reviews, testing, documentation, and iterative delivery.",
    technologies:
      "Git · GitHub · GitLab · Agile · Scrum · Kanban · Code Review · Pull Requests · UML · Unit Testing · API Testing · Postman · Linux",
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="mx-auto w-full max-w-7xl px-margin py-space-2xl lg:px-margin-desktop"
    >
      <div className="mb-space-xl border-b border-border-hairline pb-space-sm">
        <span className="mb-1 block font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
          Domain Competency
        </span>
        <h2 className="font-serif text-headline-lg text-ink-primary">Technical Capabilities</h2>
      </div>

      <style>{`
        .capability-rule {
          display: inline-block;
          width: 18px;
          height: 1px;
          flex: none;
          background: var(--color-forest-moss);
          transition: width 250ms ease-out;
        }
        .capability:hover .capability-rule {
          width: 34px;
        }
        .capability-divider {
          position: relative;
        }
        .capability-divider::after {
          content: "";
          position: absolute;
          top: -1px;
          left: 0;
          width: 46%;
          height: 1px;
          background: var(--color-forest-moss);
          transform: scaleX(0);
          transform-origin: left center;
          pointer-events: none;
          transition: transform 320ms ease-out;
        }
        .capability:hover .capability-divider::after {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .capability-rule,
          .capability:hover .capability-rule,
          .capability-divider::after,
          .capability:hover .capability-divider::after {
            transition: none;
          }
          .capability:hover .capability-rule {
            width: 18px;
          }
          .capability:hover .capability-divider::after {
            transform: scaleX(0);
          }
        }
      `}</style>
      <div className="grid grid-cols-1 gap-x-12 gap-y-space-lg md:grid-cols-2 lg:gap-x-16">
        {capabilities.map((capability, index) => (
          <article
            key={capability.index}
            className={`capability group/cap flex h-full flex-col justify-between motion-safe:transition-colors motion-safe:duration-[220ms] motion-safe:ease-out hover:bg-[#F4F6F3] ${
              index > 1 ? "border-t border-border-hairline pt-space-md hover:border-stone-sand" : ""
            } ${index === 1 ? "max-md:border-t max-md:border-border-hairline max-md:pt-space-md max-md:hover:border-stone-sand" : ""}`}
          >
            <div>
              <span className="mb-2 inline-flex items-center gap-2 font-meta-mono text-meta-mono font-medium tracking-wider text-forest-moss uppercase motion-safe:transition-colors motion-safe:duration-[250ms] motion-safe:ease-out group-hover/cap:text-forest-deep">
                <span aria-hidden="true" className="capability-rule" />
                {capability.index}
              </span>
              <h3 className="mb-3 font-serif text-2xl font-normal text-ink-primary">{capability.title}</h3>
              <p className="mb-4 text-body-sm leading-relaxed text-ink-secondary">{capability.description}</p>
            </div>
            <div>
              <div className="capability-divider my-3 border-t border-border-hairline motion-safe:transition-colors motion-safe:duration-[220ms] group-hover/cap:border-stone-sand" />
              <ul className="flex min-w-0 flex-wrap gap-1.5">
                {capability.technologies.split(" · ").map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[2px] border border-border-hairline bg-transparent px-2 py-0.5 font-meta-mono text-label-code text-ink-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
