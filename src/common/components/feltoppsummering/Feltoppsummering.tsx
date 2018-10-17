import * as React from 'react';
import { Element } from 'nav-frontend-typografi';

import './feltoppsummering.less';
import InnholdMedLedetekst from 'common/components/innhold-med-ledetekst/InnholdMedLedetekst';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

const Feltoppsummering: React.StatelessComponent<Props> = ({ feltnavn, verdi }) => (
    <InnholdMedLedetekst
        className="feltoppsummering"
        ledetekst={feltnavn}
        children={<Element className="feltoppsummering__verdi">{verdi}</Element>}
    />
);

export default Feltoppsummering;
