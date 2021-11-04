import React from 'react';
import { bemUtils } from '@navikt/fp-common';
import PeriodelisteItem from './../periodeliste-item/PeriodelisteItem';

import './periodeliste.less';

const Periodeliste = () => {
    const bem = bemUtils('periodeliste');

    return (
        <div className={bem.block}>
            <PeriodelisteItem egenPeriode={false} tidsperiode={{ fom: '2021-10-12', tom: '2021-10-19' }} />
            <PeriodelisteItem egenPeriode={false} tidsperiode={{ fom: '2021-10-20', tom: '2021-10-29' }} />
            <PeriodelisteItem egenPeriode={true} tidsperiode={{ fom: '2021-10-30', tom: '2021-11-09' }} />
            <PeriodelisteItem egenPeriode={true} tidsperiode={{ fom: '2021-11-10', tom: '2021-11-19' }} />
        </div>
    );
};

export default Periodeliste;
