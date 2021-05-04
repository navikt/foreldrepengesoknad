import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import Barn from 'app/context/types/Barn';

export enum OmBarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    adopsjonAvEktefellesBarn = 'adopsjonAvEktefellesBarn',
    antallBarn = 'antallBarn',
    adopsjonsdato = 'adopsjonsdato',
    søkerAdopsjonAlene = 'søkerAdopsjonAlene',
    adoptertIUtlandet = 'adoptertIUtlandet',
    fødselsdatoer = 'fødselsdatoer',
    termindato = 'termindato',
    omsorgsovertakelse = 'omsorgsovertakelse',
    terminbekreftelse = 'terminbekreftelse',
    terminbekreftelsedato = 'terminbekreftelsedato',
}

export interface OmBarnetFormData {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo;
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: YesOrNo;
    [OmBarnetFormField.antallBarn]?: string;
    [OmBarnetFormField.adopsjonsdato]?: string;
    [OmBarnetFormField.søkerAdopsjonAlene]: YesOrNo;
    [OmBarnetFormField.fødselsdatoer]: string[];
    [OmBarnetFormField.termindato]?: string;
    [OmBarnetFormField.omsorgsovertakelse]: any[];
    [OmBarnetFormField.terminbekreftelse]: any[];
    [OmBarnetFormField.terminbekreftelsedato]?: string;
    [OmBarnetFormField.adoptertIUtlandet]?: YesOrNo;
}

export const initialOmBarnetValues: OmBarnetFormData = {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: '',
    [OmBarnetFormField.adopsjonsdato]: '',
    [OmBarnetFormField.søkerAdopsjonAlene]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.fødselsdatoer]: [],
    [OmBarnetFormField.termindato]: '',
    [OmBarnetFormField.omsorgsovertakelse]: [],
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: '',
    [OmBarnetFormField.adoptertIUtlandet]: YesOrNo.UNANSWERED,
};

export const OmBarnetFormComponents = getTypedFormComponents<OmBarnetFormField, OmBarnetFormData, string>();

export const getOmBarnetInitialValues = (stateValues: Barn): OmBarnetFormData => {
    if (!stateValues) {
        return initialOmBarnetValues;
    }

    return initialOmBarnetValues;
};
