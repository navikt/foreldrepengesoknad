import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

import {
    AdoptertBarn,
    Barn,
    BarnType,
    FødtBarn,
    ISOStringToDate,
    IkkeUtfyltTypeBarn,
    Situasjon,
    Skjemanummer,
    hasValue,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { OmBarnetFormValues } from './components/OmBarnetFormValues';

export const mapOmDetValgteBarnetFormDataToState = (
    valgtRegistrertBarn: FødtBarn | AdoptertBarn | IkkeUtfyltTypeBarn,
    situasjon: Situasjon,
    values: OmBarnetFormValues,
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

    const omsorgsovertakelse = lagSendSenereDokumentNårIngenAndreFinnes(
        values.omsorgsovertakelse,
        AttachmentType.OMSORGSOVERTAKELSE,
        Skjemanummer.OMSORGSOVERTAKELSESDATO,
    );

    if (values.adopsjonAvEktefellesBarn === true) {
        return {
            ...valgtRegistrertBarn,
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato,
            omsorgsovertakelse,
        };
    }

    return {
        ...valgtRegistrertBarn,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: values.adopsjonsdato,
        adoptertIUtlandet: values.adoptertIUtlandet,
        ankomstdato: values.adoptertIUtlandet === true ? values.ankomstdato : undefined,
        omsorgsovertakelse,
    };
};

export const mapOmBarnetFormDataToState = (
    values: OmBarnetFormValues,
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

    if (values.erBarnetFødt === true) {
        return {
            type: BarnType.FØDT,
            fødselsdatoer: values.fødselsdatoer,
            antallBarn,
            termindato: hasValue(values.termindato) ? values.termindato : undefined,
        };
    }

    if (values.erBarnetFødt === false) {
        const terminbekreftelse = lagSendSenereDokumentNårIngenAndreFinnes(
            values.terminbekreftelse!,
            AttachmentType.TERMINBEKREFTELSE,
            Skjemanummer.TERMINBEKREFTELSE,
        );

        if (arbeidsforhold.length === 0) {
            return {
                type: BarnType.UFØDT,
                terminbekreftelse: terminbekreftelse,
                terminbekreftelsedato: values.terminbekreftelsedato,
                antallBarn,
                termindato: values.termindato,
            };
        }
        return {
            type: BarnType.UFØDT,
            antallBarn,
            termindato: values.termindato,
        };
    }

    const omsorgsovertakelse = lagSendSenereDokumentNårIngenAndreFinnes(
        values.omsorgsovertakelse!,
        AttachmentType.OMSORGSOVERTAKELSE,
        Skjemanummer.OMSORGSOVERTAKELSESDATO,
    );

    if (values.adopsjonAvEktefellesBarn === true) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato,
            antallBarn,
            fødselsdatoer: values.fødselsdatoer,
            omsorgsovertakelse,
        };
    }

    return {
        type: BarnType.ADOPTERT_ANNET_BARN,
        fødselsdatoer: values.fødselsdatoer,
        adopsjonsdato: values.adopsjonsdato,
        antallBarn,
        adoptertIUtlandet: values.adoptertIUtlandet,
        ankomstdato: values.adoptertIUtlandet === true ? values.ankomstdato : undefined,
        omsorgsovertakelse,
    };
};

export const getOmBarnetInitialValues = (arbeidsforhold: Arbeidsforhold[], barn?: Barn): OmBarnetFormValues => {
    if (!barn) {
        return { fødselsdatoer: [{ dato: undefined }] };
    }

    const erFlereEnnToBarn = barn.antallBarn > 2;

    if (isFødtBarn(barn)) {
        return {
            erBarnetFødt: true,
            fødselsdatoer: barn.fødselsdatoer,
            termindato: barn.termindato,
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
        };
    }

    if (isUfødtBarn(barn)) {
        if (arbeidsforhold.length === 0) {
            return {
                erBarnetFødt: false,
                terminbekreftelse: barn.terminbekreftelse || [],
                terminbekreftelsedato: barn.terminbekreftelsedato,
                termindato: barn.termindato,
                antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
                antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            };
        }

        return {
            erBarnetFødt: false,
            termindato: barn.termindato,
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
        };
    }

    if (isAdoptertAnnetBarn(barn)) {
        return {
            adopsjonAvEktefellesBarn: false,
            fødselsdatoer: barn.fødselsdatoer,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            adoptertIUtlandet: barn.adoptertIUtlandet,
            omsorgsovertakelse: barn.omsorgsovertakelse,
            ankomstdato: barn.ankomstdato,
        };
    }

    if (isAdoptertStebarn(barn)) {
        return {
            adopsjonAvEktefellesBarn: true,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            fødselsdatoer: barn.fødselsdatoer.map((fødselsdato) => dateToISOString(fødselsdato)),
            omsorgsovertakelse: vedlegg[Skjemanummer.OMSORGSOVERTAKELSE] || [],
            fødselsdatoer: barn.fødselsdatoer,
            omsorgsovertakelse: barn.omsorgsovertakelse,
    return { fødselsdatoer: [{ dato: undefined }] };
};
