import {
    Arbeidsform,
    AvslåttPeriode,
    FamiliehendelseType,
    PeriodeInfoType,
    Periodetype,
    Saksgrunnlag,
    Saksperiode,
    Utsettelsesperiode,
    UttakAnnenPartEØSInfoPeriode,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
} from '@navikt/fp-common';
import { UttakPeriodeAnnenpartEøs_fpoversikt } from '@navikt/fp-types';

import { getKontotypeBareFarHarRett, mapSaksperioderTilUttaksperioder } from './mapSaksperioderTilUttaksperioder';

describe('getKontotypeBareFarHarRett', () => {
    const periodeTrekkerMinsterett = true;
    const periodeTrekkerIkkeMinsterett = false;

    it('skal returnere konto med aktivitetskrav for bare far har rett når perioden er innvilget med årsak 2004', () => {
        const konto = getKontotypeBareFarHarRett(periodeTrekkerIkkeMinsterett);
        expect(konto).toEqual('FORELDREPENGER');
    });
    it('skal returnere konto uten aktivitetskrav for bare far har rett når perioden', () => {
        const konto = getKontotypeBareFarHarRett(periodeTrekkerMinsterett);
        expect(konto).toEqual('AKTIVITETSFRI_KVOTE');
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
        dekningsgrad: '100',
        antallBarn: 1,
        morErAleneOmOmsorg: false,
        morErUfør: false,
        søkerErFarEllerMedmor: true,
        termindato: '2022-01-03',
        fødselsdato: '2022-01-03',
        erBarnetFødt: true,
        ønskerJustertUttakVedFødsel: undefined,
    } satisfies Saksgrunnlag;
    it('Skal returnere inforperioder om annen parts uttak der det er søkerens førstegangssøknad med kun annen parts uttak', () => {
        const sakMedKunAnnenPartsUttak = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-02-04',
                },
                gjelderAnnenPart: true,
                flerbarnsdager: false,
                oppholdÅrsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                guid: '0',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(sakMedKunAnnenPartsUttak, grunnlag, undefined, undefined);
        expect(result.length).toEqual(1);
        const infoperiode = result[0] as UttakAnnenPartInfoPeriode;
        expect(infoperiode.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(infoperiode.tidsperiode.tom).toEqual(new Date('2022-02-04'));
        expect(infoperiode.type).toEqual(Periodetype.Info);
        expect(infoperiode.årsak).toEqual('UTTAK_MØDREKVOTE_ANNEN_FORELDER');
    });

    it(
        'Skal vise søkerens perioder og infoperioder om annen part der det er søkerens endringssøknad der begge har søkt' +
            ' fra før og perioder ikke overlapper. Skal også vise søkerens uttaksperiode med gradering og arbeidsinformasjon.',
        () => {
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
                        årsak: 'ANNET',
                    },
                    gjelderAnnenPart: true,
                    flerbarnsdager: false,
                    oppholdÅrsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                    guid: '0',
                    kontoType: 'MØDREKVOTE',
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
                        årsak: 'ANNET',
                    },
                    gjelderAnnenPart: true,
                    flerbarnsdager: false,
                    utbetalingsprosent: 100,
                    arbeidstidprosent: 100,
                    oppholdÅrsak: 'UTTAK_FELLESP_ANNEN_FORELDER',
                    guid: '1',
                    kontoType: 'FELLESPERIODE',
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
                        årsak: 'ANNET',
                    },
                    gjelderAnnenPart: false,
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                    kontoType: 'FEDREKVOTE',
                    guid: '2',
                    gradering: {
                        arbeidstidprosent: 80,
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: { id: '50089', type: 'ORGANISASJON' },
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
                        årsak: 'ANNET',
                    },
                    gjelderAnnenPart: false,
                    kontoType: 'FELLESPERIODE',
                    morsAktivitet: 'INNLAGT',
                    guid: '3',
                },
            ] as Saksperiode[];

            const result = mapSaksperioderTilUttaksperioder(
                perioderBeggeParterSomIkkeOverlapper,
                grunnlag,
                undefined,
                undefined,
            );
            expect(result.length).toEqual(4);
            const infoperiode1 = result[0] as UttakAnnenPartInfoPeriode;
            expect(infoperiode1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
            expect(infoperiode1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
            expect(infoperiode1.type).toEqual(Periodetype.Info);
            expect(infoperiode1.årsak).toEqual('UTTAK_MØDREKVOTE_ANNEN_FORELDER');
            expect(infoperiode1.forelder).toEqual('MOR');

            const infoperiode2 = result[1] as UttakAnnenPartInfoPeriode;
            expect(infoperiode2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
            expect(infoperiode2.tidsperiode.tom).toEqual(new Date('2022-01-18'));
            expect(infoperiode2.type).toEqual(Periodetype.Info);
            expect(infoperiode2.årsak).toEqual('UTTAK_FELLESP_ANNEN_FORELDER');
            expect(infoperiode2.forelder).toEqual('MOR');

            const uttaksperiode = result[2] as Uttaksperiode;
            expect(uttaksperiode.tidsperiode.fom).toEqual(new Date('2022-01-19'));
            expect(uttaksperiode.tidsperiode.tom).toEqual(new Date('2022-01-20'));
            expect(uttaksperiode.type).toEqual(Periodetype.Uttak);
            expect(uttaksperiode.forelder).toEqual('FAR_MEDMOR');
            expect(uttaksperiode.konto).toEqual('FEDREKVOTE');
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
            expect(uttakFellesperiode.forelder).toEqual('FAR_MEDMOR');
            expect(uttakFellesperiode.konto).toEqual('FELLESPERIODE');
            expect(uttakFellesperiode.gradert).toEqual(false);
            expect(uttakFellesperiode.ønskerSamtidigUttak).toEqual(false);
            expect(uttakFellesperiode.harIkkeAktivitetskrav).toEqual(undefined);
            expect(uttakFellesperiode.morsAktivitetIPerioden).toEqual('INNLAGT');
        },
    );
    it(
        'Skal vise søkerens perioder og infoperioder om annen part der søkerens og annen parts perioder' +
            ' overlapper og annen parts periode er lengere enn søkerens',
        () => {
            const perioderBeggeParterSomOverlapper = [
                {
                    periode: {
                        fom: '2022-01-03',
                        tom: '2022-01-10',
                    },
                    gjelderAnnenPart: true,
                    samtidigUttak: 100,
                    flerbarnsdager: false,
                    oppholdÅrsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                    guid: '0',
                    stønadskontotype: 'MØDREKVOTE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
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
                    kontoType: 'FEDREKVOTE',
                    guid: '0',
                    oppholdÅrsak: 'INGEN',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                },
            ] as Saksperiode[];

            const result = mapSaksperioderTilUttaksperioder(
                perioderBeggeParterSomOverlapper,
                grunnlag,
                undefined,
                undefined,
            );
            expect(result.length).toEqual(4);
            const uttak1 = result[0] as Uttaksperiode;
            expect(uttak1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
            expect(uttak1.tidsperiode.tom).toEqual(new Date('2022-01-04'));
            expect(uttak1.type).toEqual(Periodetype.Info);
            expect(uttak1.forelder).toEqual('MOR');
            const uttak2 = result[1] as Uttaksperiode;
            expect(uttak2.tidsperiode.fom).toEqual(new Date('2022-01-05'));
            expect(uttak2.tidsperiode.tom).toEqual(new Date('2022-01-06'));
            expect(uttak2.type).toEqual(Periodetype.Info);
            expect(uttak2.forelder).toEqual('MOR');
            const uttak3 = result[2] as Uttaksperiode;
            expect(uttak3.tidsperiode.fom).toEqual(new Date('2022-01-05'));
            expect(uttak3.tidsperiode.tom).toEqual(new Date('2022-01-06'));
            expect(uttak3.type).toEqual(Periodetype.Uttak);
            expect(uttak3.forelder).toEqual('FAR_MEDMOR');
            const uttak4 = result[3] as Uttaksperiode;
            expect(uttak4.tidsperiode.fom).toEqual(new Date('2022-01-07'));
            expect(uttak4.tidsperiode.tom).toEqual(new Date('2022-01-10'));
            expect(uttak4.type).toEqual(Periodetype.Info);
            expect(uttak4.forelder).toEqual('MOR');
        },
    );
    it(
        'Skal vise søkerens perioder og infoperioder om annen part der søkerens og annen parts perioder' +
            ' overlapper og søkerens periode er lengere enn annen parts',
        () => {
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
                    kontoType: 'FEDREKVOTE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
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
                    kontoType: 'MØDREKVOTE',
                    guid: '1',
                    oppholdÅrsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                },
            ] as Saksperiode[];

            const result = mapSaksperioderTilUttaksperioder(
                perioderBeggeParterSomOverlapper,
                grunnlag,
                undefined,
                undefined,
            );
            const uttak1 = result[0] as Uttaksperiode;
            expect(uttak1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
            expect(uttak1.tidsperiode.tom).toEqual(new Date('2022-01-04'));
            expect(uttak1.type).toEqual(Periodetype.Uttak);
            expect(uttak1.forelder).toEqual('FAR_MEDMOR');
            const uttak2 = result[2] as Uttaksperiode;
            expect(uttak2.tidsperiode.fom).toEqual(new Date('2022-01-05'));
            expect(uttak2.tidsperiode.tom).toEqual(new Date('2022-01-06'));
            expect(uttak2.type).toEqual(Periodetype.Uttak);
            expect(uttak2.forelder).toEqual('FAR_MEDMOR');
            const uttak3 = result[1] as Uttaksperiode;
            expect(uttak3.tidsperiode.fom).toEqual(new Date('2022-01-05'));
            expect(uttak3.tidsperiode.tom).toEqual(new Date('2022-01-06'));
            expect(uttak3.type).toEqual(Periodetype.Info);
            expect(uttak3.forelder).toEqual('MOR');
            const uttak4 = result[3] as Uttaksperiode;
            expect(uttak4.tidsperiode.fom).toEqual(new Date('2022-01-07'));
            expect(uttak4.tidsperiode.tom).toEqual(new Date('2022-01-10'));
            expect(uttak4.type).toEqual(Periodetype.Uttak);
            expect(uttak4.forelder).toEqual('FAR_MEDMOR');
        },
    );

    it('Skal mappe utsettelser riktig', () => {
        const perioderUtsettelse = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: false,
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-12',
                },
                gjelderAnnenPart: false,
                utsettelseÅrsak: 'ARBEID',
                morsAktivitet: 'ARBEID',
                guid: '1',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(perioderUtsettelse, grunnlag, undefined, undefined);
        expect(result.length).toEqual(2);
        const utsettelse1 = result[0] as Utsettelsesperiode;
        expect(utsettelse1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(utsettelse1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(utsettelse1.type).toEqual(Periodetype.Utsettelse);
        expect(utsettelse1.årsak).toEqual('LOVBESTEMT_FERIE');
        expect(utsettelse1.forelder).toEqual('FAR_MEDMOR');
        expect(utsettelse1.erArbeidstaker).toEqual(false);
        const utsettelse2 = result[1] as Utsettelsesperiode;
        expect(utsettelse2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
        expect(utsettelse2.tidsperiode.tom).toEqual(new Date('2022-01-12'));
        expect(utsettelse2.type).toEqual(Periodetype.Utsettelse);
        expect(utsettelse2.morsAktivitetIPerioden).toEqual('ARBEID');
        expect(utsettelse2.årsak).toEqual('ARBEID');
        expect(utsettelse2.forelder).toEqual('FAR_MEDMOR');
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
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-12',
                },
                gjelderAnnenPart: false,
                kontoType: 'FEDREKVOTE',
                guid: '1',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioder, grunnlag, undefined, undefined);
        expect(result.length).toEqual(2);
        const avslåttPeriode1 = result[0] as AvslåttPeriode;
        expect(avslåttPeriode1.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(avslåttPeriode1.tidsperiode.tom).toEqual(new Date('2022-01-10'));
        expect(avslåttPeriode1.type).toEqual(Periodetype.Info);
        expect(avslåttPeriode1.avslåttPeriodeType).toEqual(Periodetype.Utsettelse);
        expect(avslåttPeriode1.forelder).toEqual('FAR_MEDMOR');
        expect(avslåttPeriode1.overskrives).toEqual(true);
        expect(avslåttPeriode1.visPeriodeIPlan).toEqual(true);
        const avslåttPeriode2 = result[1] as AvslåttPeriode;
        expect(avslåttPeriode2.tidsperiode.fom).toEqual(new Date('2022-01-11'));
        expect(avslåttPeriode2.tidsperiode.tom).toEqual(new Date('2022-01-12'));
        expect(avslåttPeriode2.type).toEqual(Periodetype.Info);
        expect(avslåttPeriode2.forelder).toEqual('FAR_MEDMOR');
        expect(avslåttPeriode2.avslåttPeriodeType).toEqual(Periodetype.Uttak);
        expect(avslåttPeriode2.forelder).toEqual('FAR_MEDMOR');
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
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePeriodeAnnenPart, grunnlag, undefined, undefined);
        expect(result.length).toEqual(0);
    });
    it('Skal filtrere bort søkerens avslåtte perioder som ikke trekker dager eller har "AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER"', () => {
        const avslåttePerioderSøker = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-01-10',
                },
                gjelderAnnenPart: false,
                kontoType: 'FEDREKVOTE',
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
            },
            {
                periode: {
                    fom: '2022-01-11',
                    tom: '2022-01-12',
                },
                gjelderAnnenPart: false,
                kontoType: 'FEDREKVOTE',
                guid: '1',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioderSøker, grunnlag, undefined, undefined);
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
                kontoType: 'FEDREKVOTE',
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioderSøker, grunnlag, undefined, undefined);
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
                kontoType: 'FEDREKVOTE',
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(
            avslåttePerioderSøker,
            grunnlag,
            undefined,
            new Date('2023-01-03'),
        );
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
                kontoType: 'FEDREKVOTE',
                guid: '0',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(periodeSøker, grunnlag, undefined, new Date('2023-01-03'));
        expect(result.length).toEqual(1);
        const periode1 = result[0] as Uttaksperiode;
        expect(periode1.erMorForSyk).toEqual(true);
    });
    it('Skal mappe og slå sammen avslåtte premature perioder for annen part (uttak og utsettelser) til å trekke fra angitt konto', () => {
        const avslåttePerioderAnnenPart = [
            {
                periode: {
                    fom: '2021-12-01',
                    tom: '2021-12-15',
                },
                gjelderAnnenPart: true,
                kontoType: 'FELLESPERIODE',
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
            {
                periode: {
                    fom: '2021-12-16',
                    tom: '2021-12-28',
                },
                gjelderAnnenPart: true,
                utsettelseÅrsak: 'BARN_INNLAGT',
                kontoType: 'FELLESPERIODE',
                guid: '0',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];

        const result = mapSaksperioderTilUttaksperioder(avslåttePerioderAnnenPart, grunnlag, undefined, undefined);
        expect(result.length).toEqual(1);
        const periode1 = result[0] as AvslåttPeriode;
        expect(periode1.tidsperiode.fom).toEqual(new Date('2021-12-01'));
        expect(periode1.tidsperiode.tom).toEqual(new Date('2021-12-28'));
        expect(periode1.kontoType).toEqual('FELLESPERIODE');
        expect(periode1.infotype).toEqual(PeriodeInfoType.avslåttPeriode);
    });

    it('Skal legge til perioder for annenpart tatt ut i eøs hvis tilgjengelig', () => {
        const søkersPerioderFraVedtak = [
            {
                periode: {
                    fom: '2022-01-03',
                    tom: '2022-02-04',
                },
                gjelderAnnenPart: false,
                flerbarnsdager: false,
                oppholdÅrsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                guid: '0',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
            },
        ] as Saksperiode[];
        const annenpartsPerioderEøs = [
            {
                fom: '2022-02-05',
                tom: '2022-03-04',
                kontoType: 'FELLESPERIODE',
                trekkdager: 55,
            },
        ] as UttakPeriodeAnnenpartEøs_fpoversikt[];

        const result = mapSaksperioderTilUttaksperioder(
            søkersPerioderFraVedtak,
            grunnlag,
            annenpartsPerioderEøs,
            undefined,
        );
        expect(result.length).toEqual(2);
        const uttakperiode = result[0] as Uttaksperiode;
        expect(uttakperiode.tidsperiode.fom).toEqual(new Date('2022-01-03'));
        expect(uttakperiode.tidsperiode.tom).toEqual(new Date('2022-02-04'));
        expect(uttakperiode.konto).toEqual('MØDREKVOTE');
        const uttakkAnnenpartEøs = result[1] as UttakAnnenPartEØSInfoPeriode;
        expect(uttakkAnnenpartEøs.tidsperiode.fom).toEqual(new Date('2022-02-05'));
        expect(uttakkAnnenpartEøs.tidsperiode.tom).toEqual(new Date('2022-03-04'));
        expect(uttakkAnnenpartEøs.årsak).toEqual('UTTAK_FELLESP_ANNEN_FORELDER');
        expect(uttakkAnnenpartEøs.trekkdager).toEqual(55);
    });
});
