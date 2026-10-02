"use client";

import { useEffect, useRef, useState } from "react";
import {
  collectionCountLabel,
  collectionCover,
  elsewhereCollections,
  type ElsewhereCollection,
  type ElsewherePhoto,
} from "@/components/elsewhere-data";
import { CollectionGallery } from "@/components/elsewhere/RootsGallery";

const SWITCH_MS = 440;
const HOVER_INTENT_MS = 200;

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-forest-moss";

export default function Elsewhere() {
  const initialId = elsewhereCollections[0].id;
  const [activeId, setActiveId] = useState(initialId);
  const [outgoingId, setOutgoingId] = useState<string | null>(null);
  const selectedRef = useRef(initialId);
  const displayedRef = useRef(initialId);
  const allowHover = useRef(false);
  const hoverTimer = useRef<number | null>(null);
  const hoverToken = useRef(0);
  const clearTimer = useRef<number | null>(null);
  const [mode, setMode] = useState<"selector" | "open">("selector");
  const [openId, setOpenId] = useState(initialId);
  const [phase, setPhase] = useState<"idle" | "opening" | "closing">("idle");
  const phaseTimer = useRef<number | null>(null);
  const beginCloseRef = useRef<() => void>(() => {});

  const active =
    elsewhereCollections.find((collection) => collection.id === activeId) ?? elsewhereCollections[0];
  const outgoing =
    outgoingId === null
      ? null
      : (elsewhereCollections.find((collection) => collection.id === outgoingId) ?? null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      allowHover.current = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
      if (clearTimer.current !== null) window.clearTimeout(clearTimer.current);
      if (phaseTimer.current !== null) window.clearTimeout(phaseTimer.current);
    };
  }, []);

  function show(id: string) {
    const previousId = displayedRef.current;
    if (id === previousId) return;
    displayedRef.current = id;
    setOutgoingId(previousId);
    setActiveId(id);
    if (clearTimer.current !== null) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => {
      setOutgoingId((current) => (current === previousId ? null : current));
    }, SWITCH_MS + 40);
  }

  function cancelHoverIntent() {
    hoverToken.current += 1;
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }

  function queuePreview(id: string) {
    if (!allowHover.current) return;
    cancelHoverIntent();
    const token = hoverToken.current;
    hoverTimer.current = window.setTimeout(() => {
      if (hoverToken.current !== token) return;
      hoverTimer.current = null;
      setPreview(id);
    }, HOVER_INTENT_MS);
  }

  function setPreview(id: string) {
    show(id);
  }

  function clearPreview() {
    show(selectedRef.current);
  }

  function commitSelection(id: string) {
    cancelHoverIntent();
    selectedRef.current = id;
    show(id);
  }

  function selectPersistent(id: string) {
    commitSelection(id);
    window.requestAnimationFrame(() => {
      document.getElementById(`elsewhere-chapter-${id}`)?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    });
  }

  function anchorElsewhere() {
    document.getElementById("elsewhere")?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  function motionMs(kind: "open" | "close") {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
    return kind === "open" ? 280 : 300;
  }

  function openCollection(id: string) {
    if (mode === "open" || phase !== "idle") return;
    commitSelection(id);
    setOpenId(id);
    anchorElsewhere();
    setMode("open");
    setPhase("opening");
    if (phaseTimer.current !== null) window.clearTimeout(phaseTimer.current);
    phaseTimer.current = window.setTimeout(() => {
      phaseTimer.current = null;
      setPhase("idle");
      document.getElementById("roots-return")?.focus({ preventScroll: true });
    }, motionMs("open"));
  }

  function advanceCollection() {
    if (mode !== "open" || phase === "closing") return;
    const index = elsewhereCollections.findIndex((collection) => collection.id === openId);
    const next = elsewhereCollections[index + 1];
    if (!next) {
      beginClose();
      return;
    }
    commitSelection(next.id);
    setOpenId(next.id);
  }

  function beginClose() {
    if (mode !== "open" || phase === "closing") return;
    const name =
      elsewhereCollections.find((collection) => collection.id === openId)?.name ??
      elsewhereCollections[0].name;
    anchorElsewhere();
    setPhase("closing");
    if (phaseTimer.current !== null) window.clearTimeout(phaseTimer.current);
    phaseTimer.current = window.setTimeout(() => {
      phaseTimer.current = null;
      setMode("selector");
      setPhase("idle");
      document
        .querySelector<HTMLElement>(`[aria-label="Enter the ${name} collection"]`)
        ?.focus({ preventScroll: true });
    }, motionMs("close"));
  }

  beginCloseRef.current = beginClose;

  function onNavigatorLeave() {
    cancelHoverIntent();
    clearPreview();
  }

  function onIndexKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const target = event.target;
    const fromId =
      target instanceof HTMLElement
        ? target.closest<HTMLElement>("[data-chapter-id]")?.dataset.chapterId
        : undefined;
    const origin = fromId ?? displayedRef.current;
    const index = elsewhereCollections.findIndex((collection) => collection.id === origin);
    const current = index < 0 ? 0 : index;
    let next = current;
    if (key === "ArrowDown" || key === "ArrowRight") {
      next = (current + 1) % elsewhereCollections.length;
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      next = (current - 1 + elsewhereCollections.length) % elsewhereCollections.length;
    } else if (key === "Home") {
      next = 0;
    } else {
      next = elsewhereCollections.length - 1;
    }
    const nextId = elsewhereCollections[next].id;
    const button = document.getElementById(`elsewhere-chapter-${nextId}`);
    button?.focus();
    button?.scrollIntoView({ block: "nearest", inline: "nearest" });
    setPreview(nextId);
  }

  useEffect(() => {
    if (mode !== "open") return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      event.preventDefault();
      beginCloseRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const showSelector = mode === "selector" || phase !== "idle";
  const showViewer = mode === "open";
  const openCollectionData =
    elsewhereCollections.find((collection) => collection.id === openId) ?? elsewhereCollections[0];
  const selectorClass =
    phase === "opening"
      ? "elsewhere-recede pointer-events-none absolute inset-x-0 top-0 z-10 bg-surface-base"
      : undefined;
  const rootsClass =
    phase === "closing"
      ? "elsewhere-recede pointer-events-none absolute inset-x-0 top-0 z-10 bg-surface-base"
      : undefined;

  return (
    <section id="elsewhere" className="w-full scroll-mt-20 overflow-x-clip py-space-2xl">
      <ElsewhereMotion />
      <div className="relative mx-auto max-w-7xl px-margin lg:px-margin-desktop">
        {showSelector ? (
          <div className={selectorClass} inert={phase === "opening" ? true : undefined}>
        <header>
          <div className="border-b border-border-hairline pb-2">
            <span className="font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
              Off the Clock
            </span>
          </div>
          <h2 className="mt-space-sm font-serif text-headline-lg text-ink-primary">Elsewhere</h2>
        </header>

        <ElsewhereIntro />

        <div className="mt-space-lg grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12 lg:gap-x-gutter-desktop">
          <FeaturedChapter collection={active} outgoing={outgoing} onOpen={openCollection} />
          <div
            className="elsewhere-index-scroll -mx-margin snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-margin lg:col-span-5 lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0"
            onMouseLeave={onNavigatorLeave}
          >
            <div
              role="group"
              aria-label="Photographic collections"
              className="flex w-max gap-3 lg:w-auto lg:flex-col lg:gap-0 lg:border-t lg:border-border-hairline"
              onKeyDown={onIndexKeyDown}
            >
              {elsewhereCollections.map((collection) => (
                <ChapterButton
                  key={collection.id}
                  collection={collection}
                  active={collection.id === active.id}
                  onSelect={selectPersistent}
                  onHoverIntent={queuePreview}
                  onCancelIntent={cancelHoverIntent}
                  onPreview={setPreview}
                />
              ))}
            </div>
          </div>
        </div>
          </div>
        ) : null}
        {showViewer ? (
          <div className={rootsClass} inert={phase === "closing" ? true : undefined}>
            <CollectionGallery
              key={openCollectionData.id}
              collection={openCollectionData}
              onReturn={beginClose}
              onNext={advanceCollection}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ElsewhereIntro() {
  return (
    <div className="mt-space-md">
      <p className="max-w-3xl font-serif text-[1.375rem] leading-snug text-ink-primary">
        When I&apos;m not working on something technical, I&apos;m usually doing something a little less structured.
      </p>
      <div className="mt-space-md grid grid-cols-1 gap-x-gutter-desktop gap-y-space-md md:grid-cols-2 md:gap-y-space-lg">
        <p className="font-sans text-body-md leading-relaxed text-ink-secondary">
          Outside of work, I'm usually out somewhere, walking with my camera, looking for things worth keeping. Street photography is what I enjoy most. I'm drawn to streets, people, colours, buildings, and the small everyday moments that most people walk past. I've taken photos in Bangladesh, around Newfoundland, and in other places I've had the chance to visit, and each photo is a small piece of wherever I was.
        </p>
        <p className="font-sans text-body-md leading-relaxed text-ink-secondary">
          Food is part of that too. I barely cooked before I moved away from home. When I started missing Bangladeshi food and the meals I grew up with, I taught myself to make them, and over time cooking became something I genuinely love. Now trying a new cuisine, finding somewhere good to eat, or making something myself is a big part of how I experience a place.
        </p>
        <p className="font-sans text-body-md leading-relaxed text-ink-secondary">
          At home, I have two cats, Rhaenys and Vivi, who are both convinced the house belongs to them. I live on my own, so they're my family here. They're the ones who say hello every time I get home, and it's the best part of walking through the door. They have very different personalities, which is probably why they ended up with their own little collection here.
        </p>
        <p className="font-sans text-body-md leading-relaxed text-ink-secondary">
          I grew up in a family where music and the arts were part of everyday life, so I tried a bit of everything as a kid: singing, art, and tabla, a South Asian hand drum. None of it stuck, but I never stopped listening to music. A lot of that listening eventually turned into learning guitar on my own. I'm still a beginner, and I play for me: songs I love, whenever I feel like it.
        </p>
      </div>
      <div className="mt-space-lg border-t border-border-hairline pt-space-md">
        <p className="max-w-3xl font-serif text-body-lg leading-snug text-ink-primary italic">
          This is a small collection of some of those moments outside software.
        </p>
      </div>
    </div>
  );
}

function FeaturedChapter({
  collection,
  outgoing,
  onOpen,
}: {
  collection: ElsewhereCollection;
  outgoing: ElsewhereCollection | null;
  onOpen: (id: string) => void;
}) {
  const cover = collectionCover(collection);
  const count = String(collection.photographs.length).padStart(2, "0");

  return (
    <figure id="elsewhere-featured" className="min-w-0 lg:col-span-7">
      <button
        type="button"
        className={`group/frame relative block w-full cursor-pointer ${focusRing}`}
        aria-label={`View ${collection.name}: ${cover.title}, ${collection.photographs.length} photographs`}
        onClick={() => onOpen(collection.id)}
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded border border-border-hairline bg-surface-container motion-safe:transition-colors motion-safe:duration-300 group-hover/frame:border-stone-sand group-focus-visible/frame:border-stone-sand">
          {outgoing ? (
            <CoverImage
              key={outgoing.id}
              photo={collectionCover(outgoing)}
              position={outgoing.featuredPosition}
              alt=""
              className="elsewhere-retreat absolute inset-0 size-full object-cover"
            />
          ) : null}
          <CoverImage
            key={cover.src}
            photo={cover}
            position={collection.featuredPosition}
            alt=""
            className={`absolute inset-0 size-full object-cover ${outgoing ? "elsewhere-reveal" : ""}`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-2 border border-border-hairline bg-surface-base/92 px-2 py-1 font-meta-mono text-label-code tracking-[0.16em] text-ink-primary uppercase opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover/frame:opacity-100 group-focus-visible/frame:opacity-100 motion-reduce:transition-none"
          >
            <span className="text-forest-moss">View</span>
            <span className="text-ink-muted">/</span>
            <span>{count}</span>
          </span>
        </div>
      </button>

      <figcaption key={collection.id} className="elsewhere-copy mt-space-md">
        <p className="font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
          {collection.number} / {collection.name}
        </p>
        <h3 className="mt-1 font-serif text-headline-md text-ink-primary">{cover.title}</h3>
        <p className="mt-1 min-h-[3.25rem] font-serif text-body-md leading-relaxed text-ink-secondary italic">
          {collection.coverCaption}
        </p>
        <div className="mt-space-sm flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="font-meta-mono text-meta-mono text-ink-muted">{collectionCountLabel(collection)}</p>
          <button
            type="button"
            className={`group/enter relative inline-flex cursor-pointer items-center gap-1.5 font-meta-mono text-label-code tracking-[0.14em] text-forest-moss uppercase ${focusRing}`}
            aria-label={`Enter the ${collection.name} collection`}
            onClick={() => onOpen(collection.id)}
          >
            <span>Enter collection</span>
            <ArrowIcon />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out group-hover/enter:scale-x-100 group-focus-visible/enter:scale-x-100"
            />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

function ChapterButton({
  collection,
  active,
  onSelect,
  onHoverIntent,
  onCancelIntent,
  onPreview,
}: {
  collection: ElsewhereCollection;
  active: boolean;
  onSelect: (id: string) => void;
  onHoverIntent: (id: string) => void;
  onCancelIntent: () => void;
  onPreview: (id: string) => void;
}) {
  const cover = collectionCover(collection);
  const label = active
    ? `${collection.number} ${collection.name}. ${collection.line} ${collectionCountLabel(collection)}.`
    : `${collection.number} ${collection.name}`;

  return (
    <button
      id={`elsewhere-chapter-${collection.id}`}
      type="button"
      data-chapter-id={collection.id}
      data-active={active ? "true" : "false"}
      aria-pressed={active}
      aria-controls="elsewhere-featured"
      aria-label={label}
      className={`elsewhere-chapter flex w-[9.5rem] shrink-0 snap-start cursor-pointer flex-col border-b-2 border-transparent px-0.5 pb-2 text-left data-[active=true]:border-forest-moss lg:w-full lg:shrink lg:grid lg:grid-cols-[2.75rem_minmax(0,1fr)] lg:items-start lg:gap-x-3 lg:border-b lg:border-border-hairline lg:px-1 lg:py-3 lg:data-[active=true]:border-border-hairline ${focusRing}`}
      onClick={() => onSelect(collection.id)}
      onMouseEnter={() => onHoverIntent(collection.id)}
      onMouseLeave={onCancelIntent}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) onPreview(collection.id);
      }}
    >
      <span className="elsewhere-num font-meta-mono text-label-code tracking-widest text-forest-moss">
        {collection.number}
      </span>
      <span className="order-3 mt-1.5 block min-h-8 lg:order-none lg:col-start-2 lg:mt-0">
        <span className="elsewhere-chapter-name block font-meta-mono text-[0.68rem] leading-snug tracking-[0.14em] text-ink-secondary uppercase lg:text-label-code lg:tracking-[0.16em]">
          {collection.name}
        </span>
      </span>
      <span className="relative order-2 mt-1.5 block h-16 w-full lg:order-none lg:col-start-2 lg:mt-2 lg:h-[4.5rem]">
        <span
          aria-hidden={active}
          className={`absolute inset-0 overflow-hidden rounded-sm border border-border-hairline bg-surface-container motion-safe:transition-opacity motion-safe:duration-[420ms] motion-safe:ease-out ${
            active ? "lg:pointer-events-none lg:opacity-0" : "opacity-100"
          }`}
        >
          <CoverImage
            photo={cover}
            position={collection.slicePosition}
            alt=""
            className="elsewhere-slice-img size-full object-cover"
          />
        </span>
        <span
          aria-hidden={!active}
          className={`absolute inset-0 hidden flex-col justify-center motion-safe:transition-opacity motion-safe:duration-[420ms] motion-safe:ease-out lg:flex ${
            active ? "lg:opacity-100" : "pointer-events-none lg:opacity-0"
          }`}
        >
          <span aria-hidden="true" className="elsewhere-rule block h-px w-12 bg-forest-moss" />
          <span className="mt-1.5 line-clamp-2 font-serif text-[0.78rem] leading-snug text-ink-secondary italic lg:text-body-sm lg:leading-snug">
            {collection.line}
          </span>
          <span className="mt-1 font-meta-mono text-[0.65rem] tracking-wide text-ink-muted lg:text-meta-mono">
            {collectionCountLabel(collection)}
          </span>
        </span>
      </span>
    </button>
  );
}

function CoverImage({
  photo,
  position,
  alt,
  className,
}: {
  photo: ElsewherePhoto;
  position: string;
  alt: string;
  className: string;
}) {
  return (
    // Plain img: local public files must stay available on static GitHub Pages.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      alt={alt}
      width={photo.width}
      height={photo.height}
      draggable={false}
      decoding="async"
      loading="lazy"
      className={className}
      style={{ objectPosition: position }}
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5 motion-safe:transition-transform motion-safe:duration-[170ms] motion-safe:ease-out motion-safe:group-hover/enter:translate-x-0.5 motion-safe:group-focus-visible/enter:translate-x-0.5"
    >
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

function ElsewhereMotion() {
  return (
    <style>{`
      .elsewhere-index-scroll {
        scrollbar-width: thin;
        scrollbar-color: var(--color-stone-sand) transparent;
      }
      .elsewhere-chapter-name {
        transform: translateX(0);
      }
      .elsewhere-rule {
        transform: scaleX(0);
        transform-origin: left center;
      }
      .elsewhere-chapter[aria-pressed="true"] .elsewhere-num {
        color: var(--color-forest-deep);
      }
      .elsewhere-chapter[aria-pressed="true"] .elsewhere-chapter-name {
        font-family: var(--font-newsreader), Georgia, "Times New Roman", serif;
        font-size: 0.95rem;
        font-weight: 400;
        letter-spacing: 0.06em;
        line-height: 1.15;
        color: var(--color-ink-primary);
      }
      .elsewhere-chapter[aria-pressed="true"] .elsewhere-rule {
        transform: scaleX(1);
      }
      .elsewhere-slice-img {
        transform: scale(1.04);
      }
      @media (min-width: 1024px) {
        .elsewhere-chapter[aria-pressed="true"] .elsewhere-chapter-name {
          font-size: 1.375rem;
          letter-spacing: 0.045em;
          transform: translateX(0.3rem);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .elsewhere-chapter:not([aria-pressed="true"]):hover .elsewhere-chapter-name,
        .elsewhere-chapter:not([aria-pressed="true"]):focus-visible .elsewhere-chapter-name {
          color: var(--color-forest-moss);
        }
        .elsewhere-chapter:not([aria-pressed="true"]):hover .elsewhere-slice-img,
        .elsewhere-chapter:not([aria-pressed="true"]):focus-visible .elsewhere-slice-img {
          transform: scale(1.08);
        }
      }
      @media (prefers-reduced-motion: no-preference) {
        .elsewhere-chapter-name,
        .elsewhere-rule,
        .elsewhere-slice-img {
          transition:
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
            color 200ms ease;
        }
        .elsewhere-reveal {
          animation: elsewhere-reveal 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .elsewhere-retreat {
          animation: elsewhere-retreat 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .elsewhere-copy {
          animation: elsewhere-copy 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      }
      .elsewhere-recede {
        animation: elsewhere-recede 280ms ease forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .elsewhere-reveal {
          animation: elsewhere-fade 160ms ease both;
        }
        .elsewhere-copy,
        .elsewhere-recede {
          animation: none;
        }
      }
      @keyframes elsewhere-reveal {
        from { clip-path: inset(34% 0 34% 0); }
        to { clip-path: inset(0 0 0 0); }
      }
      @keyframes elsewhere-retreat {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.975); }
      }
      @keyframes elsewhere-copy {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: none; }
      }
      @keyframes elsewhere-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes elsewhere-recede {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `}</style>
  );
}
