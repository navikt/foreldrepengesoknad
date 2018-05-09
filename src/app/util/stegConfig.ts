export enum StegID {
    'RELASJON_TIL_BARN' = 'relasjon-til-barn',
    'RELASJON_TIL_BARN_ADOPSJON' = 'relasjon-til-barn-adopsjon',
    'RELASJON_TIL_BARN_STEBARNSADOPSJON' = 'relasjon-til-barn-stebarnsadopsjon',
    'ANNEN_FORELDER' = 'annen-forelder'
}

export interface StegConfig {
    [key: string]: {
        tittel: string;
        nesteKnapp: string;
    };
}

const stegConfig: StegConfig = {
    [StegID.RELASJON_TIL_BARN]: {
        tittel: 'Relasjon til barn header',
        nesteKnapp: 'Fortsett'
    },
    [StegID.RELASJON_TIL_BARN_ADOPSJON]: {
        tittel: 'Relasjon til barn (adopsjon) header',
        nesteKnapp: 'Fortsett'
    },
    [StegID.ANNEN_FORELDER]: {
        tittel: 'Annen forelder header',
        nesteKnapp: 'Fortsett'
    },
    [StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON]: {
        tittel: 'Relasjon til barn tidlig stebarnsadopsjon',
        nesteKnapp: 'Fortsett'
    }
};

export default stegConfig;
