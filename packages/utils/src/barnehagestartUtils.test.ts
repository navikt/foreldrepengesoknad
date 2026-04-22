import { BarnType } from '@navikt/fp-constants';
import { Barn } from '@navikt/fp-types';
import { describe, expect, it } from 'vitest';

import { barnehagestartDato, beregnBarnehagestartDato } from './barnehagestartUtils';

describe('beregnBarnehagestartDato', () => {
    it('skal returnere undefined når dato er undefined', () => {
        expect(beregnBarnehagestartDato(undefined)).toBeUndefined();
    });

    it('skal returnere slutt av august neste år for januar-dato (månad < 8)', () => {
        // Aug 31, 2025 er søndag → justert til fredag Aug 29, 2025
        expect(beregnBarnehagestartDato('2024-01-15')).toBe('2025-08-29');
    });

    it('skal returnere slutt av august neste år for august-dato (månad = 7)', () => {
        // Aug 31, 2025 er søndag → justert til fredag Aug 29, 2025
        expect(beregnBarnehagestartDato('2024-08-01')).toBe('2025-08-29');
    });

    it('skal returnere slutt av september neste år for september-dato (månad = 8)', () => {
        // Sep 30, 2025 er tysdag → ingen justering
        expect(beregnBarnehagestartDato('2024-09-15')).toBe('2025-09-30');
    });

    it('skal returnere slutt av oktober neste år for oktober-dato (månad = 9)', () => {
        // Oct 31, 2025 er fredag → ingen justering
        expect(beregnBarnehagestartDato('2024-10-15')).toBe('2025-10-31');
    });

    it('skal returnere slutt av november neste år for november-dato (månad = 10)', () => {
        // Nov 30, 2025 er søndag → justert til fredag Nov 28, 2025
        expect(beregnBarnehagestartDato('2024-11-15')).toBe('2025-11-28');
    });

    it('skal returnere slutt av august to år etter for desember-dato (månad = 11)', () => {
        // Aug 31, 2026 er måndag → ingen justering
        expect(beregnBarnehagestartDato('2024-12-15')).toBe('2026-08-31');
    });
});

describe('barnehagestartDato', () => {
    it('skal returnere undefined for adoptert barn', () => {
        const barn = {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            adopsjonsdato: '2024-06-01',
            fødselsdatoer: ['2022-01-15'],
        } as Barn;

        expect(barnehagestartDato(barn)).toBeUndefined();
    });

    it('skal returnere undefined for barn med ikkje-utfylt type', () => {
        const barn = {
            type: BarnType.IKKE_UTFYLT,
            antallBarn: 0,
            fødselsdatoer: [],
        } as Barn;

        expect(barnehagestartDato(barn)).toBeUndefined();
    });

    it('skal bruke fødselsdatoer[0] for fødd barn', () => {
        const barn = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-15'],
        } as Barn;

        expect(barnehagestartDato(barn)).toBe('2025-08-29');
    });

    it('skal bruke termindato for ufødd barn', () => {
        const barn = {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-11-15',
        } as Barn;

        expect(barnehagestartDato(barn)).toBe('2025-11-28');
    });
});
