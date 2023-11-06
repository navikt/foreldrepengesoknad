import { Tidsperiode } from '@navikt/fp-common';
import { TidsperiodeDTO } from './TidsperiodeDTO';

export interface UtenlandsoppholdInput {
    land: string;
    fom: string;
    tom: string;
}

export interface UtenlandsoppholdDTO {
    land: string;
    tidsperiode: TidsperiodeDTO;
}
export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

export enum Oppholdstype {
    'TIDLIGERE_OPPHOLD' = 'tidligereOpphold',
    'SENERE_OPPHOLD' = 'senereOpphold',
}

interface InformasjonOmUtenlandsopphold {
    iNorgePåHendelsestidspunktet: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    jobbetINorgeSiste12Mnd: boolean;
    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export interface InformasjonOmUtenlandsoppholdDTO {
    iNorgePåHendelsestidspunktet: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    jobbetINorgeSiste12Mnd: boolean;

    tidligereOpphold: UtenlandsoppholdDTO[];
    senereOpphold: UtenlandsoppholdDTO[];
}

export default InformasjonOmUtenlandsopphold;
