# Costa Rica Rentals (repo: bambirentals)

ATV rental site for Santa Teresa, Costa Rica — client project, live in production. Being transformed into a 3-category marketplace (ATVs / Stays / Cars) per `docs/ROADMAP.md`.

## Stack
- React 19 + Vite + TypeScript
- **Tailwind via CDN script tag in `index.html`** — NOT a build dependency. There is no tailwind.config; do not add PostCSS/Tailwind packages for styling tweaks.
- lucide-react icons
- Supabase arrives in the marketplace phase (ROADMAP milestone 2); today there is no database and no server.

## Deploy — read before touching anything
- **Push to `main` = production deploy.** GitHub-connected Vercel auto-deploys to https://bambirentals.vercel.app. There is NO manual `vercel --prod` step; do not run it.
- Verify a deploy via `gh` commit status (or the Vercel dashboard), not by re-deploying.
- **Deploys only fire for git authors with access to the client's Vercel team** (`ofeynat2021-8517's projects`). If commit status shows "Git author ... must have access to the project on Vercel", the push did NOT deploy and production keeps serving the previous build. Fix: accept the Vercel team invite from the status `target_url`, then redeploy (empty commit or dashboard Redeploy).
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
