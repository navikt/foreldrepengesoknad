import {
    AdoptertBarn,
    Barn,
    BarnType,
    FødtBarn,
    ISOStringToDate,
    IkkeUtfyltTypeBarn,
    Situasjon,
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
    hasValue,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { Skjemanummer } from '@navikt/fp-constants';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { Arbeidsforhold } from '@navikt/fp-types';

const getInitValues = (): Readonly<OmBarnetFormData> => ({
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: '',
    [OmBarnetFormField.antallBarnSelect]: '',
    [OmBarnetFormField.adopsjonsdato]: '',
    [OmBarnetFormField.fødselsdatoer]: [],
    [OmBarnetFormField.omsorgsovertakelse]: [],
    [OmBarnetFormField.termindato]: '',
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: '',
    [OmBarnetFormField.adoptertIUtlandet]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.ankomstdato]: '',
});

export const cleanupOmBarnetFormData = (
    values: OmBarnetFormData,
    visibility: QuestionVisibility<OmBarnetFormField, undefined>,
): OmBarnetFormData => {
    const cleanedData: OmBarnetFormData = {
        erBarnetFødt: visibility.isVisible(OmBarnetFormField.erBarnetFødt) ? values.erBarnetFødt : YesOrNo.UNANSWERED,
        adopsjonAvEktefellesBarn: visibility.isVisible(OmBarnetFormField.adopsjonAvEktefellesBarn)
            ? values.adopsjonAvEktefellesBarn
            : YesOrNo.UNANSWERED,
        antallBarn: visibility.isVisible(OmBarnetFormField.antallBarn) ? values.antallBarn : '',
        antallBarnSelect: visibility.isVisible(OmBarnetFormField.antallBarnSelect) ? values.antallBarnSelect : '',
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
    };

    return cleanedData;
};

export const mapOmDetValgteBarnetFormDataToState = (
    valgtRegistrertBarn: FødtBarn | AdoptertBarn | IkkeUtfyltTypeBarn,
    situasjon: Situasjon,
    values: Partial<OmBarnetFormData>,
    barnSøktOmFørMenIkkeRegistrert: boolean,
): Barn => {
    if (valgtRegistrertBarn !== undefined && situasjon === 'fødsel') {
        return {
            ...valgtRegistrertBarn,
            type: barnSøktOmFørMenIkkeRegistrert ? BarnType.UFØDT : BarnType.FØDT,
            termindato: hasValue(values.termindato) ? ISOStringToDate(values.termindato) : undefined,
            fødselsdatoer: valgtRegistrertBarn.fødselsdatoer,
            antallBarn: valgtRegistrertBarn.antallBarn,
        } as Barn;
    }

    if (values.adopsjonAvEktefellesBarn === YesOrNo.YES) {
        return {
            ...valgtRegistrertBarn,
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: ISOStringToDate(values.adopsjonsdato)!,
        };
    }

    return {
        ...valgtRegistrertBarn,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: ISOStringToDate(values.adopsjonsdato)!,
        adoptertIUtlandet: convertYesOrNoOrUndefinedToBoolean(values.adoptertIUtlandet)!,
        ankomstdato: values.adoptertIUtlandet === YesOrNo.YES ? ISOStringToDate(values.ankomstdato) : undefined,
    };
};

