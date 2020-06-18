import React from 'react';
import BEMHelper from 'common/util/bem';
import './layoutRow.less';

const bem = BEMHelper('layoutRow');

export interface LayoutRowProps extends React.Props<any> {
    left: React.ReactNode;
    right?: (React.ReactNode | string)[];
    valign?: 'top' | 'middle' | 'bottom';
    keepMargins?: boolean;
    padding?: 'none' | 'small' | 'normal';
}

const LayoutRow: React.StatelessComponent<LayoutRowProps> = ({
    left,
    right,
    keepMargins,
    valign = 'middle',
    padding = 'normal',
}) => {
    if (!right || right.length === 0) {
        return <div>{left}</div>;
    }
    const rightItemClassName = bem.classNames(
        bem.element('item'),
        bem.element('dynamicItem'),
        bem.element('dynamicItem', `padding--${padding}`)
    );
    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifier(valign),
                bem.modifierConditional('clearMargins', !keepMargins)
            )}
        >
            <div className={bem.classNames(bem.element('item'), bem.element('left'))}>{left}</div>
            {right.map((item: React.ReactNode | string, idx) => (
                <div className={rightItemClassName} key={idx}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export default LayoutRow;
