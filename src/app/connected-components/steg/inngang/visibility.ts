import VisibilityFunction from '../../../types/dom/Visibility';
import { SøkerRolle } from '../../../types/søknad/Søknad';

const søkerRolleSpørsmålVisible: VisibilityFunction<SøkerRolle[]> = (roller: SøkerRolle[]) => {
    return roller.length > 0;
};

export default {
    søkerRolleSpørsmål: søkerRolleSpørsmålVisible
};
