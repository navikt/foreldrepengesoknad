import { Søknadsinfo } from '@navikt/fp-common';

import { uttaksplanErBareOpphold } from '../../utils/Periodene';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const erUttaksplanBareOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanErBareOpphold(grunnlag.perioder) === false };
};
