import * as React from 'react';
import classnames from 'classnames';
import { BlockPadding } from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';

import './infoBlock.less';

export interface Props {
    children: React.ReactNode;
    padding?: BlockPadding;
}

const bem = BEMHelper('infoBlock');

const InfoBlock: React.FunctionComponent<Props> = ({ children, padding = 'xs' }) => (
    <div className={classnames(bem.block, bem.modifier(`pad-${padding}`))}>{children}</div>
);

export default InfoBlock;
