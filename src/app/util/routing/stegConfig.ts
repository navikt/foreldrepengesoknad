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
    'OPPSUMMERING' = 'oppsummering',
    'MANGLENDE_VEDLEGG' = 'manglende-vedlegg',
}

export interface StegConfig {
    [key: string]: StegConfigItem;
}

export interface StegConfigItem {
    tittel: string;
    fortsettKnappLabel: string;
    tilbakeLabel?: string;
    nesteSteg?: StegID;
    isAvilable?: (søknad: Søknad) => boolean;
    index: number;
}

export const getStegConfig = (erEndringssøknad: boolean, erEnkelEndringssøknad?: boolean): StegConfig => {
    let stegConfig: StegConfig = {};
    const initielleSteg: StegConfig = {
        [StegID.INNGANG]: {
            tittel: 'steg.config.tittel.inngang',
            fortsettKnappLabel: 'Fortsett',
            index: 0,
        },
        [StegID.RELASJON_TIL_BARN_ADOPSJON]: {
            tittel: 'steg.config.tittel.infoOmBarnet',
            fortsettKnappLabel: 'Fortsett',
            tilbakeLabel: 'Gå tilbake til din situasjon',
            nesteSteg: StegID.ANNEN_FORELDER,
            index: 1,
        },
        [StegID.RELASJON_TIL_BARN_FORELDREANSVAR]: {
            tittel: 'steg.config.tittel.relasjonBarnForeldreansvar',
            fortsettKnappLabel: 'Fortsett',
            tilbakeLabel: 'Gå tilbake til din situasjon',
            nesteSteg: StegID.ANNEN_FORELDER,
            index: 1,
        },
        [StegID.RELASJON_TIL_BARN_FØDSEL]: {
            tittel: 'steg.config.tittel.relasjonBarnFødsel',
            fortsettKnappLabel: 'Fortsett',
            tilbakeLabel: 'Gå tilbake til din situasjon',
            nesteSteg: StegID.ANNEN_FORELDER,
            index: 1,
        },
        [StegID.ANNEN_FORELDER]: {
            tittel: 'steg.config.tittel.annenForelder',
            fortsettKnappLabel: 'Fortsett',
            tilbakeLabel: 'Gå tilbake til om barnet',
            nesteSteg: StegID.UTTAKSPLAN_SKJEMA,
            index: 2,
        },
        [StegID.UTTAKSPLAN_SKJEMA]: {
            tittel: 'steg.config.tittel.infoOmUttaket',
            fortsettKnappLabel: 'Lag forslag til uttaksplan',
            tilbakeLabel: 'Gå tilbake til den andre forelderen',
            nesteSteg: StegID.UTTAKSPLAN,
            index: 3,
        },
    };
    if (erEndringssøknad) {
        stegConfig = {
            ...(erEnkelEndringssøknad ? {} : initielleSteg),
            [StegID.UTTAKSPLAN]: {
                tittel: 'steg.config.tittel.uttak',
                fortsettKnappLabel: 'Fortsett',
                nesteSteg: StegID.OPPSUMMERING,
                index: 4,
            },
            [StegID.OPPSUMMERING]: {
                tittel: 'steg.config.tittel.oppsummering',
                fortsettKnappLabel: 'Send søknad',
                index: 5,
            },
        };
    } else {
        stegConfig = {
            ...initielleSteg,
            [StegID.UTTAKSPLAN]: {
                tittel: 'steg.config.tittel.uttak',
                fortsettKnappLabel: 'Fortsett',
                tilbakeLabel: 'Gå tilbake til om perioden din med foreldrepenger',
                nesteSteg: StegID.UTENLANDSOPPHOLD,
                index: 4,
            },
            [StegID.UTENLANDSOPPHOLD]: {
                tittel: 'steg.config.tittel.infoOmUtenlandsopphold',
                fortsettKnappLabel: 'Fortsett',
                tilbakeLabel: 'Gå tilbake til din plan med foreldrepenger',
                nesteSteg: StegID.ANDRE_INNTEKTER,
                index: 5,
            },
            [StegID.ANDRE_INNTEKTER]: {
                tittel: 'steg.config.tittel.opplysningerOmInntekt',
                fortsettKnappLabel: 'Fortsett',
                tilbakeLabel: 'Gå tilbake til opphold i utland',
                nesteSteg: StegID.MANGLENDE_VEDLEGG,
                index: 6,
            },
            [StegID.MANGLENDE_VEDLEGG]: {
                tittel: 'steg.config.tittel.manglendeVedlegg',
                fortsettKnappLabel: 'Gå til oppsummering',
                tilbakeLabel: 'Gå tilbake til arbeidsforhold og inntekt',
                nesteSteg: StegID.OPPSUMMERING,
                index: 7,
            },
            [StegID.OPPSUMMERING]: {
                tittel: 'steg.config.tittel.oppsummering',
                fortsettKnappLabel: 'Send søknad',
                tilbakeLabel: 'Gå tilbake til forrige side',
                index: 8,
            },
        };
    }

    return stegConfig;
};
