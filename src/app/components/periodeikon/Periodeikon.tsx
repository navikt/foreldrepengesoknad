import * as React from 'react';
import classnames from 'classnames';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplanIkon/UttaksplanIkon';

import BEMHelper from 'common/util/bem';

import './periodeikon.less';

export type Periodefarge = 'lilla' | 'blaa' | 'gronn' | 'lillaBlaa';

export interface Props {
    ikon: UttaksplanIkonKeys;
    farge: Periodefarge;
}

const BEM = BEMHelper('periodeikon');

const PeriodeIkon: React.StatelessComponent<Props> = ({ ikon, farge }) => (
    <div className={classnames(BEM.className, BEM.modifier(farge))}>
        <UttaksplanIkon ikon={ikon} />
    </div>
);

export default PeriodeIkon;
