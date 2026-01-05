import { createClient } from '@supabase/supabase-js';

// Récupération des variables d'environnement (configurées dans .env.local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sécurité de base : on vérifie que les clés sont présentes
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Attention : Les variables d'environnement Supabase sont manquantes !");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);