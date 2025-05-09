import { FormattedMessage, useIntl } from 'react-intl';

import { getSaveAttachmentFetch } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';

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
            saveAttachment={getSaveAttachmentFetch(import.meta.env.BASE_URL, 'engangsstonad')}
        />
    );
};
