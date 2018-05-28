import * as React from 'react';
import { år, mnd, dagIMåned, ukedag } from '../../utils/datoUtils';

import './dato.less';

export type Datoformat = 'Full';

interface Props {
    dato: Date;
}

export const datoString = (dato: Date) =>
    `${ukedag(dato).substr(0, 3)}. ${dagIMåned(dato)} ${mnd(dato)} ${år(dato)}`;

const Dato: React.StatelessComponent<Props> = ({ dato }) => (
    <span className="formatert-dato">
        <span className="formatert-dato__ukedag">
            {ukedag(dato).substr(0, 3)}.{' '}
        </span>
        <span className="formatert-dato__dag">{dagIMåned(dato)}</span>{' '}
        <span className="formatert-dato__måned">{mnd(dato)}</span>{' '}
        <span className="formatert-dato__år">{år(dato)}</span>
    </span>
);

export default Dato;
