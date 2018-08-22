import moment from 'moment';
import Person, {
    RegistrertBarn,
    RegistrertAnnenForelder
} from '../../types/Person';
import { SøkerinfoDTO } from '../types/sokerinfoDTO';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { erMyndig } from '../../util/domain/personUtil';

const getPerson = (søkerinfo: SøkerinfoDTO): Person => {
    const { barn, ...person } = søkerinfo.søker;
    return {
        ...person,
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

const getRegistrertAnnenForelder = (
    søkerinfo: SøkerinfoDTO
): RegistrertAnnenForelder | undefined => {
    if (!søkerinfo.søker.barn || søkerinfo.søker.barn.length === 0) {
        return undefined;
    }
    const foreldre: RegistrertAnnenForelder[] = [];
    søkerinfo.søker.barn.forEach((barn) => {
        const { annenForelder } = barn;
        if (
            annenForelder &&
            !foreldre.find((f) => f.fnr === annenForelder.fnr)
        ) {
            foreldre.push(annenForelder);
        }
    });
    return foreldre.length === 1 ? foreldre[0] : undefined;
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

const SøkerinfotUtils = {
    getPerson,
    getArbeidsforhold,
    getRegistrertAnnenForelder,
    getRegistrerteBarn
};

export default SøkerinfotUtils;
