import { Kjønn } from '../../types/common';

export interface PersonDTO {
    fnr: string;
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
    fødselsdato: string;
    kjønn: Kjønn;
}

export type RegistrertAnnenForelder = PersonDTO;

export interface BarnDTO extends PersonDTO {
    annenForelder?: RegistrertAnnenForelder;
}

export interface SøkerDTO extends PersonDTO {
    land: string;
    ikkeNordiskEøsLand?: boolean;
    barn?: BarnDTO[];
}

export interface ArbeidsforholdDTO {
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}

export interface SøkerinfoDTO {
    søker: SøkerDTO;
    arbeidsforhold?: ArbeidsforholdDTO[];
}
