import Søker from '../../../types/søknad/Søker';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';

type AnnenInntektVisibilityFn = (søker: Søker) => boolean;

export const frilansStartdatoVisible: AnnenInntektVisibilityFn = (
    søker: Søker
) => søker.harJobbetSomFrilansSiste10Mnd === true;

export const fremdelesFrilansVisible: AnnenInntektVisibilityFn = (
    søker: Søker
) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { oppstart } = frilansInformasjon;
        return frilansStartdatoVisible(søker) && oppstart !== undefined;
    }
    return false;
};

export const frilansOppdragBolkVisible: AnnenInntektVisibilityFn = (
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

export const frilansOppdragPerioderVisible: AnnenInntektVisibilityFn = (
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

const frilansOppdragErUtfylt = (frilansInformasjon: FrilansInformasjon) => {
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

export const driverDuFosterhjemVisible: AnnenInntektVisibilityFn = (
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
