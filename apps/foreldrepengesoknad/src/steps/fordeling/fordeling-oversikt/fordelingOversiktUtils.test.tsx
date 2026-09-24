import { PeriodeDto_fpoversikt, UttakDto_fpoversikt } from '@navikt/fp-types';

import { getSisteUttaksdagAnnenForelder } from './fordelingOversiktUtils';

const lagUttak = (forelder: 'MOR' | 'FAR_MEDMOR'): UttakDto_fpoversikt => ({
    flerbarnsdager: false,
    forelder,
});

const lagEøs = (fom: string, tom: string): PeriodeDto_fpoversikt => ({
    fom,
    tom,
    annenPartEøs: {
        trekkdager: 5,
        kontoType: 'FELLESPERIODE',
    },
});

describe('getSisteUttaksdagAnnenForelder', () => {
    it('returnerer undefined når det ikke er delt uttak', () => {
        expect(
            getSisteUttaksdagAnnenForelder(true, false, [
                { fom: '2025-04-01', tom: '2025-04-30', annenPart: lagUttak('MOR') },
            ]),
        ).toBeUndefined();
    });

    it('returnerer undefined når annen parts perioder mangler eller er tomme', () => {
        expect(getSisteUttaksdagAnnenForelder(true, true, undefined)).toBeUndefined();
        expect(getSisteUttaksdagAnnenForelder(true, true, [])).toBeUndefined();
    });

    it('bruker MOR sine perioder når søker er far/medmor', () => {
        const perioder: PeriodeDto_fpoversikt[] = [
            { fom: '2025-04-01', tom: '2025-04-10', annenPart: lagUttak('MOR') },
            { fom: '2025-04-11', tom: '2025-04-20', søker: lagUttak('FAR_MEDMOR') },
            { fom: '2025-04-21', tom: '2025-04-30', annenPart: lagUttak('MOR') },
        ];
        // 2025-04-30 er en onsdag, så siste uttaksdag er samme dag
        expect(getSisteUttaksdagAnnenForelder(true, true, perioder)).toBe('2025-04-30');
    });

    it('bruker FAR_MEDMOR sine perioder når søker er mor', () => {
        const perioder: PeriodeDto_fpoversikt[] = [
            { fom: '2025-04-01', tom: '2025-04-15', annenPart: lagUttak('FAR_MEDMOR') },
            { fom: '2025-04-16', tom: '2025-04-20', søker: lagUttak('MOR') },
            { fom: '2025-04-21', tom: '2025-04-24', søker: lagUttak('MOR'), annenPart: lagUttak('FAR_MEDMOR') },
            { fom: '2025-04-25', tom: '2025-04-25', annenPart: lagUttak('FAR_MEDMOR') },
        ];
        // 2025-04-25 er en fredag
        expect(getSisteUttaksdagAnnenForelder(false, true, perioder)).toBe('2025-04-25');
    });

    it('inkluderer EØS-perioder', () => {
        const perioder: PeriodeDto_fpoversikt[] = [
            { fom: '2025-04-01', tom: '2025-04-10', søker: lagUttak('FAR_MEDMOR') },
            lagEøs('2025-04-21', '2025-04-30'),
        ];
        expect(getSisteUttaksdagAnnenForelder(true, true, perioder)).toBe('2025-04-30');
    });
});
