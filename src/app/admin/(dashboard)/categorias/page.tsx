import { createServerSupabaseClient } from "@/lib/supabase/server";
import { deleteCategoria, updateCategoria } from "../../actions";
import { DeleteEntityButton } from "../DeleteEntityButton";
import { CreateCategoriaForm } from "./CreateCategoriaForm";

type Categoria = {
  id: string;
  nome: string;
  slug: string;
  ordem: number;
};

export default async function AdminCategoriasPage() {
  const supabase = await createServerSupabaseClient();
  const { data: categorias, error } = await supabase
    .from("categorias")
    .select("id, nome, slug, ordem")
    .order("ordem", { ascending: true });

  if (error) {
    return (
      <p className="text-red-400">
        Erro ao carregar categorias: {error.message}. Rode o script SQL no Supabase se ainda não rodou.
      </p>
    );
  }

  async function saveCategoria(formData: FormData) {
    "use server";
    await updateCategoria(formData);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Categorias</h1>
        <p className="text-sm text-zinc-400 mt-1">Aparecem como filtros na vitrine.</p>
      </div>

      <CreateCategoriaForm />

      <ul className="space-y-4">
        {(categorias as Categoria[] | null)?.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-3 shadow-sm shadow-black/20"
          >
            <form action={saveCategoria} className="grid sm:grid-cols-12 gap-2 items-end">
              <input type="hidden" name="id" value={c.id} />
              <div className="sm:col-span-4">
                <label className="admin-label">Nome</label>
                <input
                  name="nome"
                  defaultValue={c.nome}
                  required
                  className="admin-input mt-1"
                />
              </div>
              <div className="sm:col-span-4">
                <label className="admin-label">Slug</label>
                <input
                  name="slug"
                  defaultValue={c.slug}
                  required
                  className="admin-input mt-1"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="admin-label">Ordem</label>
                <input
                  name="ordem"
                  type="number"
                  defaultValue={c.ordem}
                  className="admin-input mt-1"
                />
              </div>
              <div className="sm:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-cyan-600/85 hover:bg-cyan-600 py-2 text-sm font-medium text-white transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
            <div className="flex justify-end pt-1">
              <DeleteEntityButton
                label="Excluir categoria"
                confirmMessage="Excluir esta categoria? Se houver ebooks usando-a, o Supabase vai bloquear."
                action={() => deleteCategoria(c.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
