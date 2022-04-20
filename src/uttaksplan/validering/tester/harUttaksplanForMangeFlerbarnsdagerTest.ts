import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { uttaksplanHarForMangeFlerbarnsdager } from 'app/steps/uttaksplan-info/utils/uttaksplanHarForMangeFlerbarnsuker';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder, dekningsgrad, antallBarn } = grunnlag;
    return {
        passerer:
            dekningsgrad !== undefined &&
            uttaksplanHarForMangeFlerbarnsdager(perioder, dekningsgrad, antallBarn) === false,
    };
};
