import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Return null if environment variables are not set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables not found. Authentication will be disabled.');
    console.log('URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return null as any;
  }

  console.log('Supabase client created successfully');
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}