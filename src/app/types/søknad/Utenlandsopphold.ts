export type Periode = {
    land: string;
    varighet: Varighet;
};

export type Varighet = {
    tom: string;
    fom: string;
};

type Utenlandsopphold = {
    jobbetINorgeSiste12Mnd: boolean;
    fødselINorge: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligerePerioder: Periode[];
    senerePerioder: Periode[];
};

export type UtenlandsoppholdPartial = Partial<Utenlandsopphold>;

export default Utenlandsopphold;
