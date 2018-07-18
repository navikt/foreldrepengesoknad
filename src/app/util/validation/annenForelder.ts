import Søknad from '../../types/søknad/Søknad';
import { RegistrertAnnenForelder } from '../../types/søknad/AnnenForelder';
import Person from '../../types/Person';
import { erFarEllerMedmor } from '../domain/personUtil';

export const annenForelderErGyldig = (
    søknad: Søknad,
    person: Person,
    registrertAnnenForelder?: RegistrertAnnenForelder
): boolean => {
    const { annenForelder, søker } = søknad;
    const {
        kanIkkeOppgis,
        harRettPåForeldrepenger,
        erUfør,
        erInformertOmSøknaden,
        skalHaForeldrepenger
    } = annenForelder;
    const { rolle } = søker;
    const kjønn = person && person.kjønn;
    const harOpplystOmSinPågåendeSak =
        registrertAnnenForelder &&
        registrertAnnenForelder.harOpplystOmSinPågåendeSak;

    const result =
        kanIkkeOppgis === true ||
        erInformertOmSøknaden !== undefined ||
        erUfør !== undefined ||
        skalHaForeldrepenger === false ||
        (harRettPåForeldrepenger === false &&
            !erFarEllerMedmor(kjønn, rolle)) ||
        (skalHaForeldrepenger === true &&
            harRettPåForeldrepenger !== undefined) ||
        (harOpplystOmSinPågåendeSak && !erFarEllerMedmor(kjønn, rolle));

    return result !== undefined && result !== false;
};
