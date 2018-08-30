import { createSelector } from 'reselect';
import { AnnenForelderVisibilityFuncs } from './visibilitySelectors';

export interface AnnenForelderStegPersonaliaVisibility {
    annenForelderKanIkkeOppgisValg: boolean;
    fødselsnummerInput: boolean;
}

export interface AnnenForelderErKjentVisibility {
    skalFarEllerMedmorHaForeldrepengerSpørsmål: boolean;
    harRettPåForeldrepengerSpørsmål: boolean;
    skalAnnenForelderHaForeldrepengerSpørsmål: boolean;
}

export interface AnnenForelderStegVisibility {
    registrertAnnenForelderBolk: boolean;
    annenForelderPersonaliaSkjema: boolean;
    annenForelderErKjentPartial: boolean;
    informasjonOmOmsorgsovertakelse: boolean;
    personalia: AnnenForelderStegPersonaliaVisibility;
    annenForelderErKjent: AnnenForelderErKjentVisibility;
}

export const getAnnenForelderVisibility = createSelector(
    [
        AnnenForelderVisibilityFuncs.visRegistrertAnnenForelderBolk,
        AnnenForelderVisibilityFuncs.visAnnenForelderPersonaliaSkjema,
        AnnenForelderVisibilityFuncs.visAnnenForelderErKjentPartial,
        AnnenForelderVisibilityFuncs.visOmsorgsovertakelse,
        AnnenForelderVisibilityFuncs.visAnnenForelderKanIkkeOppgisValg,
        AnnenForelderVisibilityFuncs.visFødselsnummerInput,
        AnnenForelderVisibilityFuncs.visSkalFarEllerMedmorHaForeldrepengerSpørsmål,
        AnnenForelderVisibilityFuncs.visHarRettPåForeldrepengerSpørsmål,
        AnnenForelderVisibilityFuncs.visSkalAnnenForelderHaForeldrepengerSpørsmål
    ],
    (
        registrertAnnenForelderBolk,
        annenForelderPersonaliaSkjema,
        annenForelderErKjentPartial,
        informasjonOmOmsorgsovertakelse,
        annenForelderKanIkkeOppgisValg,
        fødselsnummerInput,
        skalFarEllerMedmorHaForeldrepengerSpørsmål,
        harRettPåForeldrepengerSpørsmål,
        skalAnnenForelderHaForeldrepengerSpørsmål
    ): AnnenForelderStegVisibility => ({
        registrertAnnenForelderBolk,
        annenForelderPersonaliaSkjema,
        annenForelderErKjentPartial,
        informasjonOmOmsorgsovertakelse,
        personalia: {
            annenForelderKanIkkeOppgisValg,
            fødselsnummerInput
        },
        annenForelderErKjent: {
            skalFarEllerMedmorHaForeldrepengerSpørsmål,
            harRettPåForeldrepengerSpørsmål,
            skalAnnenForelderHaForeldrepengerSpørsmål
        }
    })
);

export default AnnenForelderStegVisibility;
