import type { APIRoute } from 'astro';
import { deletePlan } from '../../../../services/plans';

export const POST: APIRoute = async ({ params, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const { error } = await deletePlan(locals.supabase, params.id as string);
  if (error) return redirect(`/admin/plans?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/plans');
};