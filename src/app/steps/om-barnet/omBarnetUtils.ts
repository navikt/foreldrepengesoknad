import { hasValue } from '@navikt/fp-common';
import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import Barn, {
    BarnType,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from 'app/context/types/Barn';
import { AttachmentType } from 'app/types/AttachmentType';
import { RegistrertBarn } from 'app/types/Person';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { getRegistrertBarnOmDetFinnes } from 'app/utils/barnUtils';
import { velgEldsteBarn } from 'app/utils/dateUtils';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { lagSendSenereDokumentNårIngenAndreFinnes } from 'app/utils/vedleggUtils';
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

export const cleanupOmBarnetFormData = (
    values: OmBarnetFormData,
    visibility: QuestionVisibility<OmBarnetFormField, undefined>
): OmBarnetFormData => {
    const cleanedData: OmBarnetFormData = {
        erBarnetFødt: visibility.isVisible(OmBarnetFormField.erBarnetFødt) ? values.erBarnetFødt : YesOrNo.UNANSWERED,
        adopsjonAvEktefellesBarn: visibility.isVisible(OmBarnetFormField.adopsjonAvEktefellesBarn)
            ? values.adopsjonAvEktefellesBarn
            : YesOrNo.UNANSWERED,
        antallBarn: visibility.isVisible(OmBarnetFormField.antallBarn) ? values.antallBarn : '',
        adopsjonsdato: visibility.isVisible(OmBarnetFormField.adopsjonsdato) ? values.adopsjonsdato : '',
        fødselsdatoer: visibility.isVisible(OmBarnetFormField.fødselsdatoer) ? values.fødselsdatoer : [],
        omsorgsovertakelse: visibility.isVisible(OmBarnetFormField.omsorgsovertakelse) ? values.omsorgsovertakelse : [],
        termindato: visibility.isVisible(OmBarnetFormField.termindato) ? values.termindato : '',
        terminbekreftelse: visibility.isVisible(OmBarnetFormField.terminbekreftelse) ? values.terminbekreftelse : [],
        terminbekreftelsedato: visibility.isVisible(OmBarnetFormField.terminbekreftelsedato)
            ? values.terminbekreftelsedato
            : '',
        adoptertIUtlandet: visibility.isVisible(OmBarnetFormField.adoptertIUtlandet)
            ? values.adoptertIUtlandet
            : YesOrNo.UNANSWERED,
        ankomstdato: visibility.isVisible(OmBarnetFormField.ankomstdato) ? values.ankomstdato : '',
        gjelderAnnetBarn: visibility.isVisible(OmBarnetFormField.gjelderAnnetBarn) ? values.gjelderAnnetBarn : false,
        valgteBarn: visibility.isVisible(OmBarnetFormField.valgteBarn) ? values.valgteBarn : [],
    };

    return cleanedData;
};

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
            termindato: hasValue(values.termindato) ? values.termindato : undefined,
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
        const terminbekreftelse = lagSendSenereDokumentNårIngenAndreFinnes(
            values.terminbekreftelse!,
            AttachmentType.TERMINBEKREFTELSE,
            Skjemanummer.TERMINBEKREFTELSE
        );
        return {
            type: BarnType.UFØDT,
            terminbekreftelse: terminbekreftelse!,
            terminbekreftelsedato: values.terminbekreftelsedato,
            antallBarn: values.antallBarn!,
            termindato: values.termindato!,
        };
    }

    const omsorgsovertakelse = lagSendSenereDokumentNårIngenAndreFinnes(
        values.omsorgsovertakelse!,
        AttachmentType.OMSORGSOVERTAKELSE,
        Skjemanummer.OMSORGSOVERTAKELSESDATO
    );

    if (values.adopsjonAvEktefellesBarn === YesOrNo.YES) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato!,
            antallBarn: values.antallBarn!,
            fødselsdatoer: values.fødselsdatoer!,
            omsorgsovertakelse: omsorgsovertakelse!,
        };
    }

    return {
        type: BarnType.ADOPTERT_ANNET_BARN,
        fødselsdatoer: values.fødselsdatoer!,
        adopsjonsdato: values.adopsjonsdato!,
        antallBarn: values.antallBarn!,
        adoptertIUtlandet: convertYesOrNoOrUndefinedToBoolean(values.adoptertIUtlandet)!,
        omsorgsovertakelse: omsorgsovertakelse!,
        ankomstdato: values.adoptertIUtlandet! === YesOrNo.YES ? values.ankomstdato! : undefined,
    };
};

export const getOmBarnetInitialValues = (barn: Barn, registrerteBarn: RegistrertBarn[]): OmBarnetFormData => {
    const initialOmBarnetValues = getInitValues();

    if (!barn) {
        return initialOmBarnetValues;
    }

    if (isFødtBarn(barn)) {
        const registrertBarn = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

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
            gjelderAnnetBarn: true,
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
