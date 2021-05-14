import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import Barn, { isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import { Attachment } from 'app/types/Attachment';

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
    [OmBarnetFormField.erBarnetFødt]?: YesOrNo;
    [OmBarnetFormField.adopsjonAvEktefellesBarn]?: YesOrNo;
    [OmBarnetFormField.antallBarn]: string;
    [OmBarnetFormField.adopsjonsdato]?: string;
    [OmBarnetFormField.fødselsdatoer]?: string[];
    [OmBarnetFormField.omsorgsovertakelse]?: string;
    [OmBarnetFormField.termindato]?: string;
    [OmBarnetFormField.terminbekreftelse]?: Attachment[];
    [OmBarnetFormField.terminbekreftelsedato]?: string;
    [OmBarnetFormField.adoptertIUtlandet]?: YesOrNo;
}

export const initialOmBarnetValues: OmBarnetFormData = {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: '',
    [OmBarnetFormField.adopsjonsdato]: '',
    [OmBarnetFormField.fødselsdatoer]: [],
    [OmBarnetFormField.omsorgsovertakelse]: '',
    [OmBarnetFormField.termindato]: '',
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: '',
    [OmBarnetFormField.adoptertIUtlandet]: YesOrNo.UNANSWERED,
};

export const OmBarnetFormComponents = getTypedFormComponents<OmBarnetFormField, OmBarnetFormData, string>();

export const getOmBarnetInitialValues = (barn: Barn): OmBarnetFormData => {
    if (!barn) {
        return initialOmBarnetValues;
    }

    if (isFødtBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            erBarnetFødt: YesOrNo.YES,
            fødselsdatoer: barn.fødselsdatoer,
            termindato: barn.termindato,
            antallBarn: barn.antallBarn,
        };
    }

    if (isUfødtBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            erBarnetFødt: YesOrNo.NO,
            terminbekreftelse: barn.terminbekreftelse,
            terminbekreftelsedato: barn.terminbekreftelsedato,
            termindato: barn.termindato,
            antallBarn: barn.antallBarn,
        };
    }

    return initialOmBarnetValues;
};
