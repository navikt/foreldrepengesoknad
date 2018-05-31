export type UtenlandsoppholdPeriode = {
    land: string;
    varighet: Varighet;
};

type UtenlandsoppholdPeriodeSkjemaData = {
    land: string;
    varighet: VarighetPartial;
};

export type Varighet = {
    tom: string;
    fom: string;
};

type VarighetPartial = Partial<Varighet>;

type Utenlandsopphold = {
    jobbetINorgeSiste12Mnd: boolean;
    fødselINorge: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligerePerioder: UtenlandsoppholdPeriode[];
    senerePerioder: UtenlandsoppholdPeriode[];
};

export type UtenlandsoppholdPartial = Partial<Utenlandsopphold>;
export type UtenlandsoppholdPeriodePartial = Partial<
    UtenlandsoppholdPeriodeSkjemaData
>;

export default Utenlandsopphold;
