import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { filtrerForelagteFrilansoppdrag } from './frilansoppdragUtils';

const lagOppdrag = (arbeidsgiverNavn: string, tom?: string) =>
    ({
        arbeidsgiverId: '12345678910',
        arbeidsgiverIdType: 'fnr',
        arbeidsgiverNavn,
        fom: '2023-01-01',
        stillingsprosent: 0,
        tom,
    }) satisfies EksternArbeidsforholdDto_fpoversikt;

const navnene = (oppdrag: EksternArbeidsforholdDto_fpoversikt[]) => oppdrag.map((o) => o.arbeidsgiverNavn);

describe('filtrerForelagteFrilansoppdrag', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('skal returnere tom liste når ingen oppdrag er sendt inn', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12));

        expect(filtrerForelagteFrilansoppdrag([])).toEqual([]);
    });

    it('skal beholde pågående oppdrag uten tom-dato', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12));

        const pågående = lagOppdrag('Pågående oppdrag', undefined);

        expect(filtrerForelagteFrilansoppdrag([pågående])).toEqual([pågående]);
    });

    it('skal beholde oppdrag som ble avsluttet nøyaktig tre måneder siden (inklusiv grense)', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12));

        const påGrensen = lagOppdrag('På grensen', '2024-03-15');

        expect(filtrerForelagteFrilansoppdrag([påGrensen])).toEqual([påGrensen]);
    });

    it('skal filtrere bort oppdrag som ble avsluttet dagen før grensen', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12));

        const dagenFørGrensen = lagOppdrag('Dagen før grensen', '2024-03-14');

        expect(filtrerForelagteFrilansoppdrag([dagenFørGrensen])).toEqual([]);
    });

    it('skal beholde oppdrag som ble avsluttet i går', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12));

        const iGår = lagOppdrag('Avsluttet i går', '2024-06-14');

        expect(filtrerForelagteFrilansoppdrag([iGår])).toEqual([iGår]);
    });

    it('skal sammenligne på dagnivå, uavhengig av klokkeslett', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 23, 59, 59));

        const påGrensen = lagOppdrag('På grensen', '2024-03-15');

        expect(filtrerForelagteFrilansoppdrag([påGrensen])).toEqual([påGrensen]);
    });

    it('skal klampe grensen til siste dag i måneden når måneden har færre dager (31. mai minus tre måneder blir 29. februar)', () => {
        vi.setSystemTime(new Date(2024, 4, 31, 12));

        const oppdrag = [
            lagOppdrag('Første mars', '2024-03-01'),
            lagOppdrag('På grensen 29. februar', '2024-02-29'),
            lagOppdrag('Før grensen 28. februar', '2024-02-28'),
        ];

        expect(navnene(filtrerForelagteFrilansoppdrag(oppdrag))).toEqual(['Første mars', 'På grensen 29. februar']);
    });

    it('skal klampe grensen til 28. februar i år som ikke er skuddår', () => {
        vi.setSystemTime(new Date(2023, 4, 31, 12));

        const oppdrag = [
            lagOppdrag('På grensen 28. februar', '2023-02-28'),
            lagOppdrag('Før grensen 27. februar', '2023-02-27'),
        ];

        expect(navnene(filtrerForelagteFrilansoppdrag(oppdrag))).toEqual(['På grensen 28. februar']);
    });

    it('skal beholde alle relevante oppdrag og filtrere bort de gamle i én operasjon', () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12));

        const oppdrag = [
            lagOppdrag('Pågående', undefined),
            lagOppdrag('Gammelt', '2023-12-31'),
            lagOppdrag('Nylig avsluttet', '2024-06-01'),
        ];

        expect(navnene(filtrerForelagteFrilansoppdrag(oppdrag))).toEqual(['Pågående', 'Nylig avsluttet']);
    });
});
