import { RegelTestresultat, RegelTest } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { uttaksplanSlutterMedOpphold } from 'app/steps/uttaksplan-info/utils/Periodene';

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
