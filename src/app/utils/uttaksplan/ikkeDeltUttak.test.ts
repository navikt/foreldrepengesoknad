import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import MockDate from 'mockdate';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { Uttaksperiode } from 'uttaksplan/types/Periode';

describe('ikkeDeltUttak - Fødsel - Far/Medmor - WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fødselsdato = new Date('2022-08-08T00:00:00.000Z');
    const foreldrepenger = {
        konto: StønadskontoType.Foreldrepenger,
        dager: 75,
    };
    const aktivitetsfriKonto = { konto: StønadskontoType.AktivitetsfriKvote, dager: 40 };
    const stønadskontoer = [foreldrepenger, aktivitetsfriKonto] as TilgjengeligStønadskonto[];
    const morErUfør = true;
    const bareFarMedmorHarRett = true;
    const terminato = undefined;
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
            terminato
        ) as Uttaksperiode[];
        expect(perioder.length).toEqual(2);
        expect(perioder[0].tidsperiode.fom).toEqual(fødselsdato);
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-09-30T00:00:00.000Z'));
        expect(perioder[0].konto).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].tidsperiode.fom).toEqual(new Date('2022-10-03T00:00:00.000Z'));
        expect(perioder[1].tidsperiode.tom).toEqual(new Date('2023-01-13T00:00:00.000Z'));
        expect(perioder[1].konto).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal legge til en periode på 1 uke før fødsel og en periode på 7 uker etter fødsel hvis WLB gjelder og situasjon er fødsel', () => {
        const startDato1UkeFørFødsel = new Date('2022-08-01T00:00:00.000Z');
        const perioder = ikkeDeltUttak(
            'fødsel',
            fødselsdato,
            erFarEllerMedmor,
            stønadskontoer,
            startDato1UkeFørFødsel,
            morErUfør,
            bareFarMedmorHarRett,
            terminato
        ) as Uttaksperiode[];
        expect(perioder.length).toEqual(3);
        expect(perioder[0].tidsperiode.fom).toEqual(startDato1UkeFørFødsel);
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-08-05T00:00:00.000Z'));
        expect(perioder[0].konto).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].tidsperiode.fom).toEqual(fødselsdato);
        expect(perioder[1].tidsperiode.tom).toEqual(new Date('2022-09-23T00:00:00.000Z'));
        expect(perioder[1].konto).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[2].tidsperiode.fom).toEqual(new Date('2022-09-26T00:00:00.000Z'));
        expect(perioder[2].tidsperiode.tom).toEqual(new Date('2023-01-06T00:00:00.000Z'));
        expect(perioder[2].konto).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal legge til en periode på 8 uker etter fødsel hvis WLB gjelder og situasjon er fødsel og startdato blir satt til lørdag rett før fødsel', () => {
        const startDato1DagFørFødsel = new Date('2022-08-07T00:00:00.000Z');
        const perioder = ikkeDeltUttak(
            'fødsel',
            fødselsdato,
            erFarEllerMedmor,
            stønadskontoer,
            startDato1DagFørFødsel,
            morErUfør,
            bareFarMedmorHarRett,
            terminato
        ) as Uttaksperiode[];
        expect(perioder.length).toEqual(2);
        expect(perioder[0].tidsperiode.fom).toEqual(fødselsdato);
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-09-30T00:00:00.000Z'));
        expect(perioder[0].konto).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].tidsperiode.fom).toEqual(new Date('2022-10-03T00:00:00.000Z'));
        expect(perioder[1].tidsperiode.tom).toEqual(new Date('2023-01-13T00:00:00.000Z'));
        expect(perioder[1].konto).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal legge til en periode på 1 dag før fødsel og en periode på 7 uker 4 dager etter fødsel hvis WLB gjelder og situasjon er fødsel og startdato er uttaksdagen før fødsel', () => {
        const startDato1DagFørFødsel = new Date('2022-08-05T00:00:00.000Z');
        const perioder = ikkeDeltUttak(
            'fødsel',
            fødselsdato,
            erFarEllerMedmor,
            stønadskontoer,
            startDato1DagFørFødsel,
            morErUfør,
            bareFarMedmorHarRett,
            terminato
        ) as Uttaksperiode[];
        expect(perioder.length).toEqual(3);
        expect(perioder[0].tidsperiode.fom).toEqual(startDato1DagFørFødsel);
        expect(perioder[0].tidsperiode.tom).toEqual(startDato1DagFørFødsel);
        expect(perioder[0].konto).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[1].tidsperiode.fom).toEqual(fødselsdato);
        expect(perioder[1].tidsperiode.tom).toEqual(new Date('2022-09-29T00:00:00.000Z'));
        expect(perioder[1].konto).toEqual(StønadskontoType.AktivitetsfriKvote);
        expect(perioder[2].tidsperiode.fom).toEqual(new Date('2022-09-30T00:00:00.000Z'));
        expect(perioder[2].tidsperiode.tom).toEqual(new Date('2023-01-12T00:00:00.000Z'));
        expect(perioder[2].konto).toEqual(StønadskontoType.Foreldrepenger);
    });
});
