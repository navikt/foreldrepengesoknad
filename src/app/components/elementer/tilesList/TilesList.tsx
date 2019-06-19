import * as React from 'react';
import BEMHelper from 'common/util/bem';
import './tilesList.less';

const bem = BEMHelper('tilesList');

const TilesList: React.StatelessComponent<{ columns?: 1 | 2 | 3 | 'flex' }> = ({ columns = 3, children }) => (
    <ol className={bem.classNames(bem.block, bem.modifier(`columns-${columns}`))}>
        {React.Children.map(children, (child) => <li className={bem.element('tile')}>{child}</li>)}
    </ol>
);

export default TilesList;
