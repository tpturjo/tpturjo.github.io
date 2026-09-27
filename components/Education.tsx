"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const honours = [
  {
    kind: "Academic Honour",
    meta: "2024–25",
    title: "Faculty of Science Dean’s List",
    detail: "Top 10% of students in the Faculty of Science · Second consecutive year",
    image: "/education/deans-list-2024-25.jpg",
    imageAlt: "Tridib Paul Turjo holding the 2024–25 Faculty of Science Dean’s List certificate",
    viewLabel: "Preview the 2024–25 Faculty of Science Dean’s List certificate",
    imagePosition: "center",
  },
  {
    kind: "Academic Honour",
    meta: "2023–24",
    title: "Faculty of Science Dean’s List",
    detail: "Top 10% of students in the Faculty of Science",
    image: "/education/deans-list-2023-24.jpg",
    imageAlt: "Tridib Paul Turjo receiving the 2023–24 Faculty of Science Dean’s List certificate",
    viewLabel: "Preview the 2023–24 Faculty of Science Dean’s List certificate",
    imagePosition: "center",
  },
  {
    kind: "Scholarship",
    meta: "2024 · $3,000",
    title: "International Undergraduate Academic Award",
    detail: "$3,000 academic award for high-achieving international undergraduate students.",
    image: "/education/international-award.jpg",
    imageAlt: "International Undergraduate Academic Award letter from Memorial University",
    viewLabel: "Preview the International Undergraduate Academic Award letter",
    imagePosition: "top",
  },
] as const;

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function Education() {
  const [renderedPreview, setRenderedPreview] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const activePreview = useRef<string | null>(null);
  const frameRef = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const hidePreviewRef = useRef<(id?: string) => void>(() => {});

  const clearMotion = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const showPreview = useCallback((id: string) => {
    if (activePreview.current === id) return;
    clearMotion();
    activePreview.current = id;
    setRenderedPreview(id);
    setPreviewOpen(false);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setPreviewOpen(true);
    });
  }, [clearMotion]);

  const hidePreview = useCallback((id?: string) => {
    if (activePreview.current === null) return;
    if (id && activePreview.current !== id) return;
    clearMotion();
    activePreview.current = null;
    setPreviewOpen(false);
    hideTimer.current = window.setTimeout(() => {
      hideTimer.current = null;
      setRenderedPreview(null);
    }, 140);
  }, [clearMotion]);

  function leavePreview(id: string) {
    const focused = document.activeElement;
    if (
      focused instanceof HTMLElement &&
      focused.matches(":focus-visible") &&
      focused.dataset.previewId
    ) {
      showPreview(focused.dataset.previewId);
      return;
    }
    hidePreview(id);
  }

  function togglePreview(id: string) {
    if (activePreview.current === id) hidePreview(id);
    else showPreview(id);
  }

  useEffect(() => {
    hidePreviewRef.current = hidePreview;
  }, [hidePreview]);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (finePointer()) return;
      const target = event.target;
      if (target instanceof Element && target.closest(".cert-thumb")) return;
      hidePreviewRef.current();
    };

    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <section
      id="education"
      className="w-full border-y border-border-hairline bg-surface-subtle py-space-2xl"
    >
      <style>{`
        .cert-preview {
          position: absolute;
          z-index: 30;
          right: 0;
          bottom: calc(100% + 0.5rem);
          width: min(28rem, calc(100vw - 3rem));
          pointer-events: none;
          opacity: 0;
          transform: translateY(2px) scale(0.985);
          transition: opacity 130ms ease-out;
        }
        .cert-preview.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 170ms ease-out, transform 170ms ease-out;
        }
        @media (min-width: 64rem) {
          .cert-preview {
            top: 50%;
            right: calc(100% + 0.75rem);
            bottom: auto;
            transform: translateY(calc(-50% + 2px)) scale(0.985);
          }
          .cert-preview.is-active {
            transform: translateY(-50%) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-preview,
          .cert-preview.is-active {
            transition: none;
            transform: none;
          }
        }
        @media (min-width: 64rem) and (prefers-reduced-motion: reduce) {
          .cert-preview,
          .cert-preview.is-active {
            transform: translateY(-50%);
          }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-margin lg:px-margin-desktop">
        <div className="mb-space-xl border-b border-border-hairline pb-space-sm">
          <span className="mb-1 block font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
            Academic Background
          </span>
          <h2 className="font-serif text-headline-lg text-ink-primary">Education & Honours</h2>
        </div>

        <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
          <article className="group flex flex-col justify-between rounded border border-border-hairline bg-surface-card p-space-lg transition-[border-color,transform,box-shadow] duration-[240ms] ease-out hover:border-forest-moss motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_2px_8px_rgb(24_24_27_/_0.06)] lg:col-span-5">
            <div>
              <div className="mb-space-md flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xs border border-border-hairline bg-surface-card p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/education/memorial-logo.webp"
                    alt="Memorial University of Newfoundland"
                    className="h-full w-full object-contain opacity-90 motion-safe:transition-opacity motion-safe:duration-[240ms] motion-safe:group-hover:opacity-100"
                  />
                </div>
                <div>
                  <span className="block font-meta-mono text-label-code font-medium text-forest-moss uppercase">
                    Undergraduate Degree
                  </span>
                  <h3 className="font-serif text-headline-sm leading-snug text-ink-primary lg:text-headline-md">
                    Memorial University of Newfoundland
                  </h3>
                </div>
              </div>

              <div className="mb-space-md rounded border border-border-hairline bg-surface-subtle p-space-sm">
                <span className="block font-sans text-body-md font-medium text-ink-secondary">
                  Bachelor of Science (Honours) in Computer Science
                </span>
                <span className="mt-0.5 block font-meta-mono text-meta-mono text-ink-muted">
                  {"Completed Aug 2026 · St. John's, NL"}
                </span>
              </div>

              <div className="space-y-space-xs text-body-sm">
                <div className="flex items-baseline gap-2">
                  <span className="font-meta-mono text-label-code text-ink-muted uppercase">
                    Concentration:
                  </span>
                  <span className="font-sans text-body-sm font-medium text-ink-primary">
                    Artificial Intelligence
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-meta-mono text-label-code text-ink-muted uppercase">
                    Credential:
                  </span>
                  <span className="font-sans text-body-sm font-medium text-ink-primary">
                    Data Centric Computing
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-meta-mono text-label-code text-ink-muted uppercase">
                    Thesis:
                  </span>
                  <span className="font-sans text-body-sm text-ink-primary">
                    Spectral Research API & Biological Data Pipelines
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-space-lg grid grid-cols-2 gap-space-md rounded border-t border-border-hairline bg-surface-subtle p-space-sm pt-space-md">
              <div>
                <span className="block font-label-code text-label-code text-ink-muted uppercase">
                  Cumulative Average
                </span>
                <span className="mt-0.5 block font-serif text-body-lg font-semibold text-ink-primary">
                  86.4%
                </span>
              </div>
              <div>
                <span className="block font-label-code text-label-code text-ink-muted uppercase">
                  Cumulative GPA
                </span>
                <span className="mt-0.5 block font-serif text-body-lg font-semibold text-ink-primary">
                  3.77 / 4.00
                </span>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-space-md lg:col-span-7">
            {honours.map((item) => (
              <article
                key={`${item.title}-${item.meta}`}
                className="relative z-0 flex items-center justify-between gap-space-md rounded border border-border-hairline bg-surface-card p-4 transition-[border-color,transform,box-shadow] duration-[240ms] ease-out hover:border-forest-moss has-[.cert-thumb:hover]:z-30 has-[.cert-preview]:z-30 motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_2px_8px_rgb(24_24_27_/_0.06)]"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-meta-mono text-label-code font-semibold text-forest-moss uppercase">
                      {item.kind}
                    </span>
                    <span className="text-border-hairline" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-meta-mono text-meta-mono font-medium text-forest-moss">
                      {item.meta}
                    </span>
                  </div>
                  <h3 className="font-serif text-body-lg font-semibold text-ink-primary">{item.title}</h3>
                  <p className="mt-1 font-sans text-body-sm leading-relaxed text-ink-secondary">
                    {item.detail}
                  </p>
                </div>
                <CertificateFrame
                  previewId={item.image}
                  href={item.image}
                  alt={item.imageAlt}
                  label={item.viewLabel}
                  imagePosition={item.imagePosition}
                  previewVisible={renderedPreview === item.image}
                  previewOpen={previewOpen && renderedPreview === item.image}
                  onShow={() => showPreview(item.image)}
                  onHide={() => hidePreview(item.image)}
                  onPointerLeave={() => leavePreview(item.image)}
                  onToggle={() => togglePreview(item.image)}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificateFrame({
  previewId,
  href,
  alt,
  label,
  imagePosition,
  previewVisible,
  previewOpen,
  onShow,
  onHide,
  onPointerLeave,
  onToggle,
}: {
  previewId: string;
  href: string;
  alt: string;
  label: string;
  imagePosition: "center" | "top";
  previewVisible: boolean;
  previewOpen: boolean;
  onShow: () => void;
  onHide: () => void;
  onPointerLeave: () => void;
  onToggle: () => void;
}) {
  const pointerType = useRef<string | null>(null);

  return (
    <div className="cert-thumb group/thumb relative shrink-0">
      <button
        type="button"
        aria-label={label}
        data-preview-id={previewId}
        onPointerDown={(event) => {
          pointerType.current = event.pointerType;
          if (event.pointerType === "mouse") event.preventDefault();
        }}
        onMouseEnter={() => {
          if (finePointer()) onShow();
        }}
        onMouseLeave={() => {
          if (!finePointer()) return;
          onPointerLeave();
        }}
        onFocus={(event) => {
          const fromPointer = pointerType.current === "mouse" || pointerType.current === "touch";
          pointerType.current = null;
          if (fromPointer) return;
          if (event.currentTarget.matches(":focus-visible")) onShow();
        }}
        onBlur={onHide}
        onClick={() => {
          if (finePointer()) return;
          onToggle();
        }}
        className="relative block aspect-[3/4] w-12 overflow-hidden rounded-xs border border-border-hairline bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-moss"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={href}
          alt={alt}
          className={`size-full object-cover contrast-[0.96] motion-safe:transition-[transform,filter] motion-safe:duration-[240ms] motion-safe:ease-out motion-safe:group-hover/thumb:scale-[1.03] motion-safe:group-hover/thumb:contrast-100 motion-safe:group-has-[:focus-visible]/thumb:scale-[1.03] motion-safe:group-has-[:focus-visible]/thumb:contrast-100 ${
            imagePosition === "top" ? "object-top" : "object-center"
          }`}
        />
        <span
          aria-hidden="true"
          className="absolute right-0.5 bottom-0.5 flex size-3.5 items-center justify-center rounded-xs bg-surface-card text-forest-deep"
        >
          <ZoomIcon />
        </span>
      </button>
      {previewVisible ? (
        <div
          aria-hidden="true"
          className={`cert-preview overflow-hidden rounded-xs border border-border-hairline bg-surface-card p-1 shadow-[0_8px_20px_rgb(24_24_27_/_0.08)] ${
            previewOpen ? "is-active" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={href} alt="" className="block h-auto w-full object-contain" />
        </div>
      ) : null}
    </div>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M15 15.5 19 19.5" strokeLinecap="round" />
    </svg>
  );
}
