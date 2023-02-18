import React from 'react';
import { bemUtils } from '@navikt/fp-common';
import Sirkelmaske from 'app/components/sirkelmaske/Sirkelmaske';
import SpebarnIkon from 'app/assets/SpebarnIkon';

import './spebarnSirkel.less';

const SpebarnSirkel: React.FunctionComponent = () => {
    const bem = bemUtils('spebarnSirkel');
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <div className={bem.element('svg')}>
                        <SpebarnIkon size={42} />
                    </div>
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SpebarnSirkel;
