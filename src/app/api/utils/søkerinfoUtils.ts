import moment from 'moment';
import Person, { RegistrertBarn } from '../../types/Person';
import { SøkerinfoDTO } from '../types/sokerinfoDTO';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { erMyndig } from '../../util/domain/personUtil';
import { Søkerinfo } from '../../types/søkerinfo';

const getPerson = (søkerinfo: SøkerinfoDTO): Person => {
    const { barn, ...person } = søkerinfo.søker;
    return {
        ...person,
        fødselsdato: moment(person.fødselsdato).toDate(),
        ikkeNordiskEøsLand: person.ikkeNordiskEøsLand || false,
        erMyndig: erMyndig(person.fødselsdato)
    };
};

const getRegistrerteBarn = (
    søkerinfo: SøkerinfoDTO
): RegistrertBarn[] | undefined => {
    const { barn } = søkerinfo.søker;
    if (!barn || barn.length === 0) {
        return undefined;
    }
    return barn.map((b: any): RegistrertBarn => ({
        ...b,
        fødselsdato: moment(b.fødselsdato).toDate()
    }));
};

const getArbeidsforhold = (
    søkerinfo: SøkerinfoDTO
): Arbeidsforhold[] | undefined => {
    const { arbeidsforhold } = søkerinfo;
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return undefined;
    }
    return arbeidsforhold.map((a) => {
        const forhold: Arbeidsforhold = {
            ...a,
            fom: moment(a.fom).toDate(),
            tom: a.tom ? moment(a.tom).toDate() : undefined
        };
        return forhold;
    });
};

export const getSøkerinfoFromDTO = (søkerinfo: SøkerinfoDTO): Søkerinfo => ({
    person: getPerson(søkerinfo),
    registrerteBarn: getRegistrerteBarn(søkerinfo),
    arbeidsforhold: getArbeidsforhold(søkerinfo)
});
