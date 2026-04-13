export const MAX_CONCURRENT_REVIEWS = 20;

// Treat queued/running rows older than the worker lifetime as stale so
// abandoned presigns or crashed workers do not occupy capacity forever.
export const ACTIVE_REVIEW_WINDOW_MS = 2.5 * 60 * 60 * 1000;
