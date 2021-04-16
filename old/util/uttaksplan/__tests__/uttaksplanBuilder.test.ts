import {
    Utsettelsesperiode,
    Periodetype,
    UtsettelseÅrsakType,
    Periode,
    PeriodeInfoType,
    OppholdÅrsakType,
} from '../../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode, StønadskontoType } from 'common/types';
import {
    splittPeriodeMedHelligdager,
    getFriperioderITidsperiode,
    finnHullIPerioder,
    UttaksplanBuilder,
} from '../builder/UttaksplanBuilder';
import { Perioden } from '../Perioden';
import { PeriodeResultatType } from 'app/types/EksisterendeSak';
import { Uttaksdagen } from '../Uttaksdagen';
import moment from 'moment';

const perioder: Partial<Periode>[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2019-01-01'),
            tom: new Date('2019-01-10'),
        },
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2019-01-11'),
            tom: new Date('2019-01-20'),
        },
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2019-01-21'),
            tom: new Date('2019-01-30'),
        },
    },
];

describe('UttaksplanBuilder', () => {
    describe('splittPeriodeMedHelligdager', () => {
        it('Skal splitte jul 2018 med periodehull korrekt', () => {
            const periode: Utsettelsesperiode = {
                id: 'sdf',
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Ferie,
                tidsperiode: {
                    fom: new Date(2018, 11, 20),
                    tom: new Date(2018, 11, 28),
                },
                forelder: Forelder.mor,
                erArbeidstaker: false,
            };

            const result = splittPeriodeMedHelligdager(periode);
            expect(result.length).toBe(3);
        });
        it('Skal splitte jul og nyttårsaften 2018/2019 med periodehull korrekt', () => {
            const periode: Utsettelsesperiode = {
                id: 'sdf',
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Ferie,
                tidsperiode: {
                    fom: new Date(2018, 11, 20),
                    tom: new Date(2019, 0, 5),
                },
                forelder: Forelder.mor,
                erArbeidstaker: false,
            };

            const result = splittPeriodeMedHelligdager(periode);
            expect(result.length).toBe(5);
        });
    });

    describe('getFriperioderITidsperiode', () => {
        it('Skal finne to friperioder i løpet av jul og nyttår', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2018, 11, 20),
                tom: new Date(2019, 0, 3),
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(2);
        });
        it('Skal finne 0 friperioder i februar 2019', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2019, 1, 1),
                tom: new Date(2019, 1, 27),
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(0);
        });
        it('Skal finne 8 friperioder i 2018', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2018, 0, 1),
                tom: new Date(2018, 11, 31),
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(8);
        });
        it('Skal finne 1. januar 2018', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2017, 11, 31),
                tom: new Date(2018, 0, 2),
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(1);
        });
        it('Skal ikke finne 1. januar 2017 siden det er en helgedag', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2016, 11, 31),
                tom: new Date(2017, 0, 2),
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(0);
        });
    });

    describe('leggTilPeriodeOgBuild', () => {
        const getUttaksstatusFunc = jest.fn().mockReturnValue({
            gjelderDagerBrukt: false,
            uttak: [
                { konto: StønadskontoType.Fellesperiode, dager: 50 },
                { konto: StønadskontoType.Fedrekvote, dager: 50 },
                { konto: StønadskontoType.Mødrekvote, dager: 50 },
            ],
        });

        it('Legge til periode i en tom plan skal fungere', () => {
            const nyPeriode: Partial<Periode> = {
                id: '1',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-31'),
                    tom: new Date('2019-02-10'),
                },
            };

            const eksisterendePlan: Periode[] = [];

            const result = UttaksplanBuilder(
                getUttaksstatusFunc,
                eksisterendePlan,
                new Date('2019-01-31'),
                [{ konto: StønadskontoType.Foreldrepenger, dager: 50 }],
                false,
                false,
                undefined,
                false
            ).leggTilPeriodeOgBuild(nyPeriode as Periode);

            expect(Perioden(result.perioder[0]).erLik(nyPeriode as Periode));
            expect(result.perioder.length).toBe(1);
        });

        it('Søkers perioder skal overskrive andre parts perioder', () => {
            const familiehendelsedato = Uttaksdagen(new Date('2019-01-01'));
            const nyPeriode: Partial<Periode> = {
                id: '2',
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fedrekvote,
                tidsperiode: {
                    fom: familiehendelsedato.denneEllerNeste(),
                    tom: familiehendelsedato.leggTil(4),
                },
                forelder: Forelder.farMedmor,
                ønskerSamtidigUttak: false,
                gradert: false,
            };

            const eksisterendePlan: Periode[] = [
                {
                    type: Periodetype.Info,
                    infotype: PeriodeInfoType.uttakAnnenPart,
                    id: '1',
                    årsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
                    tidsperiode: {
                        fom: familiehendelsedato.denneEllerNeste(),
                        tom: familiehendelsedato.leggTil(9),
                    },
                    forelder: Forelder.mor,
                    overskrives: true,
                    resultatType: PeriodeResultatType.INNVILGET,
                    gradert: false,
                    ønskerSamtidigUttak: false,
                    visPeriodeIPlan: true,
                },
            ];

            const result = UttaksplanBuilder(
                getUttaksstatusFunc,
                eksisterendePlan,
                familiehendelsedato.denneEllerNeste(),
                [
                    { konto: StønadskontoType.Fellesperiode, dager: 50 },
                    { konto: StønadskontoType.Fedrekvote, dager: 50 },
                    { konto: StønadskontoType.Mødrekvote, dager: 50 },
                ],
                false,
                false,
                undefined,
                false,
                [
                    {
                        type: Periodetype.Info,
                        infotype: PeriodeInfoType.uttakAnnenPart,
                        id: '3',
                        årsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
                        tidsperiode: {
                            fom: familiehendelsedato.denneEllerNeste(),
                            tom: familiehendelsedato.leggTil(9),
                        },
                        forelder: Forelder.mor,
                        overskrives: true,
                        resultatType: PeriodeResultatType.INNVILGET,
                        gradert: false,
                        ønskerSamtidigUttak: false,
                        visPeriodeIPlan: true,
                    },
                ]
            ).leggTilPeriodeOgBuild(nyPeriode as Periode);

            expect(result.perioder.length).toBe(2);
            expect(result.perioder[1].type).toEqual(Periodetype.Info);
            expect(result.perioder[1].tidsperiode.fom).toEqual(familiehendelsedato.leggTil(5));
        });
    });

    describe('finnHullIPerioder', () => {
        it('Skal finne hull i en uttaksplan med hull', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-11'),
                    tom: new Date('2019-02-30'),
                },
            };
            const perioderMedHull = [...perioder, nyPeriode];

            const hull = finnHullIPerioder(perioderMedHull as Periode[], false, false);
            expect(hull.length).toBe(1);
            expect(hull[0].tidsperiode.fom).toEqual(new Date('2019-01-31'));
            expect(hull[0].tidsperiode.tom).toEqual(new Date('2019-02-08'));
        });

        it('Skal ikke regne helgedager som hull', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-31'),
                    tom: new Date('2019-02-01'),
                },
            };
            const nyPeriode2: Partial<Periode> = {
                id: '5',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-04'),
                    tom: new Date('2019-02-08'),
                },
            };
            const perioderMedHull = [...perioder, nyPeriode, nyPeriode2];

            const hull = finnHullIPerioder(perioderMedHull as Periode[], false, false);
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull i en uttaksplan uten hull', () => {
            const hull = finnHullIPerioder(perioder as Periode[], false, false);
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull i en tom uttaksplan', () => {
            const hull = finnHullIPerioder([], false, false);
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull hvis det gjelder endringssøknad uten eksisterende sak', () => {
            const hull = finnHullIPerioder(
                [
                    {
                        id: '5',
                        type: Periodetype.Uttak,
                        tidsperiode: {
                            fom: new Date('2019-02-04'),
                            tom: new Date('2019-02-08'),
                        },
                    },
                ] as Periode[],
                true,
                false,
                moment('2018-01-01').toDate()
            );
            expect(hull.length).toEqual(0);
        });

        it('Skal finne hull hvis det er avvik i startdato og første dag med uttak', () => {
            const hull = finnHullIPerioder(
                [
                    {
                        id: '1',
                        type: Periodetype.Uttak,
                        tidsperiode: {
                            fom: new Date('2019-02-04'),
                            tom: new Date('2019-02-08'),
                        },
                    },
                ] as Periode[],
                false,
                false,
                new Date('2019-01-30')
            );

            expect(hull.length).toEqual(1);
            expect(hull[0].tidsperiode.fom).toEqual(new Date('2019-01-30'));
            expect(hull[0].tidsperiode.tom).toEqual(new Date('2019-02-01'));
        });
    });
});
