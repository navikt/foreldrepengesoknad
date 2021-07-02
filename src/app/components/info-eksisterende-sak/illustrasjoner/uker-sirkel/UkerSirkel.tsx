import React from 'react';
import AntallUkerKalenderIkon from './antallUkerKalenderIkon/AntallUkerKalenderIkon';
import { bemUtils } from '@navikt/fp-common';
import Sirkelmaske from 'app/components/sirkelmaske/Sirkelmaske';

import './ukerSirkel.less';

interface Props {
    uker: number;
}

const UkerSirkel: React.FunctionComponent<Props> = ({ uker }) => {
    const bem = bemUtils('ukerSirkel');

    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <AntallUkerKalenderIkon uker={uker} />
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default UkerSirkel;
