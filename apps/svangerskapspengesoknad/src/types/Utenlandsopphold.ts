export interface UtenlandsoppholdDTO {
    land: string;
    tidsperiode: {
        fom: string;
        tom: string;
    };
}

export interface InformasjonOmUtenlandsoppholdDTO {
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligereOpphold: UtenlandsoppholdDTO[];
    senereOpphold: UtenlandsoppholdDTO[];
}
