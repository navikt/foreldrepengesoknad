import { Søknadsinfo, uttaksplanSlutterMedOpphold } from '@navikt/fp-common';
import { RegelTestresultat, RegelTest } from '../utils/types/regelTypes';

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
