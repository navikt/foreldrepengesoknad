import { Periode, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { Dekningsgrad } from 'common/types';
import { Perioden } from 'app/util/uttaksplan/Perioden';

const getFlerbarnsuker = (dekningsgrad: Dekningsgrad, antallBarn: number): number => {
    if (antallBarn === 2) {
        if (dekningsgrad === '100') {
            return 17;
        } else {
            return 21;
        }
    } else {
        if (dekningsgrad === '100') {
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
                return Perioden(periode).getAntallUttaksdager() + sum;
            } else {
                return sum;
            }
        }, 0);

    return result > getFlerbarnsuker(dekningsgrad, antallBarn) * 5;
};
