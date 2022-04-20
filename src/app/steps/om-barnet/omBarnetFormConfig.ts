import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';

export enum OmBarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    adopsjonAvEktefellesBarn = 'adopsjonAvEktefellesBarn',
    antallBarn = 'antallBarn',
    antallBarnSelect = 'antallBarnSelect',
    adopsjonsdato = 'adopsjonsdato',
    søkerAdopsjonAlene = 'søkerAdopsjonAlene',
    adoptertIUtlandet = 'adoptertIUtlandet',
    fødselsdatoer = 'fødselsdatoer',
    termindato = 'termindato',
    omsorgsovertakelse = 'omsorgsovertakelse',
    terminbekreftelse = 'terminbekreftelse',
    terminbekreftelsedato = 'terminbekreftelsedato',
    ankomstdato = 'ankomstdato',
    gjelderAnnetBarn = 'gjelderAnnetBarn',
    valgteBarn = 'valgteBarn',
}

export interface OmBarnetFormData {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo;
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: YesOrNo;
    [OmBarnetFormField.antallBarn]: string;
    [OmBarnetFormField.antallBarnSelect]: string;
    [OmBarnetFormField.adopsjonsdato]: string;
    [OmBarnetFormField.fødselsdatoer]: string[];
    [OmBarnetFormField.omsorgsovertakelse]: Attachment[];
    [OmBarnetFormField.termindato]: string;
    [OmBarnetFormField.terminbekreftelse]: Attachment[];
    [OmBarnetFormField.terminbekreftelsedato]: string;
    [OmBarnetFormField.adoptertIUtlandet]: YesOrNo;
    [OmBarnetFormField.ankomstdato]: string;
    [OmBarnetFormField.gjelderAnnetBarn]: boolean;
    [OmBarnetFormField.valgteBarn]: string[];
}

export const OmBarnetFormComponents = getTypedFormComponents<OmBarnetFormField, OmBarnetFormData, string>();
