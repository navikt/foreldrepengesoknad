import { Søknadsinfo } from '@navikt/fp-common';

import { uttaksplanErBareForeldrepengerFørFødsel } from '../../utils/Periodene';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const erUttaksplanBareForeldrepengerFørFødsel: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanErBareForeldrepengerFørFødsel(grunnlag.perioder) === false };
};
