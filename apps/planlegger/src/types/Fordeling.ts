export type Fellesperiodefordeling = {
    antallUkerSøker1: number | undefined;
    antallUkerSøker2?: number | undefined;
    id: number;
};

export type Fordeling = {
    fellesperiodefordeling: number;
    fordeling?: Fellesperiodefordeling;
};

export const getAntallUkerFellesperiode = (fordeling: Fellesperiodefordeling): number | undefined => {
    if (fordeling.antallUkerSøker2 !== undefined) {
        return fordeling.antallUkerSøker2;
    }
    return fordeling.antallUkerSøker2;
};
