import * as React from 'react';
import BEMHelper from 'common/util/bem';
import './tilesList.less';

const BEM = BEMHelper('tilesList');

const TilesList: React.StatelessComponent<{}> = ({ children }) => (
    <ol className={BEM.block}>
        {React.Children.map(children, (child) => <li className={BEM.element('tile')}>{child}</li>)}
    </ol>
);

export default TilesList;
