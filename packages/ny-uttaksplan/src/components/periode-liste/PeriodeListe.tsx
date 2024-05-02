import { FunctionComponent } from 'react';

import { Periode } from '@navikt/fp-common';

import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Periode[];
}

const PeriodeListe: FunctionComponent<Props> = ({ perioder }) => {
    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, false);

    console.log(permisjonsperioder);

    return (
        <div>
            {perioder.map((periode) => {
                return <PeriodeListeItem periode={periode} />;
            })}
        </div>
    );
};

export default PeriodeListe;
