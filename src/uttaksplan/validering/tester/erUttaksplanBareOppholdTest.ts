import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { uttaksplanErBareOpphold } from 'app/steps/uttaksplan-info/utils/Periodene';

export const erUttaksplanBareOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanErBareOpphold(grunnlag.perioder) === false };
};
