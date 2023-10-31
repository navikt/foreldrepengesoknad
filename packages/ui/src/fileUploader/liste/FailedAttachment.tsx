import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

import { Attachment as AttachmentType } from '@navikt/fp-types';
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
                    id="FailedAttachment.Vedlegg.Feilmelding.Opplasting.Feilet"
                    values={{ filename: failedAttachment.filename }}
                />
            )}
            {failedAttachment.error === FileUploadError.TIMEOUT && (
                <FormattedMessage
                    id="FailedAttachment.Vedlegg.Feilmelding.Timeout"
                    values={{ filename: failedAttachment.filename }}
                />
            )}
            {failedAttachment.error === FileUploadError.MAX_SIZE && (
                <FormattedMessage
                    id="FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Størrelse"
                    values={{ filename: failedAttachment.filename, maxStørrelse: MAX_FIL_STØRRELSE_KB }}
                />
            )}
            {failedAttachment.error === FileUploadError.VALID_EXTENSION && (
                <FormattedMessage
                    id="FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Type"
                    values={{ filename: failedAttachment.filename }}
                />
            )}
        </Alert>
    );
};

export default FailedAttachment;
