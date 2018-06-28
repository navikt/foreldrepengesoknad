export enum StegID {
    'INNGANG' = 'inngang',
    'RELASJON_TIL_BARN_FØDSEL' = 'relasjon-til-barn-fodsel',
    'RELASJON_TIL_BARN_ADOPSJON' = 'relasjon-til-barn-adopsjon',
    'RELASJON_TIL_BARN_STEBARNSADOPSJON' = 'relasjon-til-barn-stebarnsadopsjon',
    'RELASJON_TIL_BARN_FORELDREANSVAR' = 'relasjon-til-barn-foreldreansvar',
    'UTENLANDSOPPHOLD' = 'utenlandsopphold',
    'ANNEN_FORELDER' = 'annen-forelder',
    'ANDRE_INNTEKTER' = 'andre-inntekter',
    'UTTAKSPLAN' = 'uttaksplan'
}

export interface StegConfig {
    [key: string]: {
        tittel: string;
        fortsettKnappLabel: string;
        nesteSteg?: StegID;
    };
}

const stegConfig: StegConfig = {
    [StegID.INNGANG]: {
        tittel: 'Inngang',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.RELASJON_TIL_BARN_FØDSEL
    },
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
        tittel: 'InformasjonOmUtenlandsopphold',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANDRE_INNTEKTER
    },
    [StegID.ANDRE_INNTEKTER]: {
        tittel: 'Andre inntekter',
        fortsettKnappLabel: 'Gå til uttaksplan',
        nesteSteg: StegID.UTTAKSPLAN
    },
    [StegID.UTTAKSPLAN]: {
        tittel: 'Velkommen til eksempel-uttaksplanen',
        fortsettKnappLabel: 'Send søknad'
    }
};

export default stegConfig;
