import { Tidsperiode } from 'common/types';

export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

interface UtenlandsoppholdSkjemadata {
    land: string;
    tidsperiode: Partial<Tidsperiode>;
}

interface InformasjonOmUtenlandsopphold {
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export type UtenlandsoppholdType = 'senereOpphold' | 'tidligereOpphold';

export type InformasjonOmUtenlandsoppholdPartial = Partial<InformasjonOmUtenlandsopphold>;
export type UtenlandsoppholdSkjemadataPartial = Partial<UtenlandsoppholdSkjemadata>;

export default InformasjonOmUtenlandsopphold;
