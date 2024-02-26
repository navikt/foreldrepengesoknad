import { Fragment } from 'react';

import { VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';

import FailedAttachment from './FailedAttachment';

interface Props {
    failedAttachments: Attachment[];
    onDelete: (file: Attachment) => void;
}

const FailedAttachmentList: React.FunctionComponent<Props> = (props) => {
    const { failedAttachments, onDelete } = props;
    return (
        <>
            {failedAttachments.length > 0 && (
                <VStack gap="2">
                    {failedAttachments.map((failedAttachment) => (
                        <Fragment key={failedAttachment.id}>
                            <FailedAttachment failedAttachment={failedAttachment} onDelete={onDelete} />
                        </Fragment>
                    ))}
                </VStack>
            )}
        </>
    );
};
export default FailedAttachmentList;
