import Søker from '../../../types/søknad/Søker';
import {
    driverDuFosterhjemVisible,
    oppdragBolkVisible,
    frilansOppdragErUtfylt
} from '../../../bolker/frilanser-bolk/visibility';

type VisibilityFunction = (søker: Søker) => boolean;
interface FieldVisibilityFunctions {
    selvstendigNæringsdrivendeBolk: VisibilityFunction;
    andreInntekterBolk: VisibilityFunction;
}

export const selvstendigNæringsdrivendeBolkVisible: VisibilityFunction = (
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
                oppdragBolkVisible(søker)
            );
        }
    }
    return false;
};

export const andreInntekterBolkVisible: VisibilityFunction = (søker: Søker) => {
    const {
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        selvstendigNæringsdrivendeInformasjon
    } = søker;
    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true) {
        return (
            selvstendigNæringsdrivendeInformasjon !== undefined &&
            selvstendigNæringsdrivendeInformasjon.length > 0 &&
            selvstendigNæringsdrivendeBolkVisible(søker)
        );
    }
    return (
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false &&
        selvstendigNæringsdrivendeBolkVisible(søker)
    );
};

const fieldVisibilityFunctions: FieldVisibilityFunctions = {
    selvstendigNæringsdrivendeBolk: selvstendigNæringsdrivendeBolkVisible,
    andreInntekterBolk: andreInntekterBolkVisible
};

export default fieldVisibilityFunctions;
