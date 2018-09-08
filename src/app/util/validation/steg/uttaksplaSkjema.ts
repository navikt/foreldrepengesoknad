import { Søkerinfo } from '../../../types/s\u00F8kerinfo';
import Søknad from '../../../types/s\u00F8knad/S\u00F8knad';

export const uttaksplanSkjemaErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const { uttaksplanSkjema } = søknad.temp;
    return (
        søknad.dekningsgrad !== undefined &&
        (uttaksplanSkjema.startdatoPermisjon !== undefined || uttaksplanSkjema.skalIkkeHaUttakFørTermin === true) &&
        uttaksplanSkjema.fellesperiodeukerForelder1 !== undefined
    );
};
