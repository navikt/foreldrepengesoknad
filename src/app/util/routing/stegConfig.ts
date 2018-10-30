import Søknad from '../../types/søknad/Søknad';

export enum StegID {
    'INNGANG' = 'inngang',
    'RELASJON_TIL_BARN_FØDSEL' = 'relasjon-til-barn-fodsel',
    'RELASJON_TIL_BARN_ADOPSJON' = 'relasjon-til-barn-adopsjon',
    'RELASJON_TIL_BARN_FORELDREANSVAR' = 'relasjon-til-barn-foreldreansvar',
    'UTENLANDSOPPHOLD' = 'utenlandsopphold',
    'ANNEN_FORELDER' = 'annen-forelder',
    'ANDRE_INNTEKTER' = 'andre-inntekter',
    'UTTAKSPLAN_SKJEMA' = 'uttaksplan-skjema',
    'UTTAKSPLAN' = 'uttaksplan',
    'OPPSUMMERING' = 'oppsummering'
}

export interface StegConfig {
    [key: string]: StegConfigItem;
}

export interface StegConfigItem {
    tittel: string;
    fortsettKnappLabel: string;
    nesteSteg?: StegID;
    isAvilable?: (søknad: Søknad) => boolean;
    index: number;
}

const stegConfig: StegConfig = {
    [StegID.INNGANG]: {
        tittel: 'steg.config.tittel.inngang',
        fortsettKnappLabel: 'Fortsett',
        index: 0
    },
    [StegID.RELASJON_TIL_BARN_ADOPSJON]: {
        tittel: 'steg.config.tittel.infoOmBarnet',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER,
        index: 1
    },
    [StegID.RELASJON_TIL_BARN_FORELDREANSVAR]: {
        tittel: 'steg.config.tittel.relasjonBarnForeldreansvar',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER,
        index: 1
    },
    [StegID.RELASJON_TIL_BARN_FØDSEL]: {
        tittel: 'steg.config.tittel.relasjonBarnFødsel',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANNEN_FORELDER,
        index: 1
    },
    [StegID.ANNEN_FORELDER]: {
        tittel: 'steg.config.tittel.annenForelder',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTTAKSPLAN_SKJEMA,
        index: 2
    },
    [StegID.UTTAKSPLAN_SKJEMA]: {
        tittel: 'steg.config.tittel.infoOmUttaket',
        fortsettKnappLabel: 'Lag forslag til uttaksplan',
        nesteSteg: StegID.UTTAKSPLAN,
        index: 3
    },
    [StegID.UTTAKSPLAN]: {
        tittel: 'steg.config.tittel.uttak',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.UTENLANDSOPPHOLD,
        index: 4
    },
    [StegID.UTENLANDSOPPHOLD]: {
        tittel: 'steg.config.tittel.infoOmUtenlandsopphold',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: StegID.ANDRE_INNTEKTER,
        index: 5
    },
    [StegID.ANDRE_INNTEKTER]: {
        tittel: 'steg.config.tittel.opplysningerOmInntekt',
        fortsettKnappLabel: 'Gå til oppsummering',
        nesteSteg: StegID.OPPSUMMERING,
        index: 6
    },
    [StegID.OPPSUMMERING]: {
        tittel: 'steg.config.tittel.oppsummering',
        fortsettKnappLabel: 'Send søknad',
        index: 7
    }
};

export default stegConfig;
