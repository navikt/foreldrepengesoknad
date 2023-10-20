import { uttaksplanSlutterMedOpphold } from '@navikt/fp-common';
import { RegelTestresultat, RegelTest } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
