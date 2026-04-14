import MockDate from 'mockdate';

import { KontoDto } from '@navikt/fp-types';
import { ikkeDeltUttak } from '@navikt/fp-uttaksplan';

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
    } satisfies KontoDto;
    const aktivitetsfriKonto = { konto: 'AKTIVITETSFRI_KVOTE', dager: 40 } satisfies KontoDto;
    const tilgjengeligeStønadskontoer = [foreldrepenger, aktivitetsfriKonto] satisfies KontoDto[];
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

        expect(forslag.length).toEqual(2);
        expect(forslag[0]!.fom).toEqual(startdato);
        expect(forslag[0]!.tom).toEqual('2022-09-30');
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[0]!.morsAktivitet).toEqual('IKKE_OPPGITT');
        expect(forslag[1]!.fom).toEqual('2022-10-03');
        expect(forslag[1]!.tom).toEqual('2023-01-13');
        expect(forslag[1]!.kontoType).toEqual('FORELDREPENGER');
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
        expect(forslag.length).toEqual(2);
        expect(forslag[0]!.fom).toEqual(famDato);
        expect(forslag[0]!.tom).toEqual('2022-09-30');
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[0]!.morsAktivitet).toEqual('IKKE_OPPGITT');
        expect(forslag[1]!.fom).toEqual('2022-10-03');
        expect(forslag[1]!.tom).toEqual('2023-01-13');
        expect(forslag[1]!.kontoType).toEqual('FORELDREPENGER');
    });
});

describe('ikkeDeltUttak - Fødsel - Mor', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });

    const famDato = '2022-08-08';
    const foreldrepenger = { konto: 'FORELDREPENGER', dager: 75 } satisfies KontoDto;
    const foreldrepengerFørFødsel = { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 } satisfies KontoDto;

    it('skal legge til FPFF 3 uker før fødsel og foreldrepenger fra fødsel', () => {
        const forslag = ikkeDeltUttak({
            situasjon: 'fødsel',
            famDato,
            erFarEllerMedmor: false,
            tilgjengeligeStønadskontoer: [foreldrepenger, foreldrepengerFørFødsel],
            erMorUfør: false,
            bareFarMedmorHarRett: false,
            erAleneOmOmsorg: false,
            farOgFar: false,
        });

        expect(forslag.length).toEqual(2);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER_FØR_FØDSEL');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[0]!.fom).toEqual('2022-07-18');
        expect(forslag[0]!.tom).toEqual('2022-08-05');
        expect(forslag[1]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[1]!.forelder).toEqual('MOR');
        expect(forslag[1]!.fom).toEqual('2022-08-08');
        expect(forslag[1]!.tom).toEqual('2022-11-18');
    });

    it('skal starte planen på fødselsdato uten FPFF-periode når FPFF ikke er i stønadskontoene', () => {
        const forslag = ikkeDeltUttak({
            situasjon: 'fødsel',
            famDato,
            erFarEllerMedmor: false,
            tilgjengeligeStønadskontoer: [foreldrepenger],
            erMorUfør: false,
            bareFarMedmorHarRett: false,
            erAleneOmOmsorg: false,
            farOgFar: false,
        });

        expect(forslag.length).toEqual(1);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[0]!.fom).toEqual('2022-08-08');
        expect(forslag[0]!.tom).toEqual('2022-11-18');
    });
});

describe('ikkeDeltUttak - Fødsel - Far aleneOmOmsorg', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });

    const famDato = '2022-08-08';
    const foreldrepenger = { konto: 'FORELDREPENGER', dager: 75 } satisfies KontoDto;

    it('skal gi én sammenhengende periode når far er alene om omsorg', () => {
        const forslag = ikkeDeltUttak({
            situasjon: 'fødsel',
            famDato,
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [foreldrepenger],
            erMorUfør: false,
            bareFarMedmorHarRett: false,
            erAleneOmOmsorg: true,
            farOgFar: false,
        });

        expect(forslag.length).toEqual(1);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[0]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[0]!.fom).toEqual('2022-08-08');
        expect(forslag[0]!.tom).toEqual('2022-11-18');
    });
});

describe('ikkeDeltUttak - Adopsjon', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });

    const famDato = '2022-08-08';
    const foreldrepenger = { konto: 'FORELDREPENGER', dager: 75 } satisfies KontoDto;
    const aktivitetsfriKonto = { konto: 'AKTIVITETSFRI_KVOTE', dager: 40 } satisfies KontoDto;

    it('skal gi mor én periode med foreldrepenger fra omsorgsovertakelsesdato', () => {
        const forslag = ikkeDeltUttak({
            situasjon: 'adopsjon',
            famDato,
            erFarEllerMedmor: false,
            tilgjengeligeStønadskontoer: [foreldrepenger],
            erMorUfør: false,
            bareFarMedmorHarRett: false,
            erAleneOmOmsorg: false,
            farOgFar: false,
        });

        expect(forslag.length).toEqual(1);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[0]!.fom).toEqual('2022-08-08');
        expect(forslag[0]!.tom).toEqual('2022-11-18');
    });

    it('skal gi far aktivitetsfri kvote etterfulgt av foreldrepenger når bare far har rett ved adopsjon', () => {
        const forslag = ikkeDeltUttak({
            situasjon: 'adopsjon',
            famDato,
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [foreldrepenger, aktivitetsfriKonto],
            erMorUfør: false,
            bareFarMedmorHarRett: true,
            erAleneOmOmsorg: false,
            farOgFar: false,
        });

        expect(forslag.length).toEqual(2);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[0]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[0]!.morsAktivitet).toEqual('IKKE_OPPGITT');
        expect(forslag[0]!.fom).toEqual('2022-08-08');
        expect(forslag[0]!.tom).toEqual('2022-09-30');
        expect(forslag[1]!.kontoType).toEqual('FORELDREPENGER');
        expect(forslag[1]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[1]!.fom).toEqual('2022-10-03');
        expect(forslag[1]!.tom).toEqual('2023-01-13');
    });
});
