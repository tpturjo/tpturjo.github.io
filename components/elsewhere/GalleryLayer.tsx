"use client";

import { useEffect, useId, type KeyboardEvent, type ReactNode } from "react";
import type { ElsewhereCollection } from "@/components/elsewhere-data";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-forest-moss";

export function GalleryLayer({
  collection,
  totalCollections,
  onReturn,
  onKeyDown,
  children,
}: {
  collection: ElsewhereCollection;
  totalCollections: number;
  onReturn: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const totalLabel = String(totalCollections).padStart(2, "0");
  const countLabel = `${String(collection.photographs.length).padStart(2, "0")} photographs`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.getElementById("roots-return")?.focus({ preventScroll: true });
    }, 40);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div id="roots-chapter" onKeyDown={onKeyDown}>
      <GalleryMotion />
      <header>
        <div className="flex items-baseline justify-between gap-4 border-b border-border-hairline pb-2">
          <p className="font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">Elsewhere</p>
          <p className="font-meta-mono text-label-code tracking-widest text-ink-muted">
            {collection.number} / {totalLabel}
          </p>
        </div>
        <button
          id="roots-return"
          type="button"
          onClick={onReturn}
          className={`group/back mt-2.5 inline-flex min-h-11 cursor-pointer items-center gap-2 border border-forest-moss bg-surface-base px-3.5 font-meta-mono text-[0.75rem] font-medium tracking-[0.16em] text-forest-deep uppercase motion-safe:transition-colors motion-safe:duration-300 hover:border-forest-deep hover:bg-forest-light ${focusRing}`}
        >
          <ArrowLeft />
          <span>All collections</span>
        </button>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h2 id={titleId} className="font-serif text-headline-md text-ink-primary">
            {collection.name}
          </h2>
        </div>
        <div className="mt-0.5 flex items-baseline justify-between gap-4">
          <p className="font-serif text-body-md text-ink-secondary italic">{collection.line}</p>
          <p className="shrink-0 font-meta-mono text-meta-mono text-ink-muted">{countLabel}</p>
        </div>
      </header>
      <div className="mt-space-sm">{children}</div>
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-4 motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:group-hover/back:-translate-x-1 motion-safe:group-focus-visible/back:-translate-x-1"
    >
      <path
        d="M13 8H3M7 4 3 8l4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GalleryMotion() {
  return (
    <style>{`
      .roots-plate-media {
        opacity: 0;
      }
      .roots-plate[data-settle="portrait"] .roots-plate-media {
        transform: translateY(10px);
      }
      .roots-plate[data-settle="shift"] .roots-plate-media {
        transform: translateX(12px);
        clip-path: inset(0 8% 0 0);
      }
      .roots-plate[data-settle="widen"] .roots-plate-media {
        clip-path: inset(0 8% 0 8%);
      }
      .roots-plate[data-settle="close"] .roots-plate-media {
        transform: scale(0.99);
        clip-path: inset(0 5% 0 5%);
      }
      .roots-plate[data-settled="true"] .roots-plate-media {
        opacity: 1;
        transform: none;
        clip-path: inset(0);
      }
      .roots-plate figcaption {
        opacity: 0;
        transform: translateY(6px);
      }
      .roots-plate[data-settled="true"] figcaption {
        opacity: 1;
        transform: none;
      }
      @media (prefers-reduced-motion: no-preference) {
        .roots-plate-media,
        .roots-plate figcaption {
          transition:
            opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
            clip-path 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .roots-plate figcaption {
          transition-delay: 70ms;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .roots-plate-media {
          transition: none;
          transform: none;
          clip-path: none;
        }
        .roots-plate[data-settled="true"] .roots-plate-media,
        .roots-plate[data-settled="true"] figcaption {
          opacity: 1;
          transform: none;
        }
        .roots-plate[data-settled="false"] .roots-plate-media,
        .roots-plate[data-settled="false"] figcaption {
          opacity: 0;
          transform: none;
        }
      }
    `}</style>
  );
}
