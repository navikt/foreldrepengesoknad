import { TidsperiodeDTO } from './TidsperiodeDTO';

export interface UtenlandsoppholdPeriode {
    land: string;
    tidsperiode: {
        fom: string;
        tom: string;
    };
}

export type Utenlandsopphold = {
    iNorgeNeste12Mnd: boolean;
    iNorgeSiste12Mnd: boolean;
};

export type UtenlandsoppholdTidligere = {
    tidligereOpphold: UtenlandsoppholdPeriode[];
};

export type UtenlandsoppholdSenere = {
    senereOpphold: UtenlandsoppholdPeriode[];
};

export interface UtenlandsoppholdDTO {
    land: string;
    tidsperiode: TidsperiodeDTO;
}

export interface InformasjonOmUtenlandsoppholdDTO {
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligereOpphold: UtenlandsoppholdDTO[];
    senereOpphold: UtenlandsoppholdDTO[];
}
