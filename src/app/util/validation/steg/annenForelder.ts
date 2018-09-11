import Søknad from '../../../types/søknad/Søknad';
import { erFarEllerMedmor } from '../../domain/personUtil';
import { ForeldreansvarBarn } from '../../../types/søknad/Barn';
import { Søkerinfo } from '../../../types/søkerinfo';

export const annenForelderErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const { annenForelder, søker, sensitivInfoIkkeLagre } = søknad;

    const {
        kanIkkeOppgis,
        harRettPåForeldrepenger,
        erUfør,
        erInformertOmSøknaden,
        skalHaForeldrepenger
    } = annenForelder;
    const { rolle, erAleneOmOmsorg } = søker;
    const { kjønn } = søkerinfo.person;
    const harOpplystOmSinPågåendeSak =
        sensitivInfoIkkeLagre.registrertAnnenForelder &&
        sensitivInfoIkkeLagre.registrertAnnenForelder.harOpplystOmSinPågåendeSak;
    const barn = søknad.barn as ForeldreansvarBarn;
    const vedleggOmsorgsovertakelse = barn.omsorgsovertakelse && barn.omsorgsovertakelse.length > 0;

    const result =
        kanIkkeOppgis === true ||
        erInformertOmSøknaden !== undefined ||
        erUfør !== undefined ||
        skalHaForeldrepenger === false ||
        (harRettPåForeldrepenger === false && !erFarEllerMedmor(kjønn, rolle)) ||
        (skalHaForeldrepenger === true && harRettPåForeldrepenger !== undefined) ||
        (harOpplystOmSinPågåendeSak && !erFarEllerMedmor(kjønn, rolle)) ||
        (erFarEllerMedmor(kjønn, rolle) && erAleneOmOmsorg && barn.foreldreansvarsdato && vedleggOmsorgsovertakelse);

    return result !== undefined && result !== false;
};
