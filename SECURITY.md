# Security Notes

AI Landing Lab is currently a mocked full-stack prototype, but the security boundary is already shaped for production.

## Current Controls

- User input is validated with Zod in `lib/validators/landing.ts`.
- Inputs are sanitized in `lib/validators/sanitize.ts` before generation.
- Generation runs through a server action in `app/actions.ts`.
- Mock AI functions that represent future model calls live in `lib/ai/generate.ts` and are marked server-only.
- Supabase service-role access is isolated in `lib/supabase/server.ts`, initialized lazily, and never imported by client components.
- The UI renders generated copy as React text nodes. It does not use `dangerouslySetInnerHTML`.
- `next.config.ts` sets basic hardening headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.

## Production Rules

- Do not expose `HF_API_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, or other provider secrets with a `NEXT_PUBLIC_` prefix.
- Keep AI generation behind server actions or route handlers.
- Store only business briefing data that the user intentionally submits.
- Add rate limiting before exposing real model calls publicly.
- Add auth and row-level security before persisting user projects in Supabase.
- Add a CSP after deciding the analytics, font, image, and model-provider endpoints used in production.

## Input Handling

The current sanitizer removes control characters, HTML tags, inline-event hints, and dangerous URL protocols. React still escapes text by default, so the app avoids HTML injection as an extra layer.

When adding rich text later, use a trusted sanitizer and an allowlist of tags. Do not pass raw model output into `dangerouslySetInnerHTML`.
