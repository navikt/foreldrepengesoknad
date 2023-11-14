export enum SøkersituasjonEnum {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
}

export type Søkersituasjon = {
    situasjon?: SøkersituasjonEnum;
};
