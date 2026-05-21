import { Synlighetsområde } from './types';
import { FELT_SYNLIGHET_OMRÅDE } from './feltSynlighet';
import { FORELDER_VALG_OMRÅDE } from './forelderValg';

export { synlighetForForelderValg } from './forelderValg';
export type { ForelderValgKontekst } from './forelderValg';
export { synlighetForFelter, useFeltSynlighet } from './feltSynlighet';
export type { FeltSynlighetKontekst } from './feltSynlighet';

/**
 * Alle synlighetsregler i uttaksplan. Brukes av Storybook-siden for å
 * vise reglene samlet for designere, produkteiere og saksbehandlere.
 */
export const ALLE_SYNLIGHETSREGLER: readonly Synlighetsområde[] = [
    FORELDER_VALG_OMRÅDE,
    FELT_SYNLIGHET_OMRÅDE,
];
