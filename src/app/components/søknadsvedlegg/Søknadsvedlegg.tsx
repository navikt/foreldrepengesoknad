import * as React from 'react';
import AttachmentUploader from 'common/storage/attachment/connected-components/attachment-uploader/AttachmentUploader';
import { SøknadsvedleggType } from '../../types/søknad/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export interface Props {
    type: SøknadsvedleggType;
    onAfterFilesSelect?: (attachments: Attachment[]) => void;
    onAfterFileDelete?: (attachment: Attachment) => void;
}

const Søknadsvedlegg: React.StatelessComponent<Props> = ({
    type,
    onAfterFilesSelect,
    onAfterFileDelete
}) => (
    <AttachmentUploader
        group={type}
        onAfterFilesSelect={onAfterFilesSelect}
        onAfterFileDelete={onAfterFileDelete}
    />
);

export default Søknadsvedlegg;
