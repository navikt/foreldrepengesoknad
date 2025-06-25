import { Søknadsinfo } from '../../types/Søknadsinfo';
import { uttaksplanStarterMedOpphold } from '../../utils/Periodene';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const starterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    if (grunnlag.erEndringssøknad) {
        return { passerer: true };
    }

    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
