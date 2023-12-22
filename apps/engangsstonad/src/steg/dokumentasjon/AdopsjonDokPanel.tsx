import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment } from '@navikt/fp-types';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { getSaveAttachment } from '@navikt/fp-api';

import Environment from 'appData/Environment';

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
}

const AdopsjonDokPanel: React.FunctionComponent<Props> = ({ attachments, updateAttachments }) => {
    return (
        <VStack gap="4">
            <div>
                <BodyShort style={{ fontWeight: 'bold' }}>
                    <FormattedMessage id="AdopsjonDokPanel.Vedlegg.Adopsjon" />
                </BodyShort>
                <BodyLong>
                    <FormattedMessage id="AdopsjonDokPanel.Veilederpanel.Text" />
                </BodyLong>
            </div>
            <BodyLong>
                <FormattedMessage id="AdopsjonDokPanel.Dok.Storrelse" />
            </BodyLong>
            <FileUploader
                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
                existingAttachments={attachments}
                updateAttachments={updateAttachments}
                saveAttachment={getSaveAttachment(Environment.REST_API_URL, 'engangsstonad')}
            />
        </VStack>
    );
};

export default AdopsjonDokPanel;
