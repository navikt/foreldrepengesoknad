import { isISODateString } from '@navikt/ds-datepicker';
import { Arbeidsforhold } from '@navikt/fp-types';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { UnikArbeidsforhold } from 'app/types/Arbeidsforhold';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import { Stilling } from 'app/types/Tilrettelegging';
import dayjs from 'dayjs';
import uniqBy from 'lodash/uniqBy';
import { IntlShape } from 'react-intl';
import { hasValue } from './validationUtils';

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], termindato?: string): Arbeidsforhold[] => {
    if (termindato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.filter((arb) =>
        arb.tom ? dayjs(arb.tom).isSameOrAfter(dayjs(termindato).subtract(9, 'months'), 'day') : true,
    );
};

const getArbeidsgiverId = (arbeidsforhold: Arbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId || '';
};

export const getTotalStillingsprosentPåSkjæringstidspunktet = (
    stillinger: Stilling[],
    skjæringstidspunkt: string | undefined,
): number => {
    if (hasValue(skjæringstidspunkt) && isISODateString(skjæringstidspunkt)) {
        const perioderISkjæringstidspunktet = stillinger.filter((p) => {
            if (!p.tom) {
                return dayjs(skjæringstidspunkt).isSameOrAfter(dayjs(p.fom), 'd');
            } else {
                return dayjs(skjæringstidspunkt).isBetween(dayjs(p.fom), dayjs(p.tom), 'day', '[]');
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
            return totalProsent || 100;
        }
    }
    return 100;
};

export const getStillingerForLikeArbeidsforhold = (likeArbeidsforhold: Arbeidsforhold[]): Stilling[] => {
    const perioderMedStillingsprosent = likeArbeidsforhold.map((p) => {
        return {
            fom: p.fom,
            tom: p.tom,
            stillingsprosent: p.stillingsprosent,
        };
    });
    return perioderMedStillingsprosent;
};

export const getUnikeArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined,
    termindato: string,
): UnikArbeidsforhold[] => {
    if (arbeidsforhold !== undefined && arbeidsforhold.length > 0) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

        const unike = uniqBy(aktiveArbeidsforhold, getArbeidsgiverId).map((forhold) => ({
            id: forhold.arbeidsgiverId,
            fom: forhold.fom,
            tom: forhold.tom,
            arbeidsgiverNavn: forhold.arbeidsgiverNavn,
            arbeidsgiverId: forhold.arbeidsgiverId,
            arbeidsgiverIdType: forhold.arbeidsgiverIdType,
            stillinger: [{ fom: forhold.fom, tom: forhold.tom, stillingsprosent: forhold.stillingsprosent }],
        })) as UnikArbeidsforhold[];
        const unikeMedStillinger = unike.map((arbeid) => {
            const likeArbeidsforhold = aktiveArbeidsforhold.filter(
                (a) => getArbeidsgiverId(a) === arbeid.arbeidsgiverId,
            );
            if (likeArbeidsforhold && likeArbeidsforhold.length > 1) {
                const alleTom = likeArbeidsforhold.map((a) => a.tom);
                return {
                    ...arbeid,
                    fom: dateToISOString(dayjs.min(likeArbeidsforhold.map((a) => dayjs(a.fom)))!.toDate()),
                    tom: alleTom.includes(undefined)
                        ? undefined
                        : dateToISOString(dayjs.max(alleTom.map((tom) => dayjs(tom)))!.toDate()),
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
    arbeidsforhold: Arbeidsforhold[],
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

export const getTekstOmManglendeArbeidsforhold = (
    inntektsinformasjon: Inntektsinformasjon,
    intl: IntlShape,
): string => {
    const erFrilanser = inntektsinformasjon.harJobbetSomFrilans;
    const harNæring = inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende;
    const harJobbetIUtlandet = inntektsinformasjon.harHattArbeidIUtlandet;
    if (erFrilanser && !harNæring && !harJobbetIUtlandet) {
        return intl.formatMessage({ id: 'oppsummering.harIkkeNæringEllerJobbIUtlandet' });
    }
    if (!erFrilanser && harNæring && !harJobbetIUtlandet) {
        return intl.formatMessage({ id: 'oppsummering.erIkkeFrilanserEllerJobbIUtlandet' });
    }
    if (!erFrilanser && !harNæring && harJobbetIUtlandet) {
        return intl.formatMessage({ id: 'oppsummering.erIkkeFrilanserEllerNæringsdrivende' });
    }
    if (erFrilanser && harNæring && !harJobbetIUtlandet) {
        return intl.formatMessage({ id: 'oppsummering.harIkkeJobbIUtlandet' });
    }
    if (erFrilanser && !harNæring && harJobbetIUtlandet) {
        return intl.formatMessage({ id: 'oppsummering.harIkkeNæring' });
    }
    if (!erFrilanser && !harNæring && !harJobbetIUtlandet) {
        return intl.formatMessage({ id: 'oppsummering.erIkkeFrilanserHarIkkeNæringJobbetIkkeIUtlandet' });
    }
    return intl.formatMessage({ id: 'oppsummering.erIkkeFrilanser' });
};
