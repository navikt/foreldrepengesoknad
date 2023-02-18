import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
// import { getKontotypeBareFarHarRett } from './mapSaksperioderTilUttaksperioder';
import mapSaksperioderTilUttaksperioder, { getKontotypeBareFarHarRett } from './mapSaksperioderTilUttaksperioder';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { UtsettelseÅrsakTypeDTO } from 'app/types/UtsettelseÅrsakTypeDTO';
// import { UttakArbeidType } from 'app/types/UttakArbeidType';
// import { ArbeidsgiverInfoType } from 'app/types/ArbeidsgiverInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import {
    Arbeidsform,
    AvslåttPeriode,
    Periodetype,
    Utsettelsesperiode,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { Saksperiode } from 'app/types/Saksperiode';
// import { Forelder } from 'app/types/Forelder';
import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';
import { Saksgrunnlag } from 'app/types/Saksgrunnlag';
import { UttakArbeidType } from 'app/types/UttakArbeidType';
import { ArbeidsgiverInfoType } from 'app/types/ArbeidsgiverInfo';
import { Forelder } from 'app/types/Forelder';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

describe('getKontotypeBareFarHarRett', () => {
    const periodeTrekkerMinsterett = true;
    const periodeTrekkerIkkeMinsterett = false;

    it('skal returnere konto med aktivitetskrav for bare far har rett når perioden er innvilget med årsak 2004', () => {
        const konto = getKontotypeBareFarHarRett(periodeTrekkerIkkeMinsterett);
        expect(konto).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal returnere konto uten aktivitetskrav for bare far har rett når perioden', () => {
        const konto = getKontotypeBareFarHarRett(periodeTrekkerMinsterett);
        expect(konto).toEqual(StønadskontoType.AktivitetsfriKvote);
    });
});

