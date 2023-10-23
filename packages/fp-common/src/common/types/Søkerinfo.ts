import { Arbeidsforhold } from './Arbeidsforhold';
import Person, { RegistrertBarn } from './Person';

export interface Søkerinfo {
    person: Person;
    arbeidsforhold: Arbeidsforhold[];
    registrerteBarn: RegistrertBarn[];
}
