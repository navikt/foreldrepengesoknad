import * as React from 'react';
import { Element } from 'nav-frontend-typografi';

import './feltoppsummering.less';
import InnholdMedLedetekst from 'app/steg/oppsummering/components/innholdMedLedetekst/InnholdMedLedetekst';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

const Feltoppsummering: React.StatelessComponent<Props> = ({ feltnavn, verdi }) => (
    <InnholdMedLedetekst className="feltoppsummering" ledetekst={feltnavn}>
        <Element className="feltoppsummering__verdi">{verdi}</Element>
    </InnholdMedLedetekst>
);

export default Feltoppsummering;
