import moment from 'moment';
import Person, { RegistrertBarn } from '../../types/Person';
import { SøkerinfoDTO, SøkerinfoDTOBarn, SøkerinfoDTOArbeidsforhold } from '../types/sokerinfoDTO';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { erMyndig } from '../../util/domain/personUtil';
import { Søkerinfo } from '../../types/søkerinfo';

const getPerson = (søkerinfo: SøkerinfoDTO): Person => {
    const { barn, ...person } = søkerinfo.søker;
    return {
        ...person,
        fødselsdato: moment(person.fødselsdato).toDate(),
        ikkeNordiskEøsLand: person.ikkeNordiskEøsLand || false,
        erMyndig: erMyndig(person.fødselsdato),
    };
};

const getRegistrerteBarn = (søkerinfo: SøkerinfoDTO): RegistrertBarn[] => {
    const { barn } = søkerinfo.søker;
    if (barn === undefined || barn.length === 0) {
        return [];
    }
    return barn.map(
        (dtoBarn: SøkerinfoDTOBarn): RegistrertBarn => {
            const { fødselsdato, annenForelder, ...rest } = dtoBarn;
            return {
                ...rest,
                fødselsdato: moment.utc(fødselsdato).toDate(),
                annenForelder: annenForelder
                    ? {
                          ...annenForelder,
                          fødselsdato: moment.utc(annenForelder.fødselsdato).toDate(),
                      }
                    : undefined,
            };
        }
    );
};

export const getArbeidsforhold = (arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined): Arbeidsforhold[] => {
    if (arbeidsforhold === undefined || arbeidsforhold.length === 0) {
        return [];
    }

    return [...arbeidsforhold].map((a: SøkerinfoDTOArbeidsforhold) => {
        const forhold: Arbeidsforhold = {
            ...a,
            fom: moment(a.fom).toDate(),
            tom: a.tom ? moment(a.tom).toDate() : undefined,
        };
        return forhold;
    });
};

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato?: Date): Arbeidsforhold[] => {
    return arbeidsforhold.filter(
        (a) =>
            a.tom === undefined ||
            a.tom === null ||
            (fraDato !== undefined && moment(fraDato).isSameOrBefore(a.tom, 'days'))
    );
};

export const getSøkerinfoFromDTO = (søkerinfo: SøkerinfoDTO): Søkerinfo => {
    return {
        person: getPerson(søkerinfo),
        registrerteBarn: getRegistrerteBarn(søkerinfo),
        arbeidsforhold: getArbeidsforhold(søkerinfo.arbeidsforhold),
    };
};
