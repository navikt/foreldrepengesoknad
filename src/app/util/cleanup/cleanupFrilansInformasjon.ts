import Søker from '../../types/søknad/Søker';
import { FrilansInformasjon } from '../../types/søknad/FrilansInformasjon';
import visibilityFns from '../../steg/andreInntekter/frilanserBolk/visibility';

const cleanupFrilansInformasjon = (søker: Søker): FrilansInformasjon | undefined => {
    const { frilansInformasjon } = søker;
    if (!frilansInformasjon) {
        return frilansInformasjon;
    }

    const { harJobbetForNærVennEllerFamilieSiste10Mnd } = frilansInformasjon;
    if (harJobbetForNærVennEllerFamilieSiste10Mnd === false) {
        frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = [];
    }
    if (!visibilityFns.driverDuFosterhjemVisible(søker)) {
        frilansInformasjon.driverFosterhjem = undefined;
    }

    return frilansInformasjon;
};

export default cleanupFrilansInformasjon;
