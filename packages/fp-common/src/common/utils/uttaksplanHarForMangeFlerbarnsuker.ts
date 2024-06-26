import { Periode, isUttaksperiode } from '../types';
import { finnAntallDagerÅTrekke } from './uttaksPlanStatus';

export const uttaksplanHarForMangeFlerbarnsdager = (uttaksplan: Periode[], tilgjengeligeFlerbarnsdager: number) => {
    const result: number = uttaksplan
        .slice()
        .filter((periode) => isUttaksperiode(periode) && periode.ønskerFlerbarnsdager === true)
        .reduce((sum: number, periode: Periode) => {
            if (isUttaksperiode(periode)) {
                return finnAntallDagerÅTrekke(periode) + sum;
            } else {
                return sum;
            }
        }, 0);

    return result > tilgjengeligeFlerbarnsdager;
};
