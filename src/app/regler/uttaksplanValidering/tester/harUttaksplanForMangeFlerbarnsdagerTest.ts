import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { uttaksplanHarForMangeFlerbarnsdager } from '../../../util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
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
