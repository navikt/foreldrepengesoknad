import { TidsperiodeDate } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import dayjs from 'dayjs';
import uniqBy from 'lodash/uniqBy';
import { dateIsBetween } from './dateUtils';

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

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato?: Date): Arbeidsforhold[] => {
    return arbeidsforhold.filter(
        (a) =>
            a.tom === undefined ||
            a.tom === null ||
            (fraDato !== undefined && dayjs(fraDato).isSameOrBefore(a.tom, 'days'))
    );
};

const containsDuplicates = (arbeidsforhold: Arbeidsforhold[]): boolean => {
    if (arbeidsforhold.length > 1) {
        const arbeidsgiverIds = arbeidsforhold.map((a) => a.arbeidsgiverId);
        const uniqueIds = new Set(arbeidsgiverIds);

        return uniqueIds.size !== arbeidsgiverIds.length;
    }

    return false;
};

const getArbeidsgiverId = (arbeidsforhold: Arbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId;
};

export const getKunArbeidsforholdForValgtTidsperiode = (
    arbeidsforhold: Arbeidsforhold[],
    tidsperiode: TidsperiodeDate
): Arbeidsforhold[] => {
    if (tidsperiode.tom && tidsperiode.fom) {
        const kunArbeidsforholdForValgtTidsperiode = arbeidsforhold.filter((a) => {
            if (a.tom === undefined) {
                if (dayjs(tidsperiode.fom).isSameOrAfter(dayjs(a.fom))) {
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
