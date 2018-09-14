import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import './displayContentWithLabel.less';

interface Props {
    label: string;
    children: JSX.Element | JSX.Element[];
}

const DisplayContentWithLabel: React.StatelessComponent<Props> = (props) => (
    <div className="contentWithLabel">
        <EtikettLiten className="contentWithLabel__label">{props.label}</EtikettLiten>
        {!Array.isArray(props.children) && (
            <div key={guid()} className="contentWithLabel__content">
                {props.children}
            </div>
        )}
        {Array.isArray(props.children) &&
            (props.children as JSX.Element[]).map((child: any) => (
                <div key={guid()} className="contentWithLabel__content">
                    {child}
                </div>
            ))}
    </div>
);
export default DisplayContentWithLabel;
