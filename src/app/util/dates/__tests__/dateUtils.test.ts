import {
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    date5DaysAhead,
    dateMoreThan1YearAgo,
    dateMoreThan1YearAhead,
    dateMoreThan3YearsAgo,
    today,
    tomorrow,
    date15YearsAnd3MonthsAgo,
    dateMoreThan15YearsAnd3MonthsAgo,
    yesterday,
} from '../../validation/values';
import {
    dateIs1YearAheadOrLess,
    dateIs1YearAgoOrLess,
    dateIs3YearsAgoOrLess,
    dateIsNotInFuture,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    timeintervalsOverlap,
    dateIs15YearsAnd3MonthsAgoOrLess,
    dateIsTodayOrInFuture,
    dateIsInThePast,
    getEndringstidspunkt,
} from '../dates';
import {
    Periode,
    Uttaksperiode,
    Periodetype,
    PeriodeHull,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
} from 'app/types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';

const opprinneligPlan: Partial<Periode>[] = [
    {
        id: '2203724966-2284-5396-14729-8277157806438',
        tidsperiode: {
            fom: new Date('2019-09-10T00:00:00.000Z'),
            tom: new Date('2019-09-30T00:00:00.000Z'),
        },
        type: Periodetype.Uttak,
    },
    {
        id: '96519825-01917-7239-1861-16148140669135',
        tidsperiode: {
            fom: new Date('2019-10-01T00:00:00.000Z'),
            tom: new Date('2020-01-13T00:00:00.000Z'),
        },
        type: Periodetype.Uttak,
    },
    {
        id: '3105926427-6496-7446-7246-02332065872239',
        tidsperiode: {
            fom: new Date('2020-01-14T00:00:00.000Z'),
            tom: new Date('2020-05-04T00:00:00.000Z'),
        },
        type: Periodetype.Uttak,
    },
];

describe('dateUtils', () => {
    it('dateIsNotInFuture', () => {
        expect(dateIsNotInFuture(tomorrow.toDate())).toBe(false);
        expect(dateIsNotInFuture(today.toDate())).toBe(true);
    });

    it('dateIsTodayOrInFuture', () => {
        expect(dateIsTodayOrInFuture(tomorrow.toDate())).toBe(true);
        expect(dateIsTodayOrInFuture(today.toDate())).toBe(true);
        expect(dateIsTodayOrInFuture(yesterday.toDate())).toBe(false);
    });

    it('dateIsInThePast', () => {
        expect(dateIsInThePast(tomorrow.toDate())).toBe(false);
        expect(dateIsInThePast(today.toDate())).toBe(false);
        expect(dateIsInThePast(yesterday.toDate())).toBe(true);
    });

    it('dateIs3YearsAgoOrLess', () => {
        expect(dateIs3YearsAgoOrLess(dateMoreThan3YearsAgo.toDate())).toBe(false);
        expect(dateIs3YearsAgoOrLess(date3YearsAgo.toDate())).toBe(true);
    });

    it('dateIs15YearsAnd15yearsAnd3MonthsAgoOrLess', () => {
        expect(dateIs15YearsAnd3MonthsAgoOrLess(dateMoreThan15YearsAnd3MonthsAgo.toDate())).toBe(false);
        expect(dateIs15YearsAnd3MonthsAgoOrLess(date15YearsAnd3MonthsAgo.toDate())).toBe(true);
    });

    it('dateIs1YearAheadOrLess', () => {
        expect(dateIs1YearAheadOrLess(dateMoreThan1YearAhead.toDate())).toBe(false);
        expect(dateIs1YearAheadOrLess(date1YearAhead.toDate())).toBe(true);
    });

    it('dateIs1YearAgoOrLess', () => {
        expect(dateIs1YearAgoOrLess(dateMoreThan1YearAgo.toDate())).toBe(false);
        expect(dateIs1YearAgoOrLess(date1YearAgo.toDate())).toBe(true);
    });

    it('dateIsSameOrBefore', () => {
        expect(dateIsSameOrBefore(today.toDate(), today.toDate())).toBe(true);
        expect(dateIsSameOrBefore(today.toDate(), tomorrow.toDate())).toBe(true);
        expect(dateIsSameOrBefore(tomorrow.toDate(), today.toDate())).toBe(false);
    });

    it('dateIsSameOrAfter', () => {
        expect(dateIsSameOrAfter(today.toDate(), today.toDate())).toBe(true);
        expect(dateIsSameOrAfter(tomorrow.toDate(), today.toDate())).toBe(true);
        expect(dateIsSameOrAfter(today.toDate(), tomorrow.toDate())).toBe(false);
    });

    it('timeintervalsOverlap', () => {
        const fixedIntervals = [{ fom: today.toDate(), tom: date5DaysAhead.toDate() }];
        const overlap1 = {
            fom: date1YearAgo.toDate(),
            tom: tomorrow.toDate(),
        };
        const overlap2 = { fom: today.toDate(), tom: date5DaysAhead.toDate() };
        const overlap3 = { fom: date5DaysAhead.toDate(), tom: date1YearAhead.toDate() };
        const noOverlap = { fom: date3YearsAgo.toDate(), tom: date1YearAgo.toDate() };

        expect(timeintervalsOverlap(overlap1, fixedIntervals)).toBe(true);
        expect(timeintervalsOverlap(overlap2, fixedIntervals)).toBe(true);
        expect(timeintervalsOverlap(overlap3, fixedIntervals)).toBe(true);
        expect(timeintervalsOverlap(noOverlap, fixedIntervals)).toBe(false);
    });
});

