import { RelasjonTilBarFødselVisibilityFunctions as visibility } from './visibilityFunctions';
import { skalSøkerLasteOppTerminbekreftelse } from '../../../../util/validation/steg/barn';
import { getErSøkerFarEllerMedmor } from '../../../../util/domain/personUtil';
import { ApiState } from '../../../../redux/reducers/apiReducer';
import Søknad from '../../../../types/søknad/Søknad';
import { isUfødtBarn } from '../../../../types/søknad/Barn';

export interface RelasjonTilBarnFødtVisibility {
    fødselsdatoer: boolean;
    fødselsattest: boolean;
    visInfoOmPrematuruker: boolean;
}

export interface RelasjonTilBarnUfødtVisibility {
    erMorForSyk: boolean;
    terminbekreftelseDato: boolean;
    terminbekreftelse: boolean;
    termindato: boolean;
}

export interface RelasjonTilBarnFødselStegVisibility {
    hvilketBarnGjelderSøknadenBolk: boolean;
    erBarnetFødt: boolean;
    ufødtBarnPart: boolean;
    fødtBarnPart: boolean;
    født: RelasjonTilBarnFødtVisibility;
    ufødt: RelasjonTilBarnUfødtVisibility;
}

export const getRelasjonTilBarnFødselVisibility = (
    søknad: Søknad,
    api: ApiState
): RelasjonTilBarnFødselStegVisibility => {
    const { søkerinfo } = api;
    const {
        søker,
        barn,
        situasjon,
        ekstrainfo: { søknadenGjelderBarnValg },
    } = søknad;

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søker.rolle);

    const skalLasteOppTerminbekreftelse = skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo!.arbeidsforhold);
    const registrerteBarn = søkerinfo!.registrerteBarn || [];

    const hvilketBarnGjelderSøknadenBolk = visibility.hvilkeBarnGjelderSøknadenBolkVisible(registrerteBarn);
    const erBarnetFødt = visibility.erBarnetFødtSpørsmålVisible(
        hvilketBarnGjelderSøknadenBolk,
        søknadenGjelderBarnValg ? søknadenGjelderBarnValg.gjelderAnnetBarn : undefined
    );
    const ufødtBarnPart = visibility.ufødtBarnPartialVisible(erBarnetFødt, barn);
    const fødtBarnPart = visibility.fødtBarnPartialVisible(erBarnetFødt, barn);

    const fødselsdatoer = visibility.fødselsdatoerSpørsmålVisible(fødtBarnPart, barn);
    const fødselsattest = visibility.fødselsattestUploaderVisible(fødselsdatoer, barn);

    const erMorForSyk = visibility.morForSykSpørsmålVisible(ufødtBarnPart, søkerErFarEllerMedmor);
    const termindato = visibility.termindatoVisible(ufødtBarnPart, barn);
    const terminbekreftelse =
        isUfødtBarn(barn, situasjon) &&
        visibility.terminbekreftelsePartialVisible(termindato, barn, skalLasteOppTerminbekreftelse);
    const terminbekreftelseDato = visibility.terminbekreftelseDatoVisible(terminbekreftelse, barn);
    const visInfoOmPrematuruker = visibility.visInfoOmPrematurukerVisible(barn);

    return {
        hvilketBarnGjelderSøknadenBolk,
        ufødtBarnPart,
        fødtBarnPart,
        erBarnetFødt,
        født: {
            fødselsdatoer,
            fødselsattest,
            visInfoOmPrematuruker,
        },
        ufødt: {
            erMorForSyk,
            termindato,
            terminbekreftelse,
            terminbekreftelseDato,
        },
    };
};
