export enum CommonActionKeys {
    'SET_BEKREFTET_INFORMASJON' = 'setBekreftetInformasjon',
    'SET_GODKJENT_VILKAR' = 'setGodkjentVilkar',
    'SET_SPRÅK' = 'setSpråk'
}

interface SetBekreftetInformasjon {
    type: CommonActionKeys.SET_BEKREFTET_INFORMASJON;
    bekreftetInformasjon: boolean;
}

interface SetGodkjentVilkar {
    type: CommonActionKeys.SET_GODKJENT_VILKAR;
    godkjentVilkar: boolean;
}

interface SetSpråk {
    type: CommonActionKeys.SET_SPRÅK;
    språkkode: string;
}

export type CommonActionTypes =
    | SetBekreftetInformasjon
    | SetGodkjentVilkar
    | SetSpråk;
