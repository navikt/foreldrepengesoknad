import * as React from 'react';
import { Ingress } from 'nav-frontend-typografi';

import './dev.less';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';

interface Props {
    title?: string;
    alwaysActive?: boolean;
}

const bem = BEMHelper('dev');

const DevBlock: React.FunctionComponent<Props> = ({ children, title, alwaysActive }) => (
    <div className={bem.classNames(bem.block, bem.modifierConditional('active', alwaysActive))}>
        {title && (
            <Block margin="xs">
                <Ingress>{title}</Ingress>
            </Block>
        )}
        {children}
    </div>
);

export default DevBlock;
