import dayjs from 'dayjs';

import { CalendarPeriod } from '@navikt/fp-ui';

import { Planperiode } from '../../../types/Planperiode';
import { PlanperiodeMedAntallDager } from '../EksisterendeValgtePerioder';

export const slåSammenTilstøtendePerioder = (perioder: CalendarPeriod[]): CalendarPeriod[] => {
    if (!perioder.length) {
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
            let overlappendeDager = 0;

            const overlappendePerioder = valgtePerioder.filter((periode) => {
                const fom1 = dayjs(periode.fom);
                const tom1 = dayjs(periode.tom);
                const fom2 = dayjs(p.fom);
                const tom2 = dayjs(p.tom);

                const start = fom1.isAfter(fom2) ? fom1 : fom2;
                const end = tom1.isBefore(tom2) ? tom1 : tom2;

                if (start.isSameOrBefore(end, 'day')) {
                    overlappendeDager += end.diff(start, 'day') + 1;
                    return true;
                }
                return false;
            });

            if (overlappendeDager > 0) {
                const fomDate = overlappendePerioder
                    .map(({ fom }) => dayjs(fom))
                    .reduce((min, curr) => (curr.isBefore(min) ? curr : min), dayjs())
                    .format('YYYY-MM-DD');
                const tomDate = overlappendePerioder
                    .map(({ tom }) => dayjs(tom))
                    .reduce((max, curr) => (curr.isAfter(max) ? curr : max), dayjs())
                    .format('YYYY-MM-DD');

                return { ...p, fom: fomDate, tom: tomDate, overlappendeDager };
            }

            return null;
        })
        .filter((p): p is PlanperiodeMedAntallDager => p !== null)
        .reduce<PlanperiodeMedAntallDager[]>((acc, curr) => {
            const duplikat = acc.find((p) => p.kontoType === curr.kontoType);
            if (duplikat) {
                return acc
                    .filter((p) => p.kontoType !== duplikat.kontoType)
                    .concat({
                        ...duplikat,
                        // Keep earliest fom and latest tom across all merged periods
                        fom: dayjs(duplikat.fom).isBefore(dayjs(curr.fom)) ? duplikat.fom : curr.fom,
                        tom: dayjs(duplikat.tom).isAfter(dayjs(curr.tom)) ? duplikat.tom : curr.tom,
                        overlappendeDager: duplikat.overlappendeDager + curr.overlappendeDager,
                    });
            }
            return acc.concat(curr);
        }, []);
};

export const erValgtPeriodeEnHelEksisterendePeriode = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod) =>
    uttaksplan.some(
        (p) =>
            dayjs(p.fom).isSame(dayjs(valgtPeriode.fom), 'day') && dayjs(p.tom).isSame(dayjs(valgtPeriode.tom), 'day'),
    );
