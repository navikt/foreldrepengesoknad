import { Tidsperiode, formatDate, intlUtils } from '@navikt/fp-common';
import { Attachment, InnsendingsType } from '@navikt/fp-types';
import {
    isArbeidUtdanningEllerSykdomVedlegg,
    isFedrekvoteMorForSykVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isOverføringsVedlegg,
    isUtsettelseVedlegg,
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

export const getDokumentasjonString = (attachments: Attachment[], intl: IntlShape) => {
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
            return 'Send senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.introduksjonsprogram', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isKvalifiseringsprogramVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Send senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.kvalifiseringsprogram', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isOverføringsVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.overføring.sendSenere', {
                perioder: tidsperioder.length,
                tidsperiode: getTidsperiodeString(tidsperioder),
            });
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.overføring', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isFedrekvoteMorForSykVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Send senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.fedrekvoteMorForSyk', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isUtsettelseVedlegg(singleAttachment)) {
        if (singleAttachment.innsendingsType === InnsendingsType.SEND_SENERE) {
            return 'Send senere';
        }

        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.utsettelse', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    return ``;
};
