import Søker from '../../types/søknad/Søker';
import { FrilansInformasjon, FrilansOppdrag } from '../../types/søknad/FrilansInformasjon';
import visibilityFns from '../../steg/andreInntekter/frilanserBolk/visibility';
import { replaceInvisibleCharsWithSpace } from '../stringUtils';

const cleanUpFrilansOppdrag = (oppdrag: FrilansOppdrag): FrilansOppdrag => {
    return {
        ...oppdrag,
        navnPåArbeidsgiver: replaceInvisibleCharsWithSpace(oppdrag.navnPåArbeidsgiver),
    };
};

const cleanupFrilansInformasjon = (søker: Søker): FrilansInformasjon | undefined => {
    const { frilansInformasjon } = søker;
    if (!frilansInformasjon) {
        return frilansInformasjon;
    }

    const { harJobbetForNærVennEllerFamilieSiste10Mnd } = frilansInformasjon;
    if (harJobbetForNærVennEllerFamilieSiste10Mnd === false) {
        frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = [];
    } else {
        frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd.map(
            (oppdrag) => cleanUpFrilansOppdrag(oppdrag)
        );
    }
    if (!visibilityFns.driverDuFosterhjemVisible(søker)) {
        frilansInformasjon.driverFosterhjem = undefined;
    }

    return frilansInformasjon;
};

export default cleanupFrilansInformasjon;
