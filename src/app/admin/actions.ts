"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { parseMoneyInput } from "@/lib/money";
import { slugify } from "@/lib/slugify";

type AdminResult = { error: string | null };

async function getAdminSupabase(): Promise<
  { supabase: Awaited<ReturnType<typeof createServerSupabaseClient>> } | { error: string }
> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado." };
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") return { error: "Sem permissão de administrador." };
  return { supabase };
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}

export async function updateSiteHero(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const titulo = String(formData.get("hero_titulo") ?? "").trim();
  const subtitulo = String(formData.get("hero_subtitulo") ?? "").trim();
  if (!titulo) return { error: "Título do hero é obrigatório." };
  const { error: e1 } = await supabase
    .from("site_config")
    .upsert(
      { chave: "hero_titulo", valor: titulo, updated_at: new Date().toISOString() },
      { onConflict: "chave" }
    );
  if (e1) return { error: e1.message };
  const { error: e2 } = await supabase
    .from("site_config")
    .upsert(
      { chave: "hero_subtitulo", valor: subtitulo, updated_at: new Date().toISOString() },
      { onConflict: "chave" }
    );
  if (e2) return { error: e2.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { error: null };
}

export async function createCategoria(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const nome = String(formData.get("nome") ?? "").trim();
  if (!nome) return { error: "Nome é obrigatório." };
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const slug = slugRaw || slugify(nome);
  const ordem = Number(formData.get("ordem") ?? 0) || 0;
  const { error } = await supabase.from("categorias").insert({ nome, slug, ordem });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  return { error: null };
}

export async function updateCategoria(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const id = String(formData.get("id") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();
  if (!id || !nome) return { error: "Dados inválidos." };
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const slug = slugRaw || slugify(nome);
  const ordem = Number(formData.get("ordem") ?? 0) || 0;
  const { error } = await supabase.from("categorias").update({ nome, slug, ordem }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  return { error: null };
}

export async function deleteCategoria(id: string): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  return { error: null };
}

export async function createEbook(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const imagem_url = String(formData.get("imagem_url") ?? "").trim();
  const link_hotmart = String(formData.get("link_hotmart") ?? "").trim();
  const categoria_id = String(formData.get("categoria_id") ?? "").trim();
  const preco_original = parseMoneyInput(String(formData.get("preco_original") ?? ""));
  const preco_promo_raw = String(formData.get("preco_promocional") ?? "").trim();
  const preco_promocional = preco_promo_raw ? parseMoneyInput(preco_promo_raw) : null;
  const em_promocao = formData.get("em_promocao") === "on" || formData.get("em_promocao") === "true";
  const visivel = formData.get("visivel") === "on" || formData.get("visivel") === "true";
  const ordem = Number(formData.get("ordem") ?? 0) || 0;

  if (
    !titulo ||
    !imagem_url ||
    !link_hotmart ||
    !categoria_id ||
    !Number.isFinite(preco_original)
  ) {
    return { error: "Preencha título, capa (URL), link Hotmart, categoria e preço válido." };
  }

  if (
    em_promocao &&
    (preco_promocional == null || !Number.isFinite(preco_promocional))
  ) {
    return { error: "Em promoção exige um preço promocional válido." };
  }

  const { error } = await supabase.from("ebooks").insert({
    titulo,
    descricao,
    imagem_url,
    link_hotmart,
    categoria_id,
    preco_original,
    preco_promocional:
      em_promocao && preco_promocional != null && Number.isFinite(preco_promocional)
        ? preco_promocional
        : null,
    em_promocao,
    visivel,
    ordem,
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/ebooks");
  return { error: null };
}

export async function updateEbook(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const id = String(formData.get("id") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const imagem_url = String(formData.get("imagem_url") ?? "").trim();
  const link_hotmart = String(formData.get("link_hotmart") ?? "").trim();
  const categoria_id = String(formData.get("categoria_id") ?? "").trim();
  const preco_original = parseMoneyInput(String(formData.get("preco_original") ?? ""));
  const preco_promo_raw = String(formData.get("preco_promocional") ?? "").trim();
  const preco_promocional = preco_promo_raw ? parseMoneyInput(preco_promo_raw) : null;
  const em_promocao = formData.get("em_promocao") === "on" || formData.get("em_promocao") === "true";
  const visivel = formData.get("visivel") === "on" || formData.get("visivel") === "true";
  const ordem = Number(formData.get("ordem") ?? 0) || 0;

  if (
    !id ||
    !titulo ||
    !imagem_url ||
    !link_hotmart ||
    !categoria_id ||
    !Number.isFinite(preco_original)
  ) {
    return { error: "Dados inválidos (confira preço e campos obrigatórios)." };
  }

  if (
    em_promocao &&
    (preco_promocional == null || !Number.isFinite(preco_promocional))
  ) {
    return { error: "Em promoção exige um preço promocional válido." };
  }

  const { error } = await supabase
    .from("ebooks")
    .update({
      titulo,
      descricao,
      imagem_url,
      link_hotmart,
      categoria_id,
      preco_original,
      preco_promocional:
        em_promocao && preco_promocional != null && Number.isFinite(preco_promocional)
          ? preco_promocional
          : null,
      em_promocao,
      visivel,
      ordem,
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/ebooks");
  return { error: null };
}

export async function deleteEbook(id: string): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase.from("ebooks").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/ebooks");
  return { error: null };
}

export async function createCarrossel(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const titulo = String(formData.get("titulo") ?? "").trim();
  if (!titulo) return { error: "Título é obrigatório." };
  const ordem = Number(formData.get("ordem") ?? 0) || 0;
  const { error } = await supabase.from("carrosseis").insert({ titulo, ordem, ativo: true });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/carrosseis");
  return { error: null };
}

export async function updateCarrosselMeta(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const id = String(formData.get("id") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const ordem = Number(formData.get("ordem") ?? 0) || 0;
  const ativo = formData.get("ativo") === "on" || formData.get("ativo") === "true";
  if (!id || !titulo) return { error: "Dados inválidos." };
  const { error } = await supabase.from("carrosseis").update({ titulo, ordem, ativo }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/carrosseis");
  return { error: null };
}

export async function deleteCarrossel(id: string): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase.from("carrosseis").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/carrosseis");
  return { error: null };
}

export async function addCarrosselItem(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const carrossel_id = String(formData.get("carrossel_id") ?? "");
  const ebook_id = String(formData.get("ebook_id") ?? "");
  if (!carrossel_id || !ebook_id) return { error: "Selecione carrossel e ebook." };
  const { count } = await supabase
    .from("carrossel_itens")
    .select("*", { count: "exact", head: true })
    .eq("carrossel_id", carrossel_id);
  const ordem = count ?? 0;
  const { error } = await supabase
    .from("carrossel_itens")
    .insert({ carrossel_id, ebook_id, ordem });
  if (error) {
    if (error.code === "23505") {
      return { error: "Este ebook já está neste carrossel." };
    }
    return { error: error.message };
  }
  revalidatePath("/");
  revalidatePath("/admin/carrosseis");
  return { error: null };
}

export async function removeCarrosselItem(itemId: string): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase.from("carrossel_itens").delete().eq("id", itemId);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/carrosseis");
  return { error: null };
}

export async function updateCarrosselItemOrdem(formData: FormData): Promise<AdminResult> {
  const auth = await getAdminSupabase();
  if ("error" in auth) return { error: auth.error };
  const { supabase } = auth;
  const id = String(formData.get("id") ?? "");
  const ordem = Number(formData.get("ordem") ?? 0) || 0;
  if (!id) return { error: "Item inválido." };
  const { error } = await supabase.from("carrossel_itens").update({ ordem }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/carrosseis");
  return { error: null };
}
