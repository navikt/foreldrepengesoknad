import Person, { RegistrertBarn } from './Person';
import Arbeidsforhold from './Arbeidsforhold';

export interface Søkerinfo {
    søkerinfo: {
        person: Person;
        arbeidsforhold: Arbeidsforhold[];
        registrerteBarn: RegistrertBarn[];
    };
}
