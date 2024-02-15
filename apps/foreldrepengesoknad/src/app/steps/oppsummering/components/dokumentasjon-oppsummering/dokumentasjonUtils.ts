import { Tidsperiode, formatDate, intlUtils } from '@navikt/fp-common';
import { Attachment, InnsendingsType } from '@navikt/fp-types';
import {
    isAleneOmOmsorgVedlegg,
    isEtterlønnVedlegg,
    isMorInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isMilitærVedlegg,
    isOmsorgsovertakelseVedlegg,
    isTerminbekreftelseVedlegg,
    isBarnInnleggelseVedlegg,
    isFarInnleggelseVedlegg,
    isMorForSykVedlegg,
    isFarForSykVedlegg,
    isMorJobberVedlegg,
    isMorStudererVedlegg,
    isMorJobberOgStudererVedlegg,
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

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.morInnlagt', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isBarnInnleggelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at barnet er innlagt må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.barnInnlagt', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isFarInnleggelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at far er innlagt må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.farInnlagt', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isMorForSykVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at mor er for syk må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.morForSyk', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isFarForSykVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at far er for syk må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.farForSyk', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isMorJobberVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at mor jobber må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.morJobber', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isMorStudererVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at mor studerer må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.morStuderer', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isMorJobberOgStudererVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Dokumentasjon på at mor jobber og er i studier må sendes inn senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.morJobberOgStuderer', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    return '';
};
