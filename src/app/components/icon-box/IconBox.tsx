import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { UttaksplanColor } from '../../types/uttaksplan/colors';

import './iconBox.less';

export interface Props {
    color: UttaksplanColor;
}

const BEM = BEMHelper('iconBox');

const IconBox: React.StatelessComponent<Props> = ({ children, color }) => (
    <div className={classnames(BEM.className, BEM.modifier(color))}>{children}</div>
);

export default IconBox;
