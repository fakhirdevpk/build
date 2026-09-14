import type { APIRoute } from 'astro';
import { getPlans, createPlan } from '../../../services/plans';

export const GET: APIRoute = async ({ locals }) => {
  const { data, error } = await getPlans(locals.supabase);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const form = await request.formData();
  const { error } = await createPlan(locals.supabase, {
    name: form.get('name') as string,
    price: Number(form.get('price')),
    duration_days: Number(form.get('duration_days')),
    description: (form.get('description') as string) || undefined,
  });

  if (error) return redirect(`/admin/plans?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/plans');
};