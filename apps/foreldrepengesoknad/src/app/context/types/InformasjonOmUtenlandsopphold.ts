import { Tidsperiode } from '@navikt/fp-common';

export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

export type Opphold = {
    iNorgeNeste12Mnd: boolean;
    iNorgeSiste12Mnd: boolean;
};

export type TidligereOpphold = {
    tidligereOpphold: Utenlandsopphold[];
};

export type SenereOpphold = {
    senereOpphold: Utenlandsopphold[];
};

type InformasjonOmUtenlandsopphold = Opphold & TidligereOpphold & SenereOpphold;

export default InformasjonOmUtenlandsopphold;
