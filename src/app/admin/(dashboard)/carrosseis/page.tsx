import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  deleteCarrossel,
  removeCarrosselItem,
  updateCarrosselItemOrdem,
  updateCarrosselMeta,
} from "../../actions";
import { DeleteEntityButton } from "../DeleteEntityButton";
import { AddCarrosselItemForm } from "./AddCarrosselItemForm";
import { CarrosselCreateForm } from "./CarrosselCreateForm";

type EbookRef = { id: string; titulo: string; visivel: boolean };

function asEbookRef(v: EbookRef | EbookRef[] | null): EbookRef | null {
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

type ItemRow = {
  id: string;
  ordem: number;
  ebook_id: string;
  ebooks: EbookRef | EbookRef[] | null;
};
type CarrosselRow = {
  id: string;
  titulo: string;
  ordem: number;
  ativo: boolean;
  carrossel_itens: ItemRow[] | null;
};

export default async function AdminCarrosseisPage() {
  const supabase = await createServerSupabaseClient();
  const { data: carrosseis, error: cErr } = await supabase
    .from("carrosseis")
    .select(
      `
      id,
      titulo,
      ordem,
      ativo,
      carrossel_itens (
        id,
        ordem,
        ebook_id,
        ebooks ( id, titulo, visivel )
      )
    `
    )
    .order("ordem", { ascending: true });

  const { data: ebooks } = await supabase
    .from("ebooks")
    .select("id, titulo")
    .order("titulo", { ascending: true });

  if (cErr) {
    return <p className="text-red-400">Erro: {cErr.message}</p>;
  }

  async function saveCarrossel(formData: FormData) {
    "use server";
    await updateCarrosselMeta(formData);
  }

  async function removeCarrossel(formData: FormData) {
    "use server";
    await deleteCarrossel(String(formData.get("id")));
  }

  async function saveItemOrdem(formData: FormData) {
    "use server";
    await updateCarrosselItemOrdem(formData);
  }

  const list = (carrosseis as unknown as CarrosselRow[] | null) ?? [];
  const ebookOptions = ebooks ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Carrosséis</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Blocos horizontais na vitrine. Só aparecem se estiverem ativos e com ebooks visíveis.
        </p>
      </div>

      <CarrosselCreateForm />

      <ul className="space-y-8">
        {list.map((c) => {
          const itens = [...(c.carrossel_itens ?? [])].sort((a, b) => a.ordem - b.ordem);
          return (
            <li
              key={c.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4 shadow-sm shadow-black/20"
            >
              <form action={saveCarrossel} className="flex flex-wrap gap-3 items-end">
                <input type="hidden" name="id" value={c.id} />
                <div className="grow min-w-[180px]">
                  <label className="admin-label">Título</label>
                  <input
                    name="titulo"
                    defaultValue={c.titulo}
                    required
                    className="admin-input mt-1"
                  />
                </div>
                <div className="w-24">
                  <label className="admin-label">Ordem</label>
                  <input
                    name="ordem"
                    type="number"
                    defaultValue={c.ordem}
                    className="admin-input mt-1"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-zinc-300 pb-2">
                  <input
                    type="checkbox"
                    name="ativo"
                    defaultChecked={c.ativo}
                    className="rounded border-white/20"
                  />
                  Ativo
                </label>
                <button
                  type="submit"
                  className="rounded-lg bg-cyan-600/85 hover:bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition-colors"
                >
                  Salvar
                </button>
              </form>

              <AddCarrosselItemForm carrosselId={c.id} ebooks={ebookOptions} />

              <ul className="space-y-2">
                {itens.length === 0 ? (
                  <li className="text-sm text-zinc-500">Nenhum item ainda.</li>
                ) : (
                  itens.map((it) => {
                    const eb = asEbookRef(it.ebooks);
                    return (
                    <li
                      key={it.id}
                      className="flex flex-wrap items-center gap-2 rounded-lg border border-white/5 bg-black/20 px-3 py-2"
                    >
                      <span className="text-sm text-white grow min-w-[120px]">
                        {eb?.titulo ?? it.ebook_id}
                        {eb && !eb.visivel ? (
                          <span className="ml-2 text-xs text-amber-400">(oculto)</span>
                        ) : null}
                      </span>
                      <form action={saveItemOrdem} className="flex items-center gap-1">
                        <input type="hidden" name="id" value={it.id} />
                        <label className="admin-label whitespace-nowrap">Ordem</label>
                        <input
                          name="ordem"
                          type="number"
                          defaultValue={it.ordem}
                          className="admin-input w-16 px-2 py-1 text-sm"
                        />
                        <button
                          type="submit"
                          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 px-1"
                        >
                          OK
                        </button>
                      </form>
                      <DeleteEntityButton
                        label="Remover"
                        confirmMessage="Remover este ebook do carrossel?"
                        action={() => removeCarrosselItem(it.id)}
                        className="text-xs text-red-400/90 hover:text-red-300 disabled:opacity-50"
                      />
                    </li>
                    );
                  })
                )}
              </ul>

              <div className="pt-2 border-t border-white/5">
                <DeleteEntityButton
                  label="Excluir carrossel inteiro"
                  confirmMessage="Apagar este carrossel e todos os itens?"
                  action={() => deleteCarrossel(c.id)}
                  className="text-xs text-red-400/85 hover:text-red-300 disabled:opacity-50"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
