import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Children, FunctionComponent, ReactNode } from 'react';
import { guid } from '@navikt/fp-common';

import './knapperad.less';

export interface Props {
    children: ReactNode;
    align?: 'left' | 'right' | 'center';
    stil?: 'normal' | 'mobile-50-50';
}

const BEM = BEMHelper('knapperad');

const Knapperad: FunctionComponent<Props> = ({ children, align = 'center', stil = 'normal' }) => {
    const cls = classnames(BEM.block, `${BEM.modifier(align)}`, `${BEM.modifier(stil)}`);
    return (
        <div className={cls}>
            {Children.map(children, (knapp) => (
                <span key={guid()} className={BEM.element('knapp')}>
                    {knapp}
                </span>
            ))}
        </div>
    );
};

export default Knapperad;
