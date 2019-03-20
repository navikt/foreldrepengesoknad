import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { uttaksplanHarForMangeFlerbarnsdager } from '../../../util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const {
        perioder,
        søknadsinfo: {
            søknaden: { dekningsgrad, antallBarn }
        }
    } = grunnlag;
    return {
        passerer:
            dekningsgrad !== undefined &&
            uttaksplanHarForMangeFlerbarnsdager(perioder, dekningsgrad, antallBarn) === false
    };
};
