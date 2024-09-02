import { Periode } from '@navikt/fp-common';

import { finnAntallDagerÅTrekke } from './uttaksPlanStatus';

export const getSumUttaksdagerÅTrekkeIPeriodene = (perioder: Periode[]) => {
    return Math.floor(perioder.map((p) => finnAntallDagerÅTrekke(p)).reduce((prev, curr) => prev + curr, 0));
};
