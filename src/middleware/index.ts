import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from '../lib/supabase-server';

const PROTECTED = ['/dashboard', '/admin'];

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createSupabaseServerClient(context.cookies, context.request);
  const { data: { user } } = await supabase.auth.getUser();

  context.locals.user = user;
  context.locals.supabase = supabase;

  if (PROTECTED.some(p => context.url.pathname.startsWith(p)) && !user) {
    return context.redirect('/login');
  }
  return next();
});