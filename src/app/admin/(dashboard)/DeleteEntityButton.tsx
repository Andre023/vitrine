"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Result = { error: string | null };

export function DeleteEntityButton({
  label,
  confirmMessage,
  action,
  className = "text-xs text-red-400/90 hover:text-red-300 disabled:opacity-50",
}: {
  label: string;
  confirmMessage?: string;
  action: () => Promise<Result>;
  className?: string;
}) {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-1">
      {err ? (
        <p className="text-xs text-red-400 max-w-md" role="alert">
          {err}
        </p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        className={className}
        onClick={() => {
          if (confirmMessage && typeof window !== "undefined" && !window.confirm(confirmMessage)) {
            return;
          }
          startTransition(async () => {
            setErr(null);
            const r = await action();
            if (r.error) setErr(r.error);
            else router.refresh();
          });
        }}
      >
        {pending ? "…" : label}
      </button>
    </div>
  );
}
