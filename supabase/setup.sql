-- =============================================================================
-- Vitrine Ebooks — configuração Supabase (execute no SQL Editor do projeto)
-- =============================================================================
-- 1) Rode este script inteiro uma vez.
-- 2) Crie um usuário em Authentication → Users (e-mail + senha).
-- 3) Promova a admin (troque o e-mail):
--    UPDATE public.profiles SET role = 'admin'
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'seu@email.com');
-- 4) Crie o bucket "ebook-covers" como público (ou use o INSERT abaixo) e
--    confira se as políticas de storage foram aplicadas.
-- =============================================================================

-- --- Perfis (papel admin) -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- Sincroniza usuários que já existiam antes do trigger
INSERT INTO public.profiles (id, role)
SELECT id, 'user' FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- --- Colunas extras em ebooks (ajuste se já existirem) ------------------------
ALTER TABLE public.ebooks
  ADD COLUMN IF NOT EXISTS ordem INTEGER NOT NULL DEFAULT 0;

-- --- Carrosséis ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carrosseis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.carrossel_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrossel_id UUID NOT NULL REFERENCES public.carrosseis (id) ON DELETE CASCADE,
  ebook_id UUID NOT NULL REFERENCES public.ebooks (id) ON DELETE CASCADE,
  ordem INTEGER NOT NULL DEFAULT 0,
  UNIQUE (carrossel_id, ebook_id)
);

CREATE INDEX IF NOT EXISTS idx_carrossel_itens_carrossel ON public.carrossel_itens (carrossel_id);
CREATE INDEX IF NOT EXISTS idx_carrossel_itens_ordem ON public.carrossel_itens (carrossel_id, ordem);

-- --- Textos da vitrine (hero) -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_config (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.site_config (chave, valor) VALUES
  ('hero_titulo', 'Sua vitrine de ebooks'),
  ('hero_subtitulo', 'Conteúdo digital selecionado. Compre com um clique na Hotmart.')
ON CONFLICT (chave) DO NOTHING;

-- --- Função is_admin() --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  );
$$;

-- --- RLS: remove políticas antigas destas tabelas (reexecução segura) ----------
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'profiles', 'categorias', 'ebooks', 'carrosseis', 'carrossel_itens', 'site_config'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrosseis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrossel_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- profiles: cada um lê o próprio; admin pode ler todos (útil no painel)
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- categorias: leitura pública; escrita só admin
CREATE POLICY "categorias_select_public" ON public.categorias
  FOR SELECT USING (true);

CREATE POLICY "categorias_write_admin" ON public.categorias
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ebooks: visitante só vê visíveis; admin vê e edita tudo
CREATE POLICY "ebooks_select_public_visible" ON public.ebooks
  FOR SELECT USING (visivel = true);

CREATE POLICY "ebooks_select_admin" ON public.ebooks
  FOR SELECT USING (public.is_admin());

CREATE POLICY "ebooks_insert_admin" ON public.ebooks
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "ebooks_update_admin" ON public.ebooks
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "ebooks_delete_admin" ON public.ebooks
  FOR DELETE USING (public.is_admin());

-- carrosseis
CREATE POLICY "carrosseis_select_public_active" ON public.carrosseis
  FOR SELECT USING (ativo = true);

CREATE POLICY "carrosseis_select_admin" ON public.carrosseis
  FOR SELECT USING (public.is_admin());

CREATE POLICY "carrosseis_write_admin" ON public.carrosseis
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- carrossel_itens: público só se carrossel ativo e ebook visível
CREATE POLICY "carrossel_itens_select_public" ON public.carrossel_itens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.carrosseis c
      WHERE c.id = carrossel_itens.carrossel_id AND c.ativo = true
    )
    AND EXISTS (
      SELECT 1 FROM public.ebooks e
      WHERE e.id = carrossel_itens.ebook_id AND e.visivel = true
    )
  );

CREATE POLICY "carrossel_itens_select_admin" ON public.carrossel_itens
  FOR SELECT USING (public.is_admin());

CREATE POLICY "carrossel_itens_write_admin" ON public.carrossel_itens
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- site_config: leitura pública (textos da home); escrita admin
CREATE POLICY "site_config_select_public" ON public.site_config
  FOR SELECT USING (true);

CREATE POLICY "site_config_write_admin" ON public.site_config
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- --- Storage: bucket público para capas ---------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebook-covers', 'ebook-covers', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DROP POLICY IF EXISTS "Capas leitura pública" ON storage.objects;
DROP POLICY IF EXISTS "Capas upload admin" ON storage.objects;
DROP POLICY IF EXISTS "Capas update admin" ON storage.objects;
DROP POLICY IF EXISTS "Capas delete admin" ON storage.objects;

CREATE POLICY "Capas leitura pública"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ebook-covers');

CREATE POLICY "Capas upload admin"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'ebook-covers'
    AND auth.role() = 'authenticated'
    AND public.is_admin()
  );

CREATE POLICY "Capas update admin"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'ebook-covers'
    AND auth.role() = 'authenticated'
    AND public.is_admin()
  );

CREATE POLICY "Capas delete admin"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'ebook-covers'
    AND auth.role() = 'authenticated'
    AND public.is_admin()
  );