describe('mapSaksperioderTilUttaksperioder', () => {
    const grunnlag = {
        familiehendelseDato: '2022-01-03',
        morHarRett: true,
        farMedmorHarRett: true,
        erDeltUttak: true,
        farMedmorErAleneOmOmsorg: false,
        familiehendelseType: FamiliehendelseType.FØDSEL,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        antallBarn: 1,
        morErAleneOmOmsorg: false,
        morErUfør: false,
        søkerErFarEllerMedmor: true,
        termindato: '2022-01-03',
        fødselsdato: '2022-01-03',
        erBarnetFødt: true,
        ønskerJustertUttakVedFødsel: undefined,
        barn: [],
    } as Saksgrunnlag;
    it('Skal returnere inforperioder om annen parts uttak der det er søkerens førstegangssøknad med kun annen parts uttak', () => {
        const sakMedKunAnnenPartsUttak = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-02-04',
                },
                gjelderAnnenPart: true,
                flerbarnsdager: false,
                oppholdÅrsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
                guid: '0',
                kontoType: StønadskontoType.Mødrekvote,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(sakMedKunAnnenPartsUttak, grunnlag, undefined);
        expect(result.length).toEqual(1);
        const infoperiode = result[0] as UttakAnnenPartInfoPeriode;
        expect(infoperiode.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(infoperiode.tidsperiode.tom).toEqual(new Date('2022-02-04'));
        expect(infoperiode.type).toEqual(Periodetype.Info);
        expect(infoperiode.årsak).toEqual(OppholdÅrsakType.UttakMødrekvoteAnnenForelder);
    });

    it('Skal vise søkerens perioder og infoperioder om annen part der det er søkerens endringssøknad der begge har søkt fra før og perioder ikke overlapper. Skal også vise søkerens uttaksperiode med gradering og arbeidsinformasjon.', () => {
        const perioderBeggeParterSomIkkeOverlapper = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                gjelderAnnenPart: true,
                flerbarnsdager: false,
                oppholdÅrsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
                guid: '0',
                kontoType: StønadskontoType.Mødrekvote,
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-18',
                },
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                gjelderAnnenPart: true,
                flerbarnsdager: false,
                utbetalingsprosent: 100,
                arbeidstidprosent: 100,
                oppholdÅrsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
                guid: '1',
                kontoType: StønadskontoType.Fellesperiode,
            },
            {
                periode: {
                    fom: '2022-01-19',
                    tom: '2022-01-20',
                },
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                gjelderAnnenPart: false,
                samtidigUttak: 50,
                flerbarnsdager: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '2',
                gradering: {
                    arbeidstidprosent: 80,
                    aktivitet: {
                        type: UttakArbeidType.ORDINÆRT_ARBEID,
                        arbeidsgiver: { id: '50089', type: ArbeidsgiverInfoType.ORGANISASJON },
                    },
                },
            },
            {
                periode: {
                    fom: '2022-01-21',
                    tom: '2022-01-22',
                },
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fellesperiode,
                morsAktivitet: MorsAktivitet.Innlagt,
                guid: '3',
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(perioderBeggeParterSomIkkeOverlapper, grunnlag, undefined);
        expect(result.length).toEqual(4);
        const infoperiode1 = result[0] as UttakAnnenPartInfoPeriode;
        expect(infoperiode1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(infoperiode1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(infoperiode1.type).toEqual(Periodetype.Info);
        expect(infoperiode1.årsak).toEqual(OppholdÅrsakType.UttakMødrekvoteAnnenForelder);
        expect(infoperiode1.forelder).toEqual(Forelder.mor);

        const infoperiode2 = result[1] as UttakAnnenPartInfoPeriode;
        expect(infoperiode2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
        expect(infoperiode2.tidsperiode.tom).toEqual(new Date('2022-01-18'));
        expect(infoperiode2.type).toEqual(Periodetype.Info);
        expect(infoperiode2.årsak).toEqual(OppholdÅrsakType.UttakFellesperiodeAnnenForelder);
        expect(infoperiode2.forelder).toEqual(Forelder.mor);

        const uttaksperiode = result[2] as Uttaksperiode;
        expect(uttaksperiode.tidsperiode.fom).toEqual(new Date('2022-01-19'));
        expect(uttaksperiode.tidsperiode.tom).toEqual(new Date('2022-01-20'));
        expect(uttaksperiode.type).toEqual(Periodetype.Uttak);
        expect(uttaksperiode.forelder).toEqual(Forelder.farMedmor);
        expect(uttaksperiode.konto).toEqual(StønadskontoType.Fedrekvote);
        expect(uttaksperiode.gradert).toEqual(true);
        expect(uttaksperiode.ønskerSamtidigUttak).toEqual(true);
        expect(uttaksperiode.samtidigUttakProsent).toEqual('50');
        expect(uttaksperiode.stillingsprosent).toEqual('80');
        expect(uttaksperiode.orgnumre).toEqual(['50089']);
        expect(uttaksperiode.arbeidsformer).toEqual([Arbeidsform.arbeidstaker]);
        expect(uttaksperiode.harIkkeAktivitetskrav).toEqual(undefined);

        const uttakFellesperiode = result[3] as Uttaksperiode;
        expect(uttakFellesperiode.tidsperiode.fom).toEqual(new Date('2022-01-21'));
        expect(uttakFellesperiode.tidsperiode.tom).toEqual(new Date('2022-01-21'));
        expect(uttakFellesperiode.type).toEqual(Periodetype.Uttak);
        expect(uttakFellesperiode.forelder).toEqual(Forelder.farMedmor);
        expect(uttakFellesperiode.konto).toEqual(StønadskontoType.Fellesperiode);
        expect(uttakFellesperiode.gradert).toEqual(false);
        expect(uttakFellesperiode.ønskerSamtidigUttak).toEqual(false);
        expect(uttakFellesperiode.harIkkeAktivitetskrav).toEqual(undefined);
        expect(uttakFellesperiode.morsAktivitetIPerioden).toEqual(MorsAktivitet.Innlagt);
    });
    it('Skal vise søkerens perioder og infoperioder om annen part der søkerens og annen parts perioder overlapper og annen parts periode er lengere enn søkerens', () => {
        const perioderBeggeParterSomOverlapper = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: true,
                samtidigUttak: 100,
                flerbarnsdager: false,
                oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
                guid: '0',
                stønadskontotype: StønadskontoType.Mødrekvote,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
            {
                periode: {
                    fom: '2022-01-05',
                    tom: '2022-01-06',
                },
                gjelderAnnenPart: false,
                samtidigUttak: 100,
                flerbarnsdager: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '0',
                oppholdÅrsak: OppholdÅrsakType.Ingen,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(perioderBeggeParterSomOverlapper, grunnlag, undefined);
        expect(result.length).toEqual(4);
        const uttak1 = result[0] as Uttaksperiode;
        expect(uttak1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(uttak1.tidsperiode.tom).toEqual(new Date('2022-01-04'));
        expect(uttak1.type).toEqual(Periodetype.Info);
        expect(uttak1.forelder).toEqual(Forelder.mor);
        const uttak2 = result[1] as Uttaksperiode;
        expect(uttak2.tidsperiode.fom).toEqual(new Date('2022-01-05'));
        expect(uttak2.tidsperiode.tom).toEqual(new Date('2022-01-06'));
        expect(uttak2.type).toEqual(Periodetype.Info);
        expect(uttak2.forelder).toEqual(Forelder.mor);
        const uttak3 = result[2] as Uttaksperiode;
        expect(uttak3.tidsperiode.fom).toEqual(new Date('2022-01-05'));
        expect(uttak3.tidsperiode.tom).toEqual(new Date('2022-01-06'));
        expect(uttak3.type).toEqual(Periodetype.Uttak);
        expect(uttak3.forelder).toEqual(Forelder.farMedmor);
        const uttak4 = result[3] as Uttaksperiode;
        expect(uttak4.tidsperiode.fom).toEqual(new Date('2022-01-07'));
        expect(uttak4.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(uttak4.type).toEqual(Periodetype.Info);
        expect(uttak4.forelder).toEqual(Forelder.mor);
    });
    it('Skal vise søkerens perioder og infoperioder om annen part der søkerens og annen parts perioder overlapper og søkerens periode er lengere enn annen parts', () => {
        const perioderBeggeParterSomOverlapper = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: false,
                samtidigUttak: true,
                samtidigUttaksprosent: 100,
                flerbarnsdager: false,
                guid: '0',
                kontoType: StønadskontoType.Fedrekvote,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
            {
                periode: {
                    fom: '2022-01-05',
                    tom: '2022-01-06',
                },
                gjelderAnnenPart: true,
                samtidigUttak: 100,
                flerbarnsdager: false,
                kontoType: StønadskontoType.Mødrekvote,
                guid: '1',
                oppholdÅrsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(perioderBeggeParterSomOverlapper, grunnlag, undefined);
        const uttak1 = result[0] as Uttaksperiode;
        expect(uttak1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(uttak1.tidsperiode.tom).toEqual(new Date('2022-01-04'));
        expect(uttak1.type).toEqual(Periodetype.Uttak);
        expect(uttak1.forelder).toEqual(Forelder.farMedmor);
        const uttak2 = result[2] as Uttaksperiode;
        expect(uttak2.tidsperiode.fom).toEqual(new Date('2022-01-05'));
        expect(uttak2.tidsperiode.tom).toEqual(new Date('2022-01-06'));
        expect(uttak2.type).toEqual(Periodetype.Uttak);
        expect(uttak2.forelder).toEqual(Forelder.farMedmor);
        const uttak3 = result[1] as Uttaksperiode;
        expect(uttak3.tidsperiode.fom).toEqual(new Date('2022-01-05'));
        expect(uttak3.tidsperiode.tom).toEqual(new Date('2022-01-06'));
        expect(uttak3.type).toEqual(Periodetype.Info);
        expect(uttak3.forelder).toEqual(Forelder.mor);
        const uttak4 = result[3] as Uttaksperiode;
        expect(uttak4.tidsperiode.fom).toEqual(new Date('2022-01-07'));
        expect(uttak4.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(uttak4.type).toEqual(Periodetype.Uttak);
        expect(uttak4.forelder).toEqual(Forelder.farMedmor);
    });

    it('Skal mappe utsettelser riktig', () => {
        const perioderUtsettelse = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: false,
                utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-12',
                },
                gjelderAnnenPart: false,
                utsettelseÅrsak: UtsettelseÅrsakTypeDTO.Arbeid,
                morsAktivitet: MorsAktivitet.Arbeid,
                guid: '1',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(perioderUtsettelse, grunnlag, undefined);
        expect(result.length).toEqual(2);
        const utsettelse1 = result[0] as Utsettelsesperiode;
        expect(utsettelse1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(utsettelse1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(utsettelse1.type).toEqual(Periodetype.Utsettelse);
        expect(utsettelse1.årsak).toEqual(UtsettelseÅrsakType.Ferie);
        expect(utsettelse1.forelder).toEqual(Forelder.farMedmor);
        expect(utsettelse1.erArbeidstaker).toEqual(false);
        const utsettelse2 = result[1] as Utsettelsesperiode;
        expect(utsettelse2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
        expect(utsettelse2.tidsperiode.tom).toEqual(new Date('2022-01-12'));
        expect(utsettelse2.type).toEqual(Periodetype.Utsettelse);
        expect(utsettelse2.morsAktivitetIPerioden).toEqual(MorsAktivitet.Arbeid);
        expect(utsettelse2.årsak).toEqual(UtsettelseÅrsakType.Arbeid);
        expect(utsettelse2.forelder).toEqual(Forelder.farMedmor);
        expect(utsettelse2.erArbeidstaker).toEqual(false);
    });
    it('Skal mappe avslåtte perioder riktig', () => {
        const avslåttePerioder = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: false,
                utsettelseÅrsak: UtsettelseÅrsakTypeDTO.Ferie,
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-12',
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '1',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioder, grunnlag, undefined);
        expect(result.length).toEqual(2);
        const avslåttPeriode1 = result[0] as AvslåttPeriode;
        expect(avslåttPeriode1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(avslåttPeriode1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(avslåttPeriode1.type).toEqual(Periodetype.Info);
        expect(avslåttPeriode1.avslåttPeriodeType).toEqual(Periodetype.Utsettelse);
        expect(avslåttPeriode1.forelder).toEqual(Forelder.farMedmor);
        expect(avslåttPeriode1.overskrives).toEqual(true);
        expect(avslåttPeriode1.visPeriodeIPlan).toEqual(true);
        const avslåttPeriode2 = result[1] as AvslåttPeriode;
        expect(avslåttPeriode2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
        expect(avslåttPeriode2.tidsperiode.tom).toEqual(new Date('2022-01-12'));
        expect(avslåttPeriode2.type).toEqual(Periodetype.Info);
        expect(avslåttPeriode2.forelder).toEqual(Forelder.farMedmor);
        expect(avslåttPeriode2.avslåttPeriodeType).toEqual(Periodetype.Uttak);
        expect(avslåttPeriode2.forelder).toEqual(Forelder.farMedmor);
        expect(avslåttPeriode2.overskrives).toEqual(true);
        expect(avslåttPeriode2.visPeriodeIPlan).toEqual(true);
    });
    it('Skal filtrere bort avslåtte perioder annen part', () => {
        const avslåttePeriodeAnnenPart = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: true,
                utsettelseÅrsak: UtsettelseÅrsakTypeDTO.Ferie,
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePeriodeAnnenPart, grunnlag, undefined);
        expect(result.length).toEqual(0);
    });
    it('Skal filtrere bort søkerens avslåtte perioder som ikke trekker dager eller har PeriodeResultatÅrsak.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER', () => {
        const avslåttePerioderSøker = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-12',
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '1',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioderSøker, grunnlag, undefined);
        expect(result.length).toEqual(0);
    });
    it('Skal splitte perioder på familiehendelsesdato', () => {
        const avslåttePerioderSøker = [
            {
                periode: {
                    fom: '2021-12-30',
                    tom: '2022-01-05',
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioderSøker, grunnlag, undefined);
        expect(result.length).toEqual(2);
        const periode1 = result[0] as Uttaksperiode;
        expect(periode1.tidsperiode.fom).toEqual(new Date('2021-12-30'));
        expect(periode1.tidsperiode.tom).toEqual(new Date('2021-12-31'));
        const periode2 = result[1] as Uttaksperiode;
        expect(periode2.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(periode2.tidsperiode.tom).toEqual(new Date('2022-01-05'));
    });
    it('Skal splitte perioder på familiehendelsesdato for neste barnet', () => {
        const avslåttePerioderSøker = [
            {
                periode: {
                    fom: '2022-12-30',
                    tom: '2023-01-05',
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioderSøker, grunnlag, new Date('2023-01-03'));
        expect(result.length).toEqual(4);
        const periode1 = result[2] as Uttaksperiode;
        expect(periode1.tidsperiode.fom).toEqual(new Date('2022-12-30'));
        expect(periode1.tidsperiode.tom).toEqual(new Date('2023-01-02'));
        const periode2 = result[3] as Uttaksperiode;
        expect(periode2.tidsperiode.fom).toEqual(new Date('2023-01-03'));
        expect(periode2.tidsperiode.tom).toEqual(new Date('2023-01-05'));
    });
    //Periode far de første 6 ukene etter fødsel mapper erMorForSyk = true
    it('Periode med fars uttak de første 6 dagene der mor ikke er ufør skal mappe morErForSyk til true', () => {
        const periodeSøker = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-03',
                },
                gjelderAnnenPart: false,
                kontoType: StønadskontoType.Fedrekvote,
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(periodeSøker, grunnlag, new Date('2023-01-03'));
        expect(result.length).toEqual(1);
        const periode1 = result[0] as Uttaksperiode;
        expect(periode1.erMorForSyk).toEqual(true);
    });
});
