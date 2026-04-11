import { createBrowserClient } from "@supabase/ssr";

export function createClient(reviewId?: string) {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    reviewId
      ? {
          global: {
            headers: { "x-review-id": reviewId },
          },
        }
      : undefined
  );
}
