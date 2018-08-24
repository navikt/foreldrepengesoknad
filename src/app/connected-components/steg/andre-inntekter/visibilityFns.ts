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

export const andreInntekterBolkVisible: AnnenInntektVisibilityFn = (
    søker: Søker
) => {
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
