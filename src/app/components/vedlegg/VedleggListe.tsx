import * as React from 'react';
import Vedlegg from './Vedlegg';
import { Attachment } from '../../types/Attachment';

import './vedlegg.less';

interface Props {
    vedlegg: Attachment[];
    visFilstørrelse?: boolean;
    onDelete?: (file: Attachment) => void;
}

const VedleggListe: React.StatelessComponent<Props> = (props) => {
    const { vedlegg, visFilstørrelse, onDelete } = props;
    return (
        <ul className="vedleggListe">
            {vedlegg.map((attachment, index) => (
                <li key={index}>
                    <Vedlegg
                        attachment={attachment}
                        onDelete={onDelete}
                        visFilstørrelse={visFilstørrelse}
                    />
                </li>
            ))}
        </ul>
    );
};
export default VedleggListe;
