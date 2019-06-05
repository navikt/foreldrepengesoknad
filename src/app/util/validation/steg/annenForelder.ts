import Søknad from '../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../types/søkerinfo';
import { getAnnenForelderStegVisibility } from '../../../steg/annenForelder/visibility/annenForelderStegVisibility';

export const annenForelderErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const visibility = getAnnenForelderStegVisibility(søknad, søkerinfo);
    return visibility !== undefined && visibility.areAllQuestionsAnswered();
};
