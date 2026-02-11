import { createBrowserClient } from '@supabase/ssr';

/**
 * Untyped Supabase client for admin pages.
 * Uses 'any' to avoid strict type constraints on admin CRUD operations.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAdminClient(): any {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
