import { Kjønn } from '../../types/common';

export type Fødselsnummer = string;
export type Landkode = string;
export type Datostreng = string;
export type Organisasjonsnummer = string;

export interface PersonDTO {
    fnr: Fødselsnummer;
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
    fødselsdato: Datostreng;
    kjønn: Kjønn;
}

export type RegistrertAnnenForelder = PersonDTO;

export interface BarnDTO extends PersonDTO {
    annenForelder?: RegistrertAnnenForelder;
}

export interface SøkerDTO extends PersonDTO {
    land: Landkode;
    ikkeNordiskEøsLand?: boolean;
    barn?: BarnDTO[];
}

export interface ArbeidsforholdDTO {
    arbeidsgiverId: Organisasjonsnummer;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: Datostreng;
    tom?: Datostreng;
}

export interface SøkerinfoDTO {
    søker: SøkerDTO;
    arbeidsforhold?: ArbeidsforholdDTO[];
}
