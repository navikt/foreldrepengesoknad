import { FormattedMessage } from 'react-intl';

import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentMetadataTidsperiode } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

export const getTidsperiodeString = (tidsperioder: AttachmentMetadataTidsperiode[]) => {
    let periodeString: string | undefined = undefined;

    tidsperioder.forEach((tidsperiode, index) => {
        if (periodeString) {
            if (index === tidsperioder.length - 1) {
                periodeString = periodeString.concat(
                    ` og ${formatDate(tidsperiode.fom)} - ${tidsperiode.tom ? formatDate(tidsperiode.tom) : ''}`,
                );
            } else {
                periodeString = periodeString.concat(
                    `, ${formatDate(tidsperiode.fom)} - ${tidsperiode.tom ? formatDate(tidsperiode.tom) : ''}`,
                );
            }
        } else {
            periodeString = `${formatDate(tidsperiode.fom)} - ${tidsperiode.tom ? formatDate(tidsperiode.tom) : ''}`;
        }

        return periodeString;
    });

    return periodeString;
};

const getPeriodeLabelValues = (tidsperioder: AttachmentMetadataTidsperiode[] | undefined) => {
    return {
        perioder: notEmpty(tidsperioder).length,
        tidsperiode: getTidsperiodeString(notEmpty(tidsperioder)),
    };
};

interface Props {
    attachment: Attachment;
}

export const DokumentasjonLastetOppLabel = ({ attachment }: Props) => {
    const tidsperioder = attachment.dokumenterer?.perioder;

    switch (attachment.skjemanummer) {
        case Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.etterlønn"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.militær"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.OMSORGSOVERTAKELSE:
            return <FormattedMessage id="oppsummering.dokumentasjon.overtakelseAvOmsorg" />;
        case Skjemanummer.DOK_AV_ALENEOMSORG:
            return <FormattedMessage id="oppsummering.dokumentasjon.aleneOmOmsorg" />;
        case Skjemanummer.TERMINBEKREFTELSE:
            return <FormattedMessage id="oppsummering.dokumentasjon.terminbekreftelse" />;
        case Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.introduksjonsprogram"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.kvalifiseringsprogram"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_INNLEGGELSE_MOR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morInnlagt"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_INNLEGGELSE_BARN:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.barnInnlagt"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_INNLEGGELSE_FAR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.farInnlagt"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_SYKDOM_MOR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morForSyk"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_SYKDOM_FAR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.farForSyk"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_ARBEID_MOR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morJobber"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_UTDANNING_MOR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morStuderer"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        case Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.perioder.morJobberOgStuderer"
                    values={getPeriodeLabelValues(tidsperioder)}
                />
            );
        default:
            throw new Error();
    }
};
