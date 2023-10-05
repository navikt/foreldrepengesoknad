import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Attachment as AttachmentType } from '../typer/Attachment';
import { FileUploadError } from '../typer/FileUploadError';

const MAX_FIL_STØRRELSE_KB = 16777;

interface OwnProps {
    failedAttachment: AttachmentType;
    onDelete: (file: AttachmentType) => void;
}

const FailedAttachment: React.FunctionComponent<OwnProps> = ({ failedAttachment, onDelete }) => {
    return (
        <Alert variant="warning" closeButton onClose={() => onDelete(failedAttachment)}>
            {failedAttachment.error === FileUploadError.GENERAL && (
                <FormattedMessage
                    id="vedlegg.feilmelding.opplasting.feilet"
                    values={{ filename: failedAttachment.filename }}
                />
            )}
            {failedAttachment.error === FileUploadError.MAX_SIZE && (
                <FormattedMessage
                    id="vedlegg.feilmelding.ugyldig.størrelse"
                    values={{ filename: failedAttachment.filename, maxStørrelse: MAX_FIL_STØRRELSE_KB }}
                />
            )}
            {failedAttachment.error === FileUploadError.VALID_EXTENSION && (
                <FormattedMessage
                    id="vedlegg.feilmelding.ugyldig.type"
                    values={{ filename: failedAttachment.filename }}
                />
            )}
        </Alert>
    );
};

export default FailedAttachment;
