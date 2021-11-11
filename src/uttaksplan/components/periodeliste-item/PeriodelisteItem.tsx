import { bemUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { Periode } from 'uttaksplan/types/Periode';
import PeriodelisteItemHeader from '../periodeliste-item-header/PeriodelisteItemHeader';

import './periodelisteItem.less';

interface Props {
    egenPeriode: boolean;
    periode: Periode;
}

const PeriodelisteItem: FunctionComponent<Props> = ({ egenPeriode, periode }) => {
    const bem = bemUtils('periodelisteItem');

    return (
        <article className={bem.block}>
            <PeriodelisteItemHeader egenPeriode={egenPeriode} periode={periode} />
        </article>
    );
};

export default PeriodelisteItem;
