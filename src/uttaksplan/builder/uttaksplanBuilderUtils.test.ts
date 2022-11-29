import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype, UttakAnnenPartInfoPeriode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { settInnAnnenPartsUttak, slåSammenLikePerioder } from './uttaksplanbuilderUtils';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-07-21'),
            tom: new Date('2022-08-31'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.AktivitetsfriKvote,
        erMorForSyk: false,
        gradert: false,
        ønskerFlerbarnsdager: false,
        ønskerSamtidigUttak: false,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-09-01'),
            tom: new Date('2022-09-14'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.AktivitetsfriKvote,
        erMorForSyk: false,
        gradert: false,
        ønskerFlerbarnsdager: false,
        ønskerSamtidigUttak: false,
    },
];

describe('uttaksplanbuilderUtils - slåSammenLikePerioder', () => {
    it('slåSammenLikePerioder - skal slå sammen like perioder riktig', () => {
        const result = slåSammenLikePerioder(perioder, new Date('2022-07-21'));
        expect(result.length).toEqual(1);
        expect(result[0].tidsperiode.fom).toBe(perioder[0].tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toBe(perioder[1].tidsperiode.tom);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen like perioder hvis det er en dag imellom de', () => {
        const perioder2 = [
            perioder[0],
            { ...perioder[1], tidsperiode: { fom: new Date('2022-09-01'), tom: perioder[1].tidsperiode.tom } },
        ];
        const result = slåSammenLikePerioder(perioder2, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellige foreldre', () => {
        const perioder3 = [perioder[0], { ...perioder[1], forelder: Forelder.mor }];
        const result = slåSammenLikePerioder(perioder3, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig konto', () => {
        const perioder4 = [perioder[0], { ...perioder[1], konto: StønadskontoType.Fedrekvote }];
        const result = slåSammenLikePerioder(perioder4, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig samtidig uttak verdi', () => {
        const perioder5 = [perioder[0], { ...perioder[1], samtidigUttak: true }];
        const result = slåSammenLikePerioder(perioder5, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig gradering verdi', () => {
        const perioder6 = [perioder[0], { ...perioder[1], gradert: true }];
        const result = slåSammenLikePerioder(perioder6, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig ønskerFlerbarnsdager verdi', () => {
        const perioder7 = [perioder[0], { ...perioder[1], ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder7, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig erMorForSyk verdi', () => {
        const perioder8 = [perioder[0], { ...perioder[1], ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder8, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
});

describe('uttaksplanbuilderUtils - settInnAnnenPartsUttakOmNødvendig', () => {
    it('Skal dele opp søkerens periode hvis annen parts periode er i midten av perioden', () => {
        const morsPerioder = [
            {
                type: Periodetype.Uttak,
                id: '0',
                tidsperiode: {
                    fom: new Date('2022-01-21'),
                    tom: new Date('2022-01-28'),
                },
                konto: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
            },
            {
                type: Periodetype.Uttak,
                id: '1',
                tidsperiode: {
                    fom: new Date('2022-01-31'),
                    tom: new Date('2022-02-25'),
                },
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '50',
            },
            {
                type: Periodetype.Uttak,
                id: '2',
                tidsperiode: {
                    fom: new Date('2022-02-28'),
                    tom: new Date('2022-04-22'),
                },
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '70',
            },
        ] as Uttaksperiode[];

        const annenPartsUttakIMidten = [
            {
                type: Periodetype.Info,
                id: '4',
                tidsperiode: {
                    fom: new Date('2022-02-14'),
                    tom: new Date('2022-02-18'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ] as UttakAnnenPartInfoPeriode[];

        const result = settInnAnnenPartsUttak(morsPerioder, annenPartsUttakIMidten, new Date('2022-01-21'));

        expect(result.length).toBe(6);
        expect(result[0]).toEqual(morsPerioder[0]);

        const andrePeriode = result[1] as Uttaksperiode;
        expect(andrePeriode.tidsperiode.fom).toEqual(new Date('2022-01-31'));
        expect(andrePeriode.tidsperiode.tom).toEqual(new Date('2022-02-11'));
        expect(andrePeriode.type).toEqual(morsPerioder[1].type);
        expect(andrePeriode.konto).toEqual(morsPerioder[1].konto);
        expect(andrePeriode.forelder).toEqual(morsPerioder[1].forelder);
        expect(andrePeriode.samtidigUttakProsent).toEqual(morsPerioder[1].samtidigUttakProsent);

        const tredjePeriode = result[2] as Uttaksperiode;
        expect(tredjePeriode.tidsperiode.fom).toEqual(new Date('2022-02-14'));
        expect(tredjePeriode.tidsperiode.tom).toEqual(new Date('2022-02-18'));
        expect(tredjePeriode.konto).toEqual(morsPerioder[1].konto);
        expect(tredjePeriode.type).toEqual(morsPerioder[1].type);
        expect(tredjePeriode.forelder).toEqual(morsPerioder[1].forelder);
        expect(tredjePeriode.samtidigUttakProsent).toEqual(morsPerioder[1].samtidigUttakProsent);

        const fjerdePeriode = result[3] as UttakAnnenPartInfoPeriode;
        expect(fjerdePeriode.tidsperiode.fom).toEqual(new Date('2022-02-14'));
        expect(fjerdePeriode.tidsperiode.tom).toEqual(new Date('2022-02-18'));
        expect(fjerdePeriode.type).toEqual(annenPartsUttakIMidten[0].type);
        expect(fjerdePeriode.årsak).toEqual(annenPartsUttakIMidten[0].årsak);
        expect(fjerdePeriode.forelder).toEqual(annenPartsUttakIMidten[0].forelder);
        expect(fjerdePeriode.samtidigUttakProsent).toEqual(annenPartsUttakIMidten[0].samtidigUttakProsent);

        const femtePeriode = result[4] as Uttaksperiode;
        expect(femtePeriode.tidsperiode.fom).toEqual(new Date('2022-02-21'));
        expect(femtePeriode.tidsperiode.tom).toEqual(new Date('2022-02-25'));
        expect(femtePeriode.type).toEqual(morsPerioder[1].type);
        expect(femtePeriode.konto).toEqual(morsPerioder[1].konto);
        expect(femtePeriode.forelder).toEqual(morsPerioder[1].forelder);
        expect(femtePeriode.samtidigUttakProsent).toEqual(morsPerioder[1].samtidigUttakProsent);

        expect(result[5]).toEqual(morsPerioder[2]);
    });
    it('Skal dele opp annen parts periode hvis søkerens periode er i midten av perioden', () => {
        const søkerensPerioder = [
            {
                type: Periodetype.Uttak,
                id: '0',
                tidsperiode: {
                    fom: new Date('2022-01-21'),
                    tom: new Date('2022-01-28'),
                },
                konto: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
            },
            {
                type: Periodetype.Uttak,
                id: '1',
                tidsperiode: {
                    fom: new Date('2022-01-31'),
                    tom: new Date('2022-02-25'),
                },
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
            },
            {
                type: Periodetype.Uttak,
                id: '2',
                tidsperiode: {
                    fom: new Date('2022-02-28'),
                    tom: new Date('2022-04-22'),
                },
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '80',
            },
        ] as Uttaksperiode[];

        const annenPartsUttak = [
            {
                type: Periodetype.Info,
                id: '4',
                tidsperiode: {
                    fom: new Date('2022-01-24'),
                    tom: new Date('2022-03-04'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ] as UttakAnnenPartInfoPeriode[];

        const result = settInnAnnenPartsUttak(søkerensPerioder, annenPartsUttak, new Date('2022-01-21'));

        expect(result.length).toBe(8);

        const førstePeriode = result[0] as Uttaksperiode;
        expect(førstePeriode.tidsperiode.fom).toEqual(new Date('2022-01-21'));
        expect(førstePeriode.tidsperiode.tom).toEqual(new Date('2022-01-21'));
        expect(førstePeriode.type).toEqual(søkerensPerioder[0].type);
        expect(førstePeriode.konto).toEqual(søkerensPerioder[0].konto);
        expect(førstePeriode.forelder).toEqual(søkerensPerioder[0].forelder);
        expect(førstePeriode.samtidigUttakProsent).toEqual(søkerensPerioder[0].samtidigUttakProsent);

        const andrePeriode = result[1] as Uttaksperiode;
        expect(andrePeriode.tidsperiode.fom).toEqual(new Date('2022-01-24'));
        expect(andrePeriode.tidsperiode.tom).toEqual(new Date('2022-01-28'));
        expect(andrePeriode.type).toEqual(søkerensPerioder[0].type);
        expect(andrePeriode.konto).toEqual(søkerensPerioder[0].konto);
        expect(andrePeriode.forelder).toEqual(søkerensPerioder[0].forelder);
        expect(andrePeriode.samtidigUttakProsent).toEqual(søkerensPerioder[0].samtidigUttakProsent);

        const tredjePeriode = result[2] as UttakAnnenPartInfoPeriode;
        expect(tredjePeriode.tidsperiode.fom).toEqual(new Date('2022-01-24'));
        expect(tredjePeriode.tidsperiode.tom).toEqual(new Date('2022-01-28'));
        expect(tredjePeriode.type).toEqual(annenPartsUttak[0].type);
        expect(tredjePeriode.årsak).toEqual(annenPartsUttak[0].årsak);
        expect(tredjePeriode.forelder).toEqual(annenPartsUttak[0].forelder);
        expect(tredjePeriode.samtidigUttakProsent).toEqual(annenPartsUttak[0].samtidigUttakProsent);

        const fjerdePeriode = result[3] as Uttaksperiode;
        expect(fjerdePeriode.tidsperiode.fom).toEqual(new Date('2022-01-31'));
        expect(fjerdePeriode.tidsperiode.tom).toEqual(new Date('2022-02-25'));
        expect(fjerdePeriode.type).toEqual(søkerensPerioder[1].type);
        expect(fjerdePeriode.konto).toEqual(søkerensPerioder[1].konto);
        expect(fjerdePeriode.forelder).toEqual(søkerensPerioder[1].forelder);
        expect(fjerdePeriode.samtidigUttakProsent).toEqual(søkerensPerioder[1].samtidigUttakProsent);

        const femtePeriode = result[4] as UttakAnnenPartInfoPeriode;
        expect(femtePeriode.tidsperiode.fom).toEqual(new Date('2022-01-31'));
        expect(femtePeriode.tidsperiode.tom).toEqual(new Date('2022-02-25'));
        expect(femtePeriode.type).toEqual(annenPartsUttak[0].type);
        expect(femtePeriode.årsak).toEqual(annenPartsUttak[0].årsak);
        expect(femtePeriode.forelder).toEqual(annenPartsUttak[0].forelder);
        expect(femtePeriode.samtidigUttakProsent).toEqual(annenPartsUttak[0].samtidigUttakProsent);

        const sjettePeriode = result[5] as Uttaksperiode;
        expect(sjettePeriode.tidsperiode.fom).toEqual(new Date('2022-02-28'));
        expect(sjettePeriode.tidsperiode.tom).toEqual(new Date('2022-03-04'));
        expect(sjettePeriode.type).toEqual(søkerensPerioder[2].type);
        expect(sjettePeriode.konto).toEqual(søkerensPerioder[2].konto);
        expect(sjettePeriode.forelder).toEqual(søkerensPerioder[2].forelder);
        expect(sjettePeriode.samtidigUttakProsent).toEqual(søkerensPerioder[2].samtidigUttakProsent);

        const syvendePeriode = result[6] as UttakAnnenPartInfoPeriode;
        expect(syvendePeriode.tidsperiode.fom).toEqual(new Date('2022-02-28'));
        expect(syvendePeriode.tidsperiode.tom).toEqual(new Date('2022-03-04'));
        expect(femtePeriode.type).toEqual(annenPartsUttak[0].type);
        expect(femtePeriode.årsak).toEqual(annenPartsUttak[0].årsak);
        expect(femtePeriode.forelder).toEqual(annenPartsUttak[0].forelder);
        expect(femtePeriode.samtidigUttakProsent).toEqual(annenPartsUttak[0].samtidigUttakProsent);

        const sistePeriode = result[7] as Uttaksperiode;
        expect(sistePeriode.tidsperiode.fom).toEqual(new Date('2022-03-07'));
        expect(sistePeriode.tidsperiode.tom).toEqual(new Date('2022-04-22'));
        expect(sistePeriode.type).toEqual(søkerensPerioder[2].type);
        expect(sistePeriode.konto).toEqual(søkerensPerioder[2].konto);
        expect(sistePeriode.forelder).toEqual(søkerensPerioder[2].forelder);
        expect(sistePeriode.samtidigUttakProsent).toEqual(søkerensPerioder[2].samtidigUttakProsent);
    });
    it('Skal returnere annen parts uttak hvis søkerens perioder er tomme men det finnes annen parts uttak (førstegangssøknad med annen parts uttak)', () => {
        const kunAnnenPartsUttak = [
            {
                type: Periodetype.Info,
                id: '0',
                tidsperiode: {
                    fom: new Date('2022-01-01'),
                    tom: new Date('2022-02-04'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ] as UttakAnnenPartInfoPeriode[];

        const result = settInnAnnenPartsUttak([], kunAnnenPartsUttak, new Date('2022-01-21'));
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(kunAnnenPartsUttak[0]);
    });
    it('Hvis annen parts uttak overlapper delvis med en utsettelsesperiode (som ikke er fri utsettelse), skal delen til annen part som overlapper bli borte', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart = {
            type: Periodetype.Utsettelse,
            id: '0',
            tidsperiode: {
                fom: new Date('2021-01-05'),
                tom: new Date('2021-01-06'),
            },
            forelder: Forelder.farMedmor,
            erArbeidstaker: true,
        } as Periode;
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode = [
            {
                type: Periodetype.Info,
                id: '1',
                tidsperiode: {
                    fom: new Date('2021-01-04'),
                    tom: new Date('2021-01-07'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                overskrives: true,
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ] as Periode[];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            new Date('2020-12-21')
        );
        expect(result.length).toBe(3);
        expect(result[0].tidsperiode.fom).toEqual(
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].tidsperiode.fom
        );
        expect(result[0].tidsperiode.tom).toEqual(new Date('2021-01-04'));
        expect(result[0].type).toEqual(Periodetype.Info);
        expect(result[1]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
        expect(result[2].tidsperiode.fom).toEqual(new Date('2021-01-07'));
        expect(result[2].tidsperiode.tom).toEqual(
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].tidsperiode.tom
        );
        expect(result[2].type).toEqual(Periodetype.Info);
    });

    it('Hvis en utsettelsesperiode (som ikke er fri utsettelse) overlapper annen parts uttak helt, returner kun utsettelsen', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart = {
            type: Periodetype.Utsettelse,
            id: '0',
            tidsperiode: {
                fom: new Date('2021-01-04'),
                tom: new Date('2021-01-07'),
            },
            forelder: Forelder.farMedmor,
            erArbeidstaker: true,
        } as Periode;
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode = [
            {
                type: Periodetype.Info,
                id: '1',
                tidsperiode: {
                    fom: new Date('2021-01-05'),
                    tom: new Date('2021-01-05'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                overskrives: true,
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ] as Periode[];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            new Date('2020-12-21')
        );
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
    });

    it('Hvis annen parts uttak overlapper starten av utsettelsesperioden (som ikke er fri utsettelse) returner kun delen som ikke overlapper', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart = {
            type: Periodetype.Utsettelse,
            id: '0',
            tidsperiode: {
                fom: new Date('2021-01-04'),
                tom: new Date('2021-01-07'),
            },
            forelder: Forelder.farMedmor,
            erArbeidstaker: true,
        } as Periode;
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode = [
            {
                type: Periodetype.Info,
                id: '1',
                tidsperiode: {
                    fom: new Date('2021-01-01'),
                    tom: new Date('2021-01-04'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                overskrives: true,
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ] as Periode[];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            new Date('2020-12-21')
        );
        expect(result.length).toBe(2);
        expect(result[0].tidsperiode.fom).toEqual(
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].tidsperiode.fom
        );
        expect(result[0].tidsperiode.tom).toEqual(new Date('2021-01-01'));
        expect(result[0].type).toEqual(Periodetype.Info);
        expect(result[1]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
    });
    it('Hvis annen parts uttak overlapper slutten av utsettelsesperioden (som ikke er fri utsettelse) returner kun delen som ikke overlapper som infoperiode', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart = {
            type: Periodetype.Utsettelse,
            id: '0',
            tidsperiode: {
                fom: new Date('2021-01-04'),
                tom: new Date('2021-01-07'),
            },
            forelder: Forelder.farMedmor,
            erArbeidstaker: true,
        } as Periode;
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode = [
            {
                type: Periodetype.Info,
                id: '1',
                tidsperiode: {
                    fom: new Date('2021-01-07'),
                    tom: new Date('2021-01-08'),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
                årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                overskrives: true,
            },
        ] as Periode[];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            new Date('2020-12-21')
        );
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
        expect(result[1].tidsperiode.tom).toEqual(
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].tidsperiode.tom
        );
        expect(result[1].tidsperiode.fom).toEqual(new Date('2021-01-08'));
        expect(result[1].type).toEqual(Periodetype.Info);
    });
});
