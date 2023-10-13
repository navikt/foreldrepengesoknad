export type Utenlandsopphold = {
    harKunBoddINorge: boolean;
};

export type Periode = {
    harFlyttetUtForMerEnn12MånderSiden: boolean;
    skalBoIUtlandetMerEnEttÅrFremover: boolean;
    fom: string;
    tom: string;
    landkode: string;
};

export type UtenlandsoppholdPerioder = {
    perioder: Periode[];
};
