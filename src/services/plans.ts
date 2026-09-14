import type { SupabaseClient } from '@supabase/supabase-js';

export const getPlans = (db: SupabaseClient) =>
  db.from('plans').select('*').order('price');

export const getPlan = (db: SupabaseClient, id: string) =>
  db.from('plans').select('*').eq('id', id).single();

export const createPlan = (db: SupabaseClient, payload: {
  name: string;
  price: number;
  duration_days: number;
  description?: string;
}) => db.from('plans').insert(payload).select().single();

export const updatePlan = (db: SupabaseClient, id: string, payload: Partial<{
  name: string;
  price: number;
  duration_days: number;
  description: string;
}>) => db.from('plans').update(payload).eq('id', id).select().single();

export const deletePlan = (db: SupabaseClient, id: string) =>
  db.from('plans').delete().eq('id', id);