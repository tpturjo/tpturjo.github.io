export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-hairline bg-surface-base">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-margin py-space-md sm:flex-row sm:items-baseline sm:justify-between lg:px-margin-desktop">
        <p className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="font-serif text-body-md text-ink-primary">Tridib Paul Turjo</span>
          <span className="font-meta-mono text-label-code text-ink-muted">Software Developer · Applied AI</span>
        </p>
        <p className="flex flex-col gap-0.5 font-meta-mono text-label-code text-ink-muted sm:flex-row sm:gap-space-lg">
          <span>St. John&apos;s, NL, Canada</span>
          <span>© {year} Tridib Paul Turjo</span>
        </p>
      </div>
    </footer>
  );
}
