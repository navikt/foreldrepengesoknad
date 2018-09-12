export * from '../intl/types';

export type Dekningsgrad = '80' | '100';

export enum Forelder {
    'FORELDER_1' = 'forelder1',
    'FORELDER_2' = 'forelder2'
}

export interface Tidsperiode {
    fom: Date;
    tom: Date;
}

export interface TidsperiodeMedValgfriSluttdato {
    fom: Date;
    tom?: Date;
}

export type TidsperiodePartial = Partial<Tidsperiode>;
export type TidsperiodeMedValgfriSluttdatoPartial = Partial<TidsperiodeMedValgfriSluttdato>;
