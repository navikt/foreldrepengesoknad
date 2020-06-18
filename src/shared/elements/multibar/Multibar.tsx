import * as React from 'react';
import BEMHelper from 'common/util/bem';

import './multibar.less';

interface BarProps {
    width: number;
    color: string;
    color2?: string;
    text?: React.ReactNode;
}

interface Props {
    borderColor: string;
    leftBar?: BarProps;
    rightBar?: BarProps;
    centerBar?: BarProps;
}

const bem = BEMHelper('multibar');

const getBarStyle = ({ width, color, color2 }: BarProps): React.CSSProperties => {
    return {
        width: `${width}%`,
        background: color2 ? `linear-gradient(to right bottom, ${color} 49%, ${color2} 51%)` : color,
    };
};

const Multibar: React.StatelessComponent<Props> = ({ leftBar, rightBar, centerBar, borderColor }) => {
    const backgroundStyle: React.CSSProperties = {
        borderColor,
    };

    return (
        <div className={bem.block}>
            <div className={bem.element('bars')}>
                {leftBar && leftBar.width > 0 && (
                    <div className={bem.element('bar', 'left')} style={getBarStyle(leftBar)}>
                        {leftBar && leftBar.text}
                    </div>
                )}
                {centerBar && (
                    <div
                        className={bem.element('bar', 'center')}
                        style={{ ...getBarStyle(centerBar), left: leftBar ? `${leftBar.width}%` : undefined }}
                    >
                        {centerBar && centerBar.text}
                    </div>
                )}
                {rightBar && rightBar.width > 0 && (
                    <div className={bem.element('bar', 'right')} style={getBarStyle(rightBar)}>
                        {rightBar && rightBar.text}
                    </div>
                )}
            </div>
            <div className={bem.element('background')} style={backgroundStyle} />
        </div>
    );
};

export default Multibar;
