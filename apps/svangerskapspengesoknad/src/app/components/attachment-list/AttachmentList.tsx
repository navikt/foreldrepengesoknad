import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { FunctionComponent } from 'react';
import AttachmentVisning from '../attachment-visning.tsx/AttachmentVisning';

interface Props {
    vedlegg: Attachment[];
    onDelete: (value: Attachment) => void;
}

const AttachmentList: FunctionComponent<Props> = ({ vedlegg, onDelete }) => {
    return (
        <>
            {vedlegg &&
                vedlegg.length > 0 &&
                vedlegg.map((fil) => {
                    return <AttachmentVisning key={fil.id} vedlegg={fil} onDelete={onDelete} />;
                })}
        </>
    );
};

export default AttachmentList;
