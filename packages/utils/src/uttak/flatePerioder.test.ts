import { UttakPeriodeDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { konverterFlatePerioderTilIntervall } from './flatePerioder';

describe('konverterFlatePerioderTilIntervall', () => {
    it('lèt periodar i intervallmodellen vere uendra', () => {
        const perioder: UttakPeriodeDto_fpoversikt[] = [
            {
                fom: '2026-08-03',
                tom: '2026-08-07',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ];

        expect(konverterFlatePerioderTilIntervall(perioder)).toBe(perioder);
    });

    it('gjer om flate periodar til intervall og ferie til ny utsettelsesårsak', () => {
        const perioder: UttakPeriode_fpoversikt[] = [
            { fom: '2026-08-03', tom: '2026-08-07', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2026-08-10',
                tom: '2026-08-14',
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
        ];

        expect(konverterFlatePerioderTilIntervall(perioder)).toEqual([
            {
                fom: '2026-08-03',
                tom: '2026-08-07',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2026-08-10',
                tom: '2026-08-14',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
        ]);
    });

    it('deler overlappande samtidig uttak opp i intervall utan overlapp', () => {
        const perioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-08-03',
                tom: '2026-08-21',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
            {
                fom: '2026-08-10',
                tom: '2026-08-14',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
        ];

        const mor = { forelder: 'MOR', kontoType: 'FELLESPERIODE', samtidigUttak: 50, flerbarnsdager: false };

        expect(konverterFlatePerioderTilIntervall(perioder)).toEqual([
            { fom: '2026-08-03', tom: '2026-08-07', søker: mor },
            {
                fom: '2026-08-10',
                tom: '2026-08-14',
                søker: mor,
                annenPart: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                },
            },
            { fom: '2026-08-17', tom: '2026-08-21', søker: mor },
        ]);
    });

    it('gjer om opphald til uttak for den andre forelderen', () => {
        const perioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-08-03',
                tom: '2026-08-07',
                forelder: 'MOR',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
            },
        ];

        expect(konverterFlatePerioderTilIntervall(perioder)).toEqual([
            {
                fom: '2026-08-03',
                tom: '2026-08-07',
                søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ]);
    });
});
