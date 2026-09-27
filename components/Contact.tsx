"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "tpturjo@mun.ca";
const GITHUB_PROFILE = "https://github.com/tpturjo";
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/tpturjo/";
const RESUME_HREF = "/resume/Tridib-Paul-Turjo-Resume.pdf";
const RESUME_FILENAME = "Tridib-Paul-Turjo-Resume.pdf";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-forest-moss";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "wait" | "in">("idle");

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("in");
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    setPhase("wait");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPhase("in");
        observer.disconnect();
      },
      { threshold: 0.22 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const motionClass = phase === "wait" ? "contact-hold" : phase === "in" ? "contact-in" : "";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`w-full scroll-mt-20 border-t border-border-hairline bg-surface-base pt-space-xl pb-space-xl lg:pt-space-2xl lg:pb-space-2xl ${motionClass}`}
    >
      <style>{`
        .contact-hold .contact-reveal {
          opacity: 0;
        }
        .contact-in .contact-reveal {
          animation: contact-rise 0.46s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .contact-in .contact-d2 { animation-delay: 70ms; }
        .contact-in .contact-d3 { animation-delay: 150ms; }
        .contact-in .contact-d4 { animation-delay: 240ms; }
        .contact-in .contact-d5 { animation-delay: 340ms; }
        @keyframes contact-rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-hold .contact-reveal,
          .contact-in .contact-reveal {
            opacity: 1;
            animation: none;
            transform: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-margin lg:px-margin-desktop">
        <div className="contact-reveal border-b border-border-hairline pb-2">
          <span className="font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">Get in Touch</span>
        </div>

        <div className="contact-reveal contact-d2 relative mt-space-lg max-w-4xl pl-5">
          <span aria-hidden="true" className="absolute top-1.5 left-0 h-11 w-0.5 bg-forest-moss" />
          <h2 className="font-serif text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.12] font-normal tracking-tight text-ink-primary">
            Let&apos;s work on something{" "}
            <br className="hidden md:block" />
            worth building.
          </h2>
        </div>

        <div className="contact-reveal contact-d3 mt-space-lg flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between lg:gap-space-xl">
          <p className="order-2 max-w-xl font-sans text-body-md leading-relaxed text-ink-secondary lg:order-1">
            I&apos;m currently open to opportunities in software development, applied AI, backend systems, and research
            software. If you think I might be a good fit for your team or project, I&apos;d be happy to hear from you.
          </p>
          <p className="order-1 inline-flex items-center gap-2 font-meta-mono text-label-code tracking-widest text-forest-deep uppercase lg:order-2 lg:pt-1">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-forest-moss" />
            Available for Opportunities
          </p>
        </div>

        <div className="contact-reveal contact-d4 group/mail mt-space-xl border-y border-border-hairline motion-safe:transition-[background-color,border-color] motion-safe:duration-200 hover:border-forest-moss/30 hover:bg-forest-light/40">
          <div className="flex flex-col gap-3 py-space-lg sm:flex-row sm:items-end sm:justify-between sm:gap-space-lg">
            <div className="min-w-0">
              <p className="font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">Say Hello</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`group/address relative mt-2 inline-block max-w-full font-serif text-[clamp(1.625rem,2.5vw,2.35rem)] leading-tight break-all text-ink-primary no-underline motion-safe:transition-colors motion-safe:duration-200 hover:text-forest-deep ${focusRing}`}
              >
                {CONTACT_EMAIL}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-forest-moss motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover/mail:scale-x-100 group-focus-visible/address:scale-x-100"
                />
              </a>
            </div>
            <CopyEmailButton />
          </div>
        </div>

        <div className="contact-reveal contact-d5 grid grid-cols-1 border-b border-border-hairline sm:grid-cols-12">
          <div className="py-space-lg sm:col-span-7 sm:pr-space-xl">
            <p className="font-meta-mono text-label-code tracking-widest text-ink-muted uppercase">Find me</p>
            <div className="mt-space-sm flex flex-wrap items-center gap-x-space-lg">
              <ExternalLink href={LINKEDIN_PROFILE}>LinkedIn</ExternalLink>
              <ExternalLink href={GITHUB_PROFILE}>GitHub</ExternalLink>
            </div>
          </div>
          <div className="border-t border-border-hairline py-space-lg sm:col-span-5 sm:border-t-0 sm:border-l sm:pl-space-lg">
            <p className="font-meta-mono text-label-code tracking-widest text-ink-muted uppercase">Take with you</p>
            <div className="mt-space-sm flex min-h-11 items-end justify-between gap-space-md">
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-serif text-body-lg text-ink-primary no-underline motion-safe:transition-colors motion-safe:duration-200 hover:text-forest-deep ${focusRing}`}
              >
                Resume · PDF
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={RESUME_HREF}
                download={RESUME_FILENAME}
                className={`group/resume inline-flex min-h-11 items-center gap-1.5 pb-0.5 font-meta-mono text-label-code tracking-[0.14em] text-ink-secondary uppercase no-underline motion-safe:transition-colors motion-safe:duration-200 hover:text-forest-moss ${focusRing}`}
              >
                Download
                <DownloadIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/action inline-flex min-h-11 items-center gap-1.5 font-sans text-body-md text-ink-primary no-underline motion-safe:transition-colors motion-safe:duration-200 hover:text-forest-moss ${focusRing}`}
    >
      <span>{children}</span>
      <span className="sr-only"> (opens in a new tab)</span>
      <ArrowOutIcon />
    </a>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={`relative inline-flex min-h-11 shrink-0 items-center self-start font-meta-mono text-label-code tracking-[0.14em] text-forest-moss uppercase motion-safe:translate-x-0 motion-safe:transition-[color,transform] motion-safe:duration-200 hover:text-forest-deep motion-safe:group-hover/mail:translate-x-[3px] sm:self-auto ${focusRing}`}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy Email"}</span>
    </button>
  );
}

function ArrowOutIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/action:translate-x-[3px] motion-safe:group-hover/action:-translate-y-[3px]"
    >
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/resume:translate-y-[3px]"
    >
      <path
        d="M8 3.5v7M5.5 8 8 10.5 10.5 8M3.5 12.5h9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
