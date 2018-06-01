export * from '../intl/types';

export type Dekningsgrad = '80%' | '100%';

export type Forelder = 'forelder1' | 'forelder2';

export interface Tidsperiode {
    startdato: Date;
    sluttdato: Date;
}
