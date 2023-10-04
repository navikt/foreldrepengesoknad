import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { uttaksplanErBareOpphold } from 'app/steps/uttaksplan-info/utils/Periodene';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

export const erUttaksplanBareOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanErBareOpphold(grunnlag.perioder) === false };
};
