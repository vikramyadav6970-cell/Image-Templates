# CONTEXT.md

## What we're building
A web tool for the **HH Goa 2026** hackathon shortlisting task: user uploads a
photo, gets back a branded HH Goa 2026 graphic, downloadable and shareable to X.

**Format chosen: A — PFP Frame/Overlay.**
A frame wraps around the uploaded photo, turning it into a ready-to-use X
profile picture. The uploaded photo stays front and center; the frame just
adds HH Goa branding around it. (Format B, the builder ID card with name/role
fields, is explicitly NOT what we're building.)

## Required flow (from the task brief)
1. User uploads a photo — must support JPG, PNG, HEIC (iPhone).
2. Tool generates the final graphic — must feel near-instant, not a loading screen.
3. User can download the image as a real file.
4. User can hit Share to X — pre-filled tweet, caption + `#FrameInGoa` hashtag,
   with either the image attached directly or a link whose preview (OG image)
   shows the actual generated graphic.

## Hard requirements checklist
- [ ] No login wall, no signup gate, anywhere in the flow
- [ ] Handles portrait, landscape, off-center crops, varying aspect ratios —
      don't assume the user pre-crops
- [ ] Output is unmistakably HH Goa branded, not a generic badge with a logo pasted on
- [ ] Downloadable output is a real image file
- [ ] Share flow has a working pre-filled caption + `#FrameInGoa`
- [ ] If sharing via link, the OG image preview shows the actual generated graphic,
      not a blank/default thumbnail
- [ ] Mobile-friendly (most users will be on phone)
- [ ] Submission needs: live working link + an X post with `#FrameInGoa`

## Deadline
11:59 pm, 13th August 2026. (Per the task PDF — double-check this hasn't changed
before final submission.)

## Key decisions (and why) — add to this list, don't remove past entries
- **Next.js 14 App Router + TypeScript**: need both an instant client-side
  render AND a server route for dynamic OG-image metadata per shared image —
  one framework, one deploy. See tech stack discussion for full reasoning.
- **Native Canvas API, no canvas library**: overlay is a fixed frame + photo,
  doesn't need Fabric/Konva-level interactivity; keeps the main flow fully
  client-side and instant.
- **Vercel Blob** for storing the generated PNG so the share-link page has a
  public URL to point `og:image` at.
- **heic2any** for client-side HEIC conversion (iPhone photos) — avoids a
  server round trip.
- **Tailwind CSS** for styling — speed of building a mobile-first UI on a
  tight deadline.

## Open questions / not yet decided
- [ ] Final frame asset (PNG) — not yet supplied/finalized. Needs transparent
  center matching the crop shape (circle for PFP use, most likely).
- [ ] Exact pre-filled caption text for the X share intent (must include
  `#FrameInGoa` — wording itself still TBD).
- [ ] Brand colors/fonts for the frame — pending final assets.
- [ ] Whether to add the Web Share API (`navigator.share`) as a mobile fallback
  alongside the X Web Intent link (recommended, not yet built).

## Related files
- `AGENTS.md` — read this first in every session
- `PROGRESS.md` — session log, current status, what's next
- `CODING_CONVENTIONS.md` — code style rules
