import { Søker } from '../../../../types/søknad/Søker';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { ForeldreansvarBarn, Barn } from '../../../../types/søknad/Barn';

const visRegistrertAnnenForelderBolk = (registrertAnnenForelder: RegistrertAnnenForelder | undefined): boolean => {
    return registrertAnnenForelder !== undefined;
};

const visAnnenForelderPersonaliaPart = (registrertAnnenForelder: RegistrertAnnenForelder | undefined): boolean => {
    return registrertAnnenForelder === undefined;
};

const visAnnenForelderOppfølgingPart = (
    annenForelder: Partial<AnnenForelder>,
    registrertAnnenForelder: RegistrertAnnenForelder | undefined
): boolean => {
    return ((annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder) !== undefined;
};

const visOmsorgsovertakelse = (barn: Partial<Barn>) => {
    const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
    return omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0;
};

const visAnnenForelderKanIkkeOppgisValg = (gjelderAdopsjonAvEktefellesBarn: boolean): boolean => {
    return gjelderAdopsjonAvEktefellesBarn === false;
};

const visFødselsnummerInput = (annenForelder: Partial<AnnenForelder>) =>
    annenForelder.navn !== undefined && annenForelder.navn !== '';

const visSkalFarEllerMedmorHaForeldrepengerSpørsmål = (søker: Partial<Søker>, erFarEllerMedmor: boolean): boolean => {
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
    annenForelder: Partial<AnnenForelder>,
    søker: Partial<Søker>,
    harDenAndreForelderenOpplystOmSinPågåendeSak: boolean | undefined
): boolean => {
    return (
        annenForelder.skalHaForeldrepenger === true ||
        (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
    );
};

const visErMorUførSpørsmål = (annenForelder: Partial<AnnenForelder>, erFarEllerMedmor: boolean): boolean => {
    return annenForelder.harRettPåForeldrepenger === false && erFarEllerMedmor;
};

const visErDenAndreForelderenInformertSpørsmål = (
    søker: Partial<Søker>,
    annenForelder: Partial<AnnenForelder>,
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

const visOmsorgsovertakelseDatoSpørsmål = (farEllerMedmorBolkSynlig: boolean, søker: Partial<Søker>): boolean => {
    return farEllerMedmorBolkSynlig && søker.erAleneOmOmsorg === true;
};

const visOmsorgsovertakelseVedleggSpørsmål = (
    farEllerMedmorBolkSynlig: boolean,
    søker: Partial<Søker>,
    barn: Partial<Barn>
): boolean => {
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
    visAnnenForelderOppfølgingPart,
    visAnnenForelderKanIkkeOppgisValg,
    visAnnenForelderPersonaliaPart,
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