export const mapOmBarnetFormDataToState = (
    values: Partial<OmBarnetFormData>,
    arbeidsforhold: Arbeidsforhold[],
    valgtRegistrertBarn: Barn | undefined,
    situasjon: Situasjon,
    barnSøktOmFørMenIkkeRegistrert: boolean,
): Barn => {
    if (valgtRegistrertBarn !== undefined) {
        return mapOmDetValgteBarnetFormDataToState(
            valgtRegistrertBarn as FødtBarn | AdoptertBarn | IkkeUtfyltTypeBarn,
            situasjon,
            values,
            barnSøktOmFørMenIkkeRegistrert,
        );
    }
    const antallBarn =
        parseInt(values.antallBarn!, 10) < 3
            ? parseInt(values.antallBarn!, 10)
            : parseInt(values.antallBarnSelect!, 10);

    if (values.erBarnetFødt === YesOrNo.YES) {
        return {
            type: BarnType.FØDT,
            fødselsdatoer: values.fødselsdatoer!.map((fødselsdato) => ISOStringToDate(fødselsdato)!),
            antallBarn,
            termindato: hasValue(values.termindato) ? ISOStringToDate(values.termindato) : undefined,
        };
    }

    if (values.erBarnetFødt === YesOrNo.NO) {
        if (arbeidsforhold.length === 0) {
            return {
                type: BarnType.UFØDT,
                terminbekreftelsedato: ISOStringToDate(values.terminbekreftelsedato),
                antallBarn,
                termindato: ISOStringToDate(values.termindato)!,
            };
        }
        return {
            type: BarnType.UFØDT,
            antallBarn,
            termindato: ISOStringToDate(values.termindato)!,
        };
    }

    if (values.adopsjonAvEktefellesBarn === YesOrNo.YES) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: ISOStringToDate(values.adopsjonsdato)!,
            antallBarn,
            fødselsdatoer: values.fødselsdatoer!.map((fødselsdato) => ISOStringToDate(fødselsdato)!),
        };
    }

    return {
        type: BarnType.ADOPTERT_ANNET_BARN,
        fødselsdatoer: values.fødselsdatoer!.map((fødselsdato) => ISOStringToDate(fødselsdato)!),
        adopsjonsdato: ISOStringToDate(values.adopsjonsdato)!,
        antallBarn,
        adoptertIUtlandet: convertYesOrNoOrUndefinedToBoolean(values.adoptertIUtlandet)!,
        ankomstdato: values.adoptertIUtlandet === YesOrNo.YES ? ISOStringToDate(values.ankomstdato) : undefined,
    };
};

export const getOmBarnetInitialValues = (
    arbeidsforhold: Arbeidsforhold[],
    vedlegg: VedleggDataType,
    barn?: Barn,
): OmBarnetFormData => {
    const initialOmBarnetValues = getInitValues();

    if (!barn) {
        return initialOmBarnetValues;
    }

    const erFlereEnnToBarn = barn.antallBarn > 2;

    if (isFødtBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            erBarnetFødt: YesOrNo.YES,
            fødselsdatoer: barn.fødselsdatoer.map((fødselsdato) => dateToISOString(fødselsdato)),
            termindato: dateToISOString(barn.termindato),
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
        };
    }

    if (isUfødtBarn(barn)) {
        if (arbeidsforhold.length === 0) {
            return {
                ...initialOmBarnetValues,
                erBarnetFødt: YesOrNo.NO,
                terminbekreftelse: vedlegg[Skjemanummer.TERMINBEKREFTELSE] || [],
                terminbekreftelsedato: dateToISOString(barn.terminbekreftelsedato),
                termindato: dateToISOString(barn.termindato),
                antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
                antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            };
        }

        return {
            ...initialOmBarnetValues,
            erBarnetFødt: YesOrNo.NO,
            termindato: dateToISOString(barn.termindato),
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
        };
    }

    if (isAdoptertAnnetBarn(barn)) {
        return {
            ...initialOmBarnetValues,
            adopsjonAvEktefellesBarn: YesOrNo.NO,
            fødselsdatoer: barn.fødselsdatoer.map((fødselsdato) => dateToISOString(fødselsdato)),
            adopsjonsdato: dateToISOString(barn.adopsjonsdato),
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            adoptertIUtlandet: convertBooleanOrUndefinedToYesOrNo(barn.adoptertIUtlandet),
            omsorgsovertakelse: vedlegg[Skjemanummer.OMSORGSOVERTAKELSE] || [],
            ankomstdato: dateToISOString(barn.ankomstdato),
        };
    }

    if (isAdoptertStebarn(barn)) {
        return {
            ...initialOmBarnetValues,
            adopsjonAvEktefellesBarn: YesOrNo.YES,
            adopsjonsdato: dateToISOString(barn.adopsjonsdato),
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            fødselsdatoer: barn.fødselsdatoer.map((fødselsdato) => dateToISOString(fødselsdato)),
            omsorgsovertakelse: vedlegg[Skjemanummer.OMSORGSOVERTAKELSE] || [],
        };
    }

    return initialOmBarnetValues;
};
