import React from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import UttakUploader from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
}

const FarInnlagtDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_FAR)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            familiehendelsesdato={familiehendelsesdato}
            termindato={termindato}
            situasjon={situasjon}
            skjemanummer={Skjemanummer.DOK_INNLEGGELSE_FAR}
            labelText={intl.formatMessage(
                { id: 'manglendeVedlegg.farInnlagt.label' },
                {
                    navn: navnPåForeldre.farMedmor,
                    erFarEllerMedmor,
                },
            )}
            description={intl.formatMessage(
                { id: 'manglendeVedlegg.farInnlagt.description' },
                {
                    navn: navnPåForeldre.farMedmor,
                    erFarEllerMedmor,
                },
            )}
            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
        />
    );
};

export default FarInnlagtDokumentasjon;
