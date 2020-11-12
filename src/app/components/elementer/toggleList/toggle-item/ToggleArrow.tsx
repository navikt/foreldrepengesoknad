import * as React from 'react';
import classnames from 'classnames';
import './toggleArrow.less';
import BEMHelper from 'common/util/bem';

export interface Props {
    expanded: boolean;
}

const bem = BEMHelper('toggleArrow');
const expandedStyle = bem.modifier('expanded');

const ToggleArrow: React.FunctionComponent<Props> = ({ expanded }) => (
    <span className={classnames(`${bem.block}`, { [expandedStyle]: expanded })} />
);

export default ToggleArrow;
