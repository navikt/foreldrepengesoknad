import moment from 'moment';
import Person, { RegistrertBarn } from '../../types/Person';
import { SøkerinfoDTO, SøkerinfoDTOBarn, SøkerinfoDTOArbeidsforhold } from '../types/sokerinfoDTO';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { erMyndig } from '../../util/domain/personUtil';
import { Søkerinfo } from '../../types/søkerinfo';
import uniqBy from 'lodash/uniqBy';

const getPerson = (søkerinfo: SøkerinfoDTO): Person => {
    const { barn, ...person } = søkerinfo.søker;
    return {
        ...person,
        fødselsdato: moment(person.fødselsdato).toDate(),
        ikkeNordiskEøsLand: person.ikkeNordiskEøsLand || false,
        erMyndig: erMyndig(person.fødselsdato)
    };
};

const getRegistrerteBarn = (søkerinfo: SøkerinfoDTO): RegistrertBarn[] => {
    const { barn } = søkerinfo.søker;
    if (barn === undefined || barn.length === 0) {
        return [];
    }
    return barn.map((dtoBarn: SøkerinfoDTOBarn): RegistrertBarn => {
        const { fødselsdato, annenForelder, ...rest } = dtoBarn;
        return {
            ...rest,
            fødselsdato: moment.utc(fødselsdato).toDate(),
            annenForelder: annenForelder
                ? {
                      ...annenForelder,
                      fødselsdato: moment.utc(annenForelder.fødselsdato).toDate()
                  }
                : undefined
        };
    });
};

const getArbeidsgiverId = (arbeidsforhold: SøkerinfoDTOArbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId;
};

const getArbeidsforhold = (søkerinfo: SøkerinfoDTO): Arbeidsforhold[] => {
    const { arbeidsforhold } = søkerinfo;
    if (arbeidsforhold === undefined || arbeidsforhold.length === 0) {
        return [];
    }
    return uniqBy(arbeidsforhold, getArbeidsgiverId).map((a: SøkerinfoDTOArbeidsforhold) => {
        const forhold: Arbeidsforhold = {
            ...a,
            fom: moment(a.fom).toDate(),
            tom: a.tom ? moment(a.tom).toDate() : undefined
        };
        return forhold;
    });
};

export const getAktiveArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[],
    familiehendelsedato: Date | undefined
): Arbeidsforhold[] => {
    if (familiehendelsedato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.reduce((aktiveArbeidsforhold: Arbeidsforhold[], a: Arbeidsforhold) => {
        if (a.tom === undefined) {
            aktiveArbeidsforhold.push(a);

            return aktiveArbeidsforhold;
        } else {
            if (moment(a.tom).isSameOrAfter(moment(familiehendelsedato))) {
                aktiveArbeidsforhold.push(a);
            }

            return aktiveArbeidsforhold;
        }
    }, []);
};

export const getSøkerinfoFromDTO = (søkerinfo: SøkerinfoDTO): Søkerinfo => {
    return {
        person: getPerson(søkerinfo),
        registrerteBarn: getRegistrerteBarn(søkerinfo),
        arbeidsforhold: getArbeidsforhold(søkerinfo)
    };
};
