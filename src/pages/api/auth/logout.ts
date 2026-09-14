import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ redirect, locals }) => {
  await locals.supabase.auth.signOut();
  return redirect('/login');
};