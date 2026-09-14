import type { APIRoute } from 'astro';
import { deleteClass } from '../../../../services/classes';

export const POST: APIRoute = async ({ params, redirect, locals }) => {
  if (!locals.user) return redirect('/login');

  const { error } = await deleteClass(locals.supabase, params.id as string);
  if (error) return redirect(`/admin/classes?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/classes');
};