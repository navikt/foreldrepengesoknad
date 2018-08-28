import Søker from '../../types/søknad/Søker';
import { FrilansInformasjon } from '../../types/søknad/FrilansInformasjon';
import { driverDuFosterhjemVisible } from '../../bolker/frilanser-bolk/visibility';

const cleanupFrilansInformasjon = (
    søker: Søker
): FrilansInformasjon | undefined => {
    const { frilansInformasjon } = søker;
    if (!frilansInformasjon) {
        return frilansInformasjon;
    }

    const { harJobbetForNærVennEllerFamilieSiste10Mnd } = frilansInformasjon;
    if (harJobbetForNærVennEllerFamilieSiste10Mnd === false) {
        frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = [];
    }
    if (!driverDuFosterhjemVisible(søker)) {
        frilansInformasjon.driverFosterhjem = undefined;
    }

    return frilansInformasjon;
};

export default cleanupFrilansInformasjon;
