import { Søkerinfo } from '../../../types/søkerinfo';
import Søknad from '../../../types/søknad/Søknad';

export const uttaksplanSkjemaErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const { uttaksplanSkjema } = søknad.temp;
    return (
        søknad.dekningsgrad !== undefined &&
        (uttaksplanSkjema.startdatoPermisjon !== undefined || uttaksplanSkjema.skalIkkeHaUttakFørTermin === true) &&
        uttaksplanSkjema.fellesperiodeukerForelder1 !== undefined
    );
};
