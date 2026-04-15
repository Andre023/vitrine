/**
 * Aceita "29,90", "29.90", "1.234,56", "R$ 10" etc.
 */
export function parseMoneyInput(raw: string): number {
  const s = raw
    .trim()
    .replace(/\s/g, "")
    .replace(/^R\$\s?/i, "")
    .replace(/[^\d.,-]/g, "");
  if (!s) return NaN;

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");

  if (hasComma && hasDot) {
    const lastComma = s.lastIndexOf(",");
    const lastDot = s.lastIndexOf(".");
    const decimalSep = lastComma > lastDot ? "," : ".";
    if (decimalSep === ",") {
      return Number(s.replace(/\./g, "").replace(",", "."));
    }
    return Number(s.replace(/,/g, ""));
  }

  if (hasComma) {
    return Number(s.replace(/\./g, "").replace(",", "."));
  }

  return Number(s.replace(",", "."));
}
