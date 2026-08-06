# CODING_CONVENTIONS.md

Rules for how code in this repo is written. Follow these exactly so any agent's
output looks like it came from the same codebase.

## Folder structure
```
app/
  page.tsx                # main upload + frame + download flow
  share/[imageId]/
    page.tsx              # thin page that redirects/links to X intent
    opengraph-image.tsx   # dynamic OG image route (Next.js metadata API)
  api/
    upload/route.ts       # uploads final PNG to Vercel Blob, returns URL
components/
  UploadZone.tsx
  FramePreview.tsx
  DownloadButton.tsx
  ShareButton.tsx
lib/
  image/
    compositeFrame.ts     # all canvas drawing logic lives here, nowhere else
    heicConvert.ts
  constants.ts             # canvas size, frame asset path, colors, caption text
  types.ts
public/
  frame.png                # the branding frame asset (transparent PNG, RGBA)
```

## Naming
- Components: `PascalCase.tsx`, one component per file, named export matching filename.
- Utility functions/files: `camelCase.ts`.
- Constants: `SCREAMING_SNAKE_CASE` inside `lib/constants.ts`.
- No abbreviations that aren't obvious (`img` is fine, `cmp` is not).

## TypeScript
- Strict mode on. No `any` — use `unknown` and narrow, or define a proper type.
- Prefer `interface` for object shapes that represent props or data models;
  `type` for unions/utility types.
- Every exported function has an explicit return type.

## Components
- Functional components + hooks only. No class components.
- Keep components presentational where possible — canvas logic and file
  handling live in `lib/image/`, not inside component bodies. A component
  calls `compositeFrame(...)`, it doesn't implement it inline.
- One responsibility per component (upload ≠ preview ≠ download ≠ share).

## Styling
- Tailwind utility classes only, no inline `style={}` except for values that
  are computed at runtime (e.g. canvas dimensions).
- Mobile-first: write the unprefixed (mobile) classes first, add `sm:`/`md:`
  variants after.

## State
- `useState`/`useReducer` only. No Redux/Zustand/etc — this app's state is
  small (uploaded file, generated image blob, form status) and doesn't need it.
  If a future agent thinks it needs one, that's a decision — log it in
  CONTEXT.md before adding the dependency.

## Error handling
- Wrap all file/canvas/network operations in try/catch.
- User-facing errors show a simple inline message near the relevant control
  (e.g. "Couldn't read that image — try a JPG or PNG"). Never a blank failure.
- Log the real error to console for debugging; never expose stack traces to the UI.

## Commits
- Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.
- One logical change per commit. Reference what part of the flow it touches,
  e.g. `feat(upload): add HEIC conversion before canvas draw`.

## Assets
- Keep the frame PNG and any brand colors/fonts in `public/` and
  `lib/constants.ts` respectively — never duplicate a hex code or asset path
  across files.
