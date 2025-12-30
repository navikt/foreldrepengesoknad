import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

dayjs.extend(utc);

type Saksperiode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

export class SaksperiodeBuilder {
    private periods: Saksperiode[];
    private shouldReplace: boolean = true;

    constructor(initial: Saksperiode[]) {
        this.periods = [...initial].sort(sortPeriods);
    }

    withPushExisting(): SaksperiodeBuilder {
        this.shouldReplace = false;
        return this;
    }

    addPeriods(saksperioder: Saksperiode[]): void {
        if (this.shouldReplace) {
            // Grupper for å håndtera at ein legg til to periodar når ein har samtidig uttak.
            // Bruk ein av dei nye periodane for å justera andre periodar, og legg så til den andre på slutten
            const grupperPerFomTom = new Map<string, Saksperiode[]>();

            for (const periode of saksperioder) {
                const key = `${periode.fom}-${periode.tom}`;
                grupperPerFomTom.set(key, [...(grupperPerFomTom.get(key) ?? []), periode]);
            }

            for (const [, gruppe] of grupperPerFomTom) {
                this.periods = erstattEksisterendePerioder(this.periods, gruppe[0]!);

                for (let i = 1; i < gruppe.length; i++) {
                    this.periods.push(gruppe[i]!);
                }
            }
        } else {
            for (const p of saksperioder) {
                this.periods = pushPeriods(this.periods, p);
            }
        }

        this.periods.sort(sortPeriods);
    }

    removePeriods(saksperioderSomSkalFjernes: Saksperiode[]): void {
        for (const saksperiodeSomSkalFjernes of saksperioderSomSkalFjernes) {
            const nFom = toDay(saksperiodeSomSkalFjernes.fom);
            const nTom = toDay(saksperiodeSomSkalFjernes.tom);

            const result: Saksperiode[] = [];

            for (const eksisterendePeriode of this.periods) {
                const eFom = toDay(eksisterendePeriode.fom);
                const eTom = toDay(eksisterendePeriode.tom);

                // Ingen overlapp, behold eksisterende periode
                if (eTom.isBefore(nFom) || eFom.isAfter(nTom)) {
                    result.push(eksisterendePeriode);
                    continue;
                }

                // Behold del før slettet periode
                if (eFom.isBefore(nFom)) {
                    result.push({
                        ...eksisterendePeriode,
                        tom: fromDay(adjustEnd(nFom.subtract(1, 'day'))),
                    });
                }

                // Behold del etter slettet periode
                if (eTom.isAfter(nTom)) {
                    result.push({
                        ...eksisterendePeriode,
                        fom: fromDay(adjustStart(nTom.add(1, 'day'))),
                        tom: fromDay(eTom),
                    });
                }

                // Fully inside removal → do nothing (removed)
            }

            this.periods = result.sort(sortPeriods);
        }
    }

    getSaksperioder(): Saksperiode[] {
        return [...this.periods];
    }
}

const pushPeriods = (eksisterendePerioder: Saksperiode[], nySaksperiode: Saksperiode): Saksperiode[] => {
    const nFom = toDay(nySaksperiode.fom);
    const nTom = toDay(nySaksperiode.tom);
    const shift = lengthInWeekdays(nFom, nTom);

    const result: Saksperiode[] = [];

    for (const p of eksisterendePerioder) {
        const eFom = toDay(p.fom);
        const eTom = toDay(p.tom);

        // Eksisterende periode ligg før ny periode
        if (eTom.isBefore(nFom)) {
            result.push(p);
            continue;
        }

        // Eksisterende periode ligg etter ny periode eller ny periode begynner før og slutter inni
        if (eFom.isAfter(nFom) && nTom.isBefore(eTom)) {
            result.push({
                ...p,
                fom: fromDay(addWeekdays(eFom, shift)),
                tom: fromDay(addWeekdays(eTom, shift)),
            });
            continue;
        }

        // Legg til evt del av eksistrande periode som ligg før den nye
        if (eFom.isBefore(nFom)) {
            result.push({
                ...p,
                tom: fromDay(adjustEnd(nFom.subtract(1, 'day'))),
            });
        }

        result.push({
            ...p,
            fom: fromDay(adjustStart(nTom.add(1, 'day'))),
            tom: fromDay(addWeekdays(eTom, shift)),
        });
    }

    result.push(nySaksperiode);

    return result.sort(sortPeriods);
};

const erstattEksisterendePerioder = (
    eksisterendeSaksperioder: Saksperiode[],
    nySaksperiode: Saksperiode,
): Saksperiode[] => {
    const nFom = toDay(nySaksperiode.fom);
    const nTom = toDay(nySaksperiode.tom);

    const result: Saksperiode[] = [];

    for (const eksisterendeSaksperiode of eksisterendeSaksperioder) {
        const eFom = toDay(eksisterendeSaksperiode.fom);
        const eTom = toDay(eksisterendeSaksperiode.tom);

        if (overlaps(eFom, eTom, nFom, nTom)) {
            // Starter eksisterende periode før overlappende ny periode
            if (eFom.isBefore(nFom)) {
                result.push({
                    ...eksisterendeSaksperiode,
                    tom: fromDay(adjustEnd(nFom.subtract(1, 'day'))),
                });
            }

            // Starter eksisterende periode etter overlappende ny periode
            if (eTom.isAfter(nTom)) {
                result.push({
                    ...eksisterendeSaksperiode,
                    fom: fromDay(adjustStart(nTom.add(1, 'day'))),
                });
            }
        } else {
            result.push(eksisterendeSaksperiode);
        }
    }

    result.push(nySaksperiode);

    return result;
};

const toDay = (iso: string): Dayjs => dayjs.utc(iso).startOf('day');

const fromDay = (day: Dayjs): string => day.format('YYYY-MM-DD');

const overlaps = (aFom: Dayjs, aTom: Dayjs, bFom: Dayjs, bTom: Dayjs): boolean =>
    aFom.isSameOrBefore(bTom) && bFom.isSameOrBefore(aTom);

const lengthInWeekdays = (fom: Dayjs, tom: Dayjs): number => {
    let count = 0;
    let d = fom;
    while (!d.isAfter(tom)) {
        if (d.day() !== 6 && d.day() !== 0) count++;
        d = d.add(1, 'day');
    }
    return count;
};

const sortPeriods = (a: Saksperiode, b: Saksperiode): number => {
    const aFom = toDay(a.fom);
    const bFom = toDay(b.fom);

    if (aFom.isBefore(bFom)) {
        return -1;
    }
    if (aFom.isAfter(bFom)) {
        return 1;
    }
    return 0;
};

const adjustStart = (date: dayjs.Dayjs): dayjs.Dayjs => {
    // Shift start date to Monday if it falls on weekend
    if (date.day() === 6) return date.add(2, 'day'); // Saturday → Monday
    if (date.day() === 0) return date.add(1, 'day'); // Sunday → Monday
    return date;
};

const adjustEnd = (date: dayjs.Dayjs): dayjs.Dayjs => {
    // Shift end date to Friday if it falls on weekend
    if (date.day() === 6) return date.subtract(1, 'day'); // Saturday → Friday
    if (date.day() === 0) return date.subtract(2, 'day'); // Sunday → Friday
    return date;
};

const addWeekdays = (start: Dayjs, days: number): Dayjs => {
    let current = start.clone();
    let added = 0;

    while (added < days) {
        current = current.add(1, 'day');
        if (current.day() !== 0 && current.day() !== 6) {
            added += 1;
        }
    }

    return current;
};
