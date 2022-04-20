import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';

export const søknadGjelderFødsel = (søknad: Søknad): boolean =>
    søknad !== undefined && søknad.situasjon === Søkersituasjon.FØDSEL;

export const søknadGjelderAdopsjon = (søknad: Søknad): boolean =>
    søknad !== undefined && søknad.situasjon === Søkersituasjon.ADOPSJON;

export const søknadGjelderForeldreansvar = (søknad: Søknad): boolean =>
    søknad !== undefined && søknad.situasjon === Søkersituasjon.FORELDREANSVAR;
