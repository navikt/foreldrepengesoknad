export * from '../intl/types';

export enum Dekningsgrad {
    ÅTTI_PROSENT = '80',
    HUNDRE_PROSENT = '100',
}

export enum Forelder {
    'mor' = 'mor',
    'farMedmor' = 'farMedmor',
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

export interface TidsperiodeString {
    fom: string;
    tom: string;
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

export interface TidsperiodeStringMedValgfriSluttdato {
    fom: string;
    tom?: string;
    pågående?: boolean;
}

export interface Feil {
    tittel?: string;
    feilmelding: string;
}

export enum StønadskontoType {
    'Mødrekvote' = 'MØDREKVOTE',
    'Fedrekvote' = 'FEDREKVOTE',
    'Fellesperiode' = 'FELLESPERIODE',
    'Foreldrepenger' = 'FORELDREPENGER',
    'ForeldrepengerFørFødsel' = 'FORELDREPENGER_FØR_FØDSEL',
    'Flerbarnsdager' = 'FLERBARNSDAGER', // Ikke brukt som egen type i periodene
    'AktivitetsfriKvote' = 'AKTIVITETSFRI_KVOTE', // Foreldrepenger
}
