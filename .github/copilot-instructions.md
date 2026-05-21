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

### Foreldrepenger (parental benefit)

Foreldrepenger is income compensation for parents who stay home with a child
after birth or adoption. Both parents may be eligible if they have had
pensionable income for at least 6 of the last 10 months. Parents choose between
100 % or 80 % coverage (dekningsgrad), and the parental benefit period is split
into a maternal quota (mødrekvote), a paternal quota (fedrekvote), and a shared
period (fellesperiode) that can be divided between the parents.

Read more: https://www.nav.no/foreldrepenger

### Svangerskapspenger (pregnancy benefit)

Svangerskapspenger is for pregnant employees, freelancers, or self-employed
individuals who cannot continue working during pregnancy because the work
environment poses a risk to the child – and the employer is unable to
accommodate or reassign. The benefit covers income from when the person must
stop working until three weeks before the due date, when the parental benefit
period begins.

Read more: https://www.nav.no/svangerskapspenger

### Engangsstønad (lump-sum grant)

Engangsstønad is a one-time payment at birth or adoption for parents who have
not earned the right to foreldrepenger (i.e. have not had sufficient income for
at least 6 of the last 10 months). The grant is a fixed amount per child.

Read more: https://www.nav.no/engangsstonad

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
- **Testing:** Vitest, Storybook, Playwright (browser tests)
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

## Guidelines for code changes

- Use Norwegian domain terminology where appropriate (søknad, uttaksplan,
  dekningsgrad, stønadsperiode, etc.)
- Prefer components from `packages/` and Aksel over custom solutions
- Follow existing patterns in the app you are working on
- Apps can be run locally with `pnpm run dev:mock` / `pnpm run dev:lokal` or
  via Vite mode against the dev environment (see README)
- Types are generated from the backend with `./generate-api-types.sh`
