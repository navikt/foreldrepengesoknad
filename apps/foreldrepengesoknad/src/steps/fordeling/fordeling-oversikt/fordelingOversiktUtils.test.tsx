import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { getSisteUttaksdagAnnenForelder } from './fordelingOversiktUtils';

const lagUttak = (forelder: 'MOR' | 'FAR_MEDMOR', fom: string, tom: string): UttakPeriode_fpoversikt => ({
    flerbarnsdager: false,
    fom,
    tom,
    forelder,
});

const lagEøs = (fom: string, tom: string): UttakPeriodeAnnenpartEøs_fpoversikt => ({
    fom,
    tom,
    trekkdager: 5,
    kontoType: 'FELLESPERIODE',
});

describe('getSisteUttaksdagAnnenForelder', () => {
    it('returnerer undefined når det ikke er delt uttak', () => {
        expect(getSisteUttaksdagAnnenForelder(true, false, [lagUttak('MOR', '2025-04-01', '2025-04-30')])).toBeUndefined();
    });

    it('returnerer undefined når annen parts perioder mangler eller er tomme', () => {
        expect(getSisteUttaksdagAnnenForelder(true, true, undefined)).toBeUndefined();
        expect(getSisteUttaksdagAnnenForelder(true, true, [])).toBeUndefined();
    });

    it('bruker MOR sine perioder når søker er far/medmor', () => {
        const perioder = [
            lagUttak('MOR', '2025-04-01', '2025-04-10'),
            lagUttak('FAR_MEDMOR', '2025-04-11', '2025-04-20'),
            lagUttak('MOR', '2025-04-21', '2025-04-30'),
        ];
        // 2025-04-30 er en onsdag, så siste uttaksdag er samme dag
        expect(getSisteUttaksdagAnnenForelder(true, true, perioder)).toBe('2025-04-30');
    });

    it('bruker FAR_MEDMOR sine perioder når søker er mor', () => {
        const perioder = [
            lagUttak('FAR_MEDMOR', '2025-04-01', '2025-04-15'),
            lagUttak('MOR', '2025-04-16', '2025-04-24'),
            lagUttak('FAR_MEDMOR', '2025-04-21', '2025-04-25'),
        ];
        // 2025-04-25 er en fredag
        expect(getSisteUttaksdagAnnenForelder(false, true, perioder)).toBe('2025-04-25');
    });

    it('inkluderer EØS-perioder uavhengig av forelder', () => {
        const perioder = [lagUttak('FAR_MEDMOR', '2025-04-01', '2025-04-10'), lagEøs('2025-04-21', '2025-04-30')];
        expect(getSisteUttaksdagAnnenForelder(true, true, perioder)).toBe('2025-04-30');
    });
});
