import { describe, expect, it } from 'vitest';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { prosesserPerioderForVisning } from './prosesserPerioderForVisning';

describe('prosesserPerioderForVisning', () => {
    it('markerer søkar med samtidig uttak for overlappande del når berre annen part har samtidig uttak', () => {
        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-05-01',
                tom: '2026-05-31',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ];
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-05-15',
                tom: '2026-06-20',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ];

        const result = prosesserPerioderForVisning(perioderSøker, perioderAnnenPart);

        expect(result).toEqual([
            {
                fom: '2026-05-01',
                tom: '2026-05-14',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-05-15',
                tom: '2026-05-31',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2026-05-15',
                tom: '2026-06-20',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ]);
    });

    it('fjernar overlappande del frå annen part utan samtidig uttak når søkar har uttaksperiode', () => {
        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-09-01',
                tom: '2026-09-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-09-10',
                tom: '2026-09-20',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const result = prosesserPerioderForVisning(perioderSøker, perioderAnnenPart);

        expect(result).toEqual([
            {
                fom: '2026-09-01',
                tom: '2026-09-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('trimmar vekk utsettelse-delar som overlappar motparten', () => {
        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-05-01',
                tom: '2026-05-31',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                utsettelseÅrsak: 'ARBEID',
            },
        ];
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-05-15',
                tom: '2026-05-20',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const result = prosesserPerioderForVisning(perioderSøker, perioderAnnenPart);

        expect(result).toEqual([
            {
                fom: '2026-05-01',
                tom: '2026-05-14',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                utsettelseÅrsak: 'ARBEID',
            },
            {
                fom: '2026-05-15',
                tom: '2026-05-20',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-05-21',
                tom: '2026-05-31',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                utsettelseÅrsak: 'ARBEID',
            },
        ]);
    });
});
