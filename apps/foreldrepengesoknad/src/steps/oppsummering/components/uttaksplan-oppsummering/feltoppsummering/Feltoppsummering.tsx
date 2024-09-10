import * as React from 'react';

import InnholdMedLedetekst from '../InnholdMedLedetekst';
import './feltoppsummering.less';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

const Feltoppsummering: React.FunctionComponent<Props> = ({ feltnavn, verdi }) => (
    <InnholdMedLedetekst className="feltoppsummering" ledetekst={feltnavn}>
        <div className="feltoppsummering__verdi">{verdi}</div>
    </InnholdMedLedetekst>
);

export default Feltoppsummering;
