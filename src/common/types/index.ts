export * from '../intl/types';

export type Dekningsgrad = '80%' | '100%';

export type Forelder = 'forelder1' | 'forelder2';

export interface Tidsperiode {
    startdato: Date;
    sluttdato: Date;
}

export interface TidsperiodeMedValgfriSluttdato {
    startdato: Date;
    sluttdato?: Date;
}

export type TidsperiodePartial = Partial<Tidsperiode>;
export type TidsperiodeMedValgfriSluttdatoPartial = Partial<
    TidsperiodeMedValgfriSluttdato
>;
