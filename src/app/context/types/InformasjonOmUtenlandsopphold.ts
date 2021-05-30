import { Tidsperiode } from './Tidsperiode';

export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

interface InformasjonOmUtenlandsopphold {
    iNorgeNeste12Mnd: boolean;
    iNorgeSiste12Mnd: boolean;
    senereOpphold: Utenlandsopphold[];
    tidligereOpphold: Utenlandsopphold[];
}

export default InformasjonOmUtenlandsopphold;
