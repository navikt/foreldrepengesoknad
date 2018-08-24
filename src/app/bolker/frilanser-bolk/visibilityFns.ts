import Søker from '../../types/søknad/Søker';
import { FrilansInformasjon } from '../../types/søknad/FrilansInformasjon';

type FrilanserBolkVisibilityFn = (søker: Søker) => boolean;

export const frilansStartdatoVisible: FrilanserBolkVisibilityFn = (
    søker: Søker
) => søker.harJobbetSomFrilansSiste10Mnd === true;

export const fremdelesFrilansVisible: FrilanserBolkVisibilityFn = (
    søker: Søker
) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { oppstart } = frilansInformasjon;
        return frilansStartdatoVisible(søker) && oppstart !== undefined;
    }
    return false;
};

export const frilansOppdragBolkVisible: FrilanserBolkVisibilityFn = (
    søker: Søker
) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { jobberFremdelesSomFrilans } = frilansInformasjon;
        return (
            fremdelesFrilansVisible(søker) &&
            jobberFremdelesSomFrilans !== undefined
        );
    }
    return false;
};

export const frilansOppdragPerioderVisible: FrilanserBolkVisibilityFn = (
    søker: Søker
) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const {
            harJobbetForNærVennEllerFamilieSiste10Mnd
        } = frilansInformasjon;
        return (
            frilansOppdragBolkVisible(søker) &&
            harJobbetForNærVennEllerFamilieSiste10Mnd === true
        );
    }
    return false;
};

export const frilansOppdragErUtfylt = (
    frilansInformasjon: FrilansInformasjon
) => {
    const {
        harJobbetForNærVennEllerFamilieSiste10Mnd,
        oppdragForNæreVennerEllerFamilieSiste10Mnd
    } = frilansInformasjon;

    if (harJobbetForNærVennEllerFamilieSiste10Mnd === true) {
        return (
            oppdragForNæreVennerEllerFamilieSiste10Mnd !== undefined &&
            oppdragForNæreVennerEllerFamilieSiste10Mnd.length > 0
        );
    }

    return harJobbetForNærVennEllerFamilieSiste10Mnd === false;
};

export const driverDuFosterhjemVisible: FrilanserBolkVisibilityFn = (
    søker: Søker
) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { jobberFremdelesSomFrilans } = frilansInformasjon;
        return (
            frilansOppdragErUtfylt(frilansInformasjon) &&
            frilansOppdragBolkVisible(søker) &&
            jobberFremdelesSomFrilans === true
        );
    }
    return false;
};
