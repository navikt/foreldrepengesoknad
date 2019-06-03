import { RegistrertBarn } from '../../../types/Person';
import Barn, { FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';

const hvilkeBarnGjelderSøknadenBolkVisible = (registrerteBarn: RegistrertBarn[]): boolean => {
    return registrerteBarn.length > 0;
};

const erBarnetFødtSpørsmålVisible = (hvilketBarnGjelderSøknadenBolk: boolean, gjelderAnnetBarn?: boolean): boolean => {
    return gjelderAnnetBarn || !hvilketBarnGjelderSøknadenBolk;
};

const fødtBarnPartialVisible = (erBarnetFødtSpørsmål: boolean, barn: Partial<Barn>): boolean => {
    return erBarnetFødtSpørsmål ? barn.erBarnetFødt === true : false;
};

const ufødtBarnPartialVisible = (erBarnetFødtSpørsmål: boolean, barn: Partial<Barn>): boolean => {
    return erBarnetFødtSpørsmål ? barn.erBarnetFødt === false : false;
};

const fødeslsdatoerSpørsmålVisible = (fødtBarnPartial: boolean, barn: Partial<Barn>): boolean => {
    return fødtBarnPartial ? barn.antallBarn !== undefined : false;
};

const fødselsattestUploaderVisible = (fødeslsdatoerSpørsmål: boolean, barn: Partial<FødtBarn>): boolean => {
    if (!fødeslsdatoerSpørsmål) {
        return false;
    }

    return (
        barn.fødselsdatoer !== undefined &&
        barn.fødselsdatoer.length > 0 &&
        barn.fødselsdatoer.every((fødselsdato: Date) => fødselsdato instanceof Date)
    );
};

const morForSykSpørsmålVisible = (ufødtBarnPartial: boolean, erFarEllerMedmor: boolean): boolean => {
    return ufødtBarnPartial && erFarEllerMedmor;
};

const termindatoVisible = (ufødtBarnPartial: boolean, barn: Partial<Barn>): boolean => {
    return ufødtBarnPartial && barn.antallBarn !== undefined;
};

const terminbekreftelsePartialVisible = (
    termindatoVisibleResult: boolean,
    barn: Partial<UfødtBarn>,
    skalLasteOppTerminbekreftelse: boolean
): boolean => {
    return termindatoVisibleResult && skalLasteOppTerminbekreftelse && barn.termindato !== undefined;
};

const terminbekreftelseDatoVisible = (
    terminbekreftelsePartialVisibleResult: boolean,
    barn: Partial<UfødtBarn>
): boolean => {
    return (
        terminbekreftelsePartialVisibleResult &&
        barn.terminbekreftelse !== undefined &&
        barn.terminbekreftelse.length > 0 &&
        barn.termindato !== undefined
    );
};

export default {
    hvilkeBarnGjelderSøknadenBolk: hvilkeBarnGjelderSøknadenBolkVisible,
    erBarnetFødtSpørsmål: erBarnetFødtSpørsmålVisible,
    fødtBarnPartial: fødtBarnPartialVisible,
    ufødtBarnPartial: ufødtBarnPartialVisible,
    fødselsdatoerSpørsmål: fødeslsdatoerSpørsmålVisible,
    fødselsattestUploader: fødselsattestUploaderVisible,
    morForSykSpørsmål: morForSykSpørsmålVisible,
    termindato: termindatoVisible,
    terminbekreftelse: terminbekreftelsePartialVisible,
    terminbekreftelseDato: terminbekreftelseDatoVisible
};

export const RelasjonTilBarFødselVisibilityFunctions = {
    hvilkeBarnGjelderSøknadenBolkVisible,
    erBarnetFødtSpørsmålVisible,
    fødtBarnPartialVisible,
    ufødtBarnPartialVisible,
    fødeslsdatoerSpørsmålVisible,
    fødselsattestUploaderVisible,
    morForSykSpørsmålVisible,
    termindatoVisible,
    terminbekreftelsePartialVisible,
    terminbekreftelseDatoVisible
};
