import * as React from 'react';
import { bemUtils } from '@navikt/fp-common';
import './tilesList.less';

const bem = bemUtils('tilesList');

const TilesList: React.FunctionComponent<{ columns?: 1 | 2 | 3 | 'flex' }> = ({ columns = 3, children }) => (
    <ol className={bem.classNames(bem.block, bem.modifier(`columns-${columns}`))}>
        {React.Children.map(children, (child) => (
            <li className={bem.element('tile')}>{child}</li>
        ))}
    </ol>
);

export default TilesList;
