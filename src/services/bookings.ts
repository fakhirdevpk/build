import type { SupabaseClient } from '@supabase/supabase-js';

export const getBookings = (db: SupabaseClient, userId: string) =>
  db.from('bookings')
    .select('*, class:classes(title, starts_at, duration_minutes)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

export const getAllBookings = (db: SupabaseClient) =>
  db.from('bookings')
    .select('*, class:classes(title, starts_at), user:profiles(full_name)')
    .order('created_at', { ascending: false });

export const createBooking = (db: SupabaseClient, payload: {
  class_id: string;
  user_id: string;
}) => db.from('bookings').insert(payload).select().single();

export const deleteBooking = (db: SupabaseClient, id: string) =>
  db.from('bookings').delete().eq('id', id);