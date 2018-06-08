export enum StegID {
    'RELASJON_TIL_BARN_FØDSEL' = 'relasjon-til-barn-fødsel',
    'RELASJON_TIL_BARN_ADOPSJON' = 'relasjon-til-barn-adopsjon',
    'RELASJON_TIL_BARN_STEBARNSADOPSJON' = 'relasjon-til-barn-stebarnsadopsjon',
    'RELASJON_TIL_BARN_FORELDREANSVAR' = 'relasjon-til-barn-foreldreansvar',
    'ANNEN_FORELDER' = 'annen-forelder',
    'UTENLANDSOPPHOLD' = 'utenlandsopphold'
}

export interface StegConfig {
    [key: string]: {
        tittel: string;
        fortsettKnappLabel: string;
        nesteSteg: StegID;
    };
}

const stegConfig: StegConfig = {
    [StegID.RELASJON_TIL_BARN_ADOPSJON]: {
        tittel: 'Relasjon til barn (adopsjon) header',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER
    },
    [StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON]: {
        tittel: 'Relasjon til barn tidlig stebarnsadopsjon',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER
    },
    [StegID.RELASJON_TIL_BARN_FORELDREANSVAR]: {
        tittel: 'Relasjon til barn overtakelse av foreldreansvar',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER
    },
    [StegID.RELASJON_TIL_BARN_FØDSEL]: {
        tittel: 'Relasjon til barn fødsel',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER
    },
    [StegID.ANNEN_FORELDER]: {
        tittel: 'Den andre forelderen',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD
    },
    [StegID.UTENLANDSOPPHOLD]: {
        tittel: 'Utenlandsopphold',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD // will change later
    }
};

export default stegConfig;
