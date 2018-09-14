import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';
import './displayContentWithLabel.less';

interface Props {
    label: string;
    children: JSX.Element | JSX.Element[];
}

const DisplayContentWithLabel: React.StatelessComponent<Props> = (props) => {
    const cls = BEMHelper('displayContentWithLabel');
    return (
        <div className={cls.className}>
            <EtikettLiten className={cls.element('label')}>{props.label}</EtikettLiten>
            {!Array.isArray(props.children) && (
                <div key={guid()} className={cls.element('content')}>
                    {props.children}
                </div>
            )}
            {Array.isArray(props.children) &&
                (props.children as JSX.Element[]).map((child: any) => (
                    <div key={guid()} className={cls.element('content')}>
                        {child}
                    </div>
                ))}
        </div>
    );
};
export default DisplayContentWithLabel;
