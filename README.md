# Selvbetjeningsløsning for søknadene om foreldrepenger, engangsstønad og svangerskapspenger og for innsynsløsning for foreldrepengeytelser.

Kildekoden til frontend-appene foreldrepengesøknad, engangsstønad, svangerskapspenger og foreldrepengeoversikt (innsynsløsning for foreldrepenger, svangerskapspenger og engangsstønad).

# For å komme i gang

Du må på forhånd ha installert Node.js (v.18). Vi anbefaler å bruke Git Bash for å kjøre kommandoene.

1. Installer pnpm: `npm install -g pnpm`.
2. I roten av repoet, kjør `pnpm install`.
3. Installer turborepo med `pnpm install -g turbo`
4. Kjør `turbo build`
5. For å sjekke om alt fungerer, kjør testene med `turbo test`

For å kjøre opp appen i dev:

1.  cd til appen du ønsker å jobbe med, f.eks `apps/foreldrepengeoversikt`
2.  Kjør `pnpm run dev-api`.
3.  Kjør `pnpm run dev`

For å kjøre tester for en app:

1.  cd til appen du ønsker å kjøre tester på og kjør `pnpm vitest`.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot nav.team.foreldrepenger@nav.no.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #teamforeldrepenger.

### Icon License

This project uses [Streamline Icons](http://www.streamlineicons.com/). If you use nav-frontend-moduler in your project please adhere to the [Streamline Icons license agreement](http://www.streamlineicons.com/license.html).

### BrowserStack

We test our app with BrowserStack.
[![BrowserStack logo](./browserstack-logo-600x315.png)](https://www.browserstack.com/)
