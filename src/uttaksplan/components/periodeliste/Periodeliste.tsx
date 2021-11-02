import React from 'react';
import { bemUtils } from '@navikt/fp-common';

import './periodeliste.less';

const Periodeliste = () => {
    const bem = bemUtils('periodeliste');

    return <div className={bem.block}>Periodeliste</div>;
};

export default Periodeliste;
