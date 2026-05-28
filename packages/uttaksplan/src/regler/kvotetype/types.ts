import type { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';

import type { SeOgsåLenke } from '../RegelkatalogSide';

/**
 * Doc-typen for en kvoteregel — alt som beskriver regelen uten
 * runtime-logikk. Brukt i Storybook-katalogen og som basis for
 * `Kvoteregel<TKontekst>`.
 */
type KvoteregelDoc = {
    id: string;
    beskrivelse: string;
    forelder: BrukerRolleSak_fpoversikt;
    kontotype: KontoTypeUttak;
};

/**
 * En regel som avgjør om en gitt kvotetype (stønadskontotype) er gyldig
 * å velge for én forelder gitt valgte perioder og søknadens kontekst.
 *
 * Reglene er rene funksjoner — bruker en kontekst og returnerer en
 * boolean. `beskrivelse` er klartekst på bokmål for designere,
 * produkteiere og saksbehandlere.
 */
export type Kvoteregel<TKontekst> = KvoteregelDoc & {
    erGyldig: (kontekst: TKontekst) => boolean;
};

/**
 * En samling kvoteregler — brukt både til selve valg-logikken i
 * skjemaet og til å autogenerere Storybook-dokumentasjon.
 */
export type Kvoteområde = {
    id: string;
    område: string;
    beskrivelse: string;
    seOgså?: readonly SeOgsåLenke[];
    regler: readonly KvoteregelDoc[];
};
