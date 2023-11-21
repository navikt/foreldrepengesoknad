import { Søkerrolle } from './Søkerrolle';
import { Situasjon } from './Situasjon';

export type Søkersituasjon = {
    situasjon?: Situasjon;
};

export type SøkersituasjonFp = {
    situasjon: Situasjon;
    rolle: Søkerrolle;
};
