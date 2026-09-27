"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { elsewhereCollections, type ElsewhereCollection } from "@/components/elsewhere-data";
import { framesFor, type FrameLayout } from "@/components/elsewhere/frames";
import { GalleryLayer } from "@/components/elsewhere/GalleryLayer";
import { StoryPlate } from "@/components/elsewhere/StoryPlate";

const FRAME_MS = 420;

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-forest-moss";

export function CollectionGallery({
  collection,
  onReturn,
  onNext,
}: {
  collection: ElsewhereCollection;
  onReturn: () => void;
  onNext: () => void;
}) {
  const photos = collection.photographs;
  const frames = framesFor(collection.id);
  const nextCollection = elsewhereCollections[elsewhereCollections.findIndex((item) => item.id === collection.id) + 1] ?? null;
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const total = String(photos.length).padStart(2, "0");

  useEffect(() => {
    return () => {
      if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    const neighbors = [photos[current - 1], photos[current + 1]].filter((item) => item !== undefined);
    for (const item of neighbors) {
      const img = new Image();
      img.src = item.src;
    }
  }, [current, photos]);

  function go(next: number) {
    if (next === current || next < 0 || next >= photos.length) return;
    setLeaving(current);
    setCurrent(next);
    if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : FRAME_MS;
    leaveTimer.current = window.setTimeout(() => {
      leaveTimer.current = null;
      setLeaving(null);
    }, delay);
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(current - 1);
    }
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    gesture.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!gesture.current) return;
    const dx = event.clientX - gesture.current.x;
    const dy = event.clientY - gesture.current.y;
    gesture.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? current + 1 : current - 1);
  }

  const last = current === photos.length - 1;

  return (
    <GalleryLayer
      collection={collection}
      totalCollections={elsewhereCollections.length}
      onReturn={onReturn}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative h-[23.5rem] touch-pan-y overflow-hidden sm:h-[26.5rem] lg:h-[30rem]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          gesture.current = null;
        }}
      >
        {photos.map((photo, index) => {
          if (index !== current && index !== leaving) return null;
          const frame: FrameLayout | undefined = frames[index];
          if (!frame) return null;
          return (
            <StoryPlate
              key={photo.title}
              photo={photo}
              indexLabel={`${String(index + 1).padStart(2, "0")} / ${total}`}
              settle={frame.settle}
              active={index === current}
              priority={index === 0}
              objectPosition={frame.objectPosition}
              figureClassName={`absolute inset-0 ${index === current ? "z-10" : "z-0 pointer-events-none"} ${frame.figureClassName}`}
              mediaClassName={frame.mediaClassName}
              captionClassName={frame.captionClassName}
              textSide={frame.textSide}
            />
          );
        })}
      </div>
      <FrameNav
        titles={photos.map((photo) => photo.title)}
        current={current}
        last={last}
        nextCollectionName={nextCollection?.name ?? null}
        onSelect={go}
        onPrevious={() => go(current - 1)}
        onNext={() => go(current + 1)}
        onNextCollection={onNext}
        onClose={onReturn}
      />
    </GalleryLayer>
  );
}

