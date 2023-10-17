export enum Tilretteleggingstype {
    'INGEN' = 'INGEN',
    'DELVIS' = 'DELVIS',
    'HEL' = 'HEL',
}

export interface TilretteleggingPeriodeSVP {
    type: Tilretteleggingstype;
    fom: string;
    tom: string;
}
