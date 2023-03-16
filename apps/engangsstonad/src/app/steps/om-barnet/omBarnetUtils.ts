import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { OmBarnetFormData } from './omBarnetFormConfig';

export const cleanupOmBarnet = (formData: OmBarnetFormData): OmBarnetFormData => {
    const cleanedData: Partial<OmBarnetFormData> = {};
    cleanedData.antallBarn = undefined;
    cleanedData.erBarnetFødt = YesOrNo.UNANSWERED;
    cleanedData.adopsjonAvEktefellesBarn = YesOrNo.UNANSWERED;
    cleanedData.søkerAdopsjonAlene = YesOrNo.UNANSWERED;

    if (formData.erBarnetFødt === YesOrNo.YES) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.fødselsdatoer = formData.fødselsdatoer;
        cleanedData.erBarnetFødt = formData.erBarnetFødt;
    }
    if (formData.erBarnetFødt === YesOrNo.NO) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.erBarnetFødt = formData.erBarnetFødt;
        cleanedData.terminbekreftelse = formData.terminbekreftelse;
        cleanedData.terminbekreftelsedato = formData.terminbekreftelsedato;
        cleanedData.termindato = formData.termindato;
    }
    if (formData.adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.adopsjonsdato = formData.adopsjonsdato;
        cleanedData.fødselsdatoer = formData.fødselsdatoer;
        cleanedData.omsorgsovertakelse = formData.omsorgsovertakelse;
        cleanedData.adopsjonAvEktefellesBarn = formData.adopsjonAvEktefellesBarn;
        cleanedData.søkerAdopsjonAlene = formData.søkerAdopsjonAlene;
    }
    return cleanedData as OmBarnetFormData;
};
