export interface UtenlandsoppholdPeriode {
    land: string;
    varighet: Varighet;
}

type UtenlandsoppholdPeriodeSkjemaData = {
    land: string;
    varighet: VarighetPartial;
};

export interface Varighet {
    tom: string;
    fom: string;
}

type VarighetPartial = Partial<Varighet>;

interface Utenlandsopphold {
    jobbetINorgeSiste12Mnd: boolean;
    fødselINorge: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligerePerioder: UtenlandsoppholdPeriode[];
    senerePerioder: UtenlandsoppholdPeriode[];
}

export type PeriodeType = 'neste12mnd' | 'siste12mnd';

export type UtenlandsoppholdPartial = Partial<Utenlandsopphold>;
export type UtenlandsoppholdPeriodePartial = Partial<
    UtenlandsoppholdPeriodeSkjemaData
>;

export default Utenlandsopphold;
