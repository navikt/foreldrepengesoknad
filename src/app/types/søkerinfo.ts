import Person, { RegistrertAnnenForelder, RegistrertBarn } from './Person';
import Arbeidsforhold from './Arbeidsforhold';

export interface Søkerinfo {
    person: Person;
    arbeidsforhold?: Arbeidsforhold[];
    registrertAnnenForelder?: RegistrertAnnenForelder;
    registrerteBarn?: RegistrertBarn[];
}
