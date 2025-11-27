import dayjs from 'dayjs';

import { CalendarPeriod } from '@navikt/fp-ui';

import { Planperiode } from '../../../types/Planperiode';
import { PlanperiodeMedAntallDager } from '../EksisterendeValgtePerioder';

export const slåSammenTilstøtendePerioder = (perioder: CalendarPeriod[]): CalendarPeriod[] => {
    if (perioder.length === 0) {
        return [];
    }

    return [...perioder]
        .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
        .reduce<CalendarPeriod[]>((acc, curr) => {
            const last = acc.at(-1);

            if (last) {
                const sisteDag = dayjs(last.tom);
                const nesteStart = dayjs(curr.fom);

                // Finn første virkedag etter forrige periode
                let nesteVirkedag = sisteDag.add(1, 'day');
                while (nesteVirkedag.day() === 6 || nesteVirkedag.day() === 0) {
                    nesteVirkedag = nesteVirkedag.add(1, 'day');
                }

                if (nesteVirkedag.isSame(nesteStart, 'day')) {
                    // slå sammen
                    return acc.slice(0, -1).concat({
                        ...curr,
                        fom: last.fom,
                        tom: curr.tom,
                    });
                }
            }

            acc.push(curr);
            return acc;
        }, []);
};

//TODO (TOR) Bør skriva om denne, men avventar å sjå om det blir endringar i funksjonalitet
export const finnValgtePerioder = (
    valgtePerioder: CalendarPeriod[],
    uttaksplan: Planperiode[],
): PlanperiodeMedAntallDager[] => {
    return uttaksplan
        .filter((p) => !p.periodeHullÅrsak)
        .map((p) => {
            const fom2 = dayjs(p.fom);
            const tom2 = dayjs(p.tom);

            const valgteDagerIPeriode = valgtePerioder.reduce((sum, periode) => {
                const fom1 = dayjs(periode.fom);
                const tom1 = dayjs(periode.tom);

                const start = fom1.isAfter(fom2) ? fom1 : fom2;
                const end = tom1.isBefore(tom2) ? tom1 : tom2;

                if (!start.isSameOrBefore(end, 'day')) {
                    return sum;
                }

                return sum + countWeekdaysBetween(start, end);
            }, 0);

            return valgteDagerIPeriode > 0 ? { ...p, valgteDagerIPeriode } : null;
        })
        .filter((p): p is PlanperiodeMedAntallDager => p !== null)
        .reduce<PlanperiodeMedAntallDager[]>((acc, curr) => {
            const duplikat = acc.find(
                (p) =>
                    p.kontoType === curr.kontoType &&
                    !p.erAnnenPartEøs &&
                    !curr.erAnnenPartEøs &&
                    p.forelder === curr.forelder &&
                    p.samtidigUttak === curr.samtidigUttak &&
                    p.gradering === curr.gradering &&
                    p.utsettelseÅrsak === curr.utsettelseÅrsak,
            );

            if (duplikat) {
                const index = acc.indexOf(duplikat);
                const nyPeriode = {
                    ...duplikat,
                    fom: dayjs(duplikat.fom).isBefore(dayjs(curr.fom)) ? duplikat.fom : curr.fom,
                    tom: dayjs(duplikat.tom).isAfter(dayjs(curr.tom)) ? duplikat.tom : curr.tom,
                    valgteDagerIPeriode: duplikat.valgteDagerIPeriode + curr.valgteDagerIPeriode,
                };
                return [...acc.slice(0, index), nyPeriode, ...acc.slice(index + 1)];
            }

            return acc.concat(curr);
        }, []);
};

export const countWeekdaysBetween = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    let count = 0;
    let d = start;

    while (d.isSameOrBefore(end, 'day')) {
        const day = d.day();
        if (day !== 0 && day !== 6) {
            count++;
        }
        d = d.add(1, 'day');
    }

    return count;
};

export const erValgtPeriodeEnHelEksisterendePeriode = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod) =>
    uttaksplan.some(
        (p) =>
            dayjs(p.fom).isSame(dayjs(valgtPeriode.fom), 'day') &&
            dayjs(p.tom).isSame(dayjs(valgtPeriode.tom), 'day') &&
            !p.periodeHullÅrsak &&
            (p.erAnnenPartEøs || p.samtidigUttak === undefined),
    );