describe('getEndringstidspunkt', () => {
    it('Skal returnere undefined hvis ikke endringssøknad', () => {
        const endringstidspunkt = getEndringstidspunkt(undefined, [], false);

        expect(endringstidspunkt).toBe(undefined);
    });

    it('Skal returnere undefined for ingen endringer', () => {
        const endringstidspunkt = getEndringstidspunkt(
            opprinneligPlan as Periode[],
            [...opprinneligPlan] as Periode[],
            true
        );

        expect(endringstidspunkt).toBe(undefined);
    });

    it('Skal finne endringstidspunkt gitt at det er endringer', () => {
        const gradertPeriode: Partial<Uttaksperiode> = {
            id: guid(),
            tidsperiode: {
                fom: new Date('2020-05-05'),
                tom: new Date('2020-05-08'),
            },
            type: Periodetype.Uttak,
            gradert: true,
            stillingsprosent: '50',
        };
        const endretPlan = [...opprinneligPlan, gradertPeriode];

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
        expect(endringstidspunkt).toEqual(gradertPeriode.tidsperiode!.fom);
    });

    it('Hvis uttaksplanlogikken setter hull inn i planen skal det telle som en endring', () => {
        const hullPeriode: Partial<PeriodeHull> = {
            type: Periodetype.Hull,
            tidsperiode: {
                fom: new Date('2019-09-01'),
                tom: new Date('2019-09-09'),
            },
        };
        const endretPlan = [hullPeriode, ...opprinneligPlan];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(hullPeriode.tidsperiode!.fom);
    });

    it('Hvis uttaksplanlogikken deler en periode skal endringstidspunkt være fra delingen og fremover ikke ta med tidligere del av perioden', () => {
        const deltPeriodeTidligereDel: Partial<Uttaksperiode> = {
            id: '3105926427-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2020-01-14T00:00:00.000Z'),
                tom: new Date('2020-04-03T00:00:00.000Z'),
            },
            type: Periodetype.Uttak,
        };
        const periodeSomDeltePeriode: Partial<Utsettelsesperiode> = {
            id: '3105926427-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2020-04-06T00:00:00.000Z'),
                tom: new Date('2020-04-17T00:00:00.000Z'),
            },
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Arbeid,
        };
        const deltPeriodeSenereDel: Partial<Uttaksperiode> = {
            id: '3105926427-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2020-04-20T00:00:00.000Z'),
                tom: new Date('2020-05-04T00:00:00.000Z'),
            },
            type: Periodetype.Uttak,
        };

        const endretPlan = [
            opprinneligPlan[0],
            opprinneligPlan[1],
            deltPeriodeTidligereDel,
            periodeSomDeltePeriode,
            deltPeriodeSenereDel,
        ];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(periodeSomDeltePeriode.tidsperiode!.fom);
    });
    it('Hvis uttaksplanlogikken deler to perioder skal endringstidspunkt være fra delingen og fremover', () => {
        const deltPeriode2: Partial<Uttaksperiode> = {
            id: '3105926427-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2019-10-01T00:00:00.000Z'),
                tom: new Date('2020-01-09T00:00:00.000Z'),
            },
            type: Periodetype.Uttak,
        };

        const nyPeriode: Partial<Utsettelsesperiode> = {
            id: '3105926427-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2020-01-10T00:00:00.000Z'),
                tom: new Date('2020-04-02T00:00:00.000Z'),
            },
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Fri,
        };
        const deltPeriode3: Partial<Uttaksperiode> = {
            id: '3105926427-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2020-04-05T00:00:00.000Z'),
                tom: new Date('2020-05-04T00:00:00.000Z'),
            },
            type: Periodetype.Uttak,
        };

        const endretPlan = [opprinneligPlan[0], deltPeriode2, nyPeriode, deltPeriode3];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(nyPeriode.tidsperiode!.fom);
    });
    it('Hvis endrer en periode til å ha senere sluttdato fra opprinnelig plan, skal endringstidspunkt være starten på perioden .', () => {
        const nyMidterstePeriode = {
            id: opprinneligPlan[1].id,
            tidsperiode: {
                fom: opprinneligPlan[1].tidsperiode!.fom,
                tom: new Date('2020-01-14T00:00:00.000Z'),
            },
            type: opprinneligPlan[1].type,
        };
        const nyEndretSistePeriode = {
            ...opprinneligPlan[2],
            tidsperiode: {
                fom: new Date('2020-01-15T00:00:00.000Z'),
                tom: new Date('2020-05-05T00:00:00.000Z'),
            },
        };
        const endretPlan = [opprinneligPlan[0], nyMidterstePeriode, nyEndretSistePeriode];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(opprinneligPlan[1].tidsperiode!.fom);
    });

    it('Hvis endrer en periode til å ha tidligere sluttdato fra opprinnelig plan, skal endringstidspunkt være starten på neste periode i den nye planen .', () => {
        const nyMidterstePeriode = {
            id: opprinneligPlan[1].id,
            tidsperiode: {
                fom: opprinneligPlan[1].tidsperiode!.fom,
                tom: new Date('2020-01-08T00:00:00.000Z'),
            },
            type: opprinneligPlan[1].type,
        };
        const nyHullPeriode = {
            ...opprinneligPlan[2],
            tidsperiode: {
                fom: new Date('2020-01-09T00:00:00.000Z'),
                tom: new Date('2020-01-13T00:00:00.000Z'),
            },
        };
        const endretPlan = [opprinneligPlan[0], nyMidterstePeriode, nyHullPeriode, opprinneligPlan[2]];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(nyHullPeriode.tidsperiode.fom);
    });
    it('Hvis endrer en periode til å starte tidligere enn i opprinnelig plan, skal endringstidspunkt være den nye starten på perioden.', () => {
        const opprinneligPlanMedHull = [
            opprinneligPlan[0],
            { ...opprinneligPlan[1], type: Periodetype.Hull },
            opprinneligPlan[2],
        ];
        const endretPlan = [
            opprinneligPlanMedHull[0],
            {
                ...opprinneligPlanMedHull[1],
                tidsperiode: {
                    fom: new Date('2019-10-01T00:00:00.000Z'),
                    tom: new Date('2020-01-06T00:00:00.000Z'),
                },
            },
            {
                ...opprinneligPlanMedHull[2],
                tidsperiode: {
                    fom: new Date('2020-01-07T00:00:00.000Z'),
                    tom: new Date('2020-05-04T00:00:00.000Z'),
                },
            },
        ];
        const endringstidspunkt = getEndringstidspunkt(
            opprinneligPlanMedHull as Periode[],
            endretPlan as Periode[],
            true
        );
        expect(endringstidspunkt).toBe(endretPlan[2].tidsperiode!.fom);
    });
    it('Hvis endret periode er siste i planen, har samme startdato som i opprinnelig plan men senere sluttdato, skal endringstidspunkt være starten på perioden .', () => {
        const nySistePeriode = {
            id: opprinneligPlan[2].id,
            tidsperiode: {
                fom: opprinneligPlan[2].tidsperiode!.fom,
                tom: new Date('2020-05-14T00:00:00.000Z'),
            },
            type: opprinneligPlan[2].type,
        };
        const endretPlan = [opprinneligPlan[0], opprinneligPlan[1], nySistePeriode];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(nySistePeriode.tidsperiode.fom);
    });
    it('Hvis endret periode er siste i planen, har samme startdato som i opprinnelig plan men tidligere sluttdato, skal endringstidspunkt være starten på perioden som er først i planen.', () => {
        const nySistePeriode = {
            id: opprinneligPlan[2].id,
            tidsperiode: {
                fom: opprinneligPlan[2].tidsperiode!.fom,
                tom: new Date('2020-05-01T00:00:00.000Z'),
            },
            type: opprinneligPlan[2].type,
        };
        const endretPlan = [opprinneligPlan[0], opprinneligPlan[1], nySistePeriode];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(nySistePeriode.tidsperiode.fom);
    });
    it('Hvis ingen opprinnelig plan, skal endringstidspunkt være startdatoen på første periode i endret plan.', () => {
        const tomOpprinneligPlan = [] as Periode[];
        const endretPlan = [opprinneligPlan[2], opprinneligPlan[3]];
        const endringstidspunkt = getEndringstidspunkt(tomOpprinneligPlan, endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(opprinneligPlan[2].tidsperiode!.fom);
    });

    it('Hvis siste periode er slettet i den nye planen skal endringstidspunkt være startdatoen på slettet periode.', () => {
        const endretPlan = [opprinneligPlan[0], opprinneligPlan[1]];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

        expect(endringstidspunkt).toBe(opprinneligPlan[2].tidsperiode!.fom);
    });
    it('Hvis både endret type på en periode i midten og siste periode er slettet i den nye planen skal endringstidspunkt være startdatoen på den endrede perioden.', () => {
        const endretPlan = [opprinneligPlan[0], { ...opprinneligPlan[1], type: Periodetype.Hull }];
        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
        expect(endringstidspunkt).toBe(opprinneligPlan[1].tidsperiode!.fom);
    });
    it('Hvis forlenget en periode i midten og siste periode er slettet i den nye planen skal endringstidspunkt være startdatoen på den forlengede perioden.', () => {
        const forlengetTidsperiodeMidten = {
            ...opprinneligPlan[1].tidsperiode,
            tom: new Date('2020-01-17T00:00:00.000Z'),
        };
        const endretPlan = [opprinneligPlan[0], { ...opprinneligPlan[1], forlengetTidsperiodeMidten }];

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
        expect(endringstidspunkt).toBe(opprinneligPlan[1].tidsperiode!.fom);
    });
    it('Hvis forkortet en periode i midten og siste periode er slettet i den nye planen skal endringstidspunkt være startdatoen på den forkortede perioden.', () => {
        const forkortetTidsperiodeMidten = {
            ...opprinneligPlan[1].tidsperiode,
            tom: new Date('2020-01-08T00:00:00.000Z'),
        };
        const endretPlan = [opprinneligPlan[0], { ...opprinneligPlan[1], forkortetTidsperiodeMidten }];

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
        expect(endringstidspunkt).toBe(opprinneligPlan[1].tidsperiode!.fom);
    });
    it('Hvis endrer første periode til å starte senere enn i opprinnelig plan, skal endringstidspunkt være startdatoen på den opprinnelige første perioden.', () => {
        const forkortetFørsteTidsperiode = {
            ...opprinneligPlan[0].tidsperiode,
            fom: new Date('2019-09-16T00:00:00.000Z'),
        };
        const forkortetFørstePeriode = {
            ...opprinneligPlan[0],
            tidsperiode: forkortetFørsteTidsperiode,
        };
        const endretPlan = [forkortetFørstePeriode, opprinneligPlan[1], opprinneligPlan[2]];

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
        expect(endringstidspunkt).toBe(opprinneligPlan[0].tidsperiode!.fom);
    });
    it('Hvis endrer første periode til å starte tidligere enn i opprinnelig plan, skal endringstidspunkt være startdatoen på første perioden i endret plan.', () => {
        const forlengetFørsteTidsperiode = {
            ...opprinneligPlan[0].tidsperiode,
            fom: new Date('2019-09-02T00:00:00.000Z'),
        };
        const forlengetFørstePeriode = {
            ...opprinneligPlan[0],
            tidsperiode: forlengetFørsteTidsperiode,
        };
        const endretPlan = [forlengetFørstePeriode, opprinneligPlan[1], opprinneligPlan[2]];

        const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
        expect(endringstidspunkt).toBe(forlengetFørsteTidsperiode.fom);
    });
    it('Hvis sletter en periode i midten og samtidig forkorter perioden før skal endringstidspunktet være starten på hull perioden etter den forkortede perioden i endret plan.', () => {
        const fjerdePeriode = {
            id: '89454212-6496-7446-7246-02332065872239',
            tidsperiode: {
                fom: new Date('2020-05-05T00:00:00.000Z'),
                tom: new Date('2020-05-19T00:00:00.000Z'),
            },
            type: Periodetype.Uttak,
        };

        const opprinneligPlanFirePerioder = [...opprinneligPlan, fjerdePeriode];

        const forkortetAndreTidsPeriode = {
            ...opprinneligPlanFirePerioder[0].tidsperiode,
            tom: new Date('2020-01-06T00:00:00.000Z'),
        };
        const forkortetAndrePeriode = {
            ...opprinneligPlanFirePerioder[1],
            tidsperiode: forkortetAndreTidsPeriode,
        };

        const nyTredjePeriodeHull = {
            id: opprinneligPlanFirePerioder[2],
            tidsperiode: {
                fom: new Date('2020-01-07T00:00:00.000Z'),
                tom: new Date('2020-04-29T00:00:00.000Z'),
            },
            type: Periodetype.Hull,
        };

        const nyFjerdePeriode = {
            id: fjerdePeriode.id,
            tidsperiode: {
                fom: new Date('2020-04-30T00:00:00.000Z'),
                tom: new Date('2020-05-12T00:00:00.000Z'),
            },
            type: Periodetype.Uttak,
        };

        const endretPlanFirePerioder = [
            opprinneligPlanFirePerioder[0],
            forkortetAndrePeriode,
            nyTredjePeriodeHull,
            nyFjerdePeriode,
        ];

        const endringstidspunkt = getEndringstidspunkt(
            opprinneligPlanFirePerioder as Periode[],
            endretPlanFirePerioder as Periode[],
            true
        );
        expect(endringstidspunkt).toBe(nyTredjePeriodeHull.tidsperiode.fom);
    });
    it('Hvis sletter siste periode og samtidig forkorter perioden før skal endringstidspunktet være starten på den forkortede perioden i endret plan.', () => {});
    const forkortetAndreTidsperiode = {
        ...opprinneligPlan[1].tidsperiode,
        tom: new Date('2020-01-06T00:00:00.000Z'),
    };

    const forkortetAndrePeriode = { ...opprinneligPlan[1], tidsperiode: forkortetAndreTidsperiode };

    const endretPlan = [opprinneligPlan[0], forkortetAndrePeriode];

    const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
    expect(endringstidspunkt).toBe(forkortetAndreTidsperiode.fom);
});
