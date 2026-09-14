import type { APIRoute } from 'astro';
import { updateProfile } from '../../../../services/profiles';

export const POST: APIRoute = async ({ request, params, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  // users can only edit their own profile unless they're admin — enforce in RLS too
  const form = await request.formData();
  const payload: Record<string, any> = {};
  for (const key of ['full_name', 'phone']) {
    if (form.has(key)) payload[key] = form.get(key);
  }

  const { error } = await updateProfile(locals.supabase, params.id as string, payload);
  if (error) return redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  return redirect('/dashboard');
};