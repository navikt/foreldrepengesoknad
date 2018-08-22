import Søknad from '../../../types/søknad/Søknad';
import Person, { RegistrertAnnenForelder } from '../../../types/Person';
import { erFarEllerMedmor } from '../../domain/personUtil';
import { ForeldreansvarBarn } from '../../../types/søknad/Barn';

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
    const { rolle, erAleneOmOmsorg } = søker;
    const kjønn = person && person.kjønn;
    const harOpplystOmSinPågåendeSak =
        registrertAnnenForelder &&
        registrertAnnenForelder.harOpplystOmSinPågåendeSak;
    const barn = søknad.barn as ForeldreansvarBarn;
    const vedleggOmsorgsovertakelse =
        barn.omsorgsovertakelse && barn.omsorgsovertakelse.length > 0;

    const result =
        kanIkkeOppgis === true ||
        erInformertOmSøknaden !== undefined ||
        erUfør !== undefined ||
        skalHaForeldrepenger === false ||
        (harRettPåForeldrepenger === false &&
            !erFarEllerMedmor(kjønn, rolle)) ||
        (skalHaForeldrepenger === true &&
            harRettPåForeldrepenger !== undefined) ||
        (harOpplystOmSinPågåendeSak && !erFarEllerMedmor(kjønn, rolle)) ||
        (erFarEllerMedmor(kjønn, rolle) &&
            erAleneOmOmsorg &&
            barn.foreldreansvarsdato &&
            vedleggOmsorgsovertakelse);

    return result !== undefined && result !== false;
};
