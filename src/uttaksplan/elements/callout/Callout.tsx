import * as React from 'react';
import './callout.less';

export type CalloutBorderColor = 'green' | 'purple' | 'blue' | 'gray';

export interface Props {
    borderColor?: CalloutBorderColor;
    hideArrow?: boolean;
}

const Callout: React.StatelessComponent<Props> = ({
    borderColor = 'gray',
    hideArrow = false,
    children
}) => (
    <div className={`callout callout--${borderColor}`}>
        {!hideArrow && (
            <div className="callout__arrow">
                <div className="topLeftArrow" />
            </div>
        )}
        <div className="callout__content">{children}</div>
    </div>
);

export default Callout;
