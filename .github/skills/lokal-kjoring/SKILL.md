---
name: lokal-kjoring
description: Start en app i foreldrepengesoknad-monorepoet lokalt i mock-modus (Vite, MSW-scenarioer og Nav-dekoratøren), velg eller lag testscenario og bekreft at siden viser det du forventer. Bruk når du skal se, teste eller verifisere en endring i nettleseren, kjøre appen lokalt, vise en bestemt situasjon (f.eks. ingen saker, fortsett søknad, endringssøknad) eller legge til et nytt scenario.
---

# Lokal kjøring i mock-modus

Hver app i `apps/` kan kjøres med `pnpm run dev:mock`. Det starter Vite i mock-modus:

- Backend-kallene besvares av MSW i nettleseren. Handlerne er de samme som i Storybook.
- Nav-dekoratøren hentes fra dev, så siden ser ut som i dev og prod.
- Kall til fpgrunndata (kvoter og satser) går til den åpne dev-tjenesten.
- Et backend-kall uten handler feiler med en `[MSW]`-feil i konsollen i stedet for å gå videre.

## Apper og stier

| App                       | Sti                                                  | Port |
| ------------------------- | ---------------------------------------------------- | ---- |
| `foreldrepengesoknad`     | `/foreldrepenger/soknad`                             | 9114 |
| `foreldrepengeoversikt`   | `/foreldrepenger/oversikt`                           | 9110 |
| `svangerskapspengesoknad` | `/svangerskapspenger/soknad`                         | 9112 |
| `engangsstonad`           | `/engangsstonad/soknad`                              | 9113 |
| `planlegger`              | `/foreldrepenger/planlegger`                         | 8090 |
| `veiviser-hvor-mye`       | `/foreldrepenger/hvor-mye`                           | 8092 |
| `veiviser-fp-eller-es`    | `/foreldrepenger/foreldrepenger-eller-engangsstonad` | 8091 |

Sti og port står som `base` og `server.port` i appens `vite.config.ts`.

## Start appen

1. Start serveren som en langvarig bakgrunnsprosess fra app-mappen, f.eks. `cd apps/foreldrepengeoversikt && pnpm run dev:mock`. Prosessen avslutter ikke av seg selv.
2. Les URL-en fra Vite-utskriften (`Local: http://localhost:<port>/<sti>`). Porten står i `server.port` i appens `vite.config.ts`. Er den opptatt, velger Vite en annen, så stol på utskriften.
3. Hent scenarioene: `curl -s http://localhost:<port><sti>/__scenarioer`. Svaret har `beskrivelse`, `startsti` og `kjennetegn` per scenario.

Du kan også velge scenario ved oppstart med `VITE_SCENARIO=<id> pnpm run dev:mock`.

## Velg scenario

- Åpne `http://localhost:<port><sti><startsti>?scenario=<id>`.
- Valget huskes i fanen (sessionStorage), så senere navigering trenger ikke parameteren. Bytt scenario ved å åpne en URL med ny `?scenario=<id>`.
- Ukjent id gir en feil i konsollen med listen over gyldige scenarioer.
- Mellomlagret søknad ligger i localStorage, separat per scenario. Legg til `&reset` for å starte søknaden på nytt.

## Bekreft resultatet

Bruk Playwright (finnes i `packages/config-vite`) eller nettleserverktøyet du har:

1. Vent til `html[data-mock-scenario="<id>"]` finnes (i Playwright: `state: 'attached'`, elementet er ikke synlig).
2. Vent til teksten i `kjennetegn` er synlig. Da er data for scenarioet lastet.
3. Sjekk at `#decorator-header` er synlig.
4. Sjekk at ingen konsollfeil inneholder `[MSW]`. En slik feil betyr at appen kaller et endepunkt som mangler handler. Andre konsollfeil fra dekoratøren, f.eks. «Failed to fetch session» eller CORS mot `oauth2/session`, er forventet lokalt fordi ingen er innlogget.

`pnpm run test:mock` i app-mappen gjør en automatisk versjon av dette. Den sjekker også at prod-bygget er uten mock-kode.

## Legg til et scenario

1. Legg inn id, `beskrivelse`, `startsti` og `kjennetegn` i `src/mock/scenarioer.json`. `kjennetegn` skal være en tekst som bare vises når scenarioet er lastet riktig.
2. Legg inn handlerne under samme id i `src/mock/scenarioer.ts`. Bruk `lagHandlers(...)` med andre testdata, helst fra `.storybook/storybook-data`. TypeScript feiler hvis id-ene i de to filene ikke stemmer overens.
3. Bruk fiktive testpersoner som allerede finnes i repoet. Aldri ekte persondata.
4. Kjør `pnpm run test:mock`, `pnpm tsc` og `pnpm eslint` i app-mappen.

Felles hjelpere ligger i `packages/config-vite/mockModus/`:

- `mellomlagringHandlers(url, startdata?)` mellomlagrer per scenario. Med `startdata` starter scenarioet med en påbegynt søknad.
- `fpgrunndataHandlers(urlPrefiks)` sender fpgrunndata-kall til dev.

## Avslutt

Stopp dev-serveren når du er ferdig, med mindre brukeren vil bruke den videre.
