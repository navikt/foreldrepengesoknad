import MockDate from 'mockdate';

import { KontoDto_fpoversikt } from '@navikt/fp-types';

import { ikkeDeltUttak } from './ikkeDeltUttak';

describe('ikkeDeltUttak - Fødsel - Far/Medmor - WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });
    const famDato = '2022-08-08';
    const foreldrepenger = {
        konto: 'FORELDREPENGER',
        dager: 75,
    } satisfies KontoDto_fpoversikt;
    const aktivitetsfriKonto = { konto: 'AKTIVITETSFRI_KVOTE', dager: 40 } satisfies KontoDto_fpoversikt;
    const tilgjengeligeStønadskontoer = [foreldrepenger, aktivitetsfriKonto] satisfies KontoDto_fpoversikt[];
    const erMorUfør = true;
    const bareFarMedmorHarRett = true;
    const erFarEllerMedmor = true;
    const startdato = famDato;
    it('skal legge til 8 uker etter fødsel hvis WLB gjelder og situasjon er fødsel', () => {
        const forslag = ikkeDeltUttak({
            situasjon: 'fødsel',
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdato,
            erMorUfør,
            bareFarMedmorHarRett,
            erAleneOmOmsorg: false,
            farOgFar: false,
        });

        expect(forslag.søker1.length).toEqual(2);
        expect(forslag.søker1[0].fom).toEqual(startdato);
        expect(forslag.søker1[0].tom).toEqual('2022-09-30');
        expect(forslag.søker1[0].kontoType).toEqual('AKTIVITETSFRI_KVOTE');
        expect(forslag.søker1[1].fom).toEqual('2022-10-03');
        expect(forslag.søker1[1].tom).toEqual('2023-01-13');
        expect(forslag.søker1[1].kontoType).toEqual('FORELDREPENGER');
    });

    it('skal legge til en periode på 8 uker etter fødsel hvis WLB gjelder og situasjon er fødsel og startdato blir satt til lørdag rett før fødsel', () => {
        const startDato1DagFørFødsel = '2022-08-07';
        const forslag = ikkeDeltUttak({
            situasjon: 'fødsel',
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdato: startDato1DagFørFødsel,
            erMorUfør,
            bareFarMedmorHarRett,
            erAleneOmOmsorg: false,
            farOgFar: false,
        });
        expect(forslag.søker1.length).toEqual(2);
        expect(forslag.søker1[0].fom).toEqual(famDato);
        expect(forslag.søker1[0].tom).toEqual('2022-09-30');
        expect(forslag.søker1[0].kontoType).toEqual('AKTIVITETSFRI_KVOTE');
        expect(forslag.søker1[1].fom).toEqual('2022-10-03');
        expect(forslag.søker1[1].tom).toEqual('2023-01-13');
        expect(forslag.søker1[1].kontoType).toEqual('FORELDREPENGER');
    });
});
