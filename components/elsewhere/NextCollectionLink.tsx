"use client";

import { collectionCover, type ElsewhereCollection } from "@/components/elsewhere-data";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-forest-moss";

export function NextCollectionLink({
  collection,
  totalCollections,
  onOpen,
}: {
  collection: ElsewhereCollection;
  totalCollections: number;
  onOpen: () => void;
}) {
  const cover = collectionCover(collection);

  return (
    <div className="mt-space-xl border-t border-border-hairline pt-space-lg">
      <button
        type="button"
        onClick={onOpen}
        className={`group/next block max-w-md text-left ${focusRing}`}
        aria-label={`Next collection, ${collection.number} of ${String(totalCollections).padStart(2, "0")}, ${collection.name}. ${collection.line}`}
      >
        <span className="block font-meta-mono text-label-code tracking-widest text-ink-muted uppercase">
          Next collection
        </span>
        <span className="mt-2 block font-meta-mono text-label-code tracking-widest text-forest-moss">
          {collection.number} / {String(totalCollections).padStart(2, "0")}
        </span>
        <span className="mt-1 block font-serif text-headline-md text-ink-primary">{collection.name}</span>
        <span className="mt-1 block max-w-sm font-serif text-body-md leading-relaxed text-ink-secondary italic">
          {collection.line}
        </span>
        <span className="mt-space-md inline-flex items-center gap-3">
          <span className="block h-28 w-52 overflow-hidden rounded border border-border-hairline bg-surface-container sm:h-32 sm:w-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.src}
              alt=""
              width={cover.width}
              height={cover.height}
              draggable={false}
              decoding="async"
              loading="lazy"
              className="size-full object-cover"
              style={{ objectPosition: collection.featuredPosition }}
            />
          </span>
          <span
            aria-hidden="true"
            className="text-forest-moss motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:group-hover/next:translate-x-0.5 motion-safe:group-focus-visible/next:translate-x-0.5"
          >
            <ArrowIcon />
          </span>
        </span>
      </button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
