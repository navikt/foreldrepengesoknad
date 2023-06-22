# Selvbetjeningsløsning svangerskapspenger

Kildekoden til frontend-appen for ny selvbetjeningsløsning for
svangerskapspenger.

# Komme i gang

For å kjøre opp app-en i dev (med mock-api):

1. `pnpm install`.
2. `pnpm run dev-api`.
3. `pnpm run dev`

# Formik

_Per 29.03.2019._

Svangerskapspengesøknaden bruker `<Formik />` til å mellomlagre og validere skjemafelter. `FormikWrapper`-komponenten wrapper hele søknaden, setter opprinnelige søknadsverdier, kjører valideringsfunksjonen på hver endring og resetter intern Formik-state mellom hvert steg. Hvert steg har et `form` som kobles til Formik sin `handleSubmit`.

Valideringsfunksjonen validerer alle stegene opp til og inkludert det nåværende steget. Feilmeldinger vil settes på formik sitt `errors`-objekt etterhvert som brukeren fyller ut feltene, men vises ikke til brukeren før Formik sin interne `submitCount > 0`, dvs. at brukeren har prøvd å gå til neste steg med feil i nåværende (eller tidligere steg). Feilmeldinger vises både i et eget panel og under feltene selv.

Feltene i søknaden må wrappes rundt Formik sine `Field`-komponenter. Disse ligger under `formik/wrappers/`, og setter på feilmeldinger fra Formik-staten automatisk.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot nav.team.foreldrepenger@nav.no.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #teamforeldrepenger.

### Icon License

This project uses [Streamline Icons](http://www.streamlineicons.com/). If you use nav-frontend-moduler in your project please adhere to the [Streamline Icons license agreement](http://www.streamlineicons.com/license.html).
