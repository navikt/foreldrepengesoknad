import { Forelder } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { OppholdÅrsakType } from '@navikt/fp-types';

import { Planperiode } from '../types/Planperiode';
import { settInnAnnenPartsUttak, slåSammenLikePerioder } from './uttaksplanbuilderUtils';

const perioder: Planperiode[] = [
    {
        id: '1',
        fom: '2022-07-21',
        tom: '2022-08-31',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.AktivitetsfriKvote,
        gjelderAnnenPart: false,
    },
    {
        id: '2',
        fom: '2022-09-01',
        tom: '2022-09-14',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.AktivitetsfriKvote,
        gjelderAnnenPart: false,
    },
];

describe('uttaksplanbuilderUtils - slåSammenLikePerioder', () => {
    it('slåSammenLikePerioder - skal slå sammen like perioder riktig', () => {
        const result = slåSammenLikePerioder(perioder, '2022-07-21', undefined);
        expect(result.length).toEqual(1);
        expect(result[0].fom).toBe(perioder[0].fom);
        expect(result[0].tom).toBe(perioder[1].tom);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen like perioder hvis det er en dag imellom de', () => {
        const perioder2: Planperiode[] = [perioder[0], { ...perioder[1], fom: '2022-09-02', tom: perioder[1].tom }];
        const result = slåSammenLikePerioder(perioder2, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellige foreldre', () => {
        const perioder3 = [perioder[0], { ...perioder[1], forelder: Forelder.mor }];
        const result = slåSammenLikePerioder(perioder3, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig konto', () => {
        const perioder4 = [perioder[0], { ...perioder[1], konto: StønadskontoType.Fedrekvote }];
        const result = slåSammenLikePerioder(perioder4, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig samtidig uttak verdi', () => {
        const perioder5 = [perioder[0], { ...perioder[1], samtidigUttak: 50 }];
        const result = slåSammenLikePerioder(perioder5, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig gradering verdi', () => {
        const perioder6 = [perioder[0], { ...perioder[1], gradert: true }];
        const result = slåSammenLikePerioder(perioder6, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig ønskerFlerbarnsdager verdi', () => {
        const perioder7 = [perioder[0], { ...perioder[1], ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder7, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig erMorForSyk verdi', () => {
        const perioder8 = [perioder[0], { ...perioder[1], ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder8, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder som overlapper førstePeriodeNesteSak', () => {
        const fomFørstePeriodeNesteSak = '2022-09-01';
        const result = slåSammenLikePerioder(perioder, '2022-06-21', fomFørstePeriodeNesteSak);
        expect(result.length).toEqual(2);
    });
});

describe('uttaksplanbuilderUtils - settInnAnnenPartsUttakOmNødvendig', () => {
    const førsteUttaksdagNesteBarnsSak = undefined;
    it('Skal dele opp søkerens periode hvis annen parts periode er i midten av perioden', () => {
        const morsPerioder: Planperiode[] = [
            {
                id: '0',
                fom: '2022-01-21',
                tom: '2022-01-28',
                kontoType: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
                samtidigUttak: 100,
                gjelderAnnenPart: false,
            },
            {
                id: '1',
                fom: '2022-01-31',
                tom: '2022-02-25',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                samtidigUttak: 50,
                gjelderAnnenPart: false,
            },
            {
                id: '2',
                fom: '2022-02-28',
                tom: '2022-04-22',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                samtidigUttak: 70,
                gjelderAnnenPart: false,
            },
        ];

        const annenPartsUttakIMidten: Planperiode[] = [
            {
                id: '4',
                fom: '2022-02-14',
                tom: '2022-02-18',
                forelder: Forelder.farMedmor,
                gjelderAnnenPart: true,
                samtidigUttak: 100,
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ];

        const result = settInnAnnenPartsUttak(
            morsPerioder,
            annenPartsUttakIMidten,
            '2022-01-21',
            førsteUttaksdagNesteBarnsSak,
        );

        expect(result.length).toBe(6);
        expect(result[0]).toEqual(morsPerioder[0]);

        const andrePeriode = result[1];
        expect(andrePeriode.fom).toEqual('2022-01-31');
        expect(andrePeriode.tom).toEqual('2022-02-11');
        expect(andrePeriode.kontoType).toEqual(morsPerioder[1].kontoType);
        expect(andrePeriode.forelder).toEqual(morsPerioder[1].forelder);
        expect(andrePeriode.samtidigUttak).toEqual(morsPerioder[1].samtidigUttak);

        const tredjePeriode = result[2];
        expect(tredjePeriode.fom).toEqual('2022-02-14');
        expect(tredjePeriode.tom).toEqual('2022-02-18');
        expect(tredjePeriode.kontoType).toEqual(morsPerioder[1].kontoType);
        expect(tredjePeriode.forelder).toEqual(morsPerioder[1].forelder);
        expect(tredjePeriode.samtidigUttak).toEqual(morsPerioder[1].samtidigUttak);

        const fjerdePeriode = result[3];
        expect(fjerdePeriode.fom).toEqual('2022-02-14');
        expect(fjerdePeriode.tom).toEqual('2022-02-18');
        expect(fjerdePeriode.oppholdÅrsak).toEqual(annenPartsUttakIMidten[0].oppholdÅrsak);
        expect(fjerdePeriode.forelder).toEqual(annenPartsUttakIMidten[0].forelder);
        expect(fjerdePeriode.samtidigUttak).toEqual(annenPartsUttakIMidten[0].samtidigUttak);

        const femtePeriode = result[4];
        expect(femtePeriode.fom).toEqual('2022-02-21');
        expect(femtePeriode.tom).toEqual('2022-02-25');
        expect(femtePeriode.kontoType).toEqual(morsPerioder[1].kontoType);
        expect(femtePeriode.forelder).toEqual(morsPerioder[1].forelder);
        expect(femtePeriode.samtidigUttak).toEqual(morsPerioder[1].samtidigUttak);

        expect(result[5]).toEqual(morsPerioder[2]);
    });
    it('Skal dele opp annen parts periode hvis søkerens periode er i midten av perioden', () => {
        const søkerensPerioder: Planperiode[] = [
            {
                id: '0',
                fom: '2022-01-21',
                tom: '2022-01-28',
                kontoType: StønadskontoType.Fellesperiode,
                forelder: Forelder.mor,
                samtidigUttak: 100,
                gjelderAnnenPart: false,
            },
            {
                id: '1',
                fom: '2022-01-31',
                tom: '2022-02-25',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                samtidigUttak: 100,
                gjelderAnnenPart: false,
            },
            {
                id: '2',
                fom: '2022-02-28',
                tom: '2022-04-22',
                kontoType: StønadskontoType.Mødrekvote,
                forelder: Forelder.mor,
                samtidigUttak: 80,
                gjelderAnnenPart: false,
            },
        ];

        const annenPartsUttak: Planperiode[] = [
            {
                id: '4',
                fom: '2022-01-24',
                tom: '2022-03-04',
                forelder: Forelder.farMedmor,
                samtidigUttak: 80,
                gjelderAnnenPart: true,
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
            },
        ];

        const result = settInnAnnenPartsUttak(
            søkerensPerioder,
            annenPartsUttak,
            '2022-01-21',
            førsteUttaksdagNesteBarnsSak,
        );

        expect(result.length).toBe(8);

        const førstePeriode = result[0];
        expect(førstePeriode.fom).toEqual('2022-01-21');
        expect(førstePeriode.tom).toEqual('2022-01-21');
        expect(førstePeriode.kontoType).toEqual(søkerensPerioder[0].kontoType);
        expect(førstePeriode.forelder).toEqual(søkerensPerioder[0].forelder);
        expect(førstePeriode.samtidigUttak).toEqual(søkerensPerioder[0].samtidigUttak);

        const andrePeriode = result[1];
        expect(andrePeriode.fom).toEqual('2022-01-24');
        expect(andrePeriode.tom).toEqual('2022-01-28');
        expect(andrePeriode.kontoType).toEqual(søkerensPerioder[0].kontoType);
        expect(andrePeriode.forelder).toEqual(søkerensPerioder[0].forelder);
        expect(andrePeriode.samtidigUttak).toEqual(søkerensPerioder[0].samtidigUttak);

        const tredjePeriode = result[2];
        expect(tredjePeriode.fom).toEqual('2022-01-24');
        expect(tredjePeriode.tom).toEqual('2022-01-28');
        expect(tredjePeriode.oppholdÅrsak).toEqual(annenPartsUttak[0].oppholdÅrsak);
        expect(tredjePeriode.forelder).toEqual(annenPartsUttak[0].forelder);
        expect(tredjePeriode.samtidigUttak).toEqual(annenPartsUttak[0].samtidigUttak);

        const fjerdePeriode = result[3];
        expect(fjerdePeriode.fom).toEqual('2022-01-31');
        expect(fjerdePeriode.tom).toEqual('2022-02-25');
        expect(fjerdePeriode.kontoType).toEqual(søkerensPerioder[1].kontoType);
        expect(fjerdePeriode.forelder).toEqual(søkerensPerioder[1].forelder);
        expect(fjerdePeriode.samtidigUttak).toEqual(søkerensPerioder[1].samtidigUttak);

        const femtePeriode = result[4];
        expect(femtePeriode.fom).toEqual('2022-01-31');
        expect(femtePeriode.tom).toEqual('2022-02-25');
        expect(femtePeriode.oppholdÅrsak).toEqual(annenPartsUttak[0].oppholdÅrsak);
        expect(femtePeriode.forelder).toEqual(annenPartsUttak[0].forelder);
        expect(femtePeriode.samtidigUttak).toEqual(annenPartsUttak[0].samtidigUttak);

        const sjettePeriode = result[5];
        expect(sjettePeriode.fom).toEqual('2022-02-28');
        expect(sjettePeriode.tom).toEqual('2022-03-04');
        expect(sjettePeriode.kontoType).toEqual(søkerensPerioder[2].kontoType);
        expect(sjettePeriode.forelder).toEqual(søkerensPerioder[2].forelder);
        expect(sjettePeriode.samtidigUttak).toEqual(søkerensPerioder[2].samtidigUttak);

        const syvendePeriode = result[6];
        expect(syvendePeriode.fom).toEqual('2022-02-28');
        expect(syvendePeriode.tom).toEqual('2022-03-04');
        expect(femtePeriode.oppholdÅrsak).toEqual(annenPartsUttak[0].oppholdÅrsak);
        expect(femtePeriode.forelder).toEqual(annenPartsUttak[0].forelder);
        expect(femtePeriode.samtidigUttak).toEqual(annenPartsUttak[0].samtidigUttak);

        const sistePeriode = result[7];
        expect(sistePeriode.fom).toEqual('2022-03-07');
        expect(sistePeriode.tom).toEqual('2022-04-22');
        expect(sistePeriode.kontoType).toEqual(søkerensPerioder[2].kontoType);
        expect(sistePeriode.forelder).toEqual(søkerensPerioder[2].forelder);
        expect(sistePeriode.samtidigUttak).toEqual(søkerensPerioder[2].samtidigUttak);
    });
    it('Skal returnere annen parts uttak hvis søkerens perioder er tomme men det finnes annen parts uttak (førstegangssøknad med annen parts uttak)', () => {
        const kunAnnenPartsUttak: Planperiode[] = [
            {
                id: '0',
                fom: '2022-01-01',
                tom: '2022-02-04',
                forelder: Forelder.farMedmor,
                samtidigUttak: 100,
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                gjelderAnnenPart: true,
            },
        ];

        const result = settInnAnnenPartsUttak([], kunAnnenPartsUttak, '2022-01-21', førsteUttaksdagNesteBarnsSak);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(kunAnnenPartsUttak[0]);
    });
    it(
        'Hvis annen parts uttak overlapper delvis med en utsettelsesperiode' +
            ' (som ikke er fri utsettelse), skal delen til annen part som overlapper bli borte',
        () => {
            const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
                id: '0',
                fom: '2021-01-05',
                tom: '2021-01-06',
                forelder: Forelder.farMedmor,
                gjelderAnnenPart: false,
            };
            const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
                {
                    id: '1',
                    fom: '2021-01-04',
                    tom: '2021-01-07',
                    forelder: Forelder.farMedmor,
                    samtidigUttak: 100,
                    oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                    gjelderAnnenPart: true,
                },
            ];

            const result = settInnAnnenPartsUttak(
                [utsettelseSomOverlapperMedMidtenTilAnnenPart],
                annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
                '2020-12-21',
                førsteUttaksdagNesteBarnsSak,
            );
            expect(result.length).toBe(3);
            expect(result[0].fom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].fom);
            expect(result[0].tom).toEqual('2021-01-04');
            expect(result[1]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
            expect(result[2].fom).toEqual('2021-01-07');
            expect(result[2].tom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].tom);
        },
    );

    it('Hvis en utsettelsesperiode (som ikke er fri utsettelse) overlapper annen parts uttak helt, returner kun utsettelsen', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
            id: '0',
            fom: '2021-01-04',
            tom: '2021-01-07',
            forelder: Forelder.farMedmor,
            gjelderAnnenPart: false,
        };
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
            {
                id: '1',
                fom: '2021-01-05',
                tom: '2021-01-05',
                forelder: Forelder.farMedmor,
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                samtidigUttak: 100,
                gjelderAnnenPart: true,
            },
        ];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            '2020-12-21',
            førsteUttaksdagNesteBarnsSak,
        );
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
    });

    it('Hvis annen parts uttak overlapper starten av utsettelsesperioden (som ikke er fri utsettelse) returner kun delen som ikke overlapper', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
            id: '0',
            fom: '2021-01-04',
            tom: '2021-01-07',
            forelder: Forelder.farMedmor,
            gjelderAnnenPart: false,
        };
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
            {
                id: '1',
                fom: '2021-01-01',
                tom: '2021-01-04',
                forelder: Forelder.farMedmor,
                oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                samtidigUttak: 100,
                gjelderAnnenPart: true,
            },
        ];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            '2020-12-21',
            førsteUttaksdagNesteBarnsSak,
        );
        expect(result.length).toBe(2);
        expect(result[0].fom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].fom);
        expect(result[0].tom).toEqual('2021-01-01');
        expect(result[1]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
    });
    it(
        'Hvis annen parts uttak overlapper slutten av utsettelsesperioden' +
            ' (som ikke er fri utsettelse) returner kun delen som ikke overlapper som infoperiode',
        () => {
            const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
                id: '0',
                fom: '2021-01-04',
                tom: '2021-01-07',
                forelder: Forelder.farMedmor,
                gjelderAnnenPart: false,
            };
            const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
                {
                    id: '1',
                    fom: '2021-01-07',
                    tom: '2021-01-08',
                    forelder: Forelder.farMedmor,
                    oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
                    gjelderAnnenPart: true,
                },
            ];

            const result = settInnAnnenPartsUttak(
                [utsettelseSomOverlapperMedMidtenTilAnnenPart],
                annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
                '2020-12-21',
                førsteUttaksdagNesteBarnsSak,
            );
            expect(result.length).toBe(2);
            expect(result[0]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
            expect(result[1].tom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0].tom);
            expect(result[1].fom).toEqual('2021-01-08');
            expect(result[1].gjelderAnnenPart).toEqual(true);
        },
    );
});
