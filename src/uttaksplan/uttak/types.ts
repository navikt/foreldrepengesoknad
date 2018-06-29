import { SøkerRolle, Søkersituasjon } from 'app/types/søknad/Søknad';
import { Kjønn } from 'app/types/common';

export interface SøkerGrunnlag {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    kjønn: Kjønn;
    erAleneOmOmsorg: boolean;
    rolle: SøkerRolle;
    situasjon: Søkersituasjon;
}
export interface AnnenForelderGrunnlag {
    fornavn: string;
    etternavn: string;
}

export interface UttaksplanRequiredProps {
    termindato: Date;
    søker: SøkerGrunnlag;
    annenForelder?: AnnenForelderGrunnlag;
    antallBarn: number;
    erBarnetFødt: boolean;
    erDeltPermisjon: boolean;
}
