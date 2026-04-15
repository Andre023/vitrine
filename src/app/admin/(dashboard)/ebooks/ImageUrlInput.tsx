"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type Props = {
  name?: string;
  defaultValue?: string;
};

export function ImageUrlInput({ name = "imagem_url", defaultValue = "" }: Props) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  useEffect(() => {
    setUrl(defaultValue);
  }, [defaultValue]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadErr(null);
    setUploading(true);
    const supabase = createBrowserSupabaseClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `covers/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("ebook-covers").upload(path, file, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });
    if (error) {
      setUploadErr(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("ebook-covers").getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        placeholder="https://… ou envie um arquivo"
        className="admin-input"
      />
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs text-zinc-500 cursor-pointer rounded border border-white/15 px-2 py-1 hover:bg-white/5">
          {uploading ? "Enviando…" : "Enviar imagem"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
        </label>
        {uploadErr ? <span className="text-xs text-red-400">{uploadErr}</span> : null}
      </div>
    </div>
  );
}
