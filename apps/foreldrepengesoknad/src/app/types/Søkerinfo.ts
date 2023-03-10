import Person, { RegistrertBarn } from './Person';
import Arbeidsforhold from './Arbeidsforhold';

export interface Søkerinfo {
    person: Person;
    arbeidsforhold: Arbeidsforhold[];
    registrerteBarn: RegistrertBarn[];
}
