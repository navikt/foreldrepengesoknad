export type Utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

export type UtenlandsoppholdNeste = {
    utenlandsoppholdNeste12Mnd: {
        fom: string;
        tom: string;
        landkode: string;
    }[];
};

export type UtenlandsoppholdSiste = {
    utenlandsoppholdSiste12Mnd: {
        fom: string;
        tom: string;
        landkode: string;
    }[];
};
