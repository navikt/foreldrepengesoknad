import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { UttaksplanColor } from '../../types/uttaksplan/colors';

import './iconBox.less';

export interface Props {
    color: UttaksplanColor;
    outline?: boolean;
    stripes?: boolean;
}

const BEM = BEMHelper('iconBox');

const IconBox: React.StatelessComponent<Props> = ({ children, color, outline, stripes }) => (
    <div
        className={classnames(
            BEM.block,
            BEM.modifier(`${color}${stripes ? '--striped' : ''}`),
            BEM.modifierConditional('outline', outline)
        )}>
        {children}
    </div>
);

export default IconBox;
