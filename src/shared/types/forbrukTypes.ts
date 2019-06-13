export interface Forbruk {
    dagerTotalt: number;
    skalHaForeldrepengerFørFødsel: boolean;
    ekstradagerFørTermin: number;
    dagerForeldrepengerFørFødsel: number;
    dagerEtterTermin: number;
    dagerGjenstående: number;
    mor: MorsForbruk;
    farMedmor?: ForelderForbruk;
}

export interface ForelderForbruk {
    dagerForMye: number;
    dagerForLite: number;
    dagerTotalt: number;
    dagerErOk: boolean;
    dagerAvFellesperiode: number;
    dagerMedFerie: number;
}

export interface MorsForbruk extends ForelderForbruk {
    ekstradagerFørTermin: number;
    dagerForeldrepengerFørFødsel: number;
    dagerEtterTermin: number;
    dagerUtenForeldrepengerFørFødsel: number;
}
