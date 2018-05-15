import * as React from 'react';
import Vedlegg from './Vedlegg';

import './vedlegg.less';

interface Props {
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onDelete?: (file: File) => void;
}

const VedleggListe: React.StatelessComponent<Props> = (props) => {
    const { vedlegg, visFilstørrelse, onDelete } = props;
    return (
        <ul className="vedleggListe">
            {vedlegg.map((vedleggFile, index) => (
                <li>
                    <Vedlegg
                        key={index}
                        vedlegg={vedleggFile}
                        onDelete={onDelete}
                        visFilstørrelse={visFilstørrelse}
                    />
                </li>
            ))}
        </ul>
    );
};
export default VedleggListe;
