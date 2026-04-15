import Link from "next/link";
import { signOutAction } from "../actions";
import { AdminNav } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      <aside className="border-b border-white/10 bg-zinc-950/95 md:border-b-0 md:border-r md:w-60 shrink-0 p-5 md:min-h-screen md:sticky md:top-0 md:self-start md:max-h-screen md:overflow-y-auto">
        <Link href="/" className="block group mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/90">
            Vitrine
          </p>
          <p className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
            Painel
          </p>
          <p className="text-[11px] text-zinc-600 mt-0.5">Ebooks & carrosséis</p>
        </Link>

        <AdminNav />

        <div className="mt-10 hidden md:block">
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full rounded-lg border border-white/10 py-2.5 text-sm text-zinc-400 transition hover:border-red-500/35 hover:bg-red-500/5 hover:text-red-200"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 border-t border-transparent md:border-t-0 md:bg-gradient-to-br md:from-zinc-950 md:via-zinc-950 md:to-zinc-900/80">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:hidden">
          <span className="text-sm font-semibold text-white">Admin</span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400"
            >
              Sair
            </button>
          </form>
        </header>
        <main className="p-4 md:p-10 max-w-5xl w-full">{children}</main>
      </div>
    </div>
  );
}
