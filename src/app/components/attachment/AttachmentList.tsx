import * as React from 'react';
import './attachment.less';

import Attachment from 'components/attachment/Attachment';

interface Props {
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onDelete?: (file: File) => void;
}

const AttachmentList: React.StatelessComponent<Props> = props => {
    const { vedlegg, visFilstørrelse, onDelete } = props;
    return (
        <ul className="attachmentList">
            {vedlegg.map((vedleggFile, index) => (
                <li key={index}>
                    <Attachment
                        vedlegg={vedleggFile}
                        onDelete={onDelete}
                        visFilstørrelse={visFilstørrelse}
                    />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;
