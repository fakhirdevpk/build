import type { SupabaseClient } from '@supabase/supabase-js';

export const getClasses = (db: SupabaseClient) =>
  db.from('classes').select('*, trainer:profiles(full_name)').order('starts_at');

export const createClass = (db: SupabaseClient, payload: {
  title: string; trainer_id: string; starts_at: string; duration_minutes: number; capacity: number;
}) => db.from('classes').insert(payload).select().single();

export const updateClass = (db: SupabaseClient, id: string, payload: Partial<{
  title: string; starts_at: string; duration_minutes: number; capacity: number;
}>) => db.from('classes').update(payload).eq('id', id).select().single();

export const deleteClass = (db: SupabaseClient, id: string) =>
  db.from('classes').delete().eq('id', id);