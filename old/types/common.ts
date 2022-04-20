import { History } from 'history';

export type DateValue = Date | undefined;

export interface Alder {
    år: number;
    måneder: number;
    dager: number;
}

export enum Kjønn {
    'MANN' = 'M',
    'KVINNE' = 'K',
}

export interface HistoryProps {
    history: History;
}

export interface Navn {
    fornavn: string;
    etternavn: string;
    navn: string;
}
