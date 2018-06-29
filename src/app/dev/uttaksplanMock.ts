import { SøkerRolle, Søkersituasjon } from '../types/søknad/Søknad';
import { Kjønn } from '../types/common';
import { AnnenForelderGrunnlag, SøkerGrunnlag } from 'uttaksplan/uttak/types';

export const mockUttaksplanSøker: SøkerGrunnlag = {
    fornavn: 'Amalie',
    mellomnavn: '',
    etternavn: 'Skraam',
    kjønn: Kjønn.KVINNE,
    erAleneOmOmsorg: true,
    rolle: SøkerRolle.MOR,
    situasjon: Søkersituasjon.FØDSEL
};
export const mockUttasksplanAnnenForelder: AnnenForelderGrunnlag = {
    fornavn: 'Henrik',
    etternavn: 'Ibsen'
};
