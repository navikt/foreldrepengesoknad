import { Søknadsinfo } from '@navikt/fp-common';

import { uttaksplanHarForMangeFlerbarnsdager } from '../../utils/uttaksplanHarForMangeFlerbarnsuker';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const harUttaksplanForMangeFlerbarnsdagerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder, dekningsgrad } = grunnlag;
    const tilgjengeligeFlerbarnsdager = grunnlag.stønadskontoer.tillegg?.flerbarn || 0;
    return {
        passerer:
            dekningsgrad !== undefined &&
            uttaksplanHarForMangeFlerbarnsdager(perioder, tilgjengeligeFlerbarnsdager) === false,
    };
};
