"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCarrosselItem } from "../../actions";

type Opt = { id: string; titulo: string };

export function AddCarrosselItemForm({
  carrosselId,
  ebooks,
}: {
  carrosselId: string;
  ebooks: Opt[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const r = await addCarrosselItem(fd);
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
      className="flex flex-wrap gap-2 items-end border-t border-white/10 pt-4"
    >
      <input type="hidden" name="carrossel_id" value={carrosselId} />
      <div className="grow min-w-[200px]">
        <label className="admin-label">Adicionar ebook</label>
        <select
          name="ebook_id"
          required
          className="admin-input mt-1"
          defaultValue=""
        >
          <option value="" disabled>
            Escolha um ebook
          </option>
          {ebooks.map((e) => (
            <option key={e.id} value={e.id}>
              {e.titulo}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="w-full text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-white/10 hover:bg-white/15 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 transition-colors"
      >
        {pending ? "…" : "Adicionar"}
      </button>
    </form>
  );
}
