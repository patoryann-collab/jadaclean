import { createClient } from '@supabase/supabase-js'

// Remplace ces valeurs par celles de ton projet Supabase 
// (Project Settings > API)
const supabaseUrl = 'https://lugnrwbjjnbwnqlvxydh.supabase.co'
const supabaseAnonKey = 'sb_publishable_9LhARnY95M6PNrL-u519pg_m7gbLX4U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)