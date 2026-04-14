import type { SupabaseClient } from "@supabase/supabase-js";

export const MAX_CONCURRENT_REVIEWS = 20;

// /api/presign inserts queued rows before the user uploads or submits, so
// abandoned browser tabs create phantom "active" rows. We only count reviews
// created within the recent worker window when enforcing or displaying
// concurrency pressure.
export const ACTIVE_REVIEW_WINDOW_MS = 2.5 * 60 * 60 * 1000;

export async function countActiveReviews(
  supabase: SupabaseClient,
): Promise<number | null> {
  const activeSince = new Date(Date.now() - ACTIVE_REVIEW_WINDOW_MS).toISOString();
  const { count, error } = await supabase
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .in("status", ["queued", "running"])
    .gte("created_at", activeSince);
  if (error) {
    console.error("Failed to count active reviews", error);
    return null;
  }
  return count ?? 0;
}
