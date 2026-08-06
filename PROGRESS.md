# PROGRESS.md

Running log of work done, in reverse chronological order (newest at top).
Every agent adds one entry per session, before ending. Don't delete old entries.

Format for each entry:
```
## YYYY-MM-DD — [agent/tool used]
Done:
- ...
Next:
- ...
Blockers/decisions:
- ...
```

---

## 2026-08-06 — Antigravity (Phase 2 Share Flow)
Done:
- Installed `@vercel/blob` dependency.
- Created `app/api/upload/route.ts` API route for raw binary image uploads to Vercel Blob, using `arrayBuffer` for broad environment runtime compatibility.
- Created `app/share/[imageId]/page.tsx` as a Server Component displaying the generated PFP image centered, with a Call-to-Action linking back to the homepage `/` to "Create Your Own PFP Frame".
- Created `app/share/[imageId]/opengraph-image.tsx` dynamic route proxying the stored image from Vercel Blob using URL-safe Base64 decode.
- Built the `ShareButton` component to handle Vercel Blob uploading, Base64 ID calculation, cache logic, and X Web Intent generation.
- Modified `app/page.tsx` to integrate the X Share button, track `shareUrl` dynamically, and clear states on reset.
- Configured dynamic `metadataBase` in `app/layout.tsx` to ensure Vercel automatically compiles absolute URLs for dynamic Open Graph and Twitter image cards.
- Verified local linting and compilation successfully via `npm run lint` and `npm run build`.
Next:
- Deploy to Vercel and configure `BLOB_READ_WRITE_TOKEN` env variable.
- Manually test and verify the live URL preview behavior on X.
- Swap in final branded frame assets in `public/frame.png`.
Blockers/decisions:
- Encoded the Vercel Blob URLs in URL-safe Base64 strings to form `/share/[imageId]` paths, making the metadata proxy domain-agnostic and robust across all development/staging/production configurations.
- Dynamic metadata image previews must be verified in a live deployment environment because local dev environments cannot be scraped directly by X's link preview crawlers.


## 2026-08-06 — Antigravity (Phase 1 Core Client-Side Flow)
Done:
- Scaffolded Next.js 16.3 + TypeScript + Tailwind CSS project with App Router, matching the required directory conventions.
- Added `lib/constants.ts` containing canvas size, frame path, brand colors, and share tweet constants.
- Generated a high-quality 1080x1080 transparent circular placeholder frame at `public/frame.png` using a native .NET Graphics PowerShell script.
- Built client-side HEIC conversion utility `lib/image/heicConvert.ts` with dynamic import of `heic2any` to avoid SSR `window is not defined` errors.
- Built `lib/image/compositeFrame.ts` with HTML5 Canvas drawing, supporting aspect ratio calculations for auto center-cropping (landscape, portrait, and off-center).
- Created functional modular components: `UploadZone` (file checking + HEIC conversion handling), `FramePreview` (composite PFP rendering), and `DownloadButton` (anchor-driven PNG download).
- Wired everything into `app/page.tsx` with a premium dark-themed glassmorphism interface, fully client-side flow.
- Verified compilation and linting by successfully running `npm run lint` and `npm run build`.
Next:
- Build the server-side Vercel Blob upload API route (`api/upload/route.ts`) to store generated images for link previews.
- Build the dynamic share page (`share/[imageId]/page.tsx`) and the dynamic open graph preview page (`share/[imageId]/opengraph-image.tsx`) to support Twitter/X share link previews.
- Integrate the Twitter/X Web Intent share button with pre-filled caption text and `#FrameInGoa` hashtag.
- Perform a mobile layout optimization and testing pass.
- Deploy to Vercel and publish/post to X.
Blockers/decisions:
- Fixed the `window is not defined` Next.js static prerendering crash by dynamically importing `heic2any` client-side only.
- Scaffolding was done inside a temporary folder to bypass the npm package naming restriction (since the workspace root folder name contains capital letters and spaces) and successfully moved up to the root folder.

## Not started yet
Done:
- (nothing yet — this file is the template, first real entry goes above this line)
Next:
- Scaffold Next.js + TypeScript + Tailwind project
- Add placeholder frame asset and constants.ts
- Build UploadZone + canvas compositing (compositeFrame.ts) for the core flow
- Build download button
- Build Vercel Blob upload route + share page with dynamic OG image
- Build X Web Intent share button
- Mobile pass / cross-device testing
- Deploy to Vercel, get live link
- Post to X with #FrameInGoa
Blockers/decisions:
- Waiting on final frame branding asset (see CONTEXT.md "Open questions")
