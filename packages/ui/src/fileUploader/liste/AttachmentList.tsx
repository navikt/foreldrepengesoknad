import { Fragment } from 'react';
import { VStack } from '@navikt/ds-react';
import { Attachment } from '@navikt/fp-types';
import AttachmentComponent from './Attachment';
import { guid } from '@navikt/fp-common';

import './attachment.less';

interface Props {
    attachments: Attachment[];
    showFileSize?: boolean;
    onDelete?: (file: Attachment) => void;
}

const AttachmentList: React.FunctionComponent<Props> = (props) => {
    const { attachments, showFileSize, onDelete } = props;

    return (
        <>
            {attachments.length > 0 && (
                <VStack gap="2">
                    {attachments.map((attachment) => (
                        <Fragment key={guid()}>
                            <AttachmentComponent
                                attachment={attachment}
                                onDelete={onDelete}
                                showFileSize={showFileSize}
                            />
                        </Fragment>
                    ))}
                </VStack>
            )}
        </>
    );
};
export default AttachmentList;
