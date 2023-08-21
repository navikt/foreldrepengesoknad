import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';

import { FunctionComponent } from 'react';
import AttachmentVisning from '../attachmentVisning.tsx/AttachmentVisning';
import { deleteAttachment } from '@navikt/fp-common/src/common/utils/attachmentUtils';

interface Props {
    vedlegg: Attachment[];
}

const AttachmentList: FunctionComponent<Props> = ({ vedlegg }) => {
    const handleSlettVedlegg = (file: Attachment) => deleteAttachment(vedlegg, file);
    return (
        <>
            {vedlegg &&
                vedlegg.length > 0 &&
                vedlegg.map((fil) => {
                    return <AttachmentVisning key={fil.id} vedlegg={fil} handleSlettVedlegg={handleSlettVedlegg} />;
                })}
        </>
    );
};

export default AttachmentList;
