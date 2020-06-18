import {
    UfødtBarn,
    Adopsjonsbarn,
    ForeldreansvarBarn,
    Barn,
    FødtBarn,
    BarnCommonProps,
    isFødtBarn,
    isUfødtBarn,
    isAdopsjonsbarn,
    isForeldreansvarsbarn,
} from '../types/søknad/Barn';
import { Søkersituasjon } from '../types/søknad/Søknad';

const getBarnProps = (barn: Partial<Barn | UfødtBarn | Adopsjonsbarn | ForeldreansvarBarn>): Partial<BarnCommonProps> =>
    removeUndefinedProps({
        antallBarn: barn.antallBarn,
        datoForAleneomsorg: barn.datoForAleneomsorg,
        dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg,
        erBarnetFødt: barn.erBarnetFødt,
    });

export const getUfødtBarnProps = (barn: Partial<UfødtBarn>): Partial<UfødtBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        terminbekreftelse: barn.terminbekreftelse,
        terminbekreftelseDato: barn.terminbekreftelseDato,
        termindato: barn.termindato,
    });

export const getFødtBarnProps = (barn: Partial<FødtBarn>): Partial<FødtBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        fødselsattest: barn.fødselsattest,
        fødselsdatoer: barn.fødselsdatoer,
        termindato: barn.termindato,
    });

export const getAdopsjonsbarnProps = (barn: Partial<Adopsjonsbarn>): Partial<Adopsjonsbarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        adopsjonAvEktefellesBarn: barn.adopsjonAvEktefellesBarn,
        adopsjonsdato: barn.adopsjonsdato,
        adoptertIUtlandet: barn.adoptertIUtlandet,
        ankomstdato: barn.ankomstdato,
        fødselsdatoer: barn.fødselsdatoer,
        omsorgsovertakelse: barn.omsorgsovertakelse,
    });

export const getForeldreansvarsbarnProps = (barn: Partial<ForeldreansvarBarn>): Partial<ForeldreansvarBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        adopsjonsvedtak: barn.adopsjonsvedtak,
        foreldreansvarsdato: barn.foreldreansvarsdato,
        fødselsdatoer: barn.fødselsdatoer,
        omsorgsovertakelse: barn.omsorgsovertakelse,
    });

export const cleanupBarn = (barn: Partial<Barn>, situasjon: Søkersituasjon): Partial<Barn> | undefined => {
    if (isFødtBarn(barn, situasjon)) {
        return getFødtBarnProps(barn);
    }
    if (isUfødtBarn(barn, situasjon)) {
        return getUfødtBarnProps(barn);
    }
    if (isAdopsjonsbarn(barn, situasjon)) {
        return getAdopsjonsbarnProps(barn);
    }
    if (isForeldreansvarsbarn(barn, situasjon)) {
        return getForeldreansvarsbarnProps(barn);
    }
    return undefined;
};

const removeUndefinedProps = (barn: any): any => {
    const obj = {};
    Object.keys(barn).forEach((key) => {
        if (barn[key] !== undefined) {
            obj[key] = barn[key];
        }
    });
    return obj;
};
