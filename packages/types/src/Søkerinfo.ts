import { Arbeidsforhold } from './Arbeidsforhold';
import { Søker } from './Søker';

export type Søkerinfo = {
    søker: Søker;
    arbeidsforhold: Arbeidsforhold[];
};
