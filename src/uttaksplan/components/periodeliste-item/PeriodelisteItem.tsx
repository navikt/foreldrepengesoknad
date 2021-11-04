import { bemUtils, Tidsperiode } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import PeriodelisteItemHeader from '../periodeliste-item-header/PeriodelisteItemHeader';

import './periodelisteItem.less';

interface Props {
    egenPeriode: boolean;
    tidsperiode: Tidsperiode;
}

const PeriodelisteItem: FunctionComponent<Props> = ({ egenPeriode, tidsperiode }) => {
    const bem = bemUtils('periodelisteItem');

    return (
        <article className={bem.block}>
            <PeriodelisteItemHeader egenPeriode={egenPeriode} tidsperiode={tidsperiode} />
        </article>
    );
};

export default PeriodelisteItem;
