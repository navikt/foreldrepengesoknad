import { SøkerRolle, Søkersituasjon } from '../types/søknad/Søknad';
import { Kjønn } from '../types/common';
import {
    UttaksplanAnnenForelder,
    UttaksplanSøker
} from 'uttaksplan/uttak/types';

export const mockUttaksplanSøker: UttaksplanSøker = {
    fornavn: 'Amalie',
    mellomnavn: '',
    etternavn: 'Skraam',
    kjønn: Kjønn.KVINNE,
    erAleneOmOmsorg: true,
    rolle: SøkerRolle.MOR,
    situasjon: Søkersituasjon.FØDSEL
};
export const mockUttasksplanAnnenForelder: UttaksplanAnnenForelder = {
    fornavn: 'Henrik',
    etternavn: 'Ibsen'
};
