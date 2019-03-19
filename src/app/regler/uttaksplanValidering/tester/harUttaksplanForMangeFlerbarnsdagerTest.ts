import { Regel, Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { uttaksplanHarForMangeFlerbarnsdager } from '../../../util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const {
        perioder,
        søknadsinfo: {
            søknaden: { dekningsgrad, antallBarn }
        }
    } = grunnlag;
    return dekningsgrad && uttaksplanHarForMangeFlerbarnsdager(perioder, dekningsgrad, antallBarn)
        ? regelHarAvvik(regel)
        : regelPasserer(regel);
};
