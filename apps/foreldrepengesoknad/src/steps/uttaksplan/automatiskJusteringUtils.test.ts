import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { erJusterbartUttakRundtTermin } from './UttaksplanForm';

const lagPeriode = (
    kontoType: UttakPeriode_fpoversikt['kontoType'],
    samtidigUttak?: UttakPeriode_fpoversikt['samtidigUttak'],
): UttakPeriode_fpoversikt => ({
    fom: '2026-06-01',
    tom: '2026-06-05',
    forelder: 'FAR_MEDMOR',
    flerbarnsdager: false,
    kontoType,
    samtidigUttak,
});

describe('erJusterbartUttakRundtTermin', () => {
    it('returnerer true for fedrekvote med samtidig uttak', () => {
        expect(erJusterbartUttakRundtTermin(lagPeriode('FEDREKVOTE', 100))).toBe(true);
    });

    it('returnerer false for fedrekvote uten samtidig uttak', () => {
        expect(erJusterbartUttakRundtTermin(lagPeriode('FEDREKVOTE'))).toBe(false);
    });

    it('returnerer true for foreldrepenger uten samtidig uttak', () => {
        expect(erJusterbartUttakRundtTermin(lagPeriode('FORELDREPENGER'))).toBe(true);
    });
});
