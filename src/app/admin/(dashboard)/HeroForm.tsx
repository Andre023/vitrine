"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  action: (formData: FormData) => Promise<{ error: string | null }>;
  initialTitulo: string;
  initialSubtitulo: string;
};

export function HeroForm({ action, initialTitulo, initialSubtitulo }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const r = await action(fd);
    setPending(false);
    if (r.error) setError(r.error);
    else {
      setOk(true);
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="admin-label mb-1 block">Título principal</label>
        <input
          name="hero_titulo"
          defaultValue={initialTitulo}
          required
          className="admin-input"
        />
      </div>
      <div>
        <label className="admin-label mb-1 block">Subtítulo</label>
        <textarea
          name="hero_subtitulo"
          rows={3}
          defaultValue={initialSubtitulo}
          className="admin-input resize-y min-h-[80px]"
        />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {ok ? <p className="text-sm text-emerald-400">Salvo na vitrine.</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Salvando…" : "Salvar textos"}
      </button>
    </form>
  );
}
