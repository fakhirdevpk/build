import type { APIRoute } from 'astro';
import { deleteBooking } from '../../../../services/bookings';

export const POST: APIRoute = async ({ params, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const { error } = await deleteBooking(locals.supabase, params.id as string);
  if (error) return redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  return redirect('/dashboard');
};