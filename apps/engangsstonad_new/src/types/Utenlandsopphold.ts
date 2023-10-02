export type Utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

export type UtenlandsoppholdPeriode = {
    fom: string;
    tom: string;
    landkode: string;
};

export type UtenlandsoppholdNeste = {
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
};

export type UtenlandsoppholdSiste = {
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
};
