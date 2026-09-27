"use client";

import { useEffect, useId, useLayoutEffect, useState } from "react";

const links = [
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#capabilities", label: "Skills" },
  {
    href: "#about",
    label: "About",
    ariaLabel: "Go to About section",
    title: "About Tridib Paul Turjo",
  },
  { href: "#elsewhere", label: "Elsewhere" },
  { href: "#contact", label: "Contact" },
] as const;

const nameRevealOffset = 128;
const portraitSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpihe_a1A2edBoU1m6Omv9DKyU6TGicoTAsbhEsXJvEZwUOgZJyRroFR5maRD0hoQ4kAdGtgxGXcy4Sb3HP3B-fb9CBrIVWXxwcAMA9epL13Aj-cqu6HOvQP2BFNmAPKb_w5pxZu_wU9Ly2jxrESrVvg94Ptl3BBBJsnUjuwjikYMMPHA-U8sP823YI7ZikX1JSh-fWcCxzqqL4XYw6NFF12rGogySUkAeisu1eBhTf-9xId-WSRloMhUsqTEfiomGCw";

export default function Navigation() {
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [availabilityLive, setAvailabilityLive] = useState(false);
  const [availabilitySettled, setAvailabilitySettled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nextName = y > nameRevealOffset;
      const nextScrolled = y > 8;

      setNameVisible((current) => (current === nextName ? current : nextName));
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onSettled = () => setAvailabilityLive(true);
    window.addEventListener("highlights-entrance-end", onSettled);
    return () => window.removeEventListener("highlights-entrance-end", onSettled);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-surface-base/95 backdrop-blur-md motion-safe:transition-[border-color,box-shadow] motion-safe:duration-300 ${
        scrolled
          ? "border-ink-primary/25 shadow-[0_2px_10px_rgb(24_24_27_/_0.07)]"
          : "border-border-hairline shadow-none"
      }`}
    >
      <style>{`
        .nav-avail-ripple {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1px solid var(--color-forest-moss);
          opacity: 0;
          pointer-events: none;
        }
        .nav-avail.is-live .nav-avail-ripple {
          animation: nav-avail-ripple 0.85s ease-out 1 both;
        }
        .nav-avail.is-live {
          animation: nav-avail-shell 0.85s ease-out 1 both;
        }
        .nav-avail-dot.is-intro {
          animation: nav-avail-intro 0.85s ease-out 1 both;
        }
        .nav-avail-dot.is-calm {
          animation: status-dot 5.6s ease-in-out infinite;
        }
        @keyframes nav-avail-ripple {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(3.2);
            opacity: 0;
          }
        }
        @keyframes nav-avail-intro {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          38% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes nav-avail-shell {
          0%,
          100% {
            border-color: rgb(45 90 67 / 0.3);
          }
          40% {
            border-color: rgb(45 90 67 / 0.55);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-avail-ripple {
            display: none;
          }
          .nav-avail.is-live,
          .nav-avail-dot.is-intro,
          .nav-avail-dot.is-calm {
            animation: none;
          }
        }
      `}</style>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-margin lg:px-margin-desktop">
        <div className="relative flex min-w-0 items-center">
          <p
            className={`nav-avail inline-flex max-w-[9.5rem] items-center gap-space-xs rounded-full border border-forest-moss/30 bg-forest-light px-[0.5625rem] py-[0.3125rem] text-forest-deep sm:max-w-none ${
              availabilityLive && !availabilitySettled ? "is-live" : ""
            }`}
          >
            <span className="relative size-2 shrink-0 sm:size-[0.5625rem]">
              <span aria-hidden="true" className="nav-avail-ripple" />
              <span
                aria-hidden="true"
                onAnimationEnd={(event) => {
                  if (event.animationName === "nav-avail-intro") setAvailabilitySettled(true);
                }}
                className={`nav-avail-dot absolute inset-0 rounded-full bg-forest-moss ${
                  availabilityLive && !availabilitySettled ? "is-intro" : ""
                } ${availabilitySettled ? "is-calm" : ""}`}
              />
            </span>
            <span className="font-label-code text-label-code leading-tight sm:text-meta-mono sm:whitespace-nowrap">
              Available for Opportunities
            </span>
          </p>
          <span
            className={`pointer-events-none absolute top-1/2 left-full ml-4 hidden -translate-y-1/2 font-serif text-body-md font-medium whitespace-nowrap text-ink-primary motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:ease-out xl:block ${
              nameVisible ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0"
            }`}
            aria-hidden={nameVisible ? undefined : true}
          >
            Tridib Paul Turjo
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-space-md xl:gap-space-lg">
          <nav aria-label="Primary" className="hidden items-center gap-space-md xl:gap-space-lg lg:flex">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-space-md">
          <ProfilePhoto />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-label-nav text-label-nav text-ink-secondary transition-colors duration-200 hover:text-forest-moss lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Primary"
          className="border-t border-border-hairline bg-surface-base lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-margin py-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={"ariaLabel" in link ? link.ariaLabel : undefined}
                  title={"title" in link ? link.title : undefined}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center border-b border-border-subtle font-label-nav text-label-nav text-ink-secondary no-underline transition-colors duration-200 hover:text-forest-moss"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  label,
  ariaLabel,
  title,
}: {
  href: string;
  label: string;
  ariaLabel?: string;
  title?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      title={title}
      className="group relative inline-flex items-center font-label-nav text-label-nav text-ink-secondary no-underline motion-safe:transition-[color,transform] motion-safe:duration-300 motion-safe:ease-out hover:text-forest-moss motion-safe:hover:-translate-y-0.5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-sm bg-forest-light opacity-0 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="relative">{label}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(100%+3px)] left-0 h-px w-full origin-left scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  );
}

function ProfilePhoto() {
  return (
    <a
      href="#about"
      aria-label="Go to About section"
      title="About Tridib Paul Turjo"
      className="group inline-flex size-11 items-center justify-center rounded-full no-underline lg:size-8"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- same remote portrait as About */}
      <img
        src={portraitSrc}
        alt=""
        className="size-8 rounded-full border border-border-hairline object-cover object-center motion-safe:transition-[transform,border-color,box-shadow] motion-safe:duration-300 motion-safe:ease-out group-hover:scale-[1.06] group-hover:border-forest-moss group-hover:shadow-[0_0_0_2px_rgb(233_239_234),0_0_10px_rgb(45_90_67_/_0.28)] group-focus-visible:border-forest-moss group-focus-visible:shadow-[0_0_0_2px_rgb(233_239_234),0_0_10px_rgb(45_90_67_/_0.28)]"
      />
    </a>
  );
}
