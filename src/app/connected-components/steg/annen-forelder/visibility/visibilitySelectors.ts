import { createSelector } from 'reselect';
import { AnnenForelderDataSelectors as selectors } from './dataSelectors';
import { Søker } from '../../../../types/søknad/Søker';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { ForeldreansvarBarn, Barn } from '../../../../types/søknad/Barn';

const visRegistrertAnnenForelderBolk = createSelector(
    [selectors.getRegistrertAnnenForelder],
    (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder !== undefined
);

const visAnnenForelderPersonaliaSkjema = createSelector(
    [selectors.getRegistrertAnnenForelder],
    (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder === undefined
);

const visAnnenForelderErKjentPartial = createSelector(
    [selectors.getAnnenForelder, selectors.getRegistrertAnnenForelder],
    (annenForelder: AnnenForelder, registrertAnnenForelder) =>
        ((annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder) !== undefined
);

const visOmsorgsovertakelse = createSelector([selectors.getBarn], (barn: Barn) => {
    const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
    return omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0;
});

const visAnnenForelderKanIkkeOppgisValg = createSelector(
    [selectors.getGjelderAdopsjonAvEktefellesBarn],
    (adopsjonAvEktefellesBarn: boolean) => {
        return !adopsjonAvEktefellesBarn;
    }
);

const visFødselsnummerInput = createSelector([selectors.getAnnenForelder], (annenForelder: AnnenForelder) => {
    return annenForelder.navn !== undefined && annenForelder.navn !== '';
});

const visSkalFarEllerMedmorHaForeldrepengerSpørsmål = createSelector(
    [selectors.getSøker, selectors.getErFarEllerMedmor],
    (søker: Søker, farEllerMedmor) => {
        return !farEllerMedmor && søker.erAleneOmOmsorg === true;
    }
);

const visHarRettPåForeldrepengerSpørsmål = createSelector(
    [selectors.getAnnenForelder, selectors.getSøker, selectors.getHarDenAndreForelderenOpplystOmSinPågåendeSak],
    (annenForelder, søker, harDenAndreForelderenOpplystOmSinPågåendeSak) => {
        return (
            annenForelder.skalHaForeldrepenger === true ||
            (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
        );
    }
);
const visSkalAnnenForelderHaForeldrepengerSpørsmål = createSelector(
    [selectors.getAnnenForelder, selectors.getSøker, selectors.getHarDenAndreForelderenOpplystOmSinPågåendeSak],
    (annenForelder, søker, harDenAndreForelderenOpplystOmSinPågåendeSak) => {
        return (
            annenForelder.skalHaForeldrepenger === true ||
            (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
        );
    }
);

export const AnnenForelderVisibilityFuncs = {
    visAnnenForelderErKjentPartial,
    visAnnenForelderKanIkkeOppgisValg,
    visAnnenForelderPersonaliaSkjema,
    visFødselsnummerInput,
    visHarRettPåForeldrepengerSpørsmål,
    visOmsorgsovertakelse,
    visRegistrertAnnenForelderBolk,
    visSkalAnnenForelderHaForeldrepengerSpørsmål,
    visSkalFarEllerMedmorHaForeldrepengerSpørsmål
};
