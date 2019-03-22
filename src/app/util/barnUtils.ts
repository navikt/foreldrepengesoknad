import { UfødtBarn, Adopsjonsbarn, ForeldreansvarBarn, Barn, FødtBarn, BarnCommonProps } from '../types/søknad/Barn';

const getBarnProps = (barn: Partial<Barn | UfødtBarn | Adopsjonsbarn | ForeldreansvarBarn>): Partial<BarnCommonProps> =>
    removeUndefinedProps({
        antallBarn: barn.antallBarn,
        datoForAleneomsorg: barn.datoForAleneomsorg,
        dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg,
        erBarnetFødt: barn.erBarnetFødt
    });

export const getUfødtBarnProps = (barn: Partial<UfødtBarn>): Partial<UfødtBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        terminbekreftelse: barn.terminbekreftelse,
        terminbekreftelseDato: barn.terminbekreftelseDato,
        termindato: barn.termindato
    });

export const getFødtBarnProps = (barn: Partial<FødtBarn>): Partial<FødtBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        fødselsattest: barn.fødselsattest,
        fødselsdatoer: barn.fødselsdatoer
    });

export const getAdopsjonsbarnProps = (barn: Partial<Adopsjonsbarn>): Partial<Adopsjonsbarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        adopsjonAvEktefellesBarn: barn.adopsjonAvEktefellesBarn,
        adopsjonsdato: barn.adopsjonsdato,
        adoptertIUtlandet: barn.adoptertIUtlandet,
        ankomstdato: barn.ankomstdato,
        fødselsdatoer: barn.fødselsdatoer,
        omsorgsovertakelse: barn.omsorgsovertakelse
    });

export const getForeldreansvarsbarnProps = (barn: Partial<ForeldreansvarBarn>): Partial<ForeldreansvarBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        adopsjonsvedtak: barn.adopsjonsvedtak,
        foreldreansvarsdato: barn.foreldreansvarsdato,
        fødselsdatoer: barn.fødselsdatoer,
        omsorgsovertakelse: barn.omsorgsovertakelse
    });

const removeUndefinedProps = (barn: any): any => {
    const obj = {};
    Object.keys(barn).forEach((key) => {
        if (barn[key] !== undefined) {
            obj[key] = barn[key];
        }
    });
    return obj;
};
