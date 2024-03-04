import MockDate from 'mockdate';

import { StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';

import { deltUttak } from './deltUttak';

describe('deltUttakFødselFarMedmor - når WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fedrekvote = { konto: StønadskontoType.Fedrekvote, dager: 25 };
    it('skal legge til 2 uker etter fødsel hvis WLB gjelder og situasjon er fødsel', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-08T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: new Date('2022-12-27T00:00:00.000Z'),
            farSinFørsteUttaksdag: new Date('2022-08-08T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: new Date('2022-08-08T00:00:00.000Z'),
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].tidsperiode.fom).toEqual(new Date('2022-08-08T00:00:00.000Z'));
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-08-19T00:00:00.000Z'));
    });
    it('skal legge til 1 uke etter fødsel hvis WLB gjelder, situasjon er fødsel og far velger 5. uken etter fødsel som start', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-08T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: new Date('2022-12-27T00:00:00.000Z'),
            farSinFørsteUttaksdag: new Date('2022-09-12T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: new Date('2022-08-08T00:00:00.000Z'),
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].tidsperiode.fom).toEqual(new Date('2022-09-12T00:00:00.000Z'));
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-09-16T00:00:00.000Z'));
    });
    it('skal legge til to perioder: en som slutter rett før fødsel og en som starter på fødselsdato hvis far velger å starte uken før fødsel', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-01T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: undefined,
            farSinFørsteUttaksdag: new Date('2022-08-01T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: undefined,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(2);
        expect(perioder[0].tidsperiode.fom).toEqual(new Date('2022-08-01T00:00:00.000Z'));
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-08-05T00:00:00.000Z'));
        expect(perioder[1].tidsperiode.fom).toEqual(new Date('2022-08-08T00:00:00.000Z'));
        expect(perioder[1].tidsperiode.tom).toEqual(new Date('2022-08-12T00:00:00.000Z'));
    });
    it('skal legge til fars 5 uker etter fødsel hvis WLB gjelder, situasjon er fødsel og far velger startdato etter 6 uken etter fødsel', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-08T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: new Date('2022-12-27T00:00:00.000Z'),
            farSinFørsteUttaksdag: new Date('2022-09-19T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: new Date('2022-08-08T00:00:00.000Z'),
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].tidsperiode.fom).toEqual(new Date('2022-09-19T00:00:00.000Z'));
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-10-21T00:00:00.000Z'));
    });
    it('skal legge til 5 uker for far hvis WLB gjelder og situasjon er adopsjon.', () => {
        const perioder = deltUttak({
            situasjon: 'adopsjon',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-08T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: new Date('2022-12-27T00:00:00.000Z'),
            farSinFørsteUttaksdag: new Date('2022-08-08T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: undefined,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].tidsperiode.fom).toEqual(new Date('2022-08-08T00:00:00.000Z'));
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-09-09T00:00:00.000Z'));
    });
});

describe('deltUttakFødselFarMedmor - når WLB ikke gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-01T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fedrekvote = { konto: StønadskontoType.Fedrekvote, dager: 25 };
    it('skal ikke legge til noen perioder hvis far velger dato før mor er ferdig med uttaket', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-08T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: new Date('2022-12-27T00:00:00.000Z'),
            farSinFørsteUttaksdag: new Date('2022-08-08T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: new Date('2022-08-08T00:00:00.000Z'),
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(0);
    });
    it('skal legge til 5 uker til far (hans fulle kvote) hvis far velger dato etter at mor er ferdig med uttaket', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: new Date('2022-08-08T00:00:00.000Z'),
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as TilgjengeligStønadskonto[],
            startdatoPermisjon: new Date('2022-08-08T00:00:00.000Z'),
            fellesperiodeUkerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: new Date('2022-12-27T00:00:00.000Z'),
            farSinFørsteUttaksdag: new Date('2022-12-28T00:00:00.000Z'),
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: new Date('2022-08-08T00:00:00.000Z'),
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].tidsperiode.fom).toEqual(new Date('2022-12-28T00:00:00.000Z'));
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2023-01-31T00:00:00.000Z'));
    });
});
