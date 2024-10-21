import MockDate from 'mockdate';

import { StønadskontoType } from '@navikt/fp-constants';
import { Stønadskonto } from '@navikt/fp-types';

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
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-08',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: '2022-12-27',
            farSinFørsteUttaksdag: '2022-08-08',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: '2022-08-08',
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].fom).toEqual('2022-08-08');
        expect(perioder[0].tom).toEqual('2022-08-19');
    });

    // Ikke relevant så lenge startdato er statisk
    it.skip('skal legge til 1 uke etter fødsel hvis WLB gjelder, situasjon er fødsel og far velger 5. uken etter fødsel som start', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-08',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: '2022-12-27',
            farSinFørsteUttaksdag: '2022-09-12',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: '2022-08-08',
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].fom).toEqual('2022-09-12');
        expect(perioder[0].tom).toEqual('2022-09-16');
    });

    // Ikke relevant så lenge startdato er statisk
    it.skip('skal legge til to perioder: en som slutter rett før fødsel og en som starter på fødselsdato hvis far velger å starte uken før fødsel', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-01',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: undefined,
            farSinFørsteUttaksdag: '2022-08-01',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: undefined,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(2);
        expect(perioder[0].fom).toEqual('2022-08-01');
        expect(perioder[0].tom).toEqual('2022-08-05');
        expect(perioder[1].fom).toEqual('2022-08-08');
        expect(perioder[1].tom).toEqual('2022-08-12');
    });
    it('skal legge til fars 5 uker etter fødsel hvis WLB gjelder, situasjon er fødsel og far velger startdato etter 6 uken etter fødsel', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-08',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: '2022-12-27',
            farSinFørsteUttaksdag: '2022-09-19',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: '2022-08-08',
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].fom).toEqual('2022-09-19');
        expect(perioder[0].tom).toEqual('2022-10-21');
    });
    it('skal legge til 5 uker for far hvis WLB gjelder og situasjon er adopsjon.', () => {
        const perioder = deltUttak({
            situasjon: 'adopsjon',
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-08',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: '2022-12-27',
            farSinFørsteUttaksdag: '2022-08-08',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: undefined,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].fom).toEqual('2022-08-08');
        expect(perioder[0].tom).toEqual('2022-09-09');
    });
});

describe('deltUttakFødselFarMedmor - når WLB ikke gjelder', () => {
    beforeAll(() => {
        MockDate.set('2022-08-01');
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fedrekvote = { konto: StønadskontoType.Fedrekvote, dager: 25 };
    it('skal ikke legge til noen perioder hvis far velger dato før mor er ferdig med uttaket', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-08',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: '2022-12-27',
            farSinFørsteUttaksdag: '2022-08-08',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: '2022-08-08',
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(0);
    });
    it('skal legge til 5 uker til far (hans fulle kvote) hvis far velger dato etter at mor er ferdig med uttaket', () => {
        const perioder = deltUttak({
            situasjon: 'fødsel',
            famDato: '2022-08-08',
            erFarEllerMedmor: true,
            tilgjengeligeStønadskontoer: [fedrekvote] as Stønadskonto[],
            startdatoPermisjon: '2022-08-08',
            fellesperiodeDagerMor: undefined,
            harAnnenForelderSøktFP: true,
            antallUkerFellesperiodeFarMedmor: undefined,
            morSinSisteUttaksdag: '2022-12-27',
            farSinFørsteUttaksdag: '2022-12-28',
            annenForelderHarRettPåForeldrepengerIEØS: undefined,
            termindato: '2022-08-08',
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(perioder.length).toEqual(1);
        expect(perioder[0].fom).toEqual('2022-12-28');
        expect(perioder[0].tom).toEqual('2023-01-31');
    });
});
