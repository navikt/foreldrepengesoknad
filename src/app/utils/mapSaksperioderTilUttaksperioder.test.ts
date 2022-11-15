// import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';
// import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
// import { getKontotypeBareFarHarRett } from './mapSaksperioderTilUttaksperioder';
// import mapSaksperioderTilUttaksperioder, { getKontotypeBareFarHarRett } from './mapSaksperioderTilUttaksperioder';
// import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
// import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
// import { UttakArbeidType } from 'app/types/UttakArbeidType';
// import { ArbeidsgiverInfoType } from 'app/types/ArbeidsgiverInfo';
// import { Dekningsgrad } from 'app/types/Dekningsgrad';
// import { Periodetype, UttakAnnenPartInfoPeriode, Uttaksperiode } from 'uttaksplan/types/Periode';
// import { Forelder } from 'app/types/Forelder';

describe('getKontotypeBareFarHarRett', () => {
    // it('skal returnere konto med aktivitetskrav for bare far har rett når perioden er innvilget med årsak 2004', () => {
    //     const konto = getKontotypeBareFarHarRett(PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2004);
    //     expect(konto).toEqual(StønadskontoType.Foreldrepenger);
    // });
    // it('skal returnere konto med aktivitetskrav for bare far har rett når perioden er innvilget med årsak 2033', () => {
    //     const konto = getKontotypeBareFarHarRett(PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2033);
    //     expect(konto).toEqual(StønadskontoType.Foreldrepenger);
    // });
    // it('skal returnere konto uten aktivitetskrav for bare far har rett når perioden er innvilget med annen årsak enn 2004 og 2033', () => {
    //     const konto = getKontotypeBareFarHarRett('2000');
    //     expect(konto).toEqual(StønadskontoType.AktivitetsfriKvote);
    // });
});

// describe('mapSaksperioderTilUttaksperioder', () => {
//     it('Skal returnere inforperioder om annen parts uttak der det er søkerens førstegangssøknad med kun annen parts uttak', () => {
//         const erFarEllerMedmor = true;
//         const sakMedKunAnnenPartsUttak = [
//             {
//                 periode: {
//                     fom: '2022-01-03',
//                     tom: '2022-02-04',
//                 },
//                 gjelderAnnenPart: true,
//                 samtidigUttak: true,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 stønadskontotype: StønadskontoType.Mødrekvote,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//             },
//         ] as Saksperiode[];

//         const grunnlagFørstegangssøknad = {
//             familiehendelseDato: '2022-01-03',
//             morHarRett: true,
//             farMedmorHarRett: true,
//             erDeltUttak: true,
//             farMedmorErAleneOmOmsorg: false,
//             familiehendelseType: FamiliehendelseType.FØDSEL,
//             dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
//             antallBarn: 1,
//             morErAleneOmOmsorg: false,
//             morErUfør: false,
//             søkerErFarEllerMedmor: true,
//             termindato: '2022-01-03',
//             fødselsdato: '2022-01-03',
//             erBarnetFødt: true,
//         } as Saksgrunnlag;

//         const result = mapSaksperioderTilUttaksperioder(
//             sakMedKunAnnenPartsUttak,
//             grunnlagFørstegangssøknad,
//             erFarEllerMedmor
//         );
//         expect(result.length).toEqual(1);
//         const infoperiode = result[0] as UttakAnnenPartInfoPeriode;
//         expect(infoperiode.tidsperiode.fom).toEqual(new Date('2022-01-03'));
//         expect(infoperiode.tidsperiode.tom).toEqual(new Date('2022-02-04'));
//         expect(infoperiode.type).toEqual(Periodetype.Info);
//         expect(infoperiode.årsak).toEqual(OppholdÅrsakType.UttakMødrekvoteAnnenForelder);
//     });

//     it('Skal vise søkerens perioder og infoperioder om annen part der det er søkerens endringssøknad der begge har søkt fra før og perioder ikke overlapper', () => {
//         const grunnlagEndringssøknad = {
//             familiehendelseDato: '2022-01-03',
//             morHarRett: true,
//             farMedmorHarRett: true,
//             erDeltUttak: true,
//             farMedmorErAleneOmOmsorg: false,
//             familiehendelseType: FamiliehendelseType.FØDSEL,
//             dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
//             antallBarn: 1,
//             morErAleneOmOmsorg: false,
//             morErUfør: false,
//             søkerErFarEllerMedmor: true,
//             termindato: '2022-01-03',
//             fødselsdato: '2022-01-03',
//             erBarnetFødt: true,
//         } as Saksgrunnlag;

//         const perioderBeggeParterSomIkkeOverlapper = [
//             {
//                 periode: {
//                     fom: '2022-01-03',
//                     tom: '2022-01-10',
//                 },
//                 gjelderAnnenPart: true,
//                 samtidigUttak: true,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 stønadskontotype: StønadskontoType.Mødrekvote,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//             },
//             {
//                 periode: {
//                     fom: '2022-01-11',
//                     tom: '2022-01-18',
//                 },
//                 gjelderAnnenPart: true,
//                 samtidigUttak: true,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 stønadskontotype: StønadskontoType.Fellesperiode,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//             },
//             {
//                 periode: {
//                     fom: '2022-01-19',
//                     tom: '2022-01-20',
//                 },
//                 gjelderAnnenPart: false,
//                 samtidigUttak: true,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 stønadskontotype: StønadskontoType.Fedrekvote,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//                 oppholdAarsak: OppholdÅrsakType.Ingen,
//             },
//         ] as Saksperiode[];

