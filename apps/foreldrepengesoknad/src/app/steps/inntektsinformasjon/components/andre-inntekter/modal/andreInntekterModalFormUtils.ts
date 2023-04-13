import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { lagSendSenereDokumentNårIngenAndreFinnes } from 'app/utils/vedleggUtils';
import { AndreInntekterFormData, AndreInntekterFormField } from './andreInntekterModalFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

const initialAndreInntekterFormValues: AndreInntekterFormData = {
    [AndreInntekterFormField.type]: undefined,
    [AndreInntekterFormField.fom]: '',
    [AndreInntekterFormField.tom]: '',
    [AndreInntekterFormField.pågående]: YesOrNo.UNANSWERED,
    [AndreInntekterFormField.navnPåArbeidsgiver]: '',
    [AndreInntekterFormField.land]: '',
    [AndreInntekterFormField.dokumentasjon]: [],
};

export const getSkjemanummer = (values: AndreInntekterFormData): Skjemanummer => {
    if (values.type === AnnenInntektType.MILITÆRTJENESTE) {
        return Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE;
    }

    if (values.type === AnnenInntektType.SLUTTPAKKE) {
        return Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
    }

    return Skjemanummer.ANNET;
};

export const cleanupAndreInntekterForm = (
    values: AndreInntekterFormData,
    visibility: QuestionVisibility<AndreInntekterFormField, undefined>
): AndreInntekterFormData => {
    return {
        type: visibility.isVisible(AndreInntekterFormField.type) ? values.type : initialAndreInntekterFormValues.type,
        dokumentasjon: visibility.isVisible(AndreInntekterFormField.dokumentasjon)
            ? lagSendSenereDokumentNårIngenAndreFinnes(
                  values.dokumentasjon,
                  AttachmentType.ANNEN_INNTEKT,
                  getSkjemanummer(values)
              )
            : initialAndreInntekterFormValues.dokumentasjon,
        fom: visibility.isVisible(AndreInntekterFormField.fom) ? values.fom : initialAndreInntekterFormValues.fom,
        tom: visibility.isVisible(AndreInntekterFormField.tom) ? values.tom : initialAndreInntekterFormValues.tom,
        pågående: visibility.isVisible(AndreInntekterFormField.pågående)
            ? values.pågående
            : initialAndreInntekterFormValues.pågående,
        navnPåArbeidsgiver: visibility.isVisible(AndreInntekterFormField.navnPåArbeidsgiver)
            ? values.navnPåArbeidsgiver
            : initialAndreInntekterFormValues.navnPåArbeidsgiver,
        land: visibility.isVisible(AndreInntekterFormField.land) ? values.land : initialAndreInntekterFormValues.land,
    };
};

export const getInitialAndreInntekterFormValues = (annenInntekt: AnnenInntekt | undefined): AndreInntekterFormData => {
    if (!annenInntekt) {
        return {
            ...initialAndreInntekterFormValues,
        };
    }

    if (annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET) {
        return {
            ...initialAndreInntekterFormValues,
            navnPåArbeidsgiver: annenInntekt.arbeidsgiverNavn,
            land: annenInntekt.land,
            fom: annenInntekt.tidsperiode.fom,
            tom: annenInntekt.tidsperiode.tom || '',
            dokumentasjon: annenInntekt.vedlegg,
            pågående: convertBooleanOrUndefinedToYesOrNo(annenInntekt.pågående),
            type: annenInntekt.type,
        };
    }

    return {
        ...initialAndreInntekterFormValues,
        fom: annenInntekt.tidsperiode.fom,
        tom: annenInntekt.tidsperiode.tom || '',
        dokumentasjon: annenInntekt.vedlegg,
        pågående: convertBooleanOrUndefinedToYesOrNo(annenInntekt.pågående),
        type: annenInntekt.type,
    };
};

export const mapAnnenInntektModalValuesToState = (annenInntekt: Partial<AndreInntekterFormData>): AnnenInntekt => {
    if (annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET) {
        return {
            arbeidsgiverNavn: annenInntekt.navnPåArbeidsgiver!,
            land: annenInntekt.land!,
            pågående: convertYesOrNoOrUndefinedToBoolean(annenInntekt.pågående)!,
            tidsperiode: {
                fom: annenInntekt.fom!,
                tom: annenInntekt.tom,
            },
            type: annenInntekt.type,
            vedlegg: [],
        };
    }

    return {
        pågående: convertYesOrNoOrUndefinedToBoolean(annenInntekt.pågående)!,
        tidsperiode: {
            fom: annenInntekt.fom!,
            tom: annenInntekt.tom,
        },
        type: annenInntekt.type!,
        vedlegg: annenInntekt.dokumentasjon || [],
    };
};
