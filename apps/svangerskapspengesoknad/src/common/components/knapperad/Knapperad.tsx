import React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';

import './knapperad.less';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    stil?: 'normal' | 'mobile-50-50';
}

const BEM = BEMHelper('knapperad');

const Knapperad: React.FunctionComponent<Props> = ({ children, align = 'center', stil = 'normal' }) => {
    const cls = classnames(BEM.block, `${BEM.modifier(align)}`, `${BEM.modifier(stil)}`);
    return (
        <div className={cls}>
            {React.Children.map(children, (knapp, index) => (
                <span key={index} className={BEM.element('knapp')}>
                    {knapp}
                </span>
            ))}
        </div>
    );
};

export default Knapperad;
