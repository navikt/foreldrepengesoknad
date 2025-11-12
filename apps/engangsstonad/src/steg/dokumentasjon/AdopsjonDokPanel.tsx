import { API_URLS } from 'appData/queries';
import { FormattedMessage, useIntl } from 'react-intl';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { FileUploader, getSaveAttachmentFetch } from '@navikt/fp-filopplaster';
import { Attachment } from '@navikt/fp-types';

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[], hasPendingUploads: boolean) => void;
}

export const AdopsjonDokPanel = ({ attachments, updateAttachments }: Props) => {
    const intl = useIntl();
    return (
        <FileUploader
            label={intl.formatMessage({ id: 'AdopsjonDokPanel.Vedlegg.Adopsjon' })}
            description={<FormattedMessage id="AdopsjonDokPanel.Veilederpanel.Text" />}
            attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
            skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
            existingAttachments={attachments}
            updateAttachments={updateAttachments}
            saveAttachment={getSaveAttachmentFetch(API_URLS.sendVedlegg)}
        />
    );
};
