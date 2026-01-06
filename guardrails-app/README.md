## “Is this allowed?” Research AI Guardrails Assistant

Chat-style, deterministic assistant that asks 3–6 structured questions and returns Green/Yellow/Red guidance, approved tool suggestions, rationale, safer workflow steps, and a copyable checklist. Local-first; no external calls.

### Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn-inspired UI components
- Zustand for session storage state
- Zod for validation

### Getting started (local)
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

Scripts:
- `npm run lint`
- `npm run test`

### Key routes
- `/` – landing
- `/assistant` – chat-style flow (3–6 questions, back/start-over, progress)
- `/results` – latest evaluation (persisted in session)
- `/library` – browse rules/examples
- `/about` – overview/disclaimer

### Data + rule engine
- Rules: `src/data/rules.json` (10+ seeded)
- Examples: `src/data/examples.json` (used as golden tests)
- Evaluator: `src/lib/evaluator.ts`
- Zod schema: `src/lib/schema.ts`

#### Add or edit a rule
1. Open `src/data/rules.json`.
2. Add an object `{ id, title, status, conditions, tags, rationale[], recommendedTools[], saferWorkflow[] }`.
3. `conditions` uses exact answer keys; values can be a string or string array to match multiple.
4. Run `npm run test` to verify against examples or add a new example below.

#### Add an example (for tests/demo)
1. Edit `src/data/examples.json`.
2. Provide `{ id, title, answers, expectedStatus, notes? }`.
3. Run `npm run test` to confirm the evaluator matches.

### Azure deployment
No environment variables are required for the MVP.

#### Azure Static Web Apps (recommended)
1. Build locally to verify: `npm run build`.
2. In Azure Portal, create a Static Web App.
3. Use source: this repo; build command: `npm run build`; output location: `.next`.
4. Ensure API location is left blank (app is static/edge only).
5. Deploy; the app will serve from `/`.
6. If using GitHub Actions, set the Static Web Apps action to deploy whatever is emitted under `.next` rather than the default `build` folder (see `.github/workflows/azure-static-web-apps.yml`).

#### Azure App Service (alternative)
1. Build: `npm run build`.
2. `npm run start` serves the production build.
3. In App Service, configure a Node 18+ runtime.
4. Set `WEBSITE_NODE_DEFAULT_VERSION` to match your local Node.
5. Deploy code (e.g., via Zip Deploy or GitHub Actions); start command `npm run start`.

### Notes
- Local-first: no external API calls; answers/results stay in session storage.
- Clipboard and “Save as JSON” are client-side only.
- Results page pulls from session; use “Start over” to clear state.
