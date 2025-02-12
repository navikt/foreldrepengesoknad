import React from 'react';

import './buttonRow.scss';

export interface Props {
    align?: 'left' | 'right' | 'center';
    layout?: 'normal' | 'mobile-50-50' | 'stretch';
    children: React.ReactNode;
}
// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
// eslint-disable-next-line import/no-default-export
export default ButtonRow;
