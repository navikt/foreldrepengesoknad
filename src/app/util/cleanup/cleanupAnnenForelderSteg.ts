import AnnenForelder from '../../types/søknad/AnnenForelder';
import { AppState } from '../../redux/reducers';
import { getAnnenForelderVisibility } from '../../connected-components/steg/annen-forelder/visibility/annenForelderVisibility';
import { Barn, ForeldreansvarBarn } from '../../types/søknad/Barn';

interface CleanedAnnenForelderSteg {
    annenForelder: Partial<AnnenForelder>;
    barn: Partial<Barn>;
}

const cleanupAnnenForelder = (state: AppState): Partial<AnnenForelder> => {
    const { søknad } = state;
    const {
        navn,
        fnr,
        bostedsland,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        skalHaForeldrepenger,
        erUfør,
        ...rest
    } = søknad.annenForelder;

    const vis = getAnnenForelderVisibility(state);
    return {
        ...rest,
        navn: vis.personalia.fødselsnummerInput ? navn : undefined,
        fnr: vis.personalia.fødselsnummerInput ? fnr : undefined,
        bostedsland: søknad.annenForelder.utenlandskFnr ? bostedsland : undefined,
        skalHaForeldrepenger: vis.annenForelderOppfølging.skalFarEllerMedmorHaForeldrepengerSpørsmål
            ? skalHaForeldrepenger
            : undefined,
        harRettPåForeldrepenger: vis.annenForelderOppfølging.harRettPåForeldrepengerSpørsmål
            ? harRettPåForeldrepenger
            : undefined,
        erInformertOmSøknaden: vis.annenForelderOppfølging.erAnnenForelderInformertSpørsmål
            ? erInformertOmSøknaden
            : undefined,
        erUfør: vis.annenForelderOppfølging.erMorUførSpørsmål ? erUfør : undefined
    };
};

const cleanupAnnenForelderBarn = (state: AppState): Partial<Barn> => {
    const vis = getAnnenForelderVisibility(state);
    const { barn } = state.søknad;
    if (!vis.annenForelderOppfølging.omsorgsovertakelseDatoSpørsmål) {
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

const cleanupAnnenForelderSteg = (state: AppState): CleanedAnnenForelderSteg => {
    return {
        annenForelder: cleanupAnnenForelder(state),
        barn: cleanupAnnenForelderBarn(state)
    };
};

export default cleanupAnnenForelderSteg;
