import { uttaksplanErBareOpphold } from '@navikt/fp-common';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const erUttaksplanBareOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanErBareOpphold(grunnlag.perioder) === false };
};
