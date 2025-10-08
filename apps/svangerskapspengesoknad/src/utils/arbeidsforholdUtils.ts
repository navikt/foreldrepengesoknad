import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import minMax from 'dayjs/plugin/minMax';
import uniqBy from 'lodash/uniqBy';
import { UnikArbeidsforhold } from 'types/Arbeidsforhold';
import { Stilling } from 'types/Tilrettelegging';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(minMax);

export const getAktiveArbeidsforhold = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    termindato?: string,
): EksternArbeidsforholdDto_fpoversikt[] => {
    if (termindato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.filter((arb) =>
        arb.to ? dayjs(arb.to).isSameOrAfter(dayjs(termindato).subtract(9, 'months'), 'day') : true,
    );
};

const getArbeidsgiverId = (arbeidsforhold: EksternArbeidsforholdDto_fpoversikt): string => {
    return arbeidsforhold.arbeidsgiverId ?? '';
};

export const getTotalStillingsprosentPåSkjæringstidspunktet = (
    stillinger: Stilling[],
    skjæringstidspunkt: string | undefined,
): number => {
    if (skjæringstidspunkt) {
        const perioderISkjæringstidspunktet = stillinger.filter((p) => {
            if (p.tom) {
                return dayjs(skjæringstidspunkt).isBetween(dayjs(p.fom), dayjs(p.tom), 'day', '[]');
            } else {
                return dayjs(skjæringstidspunkt).isSameOrAfter(dayjs(p.fom), 'd');
            }
        });

        if (perioderISkjæringstidspunktet) {
            if (perioderISkjæringstidspunktet.some((p) => p.stillingsprosent === 0)) {
                return 100;
            }
            const totalProsent = perioderISkjæringstidspunktet.reduce(
                (ar, { stillingsprosent }) => ar + stillingsprosent,
                0,
            );
            return totalProsent ?? 100;
        }
    }
    return 100;
};

const getStillingerForLikeArbeidsforhold = (likeArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[]): Stilling[] => {
    const perioderMedStillingsprosent = likeArbeidsforhold.map((p) => {
        return {
            fom: p.from,
            tom: p.to,
            stillingsprosent: p.stillingsprosent,
        };
    });
    return perioderMedStillingsprosent;
};

export const getUnikeArbeidsforhold = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined,
    termindato: string,
): UnikArbeidsforhold[] => {
    if (arbeidsforhold !== undefined && arbeidsforhold.length > 0) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

        const unike = uniqBy(aktiveArbeidsforhold, getArbeidsgiverId).map((forhold) => ({
            id: forhold.arbeidsgiverId,
            fom: forhold.from,
            tom: forhold.to,
            arbeidsgiverNavn: forhold.arbeidsgiverNavn,
            arbeidsgiverId: forhold.arbeidsgiverId,
            arbeidsgiverIdType: forhold.arbeidsgiverIdType,
            stillinger: [{ fom: forhold.from, tom: forhold.to, stillingsprosent: forhold.stillingsprosent }],
        })) as UnikArbeidsforhold[];
        const unikeMedStillinger = unike.map((arbeid) => {
            const likeArbeidsforhold = aktiveArbeidsforhold.filter(
                (a) => getArbeidsgiverId(a) === arbeid.arbeidsgiverId,
            );
            if (likeArbeidsforhold && likeArbeidsforhold.length > 1) {
                const alleTom = likeArbeidsforhold.map((a) => a.to);
                return {
                    ...arbeid,
                    fom: dayjs.min(likeArbeidsforhold.map((a) => dayjs(a.from)))!.format(ISO_DATE_FORMAT),
                    tom: alleTom.includes(undefined)
                        ? undefined
                        : dayjs.max(alleTom.map((tom) => dayjs(tom)))!.format(ISO_DATE_FORMAT),
                    stillinger: getStillingerForLikeArbeidsforhold(likeArbeidsforhold),
                };
            } else {
                return arbeid;
            }
        });
        return unikeMedStillinger;
    }

    return [];
};

export const søkerHarKunEtAktivtArbeid = (
    termindato: string,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    erFrilanser: boolean,
    harEgenNæring: boolean,
) => {
    const aktiveUnikeArbeidsforhold = getUnikeArbeidsforhold(arbeidsforhold, termindato);
    return (
        (aktiveUnikeArbeidsforhold.length === 1 && !erFrilanser && !harEgenNæring) ||
        (aktiveUnikeArbeidsforhold.length === 0 && erFrilanser && !harEgenNæring) ||
        (aktiveUnikeArbeidsforhold.length === 0 && !erFrilanser && harEgenNæring)
    );
};
