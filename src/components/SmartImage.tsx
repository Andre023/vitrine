"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Texto menor quando a área é estreita (ex.: card compacto) */
  captionSize?: "sm" | "md";
};

export function SmartImage({ src, alt, className = "", captionSize = "md" }: Props) {
  const [broken, setBroken] = useState(false);

  if (broken || !src?.trim()) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-center text-zinc-500 ${captionSize === "sm" ? "text-[10px] px-2" : "text-xs px-4"} ${className}`}
        role="img"
        aria-label={alt ? `Sem imagem: ${alt}` : "Sem imagem"}
      >
        Capa indisponível
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setBroken(true)}
    />
  );
}
