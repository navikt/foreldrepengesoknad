import { Kjønn, Sivilstand } from '@navikt/fp-common';
import Bankkonto from '@navikt/fp-common/src/common/types/Bankkonto';

export interface SøkerinfoDTOPerson {
    fnr: string;
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
    fødselsdato: string;
    kjønn: Kjønn;
    sivilstand?: Sivilstand;
}

export interface SøkerinfoDTOBarn extends SøkerinfoDTOPerson {
    annenForelder?: Omit<SøkerinfoDTOPerson, 'kjønn'>;
    dødsdato?: string;
}

export interface SøkerinfoDTOSøker extends SøkerinfoDTOPerson {
    bankkonto?: Bankkonto;
    barn?: SøkerinfoDTOBarn[];
}

export interface SøkerinfoDTOArbeidsforhold {
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}

export interface SøkerinfoDTO {
    søker: SøkerinfoDTOSøker;
    arbeidsforhold?: SøkerinfoDTOArbeidsforhold[];
}
