export enum SøkersituasjonEnum {
    MOR_OG_FAR = 'morOgFar',
    MOR_OG_MEDMOR = 'morOgMedmor',
    FAR_OG_FAR = 'farOgFar',
    MOR = 'mor',
    FAR = 'far',
    ALENE = 'alene',
    FLERE = 'flere',
}

export type Søkersituasjon = {
    situasjon?: SøkersituasjonEnum;
};
