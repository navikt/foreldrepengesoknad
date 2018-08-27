import Søker from '../../types/søknad/Søker';
import { FrilansInformasjon } from '../../types/søknad/FrilansInformasjon';

type VisibilityFunction = (søker: Søker) => boolean;
interface FieldVisibilityFunctions {
    startdato: VisibilityFunction;
    fremdelesFrilans: VisibilityFunction;
    oppdragBolk: VisibilityFunction;
    oppdragPerioder: VisibilityFunction;
    driverFosterhjem: VisibilityFunction;
}

export const startdatoVisible = (søker: Søker) =>
    søker.harJobbetSomFrilansSiste10Mnd === true;

export const fremdelesFrilansVisible = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { oppstart } = frilansInformasjon;
        return startdatoVisible(søker) && oppstart !== undefined;
    }
    return false;
};

export const oppdragBolkVisible = (søker: Søker) => {
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

export const oppdragPerioderVisible = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const {
            harJobbetForNærVennEllerFamilieSiste10Mnd
        } = frilansInformasjon;
        return (
            oppdragBolkVisible(søker) &&
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

export const driverDuFosterhjemVisible = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { jobberFremdelesSomFrilans } = frilansInformasjon;
        return (
            frilansOppdragErUtfylt(frilansInformasjon) &&
            oppdragBolkVisible(søker) &&
            jobberFremdelesSomFrilans === true
        );
    }
    return false;
};

const fieldVisibilityFunctions: FieldVisibilityFunctions = {
    startdato: startdatoVisible,
    fremdelesFrilans: fremdelesFrilansVisible,
    oppdragBolk: oppdragBolkVisible,
    oppdragPerioder: oppdragPerioderVisible,
    driverFosterhjem: driverDuFosterhjemVisible
};

export default fieldVisibilityFunctions;
