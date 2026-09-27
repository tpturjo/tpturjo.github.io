"use client";

import { useLayoutEffect, useRef } from "react";

const DRAFT_EASE = [0.37, 0.01, 0.2, 1] as const;
const DRAFT_MS = 1200;
const SEQUENCE_END_MS = 1480;
const HEAD_PX = 24;
const GROW_MS = 170;

function unitBezier(t: number, a: number, b: number) {
  const c = 1 - t;
  return 3 * c * c * t * a + 3 * c * t * t * b + t * t * t;
}

function easeProgress(time: number) {
  const [x1, y1, x2, y2] = DRAFT_EASE;
  let low = 0;
  let high = 1;
  for (let step = 0; step < 22; step += 1) {
    const mid = (low + high) / 2;
    if (unitBezier(mid, x1, x2) < time) low = mid;
    else high = mid;
  }
  return unitBezier((low + high) / 2, y1, y2);
}

function inverseEase(progress: number) {
  let low = 0;
  let high = 1;
  for (let step = 0; step < 22; step += 1) {
    const mid = (low + high) / 2;
    if (easeProgress(mid) < progress) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

const highlights = [
  {
    label: "Honours Thesis",
    title: "Spectral Research API",
    body: "Built naturepaletteR, an open-source R client and REST API for spectral research datasets.",
  },
  {
    label: "Industry Co-op",
    title: "8-month Software Co-op",
    body: "Target Marketing & Communications, working on client web applications and digital asset automation.",
  },
  {
    label: "Academic Honour",
    title: "Two-time Dean’s List Recipient",
    body: "Faculty of Science, 2023–24 and 2024–25.",
  },
  {
    label: "Research",
    title: "Living Meta-Analysis Tools",
    body: "Research software and reproducible statistical workflows for academic research.",
  },
] as const;

export default function Hero() {
  const columnRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const column = columnRef.current;
    if (!column) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 64rem)").matches;
    const settle = () => window.dispatchEvent(new Event("highlights-entrance-end"));
    if (reduced || !desktop) {
      settle();
      return;
    }

    const traces = column.querySelectorAll<HTMLElement>("[data-draft-trace]");
    if (traces.length === 0) {
      settle();
      return;
    }

    const columnBox = column.getBoundingClientRect();
    const height = columnBox.height;
    if (height <= HEAD_PX) {
      settle();
      return;
    }

    const easing = `cubic-bezier(${DRAFT_EASE.join(", ")})`;
    const started: Animation[] = [
      column.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
        duration: DRAFT_MS,
        easing,
        fill: "both",
        pseudoElement: "::before",
      }),
      column.animate([{ top: "0px" }, { top: `calc(100% - ${HEAD_PX}px)` }], {
        duration: DRAFT_MS,
        easing,
        fill: "both",
        pseudoElement: "::after",
      }),
      column.animate(
        [
          { opacity: 1, offset: 0 },
          { opacity: 1, offset: 0.78 },
          { opacity: 0, offset: 1 },
        ],
        { duration: DRAFT_MS, easing: "linear", fill: "both", pseudoElement: "::after" },
      ),
    ];

    const dot = column.querySelector<HTMLElement>(".hero-highlight-dot");
    if (dot) {
      started.push(
        dot.animate(
          [
            { transform: "scale(1)", opacity: 1, offset: 0 },
            { transform: "scale(1.35)", opacity: 0.62, offset: 0.5 },
            { transform: "scale(1)", opacity: 1, offset: 1 },
          ],
          { duration: SEQUENCE_END_MS - DRAFT_MS, delay: DRAFT_MS, easing, fill: "both" },
        ),
      );
    }

    traces.forEach((trace) => {
      const label = trace.parentElement;
      if (!label) return;
      const labelBox = label.getBoundingClientRect();
      const quiet = trace.dataset.draftTrace === "quiet";
      const gap = quiet ? 18 : 10;
      const peak = quiet ? 0.68 : 1;
      const midpoint = labelBox.top + labelBox.height / 2 - columnBox.top;
      const progress = Math.min(1, Math.max(0, (midpoint - HEAD_PX) / (height - HEAD_PX)));
      const reach = inverseEase(progress) * DRAFT_MS;
      const duration = Math.max(GROW_MS + 120, SEQUENCE_END_MS - reach);
      const growAt = Math.min(0.42, GROW_MS / duration);
      const fadeAt = Math.min(0.9, Math.max(growAt + 0.08, (DRAFT_MS - reach) / duration));
      trace.style.right = `calc(100% + ${gap}px)`;
      trace.style.width = `${Math.max(0, labelBox.left - columnBox.left - gap)}px`;
      started.push(
        trace.animate(
          [
            { transform: "scaleX(0)", opacity: 0, offset: 0 },
            { transform: "scaleX(1)", opacity: peak, offset: growAt },
            { transform: "scaleX(1)", opacity: peak, offset: fadeAt },
            { transform: "scaleX(1)", opacity: 0, offset: 1 },
          ],
          { duration, delay: reach, easing: "linear", fill: "both" },
        ),
      );
    });

    let cancelled = false;
    void Promise.all(
      started.map((animation) => animation.finished.then(
        () => undefined,
        () => undefined,
      )),
    ).then(() => {
      if (!cancelled) settle();
    });

    return () => {
      cancelled = true;
      started.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-margin pt-space-xl pb-space-md lg:px-margin-desktop">
      <style>{`
        .hero-index-trace {
          position: absolute;
          top: 50%;
          right: 100%;
          width: 0;
          height: 1px;
          margin-top: -0.5px;
          background-color: color-mix(in srgb, var(--color-ink-primary) 34%, var(--color-border-hairline));
          transform-origin: left center;
          transform: scaleX(0);
          opacity: 0;
          pointer-events: none;
        }
        @media (min-width: 64rem) {
          .hero-structure-divider.hero-structure-divider {
            position: relative;
            border-left-color: transparent;
          }
          .hero-structure-divider.hero-structure-divider::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: -1px;
            width: 1px;
            background-color: var(--color-border-hairline);
            transform-origin: top center;
            transform: scaleY(0);
            pointer-events: none;
          }
          .hero-structure-divider.hero-structure-divider::after {
            content: "";
            position: absolute;
            top: 0;
            left: -1.5px;
            width: 2px;
            height: 24px;
            background-color: var(--color-forest-deep);
            pointer-events: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-structure-divider.hero-structure-divider {
            animation: none;
            border-left-color: var(--color-border-hairline);
          }
          .hero-structure-divider.hero-structure-divider::before,
          .hero-structure-divider.hero-structure-divider::after {
            display: none;
          }
          .hero-index-trace {
            animation: none;
          }
        }
      `}</style>
      <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-8">
          <div>
            <div className="mb-space-md flex flex-wrap items-center gap-x-space-sm gap-y-1">
              <span className="font-meta-mono text-meta-mono font-medium tracking-widest whitespace-nowrap text-forest-moss uppercase">
                Portfolio & Work
              </span>
              <span className="text-border-hairline" aria-hidden="true">
                /
              </span>
              <span className="font-meta-mono text-meta-mono text-ink-muted max-sm:basis-full">
                B.Sc. (Hons) Computer Science · 2026
              </span>
            </div>

            <h1 className="mb-space-xs font-serif text-[clamp(2.35rem,4.2vw,3.45rem)] leading-[1.1] font-normal tracking-tight text-ink-primary">
              Tridib Paul Turjo
            </h1>
            <p className="mb-space-lg font-meta-mono text-body-sm font-medium tracking-wider text-forest-deep uppercase">
              Software Developer · Applied AI & Research Systems
            </p>

            <div className="max-w-3xl space-y-space-md">
              <h2 className="max-w-2xl border-l-2 border-forest-moss py-0.5 pl-4 font-serif text-headline-md text-ink-primary italic">
                {"“A lot of what's next is still being built.”"}
              </h2>
              <p className="max-w-2xl font-sans text-body-lg leading-relaxed text-ink-primary">
                {
                  "There's so much happening in tech right now, especially in AI and software, and things are changing fast. I'm excited to be starting my career while all of it is unfolding."
                }
              </p>
              <p className="max-w-2xl font-sans text-body-md leading-relaxed text-ink-secondary">
                {
                  "I'm a recent Computer Science Honours graduate from Memorial University of Newfoundland, with a concentration in Artificial Intelligence and a credential in Data Centric Computing. Through professional work, research, my Honours thesis, and projects of my own, I've gained hands-on experience across software development, APIs, AI and NLP, data, and research software."
                }
              </p>
              <p className="max-w-2xl font-sans text-body-md leading-relaxed text-ink-muted">
                {
                  "I'm excited for what comes next: to keep learning, solve practical problems, and build reliable tools with teams tackling meaningful technical challenges."
                }
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-md pt-space-md">
            <a
              href="#projects"
              className="group inline-flex items-center gap-space-xs rounded bg-ink-primary px-5 py-2.5 font-label-nav text-label-nav text-surface-base no-underline transition-colors duration-200 hover:bg-forest-deep hover:text-surface-base"
            >
              <span>View Projects</span>
              <ArrowForwardIcon />
            </a>
            <a
              href="/resume/Tridib-Paul-Turjo-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-space-xs rounded border border-border-hairline bg-surface-card px-5 py-2.5 font-label-nav text-label-nav text-ink-primary no-underline transition-colors duration-200 hover:border-forest-moss hover:text-forest-moss"
            >
              <span>Resume (PDF)</span>
              <ArrowOutIcon />
            </a>
            <a
              href="https://github.com/tpturjo"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded px-4 py-2.5 font-meta-mono text-meta-mono font-medium text-ink-secondary no-underline decoration-border-hairline underline-offset-4 transition-colors duration-200 hover:text-forest-moss hover:underline hover:decoration-forest-moss"
            >
              <span>GitHub</span>
              <ArrowOutIcon className="size-3.5" />
            </a>
          </div>
        </div>

        <div
          ref={columnRef}
          className="hero-structure-divider flex flex-col justify-between border-t border-border-hairline pt-space-lg lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-space-xl"
        >
          <div>
            <div className="mb-space-md flex items-center justify-between border-b border-border-hairline pb-2 font-meta-mono text-label-code tracking-wider text-ink-secondary uppercase">
              <span>Highlights</span>
              <span aria-hidden="true" className="hero-highlight-dot size-1.5 rounded-full bg-forest-moss" />
            </div>
            <div className="divide-y divide-border-hairline">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="-mx-2 rounded px-2 py-3 transition-[background-color,transform] duration-200 first:pt-2 last:pb-2 hover:bg-surface-subtle motion-safe:hover:translate-x-1"
                >
                  <span className="relative block font-meta-mono text-label-code font-medium text-forest-moss uppercase">
                    {item.label}
                    <span
                      aria-hidden="true"
                      data-draft-trace={index < 2 ? "full" : "quiet"}
                      className="hero-index-trace"
                    />
                  </span>
                  <h3 className="mt-0.5 font-headline-sm text-body-md font-semibold text-ink-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs leading-normal text-ink-primary">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-space-lg flex items-center justify-between border-t border-border-hairline pt-space-lg font-meta-mono text-meta-mono text-ink-muted">
            <div className="flex items-center gap-1.5">
              <LocationIcon />
              <span>{"St. John's, NL, Canada"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowForwardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowOutIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className} motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5 text-forest-moss"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.75" />
    </svg>
  );
}
