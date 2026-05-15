# AI Landing Lab

AI Landing Lab is a modern full-stack prototype for generating professional landing pages from a business briefing. The app creates copy, sections, CTAs, objections, pricing, FAQ, visual tone, editable preview, JSON export, and a marketing kit.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Custom UI primitives inspired by shadcn/ui patterns
- Framer Motion
- Zod validation
- Supabase-ready server adapter with local mock data
- Vercel-ready configuration

## Main Features

- Public SaaS landing page with premium dark design.
- Dashboard briefing form for business name, niche, audience, offer, brand tone, goal, and visual tone.
- Server action that validates and sanitizes input before generation.
- Mock AI service in `lib/ai` prepared for Hugging Face integration.
- Editable generated landing preview with desktop/mobile modes.
- Visual tone switching: premium dark, minimal light, tech neon, corporate elegant.
- Editor for headline, subheadline, CTAs, benefits, and FAQ.
- Copy-to-clipboard and JSON export.
- Marketing Kit with Instagram posts, ad hooks, WhatsApp messages, bio, pitch, and asset suggestions.
- Security documentation and env separation.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
HF_API_TOKEN=
HF_TEXT_MODEL=
HF_CLASSIFICATION_MODEL=
```

Keep provider secrets server-side only. Do not create `NEXT_PUBLIC_HF_API_TOKEN` or expose the Supabase service-role key to client components.

## Project Structure

```text
app/
  actions.ts              # Server action for generation
  page.tsx                # Public landing page
  dashboard/page.tsx      # Generator dashboard
  preview/page.tsx        # Standalone preview route
components/
  dashboard/              # Generator, editor and preview studio
  landing/                # Public page and generated landing preview
  marketing/              # Marketing Kit UI
  ui/                     # Button, fields, panel, reveal, segmented control
lib/
  ai/                     # Mock AI generation and future adapter contract
  db/                     # Local mock project store
  supabase/               # Server-only Supabase adapter
  validators/             # Zod schemas and sanitization
types/                    # Shared domain types
public/assets/            # Generated concept assets
styles/                   # Design-token documentation
```

## AI and Hugging Face Roadmap

The current generator is deterministic and mocked in `lib/ai/generate.ts`. To connect Hugging Face later:

1. Implement an adapter that matches `AiGenerationAdapter` in `lib/ai/prompt-contract.ts`.
2. Call the adapter only from server actions or route handlers.
3. Use `HF_API_TOKEN` from server environment variables.
4. Keep Zod validation and sanitization before any model request.
5. Add rate limiting and usage logging before production traffic.

Planned AI tasks:

- Headline and subheadline generation
- Niche classification
- Copy tone rewriting
- Landing section ranking
- Objection and FAQ expansion

## Supabase Roadmap

The app uses mock data initially. `lib/supabase/server.ts` is ready for a server-only Supabase client when environment variables exist.

Suggested tables:

- `projects`: owner, business briefing, selected tone, status
- `generated_landings`: generated JSON, version, created_at
- `marketing_kits`: campaign suggestions linked to a landing

Before production, add authentication, row-level security, and per-user project ownership.

## Vercel Deploy

The project includes `vercel.json` with standard commands:

- Install: `npm install`
- Build: `npm run build`
- Dev: `npm run dev`

In Vercel, configure the production variables from `.env.example`. Only `NEXT_PUBLIC_APP_URL` should be public. Keep Supabase service-role and Hugging Face tokens as server-side encrypted environment variables.

## Security

Security notes live in `SECURITY.md`.

Key practices already implemented:

- Zod validation on server action input.
- Sanitization against HTML tags, control characters, inline-event hints, and dangerous protocols.
- No `dangerouslySetInnerHTML`.
- No AI or Supabase secrets in client components.
- Lazy server-only Supabase initialization.
- Basic security headers in `next.config.ts`.

## GitHub Workflow

Suggested branch:

```bash
git switch -c codex/ai-landing-lab
```

Suggested commits:

```bash
git add .
git commit -m "Create AI Landing Lab Next.js app"
git commit -m "Add mock AI generator and security docs"
git commit -m "Polish dashboard preview and marketing kit"
```

## Roadmap

- Persist generated projects with Supabase.
- Add auth and user workspaces.
- Add real Hugging Face inference adapters.
- Add project history and version diffing.
- Export a deployable landing page package.
- Add Canva export templates for cover, banner, thumbnail, and mockup.
- Add Figma token export from `styles/design-tokens.md`.
- Add rate limiting, audit logs, and analytics.
