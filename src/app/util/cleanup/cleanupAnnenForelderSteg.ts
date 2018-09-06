import AnnenForelder from '../../types/søknad/AnnenForelder';
import { AnnenForelderStegVisibility } from '../../connected-components/steg/annen-forelder/visibility/annenForelderVisibility';
import { Barn, ForeldreansvarBarn } from '../../types/søknad/Barn';
import { Søkerinfo } from '../../types/søkerinfo';
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
        navn,
        fnr,
        bostedsland,
        utenlandskFnr,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        skalHaForeldrepenger,
        erUfør,
        kanIkkeOppgis,
        ...rest
    } = annenForelder;

    const kanOppgis = (visProp: boolean) => {
        if (kanIkkeOppgis) {
            return false;
        }
        return visProp;
    };

    return {
        ...rest,
        kanIkkeOppgis: vis.annenForelderKanIkkeOppgisValg ? kanIkkeOppgis : undefined,
        navn: kanOppgis(vis.fødselsnummerInput) ? navn : undefined,
        fnr: kanOppgis(vis.fødselsnummerInput) ? fnr : undefined,
        utenlandskFnr: kanOppgis(annenForelder.utenlandskFnr) ? utenlandskFnr : undefined,
        bostedsland: kanOppgis(annenForelder.utenlandskFnr) ? bostedsland : undefined,
        skalHaForeldrepenger: kanOppgis(vis.skalFarEllerMedmorHaForeldrepengerSpørsmål)
            ? skalHaForeldrepenger
            : undefined,
        harRettPåForeldrepenger: kanOppgis(vis.harRettPåForeldrepengerSpørsmål) ? harRettPåForeldrepenger : undefined,
        erInformertOmSøknaden: kanOppgis(vis.erAnnenForelderInformertSpørsmål) ? erInformertOmSøknaden : undefined,
        erUfør: kanOppgis(vis.erMorUførSpørsmål) ? erUfør : undefined
    };
};

export const cleanupAnnenForelderBarn = (vis: AnnenForelderStegVisibility, barn: Barn): Partial<Barn> => {
    if (!vis.omsorgsovertakelseDatoSpørsmål) {
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
    søknad: Partial<Søknad>,
    søkerinfo: Søkerinfo
): CleanedAnnenForelderSteg => {
    return {
        annenForelder: cleanupAnnenForelder(vis, søknad),
        barn: søknad.barn ? cleanupAnnenForelderBarn(vis, søknad.barn) : {}
    };
};

export default cleanupAnnenForelderSteg;
