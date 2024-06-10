import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong } from '@navikt/ds-react';

import { Tidsperiode, bemUtils, formatDate } from '@navikt/fp-common';
import { InnsendingsType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import {
    isAleneOmOmsorgVedlegg,
    isBarnInnleggelseVedlegg,
    isEtterlønnVedlegg,
    isFarForSykVedlegg,
    isFarInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isMilitærVedlegg,
    isMorForSykVedlegg,
    isMorInnleggelseVedlegg,
    isMorJobberOgStudererVedlegg,
    isMorJobberVedlegg,
    isMorStudererVedlegg,
    isOmsorgsovertakelseVedlegg,
    isTerminbekreftelseVedlegg,
} from 'app/steps/manglende-vedlegg/util';

const getTidsperiodeString = (tidsperioder: Tidsperiode[]) => {
    let periodeString: string | undefined = undefined;

    tidsperioder.forEach((tidsperiode, index) => {
        if (periodeString) {
            if (index === tidsperioder.length - 1) {
                periodeString = periodeString.concat(
                    ` og ${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom)}`,
                );
            } else {
                periodeString = periodeString.concat(
                    `, ${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom)}`,
                );
            }
        } else {
            periodeString = `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom)}`;
        }

        return periodeString;
    });

    return periodeString;
};

export const getDokumentasjonStringAndreInntekter = (attachments: Attachment[]) => {
    const singleAttachment = attachments[0];
    const bem = bemUtils('dokumentasjon');

    if (isEtterlønnVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.etterlønn.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage id="oppsummering.dokumentasjon.etterlønn" />
            </BodyLong>
        );
    }

    if (isMilitærVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.militær.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage id="oppsummering.dokumentasjon.militær" />
            </BodyLong>
        );
    }

    return 'Dokumentasjon av andre inntekter';
};

export const getDokumentasjonStringBarn = (attachments: Attachment[]) => {
    const singleAttachment = attachments[0];
    const bem = bemUtils('dokumentasjon');

    if (isOmsorgsovertakelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.overtakelseAvOmsorg.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage id="oppsummering.dokumentasjon.overtakelseAvOmsorg" />
            </BodyLong>
        );
    }

    if (isAleneOmOmsorgVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.aleneOmOmsorg.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage id="oppsummering.dokumentasjon.aleneOmOmsorg" />
            </BodyLong>
        );
    }

    if (isTerminbekreftelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.terminbekreftelse.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage id="oppsummering.dokumentasjon.terminbekreftelse" />
            </BodyLong>
        );
    }

    return '';
};

export const getDokumentasjonStringPerioder = (attachments: Attachment[]) => {
    const tidsperioder = attachments[0].dokumenterer!.perioder!;
    const singleAttachment = attachments[0];
    const bem = bemUtils('dokumentasjon');

    if (isIntroduksjonsprogramVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.introduksjonsprogram.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.introduksjonsprogram"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isKvalifiseringsprogramVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.kvalifiseringsprogram.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.kvalifiseringsprogram"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isMorInnleggelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morInnlagt.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morInnlagt"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isBarnInnleggelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.barnInnlagt.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.barnInnlagt"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isFarInnleggelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.farInnlagt.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.farInnlagt"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isMorForSykVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morForSyk.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morForSyk"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isFarForSykVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.farForSyk.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.farForSyk"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isMorJobberVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morJobber.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morJobber"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isMorStudererVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morStuderer.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morStuderer"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    if (isMorJobberOgStudererVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return (
                <>
                    <ExclamationmarkTriangleIcon className={bem.element('ikon')} fontSize="1.5rem" />
                    <BodyLong weight="semibold">
                        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morJobberOgStuderer.sendSenere" />
                    </BodyLong>
                </>
            );
        }

        return (
            <BodyLong>
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morJobberOgStuderer"
                    values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
                />
            </BodyLong>
        );
    }

    return '';
};
