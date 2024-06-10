import React from 'react';
import { useIntl } from 'react-intl';

import { Block } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, Søkersituasjon } from '@navikt/fp-types';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

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
        <Block padBottom="xl">
            <VedleggUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.OMSORGSOVERTAKELSE)}
                skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
                labelText={intl.formatMessage({ id: 'manglendeVedlegg.omsorgsovertakelse.tittel' })}
                description={intl.formatMessage({ id: 'manglendeVedlegg.omsorgsovertakelse.description' })}
                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                metadataType={AttachmentMetadataType.BARN}
            />
        </Block>
    );
};

export default OmsorgsovertakelseDokumentasjon;
