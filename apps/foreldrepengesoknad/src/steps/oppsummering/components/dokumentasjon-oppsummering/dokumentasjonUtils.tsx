import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack } from '@navikt/ds-react';

import { InnsendingsType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentMetadataTidsperiode } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

const getTidsperiodeString = (tidsperioder: AttachmentMetadataTidsperiode[]) => {
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

const SKJEMANUMMER_TIL_LABEL_SEND_SENERE = {
    [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: (
        <FormattedMessage id="oppsummering.dokumentasjon.etterlønn.sendSenere" />
    ),
    [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: <FormattedMessage id="oppsummering.dokumentasjon.militær.sendSenere" />,
    [Skjemanummer.OMSORGSOVERTAKELSE]: (
        <FormattedMessage id="oppsummering.dokumentasjon.overtakelseAvOmsorg.sendSenere" />
    ),
    [Skjemanummer.DOK_AV_ALENEOMSORG]: <FormattedMessage id="oppsummering.dokumentasjon.aleneOmOmsorg.sendSenere" />,
    [Skjemanummer.TERMINBEKREFTELSE]: <FormattedMessage id="oppsummering.dokumentasjon.terminbekreftelse.sendSenere" />,
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.introduksjonsprogram.sendSenere" />
    ),
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.kvalifiseringsprogram.sendSenere" />
    ),
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morInnlagt.sendSenere" />
    ),
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.barnInnlagt.sendSenere" />
    ),
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.farInnlagt.sendSenere" />
    ),
    [Skjemanummer.DOK_SYKDOM_MOR]: <FormattedMessage id="oppsummering.dokumentasjon.perioder.morForSyk.sendSenere" />,
    [Skjemanummer.DOK_SYKDOM_FAR]: <FormattedMessage id="oppsummering.dokumentasjon.perioder.farForSyk.sendSenere" />,
    [Skjemanummer.DOK_ARBEID_MOR]: <FormattedMessage id="oppsummering.dokumentasjon.perioder.morJobber.sendSenere" />,
    [Skjemanummer.DOK_UTDANNING_MOR]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morStuderer.sendSenere" />
    ),
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: (
        <FormattedMessage id="oppsummering.dokumentasjon.perioder.morJobberOgStuderer.sendSenere" />
    ),
} as Record<Skjemanummer, ReactNode>;

const SKJEMANUMMER_TIL_LABEL = {
    [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: () => <FormattedMessage id="oppsummering.dokumentasjon.etterlønn" />,
    [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: () => <FormattedMessage id="oppsummering.dokumentasjon.militær" />,
    [Skjemanummer.OMSORGSOVERTAKELSE]: () => <FormattedMessage id="oppsummering.dokumentasjon.overtakelseAvOmsorg" />,
    [Skjemanummer.DOK_AV_ALENEOMSORG]: () => <FormattedMessage id="oppsummering.dokumentasjon.aleneOmOmsorg" />,
    [Skjemanummer.TERMINBEKREFTELSE]: () => <FormattedMessage id="oppsummering.dokumentasjon.terminbekreftelse" />,
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.introduksjonsprogram"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.kvalifiseringsprogram"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.morInnlagt"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.barnInnlagt"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.farInnlagt"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_SYKDOM_MOR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.morForSyk"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_SYKDOM_FAR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.farForSyk"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_ARBEID_MOR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.morJobber"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_UTDANNING_MOR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.morStuderer"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: (tidsperioder: AttachmentMetadataTidsperiode[]) => (
        <FormattedMessage
            id="oppsummering.dokumentasjon.perioder.morJobberOgStuderer"
            values={{ perioder: tidsperioder.length, tidsperiode: getTidsperiodeString(tidsperioder) }}
        />
    ),
} as Record<Skjemanummer, (tidsperioder?: AttachmentMetadataTidsperiode[]) => ReactNode>;

export const getDokumentasjonLabel = (attachment: Attachment) => {
    return attachment.innsendingsType === InnsendingsType.SEND_SENERE ? (
        <HStack gap="2">
            <ExclamationmarkTriangleIcon fontSize="1.5rem" />
            <BodyLong weight="semibold">{SKJEMANUMMER_TIL_LABEL_SEND_SENERE[attachment.skjemanummer]}</BodyLong>
        </HStack>
    ) : (
        SKJEMANUMMER_TIL_LABEL[attachment.skjemanummer](attachment.dokumenterer?.perioder)
    );
};
