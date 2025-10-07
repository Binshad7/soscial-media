app/
(auth)/: Route group for authentication (e.g., /login, /register). Parentheses mean “group only,” not a URL segment.
api/: API routes, e.g., /api/users handled by route.ts.
layout.tsx: Root layout (shared UI across all pages—header, footer, etc.).
page.tsx: Homepage (/ route).
loading.tsx: Loading spinner/UI for suspense.
error.tsx: Error boundary UI (shown on error).
not-found.tsx: Custom 404 page.