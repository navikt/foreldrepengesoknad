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
    const { harRettPåForeldrepenger } = annenForelder;

    if (module.hvilkenKvoteSkalBenyttes(skjemadata)) {
        return konto !== null && konto !== undefined;
    }
    if (stillingsprosent !== undefined) {
        return !erAleneOmOmsorg && harRettPåForeldrepenger;
    }
    return false;
};

const hvorSkalDuJobbeSynlig = (skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata, søknad: Søknad) => {
    const { ønskerSamtidigUttak } = skjemadata;
    return module.skalDereHaGradertUttakSamtidig(skjemadata, søknad) && ønskerSamtidigUttak !== undefined;
};

const module = {
    hvilkenKvoteSkalBenyttes: hvilkenKvoteSkalBenyttesSynlig,
    skalDereHaGradertUttakSamtidig: skalDereHaGradertUttakSamtidigSynlig,
    hvorSkalDuJobbe: hvorSkalDuJobbeSynlig
};

export default module;
