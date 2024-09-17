import * as React from 'react';

import planBemUtils from '../../../utils/planBemUtils';
import './tilesList.less';

const bem = planBemUtils('tilesList');

const TilesList: React.FunctionComponent<{ columns?: 1 | 2 | 3 | 'flex'; children?: React.ReactNode }> = ({
    columns = 3,
    children,
}) => (
    <ol className={bem.classNames(bem.block, bem.modifier(`columns-${columns}`))}>
        {React.Children.map(children, (child) => (
            <li className={bem.element('tile')}>{child}</li>
        ))}
    </ol>
);

export default TilesList;
