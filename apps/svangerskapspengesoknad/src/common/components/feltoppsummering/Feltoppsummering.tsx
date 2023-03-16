import React from 'react';

import './feltoppsummering.less';
import InnholdMedLedetekst from 'common/components/innhold-med-ledetekst/InnholdMedLedetekst';
import { Label } from '@navikt/ds-react';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

const Feltoppsummering: React.FunctionComponent<Props> = ({ feltnavn, verdi }) => (
    <InnholdMedLedetekst
        className="feltoppsummering"
        ledetekst={feltnavn}
    >
        <Label className="feltoppsummering__verdi">{verdi}</Label>
    </InnholdMedLedetekst>
);

export default Feltoppsummering;
