import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { uttaksplanHarForMangeFlerbarnsdager } from '../../../util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const {
        perioder,
        søknadsinfo: {
            søknaden: { dekningsgrad, antallBarn },
        },
    } = grunnlag;
    return {
        passerer:
            dekningsgrad !== undefined &&
            uttaksplanHarForMangeFlerbarnsdager(perioder, dekningsgrad, antallBarn) === false,
    };
};