function FrameNav({
  titles,
  current,
  last,
  nextCollectionName,
  onSelect,
  onPrevious,
  onNext,
  onNextCollection,
  onClose,
}: {
  titles: readonly string[];
  current: number;
  last: boolean;
  nextCollectionName: string | null;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onNextCollection: () => void;
  onClose: () => void;
}) {
  const previousTitle = current > 0 ? titles[current - 1] : null;
  const nextTitle = last ? null : titles[current + 1];

  return (
    <nav aria-label="Photograph navigation" className="mt-4 border-t border-border-hairline pt-3.5">
      <div className="grid grid-cols-2 items-start gap-x-3 sm:gap-x-8">
        <div>
          {previousTitle ? (
            <DirectionButton
              direction="left"
              kicker="Previous"
              title={previousTitle}
              label={`Previous photograph: ${previousTitle}`}
              onClick={onPrevious}
            />
          ) : null}
        </div>
        <div className="flex justify-end">
          {nextTitle ? (
            <DirectionButton
              direction="right"
              kicker="Next"
              title={nextTitle}
              label={`Next photograph: ${nextTitle}`}
              onClick={onNext}
            />
          ) : nextCollectionName ? (
            <DirectionButton
              direction="right"
              kicker="Next collection"
              title={nextCollectionName}
              label={`Next collection: ${nextCollectionName}`}
              onClick={onNextCollection}
            />
          ) : (
            <DirectionButton
              direction="right"
              kicker="Back to collections"
              title="Elsewhere"
              label="Back to collections"
              onClick={onClose}
            />
          )}
        </div>
      </div>
      <div role="group" aria-label="Photograph sequence" className="mt-1 flex items-center justify-center">
        {titles.map((title, index) => {
          const selected = index === current;
          const label = String(index + 1).padStart(2, "0");
          return (
            <button
              key={label}
              type="button"
              aria-pressed={selected}
              aria-label={`View photograph ${index + 1}: ${title}`}
              onClick={() => onSelect(index)}
              className={`relative inline-flex size-11 cursor-pointer items-center justify-center font-meta-mono text-label-code tracking-widest motion-safe:transition-colors motion-safe:duration-300 ${
                selected ? "text-forest-deep" : "text-on-surface-variant hover:text-forest-deep"
              } ${focusRing}`}
            >
              {label}
              <span
                aria-hidden="true"
                className={`absolute bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-forest-moss motion-safe:transition-transform motion-safe:duration-300 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function DirectionButton({
  direction,
  kicker,
  title,
  label,
  onClick,
}: {
  direction: "left" | "right";
  kicker: string;
  title: string;
  label: string;
  onClick: () => void;
}) {
  const toEnd = direction === "right";
  const longKicker = kicker.length > 16;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group/step flex min-h-11 w-full min-w-0 max-w-full cursor-pointer flex-col justify-center px-0.5 py-1 sm:w-auto sm:max-w-xs sm:min-w-48 ${
        toEnd ? "items-end text-right" : "items-start text-left"
      } ${focusRing}`}
    >
      <span
        className={`inline-flex max-w-full items-center gap-2 font-meta-mono font-medium text-forest-deep uppercase motion-safe:transition-colors motion-safe:duration-300 group-hover/step:text-ink-primary group-focus-visible/step:text-ink-primary ${
          longKicker
            ? "text-[0.75rem] tracking-[0.1em] sm:text-[0.875rem] sm:tracking-[0.14em]"
            : "text-[0.875rem] tracking-[0.14em]"
        } ${toEnd ? "justify-end" : ""}`}
      >
        {direction === "left" ? <Arrow direction="left" /> : null}
        {kicker}
        {direction === "right" ? <Arrow direction="right" /> : null}
      </span>
      <span className="mt-1 font-serif text-[1.0625rem] leading-tight text-ink-secondary motion-safe:transition-colors motion-safe:duration-300 group-hover/step:text-ink-primary group-focus-visible/step:text-ink-primary">
        {title}
      </span>
      <span
        aria-hidden="true"
        className={`mt-1.5 h-px w-6 bg-forest-moss motion-safe:transition-[width] motion-safe:duration-300 group-hover/step:w-11 group-focus-visible/step:w-11 ${
          toEnd ? "origin-right" : "origin-left"
        }`}
      />
    </button>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-4 motion-safe:transition-transform motion-safe:duration-[170ms] ${
        direction === "left"
          ? "motion-safe:group-hover/step:-translate-x-1 motion-safe:group-focus-visible/step:-translate-x-1"
          : "motion-safe:group-hover/step:translate-x-1 motion-safe:group-focus-visible/step:translate-x-1"
      }`}
    >
      <path
        d={direction === "left" ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
