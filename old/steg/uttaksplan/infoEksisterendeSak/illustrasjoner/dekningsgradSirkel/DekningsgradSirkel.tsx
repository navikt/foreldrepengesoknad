import React from 'react';
import BEMHelper from 'common/util/bem';
import Sirkelmaske from 'common/components/sirkelmaske/Sirkelmaske';
import PengerIkon from 'common/components/ikoner/PengerIkon';

import './dekningsgradSirkel.less';

const DekningsgradSirkel: React.FunctionComponent = () => {
    const bem = BEMHelper('dekningsgradSirkel');
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
