import EbookCard, { type EbookCardData } from "./EbookCard";

export function VitrineCarousel({
  titulo,
  ebooks,
}: {
  titulo: string;
  ebooks: EbookCardData[];
}) {
  if (!ebooks.length) return null;

  return (
    <section className="relative mb-14 md:mb-20">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white md:text-xl">
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {titulo}
            </span>
          </h2>
          <p className="mt-1 text-xs text-zinc-500">Deslize para ver os títulos</p>
        </div>
        <span
          className="hidden font-mono text-[11px] text-cyan-500/70 motion-safe:animate-pulse sm:inline"
          aria-hidden
        >
          →
        </span>
      </div>

      <div className="relative -mx-4 md:-mx-6">
        <div
          className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-10 bg-gradient-to-r from-[#030712] to-transparent md:w-14"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-10 bg-gradient-to-l from-[#030712] to-transparent md:w-14"
          aria-hidden
        />

        <div className="vitrine-scroll flex gap-4 overflow-x-auto px-4 pb-3 pt-1 snap-x snap-mandatory md:px-6">
          {ebooks.map((ebook) => (
            <div key={ebook.id ?? ebook.titulo} className="snap-start">
              <div className="w-[min(100%,300px)] shrink-0">
                <EbookCard ebook={ebook} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
