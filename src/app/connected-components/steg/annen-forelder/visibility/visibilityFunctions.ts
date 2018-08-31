import { Søker } from '../../../../types/søknad/Søker';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { ForeldreansvarBarn, Barn } from '../../../../types/søknad/Barn';
import { AnnenForelderDataFunctions as df } from './dataFunctions';

const visRegistrertAnnenForelderBolk = (registrertAnnenForelder: RegistrertAnnenForelder | undefined): boolean => {
    return registrertAnnenForelder !== undefined;
};

const visAnnenForelderPersonaliaSkjema = (registrertAnnenForelder: RegistrertAnnenForelder | undefined): boolean => {
    return registrertAnnenForelder === undefined;
};

const visAnnenForelderOppfølgingPartial = (
    annenForelder: AnnenForelder,
    registrertAnnenForelder: RegistrertAnnenForelder | undefined
): boolean => {
    return ((annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder) !== undefined;
};

const visOmsorgsovertakelse = (barn: Barn) => {
    const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
    return omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0;
};

const visAnnenForelderKanIkkeOppgisValg = (barn: Barn): boolean => {
    return df.getGjelderAdopsjonAvEktefellesBarn(barn);
};

const visFødselsnummerInput = (annenForelder: AnnenForelder) =>
    annenForelder.navn !== undefined && annenForelder.navn !== '';

const visSkalFarEllerMedmorHaForeldrepengerSpørsmål = (søker: Søker, erFarEllerMedmor: boolean): boolean => {
    return !erFarEllerMedmor && søker.erAleneOmOmsorg === true;
};

const visHarRettPåForeldrepengerSpørsmål = (
    annenForelder: AnnenForelder,
    søker: Søker,
    harDenAndreForelderenOpplystOmSinPågåendeSak: boolean
): boolean => {
    return (
        annenForelder.skalHaForeldrepenger === true ||
        (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
    );
};

const visSkalAnnenForelderHaForeldrepengerSpørsmål = (
    annenForelder: AnnenForelder,
    søker: Søker,
    harDenAndreForelderenOpplystOmSinPågåendeSak: boolean
): boolean => {
    return (
        annenForelder.skalHaForeldrepenger === true ||
        (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
    );
};

const visErMorUførSpørsmål = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean): boolean => {
    return annenForelder.harRettPåForeldrepenger === false && erFarEllerMedmor;
};

const visErDenAndreForelderenInformertSpørsmål = (
    søker: Søker,
    annenForelder: AnnenForelder,
    harDenAndreForelderenOpplystOmSinPågåendeSak: boolean,
    erFarEllerMedmor: boolean
): boolean => {
    return (
        (søker.erAleneOmOmsorg === false && annenForelder.harRettPåForeldrepenger === true) ||
        (søker.erAleneOmOmsorg === false &&
            harDenAndreForelderenOpplystOmSinPågåendeSak === true &&
            erFarEllerMedmor === true)
    );
};

const visFarEllerMedmorBolk = (erFarEllerMedmor: boolean): boolean => {
    return erFarEllerMedmor;
};

const visOmsorgsovertakelseDatoSpørsmål = (farEllerMedmorBolkSynlig: boolean, søker: Søker): boolean => {
    return farEllerMedmorBolkSynlig && søker.erAleneOmOmsorg === true;
};

const visOmsorgsovertakelseVedleggSpørsmål = (farEllerMedmorBolkSynlig: boolean, søker: Søker, barn: Barn): boolean => {
    return (
        farEllerMedmorBolkSynlig &&
        søker.erAleneOmOmsorg === true &&
        (barn as ForeldreansvarBarn).foreldreansvarsdato !== undefined
    );
};

const visInfoOmOmsorgsovertakelse = (barn: Barn) => {
    const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
    return omsorgsovertakelse && omsorgsovertakelse.length > 0;
};

export const AnnenForelderVisibilityFunctions = {
    visAnnenForelderOppfølgingPartial,
    visAnnenForelderKanIkkeOppgisValg,
    visAnnenForelderPersonaliaSkjema,
    visFødselsnummerInput,
    visHarRettPåForeldrepengerSpørsmål,
    visOmsorgsovertakelse,
    visRegistrertAnnenForelderBolk,
    visSkalAnnenForelderHaForeldrepengerSpørsmål,
    visSkalFarEllerMedmorHaForeldrepengerSpørsmål,
    visErMorUførSpørsmål,
    visErDenAndreForelderenInformertSpørsmål,
    visOmsorgsovertakelseDatoSpørsmål,
    visFarEllerMedmorBolk,
    visOmsorgsovertakelseVedleggSpørsmål,
    visInfoOmOmsorgsovertakelse
};
