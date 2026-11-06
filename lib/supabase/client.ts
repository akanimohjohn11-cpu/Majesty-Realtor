import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://obwjoljyjnducwdainwd.supabase.co';
const supabaseUrl = rawUrl ? rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '') : '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9id2pvbGp5am5kdWN3ZGFpbndkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5NzI3MzAsImV4cCI6MjEwOTU0ODczMH0.KGqKIv07NJ1vb1YuUFBluGZerXEwMVIfzXZyWdGXHWY';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}
