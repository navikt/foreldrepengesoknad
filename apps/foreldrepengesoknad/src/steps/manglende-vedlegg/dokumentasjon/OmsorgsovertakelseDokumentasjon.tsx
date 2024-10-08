import React from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, Søkersituasjon } from '@navikt/fp-types';

import VedleggUploader from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    søkersituasjon: Søkersituasjon;
}

const OmsorgsovertakelseDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    søkersituasjon,
}) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon !== 'adopsjon') {
        return null;
    }

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.OMSORGSOVERTAKELSE)}
            skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.omsorgsovertakelse.tittel' })}
            description={intl.formatMessage({ id: 'manglendeVedlegg.omsorgsovertakelse.description' })}
            attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
            metadataType={AttachmentMetadataType.BARN}
        />
    );
};

export default OmsorgsovertakelseDokumentasjon;
