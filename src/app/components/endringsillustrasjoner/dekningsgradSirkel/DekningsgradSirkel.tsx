import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import BEMHelper from 'common/util/bem';
import Sirkelmaske from 'common/components/sirkelmaske/Sirkelmaske';
import PengerIkon from 'common/components/ikoner/PengerIkon';

import './dekningsgradSirkel.less';

interface Props {
    dekningsgrad: Dekningsgrad;
}

const DekningsgradSirkel: React.StatelessComponent<Props> = ({ dekningsgrad }) => {
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
