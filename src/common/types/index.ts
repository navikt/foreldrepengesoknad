export * from '../intl/types';

export type Dekningsgrad = '80' | '100';

export enum Forelder {
    'mor' = 'mor',
    'farMedmor' = 'farMedmor'
}

export type StatusKey = 'suksess' | 'advarsel' | 'feil';

export interface NavnPåForeldre {
    mor: string;
    farMedmor: string;
}

export interface Tidsperiode {
    fom: Date;
    tom: Date;
}

export interface Avgrensninger {
    minDato?: Date;
    maksDato?: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}

export interface TidsperiodeMedValgfriSluttdato {
    fom: Date;
    tom?: Date;
    pågående?: boolean;
}

export interface Feil {
    tittel?: string;
    feilmelding: string;
}
