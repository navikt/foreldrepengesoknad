import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Barn } from '../../types/søknad/Barn';
import Søknad from '../../types/søknad/Søknad';
import {
    AnnenForelderStegVisibility,
    AnnenForelderSpørsmålKeys,
} from '../../steg/annenForelder/visibility/annenForelderStegVisibility';

interface CleanedAnnenForelderSteg {
    annenForelder: Partial<AnnenForelder>;
    barn: Partial<Barn>;
}

export const cleanupAnnenForelder = (
    visibility: AnnenForelderStegVisibility,
    søknad: Partial<Søknad>
): Partial<AnnenForelder> => {
    const { annenForelder } = søknad;
    if (!annenForelder) {
        return {};
    }
    const {
        fornavn,
        etternavn,
        fnr,
        bostedsland,
        utenlandskFnr,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        harMorUføretrygd,
        kanIkkeOppgis,
        ...rest
    } = annenForelder;

    const cleanedAnnenForelder: Partial<AnnenForelder> = {
        ...rest,
        kanIkkeOppgis,
        fornavn: kanIkkeOppgis === true ? undefined : fornavn,
        etternavn: kanIkkeOppgis === true ? undefined : etternavn,
        fnr: kanIkkeOppgis === true ? undefined : fnr,
        utenlandskFnr:
            visibility.isVisible(AnnenForelderSpørsmålKeys.fødselsnummer) && annenForelder.utenlandskFnr
                ? utenlandskFnr
                : undefined,
        bostedsland:
            visibility.isVisible(AnnenForelderSpørsmålKeys.fødselsnummer) && annenForelder.utenlandskFnr
                ? bostedsland
                : undefined,
        harRettPåForeldrepenger: visibility.isVisible(AnnenForelderSpørsmålKeys.harRettPåForeldrepenger)
            ? harRettPåForeldrepenger
            : undefined,
        erInformertOmSøknaden: visibility.isVisible(AnnenForelderSpørsmålKeys.erAnnenForelderInformert)
            ? erInformertOmSøknaden
            : undefined,
        harMorUføretrygd : visibility.isVisible(AnnenForelderSpørsmålKeys.erMorUfør) ? harMorUføretrygd : undefined,
    };
    return cleanedAnnenForelder;
};

export const cleanupAnnenForelderBarn = (visibility: AnnenForelderStegVisibility, barn: Barn): Partial<Barn> => {
    if (visibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg) === false) {
        return {
            ...barn,
            datoForAleneomsorg: undefined,
            dokumentasjonAvAleneomsorg: undefined,
        };
    }
    return {
        ...barn,
        datoForAleneomsorg: barn.datoForAleneomsorg,
    };
};

const cleanupAnnenForelderSteg = (
    vis: AnnenForelderStegVisibility,
    søknad: Partial<Søknad>
): CleanedAnnenForelderSteg => {
    return {
        annenForelder: cleanupAnnenForelder(vis, søknad),
        barn: søknad.barn ? cleanupAnnenForelderBarn(vis, søknad.barn) : {},
    };
};

export default cleanupAnnenForelderSteg;
