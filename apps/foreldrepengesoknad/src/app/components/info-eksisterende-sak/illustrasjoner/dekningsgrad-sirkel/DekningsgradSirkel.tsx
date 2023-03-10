import React from 'react';
import { bemUtils } from '@navikt/fp-common';
import Sirkelmaske from 'app/components/sirkelmaske/Sirkelmaske';
import PengerIkon from 'app/assets/PengerIkon';

import './dekningsgradSirkel.less';

const DekningsgradSirkel: React.FunctionComponent = () => {
    const bem = bemUtils('dekningsgradSirkel');

    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <div className={bem.element('svg')}>
                        <PengerIkon size={48} />
                    </div>
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default DekningsgradSirkel;