//         const result = mapSaksperioderTilUttaksperioder(
//             perioderBeggeParterSomIkkeOverlapper,
//             grunnlagEndringssøknad,
//             true
//         );
//         expect(result.length).toEqual(3);
//         const infoperiode1 = result[0] as UttakAnnenPartInfoPeriode;
//         expect(infoperiode1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
//         expect(infoperiode1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
//         expect(infoperiode1.type).toEqual(Periodetype.Info);
//         expect(infoperiode1.årsak).toEqual(OppholdÅrsakType.UttakMødrekvoteAnnenForelder);
//         expect(infoperiode1.forelder).toEqual(Forelder.mor);

//         const infoperiode2 = result[1] as UttakAnnenPartInfoPeriode;
//         expect(infoperiode2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
//         expect(infoperiode2.tidsperiode.tom).toEqual(new Date('2022-01-18'));
//         expect(infoperiode2.type).toEqual(Periodetype.Info);
//         expect(infoperiode2.årsak).toEqual(OppholdÅrsakType.UttakFellesperiodeAnnenForelder);
//         expect(infoperiode2.forelder).toEqual(Forelder.mor);

//         const uttaksperiode = result[2] as Uttaksperiode;
//         expect(uttaksperiode.tidsperiode.fom).toEqual(new Date('2022-01-19'));
//         expect(uttaksperiode.tidsperiode.tom).toEqual(new Date('2022-01-20'));
//         expect(uttaksperiode.type).toEqual(Periodetype.Uttak);
//         expect(uttaksperiode.forelder).toEqual(Forelder.farMedmor);
//         expect(uttaksperiode.konto).toEqual(StønadskontoType.Fedrekvote);
//     });
//     it('Skal vise søkerens perioder og infoperioder om annen part der søkerens og annen parts perioder overlapper og annen parts periode er lengere enn søkerens', () => {
//         const grunnlagEndringssøknadMedOverlapp = {
//             familiehendelseDato: '2022-01-03',
//             morHarRett: true,
//             farMedmorHarRett: true,
//             erDeltUttak: true,
//             farMedmorErAleneOmOmsorg: false,
//             familiehendelseType: FamiliehendelseType.FØDSEL,
//             dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
//             antallBarn: 1,
//             morErAleneOmOmsorg: false,
//             morErUfør: false,
//             søkerErFarEllerMedmor: true,
//             termindato: '2022-01-03',
//             fødselsdato: '2022-01-03',
//             erBarnetFødt: true,
//         } as Saksgrunnlag;

//         const perioderBeggeParterSomOverlapper = [
//             {
//                 periode: {
//                     fom: '2022-01-03',
//                     tom: '2022-01-10',
//                 },
//                 gjelderAnnenPart: true,
//                 samtidigUttak: true,
//                 samtidigUttaksprosent: 100,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 stønadskontotype: StønadskontoType.Mødrekvote,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//             },
//             {
//                 periode: {
//                     fom: '2022-01-05',
//                     tom: '2022-01-06',
//                 },
//                 gjelderAnnenPart: false,
//                 samtidigUttak: true,
//                 samtidigUttaksprosent: 100,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 stønadskontotype: StønadskontoType.Fedrekvote,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//                 oppholdAarsak: OppholdÅrsakType.Ingen,
//             },
//         ] as Saksperiode[];

//         const result = mapSaksperioderTilUttaksperioder(
//             perioderBeggeParterSomOverlapper,
//             grunnlagEndringssøknadMedOverlapp,
//             true
//         );
//         expect(result.length).toEqual(4);
//     });
//     it('Skal vise søkerens perioder og infoperioder om annen part der søkerens og annen parts perioder overlapper og søkerens periode er lengere enn annen parts', () => {
//         const grunnlagEndringssøknadMedOverlapp = {
//             familiehendelseDato: '2022-01-03',
//             morHarRett: true,
//             farMedmorHarRett: true,
//             erDeltUttak: true,
//             farMedmorErAleneOmOmsorg: false,
//             familiehendelseType: FamiliehendelseType.FØDSEL,
//             dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
//             antallBarn: 1,
//             morErAleneOmOmsorg: false,
//             morErUfør: false,
//             søkerErFarEllerMedmor: true,
//             termindato: '2022-01-03',
//             fødselsdato: '2022-01-03',
//             erBarnetFødt: true,
//         } as Saksgrunnlag;

//         const perioderBeggeParterSomOverlapper = [
//             {
//                 periode: {
//                     fom: '2022-01-03',
//                     tom: '2022-01-10',
//                 },
//                 gjelderAnnenPart: false,
//                 samtidigUttak: true,
//                 samtidigUttaksprosent: 100,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 stønadskontotype: StønadskontoType.Fedrekvote,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//             },
//             {
//                 periode: {
//                     fom: '2022-01-05',
//                     tom: '2022-01-06',
//                 },
//                 gjelderAnnenPart: true,
//                 samtidigUttak: true,
//                 samtidigUttaksprosent: 100,
//                 flerbarnsdager: false,
//                 utbetalingsprosent: 100,
//                 arbeidstidprosent: 100,
//                 stønadskontotype: StønadskontoType.Mødrekvote,
//                 uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
//                 guid: '0',
//                 arbeidsgiverInfo: { id: '0', type: ArbeidsgiverInfoType.ORGANISASJON, navn: 'test' },
//                 graderingInnvilget: false,
//                 trekkDager: 15,
//                 periodeResultatÅrsak: '2006',
//                 oppholdAarsak: OppholdÅrsakType.Ingen,
//             },
//         ] as Saksperiode[];

//         const result = mapSaksperioderTilUttaksperioder(
//             perioderBeggeParterSomOverlapper,
//             grunnlagEndringssøknadMedOverlapp
//         );
//         expect(result.length).toEqual(4);
//     });
// });
