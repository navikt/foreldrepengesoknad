import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { AnnenInntekt, AnnenInntektType } from '../types/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { IntlShape } from 'react-intl';
import { SøkerinfoDTOArbeidsforhold } from 'app/types/SøkerinfoArbeidsforholdDTO';
import { guid } from 'nav-frontend-js-utils';
import uniqBy from 'lodash/uniqBy';
import normalizeName from './normalizeName';
import moment from 'moment';

export const getArbeidsforholdNavnFromId = (
    id: string | undefined,
    arbeidsforhold: Arbeidsforhold[]
): string | undefined => {
    const arbForhold = arbeidsforhold.find((forhold) => forhold.guid === id);

    return arbForhold !== undefined ? arbForhold.arbeidsgiverNavn : undefined;
};

export const getAnnenInntektElementTitle = (annenInntekt: AnnenInntekt, intl: IntlShape): string => {
    return annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET
        ? `${annenInntekt.arbeidsgiverNavn}`
        : getMessage(intl, 'inntektstype.militær_eller_siviltjeneste');
};

const getArbeidsgiverId = (arbeidsforhold: Arbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId !== undefined ? arbeidsforhold.arbeidsgiverId : '';
};

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], termindato?: Date): Arbeidsforhold[] => {
    if (termindato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.filter((arb) =>
        arb.tom ? moment(arb.tom).isSameOrAfter(moment(termindato).subtract(9, 'months')) : true
    );
};

export const mapArbeidsforhold = (arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined): Arbeidsforhold[] => {
    if (arbeidsforhold !== undefined && arbeidsforhold.length > 0) {
        return arbeidsforhold.map(
            (forhold: SøkerinfoDTOArbeidsforhold): Arbeidsforhold => ({
                ...forhold,
                fom: new Date(forhold.fom),
                tom: forhold.tom !== undefined ? new Date(forhold.tom) : undefined,
                guid: guid(),
                arbeidsgiverNavn:
                    forhold.arbeidsgiverNavn !== undefined ? normalizeName(forhold.arbeidsgiverNavn) : undefined,
            })
        );
    }

    return [];
};

export const getUnikeArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined,
    termindato: string
): Arbeidsforhold[] => {
    if (arbeidsforhold !== undefined && arbeidsforhold.length > 0) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, new Date(termindato));

        return uniqBy(aktiveArbeidsforhold, getArbeidsgiverId).map((forhold) => ({
            ...forhold,
            fom: new Date(forhold.fom),
            tom: forhold.tom !== undefined ? new Date(forhold.tom) : undefined,
            guid: forhold.guid,
            arbeidsgiverNavn:
                forhold.arbeidsgiverNavn !== undefined ? normalizeName(forhold.arbeidsgiverNavn) : undefined,
        }));
    }

    return [];
};
