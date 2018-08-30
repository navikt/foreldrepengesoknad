import { createSelector } from 'reselect';
import { AnnenForelderDataSelectors as data } from './dataSelectors';
import { Søker } from '../../../../types/søknad/Søker';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { ForeldreansvarBarn, Barn } from '../../../../types/søknad/Barn';

const visRegistrertAnnenForelderBolk = createSelector(
    [data.getRegistrertAnnenForelder],
    (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder !== undefined
);

const visAnnenForelderPersonaliaSkjema = createSelector(
    [data.getRegistrertAnnenForelder],
    (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder === undefined
);

const visAnnenForelderErKjentPartial = createSelector(
    [data.getAnnenForelder, data.getRegistrertAnnenForelder],
    (annenForelder: AnnenForelder, registrertAnnenForelder): boolean =>
        ((annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder) !== undefined
);

const visOmsorgsovertakelse = createSelector([data.getBarn], (barn: Barn) => {
    const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
    return omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0;
});

const visAnnenForelderKanIkkeOppgisValg = createSelector(
    [data.getGjelderAdopsjonAvEktefellesBarn],
    (adopsjonAvEktefellesBarn: boolean): boolean => {
        return !adopsjonAvEktefellesBarn;
    }
);

const visFødselsnummerInput = createSelector([data.getAnnenForelder], (annenForelder: AnnenForelder) => {
    return annenForelder.navn !== undefined && annenForelder.navn !== '';
});

const visSkalFarEllerMedmorHaForeldrepengerSpørsmål = createSelector(
    [data.getSøker, data.getErFarEllerMedmor],
    (søker: Søker, farEllerMedmor): boolean => {
        return !farEllerMedmor && søker.erAleneOmOmsorg === true;
    }
);

const visHarRettPåForeldrepengerSpørsmål = createSelector(
    [data.getAnnenForelder, data.getSøker, data.getHarDenAndreForelderenOpplystOmSinPågåendeSak],
    (annenForelder, søker, harDenAndreForelderenOpplystOmSinPågåendeSak): boolean => {
        return (
            annenForelder.skalHaForeldrepenger === true ||
            (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
        );
    }
);
const visSkalAnnenForelderHaForeldrepengerSpørsmål = createSelector(
    [data.getAnnenForelder, data.getSøker, data.getHarDenAndreForelderenOpplystOmSinPågåendeSak],
    (annenForelder, søker, harDenAndreForelderenOpplystOmSinPågåendeSak): boolean => {
        return (
            annenForelder.skalHaForeldrepenger === true ||
            (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
        );
    }
);

const visErMorUførSpørsmål = createSelector(
    [data.getAnnenForelder, data.getErFarEllerMedmor],
    (annenForelder, erFarEllerMedmor): boolean => {
        return annenForelder.harRettPåForeldrepenger === false && erFarEllerMedmor;
    }
);

const visInfoOmRettigheterOgDelingAvUttaksplan = createSelector([data.getAnnenForelder], (annenForelder): boolean => {
    return annenForelder.harRettPåForeldrepenger === true;
});

const visErDenAndreForelderenInformertSpørsmål = createSelector(
    [
        data.getSøker,
        data.getAnnenForelder,
        data.getHarDenAndreForelderenOpplystOmSinPågåendeSak,
        data.getErFarEllerMedmor
    ],
    (søker, annenForelder, harDenAndreForelderenOpplystOmSinPågåendeSak, erFarEllerMedmor): boolean => {
        return (
            (søker.erAleneOmOmsorg === false && annenForelder.harRettPåForeldrepenger === true) ||
            (søker.erAleneOmOmsorg === false &&
                harDenAndreForelderenOpplystOmSinPågåendeSak === true &&
                erFarEllerMedmor === true)
        );
    }
);

const visOmsorgsovertakelseDatoSpørsmål = createSelector([data.getSøker], (søker): boolean => {
    return søker.erAleneOmOmsorg === true;
});

const visFarEllerMedmorBolk = createSelector([data.getErFarEllerMedmor], (farEllerMedmor): boolean => {
    return farEllerMedmor;
});

const visOmsorgsovertakelseVedleggSpørsmål = createSelector([data.getSøker, data.getBarn], (søker, barn): boolean => {
    return søker.erAleneOmOmsorg === true && (barn as ForeldreansvarBarn).foreldreansvarsdato !== undefined;
});

export const AnnenForelderVisibilityFuncs = {
    visAnnenForelderErKjentPartial,
    visAnnenForelderKanIkkeOppgisValg,
    visAnnenForelderPersonaliaSkjema,
    visFødselsnummerInput,
    visHarRettPåForeldrepengerSpørsmål,
    visOmsorgsovertakelse,
    visRegistrertAnnenForelderBolk,
    visSkalAnnenForelderHaForeldrepengerSpørsmål,
    visSkalFarEllerMedmorHaForeldrepengerSpørsmål,
    visErMorUførSpørsmål,
    visInfoOmRettigheterOgDelingAvUttaksplan,
    visErDenAndreForelderenInformertSpørsmål,
    visOmsorgsovertakelseDatoSpørsmål,
    visFarEllerMedmorBolk,
    visOmsorgsovertakelseVedleggSpørsmål
};
