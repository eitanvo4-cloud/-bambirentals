# Costa Rica Rentals (repo: bambirentals)

ATV rental site for Santa Teresa, Costa Rica — client project, live in production. Being transformed into a 3-category marketplace (ATVs / Stays / Cars) per `docs/ROADMAP.md`.

## Stack
- React 19 + Vite + TypeScript
- **Tailwind via CDN script tag in `index.html`** — NOT a build dependency. There is no tailwind.config; do not add PostCSS/Tailwind packages for styling tweaks.
- lucide-react icons
- Supabase arrives in the marketplace phase (ROADMAP milestone 2); today there is no database and no server.

## Deploy — read before touching anything
- **Push to `main` = production deploy.** GitHub-connected Vercel auto-deploys to https://bambirentals.vercel.app (also `costaricarentals.cr` / `www.costaricarentals.cr`). There is NO manual `vercel --prod` step; do not run it.
- Verify a deploy via `gh` commit status (or the Vercel dashboard), not by re-deploying.
- **Keep the GitHub repo PUBLIC.** The Vercel team (`ofeynat2021-8517's projects`) is on the **Hobby** plan. On Hobby, a *private* repo only deploys commits whose author resolves to the team owner's Vercel account — everyone else's push is `BLOCKED` ("Git author … must have access to the project on Vercel"), and production silently keeps serving the last good build. A *public* repo has no such restriction. The repo was flipped private ~2026-07-02 and every deploy was blocked for ~2 months until it was made public again on 2026-09-09 (`137f7b8`). If deploys start bouncing, check repo visibility FIRST (`gh repo view --json visibility`).
  - Stopgap while blocked: Vercel dashboard → bambirentals → Deployments → latest → ⋯ → Redeploy (runs as the owner, bypasses the block, ships `main` HEAD).
  - To retrigger a deploy with no code change: `git commit --allow-empty` + push to main.
- `.vercel/project.json` is gitignored and currently points at a **stale** project/team — ignore it, or `vercel link` to the `ofeynat2021-8517's projects` team if you need the CLI. Does not affect git-push deploys.
- **Cloud agents also push to this repo** (merged PRs #1-#3 came from them). ALWAYS `git fetch origin` and check `git status -sb` before committing or merging — origin/main moves without warning.

## Workflow conventions
- No PRs for local work: small changes merge straight to main (owner preference). Cloud agents use PRs; fine.
- Booking flow = FormSubmit email + WhatsApp link. A Vercel serverless email function was built and deleted after a failed debug saga (see git history around `FUNCTION_INVOCATION_FAILED`) — do not resurrect it without asking.
- The Gemini/AI chat assistant was removed on purpose and replaced by an FAQ. Do not re-add it.
- Roadmap lives in `docs/ROADMAP.md` (12 milestones, one per session). Update it as milestones land.

## Commands
```bash
npm run dev
npm run build   # run before any push — this is the safety net
```
