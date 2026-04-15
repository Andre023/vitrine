import type { EbookCardData } from "@/components/EbookCard";

/** PostgREST pode devolver relação N:1 como objeto ou array — unifica para um card. */
export function normalizeEbookEmbed(
  raw: EbookCardData | EbookCardData[] | null | undefined
): EbookCardData | null {
  if (raw == null) return null;
  const row = Array.isArray(raw) ? raw[0] : raw;
  if (!row || typeof row !== "object") return null;
  return {
    ...row,
    descricao: row.descricao ?? "",
    titulo: row.titulo ?? "",
    imagem_url: row.imagem_url ?? "",
    link_hotmart: row.link_hotmart ?? "",
    em_promocao: Boolean(row.em_promocao),
    preco_original: Number(row.preco_original),
    preco_promocional:
      row.preco_promocional != null ? Number(row.preco_promocional) : null,
  };
}
