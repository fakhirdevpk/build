import type { SupabaseClient } from '@supabase/supabase-js';

export const getProfile = (db: SupabaseClient, id: string) =>
  db.from('profiles').select('*').eq('id', id).single();

export const getAllProfiles = (db: SupabaseClient) =>
  db.from('profiles').select('*').order('created_at', { ascending: false });

export const updateProfile = (db: SupabaseClient, id: string, payload: Partial<{
  full_name: string;
  phone: string;
  role: string;
}>) => db.from('profiles').update(payload).eq('id', id).select().single();

// Admin-only: change a user's role
export const setUserRole = (db: SupabaseClient, id: string, role: 'member' | 'trainer' | 'admin') =>
  db.from('profiles').update({ role }).eq('id', id).select().single();