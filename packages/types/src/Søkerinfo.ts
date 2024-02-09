import { Arbeidsforhold } from './Arbeidsforhold';
import { Person } from './Person';

export type Søkerinfo = {
    person: Person;
    arbeidsforhold: Arbeidsforhold[];
};
