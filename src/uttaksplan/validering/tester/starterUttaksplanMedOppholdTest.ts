import { uttaksplanStarterMedOpphold } from 'app/steps/uttaksplan-info/utils/Periodene';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const starterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    if (grunnlag.erEndringssøknad) {
        return { passerer: true };
    }

    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
