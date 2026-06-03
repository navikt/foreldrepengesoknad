# Copilot Instructions – foreldrepengesoknad

## About this repo

This is a pnpm/Turborepo monorepo containing all self-service frontend
applications for Team Foreldrepenger at Nav (Norwegian Labour and Welfare
Administration). The repo covers three benefits defined in Folketrygdloven
(National Insurance Act) chapter 14: **foreldrepenger** (parental benefit),
**svangerskapspenger** (pregnancy benefit), and **engangsstønad** (lump-sum
grant).

End users are citizens who apply for, plan, or monitor these benefits via nav.no.

## The benefits

Three benefits under Folketrygdloven kap. 14:

| Code | Norwegian | Citizen info |
|------|-----------|--------------|
| FP | Foreldrepenger | https://www.nav.no/foreldrepenger |
| SVP | Svangerskapspenger | https://www.nav.no/svangerskapspenger |
| ES | Engangsstønad | https://www.nav.no/engangsstonad |

See [fp-context/domain/business-context.md](https://github.com/navikt/fp-context/blob/main/domain/business-context.md)
for legal basis, value chain, and core concepts.

## Applications

| App | Description | Requires login |
|-----|-------------|----------------|
| `foreldrepengesoknad` | Application for foreldrepenger – multi-step form with leave planner (uttaksplan) | Yes |
| `svangerskapspengesoknad` | Application for svangerskapspenger – multi-step form with employment details | Yes |
| `engangsstonad` | Application for engangsstønad – simpler multi-step form | Yes |
| `foreldrepengeoversikt` | Dashboard for viewing applications, cases, and payments across all three benefits | Yes |
| `planlegger` | Parental leave planner – plan how to split the leave period between parents | No |
| `veiviser-fp-eller-es` | Wizard that helps the user choose between foreldrepenger and engangsstønad | No |
| `veiviser-hvor-mye` | Wizard that estimates how much foreldrepenger the user may receive | No |

### Servers

| Directory | Description |
|-----------|-------------|
| `server` | Express 5 server for authenticated apps (proxy, token handling via `@navikt/oasis`) |
| `server-uinnlogget` | Express 5 server for unauthenticated apps (planlegger, wizards) |

## Tech stack

- **UI:** React 19, React Router 7, Aksel (Nav's design system via `@navikt/ds-*`)
- **Forms:** React Hook Form
- **Data fetching:** TanStack React Query
- **Build:** Vite, TypeScript, Turborepo, pnpm workspaces
- **Testing:** Vitest, Vitest Browser (Playwright driver), Storybook
- **Server:** Express 5, esbuild-bundled Node.js
- **Infrastructure:** Docker, NAIS (Kubernetes), GitHub Actions

## Shared packages (`packages/`)

Common functionality lives in the `packages/` directory. Key packages:

- `ui` – Shared React components built on Aksel
- `types` – Auto-generated TypeScript types from backend OpenAPI specs
- `uttaksplan` – Logic and UI for leave period planning
- `form-hooks` – Reusable React Hook Form hooks
- `filopplaster` – File upload component
- `steg-*` – Reusable application steps (foreign residence, employment, freelance, self-employment, summary, receipt)
- `validation` – Validation rules
- `utils` / `constants` – Utility functions and constants
- `observability` – OpenTelemetry setup
- `server-utils` – Shared server logic

## Additional context

For deeper understanding of Team Foreldrepenger's domain, architecture, and
conventions, see:

- **[fp-context](https://github.com/navikt/fp-context)** – AI context hub with
  domain explanations, glossary, architecture overview, and conventions shared
  across the team's 40+ repositories.
- **Copilot Space
  [TeamForeldrepenger](https://github.com/copilot/spaces/navikt/15)** (owned by
  `navikt`) – Knowledge base for chat, IDE agent, and CLI. Use with: _"Using the
  TeamForeldrepenger space owned by navikt, ..."_

## Uttaksplan rule catalog (self-documenting Storybook)

The `packages/uttaksplan/src/regler/` directory contains the business rules for
the leave planner (uttaksplan) — visibility rules, quota type rules, field
validation, submit validation, and alert rules. Each rule category lives in its
own subdirectory and has a corresponding `*.stories.tsx` file that renders a
self-documenting catalog page in Storybook.

The stories import the rule arrays directly from the source modules (e.g.
`INFORMASJONS_ALERTS`, `BLOKKERENDE_ALERTS`, `KONTEKSTUELLE_ALERTS`), so **rules
update automatically** in Storybook when you change them — and new rules show
up automatically as long as you add them to the source array. When you:

- **Add a new rule constant** — add it to the exported array in the same source
  file (e.g. `INFORMASJONS_ALERTS` in `informasjonsAlerts.tsx`). The story picks
  it up automatically.
- **Add a new rule area (område)** — you must create a new område object in the
  story and include it in the top-level array.
- **Add a new rule category** — create a new `.stories.tsx` following the
  existing pattern (use `RegelkatalogSide`). Export a single array of rule
  constants from the source module and import it in the story.

| Rule category | Source directory | Story file |
|---------------|-----------------|------------|
| Quota types (stønadskonto) | `regler/kvotetype/` | `Kvotetyperegler.stories.tsx` |
| Visibility (field/button) | `regler/synlighet/` | `Synlighetsregler.stories.tsx` |
| Field validation | `regler/felt/` | `Feltregler.stories.tsx` |
| Submit validation | `regler/validering/` | `Valideringsregler.stories.tsx` |
| Alerts / info messages | `regler/alert/` | `Alertregler.stories.tsx` |
| Color catalog (kalender + liste) | `kalender/` | `Fargekatalog.stories.tsx` |

The color catalog (`Fargekatalog.stories.tsx`) documents the full color system
for both the calendar and list views side-by-side. It uses mock periods fed into
the **production functions** (`getKalenderFargeForPeriode`, `finnBakgrunnsfarge`,
`getBorderFarge`, `getIkon`, `getLegendLabelFromPeriode`), so color changes are
reflected automatically. Only interaction colors (NONE, DARKBLUE, LIGHTBLUE,
LIGHTGREEN) and special-day markers (barnehage, helg) are static. When you:

- **Change color logic** in `usePerioderForKalendervisning.tsx` or
  `PeriodeListeHeaderUtils.tsx` — the catalog updates automatically.
- **Add a new period type** — add a new `beregnEntry()` call with a mock period
  in the relevant område array.

## Guidelines for code changes

- Use Norwegian domain terminology where appropriate (søknad, uttaksplan,
  dekningsgrad, stønadsperiode, etc.)
- Prefer components from `packages/` and Aksel over custom solutions
- Follow existing patterns in the app you are working on
- Apps can be run locally with `pnpm run dev:mock` / `pnpm run dev:lokal` or
  via Vite mode against the dev environment (see README)
- Types are generated from the backend with `pnpm generate` or `pnpm generate:local`
