import { Arbeidsforhold } from './Arbeidsforhold';
import { Person, RegistrertBarn } from './Person';

export type Søkerinfo = {
    person: Person;
    arbeidsforhold: Arbeidsforhold[];
    registrerteBarn: RegistrertBarn[];
};
