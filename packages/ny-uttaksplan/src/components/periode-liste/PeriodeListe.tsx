import { FunctionComponent } from 'react';

import { Periode } from '@navikt/fp-common';

import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Periode[];
    familiehendelsesdato: string;
    erFarEllerMedmor: boolean;
}

const PeriodeListe: FunctionComponent<Props> = ({ perioder, familiehendelsesdato, erFarEllerMedmor }) => {
    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, erFarEllerMedmor, familiehendelsesdato);

    return (
        <div>
            {permisjonsperioder.map((p) => {
                return <PeriodeListeItem permisjonsperiode={p} />;
            })}
        </div>
    );
};

export default PeriodeListe;
