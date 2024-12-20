export type Tilretteleggingstype = 'INGEN' | 'DELVIS' | 'HEL';

export interface TilretteleggingPeriodeSVP {
    type: Tilretteleggingstype;
    fom: string;
    tom: string;
    resultat: Resultat;
}

type Resultat = {
    resultatType: 'INNVILGET' | 'AVSLAG_SØKNADSFRIST' | 'AVSLAG_ANNET';
    utbetalingsgrad: number;
};
