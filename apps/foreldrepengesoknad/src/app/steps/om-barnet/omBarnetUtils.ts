import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

import {
    AdoptertBarn,
    Arbeidsforhold,
    Barn,
    BarnType,
    FødtBarn,
    IkkeUtfyltTypeBarn,
    Situasjon,
    hasValue,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import BarnetFormValues, {
    erAdoptertAnnetBarn,
    erAdoptertStebarn,
    erFødtBarn,
    erUfødtBarn,
} from './OmBarnetFormValues';

const mapOmDetValgteBarnetFormDataToState = (
    valgtRegistrertBarn: FødtBarn | AdoptertBarn | IkkeUtfyltTypeBarn,
    situasjon: Situasjon,
    values: BarnetFormValues,
    barnSøktOmFørMenIkkeRegistrert: boolean,
): Barn => {
    if (valgtRegistrertBarn !== undefined && situasjon === 'fødsel' && (erFødtBarn(values) || erUfødtBarn(values))) {
        return {
            ...valgtRegistrertBarn,
            type: barnSøktOmFørMenIkkeRegistrert ? BarnType.UFØDT : BarnType.FØDT,
            termindato: values.termindato ? values.termindato : undefined,
            fødselsdatoer: valgtRegistrertBarn.fødselsdatoer,
            antallBarn: valgtRegistrertBarn.antallBarn,
        } as Barn;
    }

    if (erAdoptertStebarn(values)) {
        return {
            ...valgtRegistrertBarn,
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato,
        };
    }

    if (erAdoptertAnnetBarn(values)) {
        return {
            ...valgtRegistrertBarn,
            type: BarnType.ADOPTERT_ANNET_BARN,
            adopsjonsdato: values.adopsjonsdato,
            adoptertIUtlandet: values.adoptertIUtlandet,
            ankomstdato: values.adoptertIUtlandet === true ? values.ankomstdato : undefined,
        };
    }
    throw new Error('Unreachable code');
};

export const mapOmBarnetFormDataToState = (
    values: BarnetFormValues,
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

    if (erFødtBarn(values)) {
        return {
            type: BarnType.FØDT,
            fødselsdatoer: values.fødselsdatoer.map((f) => f.dato),
            antallBarn: values.antallBarn < 3 ? values.antallBarn : parseInt(values.antallBarnSelect!, 10),
            termindato: hasValue(values.termindato) ? values.termindato : undefined,
        };
    }

    if (erUfødtBarn(values)) {
        if (arbeidsforhold.length === 0) {
            return {
                type: BarnType.UFØDT,
                terminbekreftelsedato: values.terminbekreftelsedato,
                antallBarn: values.antallBarn < 3 ? values.antallBarn : parseInt(values.antallBarnSelect!, 10),
                termindato: values.termindato,
            };
        }
        return {
            type: BarnType.UFØDT,
            antallBarn: values.antallBarn < 3 ? values.antallBarn : parseInt(values.antallBarnSelect!, 10),
            termindato: values.termindato,
        };
    }

    if (erAdoptertStebarn(values)) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato,
            antallBarn: values.antallBarn < 3 ? values.antallBarn : parseInt(values.antallBarnSelect!, 10),
            fødselsdatoer: values.fødselsdatoer.map((f) => f.dato),
        };
    }

    if (erAdoptertAnnetBarn(values)) {
        return {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: values.fødselsdatoer.map((f) => f.dato),
            adopsjonsdato: values.adopsjonsdato,
            antallBarn: values.antallBarn < 3 ? values.antallBarn : parseInt(values.antallBarnSelect!, 10),
            adoptertIUtlandet: values.adoptertIUtlandet,
            ankomstdato: values.adoptertIUtlandet === true ? values.ankomstdato : undefined,
        };
    }
    throw new Error('Unreachable code');
};

export const getOmBarnetInitialValues = (arbeidsforhold: Arbeidsforhold[], barn?: Barn): BarnetFormValues => {
    if (!barn) {
        return { fødselsdatoer: [{ dato: undefined }] };
    }

    const erFlereEnnToBarn = barn.antallBarn > 2;

    if (isFødtBarn(barn)) {
        return {
            erBarnetFødt: true,
            antallBarn: erFlereEnnToBarn ? 3 : barn.antallBarn,
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : undefined,
            fødselsdatoer: barn.fødselsdatoer.map((f) => ({
                dato: f,
            })),
            termindato: barn.termindato,
        };
    }

    if (isUfødtBarn(barn)) {
        if (arbeidsforhold.length === 0) {
            return {
                erBarnetFødt: false,
                antallBarn: erFlereEnnToBarn ? 3 : barn.antallBarn,
                antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : undefined,
                terminbekreftelsedato: barn.terminbekreftelsedato,
                termindato: barn.termindato,
            };
        }

        return {
            erBarnetFødt: false,
            antallBarn: erFlereEnnToBarn ? 3 : barn.antallBarn,
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : undefined,
            termindato: barn.termindato,
        };
    }

    if (isAdoptertAnnetBarn(barn)) {
        return {
            adopsjonAvEktefellesBarn: false,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: erFlereEnnToBarn ? 3 : barn.antallBarn,
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : undefined,
            fødselsdatoer: barn.fødselsdatoer.map((f) => ({
                dato: f,
            })),
            adoptertIUtlandet: barn.adoptertIUtlandet,
            ankomstdato: barn.ankomstdato,
        };
    }

    if (isAdoptertStebarn(barn)) {
        return {
            adopsjonAvEktefellesBarn: true,
            adopsjonsdato: barn.adopsjonsdato,
<<<<<<< HEAD
            antallBarn: erFlereEnnToBarn ? '3' : barn.antallBarn.toString(),
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : '',
            fødselsdatoer: barn.fødselsdatoer.map((fødselsdato) => dateToISOString(fødselsdato)),
            omsorgsovertakelse: vedlegg[Skjemanummer.OMSORGSOVERTAKELSE] || [],
            fødselsdatoer: barn.fødselsdatoer,
            omsorgsovertakelse: barn.omsorgsovertakelse,
=======
            antallBarn: erFlereEnnToBarn ? 3 : barn.antallBarn,
            antallBarnSelect: erFlereEnnToBarn ? barn.antallBarn.toString() : undefined,
            fødselsdatoer: barn.fødselsdatoer.map((f) => ({
                dato: f,
            })),
        };
    }

>>>>>>> 543253e53 (div)
    return { fødselsdatoer: [{ dato: undefined }] };
};
