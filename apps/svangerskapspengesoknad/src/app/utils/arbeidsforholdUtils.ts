import { intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søker } from 'app/types/Søker';
import dayjs from 'dayjs';
import uniqBy from 'lodash/uniqBy';
import { IntlShape } from 'react-intl';
import { hasValue } from './validationUtils';
import { InntektsinformasjonFormData } from 'app/steps/inntektsinformasjon/inntektsinformasjonFormConfig';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import { getArbeidsforholdTilretteleggingOptions } from 'app/steps/velg-arbeidsforhold/velgArbeidFormUtils';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

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

const getUnikStillingsprosent = (likeArbeidsforhold: Arbeidsforhold[]): number => {
    const stillingsprosenterIOverlappendePerioder = likeArbeidsforhold.map((p) => {
        const overlappendePerioder = likeArbeidsforhold.filter(
            (a) =>
                dayjs(p.fom).isBetween(dayjs(a.fom), dayjs(a.tom), 'day', '[]') ||
                dayjs(p.tom).isBetween(dayjs(a.fom), dayjs(a.tom), 'day', '[]'),
        );
        if (overlappendePerioder) {
            return overlappendePerioder.reduce((ar, { stillingsprosent }) => ar + stillingsprosent, 0);
        } else {
            return p.stillingsprosent;
        }
    });
    return Math.max(...stillingsprosenterIOverlappendePerioder);
};

export const getUnikeArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined,
    termindato: string,
): Arbeidsforhold[] => {
    if (arbeidsforhold !== undefined && arbeidsforhold.length > 0) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

        const unike = uniqBy(aktiveArbeidsforhold, getArbeidsgiverId).map((forhold) => ({
            ...forhold,
            fom: forhold.fom,
            tom: forhold.tom,
            guid: forhold.id,
            arbeidsgiverNavn: forhold.arbeidsgiverNavn,
        }));
        const unikeMedSummertStillingsprosentOgDatoer = unike.map((arbeid) => {
            const likeArbeidsforhold = aktiveArbeidsforhold.filter(
                (a) => getArbeidsgiverId(a) === arbeid.arbeidsgiverId,
            );
            if (likeArbeidsforhold && likeArbeidsforhold.length > 1) {
                const alleTom = likeArbeidsforhold.map((a) => a.tom);
                return {
                    ...arbeid,
                    stillingsprosent: getUnikStillingsprosent(likeArbeidsforhold),
                    fom: dateToISOString(dayjs.min(likeArbeidsforhold.map((a) => dayjs(a.fom)))!.toDate()),
                    tom: alleTom.includes(undefined)
                        ? undefined
                        : dateToISOString(dayjs.max(alleTom.map((tom) => dayjs(tom)))!.toDate()),
                };
            } else {
                return arbeid;
            }
        });
        return unikeMedSummertStillingsprosentOgDatoer;
    }

    return [];
};

export const søkerHarKunEtAktivtArbeid = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    erFrilanser: boolean,
    harEgenNæring: boolean,
) => {
    const aktiveArbeidsforhold = getUnikeArbeidsforhold(arbeidsforhold, termindato);
    return (
        (aktiveArbeidsforhold.length === 1 && !erFrilanser && !harEgenNæring) ||
        (aktiveArbeidsforhold.length === 0 && erFrilanser && !harEgenNæring) ||
        (aktiveArbeidsforhold.length === 0 && !erFrilanser && harEgenNæring)
    );
};

export const søkerHarKunEttARegArbeidsforholdForTilrettelegging = (
    formValues: Partial<InntektsinformasjonFormData>,
    aktiveArbeidsforhold: Arbeidsforhold[],
    termindato: string,
) => {
    return (
        hasValue(formValues.hattInntektSomFrilans) &&
        hasValue(formValues.hattInntektSomNæringsdrivende) &&
        søkerHarKunEtAktivtArbeid(
            termindato,
            aktiveArbeidsforhold,
            !!convertYesOrNoOrUndefinedToBoolean(formValues.hattInntektSomFrilans),
            !!convertYesOrNoOrUndefinedToBoolean(formValues.hattInntektSomNæringsdrivende),
        ) &&
        aktiveArbeidsforhold.length > 0
    );
};

export const getAutomatiskValgtTilretteleggingHvisKunEtArbeid = (
    formValues: Partial<InntektsinformasjonFormData>,
    aktiveArbeidsforhold: Arbeidsforhold[],
    termindato: string,
    tilrettelegging: Tilrettelegging[],
    intl: IntlShape,
) => {
    let automatiskValgtTilrettelegging = undefined;
    const kunEtAregArbeidsforholdForTilrettelegging = søkerHarKunEttARegArbeidsforholdForTilrettelegging(
        formValues,
        aktiveArbeidsforhold,
        termindato,
    );
    if (kunEtAregArbeidsforholdForTilrettelegging) {
        automatiskValgtTilrettelegging = getArbeidsforholdTilretteleggingOptions(
            aktiveArbeidsforhold,
            tilrettelegging,
            termindato,
            intl,
        )[0];
    }
    return automatiskValgtTilrettelegging;
};

export const getTekstOmManglendeArbeidsforhold = (søker: Søker, intl: IntlShape): string => {
    const erFrilanser = søker.harJobbetSomFrilans;
    const harNæring = søker.harJobbetSomSelvstendigNæringsdrivende;
    const harJobbetIUtlandet = søker.harHattAnnenInntekt;
    if (erFrilanser && !harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.harIkkeNæringEllerJobbIUtlandet');
    }
    if (!erFrilanser && harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.erIkkeFrilanserEllerJobbIUtlandet');
    }
    if (!erFrilanser && !harNæring && harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.erIkkeFrilanserEllerNæringsdrivende');
    }
    if (erFrilanser && harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.harIkkeJobbIUtlandet');
    }
    if (erFrilanser && !harNæring && harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.harIkkeNæring');
    }
    if (!erFrilanser && !harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.erIkkeFrilanserHarIkkeNæringJobbetIkkeIUtlandet');
    }
    return intlUtils(intl, 'oppsummering.erIkkeFrilanser');
};
