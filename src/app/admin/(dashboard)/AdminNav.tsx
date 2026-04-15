"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Início", match: (p: string) => p === "/admin" || p === "/admin/" },
  { href: "/admin/categorias", label: "Categorias", match: (p: string) => p.startsWith("/admin/categorias") },
  { href: "/admin/ebooks", label: "Ebooks", match: (p: string) => p.startsWith("/admin/ebooks") },
  {
    href: "/admin/carrosseis",
    label: "Carrosséis",
    match: (p: string) => p.startsWith("/admin/carrosseis"),
  },
];

export function AdminNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav className="flex flex-wrap md:flex-col gap-1.5">
      {links.map((l) => {
        const active = l.match(pathname);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-500/30"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
