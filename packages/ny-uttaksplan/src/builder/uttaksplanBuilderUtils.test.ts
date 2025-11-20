import { omitOne } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { settInnAnnenPartsUttak, slåSammenLikePerioder } from './uttaksplanbuilderUtils';

const perioder: Planperiode[] = [
    {
        erAnnenPartEøs: false,
        id: '1',
        fom: '2022-07-21',
        tom: '2022-08-31',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FORELDREPENGER',
        morsAktivitet: 'IKKE_OPPGITT',
        readOnly: false,
    },
    {
        erAnnenPartEøs: false,
        id: '2',
        fom: '2022-09-01',
        tom: '2022-09-14',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FORELDREPENGER',
        morsAktivitet: 'IKKE_OPPGITT',
        readOnly: false,
    },
];

describe('uttaksplanbuilderUtils - slåSammenLikePerioder', () => {
    it('slåSammenLikePerioder - skal slå sammen like perioder riktig', () => {
        const result = slåSammenLikePerioder(perioder, '2022-07-21', undefined);
        expect(result.length).toEqual(1);
        expect(result[0]!.fom).toBe(perioder[0]!.fom);
        expect(result[0]!.tom).toBe(perioder[1]!.tom);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen like perioder hvis det er en dag imellom de', () => {
        const perioder2: Planperiode[] = [perioder[0]!, { ...perioder[1]!, fom: '2022-09-02', tom: perioder[1]!.tom }];
        const result = slåSammenLikePerioder(perioder2, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellige foreldre', () => {
        const perioder3 = [perioder[0]!, { ...perioder[1]!, forelder: 'MOR' as const }];
        const result = slåSammenLikePerioder(perioder3, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig konto', () => {
        const perioder4 = [perioder[0]!, { ...perioder[1]!, konto: 'FEDREKVOTE' }];
        const result = slåSammenLikePerioder(perioder4, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig samtidig uttak verdi', () => {
        const perioder5 = [perioder[0]!, { ...perioder[1]!, samtidigUttak: 50 }];
        const result = slåSammenLikePerioder(perioder5, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig gradering verdi', () => {
        const perioder6 = [perioder[0]!, { ...perioder[1]!, gradert: true }];
        const result = slåSammenLikePerioder(perioder6, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig ønskerFlerbarnsdager verdi', () => {
        const perioder7 = [perioder[0]!, { ...perioder[1]!, ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder7, '2022-07-21', undefined);
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig erMorForSyk verdi', () => {
        const perioder8 = [perioder[0]!, { ...perioder[1]!, ønskerFlerbarnsdager: true }];
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
                erAnnenPartEøs: false,
                id: '0',
                fom: '2022-01-21',
                tom: '2022-01-28',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                samtidigUttak: 100,
                readOnly: false,
            },
            {
                erAnnenPartEøs: false,
                id: '1',
                fom: '2022-01-31',
                tom: '2022-02-25',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 50,
                readOnly: false,
            },
            {
                erAnnenPartEøs: false,
                id: '2',
                fom: '2022-02-28',
                tom: '2022-04-22',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 70,
                readOnly: false,
            },
        ];

        const annenPartsUttakIMidten: Planperiode[] = [
            {
                erAnnenPartEøs: false,
                id: '4',
                fom: '2022-02-14',
                tom: '2022-02-18',
                forelder: 'FAR_MEDMOR',
                readOnly: true,
                samtidigUttak: 100,
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
            },
        ];

        const result = settInnAnnenPartsUttak(
            morsPerioder,
            annenPartsUttakIMidten,
            '2022-01-21',
            førsteUttaksdagNesteBarnsSak,
        );

        expect(result.length).toBe(6);
        expect(result[0]).toEqual(morsPerioder[0]!);

        const andrePeriode = result[1]!;
        expect(andrePeriode.fom).toEqual('2022-01-31');
        expect(andrePeriode.tom).toEqual('2022-02-11');
        expect(andrePeriode.kontoType).toEqual(morsPerioder[1]!.kontoType);
        expect(andrePeriode.erAnnenPartEøs).toEqual(morsPerioder[1]!.erAnnenPartEøs);
        erForeldreLike(andrePeriode, morsPerioder[1]!);

        const tredjePeriode = result[2]!;
        expect(tredjePeriode.fom).toEqual('2022-02-14');
        expect(tredjePeriode.tom).toEqual('2022-02-18');
        expect(tredjePeriode.kontoType).toEqual(morsPerioder[1]!.kontoType);
        expect(tredjePeriode.erAnnenPartEøs).toEqual(morsPerioder[1]!.erAnnenPartEøs);
        erForeldreLike(tredjePeriode, morsPerioder[1]!);

        const fjerdePeriode = result[3]!;
        expect(fjerdePeriode.fom).toEqual('2022-02-14');
        expect(fjerdePeriode.tom).toEqual('2022-02-18');
        expect(fjerdePeriode.erAnnenPartEøs).toEqual(morsPerioder[1]!.erAnnenPartEøs);
        erForeldreLike(fjerdePeriode, annenPartsUttakIMidten[0]!);

        const femtePeriode = result[4]!;
        expect(femtePeriode.fom).toEqual('2022-02-21');
        expect(femtePeriode.tom).toEqual('2022-02-25');
        expect(femtePeriode.kontoType).toEqual(morsPerioder[1]!.kontoType);
        expect(femtePeriode.erAnnenPartEøs).toEqual(morsPerioder[1]!.erAnnenPartEøs);
        erForeldreLike(femtePeriode, morsPerioder[1]!);

        expect(result[5]).toEqual(morsPerioder[2]!);
    });

    it('Skal dele opp annen parts periode hvis søkerens periode er i midten av perioden', () => {
        const søkerensPerioder: Planperiode[] = [
            {
                erAnnenPartEøs: false,
                id: '0',
                fom: '2022-01-21',
                tom: '2022-01-28',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                samtidigUttak: 100,
                readOnly: false,
            },
            {
                erAnnenPartEøs: false,
                id: '1',
                fom: '2022-01-31',
                tom: '2022-02-25',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 100,
                readOnly: false,
            },
            {
                erAnnenPartEøs: false,
                id: '2',
                fom: '2022-02-28',
                tom: '2022-04-22',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 80,
                readOnly: false,
            },
        ];

        const annenPartsUttak: Planperiode[] = [
            {
                erAnnenPartEøs: false,
                id: '4',
                fom: '2022-01-24',
                tom: '2022-03-04',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 80,
                readOnly: true,
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
            },
        ];

        const result = settInnAnnenPartsUttak(
            søkerensPerioder,
            annenPartsUttak,
            '2022-01-21',
            førsteUttaksdagNesteBarnsSak,
        );

        expect(result.length).toBe(8);

        const førstePeriode = result[0]!;
        expect(førstePeriode.fom).toEqual('2022-01-21');
        expect(førstePeriode.tom).toEqual('2022-01-21');
        expect(førstePeriode.kontoType).toEqual(søkerensPerioder[0]!.kontoType);
        expect(førstePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        erForeldreLike(førstePeriode, søkerensPerioder[0]!);

        const andrePeriode = result[1]!;
        expect(andrePeriode.fom).toEqual('2022-01-24');
        expect(andrePeriode.tom).toEqual('2022-01-28');
        expect(andrePeriode.kontoType).toEqual(søkerensPerioder[0]!.kontoType);
        expect(andrePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        erForeldreLike(andrePeriode, søkerensPerioder[0]!);

        const tredjePeriode = result[2]!;
        expect(tredjePeriode.fom).toEqual('2022-01-24');
        expect(tredjePeriode.tom).toEqual('2022-01-28');
        expect(tredjePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        erForeldreLike(tredjePeriode, annenPartsUttak[0]!);

        const fjerdePeriode = result[3]!;
        expect(fjerdePeriode.fom).toEqual('2022-01-31');
        expect(fjerdePeriode.tom).toEqual('2022-02-25');
        expect(fjerdePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        expect(fjerdePeriode.kontoType).toEqual(søkerensPerioder[1]!.kontoType);
        erForeldreLike(fjerdePeriode, søkerensPerioder[1]!);

        const femtePeriode = result[4]!;
        expect(femtePeriode.fom).toEqual('2022-01-31');
        expect(femtePeriode.tom).toEqual('2022-02-25');
        erForeldreLike(femtePeriode, annenPartsUttak[0]!);

        const sjettePeriode = result[5]!;
        expect(sjettePeriode.fom).toEqual('2022-02-28');
        expect(sjettePeriode.tom).toEqual('2022-03-04');
        expect(sjettePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        expect(sjettePeriode.kontoType).toEqual(søkerensPerioder[2]!.kontoType);
        erForeldreLike(sjettePeriode, søkerensPerioder[2]!);

        const syvendePeriode = result[6]!;
        expect(syvendePeriode.fom).toEqual('2022-02-28');
        expect(syvendePeriode.tom).toEqual('2022-03-04');
        expect(syvendePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        erForeldreLike(femtePeriode, annenPartsUttak[0]!);

        const sistePeriode = result[7]!;
        expect(sistePeriode.fom).toEqual('2022-03-07');
        expect(sistePeriode.tom).toEqual('2022-04-22');
        expect(sistePeriode.erAnnenPartEøs).toEqual(søkerensPerioder[0]!.erAnnenPartEøs);
        expect(sistePeriode.kontoType).toEqual(søkerensPerioder[2]!.kontoType);
        erForeldreLike(sistePeriode, søkerensPerioder[2]!);
    });
    it('Skal returnere annen parts uttak hvis søkerens perioder er tomme men det finnes annen parts uttak (førstegangssøknad med annen parts uttak)', () => {
        const kunAnnenPartsUttak: Planperiode[] = [
            {
                erAnnenPartEøs: false,
                id: '0',
                fom: '2022-01-01',
                tom: '2022-02-04',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 100,
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                readOnly: true,
            },
        ];

        const result = settInnAnnenPartsUttak([], kunAnnenPartsUttak, '2022-01-21', førsteUttaksdagNesteBarnsSak);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(kunAnnenPartsUttak[0]!);
    });
    it(
        'Hvis annen parts uttak overlapper delvis med en utsettelsesperiode' +
            ' (som ikke er fri utsettelse), skal delen til annen part som overlapper bli borte',
        () => {
            const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
                erAnnenPartEøs: false,
                id: '0',
                fom: '2021-01-05',
                tom: '2021-01-06',
                forelder: 'FAR_MEDMOR',
                readOnly: false,
            };
            const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
                {
                    erAnnenPartEøs: false,
                    id: '1',
                    fom: '2021-01-04',
                    tom: '2021-01-07',
                    forelder: 'FAR_MEDMOR',
                    samtidigUttak: 100,
                    oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                    readOnly: true,
                },
            ];

            const result = settInnAnnenPartsUttak(
                [utsettelseSomOverlapperMedMidtenTilAnnenPart],
                annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
                '2020-12-21',
                førsteUttaksdagNesteBarnsSak,
            );
            expect(result.length).toBe(3);
            expect(result[0]!.fom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0]!.fom);
            expect(result[0]!.tom).toEqual('2021-01-04');
            expect(result[1]).toEqual(utsettelseSomOverlapperMedMidtenTilAnnenPart);
            expect(result[2]!.fom).toEqual('2021-01-07');
            expect(result[2]!.tom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0]!.tom);
        },
    );

    it('Hvis en utsettelsesperiode (som ikke er fri utsettelse) overlapper annen parts uttak helt, returner kun utsettelsen', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
            erAnnenPartEøs: false,
            id: '0',
            fom: '2021-01-04',
            tom: '2021-01-07',
            forelder: 'FAR_MEDMOR',
            readOnly: false,
        };
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
            {
                erAnnenPartEøs: false,
                id: '1',
                fom: '2021-01-05',
                tom: '2021-01-05',
                forelder: 'FAR_MEDMOR',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                samtidigUttak: 100,
                readOnly: true,
            },
        ];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            '2020-12-21',
            førsteUttaksdagNesteBarnsSak,
        );
        expect(result.length).toBe(1);
        expect(omitOne(result[0]!, 'id')).toEqual(omitOne(utsettelseSomOverlapperMedMidtenTilAnnenPart, 'id'));
    });

    it('Hvis annen parts uttak overlapper starten av utsettelsesperioden (som ikke er fri utsettelse) returner kun delen som ikke overlapper', () => {
        const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
            erAnnenPartEøs: false,
            id: '0',
            fom: '2021-01-04',
            tom: '2021-01-07',
            forelder: 'MOR',
            readOnly: false,
            utsettelseÅrsak: 'ARBEID',
        };
        const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
            {
                erAnnenPartEøs: false,
                id: '1',
                fom: '2021-01-01',
                tom: '2021-01-04',
                forelder: 'FAR_MEDMOR',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                samtidigUttak: 100,
                readOnly: true,
            },
        ];

        const result = settInnAnnenPartsUttak(
            [utsettelseSomOverlapperMedMidtenTilAnnenPart],
            annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
            '2020-12-21',
            førsteUttaksdagNesteBarnsSak,
        );

        expect(result.length).toBe(2);
        expect(result[0]!.fom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0]!.fom);
        expect(result[0]!.tom).toEqual('2021-01-01');
        expect(omitOne(result[1]!, 'id')).toEqual(omitOne(utsettelseSomOverlapperMedMidtenTilAnnenPart, 'id'));
    });
    it(
        'Hvis annen parts uttak overlapper slutten av utsettelsesperioden' +
            ' (som ikke er fri utsettelse) returner kun delen som ikke overlapper som infoperiode',
        () => {
            const utsettelseSomOverlapperMedMidtenTilAnnenPart: Planperiode = {
                erAnnenPartEøs: false,
                id: '0',
                fom: '2021-01-04',
                tom: '2021-01-07',
                forelder: 'FAR_MEDMOR',
                readOnly: false,
            };
            const annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode: Planperiode[] = [
                {
                    erAnnenPartEøs: false,
                    id: '1',
                    fom: '2021-01-07',
                    tom: '2021-01-08',
                    forelder: 'FAR_MEDMOR',
                    oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                    readOnly: true,
                },
            ];

            const result = settInnAnnenPartsUttak(
                [utsettelseSomOverlapperMedMidtenTilAnnenPart],
                annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode,
                '2020-12-21',
                førsteUttaksdagNesteBarnsSak,
            );
            expect(result.length).toBe(2);
            expect(omitOne(result[0]!, 'id')).toEqual(omitOne(utsettelseSomOverlapperMedMidtenTilAnnenPart, 'id'));
            expect(result[1]!.tom).toEqual(annenPartsUttakSomStarterFørOgSlutterEtterSøkernsPeriode[0]!.tom);
            expect(result[1]!.fom).toEqual('2021-01-08');
            expect(result[1]!.readOnly).toEqual(true);
        },
    );

    const erForeldreLike = (periode1: Planperiode, periode2: Planperiode) => {
        expect(periode1.erAnnenPartEøs).toEqual(periode2.erAnnenPartEøs);
        if (!periode1.erAnnenPartEøs && !periode2.erAnnenPartEøs) {
            expect(periode1.oppholdÅrsak).toEqual(periode2.oppholdÅrsak);
            expect(periode1.forelder).toEqual(periode2.forelder);
            expect(periode1.samtidigUttak).toEqual(periode2.samtidigUttak);
        }
    };
});
