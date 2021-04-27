import SøkersituasjonState from './SøkersituasjonState';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: SøkersituasjonState;
}
