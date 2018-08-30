import { AnnenForelderVisibilityFuncs as v } from './visibilitySelectors';
import { AppState } from '../../../../redux/reducers';

export interface AnnenForelderStegPersonaliaVisibility {
    annenForelderKanIkkeOppgisValg: boolean;
    fødselsnummerInput: boolean;
}

export interface AnnenForelderErKjentVisibility {
    skalFarEllerMedmorHaForeldrepengerSpørsmål: boolean;
    harRettPåForeldrepengerSpørsmål: boolean;
    skalAnnenForelderHaForeldrepengerSpørsmål: boolean;
    erMorUførSpørsmål: boolean;
    infoOmRettigheterOgDelingAvUttaksplan: boolean;
    erDenAndreForelderenInformertSpørsmål: boolean;
    omsorgsovertakelseDatoSpørsmål: boolean;
    farEllerMedmorBolk: boolean;
    omsorgsovertakelseVedleggSpørsmål: boolean;
    infoOmOmsorgsovertakelse: boolean;
}

export interface AnnenForelderStegVisibility {
    registrertAnnenForelderBolk: boolean;
    annenForelderPersonaliaSkjema: boolean;
    annenForelderErKjentPartial: boolean;
    personalia: AnnenForelderStegPersonaliaVisibility;
    annenForelderErKjent: AnnenForelderErKjentVisibility;
}

export const getAnnenForelderVisibility = (state: AppState): AnnenForelderStegVisibility => {
    return {
        registrertAnnenForelderBolk: v.visRegistrertAnnenForelderBolk(state),
        annenForelderPersonaliaSkjema: v.visAnnenForelderPersonaliaSkjema(state),
        annenForelderErKjentPartial: v.visAnnenForelderErKjentPartial(state),

        personalia: {
            annenForelderKanIkkeOppgisValg: v.visAnnenForelderKanIkkeOppgisValg(state),
            fødselsnummerInput: v.visFødselsnummerInput(state)
        },
        annenForelderErKjent: {
            skalFarEllerMedmorHaForeldrepengerSpørsmål: v.visSkalFarEllerMedmorHaForeldrepengerSpørsmål(state),
            harRettPåForeldrepengerSpørsmål: v.visHarRettPåForeldrepengerSpørsmål(state),
            skalAnnenForelderHaForeldrepengerSpørsmål: v.visSkalAnnenForelderHaForeldrepengerSpørsmål(state),
            erMorUførSpørsmål: v.visErMorUførSpørsmål(state),
            infoOmRettigheterOgDelingAvUttaksplan: v.visInfoOmRettigheterOgDelingAvUttaksplan(state),
            erDenAndreForelderenInformertSpørsmål: v.visErDenAndreForelderenInformertSpørsmål(state),
            omsorgsovertakelseDatoSpørsmål: v.visOmsorgsovertakelseDatoSpørsmål(state),
            farEllerMedmorBolk: v.visFarEllerMedmorBolk(state),
            omsorgsovertakelseVedleggSpørsmål: v.visOmsorgsovertakelseVedleggSpørsmål(state),
            infoOmOmsorgsovertakelse: v.visInfoOmRettigheterOgDelingAvUttaksplan(state)
        }
    };
};
