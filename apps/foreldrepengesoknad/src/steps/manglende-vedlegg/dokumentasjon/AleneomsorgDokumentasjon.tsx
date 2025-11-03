import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { VedleggUploader } from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    annenForelder: AnnenForelder;
}

export const AleneomsorgDokumentasjon = ({ attachments, updateAttachments, annenForelder }: Props) => {
    const intl = useIntl();

    if (!isAnnenForelderOppgitt(annenForelder) || !annenForelder.datoForAleneomsorg) {
        return null;
    }

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_AV_ALENEOMSORG)}
            skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.aleneomsorg.tittel' })}
            description={intl.formatMessage({ id: 'manglendeVedlegg.aleneomsorg.description' })}
            attachmentType={AttachmentType.ALENEOMSORG}
            metadataType={'BARN'}
        />
    );
};
