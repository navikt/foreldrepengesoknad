import Søker from '../../../types/søknad/Søker';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import VisibilityFunction from '../../../types/dom/Visibility';

const startdatoVisible: VisibilityFunction<Søker> = (søker: Søker) => søker.harJobbetSomFrilansSiste10Mnd === true;

const fremdelesFrilansVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { oppstart } = frilansInformasjon;
        return module.startdatoVisible(søker) && oppstart !== undefined;
    }
    return false;
};

const oppdragBolkVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { jobberFremdelesSomFrilans } = frilansInformasjon;
        return module.fremdelesFrilansVisible(søker) && jobberFremdelesSomFrilans !== undefined;
    }
    return false;
};

const oppdragPerioderVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const { harJobbetForNærVennEllerFamilieSiste10Mnd } = frilansInformasjon;
        return module.oppdragBolkVisible(søker) && harJobbetForNærVennEllerFamilieSiste10Mnd === true;
    }
    return false;
};

const frilansOppdragErUtfylt: VisibilityFunction<FrilansInformasjon> = (frilansInformasjon: FrilansInformasjon) => {
    const {
        harJobbetForNærVennEllerFamilieSiste10Mnd,
        oppdragForNæreVennerEllerFamilieSiste10Mnd,
    } = frilansInformasjon;

    if (harJobbetForNærVennEllerFamilieSiste10Mnd === true) {
        return (
            oppdragForNæreVennerEllerFamilieSiste10Mnd !== undefined &&
            oppdragForNæreVennerEllerFamilieSiste10Mnd.length > 0
        );
    }

    return harJobbetForNærVennEllerFamilieSiste10Mnd === false;
};

const driverDuFosterhjemVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const { frilansInformasjon } = søker;
    if (frilansInformasjon !== undefined) {
        const oppdragUtfylt = module.frilansOppdragErUtfylt(frilansInformasjon);
        const oppdragBolkIsVisible = module.oppdragBolkVisible(søker);
        return oppdragUtfylt && oppdragBolkIsVisible;
    }
    return false;
};

const module = {
    startdatoVisible,
    fremdelesFrilansVisible,
    oppdragBolkVisible,
    oppdragPerioderVisible,
    driverDuFosterhjemVisible,
    frilansOppdragErUtfylt,
};

export default module;
