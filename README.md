# Selvbetjeningsløsninger for Team Foreldrepenger sine ytelser - foreldrepenger, svangerskapspenger og engangsstønad.

## Lokal utvikling

### Førstegangsoppsett

Dette monorepoet bruker følgende verktøy:

- node (v22)
- pnpm - som npm, men mer plasseffektiv.
- turbo - for å kjøre tasks parrallelt i et monorepo.
- et personal access token for å installere alle dependencies

### Hvordan lage token

1. Gå til https://github.com/settings/tokens og velg "Generate new token (classic)".
2. Gi tokenet et navn og velg "read:packages" scopet.
3. Velg en utløpsdato og trykk på "Generate token".
4. Kopier tokenet ditt og lagre et trygt sted.
5. På https://github.com/settings/tokens siden, velg "Configure SSO" for tokenet ditt og autoriser for navikt.
6. Bruk tokenet ditt lokalt som `export PACKAGES_AUTH_TOKEN=<token her>`. Dette må du gjøre hver gang du åpner terminalen på nytt eller lagre det mer permanent på lokal maskin

### Installere dependencies og teste at alt bygger

1. Installer node hvis du ikke allerede har det.
2. Installer pnpm: `npm install -g pnpm`.
3. I roten av repoet, kjør `pnpm install`.
4. Kjør `pnpm setup`. Følg instruksjonen i outputen
5. Installer turborepo med `pnpm install -g turbo`
6. Kjør `turbo build`
7. For å sjekke om alt fungerer, kjør testene med `turbo test`

## Hvordan jobbe lokalt

### Utvikling

`apps`-folderen inneholder alle selvbetjeningsappene. `packages` inneholder moduler som er felles for flere av appene.

#### 1. Vite Mode

Vi har en utviklingsmetode vi kaller for "Vite mode".
Den gjør at du kan bruke server som er deployet til dev som utgangspunkt.
Fordelen er at du får brukt helt "ekte" dev data, men med frontend servert fra din localhost.

1. cd til appen du ønsker å kjøre tester på, f.eks `cd apps/foreldrepengeoversikt`
2. Kjør `pnpm run dev-vite`. Nå har du lokal vite-server kjørende på `localhost:5173/foreldrepenger/oversikt`
3. Gå til ingress i dev. f.eks https://foreldrepenger.intern.dev.nav.no/. Logg inn med en testbruker.
4. **Identifiser appens wonderwall port**:
   Sjekk i Docker hvilken port din app bruker. F.eks. kjører `wonderwall-foreldrepengeoversikt` vanligvis på port `9100`.
5. **Aktiver Vite-mode**:
    - Legg til `/vite-on` i slutten av URL-en du bruker i nettleseren (fra steg 3)
    - Dette setter en cookie kalt `use-local-vite-server` i nettleseren din
    - Cookien instruerer den deployede serveren til å sende deg en spesiell `index.html`
    - Denne HTML-filen laster JavaScript fra din lokale utviklingsserver (f.eks. `localhost:9100/foreldrepenger/oversikt` dersom dette er porten du identifiserer i steg 4) i stedet for de ferdig bygde filene på serveren
    - Du vil nå se endringer du gjør lokalt mens du bruker den deployede backend-en

#### 2. Storybook

1. cd til ønsket app. f.eks `cd apps/svangerskapspengesoknad`
2. Kjør `pnpm run storybook`
3. Browser vil automatisk åpne på riktig localhost port

#### 3. Med lokal mock-server

1. cd til `server` og kjør `pnpm build`
2. cd til appen du ønsker å jobbe med, f.eks `cd apps/foreldrepengeoversikt`
3. Kjør `pnpm run dev-api`
4. Kjør `pnpm run dev`

### Autogenere Typescript typer fra backend

Vi autogenerer typer fra backend sin openApi spec. For å synkronisere typene så kjører du:

```bash
   ./generate-api-types.sh
```

Du må ha verdikjeden kjørende i autotest.

### Tester

For å kjøre tester for en app:

1. cd til appen du ønsker å kjøre tester på, f.eks `cd apps/foreldrepengeoversikt`
2. Kjør `pnpm vitest`.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot nav.team.foreldrepenger@nav.no.

## Bidrag

Vi tar gjerne imot Pull Requests og gode forslag til forbedringer! 🧦

Gode bidrag som blir merget inn kan bli belønnet med eksklusive Nav-sokker som takk for innsatsen. Vi setter stor pris på alle som bidrar til å gjøre våre løsninger bedre for brukerne.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #teamforeldrepenger.
