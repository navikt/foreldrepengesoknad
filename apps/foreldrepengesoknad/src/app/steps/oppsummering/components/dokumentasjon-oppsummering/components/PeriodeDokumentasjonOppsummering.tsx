import { Block, Tidsperiode, formatDate, intlUtils } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import {
    isArbeidUtdanningEllerSykdomVedlegg,
    isFedrekvoteMorForSykVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isOverføringsVedlegg,
    isUtsettelseVedlegg,
} from 'app/steps/manglende-vedlegg/util';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

interface Props {
    dokumentasjon: Attachment[];
}

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

const getDokumentasjonString = (attachment: Attachment, intl: IntlShape) => {
    const tidsperioder = attachment.dokumenterer!.perioder!;

    if (isArbeidUtdanningEllerSykdomVedlegg(attachment)) {
        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.arbeidUtdanningSykdom', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isIntroduksjonsprogramVedlegg(attachment)) {
        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.introduksjonsprogram', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isKvalifiseringsprogramVedlegg(attachment)) {
        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.kvalifiseringsprogram', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isOverføringsVedlegg(attachment)) {
        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.overføring', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isFedrekvoteMorForSykVedlegg(attachment)) {
        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.fedrekvoteMorForSyk', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    if (isUtsettelseVedlegg(attachment)) {
        return intlUtils(intl, 'oppsummering.dokumentasjon.perioder.utsettelse', {
            perioder: tidsperioder.length,
            tidsperiode: getTidsperiodeString(tidsperioder),
        });
    }

    return `Dokumentasjon på at mor studerer i periodene: ${getTidsperiodeString(attachment.dokumenterer!.perioder!)}`;
};

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ dokumentasjon }) => {
    const intl = useIntl();

    return (
        <>
            {dokumentasjon.map((d) => (
                <Block padBottom="m">{getDokumentasjonString(d, intl)}</Block>
            ))}
        </>
    );
};

export default PeriodeDokumentasjonOppsummering;
