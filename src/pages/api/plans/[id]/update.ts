import type { APIRoute } from 'astro';
import { updatePlan } from '../../../../services/plans';

export const POST: APIRoute = async ({ request, params, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const form = await request.formData();
  const payload: Record<string, any> = {};
  for (const key of ['name', 'price', 'duration_days', 'description']) {
    if (form.has(key)) {
      payload[key] = key === 'price' || key === 'duration_days'
        ? Number(form.get(key))
        : form.get(key);
    }
  }

  const { error } = await updatePlan(locals.supabase, params.id as string, payload);
  if (error) return redirect(`/admin/plans?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/plans');
};