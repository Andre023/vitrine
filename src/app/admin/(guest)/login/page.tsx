import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#030712] relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, #22d3ee 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 50%, #a855f7 0%, transparent 45%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/90 mb-2">
          Área restrita
        </p>
        <h1 className="text-2xl font-bold text-white mb-1">Painel administrativo</h1>
        <p className="text-sm text-zinc-400 mb-8">
          Entre com o e-mail cadastrado no Supabase (perfil admin).
        </p>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-zinc-500">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            ← Voltar à vitrine
          </Link>
        </p>
      </div>
    </div>
  );
}
