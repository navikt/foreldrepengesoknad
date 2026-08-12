import { CountryCode } from '@navikt/fp-types';

export const AnnenInntektType = {
    SLUTTPAKKE: 'ETTERLØNN_SLUTTPAKKE',
    MILITÆRTJENESTE: 'MILITÆR_ELLER_SIVILTJENESTE',
    JOBB_I_UTLANDET: 'JOBB_I_UTLANDET',
} as const;

export type AnnenInntektType = (typeof AnnenInntektType)[keyof typeof AnnenInntektType];

interface AnnenInntektBase {
    type: AnnenInntektType;
    fom: string;
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: typeof AnnenInntektType.SLUTTPAKKE;
    tom: string;
}

interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: typeof AnnenInntektType.MILITÆRTJENESTE;
    pågående: boolean;
    tom?: string;
}

interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: typeof AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: CountryCode;
    pågående: boolean;
    tom?: string;
}

export type AndreInntektskilder = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt;

type InntektskildeUtkast<T extends AndreInntektskilder> = Pick<T, 'type'> & Partial<Omit<T, 'type'>>;

export type AndreInntektskilderUtkast =
    | InntektskildeUtkast<SluttpakkeInntekt>
    | InntektskildeUtkast<MilitærtjenesteInntekt>
    | InntektskildeUtkast<JobbIUtlandetInntekt>
    | { type: undefined };

export type AndreInntekterFormValues = {
    andreInntektskilder: AndreInntektskilderUtkast[];
};

export const erFerdigUtfylt = (entry: AndreInntektskilderUtkast): entry is AndreInntektskilder =>
    entry.type !== undefined;
