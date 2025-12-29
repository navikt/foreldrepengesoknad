import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

type Saksperiode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

export class SaksperiodeBuilder {
    private periods: Saksperiode[];
    private shouldReplace: boolean = true;

    constructor(initial: Saksperiode[]) {
        this.periods = [...initial].sort((a, b) => toDay(a.fom) - toDay(b.fom));
    }

    withPushExisting(): SaksperiodeBuilder {
        this.shouldReplace = false;
        return this;
    }

    addPeriods(incoming: Saksperiode[]): void {
        if (!this.shouldReplace) {
            for (const p of incoming) {
                this.periods = pushPeriods(this.periods, p);
            }
            this.periods.sort((a, b) => toDay(a.fom) - toDay(b.fom));
            return;
        }

        const grouped = new Map<string, Saksperiode[]>();

        for (const p of incoming) {
            const key = `${p.fom}-${p.tom}`;
            grouped.set(key, [...(grouped.get(key) ?? []), p]);
        }

        for (const [, group] of grouped) {
            // Replace once
            this.periods = replacePeriods(this.periods, group[0]!);

            // Append remaining duplicates
            for (let i = 1; i < group.length; i++) {
                this.periods.push(group[i]!);
            }
        }

        this.periods.sort((a, b) => toDay(a.fom) - toDay(b.fom));
    }

    removePeriods(incoming: Array<{ fom: string; tom: string }>): void {
        for (const period of incoming) {
            const nFom = toDay(period.fom);
            const nTom = toDay(period.tom);

            const result: Saksperiode[] = [];

            for (const p of this.periods) {
                const pFom = toDay(p.fom);
                const pTom = toDay(p.tom);

                // No overlap → keep
                if (pTom < nFom || pFom > nTom) {
                    result.push({ ...p });
                    continue;
                }

                // Partial overlap at start → shorten tom
                if (pFom < nFom) {
                    result.push({ ...p, tom: fromDay(nFom - 1) });
                }

                // Partial overlap at end → shift fom
                if (pTom > nTom) {
                    result.push({ ...p, fom: fromDay(nTom + 1) });
                }

                // Fully inside removal → remove entirely (do nothing)
            }

            this.periods = result.sort((a, b) => toDay(a.fom) - toDay(b.fom));
        }
    }

    getSaksperioder(): Saksperiode[] {
        return [...this.periods];
    }
}

const pushPeriods = (existing: Saksperiode[], incoming: Saksperiode): Saksperiode[] => {
    const nFom = toDay(incoming.fom);
    const nTom = toDay(incoming.tom);
    const shift = lengthInDays(nFom, nTom);

    const shifted = existing.map((p) => {
        const pFom = toDay(p.fom);
        const pTom = toDay(p.tom);

        if (pTom < nFom) {
            return p;
        }

        return {
            ...p,
            fom: fromDay(pFom + shift),
            tom: fromDay(pTom + shift),
        };
    });

    return [...shifted, incoming];
};

const replacePeriods = (existing: Saksperiode[], incoming: Saksperiode): Saksperiode[] => {
    const nFom = toDay(incoming.fom);
    const nTom = toDay(incoming.tom);

    const result: Saksperiode[] = [];

    for (const p of existing) {
        const pFom = toDay(p.fom);
        const pTom = toDay(p.tom);

        if (!overlaps(pFom, pTom, nFom, nTom)) {
            result.push(p);
            continue;
        }

        // Before overlap
        if (pFom < nFom) {
            result.push({
                ...p,
                tom: fromDay(nFom - 1),
            });
        }

        // After overlap
        if (pTom > nTom) {
            result.push({
                ...p,
                fom: fromDay(nTom + 1),
            });
        }
    }

    result.push(incoming);

    return result;
};

const DAY = 24 * 60 * 60 * 1000;

const toDay = (iso: string): number => Math.floor(new Date(iso + 'T00:00:00Z').getTime() / DAY);

const fromDay = (day: number): string => new Date(day * DAY).toISOString().slice(0, 10);

const lengthInDays = (fom: number, tom: number): number => tom - fom + 1;

const overlaps = (aFom: number, aTom: number, bFom: number, bTom: number): boolean => aFom <= bTom && bFom <= aTom;
