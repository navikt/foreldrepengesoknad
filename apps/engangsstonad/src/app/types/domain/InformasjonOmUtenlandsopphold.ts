export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

export interface Tidsperiode {
    tom: Date;
    fom: Date;
}

interface InformasjonOmUtenlandsopphold {
    jobbetINorgeSiste12Mnd?: boolean;
    iNorgeSiste12Mnd?: boolean;
    iNorgeNeste12Mnd?: boolean;
    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export default InformasjonOmUtenlandsopphold;
