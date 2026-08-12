import { CountryCode } from '@navikt/fp-types';

export type AnnenInntektType = 'ETTERLØNN_SLUTTPAKKE' | 'MILITÆR_ELLER_SIVILTJENESTE' | 'JOBB_I_UTLANDET';

interface AnnenInntektBase {
    type: AnnenInntektType;
    fom: string;
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: 'ETTERLØNN_SLUTTPAKKE';
    tom: string;
}

interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: 'MILITÆR_ELLER_SIVILTJENESTE';
    pågående: boolean;
    tom?: string;
}

interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: 'JOBB_I_UTLANDET';
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
