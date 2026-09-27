"use client";

import { useEffect, useRef, useState } from "react";
import type { ElsewherePhoto } from "@/components/elsewhere-data";

export type PlateSettle = "portrait" | "shift" | "widen" | "close";

export function StoryPlate({
  photo,
  indexLabel,
  settle,
  figureClassName,
  mediaClassName,
  captionClassName,
  textSide,
  priority = false,
  armDelay = 0,
  active,
  objectPosition = "left center",
}: {
  photo: ElsewherePhoto;
  indexLabel: string;
  settle: PlateSettle;
  figureClassName: string;
  mediaClassName: string;
  captionClassName: string;
  textSide: "left" | "right";
  priority?: boolean;
  armDelay?: number;
  active?: boolean;
  objectPosition?: string;
}) {
  const plateRef = useRef<HTMLElement>(null);
  const [settled, setSettled] = useState(false);
  const controlled = active !== undefined;

  useEffect(() => {
    if (controlled) {
      if (!active) {
        const hide = window.setTimeout(() => setSettled(false), 0);
        return () => window.clearTimeout(hide);
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const show = window.setTimeout(() => setSettled(true), 0);
        return () => window.clearTimeout(show);
      }
      let inner = 0;
      const outer = window.requestAnimationFrame(() => {
        inner = window.requestAnimationFrame(() => setSettled(true));
      });
      return () => {
        window.cancelAnimationFrame(outer);
        window.cancelAnimationFrame(inner);
      };
    }

    const node = plateRef.current;
    if (!node) return;
    let observer: IntersectionObserver | null = null;
    const start = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setSettled(true);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setSettled(true);
          observer?.disconnect();
        },
        { threshold: 0.16 },
      );
      observer.observe(node);
    }, armDelay);
    return () => {
      window.clearTimeout(start);
      observer?.disconnect();
    };
  }, [active, armDelay, controlled]);

  return (
    <figure
      ref={plateRef}
      data-settle={settle}
      data-settled={settled ? "true" : "false"}
      data-text-side={textSide}
      className={`roots-plate ${figureClassName}`}
    >
      <div className={`flex min-h-0 items-end ${mediaClassName}`}>
        {/* Plain img: local public files must stay available on static GitHub Pages. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          draggable={false}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          className="roots-plate-media h-auto max-h-full w-auto max-w-full rounded border border-border-hairline object-contain"
          style={{ objectPosition }}
        />
      </div>
      <figcaption className={`${captionClassName} lg:flex lg:h-full lg:flex-col`}>
        <div className="lg:my-auto">
          <p className="font-meta-mono text-label-code tracking-widest text-forest-moss">{indexLabel}</p>
          <h3 className="mt-1 font-serif text-headline-md text-ink-primary">{photo.title}</h3>
          <span aria-hidden="true" className="roots-rule mt-2 block h-px w-10 bg-forest-moss" />
          {photo.caption ? (
            <p className="mt-2 max-w-md font-serif text-body-md leading-relaxed text-ink-secondary italic">
              {photo.caption}
            </p>
          ) : null}
        </div>
        <PhotoMeta date={photo.date} location={photo.location} />
      </figcaption>
    </figure>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function parsedDate(date: string) {
  const match = /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/.exec(date);
  if (!match) return null;
  const month = MONTHS.findIndex((item) => item.toLowerCase() === match[1].toLowerCase());
  if (month < 0) return null;
  return { month, day: match[2], year: match[3] };
}

function PhotoMeta({ date, location }: { date: string; location: string }) {
  const parsed = parsedDate(date);
  const shown = parsed ? `${parsed.day} ${MONTHS[parsed.month]} ${parsed.year}` : date;
  const iso = parsed
    ? `${parsed.year}-${String(parsed.month + 1).padStart(2, "0")}-${parsed.day.padStart(2, "0")}`
    : undefined;

  return (
    <p className="mt-4 font-meta-mono text-[0.6875rem] leading-snug tracking-[0.06em] text-ink-muted uppercase lg:mt-0 lg:pb-1">
      <time dateTime={iso}>{shown}</time>
      <span className="sr-only">, </span>
      <span aria-hidden="true" className="mx-[0.45em] hidden sm:inline">
        ·
      </span>
      <span className="mt-0.5 block sm:mt-0 sm:inline">{location}</span>
    </p>
  );
}
