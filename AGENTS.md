# AGENTS.md — Read this first, every session

You are an AI coding agent working on this repo. Before writing or changing any code,
read the following files **in this order**:

1. `CONTEXT.md` — what we're building, requirements, key decisions, open questions
2. `PROGRESS.md` — what's already done, what's in progress, where to pick up
3. `CODING_CONVENTIONS.md` — how code in this repo is written

Do not skip this. This project is built across multiple sessions and sometimes
multiple different AI agents/IDEs. These three files are the shared memory between
sessions — if you don't read them, you will redo work, contradict earlier decisions,
or break something that already works.

## One-line project summary
A web app where a user uploads a photo and instantly gets a branded HH Goa 2026
PFP frame overlay, downloadable and shareable to X with the hashtag #FrameInGoa.
Full spec is in `CONTEXT.md`.

## Tech stack (see CONTEXT.md "Key decisions" for the *why*)
- Next.js 14+ (App Router, TypeScript)
- Native HTML5 Canvas API for image compositing (no canvas library)
- `heic2any` for client-side HEIC→JPEG conversion
- Tailwind CSS for styling
- Vercel Blob for storing the generated image (needed for OG link preview)
- Deployed on Vercel

## Setup / run / build
```
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint     # lint check — run before ending a session
```

## Golden rules
- The main "upload → frame → download" flow must stay 100% client-side. Do not
  move it to a server route — that breaks the "near-instant, no loading screen"
  requirement.
- The ONLY server-side work allowed is: (a) uploading the final PNG to Vercel Blob
  to get a shareable URL, and (b) the dynamic OG-image metadata route for that
  shared link. Nothing else needs a server round trip.
- No login/signup gate anywhere in the flow. This is a hard requirement from the
  task brief.
- Mobile-first. Most users are on a phone. Test at 375px width before anything else.
- Don't add a new dependency without adding one line to CONTEXT.md ("Key decisions")
  explaining why. Keeps future agents from wondering why it's there.
- Keep the frame/branding assets and all magic numbers (frame position, canvas size)
  in `lib/constants.ts` — never hardcoded inline in a component.

## End-of-session protocol (mandatory)
Before you finish responding in any session where you changed code:
1. Update `PROGRESS.md`: add a new dated entry — what you did, what's left,
   any decision you made or blocker you hit.
2. If you made an architectural or dependency decision, add it to `CONTEXT.md`
   under "Key decisions."
3. If requirements changed or a question got answered, update the "Open questions"
   section in `CONTEXT.md`.

If you skip this, the next agent (possibly a different AI, possibly you next week)
starts blind.
