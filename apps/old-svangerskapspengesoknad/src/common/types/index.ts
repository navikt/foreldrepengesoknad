export * from '../intl/types';

export type Dekningsgrad = '80' | '100';

export enum Forelder {
    'MOR' = 'mor',
    'FARMEDMOR' = 'farMedmor',
}

export interface NavnPåForeldre {
    mor: string;
    farMedmor: string;
}

export interface Tidsperiode {
    fom: string;
    tom: string;
}

export interface TidsperiodeDTO {
    fom: Date;
    tom: Date;
}

export interface Avgrensninger {
    minDato?: string;
    maksDato?: string;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}

export interface TidsperiodeMedValgfriSluttdato {
    fom: string;
    tom?: string;
    pågående?: boolean;
}

export interface TidsperiodeMedValgfriSluttdatoDTO {
    fom: Date;
    tom?: Date;
    pågående?: boolean;
}
