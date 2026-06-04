import { describe, expect, it } from 'vitest';

import { KontoBeregningDto, KontoDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';
import { deltUttak } from '@navikt/fp-uttaksplan';

import { HvemPlanlegger, HvemPlanleggerType } from '../types/HvemPlanlegger';
import { finnUttaksdata } from './uttakUtils';

const lagStønadskvote = (kontoer: KontoDto[]): KontoBeregningDto => ({
    kontoer,
    minsteretter: { farRundtFødsel: 0, toTette: 0 },
});

const KONTOER: KontoDto[] = [
    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
    { konto: 'MØDREKVOTE', dager: 75 },
    { konto: 'FELLESPERIODE', dager: 80 },
    { konto: 'FEDREKVOTE', dager: 75 },
];

const morOgFar: HvemPlanlegger = {
    type: HvemPlanleggerType.MOR_OG_FAR,
    navnPåMor: 'Klara',
    navnPåFar: 'Espen',
};

const FELLESPERIODE_DAGER_MOR = 40;

describe('finnUttaksdata - delt uttak, fødsel', () => {
    it('skal gi samme datoer i fordelingssliderens visning som i uttaksplanen (deltUttak) når barnet er født før termin', () => {
        const fødselsdato = '2026-04-01';
        const barnet = {
            erFødsel: true,
            erBarnetFødt: true,
            antallBarn: '1',
            fødselsdato,
            termindato: '2026-04-23',
        };

        const uttaksdata = finnUttaksdata(
            'beggeHarRett',
            morOgFar,
            lagStønadskvote(KONTOER),
            barnet,
            FELLESPERIODE_DAGER_MOR,
        );

        const uttaksplan = deltUttak({
            famDato: fødselsdato,
            tilgjengeligeStønadskvoter: KONTOER,
            fellesperiodeDagerMor: FELLESPERIODE_DAGER_MOR,
        });

        const morsPerioder = uttaksplan.filter((p) => p.forelder === 'MOR');
        const farsPerioder = uttaksplan.filter((p) => p.forelder === 'FAR_MEDMOR');

        const morFørstePeriode = morsPerioder[0]!;
        const morSistePeriode = morsPerioder[morsPerioder.length - 1]!;
        const farFørstePeriode = farsPerioder[0]!;
        const farSistePeriode = farsPerioder[farsPerioder.length - 1]!;

        expect(uttaksdata.startdatoPeriode1).toEqual(morFørstePeriode.fom);
        expect(uttaksdata.sluttdatoPeriode1).toEqual(morSistePeriode.tom);
        expect(uttaksdata.startdatoPeriode2).toEqual(farFørstePeriode.fom);
        expect(uttaksdata.sluttdatoPeriode2).toEqual(farSistePeriode.tom);
    });

    it('skal legge foreldrepenger før fødsel 3 uker før fødsel selv om barnet er født mer enn 3 uker før termin', () => {
        const fødselsdato = '2026-04-01';
        const barnet = {
            erFødsel: true,
            erBarnetFødt: true,
            antallBarn: '1',
            fødselsdato,
            termindato: '2026-04-23',
        };

        const uttaksdata = finnUttaksdata(
            'beggeHarRett',
            morOgFar,
            lagStønadskvote(KONTOER),
            barnet,
            FELLESPERIODE_DAGER_MOR,
        );

        const forventetStart = Uttaksdagen.denne(fødselsdato).getDatoAntallUttaksdagerTidligere(15);
        expect(uttaksdata.startdatoPeriode1).toEqual(forventetStart);
    });

    it('skal gi samme datoer som uttaksplanen når fødsel og termin er samme dato', () => {
        const fødselsdato = '2026-04-23';
        const barnet = {
            erFødsel: true,
            erBarnetFødt: true,
            antallBarn: '1',
            fødselsdato,
            termindato: '2026-04-23',
        };

        const uttaksdata = finnUttaksdata(
            'beggeHarRett',
            morOgFar,
            lagStønadskvote(KONTOER),
            barnet,
            FELLESPERIODE_DAGER_MOR,
        );

        const uttaksplan = deltUttak({
            famDato: fødselsdato,
            tilgjengeligeStønadskvoter: KONTOER,
            fellesperiodeDagerMor: FELLESPERIODE_DAGER_MOR,
        });

        const morsPerioder = uttaksplan.filter((p) => p.forelder === 'MOR');
        const farsPerioder = uttaksplan.filter((p) => p.forelder === 'FAR_MEDMOR');

        expect(uttaksdata.startdatoPeriode1).toEqual(morsPerioder[0]!.fom);
        expect(uttaksdata.sluttdatoPeriode1).toEqual(morsPerioder[morsPerioder.length - 1]!.tom);
        expect(uttaksdata.startdatoPeriode2).toEqual(farsPerioder[0]!.fom);
        expect(uttaksdata.sluttdatoPeriode2).toEqual(farsPerioder[farsPerioder.length - 1]!.tom);
    });
});
