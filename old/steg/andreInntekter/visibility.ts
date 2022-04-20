import Søker from '../../types/søknad/Søker';
import frilansVisibility from './frilanserBolk/visibility';
import VisibilityFunction from '../../types/dom/Visibility';

const selvstendigNæringsdrivendeBolkVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const { driverDuFosterhjemVisible, oppdragBolkVisible, frilansOppdragErUtfylt } = frilansVisibility;
    const { harJobbetSomFrilansSiste10Mnd, frilansInformasjon } = søker;

    if (harJobbetSomFrilansSiste10Mnd === false) {
        return true;
    }

    if (frilansInformasjon !== undefined) {
        const { driverFosterhjem } = frilansInformasjon;

        const frilansOppdragUtfylt = frilansOppdragErUtfylt(frilansInformasjon);
        const oppdragBolkIsVisible = oppdragBolkVisible(søker);
        return (
            frilansOppdragUtfylt &&
            oppdragBolkIsVisible &&
            driverDuFosterhjemVisible(søker) &&
            driverFosterhjem !== undefined
        );
    }
    return false;
};

const andreInntekterBolkVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const { harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd, selvstendigNæringsdrivendeInformasjon } = søker;
    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true) {
        return (
            selvstendigNæringsdrivendeInformasjon !== undefined &&
            selvstendigNæringsdrivendeInformasjon.length > 0 &&
            module.selvstendigNæringsdrivendeBolk(søker)
        );
    }
    return harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false && module.selvstendigNæringsdrivendeBolk(søker);
};

const module = {
    selvstendigNæringsdrivendeBolk: selvstendigNæringsdrivendeBolkVisible,
    andreInntekterBolk: andreInntekterBolkVisible,
};

export default module;
