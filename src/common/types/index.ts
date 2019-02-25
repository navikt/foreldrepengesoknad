export * from '../intl/types';

export type Dekningsgrad = '80' | '100';

export enum Forelder {
    'MOR' = 'mor',
    'FARMEDMOR' = 'farMedmor'
}

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
