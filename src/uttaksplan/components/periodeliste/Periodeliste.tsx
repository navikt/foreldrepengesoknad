import React, { FunctionComponent } from 'react';
import { bemUtils } from '@navikt/fp-common';
import PeriodelisteItem from './../periodeliste-item/PeriodelisteItem';

import './periodeliste.less';
import { isInfoPeriode, Periode } from 'uttaksplan/types/Periode';

interface Props {
    uttaksplan: Periode[];
}

const Periodeliste: FunctionComponent<Props> = ({ uttaksplan }) => {
    const bem = bemUtils('periodeliste');

    return (
        <div className={bem.block}>
            {uttaksplan.map((p) => (
                <PeriodelisteItem key={p.id} egenPeriode={!isInfoPeriode(p)} periode={p} />
            ))}
        </div>
    );
};

export default Periodeliste;
