import { uttaksplanHarForMangeFlerbarnsdager } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder, dekningsgrad, antallBarn } = grunnlag;
    return {
        passerer:
            dekningsgrad !== undefined &&
            uttaksplanHarForMangeFlerbarnsdager(perioder, dekningsgrad, antallBarn) === false,
    };
};
