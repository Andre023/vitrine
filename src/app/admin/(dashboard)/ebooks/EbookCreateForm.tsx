"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEbook } from "../../actions";
import { ImageUrlInput } from "./ImageUrlInput";

type Cat = { id: string; nome: string };

export function EbookCreateForm({ categorias }: { categorias: Cat[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [coverKey, setCoverKey] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const r = await createEbook(fd);
    setPending(false);
    if (r.error) setError(r.error);
    else {
      e.currentTarget.reset();
      setCoverKey((k) => k + 1);
      router.refresh();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-sm shadow-black/20"
    >
      <p className="text-sm font-medium text-white">Novo ebook</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="admin-label">Título</label>
          <input name="titulo" required className="admin-input mt-1" />
        </div>
        <div className="sm:col-span-2">
          <label className="admin-label">Descrição</label>
          <textarea name="descricao" rows={3} className="admin-input mt-1 min-h-[88px] resize-y" />
        </div>
        <div className="sm:col-span-2">
          <label className="admin-label">Capa (URL ou upload)</label>
          <div className="mt-1">
            <ImageUrlInput key={coverKey} />
          </div>
        </div>
        <div>
          <label className="admin-label">Link Hotmart</label>
          <input name="link_hotmart" type="url" required className="admin-input mt-1" />
        </div>
        <div>
          <label className="admin-label">Categoria</label>
          <select name="categoria_id" required className="admin-input mt-1">
            <option value="">Selecione</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">Preço (ex.: 29,90)</label>
          <input
            name="preco_original"
            type="text"
            inputMode="decimal"
            required
            placeholder="29,90"
            className="admin-input mt-1"
          />
        </div>
        <div>
          <label className="admin-label">Preço promocional (se em promoção)</label>
          <input
            name="preco_promocional"
            type="text"
            inputMode="decimal"
            className="admin-input mt-1"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="em_promocao"
              className="rounded border-white/25 text-cyan-500 focus:ring-cyan-500/30"
            />
            Em promoção
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="visivel"
              defaultChecked
              className="rounded border-white/25 text-cyan-500 focus:ring-cyan-500/30"
            />
            Visível na vitrine
          </label>
        </div>
        <div>
          <label className="admin-label">Ordem</label>
          <input name="ordem" type="number" defaultValue={0} className="admin-input mt-1" />
        </div>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Salvando…" : "Criar ebook"}
      </button>
    </form>
  );
}
