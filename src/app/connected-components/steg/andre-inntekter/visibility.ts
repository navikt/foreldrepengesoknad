import Søker from '../../../types/søknad/Søker';
import frilansVisibility from '../../../bolker/frilanser-bolk/visibility';
import VisibilityFunction from '../../../types/dom/Visibility';

const selvstendigNæringsdrivendeBolkVisible: VisibilityFunction<Søker> = (
    søker: Søker
) => {
    const {
        driverDuFosterhjemVisible,
        oppdragBolkVisible,
        frilansOppdragErUtfylt
    } = frilansVisibility;
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
                oppdragBolkVisible(søker)
            );
        }
    }
    return false;
};

const andreInntekterBolkVisible: VisibilityFunction<Søker> = (søker: Søker) => {
    const {
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        selvstendigNæringsdrivendeBolk
    } = søker;
    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true) {
        return (
            selvstendigNæringsdrivendeBolk !== undefined &&
            selvstendigNæringsdrivendeBolk.length > 0 &&
            selvstendigNæringsdrivendeBolkVisible(søker)
        );
    }
    return (
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false &&
        selvstendigNæringsdrivendeBolkVisible(søker)
    );
};

export default {
    selvstendigNæringsdrivendeBolk: selvstendigNæringsdrivendeBolkVisible,
    andreInntekterBolk: andreInntekterBolkVisible
};
