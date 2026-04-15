import { createServerSupabaseClient } from "@/lib/supabase/server";
import { deleteEbook, updateEbook } from "../../actions";
import { DeleteEntityButton } from "../DeleteEntityButton";
import { EbookCreateForm } from "./EbookCreateForm";
import { ImageUrlInput } from "./ImageUrlInput";

type Ebook = {
  id: string;
  titulo: string;
  descricao: string | null;
  imagem_url: string;
  link_hotmart: string;
  categoria_id: string;
  preco_original: number;
  preco_promocional: number | null;
  em_promocao: boolean;
  visivel: boolean;
  ordem: number;
};

type Categoria = { id: string; nome: string };

export default async function AdminEbooksPage() {
  const supabase = await createServerSupabaseClient();
  const { data: categorias } = await supabase.from("categorias").select("id, nome").order("ordem");
  const { data: ebooks, error } = await supabase
    .from("ebooks")
    .select("*")
    .order("ordem", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-400">Erro: {error.message}</p>;
  }

  async function saveEbook(formData: FormData) {
    "use server";
    await updateEbook(formData);
  }

  const cats = (categorias as Categoria[] | null) ?? [];
  const list = (ebooks as Ebook[] | null) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Ebooks</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Tudo aqui reflete na vitrine (quando visível).
        </p>
      </div>

      <EbookCreateForm categorias={cats} />

      <ul className="space-y-4">
        {list.map((book) => (
          <li
            key={book.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-sm shadow-black/25"
          >
            <details className="group">
              <summary className="cursor-pointer list-none px-4 py-3 flex flex-wrap items-center justify-between gap-2 hover:bg-white/[0.05]">
                <span className="font-medium text-white">{book.titulo}</span>
                <span className="text-xs text-zinc-500">
                  {book.visivel ? (
                    <span className="text-emerald-400/90">Visível</span>
                  ) : (
                    <span className="text-zinc-500">Oculto</span>
                  )}{" "}
                  · R${" "}
                  {Number.isFinite(Number(book.preco_original))
                    ? Number(book.preco_original).toFixed(2)
                    : "—"}
                </span>
              </summary>
              <div className="border-t border-white/10 p-4 space-y-4">
                <form action={saveEbook} className="grid sm:grid-cols-2 gap-3">
                  <input type="hidden" name="id" value={book.id} />
                  <div className="sm:col-span-2">
                    <label className="admin-label">Título</label>
                    <input
                      name="titulo"
                      defaultValue={book.titulo}
                      required
                      className="admin-input mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Descrição</label>
                    <textarea
                      name="descricao"
                      rows={3}
                      defaultValue={book.descricao ?? ""}
                      className="admin-input mt-1 min-h-[88px] resize-y"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Capa</label>
                    <div className="mt-1">
                      <ImageUrlInput key={book.id} defaultValue={book.imagem_url} />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Link Hotmart</label>
                    <input
                      name="link_hotmart"
                      type="url"
                      defaultValue={book.link_hotmart}
                      required
                      className="admin-input mt-1"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Categoria</label>
                    <select
                      name="categoria_id"
                      required
                      defaultValue={book.categoria_id}
                      className="admin-input mt-1"
                    >
                      {cats.map((c) => (
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
                      defaultValue={String(book.preco_original)}
                      required
                      className="admin-input mt-1"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Preço promocional</label>
                    <input
                      name="preco_promocional"
                      type="text"
                      inputMode="decimal"
                      defaultValue={
                        book.preco_promocional != null ? String(book.preco_promocional) : ""
                      }
                      className="admin-input mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        name="em_promocao"
                        defaultChecked={book.em_promocao}
                        className="rounded border-white/25 text-cyan-500 focus:ring-cyan-500/30"
                      />
                      Em promoção
                    </label>
                    <label className="flex items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        name="visivel"
                        defaultChecked={book.visivel}
                        className="rounded border-white/25 text-cyan-500 focus:ring-cyan-500/30"
                      />
                      Visível
                    </label>
                  </div>
                  <div>
                    <label className="admin-label">Ordem</label>
                    <input
                      name="ordem"
                      type="number"
                      defaultValue={book.ordem}
                      className="admin-input mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-cyan-600/85 hover:bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors"
                    >
                      Salvar alterações
                    </button>
                  </div>
                </form>
                <DeleteEntityButton
                  label="Excluir ebook"
                  confirmMessage="Excluir este ebook permanentemente?"
                  action={() => deleteEbook(book.id)}
                />
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
