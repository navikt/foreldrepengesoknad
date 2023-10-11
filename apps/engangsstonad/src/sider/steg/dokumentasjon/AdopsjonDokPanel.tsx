import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import Environment from 'appData/Environment';
import { Attachment, AttachmentType, Skjemanummer } from 'fpcommon/uploader/typer/Attachment';
import FileUploader from 'fpcommon/uploader/FileUploader';

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
                restApiUrl={Environment.REST_API_URL}
            />
        </VStack>
    );
};

export default AdopsjonDokPanel;
