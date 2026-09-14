import type { APIRoute } from 'astro';
import { setUserRole, getProfile } from '../../../../services/profiles';

export const POST: APIRoute = async ({ request, params, locals, redirect }) => {
  if (!locals.user) return redirect('/login');

  const { data: requester } = await getProfile(locals.supabase, locals.user.id);
  if (requester?.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  const form = await request.formData();
  const role = form.get('role') as 'member' | 'trainer' | 'admin';

  const { error } = await setUserRole(locals.supabase, params.id as string, role);
  if (error) return redirect(`/admin/members?error=${encodeURIComponent(error.message)}`);
  return redirect('/admin/members');
};