import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateSiteHero } from "../actions";
import { HeroForm } from "./HeroForm";

export default async function AdminHomePage() {
  const supabase = await createServerSupabaseClient();
  const { data: configs } = await supabase.from("site_config").select("chave, valor");
  const cfg = Object.fromEntries((configs ?? []).map((c) => [c.chave, c.valor]));

  const cards = [
    {
      href: "/admin/categorias",
      label: "Categorias",
      desc: "Filtros da vitrine",
      accent: "from-violet-500/20 to-transparent",
    },
    {
      href: "/admin/ebooks",
      label: "Ebooks",
      desc: "Capas, preços, Hotmart",
      accent: "from-emerald-500/20 to-transparent",
    },
    {
      href: "/admin/carrosseis",
      label: "Carrosséis",
      desc: "Destaques horizontais",
      accent: "from-cyan-500/20 to-transparent",
    },
  ] as const;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Painel</h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Edite textos da vitrine, categorias, ebooks e carrosséis. As mudanças aparecem na página
          inicial para visitantes.
        </p>
      </div>

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/30">
        <h2 className="text-lg font-semibold text-white mb-1">Textos do topo (hero)</h2>
        <p className="text-xs text-zinc-500 mb-5">
          Título e subtítulo exibidos acima dos carrosséis na vitrine pública.
        </p>
        <HeroForm
          action={updateSiteHero}
          initialTitulo={cfg.hero_titulo ?? ""}
          initialSubtitulo={cfg.hero_subtitulo ?? ""}
        />
      </section>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
          Módulos
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-sm shadow-black/25 transition hover:border-cyan-500/35 hover:bg-white/[0.05]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition group-hover:opacity-100`}
                aria-hidden
              />
              <p className="relative font-semibold text-white group-hover:text-cyan-100 transition-colors">
                {card.label}
              </p>
              <p className="relative text-sm text-zinc-500 mt-1 group-hover:text-zinc-400">
                {card.desc}
              </p>
              <span className="relative mt-3 inline-block text-xs font-medium text-cyan-500/80 group-hover:text-cyan-400">
                Abrir →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <p className="text-xs text-zinc-600 border-t border-white/5 pt-6">
        Clientes acessam só a{" "}
        <Link href="/" className="text-cyan-500/90 hover:text-cyan-400 hover:underline">
          página inicial
        </Link>{" "}
        — sem login.
      </p>
    </div>
  );
}
