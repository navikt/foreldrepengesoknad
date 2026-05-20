import { UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';

export const erJusterbartUttakRundtTermin = (periode: UttakPeriode_fpoversikt): boolean =>
    (periode.kontoType === 'FEDREKVOTE' && Uttaksperioden.erSamtidigUttak(periode)) ||
    periode.kontoType === 'FORELDREPENGER';
