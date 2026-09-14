import type { APIRoute } from 'astro';
import { getClasses, createClass } from '../../../services/classes';

export const GET: APIRoute = async ({ locals }) => {
  const { data, error } = await getClasses(locals.supabase);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  if (!locals.user) return redirect('/login');

  const form = await request.formData();
  const { error } = await createClass(locals.supabase, {
    title: form.get('title') as string,
    trainer_id: form.get('trainer_id') as string,
    starts_at: form.get('starts_at') as string,
    duration_minutes: Number(form.get('duration_minutes')),
    capacity: Number(form.get('capacity')),
  });

  if (error) return redirect(`/admin/classes?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/classes');
};