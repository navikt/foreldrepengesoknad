import * as React from 'react';
import BEMHelper from 'common/util/bem';
import './tilesList.less';

const BEM = BEMHelper('tileslist');

const TilesList: React.StatelessComponent<{}> = ({ children }) => (
    <ol className={BEM.className}>
        {React.Children.map(children, (child) => <li className={BEM.element('tile')}>{child}</li>)}
    </ol>
);

export default TilesList;
