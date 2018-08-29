import * as React from 'react';
import { år, mnd, dagIMåned, ukedag } from '../../util/datoUtils';

import './formatertDato.less';

export type Datoformat = 'Full';

interface Props {
    dato: Date;
    visUkedag?: boolean;
}

export const datoString = (dato: Date) => `${ukedag(dato).substr(0, 3)}. ${dagIMåned(dato)} ${mnd(dato)} ${år(dato)}`;

const FormatertDato: React.StatelessComponent<Props> = ({ dato, visUkedag = true }) => (
    <span className="formatert-dato">
        {visUkedag && <span className="formatert-dato__ukedag">{ukedag(dato).substr(0, 3)}. </span>}
        <span className="formatert-dato__dag">{dagIMåned(dato)}</span>{' '}
        <span className="formatert-dato__måned">{mnd(dato)}</span>{' '}
        <span className="formatert-dato__år">{år(dato)}</span>
    </span>
);

export default FormatertDato;
