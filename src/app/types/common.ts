export type Fødselsdato = Date | undefined;

export interface Alder {
    år: number;
    måneder: number;
    dager: number;
}

export enum Kjønn {
    'MANN' = 'M',
    'KVINNE' = 'K'
}
