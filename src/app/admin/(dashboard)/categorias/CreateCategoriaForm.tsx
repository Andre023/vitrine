"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCategoria } from "../../actions";

export function CreateCategoriaForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const r = await createCategoria(fd);
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
      className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-sm shadow-black/20"
    >
      <p className="text-sm font-medium text-white">Nova categoria</p>
      <div className="grid sm:grid-cols-3 gap-3">
        <input name="nome" required placeholder="Nome" className="admin-input" />
        <input name="slug" placeholder="Slug (opcional)" className="admin-input" />
        <input name="ordem" type="number" defaultValue={0} className="admin-input" />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-violet-600 hover:bg-violet-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Criando…" : "Criar"}
      </button>
    </form>
  );
}
