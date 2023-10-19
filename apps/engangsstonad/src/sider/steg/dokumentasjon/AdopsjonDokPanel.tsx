import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment, AttachmentType, Skjemanummer } from '@navikt/fp-types';
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
                <Label>
                    <FormattedMessage id="AdopsjonDokPanel.Vedlegg.Adopsjon" />
                </Label>
                <BodyLong>
                    <FormattedMessage id="AdopsjonDokPanel.Veilederpanel.Text" />
                </BodyLong>
            </div>
            <BodyLong>
                <FormattedMessage id="AdopsjonDokPanel.Dok.Storrelse" />
            </BodyLong>
            <FileUploader
                attachmentType={AttachmentType.TERMINBEKREFTELSE}
                skjemanummber={Skjemanummer.TERMINBEKREFTELSE}
                existingAttachments={attachments}
                updateAttachments={updateAttachments}
                saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
            />
        </VStack>
    );
};

export default AdopsjonDokPanel;
