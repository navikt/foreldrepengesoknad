---
name: lokal-kjoring
description: Start an app in the foreldrepengesoknad monorepo locally in mock mode (Vite, MSW scenarios and the Nav decorator), pick or create a test scenario, and confirm that the page shows what you expect. Use when you need to see, test or verify a change in the browser, run an app locally, show a specific situation (e.g. no cases, continue application, change application) or add a new scenario.
---

# Local run in mock mode

Every app in `apps/` can run with `pnpm run dev:mock`. This starts Vite in mock mode:

- MSW answers the backend calls in the browser. The handlers are the same as in Storybook.
- The Nav decorator is fetched from dev, so the page looks as it does in dev and prod.
- Calls to fpgrunndata (quotas and rates) go to the open dev service.
- A call to `<path>/fp…/api/` without a handler fails as a network error instead of passing through.

## Apps and paths

| App                       | Path                                                 | Port |
| ------------------------- | ---------------------------------------------------- | ---- |
| `foreldrepengesoknad`     | `/foreldrepenger/soknad`                             | 9114 |
| `foreldrepengeoversikt`   | `/foreldrepenger/oversikt`                           | 9110 |
| `svangerskapspengesoknad` | `/svangerskapspenger/soknad`                         | 9112 |
| `engangsstonad`           | `/engangsstonad/soknad`                              | 9113 |
| `planlegger`              | `/foreldrepenger/planlegger`                         | 8090 |
| `veiviser-hvor-mye`       | `/foreldrepenger/hvor-mye`                           | 8092 |
| `veiviser-fp-eller-es`    | `/foreldrepenger/foreldrepenger-eller-engangsstonad` | 8091 |

Path and port are `base` and `server.port` in the app's `vite.config.ts`.

## Start the app

1. Start the server as a long-running background process from the app folder, e.g. `cd apps/foreldrepengeoversikt && pnpm run dev:mock`. The process does not exit by itself.
2. Read the URL from the Vite output (`Local: http://localhost:<port>/<path>`). If the configured port is taken, Vite picks another one, so trust the output.
3. Find the scenarios in the app's `mock/scenarioer.ts`. Each scenario id has `beskrivelse` (description), `kjennetegn` (a text that identifies it) and `handlers`.

You can also pick the scenario at startup with `VITE_SCENARIO=<id> pnpm run dev:mock`.

## Pick a scenario

- Open `http://localhost:<port><path>/?scenario=<id>`. Keep the `/` after the path, otherwise the page is outside the service worker scope and no calls are mocked.
- The choice is remembered in the tab (sessionStorage), so later navigation does not need the parameter. Switch scenario by opening a URL with a new `?scenario=<id>`.
- An unknown id throws an error in the console with the list of valid scenarios.
- A saved application is kept in sessionStorage, separately per scenario. Open a new tab (or browser context) to start the application over.

## Confirm the result

Use Playwright (installed in `packages/config-vite`) or whichever browser tool you have:

1. Wait until `html[data-mock-scenario="<id>"]` exists (in Playwright: `state: 'attached'`, the element is not visible).
2. Wait until the `kjennetegn` text is visible. The scenario's data is then loaded.
3. Check that `#decorator-header` is visible.
4. Check that no request to `<path>/fp…/api/` failed. A failed one means the app calls an endpoint that has no handler. Console errors from the decorator, e.g. "Failed to fetch session" or CORS against `oauth2/session`, are expected locally because no one is logged in.

## Add a scenario

1. Add the id with `beskrivelse`, `kjennetegn` and `handlers` to `scenarioer` in `mock/scenarioer.ts`. `kjennetegn` must be a text that only shows when the scenario has loaded correctly.
2. Build the handlers with `lagHandlers(...)` and other test data, preferably from `.storybook/storybook-data`.
3. Use fictional test persons that already exist in the repo. Never real personal data.
4. Run `pnpm tsc` and `pnpm eslint` in the app folder, and confirm the new scenario in the browser as described above.

Shared helpers live in `packages/utils-test/src/mock/` (the Vite plugin is in `packages/config-vite/mockModusPlugin.mjs`):

- `mellomlagringHandlers(url, startdata?)` stores the saved application in sessionStorage per scenario. With `startdata` the scenario starts with an application in progress.
- `fpgrunndataHandlers(urlPrefiks)` forwards fpgrunndata calls to dev.

## Finish

Stop the dev server when you are done, unless the user wants to keep using it.
