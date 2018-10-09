import { StegConfigItem } from './stegConfig';

export enum EndringStegID {
    'INNGANG' = 'inngang',
    'UTTAKSPLAN' = 'uttaksplan',
    'OPPSUMMERING' = 'oppsummering'
}

export interface EndringStegConfig {
    [key: string]: StegConfigItem;
}

const stegConfig: EndringStegConfig = {
    [EndringStegID.INNGANG]: {
        tittel: 'Inngang',
        fortsettKnappLabel: 'Fortsett',
        index: 0
    },
    [EndringStegID.UTTAKSPLAN]: {
        tittel: 'Uttak',
        fortsettKnappLabel: 'Fortsett',
        nesteSteg: EndringStegID.OPPSUMMERING,
        index: 1
    },
    [EndringStegID.OPPSUMMERING]: {
        tittel: 'Oppsummering',
        fortsettKnappLabel: 'Send søknad',
        index: 2
    }
};

export default stegConfig;
