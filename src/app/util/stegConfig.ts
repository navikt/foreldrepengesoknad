export enum StegID {
    'RELASJON_TIL_BARN_FØDSEL' = 'relasjon-til-barn-fødsel',
    'RELASJON_TIL_BARN_ADOPSJON' = 'relasjon-til-barn-adopsjon',
    'RELASJON_TIL_BARN_STEBARNSADOPSJON' = 'relasjon-til-barn-stebarnsadopsjon',
    'RELASJON_TIL_BARN_FORELDREANSVAR' = 'relasjon-til-barn-foreldreansvar',
    'UTENLANDSOPPHOLD' = 'utenlandsopphold',
    'ANDRE_INNTEKTER' = 'andre-inntekter',
    'UTTAKSPLAN' = 'uttaksplan'
}

export interface StegConfig {
    [key: string]: {
        tittel: string;
        fortsettKnappLabel: string;
        nesteSteg?: StegID;
        sisteSteg?: boolean;
    };
}

const stegConfig: StegConfig = {
    [StegID.RELASJON_TIL_BARN_ADOPSJON]: {
        tittel: 'Relasjon til barn (adopsjon) header',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD
    },
    [StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON]: {
        tittel: 'Relasjon til barn tidlig stebarnsadopsjon',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD
    },
    [StegID.RELASJON_TIL_BARN_FORELDREANSVAR]: {
        tittel: 'Relasjon til barn overtakelse av foreldreansvar',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD
    },
    [StegID.RELASJON_TIL_BARN_FØDSEL]: {
        tittel: 'Relasjon til barn fødsel',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD
    },
    [StegID.UTENLANDSOPPHOLD]: {
        tittel: 'Utenlandsopphold',
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
        fortsettKnappLabel: 'Send søknad',
        sisteSteg: true
    }
};

export default stegConfig;
