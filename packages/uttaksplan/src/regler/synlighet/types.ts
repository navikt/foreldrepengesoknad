import type { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

/**
 * Brukerens valg av forelder for én periode i uttaksplan-skjemaet.
 * - `MOR` / `FAR_MEDMOR`: én forelder tar perioden alene
 * - `BEGGE`: samtidig uttak
 * - `undefined`: brukeren har ikke valgt enda
 *
 * Bor i synlighet/-katalogen fordi den brukes som inputtype til både
 * felt- og forelder-synlighetsreglene.
 */
export type ForelderValg = BrukerRolleSak_fpoversikt | 'BEGGE' | undefined;

/**
 * Doc-typen for en synlighetsregel — alt som beskriver regelen uten
 * runtime-logikk. Brukt i Storybook-katalogen og som basis for
 * `Synlighetsregel<TKontekst>`.
 */
type SynlighetsregelDoc = {
    id: string;
    beskrivelse: string;
};

/**
 * En regel for å avgjøre om noe skal vises i skjemaet — et felt, en
 * radioknapp, eller en infoboks. Reglene er rene funksjoner som tar imot
 * en kontekst (relevant skjemastatus + bakgrunnsdata) og returnerer en
 * boolean.
 *
 * `beskrivelse` skal være klartekst på bokmål som forklarer regelen for
 * en designer, produkteier eller saksbehandler.
 */
export type Synlighetsregel<TKontekst> = SynlighetsregelDoc & {
    skalVises: (kontekst: TKontekst) => boolean;
};

/**
 * En samling synlighetsregler innenfor ett område av skjemaet —
 * brukt både til selve visningslogikken og til å autogenerere
 * Storybook-dokumentasjon.
 */
export type Synlighetsområde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: readonly SynlighetsregelDoc[];
};
