type ExperienceLink = {
  href: string;
  label: string;
};

type FeaturedRole = {
  organization: string;
  context?: string;
  badge?: string;
  title: string;
  dates: string;
  datesMuted: boolean;
  arrangement: string;
  paragraphs: string[];
  tags: string[];
  link?: ExperienceLink;
};

type TechnicalRole = {
  organization: string;
  context: string;
  title: string;
  dates: string;
  datesMuted: boolean;
  arrangement?: string;
  paragraphs: string[];
  tags: string[];
  link?: ExperienceLink;
};

type CommunityRole = {
  organization: string;
  subtitle?: string;
  title: string;
  dates: string;
  arrangement: string;
  description: string;
  tags: string[];
};

const recordInteraction =
  "group/record relative motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-[220ms] motion-safe:ease-out hover:bg-[#F4F6F3] has-[:is(a,button):focus-visible]:bg-[#F4F6F3] motion-safe:hover:-translate-y-px motion-safe:has-[:is(a,button):focus-visible]:-translate-y-px after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-forest-moss/70 after:content-[''] motion-safe:after:transition-transform motion-safe:after:duration-[360ms] motion-safe:after:ease-out hover:after:scale-x-100 has-[:is(a,button):focus-visible]:after:scale-x-100";

const cardInteraction = "hover:border-stone-sand has-[:is(a,button):focus-visible]:border-stone-sand";

const experienceCardClass = `${recordInteraction} ${cardInteraction} flex flex-col justify-between rounded border border-border-hairline bg-surface-card p-space-md`;

const organizationClass =
  "font-meta-mono text-label-code font-semibold text-forest-moss uppercase motion-safe:transition-colors motion-safe:duration-[220ms] motion-safe:ease-out group-hover/record:text-forest-deep group-has-[:is(a,button):focus-visible]/record:text-forest-deep";

const featured: FeaturedRole[] = [
  {
    organization: "Memorial University of Newfoundland",
    context: "Living Meta-Analysis · Department of Psychology",
    title: "Research Software Developer",
    dates: "November 2025 to April 2026",
    datesMuted: false,
    arrangement: "Part-time · Remote",
    paragraphs: [
      "Built a reproducible research website in R and Quarto for a living meta-analysis of the Weapon Focus Effect. The site connects the underlying study data and statistical analysis directly to the research report, allowing results and visualizations to be regenerated as the analysis evolves.",
      "Worked with real coded research data, effect-size calculations, multilevel meta-analysis, model outputs, and statistical visualizations, while also presenting the research in both technical and plain-language formats.",
    ],
    tags: ["R", "Quarto", "Meta-analysis", "Statistical Analysis", "Data Visualization"],
    link: {
      href: "https://github.com/jmfawcet/weaponfocus_pvt",
      label: "repo: weaponfocus_pvt",
    },
  },
  {
    organization: "Target Marketing & Communications",
    badge: "Co-operative Internship in Computer Science · Pass with Distinction",
    title: "Web Developer Co-op",
    dates: "January 2025 to August 2025",
    datesMuted: true,
    arrangement: "8-month Co-op",
    paragraphs: [
      "Worked across multiple client projects in a fast-paced agency environment, developing and improving production websites while coordinating closely with clients, account teams, developers, and project leads. Each project came with different requirements and deadlines, so the role involved understanding what was needed, implementing it carefully, and making sure changes were ready for production.",
      "The work also went beyond the websites themselves. I worked with external APIs, processed and cleaned data for operational needs, and used automation to make recurring tasks easier. For example, I built a workflow that tracked photo-licensing information and automatically notified the responsible team members when a license was approaching its expiry date.",
    ],
    tags: [
      "WordPress",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "APIs",
      "Python",
      "Jupyter",
      "Automation",
    ],
  },
];

