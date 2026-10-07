import { describe, expect, it } from 'vitest';

import { getLegendLabelFromPeriode } from './uttaksplanLegendUtils';

describe('getLegendLabelFromPeriode', () => {
    it('skal gi FERIE for annen part sin ferie', () => {
        const label = getLegendLabelFromPeriode(
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
            true,
        );

        expect(label).toBe('FERIE');
    });

    it('skal gi UTSETTELSE for annen part sin utsettelse som ikkje er ferie', () => {
        const label = getLegendLabelFromPeriode(
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                annenPart: { forelder: 'MOR', utsettelseÅrsak: 'ARBEID', flerbarnsdager: false },
            },
            true,
        );

        expect(label).toBe('UTSETTELSE');
    });
});
