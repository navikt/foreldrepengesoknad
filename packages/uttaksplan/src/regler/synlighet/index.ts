import { Synlighetskapittel } from './types';
import { FELT_SYNLIGHET_KAPITTEL } from './feltSynlighet';
import { FORELDER_VALG_KAPITTEL } from './forelderValg';

export { synlighetForForelderValg } from './forelderValg';
export type { ForelderValgKontekst } from './forelderValg';
export { synlighetForFelter } from './feltSynlighet';
export type { FeltSynlighetKontekst } from './feltSynlighet';
export { useFeltSynlighet } from './useFeltSynlighet';

/**
 * Alle synlighetsregler i uttaksplan. Brukes av Storybook-siden for å
 * vise reglene samlet for designere, produkteiere og saksbehandlere.
 */
export const ALLE_SYNLIGHETSREGLER: readonly Synlighetskapittel[] = [
    FORELDER_VALG_KAPITTEL,
    FELT_SYNLIGHET_KAPITTEL,
];
