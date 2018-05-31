export interface UtenlandsoppholdPeriode {
    land: string;
    varighet: Varighet;
}

export interface Varighet {
    tom: string;
    fom: string;
}

interface Utenlandsopphold {
    jobbetINorgeSiste12Mnd: boolean;
    fødselINorge: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligerePerioder: UtenlandsoppholdPeriode[];
    senerePerioder: UtenlandsoppholdPeriode[];
}

export type UtenlandsoppholdPartial = Partial<Utenlandsopphold>;

export default Utenlandsopphold;
