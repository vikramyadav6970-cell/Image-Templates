Paste this as your first message to Antigravity, with AGENTS.md, CODING_CONVENTIONS.md,
CONTEXT.md, and PROGRESS.md already added to the repo root (or attached to the prompt
if the repo doesn't exist yet).

---

Read AGENTS.md, CONTEXT.md, PROGRESS.md, and CODING_CONVENTIONS.md in this repo before
doing anything else. They contain the full spec, tech stack decisions, code conventions,
and current progress. Follow them exactly — don't deviate from the stated tech stack or
folder structure without flagging it to me first.

Scaffold and build the app described in CONTEXT.md: a Next.js 14 (App Router,
TypeScript) app that lets a user upload a photo and instantly get back a branded
HH Goa 2026 PFP frame overlay, downloadable and shareable to X with #FrameInGoa.

For this first session, focus on the core client-side flow only:
1. Scaffold the project (Next.js + TypeScript + Tailwind), matching the folder
   structure in CODING_CONVENTIONS.md.
2. Add `lib/constants.ts` with placeholder values for canvas size and frame asset
   path (I'll swap in the real branding asset later — use a simple placeholder
   circular frame PNG for now so the flow is testable end to end).
3. Build `UploadZone` — drag/tap to upload, accepts JPG/PNG/HEIC, runs HEIC files
   through `heic2any` before anything else touches them.
4. Build `lib/image/compositeFrame.ts` — draws the uploaded photo centered/cropped
   correctly (handle portrait, landscape, and off-center photos without assuming
   a pre-crop) onto a canvas, then draws the frame PNG on top.
5. Build `FramePreview` to show the live result and `DownloadButton` to export it
   as a real PNG file.
6. Confirm the whole upload→preview→download flow works with zero network calls
   and feels instant on a throttled mobile connection.

Do NOT build the Vercel Blob upload, the OG-image share page, or the X share
button yet — that's the next session. Stop after step 6, then update PROGRESS.md
with what you did and what's next, per the end-of-session protocol in AGENTS.md.
