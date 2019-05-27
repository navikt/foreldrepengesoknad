import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { uttaksplanStarterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanStarterMedOpphold';

export const overskriverEndringerEksisterendePerioder: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    if (grunnlag.søknadsinfo.søknaden.erEndringssøknad) {
        return { passerer: true };
    }

    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