const technical: TechnicalRole[] = [
  {
    organization: "Memorial University of Newfoundland",
    context: "Department of Emergency Medicine",
    title: "Web Developer",
    dates: "September 2025 to December 2025",
    datesMuted: false,
    arrangement: "Part-time · Remote",
    paragraphs: [
      "Maintained and improved the website for the Atlantic Emergency Research Organization (AERO), an Emergency Medicine research network across Atlantic Canada. Worked within the existing React codebase to fix issues, implement requested changes, update content and researcher information, and refine parts of the interface where needed to make the site cleaner and easier to navigate.",
      "Handled the site's technical upkeep and deployment through Vercel, while coordinating directly with the project lead on updates, feedback, and ongoing changes.",
    ],
    tags: ["React", "JavaScript", "Vite", "Tailwind CSS", "Vercel"],
  },
  {
    organization: "Memorial University of Newfoundland",
    context: "Department of Gender Studies",
    title: "Web Experience & Content Developer",
    dates: "September 2025 to April 2026",
    datesMuted: false,
    arrangement: "Part-time · Hybrid",
    paragraphs: [
      "Redesigned and restructured the department's outdated website using Memorial University's Terminalfour (T4) content management system. Reworked the site's navigation, page structure, content organization, and overall presentation to create a more current and accessible experience.",
      "Worked closely with faculty, undergraduate and graduate advisors, and other department stakeholders to understand what information needed to be updated and how different parts of the site should be organized. Coordinated with Memorial's Marketing & Communications team to keep the redesign aligned with university web and branding standards.",
    ],
    tags: [
      "Terminalfour (T4)",
      "Web Design",
      "Information Architecture",
      "Accessibility",
      "Content Management",
    ],
    link: {
      href: "https://www.mun.ca/genderstudies/",
      label: "mun.ca/gender-studies",
    },
  },
  {
    organization: "2025 Canada Games",
    context: "Technology Operations Centre",
    title: "Technology Support",
    dates: "July 2025 to August 2025",
    datesMuted: true,
    paragraphs: [
      "Supported day-to-day technology operations during the 2025 Canada Games from the Technology Operations Centre. Managed and checked equipment inventory, prepared devices for deployment, verified that equipment was working properly, and distributed it to the appropriate teams and personnel across the Games.",
      "Also provided first-line support for issues coming in from the field, troubleshooting problems with laptops, tablets, phones, printers, radios, and other equipment. Resolved issues where possible, and documented and routed more complex problems to the appropriate technical teams for further support.",
    ],
    tags: [
      "Technology Operations",
      "IT Support",
      "Troubleshooting",
      "Equipment & Inventory Management",
    ],
  },
  {
    organization: "Memorial University of Newfoundland",
    context: "Department of Biochemistry",
    title: "Data Analysis",
    dates: "May 2024 to August 2024",
    datesMuted: true,
    arrangement: "Seasonal · Hybrid",
    paragraphs: [
      "Worked with data from multiple sources to collect, filter, clean, and organize information for analysis. Built workflows to automate parts of the data collection and preparation process, including tasks that had previously required manual searching and collection.",
      "Also developed interactive visualizations and dashboards to make the resulting data easier to explore and interpret.",
    ],
    tags: [
      "Data Analysis",
      "Jupyter",
      "APIs",
      "Data Processing",
      "Automation",
      "Data Visualization",
    ],
  },
];

