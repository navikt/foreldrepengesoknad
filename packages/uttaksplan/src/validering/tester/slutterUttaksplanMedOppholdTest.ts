import { Søknadsinfo } from '@navikt/fp-common';

import { uttaksplanSlutterMedOpphold } from '../../utils/Periodene';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
