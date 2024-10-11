import dayjs from 'dayjs';

import { SaksperiodeNy } from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

export const slåSammenLikePerioder = (plan: SaksperiodeNy[]) => {
    if (plan.length <= 0) {
        return plan;
    }

    let forrigePeriode = plan[0];
    const nyPlan: SaksperiodeNy[] = [];

    plan.forEach((periode, index) => {
        if (index === 0) {
            return;
        }

        if (erPerioderLike(forrigePeriode, periode) && erPerioderSammenhengende(forrigePeriode, periode)) {
            forrigePeriode = { ...forrigePeriode, tom: periode.tom };
            return;
        } else {
            nyPlan.push(forrigePeriode);
        }

        forrigePeriode = periode;
    });

    nyPlan.push(forrigePeriode);

    return nyPlan;
};

const erPerioderSammenhengende = (p1: SaksperiodeNy, p2: SaksperiodeNy) => {
    const p1NesteUttaksdato = Uttaksdagen(dayjs(p1.tom).toDate()).neste();
    const p2Startdato = p2.fom;
    return dayjs(p1NesteUttaksdato).isSame(p2Startdato, 'day');
};

const erPerioderLike = (periodeA: SaksperiodeNy, periodeB: SaksperiodeNy) => {
    const periodeFootprintA = getPeriodeFootprint(periodeA);
    const periodeFootprintB = getPeriodeFootprint(periodeB);

    return periodeFootprintA === periodeFootprintB;
};

const getPeriodeFootprint = (periode: SaksperiodeNy) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fom, tom, ...rest } = periode;
    const sortedPeriode: any = {};

    Object.keys(rest)
        .sort((a, b) => a.localeCompare(b))
        .filter((key) => (rest as any)[key] !== undefined)
        .forEach((key) => {
            sortedPeriode[key] = (rest as any)[key];
        });

    return JSON.stringify({ ...sortedPeriode });
};
