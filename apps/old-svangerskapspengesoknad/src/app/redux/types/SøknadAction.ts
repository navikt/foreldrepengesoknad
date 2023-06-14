export enum SøknadActionTypes {
    'SET_VILKÅR_GODKJENT' = 'setVilkårGodkjent',
    'SET_OPPSUMMERING_GODKJENT' = 'setOppsummeringGodkjent',
}

export interface SetVilkårGodkjent {
    type: SøknadActionTypes.SET_VILKÅR_GODKJENT;
    payload: {
        vilkårErGodkjent: boolean;
    };
}

export interface SetOppsummeringGodkjent {
    type: SøknadActionTypes.SET_OPPSUMMERING_GODKJENT;
    payload: {
        oppsummeringErGodkjent: boolean;
    };
}

type SøknadAction = SetVilkårGodkjent | SetOppsummeringGodkjent;

export default SøknadAction;
