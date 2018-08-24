import Søker from '../../../types/søknad/Søker';
import {
    driverDuFosterhjemVisible,
    frilansOppdragBolkVisible,
    frilansOppdragErUtfylt
} from '../../../bolker/frilanser-bolk/visibilityFns';

type AnnenInntektVisibilityFn = (søker: Søker) => boolean;

export const selvstendigNæringsdrivendeBolkVisible: AnnenInntektVisibilityFn = (
    søker: Søker
) => {
    const { harJobbetSomFrilansSiste10Mnd, frilansInformasjon } = søker;

    if (harJobbetSomFrilansSiste10Mnd === false) {
        return true;
    }

    if (frilansInformasjon !== undefined) {
        const {
            driverFosterhjem,
            jobberFremdelesSomFrilans
        } = frilansInformasjon;

        if (jobberFremdelesSomFrilans === true) {
            return (
                driverDuFosterhjemVisible(søker) &&
                driverFosterhjem !== undefined
            );
        } else {
            return (
                frilansOppdragErUtfylt(frilansInformasjon) &&
                frilansOppdragBolkVisible(søker)
            );
        }
    }
    return false;
};
