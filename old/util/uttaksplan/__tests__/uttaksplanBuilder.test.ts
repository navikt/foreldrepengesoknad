import {
    Utsettelsesperiode,
    Periodetype,
    UtsettelseÅrsakType,
    Periode,
    PeriodeInfoType,
    OppholdÅrsakType,
    TilgjengeligStønadskonto,
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

    const eksisterendePlanOkt2021TilFeb2022: Partial<Periode>[] = [
        {
            type: Periodetype.Uttak,
            id: '0',
            tidsperiode: {
                fom: new Date('2021-10-01'),
                tom: new Date('2021-10-26'),
            },
            forelder: Forelder.mor,
            resultatType: PeriodeResultatType.INNVILGET,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            skalIkkeHaUttakFørTermin: false,
        },
        {
            type: Periodetype.Uttak,
            id: '1',
            tidsperiode: {
                fom: new Date('2021-10-27'),
                tom: new Date('2022-02-08'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
            gradert: false,
            ønskerSamtidigUttak: false,
        },
        {
            type: Periodetype.Uttak,
            id: '2',
            tidsperiode: {
                fom: new Date('2022-02-09'),
                tom: new Date('2022-02-10'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fedrekvote,
            gradert: false,
            ønskerSamtidigUttak: false,
        },
    ];

    const tilgjengeligeStønadskontoer = [
        { konto: StønadskontoType.Fellesperiode, dager: 50 },
        { konto: StønadskontoType.Fedrekvote, dager: 50 },
        { konto: StønadskontoType.Mødrekvote, dager: 50 },
    ];
    const familiehendelsedatoForPlan = new Date('2021-10-27');

    const getUttaksstatusFunc = jest.fn().mockReturnValue({
        gjelderDagerBrukt: false,
        uttak: tilgjengeligeStønadskontoer,
    });

    const getTestUttaksplanBuilder = (
        eksisterendePlan: Periode[],
        familiehendelsedato: Date,
        stønadskontoer: TilgjengeligStønadskonto[],
        opprinneligPlan?: Periode[]
    ) => {
        return UttaksplanBuilder(
            getUttaksstatusFunc,
            eksisterendePlan,
            familiehendelsedato,
            stønadskontoer,
            false,
            false,
            undefined,
            false,
            false,
            false,
            opprinneligPlan
        );
    };

    describe('leggTilPeriodeOgBuild', () => {
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

            const result = getTestUttaksplanBuilder(eksisterendePlan, new Date('2019-01-31'), [
                { konto: StønadskontoType.Foreldrepenger, dager: 50 },
            ]).leggTilPeriodeOgBuild(nyPeriode as Periode);

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

            const result = getTestUttaksplanBuilder(
                eksisterendePlan,
                familiehendelsedato.denneEllerNeste(),
                tilgjengeligeStønadskontoer,
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
            expect(result.perioder[0].type).toEqual(Periodetype.Uttak);
            expect(result.perioder[1].type).toEqual(Periodetype.Info);
            expect(result.perioder[0].tidsperiode.tom).toEqual(familiehendelsedato.leggTil(4));
            expect(result.perioder[1].tidsperiode.fom).toEqual(familiehendelsedato.leggTil(5));
        });

        it('Skal vise riktige datoer for perioder når en ny uttsettelsesperiode legges til på sluttdatoen til en annen periode', () => {
            const familiehendelsedato = new Date('2021-11-29');
            const eksisterendePlan: Partial<Periode>[] = [
                {
                    type: Periodetype.Uttak,
                    id: '0',
                    tidsperiode: {
                        fom: new Date('2021-11-01'),
                        tom: new Date('2021-11-28'),
                    },
                    forelder: Forelder.mor,
                    resultatType: PeriodeResultatType.INNVILGET,
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    skalIkkeHaUttakFørTermin: false,
                },
                {
                    type: Periodetype.Uttak,
                    konto: StønadskontoType.Mødrekvote,
                    id: '1',
                    tidsperiode: {
                        fom: new Date('2021-11-29'),
                        tom: new Date('2022-01-10'),
                    },
                    forelder: Forelder.mor,

                    gradert: false,
                    ønskerSamtidigUttak: false,
                },
                {
                    type: Periodetype.Uttak,
                    konto: StønadskontoType.Fedrekvote,
                    id: '2',
                    tidsperiode: {
                        fom: new Date('2022-01-11'),
                        tom: new Date('2022-01-18'),
                    },
                    forelder: Forelder.mor,

                    gradert: false,
                    ønskerSamtidigUttak: false,
                },
            ];

            const nyPeriodeISluttenAvAnnenPeriode: Partial<Periode> = {
                id: '3',
                type: Periodetype.Utsettelse,
                tidsperiode: {
                    fom: new Date('2022-01-10'),
                    tom: new Date('2022-01-17'),
                },
            };

            const result = getTestUttaksplanBuilder(
                eksisterendePlan as Periode[],
                familiehendelsedato,
                tilgjengeligeStønadskontoer
            ).leggTilPeriodeOgBuild(nyPeriodeISluttenAvAnnenPeriode as Periode);

            expect(result.perioder[1].tidsperiode.tom).toEqual(new Date('2022-01-07'));
            expect(result.perioder[2].type).toEqual(Periodetype.Utsettelse);
            expect(result.perioder[2].tidsperiode.fom).toEqual(new Date('2022-01-10'));
            expect(result.perioder[2].tidsperiode.tom).toEqual(new Date('2022-01-17'));
            expect(result.perioder[3].tidsperiode.fom).toEqual(new Date('2022-01-18'));
            expect(result.perioder[3].tidsperiode.tom).toEqual(new Date('2022-01-18'));
            expect(result.perioder[4].tidsperiode.fom).toEqual(new Date('2022-01-19'));
            expect(result.perioder[4].tidsperiode.tom).toEqual(new Date('2022-01-26'));
        });

        it('Skal vise riktige datoer for perioder når en ny uttsettelsesperiode legges til midt i en annen periode', () => {
            const nyPeriodeMidtIAnnenPeriode: Partial<Periode> = {
                id: '3',
                type: Periodetype.Utsettelse,
                tidsperiode: {
                    fom: new Date('2022-01-31'),
                    tom: new Date('2022-02-08'),
                },
            };

            const result = getTestUttaksplanBuilder(
                eksisterendePlanOkt2021TilFeb2022 as Periode[],
                familiehendelsedatoForPlan,
                tilgjengeligeStønadskontoer
            ).leggTilPeriodeOgBuild(nyPeriodeMidtIAnnenPeriode as Periode);

            expect(result.perioder[1].tidsperiode.tom).toEqual(new Date('2022-01-28'));
            expect(result.perioder[2].type).toEqual(Periodetype.Utsettelse);
            expect(result.perioder[2].tidsperiode.fom).toEqual(new Date('2022-01-31'));
            expect(result.perioder[2].tidsperiode.tom).toEqual(new Date('2022-02-08'));
            expect(result.perioder[3].tidsperiode.fom).toEqual(new Date('2022-02-09'));
            expect(result.perioder[3].tidsperiode.tom).toEqual(new Date('2022-02-17'));
            expect(result.perioder[4].tidsperiode.fom).toEqual(new Date('2022-02-18'));
            expect(result.perioder[4].tidsperiode.tom).toEqual(new Date('2022-02-21'));
        });

        it('Skal vise riktige datoer for perioder når en ny uttsettelsesperiode legges til på startdatoen til en annen periode', () => {
            const nyPeriodeIStartenAvAnnenPeriode: Partial<Periode> = {
                id: '3',
                type: Periodetype.Utsettelse,
                tidsperiode: {
                    fom: new Date('2021-10-27'),
                    tom: new Date('2022-02-09'),
                },
            };

            const result = getTestUttaksplanBuilder(
                eksisterendePlanOkt2021TilFeb2022 as Periode[],
                familiehendelsedatoForPlan,
                tilgjengeligeStønadskontoer
            ).leggTilPeriodeOgBuild(nyPeriodeIStartenAvAnnenPeriode as Periode);

            expect(result.perioder[0].tidsperiode.tom).toEqual(new Date('2021-10-26'));
            expect(result.perioder[1].type).toEqual(Periodetype.Utsettelse);
            expect(result.perioder[1].tidsperiode.fom).toEqual(new Date('2021-10-27'));
            expect(result.perioder[1].tidsperiode.tom).toEqual(new Date('2022-02-09'));
            expect(result.perioder[2].tidsperiode.fom).toEqual(new Date('2022-02-10'));
            expect(result.perioder[2].tidsperiode.tom).toEqual(new Date('2022-05-25'));
            expect(result.perioder[3].tidsperiode.fom).toEqual(new Date('2022-05-26'));
            expect(result.perioder[3].tidsperiode.tom).toEqual(new Date('2022-05-27'));
        });
    });

    describe('slettPeriodeOgBuild', () => {
        it('Skal erstatte slettet periode med hull på 30 dager og påfølgende periode uten uttak', () => {
            const slettPeriode = eksisterendePlanOkt2021TilFeb2022[1];
            const result = getTestUttaksplanBuilder(
                eksisterendePlanOkt2021TilFeb2022 as Periode[],
                familiehendelsedatoForPlan,
                tilgjengeligeStønadskontoer
            ).slettPeriodeOgBuild(slettPeriode as Periode);
            expect(result.perioder.length).toBe(4);
            expect(Perioden(result.perioder[0]).erLik(eksisterendePlanOkt2021TilFeb2022[0] as Periode));
            expect(result.perioder[1].type).toEqual(Periodetype.Hull);
            expect(result.perioder[1].tidsperiode.fom).toEqual(new Date('2021-10-27'));
            expect(result.perioder[1].tidsperiode.tom).toEqual(new Date('2021-12-07'));
            expect(result.perioder[2].type).toEqual(Periodetype.PeriodeUtenUttak);
            expect(result.perioder[2].tidsperiode.fom).toEqual(new Date('2021-12-08'));
            expect(result.perioder[2].tidsperiode.tom).toEqual(new Date('2022-02-08'));
            expect(result.perioder[3].type).toEqual(Periodetype.Uttak);
            expect(result.perioder[3].tidsperiode.fom).toEqual(new Date('2022-02-09'));
        });
        it('Skal slette siste periode helt fra planen', () => {
            const sistePeriode = eksisterendePlanOkt2021TilFeb2022[2];
            const result = getTestUttaksplanBuilder(
                eksisterendePlanOkt2021TilFeb2022 as Periode[],
                familiehendelsedatoForPlan,
                tilgjengeligeStønadskontoer
            ).slettPeriodeOgBuild(sistePeriode as Periode);
            expect(result.perioder.length).toBe(eksisterendePlanOkt2021TilFeb2022.length - 1);
        });
    });

    describe('oppdaterPeriodeOgBuild', () => {
        it('Skal gi feil hvis oppdatert periode ikke finnes', () => {
            const endrePeriode = { ...eksisterendePlanOkt2021TilFeb2022[1], id: 'NotFound' };
            const oppdaterPeriodeOgBuildFunction = () => {
                return getTestUttaksplanBuilder(
                    eksisterendePlanOkt2021TilFeb2022 as Periode[],
                    familiehendelsedatoForPlan,
                    tilgjengeligeStønadskontoer
                ).oppdaterPeriodeOgBuild(endrePeriode as Periode);
            };
            expect(oppdaterPeriodeOgBuildFunction).toThrow('Periode for endring ikke funnet');
        });
        it('Skal oppdatere periode datoer, gi hull periode før og periode uten uttak etter oppdatert periode', () => {
            const endrePeriode = {
                ...eksisterendePlanOkt2021TilFeb2022[1],
                tidsperiode: {
                    fom: new Date('2021-10-28'),
                    tom: new Date('2022-02-07'),
                },
            };
            const result = getTestUttaksplanBuilder(
                eksisterendePlanOkt2021TilFeb2022 as Periode[],
                familiehendelsedatoForPlan,
                tilgjengeligeStønadskontoer
            ).oppdaterPeriodeOgBuild(endrePeriode as Periode);
            expect(result.perioder.length).toEqual(5);
            expect(result.perioder[1].tidsperiode.fom).toEqual(new Date('2021-10-27'));
            expect(result.perioder[1].tidsperiode.tom).toEqual(new Date('2021-10-27'));
            expect(result.perioder[1].type).toEqual(Periodetype.Hull);
            expect(result.perioder[2].tidsperiode.fom).toEqual(endrePeriode.tidsperiode.fom);
            expect(result.perioder[2].tidsperiode.tom).toEqual(endrePeriode.tidsperiode.tom);
            expect(result.perioder[3].type).toEqual(Periodetype.PeriodeUtenUttak);
            expect(result.perioder[3].tidsperiode.fom).toEqual(new Date('2022-02-08'));
            expect(result.perioder[3].tidsperiode.tom).toEqual(new Date('2022-02-08'));
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

            const hull = finnHullIPerioder(
                perioderMedHull as Periode[],
                false,
                false,
                false,
                false,
                new Date('2019-01-01'),
                false
            );
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

            const hull = finnHullIPerioder(
                perioderMedHull as Periode[],
                false,
                false,
                false,
                false,
                new Date('2019-01-01'),
                false
            );
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull i en uttaksplan uten hull', () => {
            const hull = finnHullIPerioder(
                perioder as Periode[],
                false,
                false,
                false,
                false,
                new Date('2019-01-01'),
                false
            );
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull i en tom uttaksplan', () => {
            const hull = finnHullIPerioder([], false, false, false, false, new Date('2019-01-01'), false);
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
                false,
                false,
                moment('2018-01-01').toDate(),
                false
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
                false,
                false,
                new Date('2019-01-30'),
                false,
                new Date('2019-01-30')
            );

            expect(hull.length).toEqual(1);
            expect(hull[0].tidsperiode.fom).toEqual(new Date('2019-01-30'));
            expect(hull[0].tidsperiode.tom).toEqual(new Date('2019-02-01'));
        });
    });
});
