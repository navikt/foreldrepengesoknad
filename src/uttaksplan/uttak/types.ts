import { SøkerRolle, Søkersituasjon } from 'app/types/søknad/Søknad';
import { Kjønn } from 'app/types/common';

export interface UttaksplanSøker {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    kjønn: Kjønn;
    erAleneOmOmsorg: boolean;
    rolle: SøkerRolle;
    situasjon: Søkersituasjon;
}
export interface UttaksplanAnnenForelder {
    fornavn: string;
    etternavn: string;
}

export interface UttaksplanRequiredProps {
    familiehendelsedato: Date;
    søker: UttaksplanSøker;
    annenForelder?: UttaksplanAnnenForelder;
    antallBarn: number;
    erBarnetFødt: boolean;
    erDeltPermisjon: boolean;
}
