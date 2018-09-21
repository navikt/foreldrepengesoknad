import AnnenForelder from '../../types/søknad/AnnenForelder';
import { AnnenForelderStegVisibility } from '../../connected-components/steg/annen-forelder/visibility/annenForelderStegVisibility';
import { Barn, ForeldreansvarBarn } from '../../types/søknad/Barn';
import Søknad from '../../types/søknad/Søknad';

interface CleanedAnnenForelderSteg {
    annenForelder: Partial<AnnenForelder>;
    barn: Partial<Barn>;
}

export const cleanupAnnenForelder = (
    vis: AnnenForelderStegVisibility,
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
        erUfør,
        kanIkkeOppgis,
        ...rest
    } = annenForelder;

    const cleanedAnnenForelder: Partial<AnnenForelder> = {
        ...rest,
        kanIkkeOppgis,
        fornavn: vis.navnPåAnnenForelder ? fornavn : undefined,
        etternavn: vis.navnPåAnnenForelder ? etternavn : undefined,
        fnr: vis.fødselsnummer ? fnr : undefined,
        utenlandskFnr: vis.fødselsnummer && annenForelder.utenlandskFnr ? utenlandskFnr : undefined,
        bostedsland: vis.fødselsnummer && annenForelder.utenlandskFnr ? bostedsland : undefined,
        harRettPåForeldrepenger: vis.harRettPåForeldrepenger ? harRettPåForeldrepenger : undefined,
        erInformertOmSøknaden: vis.erAnnenForelderInformert ? erInformertOmSøknaden : undefined,
        erUfør: vis.erMorUfør ? erUfør : undefined
    };
    return cleanedAnnenForelder;
};

export const cleanupAnnenForelderBarn = (vis: AnnenForelderStegVisibility, barn: Barn): Partial<Barn> => {
    if (vis.omsorgsovertakelseDato === false) {
        return {
            ...barn,
            foreldreansvarsdato: undefined
        };
    }
    return {
        ...barn,
        foreldreansvarsdato: (barn as ForeldreansvarBarn).foreldreansvarsdato
    };
};

const cleanupAnnenForelderSteg = (
    vis: AnnenForelderStegVisibility,
    søknad: Partial<Søknad>
): CleanedAnnenForelderSteg => {
    return {
        annenForelder: cleanupAnnenForelder(vis, søknad),
        barn: søknad.barn ? cleanupAnnenForelderBarn(vis, søknad.barn) : {}
    };
};

export default cleanupAnnenForelderSteg;
