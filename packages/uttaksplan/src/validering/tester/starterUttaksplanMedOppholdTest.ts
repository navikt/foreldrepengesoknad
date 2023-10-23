import { Søknadsinfo, uttaksplanStarterMedOpphold } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const starterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    if (grunnlag.erEndringssøknad) {
        return { passerer: true };
    }

    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
