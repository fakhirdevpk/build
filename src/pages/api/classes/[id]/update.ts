import type { APIRoute } from 'astro';
import { updateClass } from '../../../../services/classes';

export const POST: APIRoute = async ({ request, params, redirect, locals }) => {
  if (!locals.user) return redirect('/login');

  const form = await request.formData();
  const payload: Record<string, any> = {};
  for (const key of ['title', 'starts_at', 'duration_minutes', 'capacity']) {
    if (form.has(key)) {
      payload[key] = key === 'duration_minutes' || key === 'capacity'
        ? Number(form.get(key))
        : form.get(key);
    }
  }

  const { error } = await updateClass(locals.supabase, params.id as string, payload);
  if (error) return redirect(`/admin/classes?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/classes');
};