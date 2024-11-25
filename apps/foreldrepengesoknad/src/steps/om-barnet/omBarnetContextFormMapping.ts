import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';
import { hasValue } from 'utils/validationUtil';

import {
    AdoptertBarn,
    Barn,
    BarnType,
    FødtBarn,
    IkkeUtfyltTypeBarn,
    Situasjon,
    UfødtBarn,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { Arbeidsforhold, SøkersituasjonFp } from '@navikt/fp-types';

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
    if (valgtRegistrertBarn !== undefined && situasjon === 'fødsel') {
        return {
            ...valgtRegistrertBarn,
            type: barnSøktOmFørMenIkkeRegistrert ? BarnType.UFØDT : BarnType.FØDT,
            termindato: (values as FødtBarn | UfødtBarn).termindato,
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
    søkersituasjon: SøkersituasjonFp,
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
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(
            arbeidsforhold,
            søkersituasjon.situasjon === 'adopsjon',
            isFarEllerMedmor(søkersituasjon.rolle),
            values.termindato,
        );
        if (aktiveArbeidsforhold.length === 0) {
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

const getAntallBarn = (erFlereEnnToBarn: boolean, barn: Barn): number => (erFlereEnnToBarn ? 3 : barn.antallBarn);
const getAntallBarnSelect = (erFlereEnnToBarn: boolean, barn: Barn): string | undefined =>
    erFlereEnnToBarn ? barn.antallBarn.toString() : undefined;

export const getOmBarnetInitialValues = (
    arbeidsforhold: Arbeidsforhold[],
    søkersituasjon: SøkersituasjonFp,
    barn?: Barn,
): BarnetFormValues => {
    if (!barn) {
        return { fødselsdatoer: [{ dato: undefined }] };
    }

    const erFlereEnnToBarn = barn.antallBarn > 2;

    if (isFødtBarn(barn)) {
        return {
            erBarnetFødt: true,
            antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
            antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
            fødselsdatoer: barn.fødselsdatoer.map((f) => ({
                dato: f,
            })),
            termindato: barn.termindato,
        };
    }

    if (isUfødtBarn(barn)) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(
            arbeidsforhold,
            søkersituasjon.situasjon === 'adopsjon',
            isFarEllerMedmor(søkersituasjon.rolle),
            barn.termindato,
        );
        if (aktiveArbeidsforhold.length === 0) {
            return {
                erBarnetFødt: false,
                antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
                antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
                terminbekreftelsedato: barn.terminbekreftelsedato,
                termindato: barn.termindato,
            };
        }

        return {
            erBarnetFødt: false,
            antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
            antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
            termindato: barn.termindato,
        };
    }

    if (isAdoptertAnnetBarn(barn)) {
        return {
            adopsjonAvEktefellesBarn: false,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
            antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
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
            antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
            antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
            fødselsdatoer: barn.fødselsdatoer.map((f) => ({
                dato: f,
            })),
        };
    }

    return { fødselsdatoer: [{ dato: undefined }] };
};
