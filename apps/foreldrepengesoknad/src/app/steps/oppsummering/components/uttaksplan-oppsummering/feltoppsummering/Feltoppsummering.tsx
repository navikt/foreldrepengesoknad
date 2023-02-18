import * as React from 'react';
import './feltoppsummering.less';
import InnholdMedLedetekst from '../InnholdMedLedetekst';

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
