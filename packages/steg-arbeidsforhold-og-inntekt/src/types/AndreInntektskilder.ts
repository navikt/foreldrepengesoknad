import { AnnenInntektDto, CountryCode } from '@navikt/fp-types';

export type AnnenInntektType = 'ETTERLØNN_SLUTTPAKKE' | 'MILITÆR_ELLER_SIVILTJENESTE' | 'JOBB_I_UTLANDET';

export interface AndreInntektskilder extends AnnenInntektDto {
    type: AnnenInntektType;
    pågående?: boolean;
}

export interface SluttpakkeInntektUtkast {
    type: 'ETTERLØNN_SLUTTPAKKE';
    fom?: string;
    tom?: string;
}

export interface MilitærtjenesteInntektUtkast {
    type: 'MILITÆR_ELLER_SIVILTJENESTE';
    fom?: string;
    pågående?: boolean;
    tom?: string;
}

export interface JobbIUtlandetInntektUtkast {
    type: 'JOBB_I_UTLANDET';
    arbeidsgiverNavn?: string;
    land?: CountryCode;
    fom?: string;
    pågående?: boolean;
    tom?: string;
}

export type AndreInntektskilderUtkast =
    SluttpakkeInntektUtkast | MilitærtjenesteInntektUtkast | JobbIUtlandetInntektUtkast | { type: undefined };

export type AndreInntekterFormValues = {
    andreInntektskilder: AndreInntektskilderUtkast[];
};

export const erFerdigUtfylt = (entry: AndreInntektskilderUtkast): entry is AndreInntektskilder =>
    entry.type !== undefined;
