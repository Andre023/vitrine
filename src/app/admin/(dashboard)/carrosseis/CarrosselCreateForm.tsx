"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCarrossel } from "../../actions";

export function CarrosselCreateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const r = await createCarrossel(new FormData(e.currentTarget));
    setPending(false);
    if (r.error) setError(r.error);
    else {
      e.currentTarget.reset();
      router.refresh();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap gap-3 items-end rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-sm shadow-black/20"
    >
      <div className="grow min-w-[200px]">
        <label className="admin-label">Título do carrossel</label>
        <input
          name="titulo"
          required
          className="admin-input mt-1"
          placeholder="Ex.: Destaques da semana"
        />
      </div>
      <div className="w-24">
        <label className="admin-label">Ordem</label>
        <input name="ordem" type="number" defaultValue={0} className="admin-input mt-1" />
      </div>
      {error ? <p className="w-full text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {pending ? "…" : "Criar"}
      </button>
    </form>
  );
}
