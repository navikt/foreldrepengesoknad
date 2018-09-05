import * as React from 'react';
import classnames from 'classnames';
import './toggleArrow.less';

export interface Props {
    expanded: boolean;
}

const ToggleArrow: React.StatelessComponent<Props> = ({ expanded }) => (
    <span className={classnames('toggleArrow', { 'toggleArrow--expanded': expanded })} />
);

export default ToggleArrow;
