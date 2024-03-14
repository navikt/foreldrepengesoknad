import React from 'react';
import './buttonRow.scss';

export interface Props {
    align?: 'left' | 'right' | 'center';
    layout?: 'normal' | 'mobile-50-50' | 'stretch';
    children: React.ReactNode;
}

const ButtonRow: React.FunctionComponent<Props> = ({ children, align = 'left', layout = 'normal' }) => {
    const cls = `buttonRow buttonRow--${align} buttonRow--${layout}`;
    return (
        <div className={cls}>
            {React.Children.map(children, (knapp, index) =>
                knapp ? (
                    <span key={index} className="buttonRow__button">
                        {knapp}
                    </span>
                ) : undefined,
            )}
        </div>
    );
};

export default ButtonRow;
