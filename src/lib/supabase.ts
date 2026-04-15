import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Este é o cliente que usaremos na Vitrine para buscar os ebooks e categorias
export const supabase = createClient(supabaseUrl, supabaseAnonKey)