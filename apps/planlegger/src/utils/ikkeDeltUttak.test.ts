import MockDate from 'mockdate';

import { StønadskontoType } from '@navikt/fp-constants';
import { Stønadskonto } from '@navikt/fp-types';

import { ikkeDeltUttak } from './ikkeDeltUttak';

describe('ikkeDeltUttak - Fødsel - Far/Medmor - WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fødselsdato = '2022-08-08';
    const foreldrepenger = {
        konto: StønadskontoType.Foreldrepenger,
        dager: 75,
    };
    const aktivitetsfriKonto = { konto: StønadskontoType.AktivitetsfriKvote, dager: 40 };
    const stønadskontoer = [foreldrepenger, aktivitetsfriKonto] as Stønadskonto[];
    const morErUfør = true;
    const bareFarMedmorHarRett = true;
    const termindato = undefined;
    const erFarEllerMedmor = true;
    const startdatoPermisjon = fødselsdato;
    it('skal legge til 8 uker etter fødsel hvis WLB gjelder og situasjon er fødsel', () => {
        const perioder = ikkeDeltUttak(
            'fødsel',
            fødselsdato,
            erFarEllerMedmor,
            stønadskontoer,
            startdatoPermisjon,
            morErUfør,
            bareFarMedmorHarRett,
            termindato,
        );
        expect(perioder.length).toEqual(2);
        expect(perioder[0].fom).toEqual(fødselsdato);
        expect(perioder[0].tom).toEqual('2022-09-30');
        expect(perioder[0].kontoType).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].fom).toEqual('2022-10-03');
        expect(perioder[1].tom).toEqual('2023-01-13');
        expect(perioder[1].kontoType).toEqual(StønadskontoType.Foreldrepenger);
    });

    // Ikke relevant så lenge startdato er statisk
    it.skip('skal legge til en periode på 1 uke før fødsel og en periode på 7 uker etter fødsel hvis WLB gjelder og situasjon er fødsel', () => {
        const startDato1UkeFørFødsel = '2022-08-01';
        const perioder = ikkeDeltUttak(
            'fødsel',
            fødselsdato,
            erFarEllerMedmor,
            stønadskontoer,
            startDato1UkeFørFødsel,
            morErUfør,
            bareFarMedmorHarRett,
            termindato,
        );
        expect(perioder.length).toEqual(3);
        expect(perioder[0].fom).toEqual(startDato1UkeFørFødsel);
        expect(perioder[0].tom).toEqual('2022-08-05');
        expect(perioder[0].kontoType).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].fom).toEqual(fødselsdato);
        expect(perioder[1].tom).toEqual('2022-09-23');
        expect(perioder[1].kontoType).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[2].fom).toEqual('2022-09-26');
        expect(perioder[2].tom).toEqual('2023-01-06');
        expect(perioder[2].kontoType).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal legge til en periode på 8 uker etter fødsel hvis WLB gjelder og situasjon er fødsel og startdato blir satt til lørdag rett før fødsel', () => {
        const startDato1DagFørFødsel = '2022-08-07';
        const perioder = ikkeDeltUttak(
            'fødsel',
            fødselsdato,
            erFarEllerMedmor,
            stønadskontoer,
            startDato1DagFørFødsel,
            morErUfør,
            bareFarMedmorHarRett,
            termindato,
        );
        expect(perioder.length).toEqual(2);
        expect(perioder[0].fom).toEqual(fødselsdato);
        expect(perioder[0].tom).toEqual('2022-09-30');
        expect(perioder[0].kontoType).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].fom).toEqual('2022-10-03');
        expect(perioder[1].tom).toEqual('2023-01-13');
        expect(perioder[1].kontoType).toEqual(StønadskontoType.Foreldrepenger);
    });

    // Ikke relevant så lenge startdato er statisk
    it.skip(
        'skal legge til en periode på 1 dag før fødsel og en periode på 7 uker 4 dager etter fødsel hvis WLB gjelder' +
            ' og situasjon er fødsel og startdato er uttaksdagen før fødsel',
        () => {
            const startDato1DagFørFødsel = '2022-08-05';
            const perioder = ikkeDeltUttak(
                'fødsel',
                fødselsdato,
                erFarEllerMedmor,
                stønadskontoer,
                startDato1DagFørFødsel,
                morErUfør,
                bareFarMedmorHarRett,
                termindato,
            );
            expect(perioder.length).toEqual(3);
            expect(perioder[0].fom).toEqual(startDato1DagFørFødsel);
            expect(perioder[0].tom).toEqual(startDato1DagFørFødsel);
            expect(perioder[0].kontoType).toEqual(StønadskontoType.AktivitetsfriKvote);
            expect(perioder[1].fom).toEqual(fødselsdato);
            expect(perioder[1].tom).toEqual('2022-09-29');
            expect(perioder[1].kontoType).toEqual(StønadskontoType.AktivitetsfriKvote);
            expect(perioder[2].fom).toEqual('2022-09-30');
            expect(perioder[2].tom).toEqual('2023-01-12');
            expect(perioder[2].kontoType).toEqual(StønadskontoType.Foreldrepenger);
        },
    );
});
