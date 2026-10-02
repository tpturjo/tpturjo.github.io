const portraitSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpihe_a1A2edBoU1m6Omv9DKyU6TGicoTAsbhEsXJvEZwUOgZJyRroFR5maRD0hoQ4kAdGtgxGXcy4Sb3HP3B-fb9CBrIVWXxwcAMA9epL13Aj-cqu6HOvQP2BFNmAPKb_w5pxZu_wU9Ly2jxrESrVvg94Ptl3BBBJsnUjuwjikYMMPHA-U8sP823YI7ZikX1JSh-fWcCxzqqL4XYw6NFF12rGogySUkAeisu1eBhTf-9xId-WSRloMhUsqTEfiomGCw";

const paragraphs = [
  "Technology has interested me for as long as I can remember, and games were probably where that started. I enjoyed playing them, but I was just as curious about how they were made and how all the different pieces came together into something interactive.",
  "As I got older, that curiosity expanded into computers, software, the internet, AI, and technology more broadly. Studying Computer Science gave me the chance to explore those interests seriously. I tried web development, APIs, data, AI and NLP, databases, interactive systems, and research software because I did not want to narrow myself too early. I wanted to learn what I enjoyed by actually building things.",
  "That same curiosity was part of why I left Bangladesh for Canada to study. Education was the main reason, but I also wanted the experience of living somewhere new, meeting people from different backgrounds, and learning how to manage life independently. Balancing university, work, and everyday responsibilities made me more comfortable making decisions, solving problems, and taking responsibility for things myself.",
  "Now I am at the beginning of my career, and that curiosity is still there. There are areas of technology I've spent a lot of time with and many more I haven't explored yet. I want to work on real problems, build useful things, work with people who care about what they are creating, and keep growing through the work I get the chance to do.",
];

export default function About() {
  return (
    <section
      id="about"
      className="w-full border-y border-border-hairline bg-surface-card py-space-2xl"
    >
      <div className="mx-auto max-w-7xl px-margin lg:px-margin-desktop">
        <div className="mb-space-xl flex flex-col justify-between border-b border-border-hairline pb-space-sm md:flex-row md:items-end">
          <div>
            <span className="mb-1 block font-meta-mono text-label-code tracking-widest text-forest-moss uppercase">
              Narrative
            </span>
            <h2 className="font-serif text-headline-lg text-ink-primary">Background & Perspective</h2>
          </div>
          <span className="mt-2 font-meta-mono text-meta-mono text-ink-muted md:mt-0">
            The Person Behind the Systems
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-gutter-desktop lg:grid-cols-12">
          <figure className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div className="group relative rounded border border-border-hairline bg-surface-base p-2 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-[280ms] motion-safe:ease-out hover:border-stone-sand hover:shadow-[0_14px_28px_-22px_rgba(24,24,27,0.45)]">
              <div className="overflow-hidden rounded">
                {/* Plain img: this temporary remote photo must stay available on static GitHub Pages. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitSrc}
                  alt="Tridib Paul Turjo"
                  className="h-auto w-full object-cover grayscale-[10%] motion-safe:transition-[filter,transform] motion-safe:duration-[280ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.015] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="px-space-sm pt-space-sm text-center font-meta-mono text-meta-mono text-ink-muted motion-safe:transition-colors motion-safe:duration-[280ms] motion-safe:ease-out group-hover:text-ink-secondary">
                Niagara Falls, Ontario
              </figcaption>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-3 h-px w-[46%] origin-left scale-x-0 bg-forest-moss motion-safe:transition-transform motion-safe:duration-[320ms] motion-safe:ease-out motion-safe:group-hover:scale-x-100"
              />
            </div>
          </figure>

          <div className="space-y-space-md lg:col-span-7">
            <h3 className="font-serif text-headline-md text-ink-primary">
              Curiosity has always been the starting point.
            </h3>
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-body-lg text-ink-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
