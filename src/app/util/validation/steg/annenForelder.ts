import Søknad from '../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../types/søkerinfo';
import { getAnnenForelderStegVisibility } from '../../../connected-components/steg-forstegangssoknad/annen-forelder/visibility/annenForelderStegVisibility';

export const annenForelderErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const visibility = getAnnenForelderStegVisibility(søknad, søkerinfo);
    return visibility !== undefined && visibility.areAllQuestionsAnswered();
};
