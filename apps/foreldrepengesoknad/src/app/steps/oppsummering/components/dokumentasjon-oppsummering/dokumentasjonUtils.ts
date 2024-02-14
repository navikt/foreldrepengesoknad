import { Tidsperiode, formatDate, intlUtils } from '@navikt/fp-common';
import { Attachment, InnsendingsType } from '@navikt/fp-types';
import {
    isAleneOmOmsorgVedlegg,
    isArbeidUtdanningEllerSykdomVedlegg,
    isEtterlønnVedlegg,
    isMorInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isMilitærVedlegg,
    isOmsorgsovertakelseVedlegg,
    isTerminbekreftelseVedlegg,
} from 'app/steps/manglende-vedlegg/util';
import { IntlShape } from 'react-intl';

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

export const getDokumentasjonStringAndreInntekter = (attachments: Attachment[], _intl: IntlShape) => {
    const singleAttachment = attachments[0];

    if (isEtterlønnVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på etterlønn må sendes inn senere';
        }

        return 'Dokumentasjon av etterlønn';
    }

    if (isMilitærVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på militær må sendes inn senere';
        }

        return 'Dokumentasjon av militær';
    }

    return 'Dokumentasjon av andre inntekter';
};

export const getDokumentasjonStringBarn = (attachments: Attachment[], _intl: IntlShape) => {
    const singleAttachment = attachments[0];

    if (isOmsorgsovertakelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på overtakelse av omsorg må sendes inn senere';
        }

        return 'Dokumentasjon av overtakelse av omsorg';
    }

    if (isAleneOmOmsorgVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at du er alene om omsorgen må sendes inn senere';
        }

        return 'Dokumentasjon av alene om omsorg';
    }

    if (isTerminbekreftelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på terminbekreftelse må sendes inn senere';
        }

        return 'Dokumentasjon av terminbekreftelse';
    }

    return '';
};

export const getDokumentasjonStringPerioder = (attachments: Attachment[], intl: IntlShape) => {
    const tidsperioder = attachments[0].dokumenterer!.perioder!;
    const singleAttachment = attachments[0];

    if (isArbeidUtdanningEllerSykdomVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.arbeidUtdanningSykdom.sendSenere', {
                perioder: tidsperioder.length,
                tidsperiode: getTidsperiodeString(tidsperioder),
            });
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.arbeidUtdanningSykdom', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isIntroduksjonsprogramVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på introduksjonsprogram må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.introduksjonsprogram', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isKvalifiseringsprogramVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på kvalifiseringsprogram må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.kvalifiseringsprogram', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isMorInnleggelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at mor er innlagt må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.fedrekvoteMorForSyk', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    return '';
};
