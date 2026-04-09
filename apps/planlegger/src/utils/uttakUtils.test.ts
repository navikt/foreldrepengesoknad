import { describe, expect, it } from 'vitest';

import { HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';

import { OmBarnet } from '../types/Barnet';
import { HvemPlanlegger } from '../types/HvemPlanlegger';
import { finnUttaksdata } from './uttakUtils';

describe('finnUttaksdata', () => {
    describe('FAR_OG_FAR fødsel', () => {
        // Totalt 261 stønadsdager (52 uker + 1 dag) ved 80%
        const stønadskontoer80: KontoBeregningDto = {
            kontoer: [
                { konto: 'FORELDREPENGER', dager: 166 },
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 95 },
            ],
            minsteretter: { farRundtFødsel: 0, toTette: 0 },
        };

        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
        };

        const barnetFødt: OmBarnet = {
            erFødsel: true,
            erBarnetFødt: true,
            fødselsdato: '2025-07-01',
            antallBarn: '1',
        };

        it('sluttdato skal være 30. juni 2026 ved fødsel 1. juli 2025 og 80% dekning (261 stønadsdager)', () => {
            const resultat = finnUttaksdata('beggeHarRett', hvemPlanlegger, stønadskontoer80, barnetFødt);

            // 261 stønadsdager (95 aktivitetsfri + 166 foreldrepenger = 52 uker + 1 dag)
            // Startdato = fødselsdato = dag 1, siste dag = dag 261 = 1. juli + 260 stønadsdager = 30. juni 2026
            expect(resultat.sluttdatoPeriode2).toBe('2026-06-30');
        });

        it('startdato for periode 1 skal være 6 uker etter fødsel', () => {
            const resultat = finnUttaksdata('beggeHarRett', hvemPlanlegger, stønadskontoer80, barnetFødt);

            // Søker 1 (far 2) kan starte 6 uker etter fødsel: 1. juli + 6 uker = 12. august 2025
            expect(resultat.startdatoPeriode1).toBe('2025-08-12');
        });
    });
});
