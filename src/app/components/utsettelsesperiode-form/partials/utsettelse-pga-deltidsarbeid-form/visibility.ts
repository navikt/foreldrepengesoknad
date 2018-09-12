import Søknad from '../../../../types/søknad/Søknad';
import { UtsettelsePgaDeltidsarbeidSkjemadata } from './UtsettelsePgaDeltidsarbeidForm';

const hvilkenKvoteSkalBenyttesSynlig = (skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata) => {
    const { stillingsprosent } = skjemadata;
    return stillingsprosent !== undefined;
};

const skalDereHaGradertUttakSamtidigSynlig = (skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata, søknad: Søknad) => {
    const { konto, stillingsprosent } = skjemadata;
    const { søker, annenForelder } = søknad;
    const { erAleneOmOmsorg } = søker;
    const { harRettPåForeldrepenger, skalHaForeldrepenger } = annenForelder;

    if (module.hvilkenKvoteSkalBenyttes(skjemadata)) {
        return konto !== null && konto !== undefined;
    }
    if (stillingsprosent !== undefined) {
        return !erAleneOmOmsorg && skalHaForeldrepenger && harRettPåForeldrepenger;
    }
    return false;
};

const hvorSkalDuJobbeSynlig = (skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata, søknad: Søknad) => {
    const { samtidigGradertUttak } = skjemadata;
    return module.skalDereHaGradertUttakSamtidig(skjemadata, søknad) && samtidigGradertUttak !== undefined;
};

const module = {
    hvilkenKvoteSkalBenyttes: hvilkenKvoteSkalBenyttesSynlig,
    skalDereHaGradertUttakSamtidig: skalDereHaGradertUttakSamtidigSynlig,
    hvorSkalDuJobbe: hvorSkalDuJobbeSynlig
};

export default module;
