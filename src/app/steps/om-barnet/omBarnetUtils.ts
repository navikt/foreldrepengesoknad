import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik/lib';
import Barn, {
    BarnType,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from 'app/context/types/Barn';
import { RegistrertBarn } from 'app/types/Person';
import { velgEldsteBarn } from 'app/utils/dateUtils';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import dayjs from 'dayjs';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

const getInitValues = (): Readonly<OmBarnetFormData> => ({
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: '',
    [OmBarnetFormField.adopsjonsdato]: '',
    [OmBarnetFormField.fødselsdatoer]: [],
    [OmBarnetFormField.omsorgsovertakelse]: [],
    [OmBarnetFormField.termindato]: '',
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: '',
    [OmBarnetFormField.adoptertIUtlandet]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.ankomstdato]: '',
    [OmBarnetFormField.gjelderAnnetBarn]: false,
    [OmBarnetFormField.valgteBarn]: [],
});

export const mapOmBarnetFormDataToState = (
    values: Partial<OmBarnetFormData>,
    registrerteBarn: RegistrertBarn[]
): Barn => {
    if (!values.gjelderAnnetBarn && values.valgteBarn && values.valgteBarn.length > 0) {
        const eldsteBarn = velgEldsteBarn(registrerteBarn, values.valgteBarn);

        return {
            type: BarnType.FØDT,
            fødselsdatoer: [dateToISOString(eldsteBarn.fødselsdato)!],
            antallBarn: values.valgteBarn.length.toString(),
            termindato: values.termindato,
        };
    }

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
        adoptertIUtlandet: convertYesOrNoOrUndefinedToBoolean(values.adoptertIUtlandet)!,
        omsorgsovertakelse: values.omsorgsovertakelse!,
        ankomstdato: values.adoptertIUtlandet! === YesOrNo.YES ? values.ankomstdato! : undefined,
    };
};

export const getOmBarnetInitialValues = (barn: Barn, registrerteBarn: RegistrertBarn[]): OmBarnetFormData => {
    const initialOmBarnetValues = getInitValues();

    if (!barn) {
        return initialOmBarnetValues;
    }

    if (registrerteBarn.length > 0 && isFødtBarn(barn)) {
        const registrertBarn = registrerteBarn.find((regBarn) =>
            dayjs(regBarn.fødselsdato).isSame(barn.fødselsdatoer[0])
        );

        if (registrertBarn) {
            return {
                ...initialOmBarnetValues,
                fødselsdatoer: barn.fødselsdatoer,
                termindato: barn.termindato || '',
                antallBarn: barn.antallBarn,
                valgteBarn: [registrertBarn.fnr],
            };
        }
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
