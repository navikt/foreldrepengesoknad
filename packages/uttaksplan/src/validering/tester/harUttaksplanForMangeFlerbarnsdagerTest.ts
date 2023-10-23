import { Søknadsinfo, uttaksplanHarForMangeFlerbarnsdager } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder, dekningsgrad, antallBarn } = grunnlag;
    return {
        passerer:
            dekningsgrad !== undefined &&
            uttaksplanHarForMangeFlerbarnsdager(perioder, dekningsgrad, antallBarn) === false,
    };
};
