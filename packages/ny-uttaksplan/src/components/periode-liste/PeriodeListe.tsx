import { FunctionComponent } from 'react';

import { Periode } from '@navikt/fp-common';

import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Periode[];
}

const PeriodeListe: FunctionComponent<Props> = ({ perioder }) => {
    return (
        <div>
            {perioder.map((periode) => {
                return <PeriodeListeItem periode={periode} />;
            })}
        </div>
    );
};

export default PeriodeListe;
