import { FunctionComponent } from 'react';
import AttachmentVisning from '../attachment-visning.tsx/AttachmentVisning';
import { Attachment } from 'app/types/Attachment';

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
