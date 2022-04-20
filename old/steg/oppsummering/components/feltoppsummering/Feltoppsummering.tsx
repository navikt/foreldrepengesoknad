import * as React from 'react';
import InnholdMedLedetekst from 'app/steg/oppsummering/components/innholdMedLedetekst/InnholdMedLedetekst';
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