const community: CommunityRole[] = [
  {
    organization: "Kelly Professional & Industrial",
    title: "Translator",
    dates: "May 2024 to August 2024",
    arrangement: "Contract · Full-time · Remote",
    description:
      "Provided live Bengali-English language support primarily in healthcare settings, helping patients and healthcare professionals communicate clearly and accurately. Also supported communication in administrative and other service-related interactions where language barriers were present.",
    tags: ["Interpretation", "Bengali & English", "Communication", "Multilingual Support"],
  },
  {
    organization: "DraftKings Inc.",
    title: "Customer Service Representative",
    dates: "May 2021 to August 2021",
    arrangement: "Contract · Full-time · Remote",
    description:
      "Provided customer support through live chat, responding to questions and resolving support tickets related to accounts, betting issues, and use of the platform. Worked remotely in a fast-paced environment, handling customer concerns and helping resolve issues clearly and efficiently.",
    tags: ["Customer Support", "Live Chat", "Ticket Resolution", "Communication"],
  },
  {
    organization: "Paladin Security Group Ltd.",
    title: "Parking Attendant",
    dates: "May 2022 to July 2022",
    arrangement: "Permanent · Full-time · On-site",
    description:
      "Supported daily parking operations, assisting customers with automated ticket, payment, and gate systems while troubleshooting equipment issues as they came up. Also responded to calls, carried out regular patrols, and helped keep the parking operation running smoothly.",
    tags: ["Customer Service", "Operations", "Troubleshooting"],
  },
  {
    organization: "COMPASS GROUP CANADA",
    subtitle: "Health Sciences Centre",
    title: "Food Service Associate",
    dates: "June 2021 to Present",
    arrangement: "Permanent · Part-time · On-site",
    description:
      "Worked across different areas of hospital food-service operations, including customer service, cashier duties, bakery, stocking, and inventory, while balancing the role alongside university.",
    tags: ["Customer Service", "Teamwork", "Inventory", "Operations"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-7xl px-margin py-space-2xl lg:px-margin-desktop"
    >
      <div className="mb-space-lg border-b border-border-hairline pb-space-sm">
        <span className="mb-1 block font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
          Track Record
        </span>
        <h2 className="font-serif text-headline-lg text-ink-primary">Professional Experience</h2>
      </div>

      <div className="space-y-space-md">
        <div className="divide-y divide-border-hairline">
          {featured.map((role, index) => (
            <article
              key={role.title}
              className={`${recordInteraction} py-space-lg ${index === 0 ? "pt-3" : ""}`}
            >
              <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={organizationClass}>{role.organization}</span>
                    {role.context ? (
                      <>
                        <span className="text-border-hairline" aria-hidden="true">
                          ·
                        </span>
                        <span className="font-meta-mono text-meta-mono text-ink-muted">{role.context}</span>
                      </>
                    ) : null}
                    {role.badge ? (
                      <>
                        <span className="text-border-hairline" aria-hidden="true">
                          ·
                        </span>
                        <span className="rounded border border-border-hairline bg-surface-subtle px-2 py-0.5 font-label-code text-xs text-forest-moss motion-safe:transition-[border-color,background-color] motion-safe:duration-[220ms] motion-safe:ease-out group-hover/record:border-forest-moss/45 group-hover/record:bg-forest-light/70 group-has-[:is(a,button):focus-visible]/record:border-forest-moss/45 group-has-[:is(a,button):focus-visible]/record:bg-forest-light/70">
                          {role.badge}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="font-serif text-body-lg font-semibold text-ink-primary">{role.title}</h3>
                </div>
                <div className="shrink-0 text-left md:text-right">
                  <span
                    className={`block font-meta-mono text-meta-mono font-medium ${
                      role.datesMuted ? "text-ink-muted" : "text-ink-primary"
                    }`}
                  >
                    {role.dates}
                  </span>
                  <span className="font-label-code text-label-code text-ink-muted">{role.arrangement}</span>
                </div>
              </div>
              <div className="mb-3 max-w-3xl space-y-2 leading-relaxed text-ink-secondary">
                {role.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <TagList tags={role.tags} />
                {role.link ? <ExternalLink link={role.link} /> : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-space-lg border-t border-border-hairline pt-space-md">
          <div className="mb-space-md flex items-center justify-between">
            <span className="font-meta-mono text-label-code font-semibold tracking-widest text-forest-moss uppercase">
              Additional Technical Experience
            </span>
          </div>
          <div className="space-y-space-md">
            {technical.map((role) => (
              <article
                key={`${role.title}-${role.context}`}
                className={experienceCardClass}
              >
                <div className="mb-3">
                  <div className="mb-1.5 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                    <div>
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        <span className={organizationClass}>{role.organization}</span>
                        <span className="text-border-hairline" aria-hidden="true">
                          ·
                        </span>
                        <span className="font-meta-mono text-meta-mono text-ink-muted">{role.context}</span>
                      </div>
                      <h4 className="font-serif text-body-md font-semibold text-ink-primary">{role.title}</h4>
                    </div>
                    <div className="shrink-0 text-left md:text-right">
                      <span
                        className={`block font-meta-mono text-meta-mono font-medium ${
                          role.datesMuted ? "text-ink-muted" : "text-ink-primary"
                        }`}
                      >
                        {role.dates}
                      </span>
                      {role.arrangement ? (
                        <span className="font-label-code text-label-code text-ink-muted">
                          {role.arrangement}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-2 space-y-2 text-sm leading-relaxed text-ink-secondary">
                    {role.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-hairline pt-2">
                  <TagList tags={role.tags} />
                  {role.link ? <ExternalLink link={role.link} /> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-space-md border-t border-border-hairline pt-space-md">
        <style>{`
          .community-details {
            interpolate-size: allow-keywords;
          }
          .community-details::details-content {
            height: 0;
            overflow: clip;
            transition:
              height 280ms ease-out,
              content-visibility 280ms ease-out allow-discrete;
          }
          .community-details[open]::details-content {
            height: auto;
            transition:
              height 380ms ease-out,
              content-visibility 380ms ease-out allow-discrete;
          }
          .community-reveal {
            transform-origin: top center;
            clip-path: inset(0 0 100% 0);
            opacity: 0.55;
            transform: scale(0.985);
            transition:
              clip-path 280ms ease-out,
              opacity 280ms ease-out,
              transform 280ms ease-out;
          }
          .community-details[open] .community-reveal {
            clip-path: inset(0);
            opacity: 1;
            transform: scale(1);
            transition:
              clip-path 380ms ease-out,
              opacity 380ms ease-out,
              transform 380ms ease-out;
          }
          .community-details summary::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -1px;
            left: 0;
            height: 1px;
            pointer-events: none;
            background: var(--color-forest-moss);
            opacity: 0;
            transform: scaleX(0);
            transform-origin: left center;
            transition:
              opacity 220ms ease-out,
              transform 220ms ease-out;
          }
          .community-details[open] summary::after {
            animation: community-trace 360ms ease-out forwards;
          }
          @keyframes community-trace {
            0% {
              opacity: 1;
              transform: scaleX(0);
            }
            72% {
              opacity: 1;
              transform: scaleX(1);
            }
            100% {
              opacity: 0;
              transform: scaleX(1);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .community-details::details-content,
            .community-details[open]::details-content,
            .community-reveal,
            .community-details[open] .community-reveal,
            .community-details summary::after,
            .community-details[open] summary::after {
              transition: none;
              animation: none;
              clip-path: none;
              opacity: 1;
              transform: none;
            }
            .community-details summary::after,
            .community-details[open] summary::after {
              opacity: 0;
            }
          }
        `}</style>
        <details className="community-details group/community">
          <summary className="group/summary relative flex min-h-11 cursor-pointer list-none items-center justify-between border-b border-border-hairline py-2 hover:border-stone-sand focus-visible:border-stone-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-moss motion-safe:transition-colors motion-safe:duration-200 [&::-webkit-details-marker]:hidden">
            <span className="font-sans text-body-sm font-medium text-ink-primary">
              Additional Work & Community Experience
            </span>
            <span className="inline-flex items-center gap-1.5 font-meta-mono text-label-code tracking-[0.14em] text-forest-moss uppercase motion-safe:transition-colors motion-safe:duration-200 group-hover/summary:text-forest-deep group-focus-visible/summary:text-forest-deep">
              <span className="group-open/community:hidden">View roles</span>
              <span className="hidden group-open/community:inline">Hide roles</span>
              <ChevronIcon />
            </span>
          </summary>
          <div className="community-reveal">
          <div className="mt-space-xs grid grid-cols-1 gap-space-md pt-space-sm md:grid-cols-2">
            {community.map((role) => (
              <article
                key={role.title}
                className={experienceCardClass}
              >
                <div>
                  <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <span className={organizationClass}>{role.organization}</span>
                      {role.subtitle ? (
                        <span className="mt-0.5 block font-meta-mono text-meta-mono text-ink-muted">
                          {role.subtitle}
                        </span>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <span className="block font-meta-mono text-meta-mono font-medium text-ink-muted">
                        {role.dates}
                      </span>
                      <span className="font-label-code text-label-code text-ink-muted">{role.arrangement}</span>
                    </div>
                  </div>
                  <h4 className="mt-1 mb-2 font-serif text-body-lg font-semibold text-ink-primary">
                    {role.title}
                  </h4>
                  <p className="mb-3 text-sm leading-relaxed text-ink-secondary">{role.description}</p>
                </div>
                <div className="border-t border-border-hairline pt-2">
                  <TagList tags={role.tags} />
                </div>
              </article>
            ))}
          </div>
          </div>
        </details>
      </div>
    </section>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5">
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

function ExternalLink({ link }: { link: ExperienceLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1 font-meta-mono text-label-code text-ink-muted no-underline motion-safe:transition-colors motion-safe:duration-[170ms] motion-safe:ease-out hover:text-forest-deep focus-visible:text-forest-deep"
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

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5 shrink-0 motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-out motion-safe:group-hover/summary:translate-y-px motion-safe:group-open/community:group-hover/summary:-translate-y-px group-open/community:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
