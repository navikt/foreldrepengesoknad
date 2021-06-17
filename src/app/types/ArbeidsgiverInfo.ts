export enum ArbeidsgiverInfoType {
    'ORGANISASJON' = 'ORGANISASJON',
    'PRIVAT' = 'PRIVAT',
}

export interface ArbeidsgiverInfo {
    id: string;
    type: ArbeidsgiverInfoType;
    navn: string;
}
