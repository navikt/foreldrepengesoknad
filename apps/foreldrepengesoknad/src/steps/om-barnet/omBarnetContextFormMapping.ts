import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { BarnType } from '@navikt/fp-constants';
import {
    AdoptertBarn,
    Barn,
    EksternArbeidsforholdDto_fpoversikt,
    FødtBarn,
    IkkeUtfyltTypeBarn,
    Situasjon,
    SøkersituasjonFp,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { hasValue } from '@navikt/fp-validation';

import {
    BarnetFormValues,
    UfødtBarn,
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
            ankomstdato: values.adoptertIUtlandet ? values.ankomstdato : undefined,
        };
    }
    throw new Error('Unreachable code');
};

export const mapOmBarnetFormDataToState = (
    values: BarnetFormValues,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
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
            antallBarn: values.antallBarn < 3 ? values.antallBarn : Number(values.antallBarnSelect!),
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
                antallBarn: values.antallBarn < 3 ? values.antallBarn : Number(values.antallBarnSelect!),
                termindato: values.termindato,
            };
        }
        return {
            type: BarnType.UFØDT,
            antallBarn: values.antallBarn < 3 ? values.antallBarn : Number(values.antallBarnSelect!),
            termindato: values.termindato,
        };
    }

    if (erAdoptertStebarn(values)) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: values.adopsjonsdato,
            antallBarn: values.antallBarn < 3 ? values.antallBarn : Number(values.antallBarnSelect!),
            fødselsdatoer: values.fødselsdatoer.map((f) => f.dato),
        };
    }

    if (erAdoptertAnnetBarn(values)) {
        return {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: values.fødselsdatoer.map((f) => f.dato),
            adopsjonsdato: values.adopsjonsdato,
            antallBarn: values.antallBarn < 3 ? values.antallBarn : Number(values.antallBarnSelect!),
            adoptertIUtlandet: values.adoptertIUtlandet,
            ankomstdato: values.adoptertIUtlandet ? values.ankomstdato : undefined,
        };
    }

    throw new Error('Unreachable code');
};

const getAntallBarn = (erFlereEnnToBarn: boolean, barn: Barn): number => (erFlereEnnToBarn ? 3 : barn.antallBarn);
const getAntallBarnSelect = (erFlereEnnToBarn: boolean, barn: Barn): string | undefined =>
    erFlereEnnToBarn ? barn.antallBarn.toString() : undefined;

// Sikrer at skjemaet aldri får et tomt fødselsdatoer-array som defaultValue. Et tomt array er
// truthy i JS, så konsumenter som gjør `fødselsdatoer ? fødselsdatoer[0].dato : undefined`
// (OmBarnetSteg/ErFødtPanel) vil ellers krasje på `fødselsdatoer[0]` som er `undefined`.
// Dette kan skje for eksempel ved endringssøknad på en adopsjon/stebarn-sak der verken saken
// eller PDL har en kjent fødselsdato for barnet.
const mapFødselsdatoer = (fødselsdatoer: string[]): Array<{ dato?: string }> =>
    fødselsdatoer.length > 0 ? fødselsdatoer.map((f) => ({ dato: f })) : [{ dato: undefined }];

export const getOmBarnetInitialValues = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    søkersituasjon: SøkersituasjonFp,
    barn?: Barn,
    termindatoFraVedtak?: string,
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
            fødselsdatoer: mapFødselsdatoer(barn.fødselsdatoer),
            termindato: termindatoFraVedtak || barn.termindato,
        };
    }

    if (isUfødtBarn(barn)) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(
            arbeidsforhold,
            søkersituasjon.situasjon === 'adopsjon',
            isFarEllerMedmor(søkersituasjon.rolle),
            termindatoFraVedtak || barn.termindato,
        );
        if (aktiveArbeidsforhold.length === 0) {
            return {
                erBarnetFødt: false,
                antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
                antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
                terminbekreftelsedato: barn.terminbekreftelsedato,
                termindato: termindatoFraVedtak || barn.termindato,
            };
        }

        return {
            erBarnetFødt: false,
            antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
            antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
            termindato: termindatoFraVedtak || barn.termindato,
        };
    }

    if (isAdoptertAnnetBarn(barn)) {
        return {
            adopsjonAvEktefellesBarn: false,
            adopsjonsdato: barn.adopsjonsdato,
            antallBarn: getAntallBarn(erFlereEnnToBarn, barn),
            antallBarnSelect: getAntallBarnSelect(erFlereEnnToBarn, barn),
            fødselsdatoer: mapFødselsdatoer(barn.fødselsdatoer),
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
            fødselsdatoer: mapFødselsdatoer(barn.fødselsdatoer),
        };
    }

    return { fødselsdatoer: [{ dato: undefined }] };
};
