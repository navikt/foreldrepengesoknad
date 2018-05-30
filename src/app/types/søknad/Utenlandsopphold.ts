export type UtenlandsoppholdPeriode = {
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
    tidligerePerioder: UtenlandsoppholdPeriode[];
    senerePerioder: UtenlandsoppholdPeriode[];
};

export type UtenlandsoppholdPartial = Partial<Utenlandsopphold>;
export type UtenlandsoppholdPeriodePartial = Partial<UtenlandsoppholdPeriode>;

export default Utenlandsopphold;
