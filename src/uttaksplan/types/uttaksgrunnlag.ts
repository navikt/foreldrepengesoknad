import {
    StønadskontoType,
    StønadskontoUttak
} from 'uttaksplan/types/periodetyper';
import { Permisjonsregler } from 'uttaksplan/types';
import { SøkerRolle, Søkersituasjon } from 'app/types/s\u00F8knad/S\u00F8knad';
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

export interface Uttaksgrunnlag {
    permisjonsregler: Permisjonsregler;
    søker: SøkerGrunnlag;
    annenForelder?: AnnenForelderGrunnlag;
    antallBarn: number;
    tilgjengeligeStønadskontoer: StønadskontoType[];
    tilgjengeligUttak: StønadskontoUttak[];
}
