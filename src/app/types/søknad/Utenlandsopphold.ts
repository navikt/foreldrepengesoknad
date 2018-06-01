export interface UtenlandsoppholdPeriode {
    land: string;
    varighet: UtenlandsoppholdPeriodeVarighet;
}

interface UtenlandsoppholdPeriodeSkjemaData {
    land: string;
    varighet: UtenlandsoppholdPeriodeVarighetPartial;
}

export interface UtenlandsoppholdPeriodeVarighet {
    tom: Date;
    fom: Date;
}

type UtenlandsoppholdPeriodeVarighetPartial = Partial<
    UtenlandsoppholdPeriodeVarighet
>;

interface Utenlandsopphold {
    jobbetINorgeSiste12Mnd: boolean;
    fødselINorge: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligerePerioder: UtenlandsoppholdPeriode[];
    senerePerioder: UtenlandsoppholdPeriode[];
}

export type UtenlandsoppholdPeriodeType = 'neste12mnd' | 'siste12mnd';

export type UtenlandsoppholdPartial = Partial<Utenlandsopphold>;
export type UtenlandsoppholdPeriodePartial = Partial<
    UtenlandsoppholdPeriodeSkjemaData
>;

export default Utenlandsopphold;
