import { YesOrNo } from '@navikt/sif-common-formik/lib';
import Barn, { BarnType } from 'app/context/types/Barn';
import { OmBarnetFormData } from './omBarnetFormConfig';

const mapOmBarnetFormDataToState = (values: Partial<OmBarnetFormData>): Barn => {
    if (values.erBarnetFødt === YesOrNo.YES) {
        return {
            type: BarnType.FØDT,
            fødselsdatoer: values.fødselsdatoer!,
            antallBarn: values.antallBarn!,
            termindato: values.termindato,
        };
    }

    if (values.erBarnetFødt === YesOrNo.NO) {
        return {
            type: BarnType.UFØDT,
            terminbekreftelse: values.terminbekreftelse!,
            terminbekreftelsedato: values.terminbekreftelsedato,
            antallBarn: values.antallBarn!,
            termindato: values.termindato!,
        };
    }

    return {
        type: BarnType.ADOPTERT_STEBARN,
        fødselsdatoer: values.fødselsdatoer!,
        adopsjonsdato: values.adopsjonsdato!,
        antallBarn: values.antallBarn!,
    };
};

export default mapOmBarnetFormDataToState;
