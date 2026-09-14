import type { APIRoute } from 'astro';
import { getBookings, createBooking } from '../../../services/bookings';

export const GET: APIRoute = async ({ locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const { data, error } = await getBookings(locals.supabase, locals.user.id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const form = await request.formData();
  const { error } = await createBooking(locals.supabase, {
    class_id: form.get('class_id') as string,
    user_id: locals.user.id,
  });

  if (error) return redirect(`/classes?error=${encodeURIComponent(error.message)}`);
  return redirect('/dashboard');
};