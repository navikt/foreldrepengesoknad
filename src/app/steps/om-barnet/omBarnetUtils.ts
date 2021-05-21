import { YesOrNo } from '@navikt/sif-common-formik/lib';
import Barn, {
    BarnType,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from 'app/context/types/Barn';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { initialOmBarnetValues, OmBarnetFormData } from './omBarnetFormConfig';

export const mapOmBarnetFormDataToState = (values: Partial<OmBarnetFormData>): Barn => {
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

    if (values.adopsjonAvEktefellesBarn === YesOrNo.YES) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato!,
            antallBarn: values.antallBarn!,
            fødselsdatoer: values.fødselsdatoer!,
            omsorgsovertakelse: values.omsorgsovertakelse!,
        };
    }

    return {
        type: BarnType.ADOPTERT_ANNET_BARN,
        fødselsdatoer: values.fødselsdatoer!,
        adopsjonsdato: values.adopsjonsdato!,
        antallBarn: values.antallBarn!,
        adoptertIUtlandet: convertYesOrNoOrUndefinedToBoolean(values.adoptertIUtlandet),
        omsorgsovertakelse: values.omsorgsovertakelse!,
        ankomstdato: values.ankomstdato!,
    };
};

export const getOmBarnetInitialValues = (barn: Barn): OmBarnetFormData => {
    if (!barn) {
        return initialOmBarnetValues;
    }

    if (isFødtBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            erBarnetFødt: YesOrNo.YES,
            fødselsdatoer: barn.fødselsdatoer,
            termindato: barn.termindato || '',
            antallBarn: barn.antallBarn,
        };
    }

    if (isUfødtBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            erBarnetFødt: YesOrNo.NO,
            terminbekreftelse: barn.terminbekreftelse,
            terminbekreftelsedato: barn.terminbekreftelsedato || '',
            termindato: barn.termindato,
            antallBarn: barn.antallBarn,
        };
    }

    if (isAdoptertAnnetBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            adopsjonAvEktefellesBarn: YesOrNo.NO,
            fødselsdatoer: barn.fødselsdatoer,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: barn.antallBarn!,
            adoptertIUtlandet: convertBooleanOrUndefinedToYesOrNo(barn.adoptertIUtlandet),
            omsorgsovertakelse: barn.omsorgsovertakelse!,
            ankomstdato: barn.ankomstdato!,
        };
    }

    if (isAdoptertStebarn(barn)) {
        return {
            ...initialOmBarnetValues,
            adopsjonAvEktefellesBarn: YesOrNo.YES,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: barn.antallBarn,
            fødselsdatoer: barn.fødselsdatoer,
            omsorgsovertakelse: barn.omsorgsovertakelse,
        };
    }

    return initialOmBarnetValues;
};
