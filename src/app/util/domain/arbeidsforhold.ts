import uniqBy from 'lodash/uniqBy';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { getAktiveArbeidsforhold } from 'app/api/utils/søkerinfoUtils';
import { Tidsperiode } from 'common/types';
import { dateIsBetween } from '../dates/dates';
import moment from 'moment';

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato?: Date): boolean => {
    return getAktiveArbeidsforhold(arbeidsforhold, fraDato).length > 0;
};

const getArbeidsforholdFromOrgnummer = (
    orgnummer: string,
    arbeidsforhold: Arbeidsforhold[]
): Arbeidsforhold | undefined => {
    return arbeidsforhold.find((forhold) => forhold.arbeidsgiverId === orgnummer);
};

export const getSamletStillingsprosentForArbeidsforhold = (
    orgnumre: string[],
    arbeidsforhold: Arbeidsforhold[]
): number => {
    return orgnumre
        .map((orgnr) => getArbeidsforholdFromOrgnummer(orgnr, arbeidsforhold))
        .filter((forhold) => forhold !== undefined)
        .reduce((stillingsprosent, forhold) => {
            return stillingsprosent + (forhold ? forhold.stillingsprosent : 0);
        }, 0);
};

const getArbeidsgiverId = (arbeidsforhold: Arbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId;
};

const containsDuplicates = (arbeidsforhold: Arbeidsforhold[]): boolean => {
    if (arbeidsforhold.length > 1) {
        const arbeidsgiverIds = arbeidsforhold.map((a) => a.arbeidsgiverId);
        const uniqueIds = new Set(arbeidsgiverIds);

        return uniqueIds.size !== arbeidsgiverIds.length;
    }

    return false;
};

export const getKunArbeidsforholdForValgtTidsperiode = (
    arbeidsforhold: Arbeidsforhold[],
    tidsperiode: Tidsperiode
): Arbeidsforhold[] => {
    if (tidsperiode.tom && tidsperiode.fom) {
        const kunArbeidsforholdForValgtTidsperiode = arbeidsforhold.filter((a) => {
            if (a.tom === undefined) {
                if (moment(tidsperiode.fom).isSameOrAfter(moment(a.fom))) {
                    return true;
                }

                return false;
            }

            if (dateIsBetween(tidsperiode.fom, a.fom, a.tom) || dateIsBetween(tidsperiode.tom, a.fom, a.tom)) {
                return true;
            }

            return false;
        });

        if (containsDuplicates(kunArbeidsforholdForValgtTidsperiode)) {
            return uniqBy(kunArbeidsforholdForValgtTidsperiode, getArbeidsgiverId);
        }

        return kunArbeidsforholdForValgtTidsperiode;
    }

    return arbeidsforhold;
};
