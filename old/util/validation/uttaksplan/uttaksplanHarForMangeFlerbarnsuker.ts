import { Periode, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { Dekningsgrad } from 'common/types';
import { finnAntallDagerÅTrekke } from 'app/util/uttaksPlanStatus';

export const getFlerbarnsuker = (dekningsgrad: Dekningsgrad, antallBarn: number): number => {
    if (antallBarn === 2) {
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
            return 17;
        } else {
            return 21;
        }
    } else {
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
            return 46;
        } else {
            return 56;
        }
    }
};

export const uttaksplanHarForMangeFlerbarnsdager = (
    uttaksplan: Periode[],
    dekningsgrad: Dekningsgrad,
    antallBarn: number
) => {
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

    return result > getFlerbarnsuker(dekningsgrad, antallBarn) * 5;
};
