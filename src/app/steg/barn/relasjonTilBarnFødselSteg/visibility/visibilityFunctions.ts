import { RegistrertBarn } from '../../../../types/Person';
import Barn, { FødtBarn, UfødtBarn } from '../../../../types/søknad/Barn';
import moment from 'moment';
import { SøkerRolle } from 'app/types/søknad/Søknad';

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

const fødselsdatoerSpørsmålVisible = (fødtBarnPartial: boolean, barn: Partial<Barn>): boolean => {
    return fødtBarnPartial ? barn.antallBarn !== undefined : false;
};

const fødselsattestUploaderVisible = (fødselsdatoerSpørsmål: boolean, barn: Partial<FødtBarn>): boolean => {
    if (!fødselsdatoerSpørsmål) {
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

export const visTermindato = (fødselsdato: Date | undefined, rolle: SøkerRolle): boolean => {
    const barnFødtMerEnn10UkerSiden = moment(fødselsdato).add(10, 'weeks').isBefore(moment(new Date()));

    if ((rolle === SøkerRolle.FAR || rolle === SøkerRolle.MEDMOR) && barnFødtMerEnn10UkerSiden) {
        return false;
    }

    return true;
};

export const skalViseInfoOmPrematuruker = (fødselsdato: Date | undefined, termindato: Date | undefined): boolean => {
    if (fødselsdato === undefined || termindato === undefined) {
        return false;
    }

    const fødselsdatoEtterEllerLikFørsteJuli = moment(fødselsdato).isSameOrAfter(moment(new Date('2019-07-01')));

    return (
        moment(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(moment(termindato)) &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};

const visInfoOmPrematurukerVisible = (barn: Partial<FødtBarn>): boolean => {
    const fødselsdato = barn.fødselsdatoer !== undefined ? barn.fødselsdatoer[0] : undefined;
    const termindato = barn.termindato;

    return skalViseInfoOmPrematuruker(fødselsdato, termindato);
};

export default {
    hvilkeBarnGjelderSøknadenBolk: hvilkeBarnGjelderSøknadenBolkVisible,
    erBarnetFødtSpørsmål: erBarnetFødtSpørsmålVisible,
    fødtBarnPartial: fødtBarnPartialVisible,
    ufødtBarnPartial: ufødtBarnPartialVisible,
    fødselsdatoerSpørsmål: fødselsdatoerSpørsmålVisible,
    fødselsattestUploader: fødselsattestUploaderVisible,
    morForSykSpørsmål: morForSykSpørsmålVisible,
    termindato: termindatoVisible,
    terminbekreftelse: terminbekreftelsePartialVisible,
    terminbekreftelseDato: terminbekreftelseDatoVisible,
    visInfoOmPrematuruker: visInfoOmPrematurukerVisible,
};

export const RelasjonTilBarFødselVisibilityFunctions = {
    hvilkeBarnGjelderSøknadenBolkVisible,
    erBarnetFødtSpørsmålVisible,
    fødtBarnPartialVisible,
    ufødtBarnPartialVisible,
    fødselsdatoerSpørsmålVisible,
    fødselsattestUploaderVisible,
    morForSykSpørsmålVisible,
    termindatoVisible,
    terminbekreftelsePartialVisible,
    terminbekreftelseDatoVisible,
    visInfoOmPrematurukerVisible,
};
