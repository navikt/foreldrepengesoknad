import { Situasjon } from './Situasjon';
import { Søkerrolle } from './Søkerrolle';

export type Søkersituasjon = {
    situasjon?: Situasjon;
};

export type SøkersituasjonFp = {
    situasjon: Situasjon;
    rolle: Søkerrolle;
};
