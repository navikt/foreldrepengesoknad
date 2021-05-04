import { YesOrNo } from '@navikt/sif-common-formik/lib';
import Barn, { BarnType } from 'app/context/types/Barn';
import { OmBarnetFormData } from './omBarnetFormConfig';

const mapOmBarnetFormDataToState = (values: Partial<OmBarnetFormData>): Barn => {
    if (values.erBarnetFødt === YesOrNo.YES) {
        return {
            type: BarnType.FØDT,
            erBarnetFødt: true,
            fødselsdatoer: values.fødselsdatoer!,
            antallBarn: values.antallBarn!,
            termindato: values.termindato,
            dokumentasjonAvAleneomsorg: [],
            datoForAleneomsorg: '',
        };
    }

    if (values.erBarnetFødt === YesOrNo.NO) {
        return {
            type: BarnType.UFØDT,
            erBarnetFødt: false,
            terminbekreftelse: values.terminbekreftelse!,
            terminbekreftelsedato: values.terminbekreftelsedato,
            antallBarn: values.antallBarn!,
            termindato: values.termindato!,
            dokumentasjonAvAleneomsorg: [],
            datoForAleneomsorg: '',
        };
    }

    return {
        type: BarnType.ADOPTERT_STEBARN,
        fødselsdatoer: values.fødselsdatoer!,
        adopsjonsdato: values.adopsjonsdato!,
        antallBarn: values.antallBarn!,
        dokumentasjonAvAleneomsorg: [],
        datoForAleneomsorg: '',
    };
};

export default mapOmBarnetFormDataToState;
