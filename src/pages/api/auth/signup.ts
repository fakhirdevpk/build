import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
  const form = await request.formData();
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const full_name = form.get('full_name') as string;

  const { error } = await locals.supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });

  if (error) return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  return redirect('/dashboard');
};