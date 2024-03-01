import React from 'react';
import { useIntl } from 'react-intl';

import { AnnenForelder, Block, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentMetadataType } from '@navikt/fp-types';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

import VedleggUploader from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    annenForelder: AnnenForelder;
}

const AleneomsorgDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    annenForelder,
}) => {
    const intl = useIntl();

    if (!isAnnenForelderOppgitt(annenForelder) || !annenForelder.datoForAleneomsorg) {
        return null;
    }

    return (
        <Block padBottom="xl">
            <VedleggUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_AV_ALENEOMSORG)}
                skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
                labelText={intl.formatMessage({ id: 'manglendeVedlegg.aleneomsorg.tittel' })}
                description={intl.formatMessage({ id: 'manglendeVedlegg.aleneomsorg.description' })}
                attachmentType={AttachmentType.ALENEOMSORG}
                metadataType={AttachmentMetadataType.BARN}
            />
        </Block>
    );
};

export default AleneomsorgDokumentasjon;
