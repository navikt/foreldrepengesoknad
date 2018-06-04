import * as React from 'react';
import * as classnames from 'classnames';
import BEMHelper from 'common/util/bem';

import './knapperad.less';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
}

const BEM = BEMHelper('knapperad');

const Knapperad: React.StatelessComponent<Props> = ({
    children,
    align = 'center'
}) => {
    const cls = classnames(BEM.className, `${BEM.modifier(align)}`);
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
