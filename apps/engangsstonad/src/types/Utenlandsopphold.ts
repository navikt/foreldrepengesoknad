export type Utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

export type UtenlandsoppholdPeriode = {
    fom: string;
    tom: string;
    landkode: string;
};

export type UtenlandsoppholdSenere = {
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
};

export type UtenlandsoppholdTidligere = {
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
};
